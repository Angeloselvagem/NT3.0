window.onload = function () {
    // Mock Data for Progress Chart
    const labels = ["Day 1", "Day 2", "Day 3", "Day 4"];
    const typingSpeeds = [100, 120, 140, 150];

    const ctx = document.getElementById('progressChart').getContext('2d');
    const progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Typing Speed (CPM)',
                data: typingSpeeds,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: 'Day' }},
                y: { title: { display: true, text: 'Characters per Minute (CPM)' }}
            }
        }
    });
};
