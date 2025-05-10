document.addEventListener('DOMContentLoaded', function () {
    const storedName = localStorage.getItem('firstName');
    if (storedName) {
        const userNameElements = document.querySelectorAll('#userName');
        userNameElements.forEach(element => {
            element.textContent = storedName;
        });
    } else {
        const userNameElements = document.querySelectorAll('#userName');
        userNameElements.forEach(element => {
            element.textContent = 'Guest';
        });
    }  

    // LOADING SCREEN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000); 
        }, 4000);
    }

    // STICKY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Favorite toggle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const favoriteToggles = document.querySelectorAll('.favorite-toggle');
    const favoritesGrid = document.getElementById('favorites-grid');

    favoriteToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            const recipeCard = this.closest('.recipe-card');
        
            recipeCard.style.transform = 'scale(0.8)';
            recipeCard.style.opacity = '0';
            
            setTimeout(() => {
                recipeCard.remove();

                if (favoritesGrid && favoritesGrid.children.length === 0) {
                    const emptyMessage = document.createElement('div');
                    emptyMessage.className = 'empty-favorites-message';
                    emptyMessage.innerHTML = 'You haven\'t added any favorites yet.<br>Explore our recipes and click the star to add them here!';
                    favoritesGrid.appendChild(emptyMessage);
                }
            }, 300);
            
            e.stopPropagation();
        });
    });

    // sign-up button to user name ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const signupLink = document.getElementById('signupLink');
    const userMenu = document.getElementById('userMenu');
    
    if (signupLink && userMenu) {
        const userName = storedName || 'Guest';
        
        signupLink.innerHTML = `<strong>${userName} ▼</strong>`;
        signupLink.href = "#";
    
        const dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown-menu';
        
        const currentPage = window.location.pathname.split('/').pop();
        
        dropdownMenu.innerHTML = `
            <div class="menu-item" id="viewProfileButton"><strong>View Profile</strong></div>
            <div class="menu-item" id="logoutButton"><strong>Log-out</strong></div>
        `;
        
        userMenu.appendChild(dropdownMenu);
                
        // dropdow on click ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownMenu.classList.toggle('show');
        });
        
        document.addEventListener('click', function(e) {
            if (!userMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
                        
        const viewProfileButton = document.getElementById('viewProfileButton');
        if (viewProfileButton) {
            viewProfileButton.addEventListener('click', function() {
                if (currentPage !== 'profile.html') {
                    window.location.href = 'profile.html';
                } else {
                    dropdownMenu.classList.remove('show');
                }
            });
        }
        
        // Logout ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', function() {
                // localStorage.removeItem('firstName');
                // localStorage.removeItem('lastName');
                // localStorage.removeItem('email');
                window.location.href = 'log-in.html';
            });
        }
    }

});