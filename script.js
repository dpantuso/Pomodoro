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
const taskModal = document.getElementById('task-modal');
const taskInput = document.getElementById('task-input');
const taskSubmit = document.getElementById('task-submit');
const currentTask = document.getElementById('current-task');
const taskDisplay = document.getElementById('task-display');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    minutesDisplay.textContent = formattedMinutes;
    secondsDisplay.textContent = formattedSeconds;
    
    // Update the page title without parentheses
    document.title = `${formattedMinutes}:${formattedSeconds} Pomodoro Timer`;
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

    // Only show task modal if it's work time
    if (isWorkTime) {
        taskModal.style.display = 'flex';
        taskInput.focus();
        return;
    }
    
    startTimerInterval();
}

function startTimerInterval() {
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            currentTask.style.display = 'none';
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
    currentTask.style.display = 'none';
    updateDisplay(timeLeft);
    startButton.textContent = 'Start';
}

function adjustTime(seconds) {
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

// Add task submit event listener
taskSubmit.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task) {
        taskDisplay.textContent = task;
        currentTask.style.display = 'block';
        taskModal.style.display = 'none';
        taskInput.value = '';
        startTimerInterval();
    }
});

// Add keypress event for enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        taskSubmit.click();
    }
});

// Initialize the display
timeLeft = WORK_TIME;
updateDisplay(timeLeft); 