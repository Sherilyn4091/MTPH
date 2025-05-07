document.addEventListener('DOMContentLoaded', function () {
    const storedName = localStorage.getItem('firstName');
    if (storedName) {
        document.getElementById('userName').textContent = storedName;
    }  

    // Sticky ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Favorite toggle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const favoriteToggles = document.querySelectorAll('.favorite-toggle');
    favoriteToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            const recipeCard = this.closest('.recipe-card');

            recipeCard.classList.add('removing');

            setTimeout(() => {
                recipeCard.remove();
            }, 300);
            e.stopPropagation();
        });
    });

    // Logout ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('firstName');
            window.location.href = 'log-in.html';
        });
    }















    const daisy = document.querySelector('.daisy');
const bar = document.querySelector('.loading-bar');
const loadingScreen = document.getElementById('loading-screen');

let isDragging = false;

daisy.addEventListener('mousedown', (e) => {
  isDragging = true;
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;

    const daisyLeft = parseInt(getComputedStyle(daisy).left);
    const barWidth = bar.clientWidth;
    const maxLeft = barWidth - daisy.clientWidth;

    if (daisyLeft >= maxLeft - 10) {
      daisy.classList.add('boom');

      // Fade out after boom effect
      setTimeout(() => {
        loadingScreen.classList.add('fade-out');
      }, 1000);
    } else {
      // Snap back if not at end
      daisy.style.left = '0px';
    }
  }
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const barRect = bar.getBoundingClientRect();
  let newLeft = e.clientX - barRect.left - daisy.offsetWidth / 2;

  const maxLeft = bar.clientWidth - daisy.clientWidth;

  if (newLeft < 0) newLeft = 0;
  if (newLeft > maxLeft) newLeft = maxLeft;

  daisy.style.left = newLeft + 'px';
});


    

});
