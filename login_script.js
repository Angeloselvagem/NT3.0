// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJbVB3fuvEZQUp6eniaef_wU8bfDw0z0A",
    authDomain: "nerve-tracker.firebaseapp.com",
    projectId: "nerve-tracker",
    storageBucket: "nerve-tracker.firebasestorage.app",
    messagingSenderId: "718139565850",
    appId: "1:718139565850:web:448f5705c6d6ae42bd6ea3",
    measurementId: "G-6MSCPRGG94"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login function
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("User logged in");
            window.location.href = "typing_test.html"; // Redirect to Typing Test page
        })
        .catch((error) => {
            console.error(error.message);
        });
}
