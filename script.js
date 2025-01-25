let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const modeToggleButton = document.getElementById('mode-toggle');
const toggleLabel = document.getElementById('toggle-label');
const decreaseButton = document.getElementById('decrease-time');
const increaseButton = document.getElementById('increase-time');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function toggleMode() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleLabel.textContent = isWorkTime ? 'Work Mode' : 'Rest Mode';
    updateDisplay(timeLeft);
    startButton.textContent = 'Start';
}

function startTimer() {
    if (timerId !== null) return;
    
    if (!timeLeft) {
        timeLeft = WORK_TIME;
    }

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            toggleMode();
            alert(isWorkTime ? 'Break time is over! Time to work!' : 'Work time is over! Take a break!');
        }
    }, 1000);

    startButton.textContent = 'Pause';
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    modeText.textContent = 'Work Time';
    updateDisplay(timeLeft);
    startButton.textContent = 'Start';
}

function adjustTime(seconds) {
    if (timerId !== null) return; // Don't adjust while timer is running
    
    timeLeft += seconds;
    // Ensure timeLeft doesn't go below 30 seconds
    if (timeLeft < 30) {
        timeLeft = 30;
    }
    // Ensure timeLeft doesn't exceed 60 minutes
    if (timeLeft > 3600) {
        timeLeft = 3600;
    }
    updateDisplay(timeLeft);
}

modeToggleButton.addEventListener('change', toggleMode);

startButton.addEventListener('click', () => {
    if (timerId === null) {
        startTimer();
    } else {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
});

resetButton.addEventListener('click', resetTimer);
decreaseButton.addEventListener('click', () => adjustTime(-30));
increaseButton.addEventListener('click', () => adjustTime(30));

// Initialize the display
timeLeft = WORK_TIME;
updateDisplay(timeLeft); 