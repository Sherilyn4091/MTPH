// DOM Elements
const servingSlider = document.getElementById('serving-slider');
const servingValue = document.getElementById('serving-value');
const prepTimeDisplay = document.getElementById('prep-time');
const cookTimeDisplay = document.getElementById('cook-time');
const totalTimeDisplay = document.getElementById('total-time');
const ingredients = document.querySelectorAll('.ingredients li span[data-base]');
const stepSpans = document.querySelectorAll('.instructions .step span[data-base]');

// Base time for 6 servings
const basePrepTime = 10;
const baseCookTime = 10;

// Event listener for servings slider
servingSlider.addEventListener('input', () => {
  const servings = parseInt(servingSlider.value);
  servingValue.textContent = servings;

  // Update time
  const prepTime = basePrepTime * (servings / 6);
  const cookTime = baseCookTime * (servings / 6);
  const totalTime = prepTime + cookTime;

  prepTimeDisplay.textContent = `${Math.round(prepTime)} minutes`;
  cookTimeDisplay.textContent = `${Math.round(cookTime)} minutes`;
  totalTimeDisplay.textContent = `${Math.round(totalTime)} minutes`;

  // Update ingredients
  ingredients.forEach(span => {
    const base = parseFloat(span.getAttribute('data-base'));
    if (!isNaN(base)) {
      const newAmount = (base * servings / 6).toFixed(2);
      span.textContent = newAmount;
    }
  });

  // Update ingredient values in instructions
  stepSpans.forEach(span => {
    const base = parseFloat(span.getAttribute('data-base'));
    if (!isNaN(base)) {
      const newAmount = (base * servings / 6).toFixed(2);
      span.textContent = newAmount;
    }
  });
});

// Cute Timer Logic (Step 4)
let timer;
let timeLeft = 600; // 10 minutes in seconds
const display = document.getElementById('clock-display');
const startBtn = document.getElementById('start-timer');
const pauseBtn = document.getElementById('pause-timer');
const resetBtn = document.getElementById('reset-timer');

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
  clearInterval(timer);
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
  timeLeft = 600;
  updateDisplay();
});

updateDisplay(); // Initialize
