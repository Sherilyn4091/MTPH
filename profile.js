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

    // Loading screen ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
          document.getElementById('loading-screen').classList.add('fade-out');
        }, 4000);
      });
      });

