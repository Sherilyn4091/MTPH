// document.addEventListener('DOMContentLoaded', function() {
//     const header = document.getElementById('header');

// Sticky ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
window.addEventListener('scroll', function() {
if (window.scrollY > 50) {
    header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// RECIPE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const baseServings = 4;
const basePrep = 5;
const baseCook = 0.5; 

const ingredients = [
  { text: "2 cups ice cubes", amount: 2, unit: "Cup/s ice cubes" },
  { text: "2 tablespoons honey, or to taste", amount: 2, unit: "tablespoons honey, or to taste" },
  { text: "1/2 Cup Peanut Butter", amount: 0.5, unit: "Cup/s Peanut Butter" },
  { text: "2 Cup/s of milk", amount: 2, unit: "Cup/s of milk" },
  { text: "2 bananas, broken into chunks", amount: 2, unit: "bananas, broken into chunks" },
];

const servingsDisplay = document.getElementById('servings');
const prepDisplay = document.getElementById('prepTime');
const cookDisplay = document.getElementById('cookTime');
const totalDisplay = document.getElementById('totalTime');
const slider = document.getElementById('servingsSlider');
const ingredientsList = document.getElementById('ingredientsList');
const starIcon = document.getElementById('star');

document.addEventListener('DOMContentLoaded', function() {
  updateRecipe(baseServings);
  setupTimers();

  // STAR ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
      alert('Added to favorites!');
    });
  });
});

// RECIPE UPDATEZ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function updateRecipe(servings) {
    servingsDisplay.textContent = servings;
  
    const ratio = servings / baseServings;
    prepDisplay.textContent = `${Math.round(basePrep * ratio)} minutes`;
    cookDisplay.textContent = `${Math.round(baseCook * ratio * 60)} seconds`; // Convert to seconds
    totalDisplay.textContent = `${Math.round(basePrep * ratio)} min ${Math.round(baseCook * ratio * 60)} sec`;
  
    ingredientsList.innerHTML = '';
  
    ingredients.forEach(item => {
      const li = document.createElement('li');
      if (item.amount !== null) {
        const newAmt = item.amount * ratio;
        const formatted = newAmt % 1 === 0 ? newAmt : newAmt.toFixed(2);
        li.textContent = `${formatted} ${item.unit}`;
      } else {
        li.textContent = item.unit;
      }
      ingredientsList.appendChild(li);
    });
  }

if (slider) {
  slider.addEventListener('input', () => {
    updateRecipe(parseInt(slider.value));
    setupTimers(); 
  });
}

// TIMER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~X
function setupTimers() {
    const timerContainers = document.querySelectorAll('.timer');
    
    timerContainers.forEach(container => {
      const display = container.querySelector('.time');
      const stepText = container.closest('li').textContent.trim();
      
      // Default to baseCook value (30 seconds)
      let countdownSeconds = Math.round(baseCook * 60);
      
      // Check if step text specifies time
      if (stepText.includes('minutes')) {
        const minutesMatch = stepText.match(/(\d+)\s*minutes/);
        if (minutesMatch) {
          countdownSeconds = parseInt(minutesMatch[1]) * 60;
        }
      } else if (stepText.includes('seconds')) {
        const secondsMatch = stepText.match(/(\d+)\s*seconds/);
        if (secondsMatch) {
          countdownSeconds = parseInt(secondsMatch[1]);
        }
      }
      
      container.dataset.countdown = countdownSeconds;
      
      const mins = String(Math.floor(countdownSeconds / 60)).padStart(2, '0');
      const secs = String(countdownSeconds % 60).padStart(2, '0');
      display.textContent = `${mins}:${secs}`;
    });
  }

let intervals = [];

function startTimer(button) {
  const container = button.parentElement;
  const display = container.querySelector(".time");
  
  if (container.dataset.index === undefined) {
    container.dataset.index = intervals.length;
    const countdownTime = parseInt(container.dataset.countdown || '0');
    
    intervals.push({ 
      interval: null, 
      seconds: countdownTime, 
      isCountdown: countdownTime > 0,
      totalTime: countdownTime
    });
  }
  
  const idx = container.dataset.index;
  if (intervals[idx].interval) return;
  
  const timerObj = intervals[idx];
  
  if (timerObj.isCountdown) {
    // Countdown ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    timerObj.interval = setInterval(() => {
      if (timerObj.seconds > 0) {
        timerObj.seconds--;
        const mins = String(Math.floor(timerObj.seconds / 60)).padStart(2, '0');
        const secs = String(timerObj.seconds % 60).padStart(2, '0');
        display.textContent = `${mins}:${secs}`;
        
        // Change color when less than 10 seconds ~~~~~~~~~~~~~~~~~~~~~~~~~~~
        if (timerObj.seconds <= 10) {
          display.style.color = 'red';
        }
      } else {
        // Timer completed~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        clearInterval(timerObj.interval);
        timerObj.interval = null;
        display.textContent = "00:00";
        display.style.color = 'red';
        
        alert("Timer complete! This step is finished.");
      }
    }, 1000);
   } else {
    // Count-up timer
    timerObj.interval = setInterval(() => {
      timerObj.seconds++;
      const mins = String(Math.floor(timerObj.seconds / 60)).padStart(2, '0');
      const secs = String(timerObj.seconds % 60).padStart(2, '0');
      display.textContent = `${mins}:${secs}`;
    }, 1000);
  }
}

// PAUSE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function pauseTimer(button) {
  const container = button.parentElement;
  const idx = container.dataset.index;
  if (intervals[idx]) {
    clearInterval(intervals[idx].interval);
    intervals[idx].interval = null;
  }
}

// RESET ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function resetTimer(button) {
    const container = button.parentElement;
    const display = container.querySelector(".time");
    const idx = container.dataset.index;
    
    if (intervals[idx]) {
      clearInterval(intervals[idx].interval);
      intervals[idx].interval = null;
      
      // Reset to original countdown time if it's a countdown timer
      if (intervals[idx].isCountdown) {
        intervals[idx].seconds = intervals[idx].totalTime;
        const mins = String(Math.floor(intervals[idx].seconds / 60)).padStart(2, '0');
        const secs = String(intervals[idx].seconds % 60).padStart(2, '0');
        display.textContent = `${mins}:${secs}`;
      } else {
        intervals[idx].seconds = 0;
        display.textContent = "00:00";
      }
    }
  }

// });