let startTime, elapsedTime = 0;
let intervalId;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

// Format time
function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0').slice(0, 2);
  return `${minutes}:${seconds}.${milliseconds}`;
}

// Update display
function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

// Start or stop the stopwatch
function startStop() {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = false;
    display.style.color = '#333'; // Reset color
  } else {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    isRunning = true;
    startStopBtn.textContent = 'Stop';
    lapBtn.disabled = false;
    resetBtn.disabled = true;
    display.style.color = '#51cf66'; // Active color
  }
}

// Reset the stopwatch
function reset() {
  clearInterval(intervalId);
  isRunning = false;
  elapsedTime = 0;
  updateDisplay();
  startStopBtn.textContent = 'Start';
  lapBtn.disabled = true;
  resetBtn.disabled = true;
  laps.innerHTML = '';
  display.style.color = '#333'; // Reset color
}

// Record a lap
function recordLap() {
  const lapTime = document.createElement('li');
  lapTime.textContent = formatTime(elapsedTime);
  laps.appendChild(lapTime);
  lapTime.classList.add('fadeIn'); // Trigger CSS fade-in animation
}

// Event listeners
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

// Initialize display
updateDisplay();
