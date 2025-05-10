document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const baseServings = 2; // Changed to match default value in HTML
    const basePrep = 10;
    const baseCook = 10;
    const servingsDisplay = document.getElementById('servings');
    const prepDisplay = document.getElementById('prepTime');
    const cookDisplay = document.getElementById('cookTime');
    const totalDisplay = document.getElementById('totalTime');
    const slider = document.getElementById('servingsSlider');
    const ingredientsList = document.getElementById('ingredientsList');
    const starIcon = document.getElementById('star');

    const ingredients = [
        { text: "1 large ripe banana", amount: 1, unit: "large ripe banana" },
        { text: "2 eggs", amount: 2, unit: "eggs" },
        { text: "⅛ teaspoon baking powder", amount: 0.125, unit: "(1/8) teaspoon baking powder" },
        { text: "2 teaspoons butter, or as needed", amount: 2, unit: "teaspoons butter, or as needed" },
        { text: "1 pinch ground cinnamon (Optional)", amount: 1, unit: "pinch ground cinnamon (Optional)" },
    ];

    const storedName = localStorage.getItem('firstName');
    if (storedName) {
        updateUserMenu(storedName);
    }

    updateRecipe(baseServings);
    setupTimers();

    // STAR ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if (starIcon) {
        starIcon.addEventListener('click', function() {
            alert('Added to favorites!');
        });
    }

    // SLIDER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if (slider) {
        slider.addEventListener('input', () => {
            updateRecipe(parseInt(slider.value));
            setupTimers(); 
        });
    }

    // STICKY HEADER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // RECIPE UPDATE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    function updateRecipe(servings) {
        servingsDisplay.textContent = servings;
      
        const ratio = servings / baseServings;
        prepDisplay.textContent = `${Math.round(basePrep * ratio)} minutes`;
        cookDisplay.textContent = `${Math.round(baseCook * ratio)} minutes`;
        totalDisplay.textContent = `${Math.round((basePrep + baseCook) * ratio)} minutes`;
      
        ingredientsList.innerHTML = '';
      
        ingredients.forEach(item => {
          const li = document.createElement('li');
          if (item.amount !== null) {
            const newAmt = item.amount * ratio;
            const formatted = newAmt % 1 === 0 ? newAmt : newAmt.toFixed(2);
            li.textContent = `${formatted} ${item.unit}`;
          } else {
            li.textContent = item.text;
          }
          ingredientsList.appendChild(li);
        });
    }

    // USER UPDATE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    function updateUserMenu(firstName) {
        const userMenu = document.getElementById('userMenu');
        userMenu.innerHTML = `
            <span class="user-name">${firstName}</span>
            <div class="dropdown">
                <a href="profile.html">View Profile</a>
                <a href="log-in.html" id="logoutBtn">Log Out</a>
            </div>
        `;
    
        document.getElementById('logoutBtn').addEventListener('click', () => {
            location.reload();
        });
    }

    // TIMER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    function setupTimers() {
        const timerContainers = document.querySelectorAll('.timer');
        
        timerContainers.forEach(container => {
          const display = container.querySelector('.time');
          const stepText = container.closest('li').textContent.trim();
          
          let countdownSeconds = 180; 
          
          if (stepText.includes('minutes')) {
            const minutesMatch = stepText.match(/(\d+)\s*to\s*(\d+)\s*minutes/);
            if (minutesMatch) {
              countdownSeconds = parseInt(minutesMatch[2]) * 60;
            } else {
              const singleMinuteMatch = stepText.match(/(\d+)\s*minutes/);
              if (singleMinuteMatch) {
                countdownSeconds = parseInt(singleMinuteMatch[1]) * 60;
              }
            }
          }
          
          container.dataset.countdown = countdownSeconds;
          
          const mins = String(Math.floor(countdownSeconds / 60)).padStart(2, '0');
          const secs = String(countdownSeconds % 60).padStart(2, '0');
          display.textContent = `${mins}:${secs}`;
        });
    }
});

let intervals = [];

// START TIMER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function startTimer(button) {
  const container = button.parentElement;
  const display = container.querySelector(".time");
  
  if (container.dataset.index === undefined) {
    container.dataset.index = intervals.length;
    const countdownTime = parseInt(container.dataset.countdown || '180');
    
    intervals.push({ 
      interval: null, 
      seconds: countdownTime, 
      isCountdown: true,
      totalTime: countdownTime
    });
  }
  
  const idx = parseInt(container.dataset.index);
  if (intervals[idx] && intervals[idx].interval) return;
  
  const timerObj = intervals[idx];
  
  timerObj.interval = setInterval(() => {
    if (timerObj.seconds > 0) {
      timerObj.seconds--;
      const mins = String(Math.floor(timerObj.seconds / 60)).padStart(2, '0');
      const secs = String(timerObj.seconds % 60).padStart(2, '0');
      display.textContent = `${mins}:${secs}`;
      
      if (timerObj.seconds <= 10) {
        display.style.color = 'red';
      }
    } else {
      clearInterval(timerObj.interval);
      timerObj.interval = null;
      display.textContent = "00:00";
      display.style.color = 'red';
      
      alert("Timer complete! This step is finished.");
    }
  }, 1000);
}

// PAUSE TIMER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function pauseTimer(button) {
  const container = button.parentElement;
  const idx = parseInt(container.dataset.index);
  if (intervals[idx]) {
    clearInterval(intervals[idx].interval);
    intervals[idx].interval = null;
  }
}

// RESET TIMER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function resetTimer(button) {
  const container = button.parentElement;
  const display = container.querySelector(".time");
  const idx = parseInt(container.dataset.index);
  
  if (intervals[idx]) {
    clearInterval(intervals[idx].interval);
    intervals[idx].interval = null;
    
    intervals[idx].seconds = intervals[idx].totalTime;
    const mins = String(Math.floor(intervals[idx].seconds / 60)).padStart(2, '0');
    const secs = String(intervals[idx].seconds % 60).padStart(2, '0');
    display.textContent = `${mins}:${secs}`;
    display.style.color = ''; 
  }
}