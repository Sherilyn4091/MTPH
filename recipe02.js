// SLIDER FUNCTIONALITY
const servingSlider = document.getElementById('serving-slider');
const servingValue = document.getElementById('serving-value');
const prepTimeDisplay = document.getElementById('prep-time');
const cookTimeDisplay = document.getElementById('cook-time');
const totalTimeDisplay = document.getElementById('total-time');
const ingredients = document.querySelectorAll('.ingredients li span[data-base]');
const stepSpans = document.querySelectorAll('.instructions .step span[data-base]');

const basePrepTime = 30;
const baseCookTime = 30;

servingSlider.addEventListener('input', () => {
  const servings = parseInt(servingSlider.value);
  servingValue.textContent = servings;

  const prepTime = basePrepTime * (servings / 6);
  const cookTime = baseCookTime * (servings / 6);
  const totalTime = prepTime + cookTime;

  prepTimeDisplay.textContent = `${Math.round(prepTime)} minutes`;
  cookTimeDisplay.textContent = `${Math.round(cookTime)} minutes`;
  totalTimeDisplay.textContent = `${Math.round(totalTime)} minutes`;

  ingredients.forEach(span => {
    const base = parseFloat(span.getAttribute('data-base'));
    if (!isNaN(base)) {
      const newAmount = (base * servings / 6).toFixed(2);
      span.textContent = newAmount;
    }
  });

  stepSpans.forEach(span => {
    const base = parseFloat(span.getAttribute('data-base'));
    if (!isNaN(base)) {
      const newAmount = (base * servings / 6).toFixed(2);
      span.textContent = newAmount;
    }
  });
});

// MAIN COUNTDOWN TIMER (30 MINUTES)
let timer;
let timeLeft = 1800; // 30 minutes in seconds

const display = document.getElementById('clock-display');
const startBtn = document.getElementById('start-timer');
const pauseBtn = document.getElementById('pause-timer');
const resetBtn = document.getElementById('reset-timer');

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
  clearInterval(timer);
  if (timeLeft <= 0) {
    timeLeft = 1800; 
  }
  updateDisplay();
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up!");
    }
  }, 1000);
});

pauseBtn.addEventListener('click', () => {
  clearInterval(timer);
});

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  timeLeft = 1800; 
  updateDisplay();
});

document.addEventListener("DOMContentLoaded", function () {
    timeLeft = 1800; 
    updateDisplay();
  });  

// MULTIPLE STEP TIMERS (OPTIONAL MINI TIMERS)
let intervals = [];

function startTimer(button) {
  const timerContainer = button.parentElement;
  const timeDisplay = timerContainer.querySelector(".time");
  let time = 0;

  if (timerContainer.dataset.index === undefined) {
    timerContainer.dataset.index = intervals.length;
    intervals.push(null);
  }

  const index = timerContainer.dataset.index;

  if (intervals[index]) return;

  intervals[index] = setInterval(() => {
    time++;
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    timeDisplay.textContent = `${minutes}:${seconds}`;
  }, 1000);

  timerContainer.dataset.time = time;
}

function pauseTimer(button) {
  const timerContainer = button.parentElement;
  const index = timerContainer.dataset.index;
  clearInterval(intervals[index]);
  intervals[index] = null;
}

function resetTimer(button) {
  const timerContainer = button.parentElement;
  const timeDisplay = timerContainer.querySelector(".time");
  const index = timerContainer.dataset.index;
  clearInterval(intervals[index]);
  intervals[index] = null;
  timeDisplay.textContent = "00:00";
}
