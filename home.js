document.addEventListener('DOMContentLoaded', function() {
  console.log("Welcome to Must Try PH - The Best Banana Recipes!");

  const storedName = localStorage.getItem('firstName');
  const userNameElements = document.querySelectorAll('#userName');
  userNameElements.forEach(element => {
    element.textContent = storedName ? storedName : 'Guest';
  });

//header sticky~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const header = document.querySelector('header');
    const sticky = header.offsetTop;

    window.onscroll = function() {
        if (window.pageYOffset > sticky) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
        
        checkVisibility();
    };

    setTimeout(checkVisibility, 100);

    // check elements are visible~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function checkVisibility() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right');
  
  animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100 && elementBottom > 0) {
          element.classList.add('visible');
      }
  });
}

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

    // View Profile button
    dropdownMenu.querySelector('#viewProfileButton')?.addEventListener('click', function() {
      if (currentPage !== 'profile.html') {
        window.location.href = 'profile.html';
      } else {
        dropdownMenu.classList.remove('show');
      }
    });

    // Logout ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    dropdownMenu.querySelector('#logoutButton')?.addEventListener('click', function() {
      // Uncomment below if you want to clear localStorage on logout
      // localStorage.removeItem('firstName');
      // localStorage.removeItem('lastName');
      // localStorage.removeItem('email');
      window.location.href = 'log-in.html';
    });
  }

  // Star functionality
  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const recipeId = star.getAttribute('data-recipe');
      star.classList.toggle('favorited');

      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

      if (star.classList.contains('favorited')) {
        if (!favorites.includes(recipeId)) {
          favorites.push(recipeId);
        }
      } else {
        favorites = favorites.filter(fav => fav !== recipeId);
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
      showPopup();
    });
  });

  // Show popup notification
  function showPopup() {
    let popup = document.getElementById('popupMessage');
    if (!popup) {
      // Create popup if it doesn't exist
      popup = document.createElement('div');
      popup.id = 'popupMessage';
      popup.className = 'popup';
      popup.textContent = 'Recipe favorites updated!';
      document.body.appendChild(popup);
    }
    
    popup.style.display = 'block';

    setTimeout(() => {
      popup.style.display = 'none';
    }, 3000);
  }

  // Budget slider functionality
  const budgetSlider = document.getElementById("budgetSlider");
  const budgetAmount = document.getElementById("budgetAmount");
  const recipeCards = document.querySelectorAll(".recipe-card");

  function filterRecipesByBudget(budget) {
    recipeCards.forEach(card => {
      const price = parseInt(card.getAttribute("data-price"), 10);
      if (price <= budget) {
        card.style.display = "flex";
        card.style.opacity = "1";
      } else {
        card.style.display = "none";
        card.style.opacity = "0";
      }
    });
  }

  if (budgetSlider && budgetAmount) {
    budgetSlider.addEventListener("input", () => {
      const budgetValue = parseInt(budgetSlider.value, 10);
      budgetAmount.textContent = budgetValue;
      filterRecipesByBudget(budgetValue);
    });

    // Initial filter
    filterRecipesByBudget(parseInt(budgetSlider.value, 10));
  }

  // Recipe card hover effects
  document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * -10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `rotateX(0) rotateY(0) scale(1)`;
      card.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  // Initialize favorites on page load
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  document.querySelectorAll('.star').forEach(star => {
    const recipeId = star.getAttribute('data-recipe');
    if (favorites.includes(recipeId)) {
      star.classList.add('favorited');
    }
  });
});