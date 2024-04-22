let timer;
let timeLeft;
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

// Initialize with default countdown time (1 minute = 60 seconds)
const defaultCountdown = 60; // in seconds
resetTimer();

function updateTimer() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    timerElement.innerText = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (timer) {
        return; // Timer already running
    }

    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            timer = null;
            stopButton.disabled = true;
        } else {
            timeLeft--;
            updateTimer();
        }
    }, 1000);

    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        startButton.disabled = false;
        stopButton.disabled = true;
    }
}

function resetTimer() {
    stopTimer();
    timeLeft = defaultCountdown;
    updateTimer();
    startButton.disabled = false;
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

updateTimer(); // Initial update for timer display
