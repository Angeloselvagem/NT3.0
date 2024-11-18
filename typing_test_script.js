// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJbVB3fuvEZQUp6eniaef_wU8bfDw0z0A",
    authDomain: "nerve-tracker.firebaseapp.com",
    projectId: "nerve-tracker",
    storageBucket: "nerve-tracker.firebasestorage.app",
    messagingSenderId: "718139565850",
    appId: "1:718139565850:web:f846ec32e61dfabdbd6ea3",
    measurementId: "G-755WP0ZRWJ"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

let startTime;
let isTesting = false;
let keystrokeTimes = [];

// Event listener for the Enter key to start the test
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !isTesting) {
        startTest();
    }
});

function startTest() {
    // Get user input element
    const userInput = document.getElementById("user-input");
    
    if (!userInput) {
        console.error("User input field not found. Ensure the HTML element with ID 'user-input' is present.");
        return;
    }

    userInput.value = ""; // Clear the input field
    userInput.focus(); // Focus on the input field to start typing
    startTime = new Date().getTime();
    keystrokeTimes = []; // Reset keystroke times
    isTesting = true;

    // Add event listener to capture typing events
    userInput.addEventListener("input", handleInput);
}

function handleInput() {
    if (isTesting) {
        const currentTime = new Date().getTime();
        keystrokeTimes.push(currentTime);

        const inputText = document.getElementById("user-input").value;
        const promptText = document.getElementById("prompt-text").textContent;

        if (inputText.length >= promptText.length) {
            endTest(inputText, promptText);
        }
    }
}

function endTest(inputText, promptText) {
    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000; // Time in seconds

    // Calculate typing speed (characters per minute)
    const charsPerMinute = Math.round((inputText.length / timeTaken) * 60);
    
    // Calculate accuracy
    const correctChars = inputText.split("").filter((ch, idx) => ch === promptText[idx]).length;
    const accuracy = ((correctChars / promptText.length) * 100).toFixed(1);

    // Calculate average cadency
    const averageCadency = (keystrokeTimes.length > 1) ? 
        ((keystrokeTimes[keystrokeTimes.length - 1] - keystrokeTimes[0]) / (keystrokeTimes.length - 1)).toFixed(1) : "--";

    // Display results
    document.getElementById("typing-speed").textContent = `Typing Speed: ${charsPerMinute} CPM`;
    document.getElementById("typing-accuracy").textContent = `Accuracy: ${accuracy} %`;
    document.getElementById("cadency").textContent = `Cadency (ms per character): ${averageCadency}`;
    document.getElementById("total-time").textContent = `Total Time: ${timeTaken.toFixed(1)} seconds`;

    // Reset test state
    isTesting = false;
    document.getElementById("user-input").removeEventListener("input", handleInput);

    // Send data to Google Sheets or another database for progress tracking
    const username = auth.currentUser ? auth.currentUser.email : "Anonymous";
    const data = { username, typingSpeed: charsPerMinute, accuracy: accuracy, cadency: averageCadency };

    fetch("https://script.google.com/macros/s/1j7exE_btK25m-Su8kuWkad54QmPy6GaID_bnFm9GNZRL2PFkUU6Hf0rZ/exec", {
        method: "POST",
        mode: 'no-cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(response => {
        console.log("Data sent to Google Sheets");
    }).catch(error => {
        console.error("Error:", error);
    });
}

function goToProgress() {
    window.location.href = "progress.html"; // Redirect to Progress page
}
