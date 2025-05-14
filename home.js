// home.js

// Recipe data ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const recipeData = {
  recipe01: { id: 'recipe01', number: '01', title: 'Maruya (banana fritters) recipe', image: 'MARUYA.jpg', category: 'Sweet & Crispy', link: 'recipe01.html', price: 120 },
  recipe02: { id: 'recipe02', number: '02', title: 'Banana Cheese Turon Recipe', image: 'CHEESY TURON.jpg', category: 'Sweet & Crispy', link: 'recipe02.html', price: 200 },
  recipe03: { id: 'recipe03', number: '03', title: 'Minatamis na Saging Recipe (Banana with Caramel Sauce)', image: 'recipe03.jpg', category: 'Sweet & Caramelized', link: 'recipe03.html', price: 220 },
  recipe04: { id: 'recipe04', number: '04', title: 'Saba Langka Empanada Recipe', image: 'Saba Langka Empanada Recipe.jpg', category: 'Sweet & Flaky', link: 'recipe04.html', price: 250 },
  recipe05: { id: 'recipe05', number: '05', title: 'Ginataang Bilo-Bilo Recipe', image: 'Ginataang Bilo-Bilo Recipe.jpg', category: 'Hot & Hearty', link: 'recipe05.html', price: 300 },
  recipe06: { id: 'recipe06', number: '06', title: 'Coffee Banana Bread Recipe', image: 'recipe06.jpg', category: 'Sweet & Aromatic', link: 'recipe06.html', price: 400 },
  recipe07: { id: 'recipe07', number: '07', title: '3-Ingredient Pancake', image: 'recipe07.jpg', category: 'Quick & Easy', link: 'recipe07.html', price: 400 },
  recipe08: { id: 'recipe08', number: '08', title: 'Banana Smoothie', image: 'recipe08.jpg', category: 'Sweet & Creamy', link: 'recipe08.html', price: 400 }
};

localStorage.setItem('recipeData', JSON.stringify(recipeData));

// DOM Ready Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
document.addEventListener('DOMContentLoaded', function () {
  console.log("Welcome to Must Try PH - The Best Banana Recipes!");

  // Check if user is logged in
  const firstName = localStorage.getItem('firstName');
  const isLoggedIn = firstName && firstName !== 'Guest';

  // Setup user dropdown menu
  const signupLink = document.getElementById('signupLink');
  const userMenu = document.getElementById('userMenu');

  if (signupLink && userMenu) {
    // Clear any existing dropdown
    const existingDropdown = userMenu.querySelector('.dropdown-menu');
    if (existingDropdown) {
      existingDropdown.remove();
    }

    // Create dropdown menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'dropdown-menu';

    if (isLoggedIn) {
      // User is logged in - show first name with dropdown
      signupLink.innerHTML = `<strong>${firstName} ▼</strong>`;
      signupLink.href = "#";
      
      dropdownMenu.innerHTML = `
        <div class="menu-item" id="viewProfileButton"><strong>View Profile</strong></div>
        <div class="menu-item" id="logoutButton"><strong>Log-out</strong></div>
      `;
    } else {
      // User is guest - show "Guest" with dropdown
      signupLink.innerHTML = `<strong>Guest ▼</strong>`;
      signupLink.href = "#";
      
      dropdownMenu.innerHTML = `
        <div class="menu-item" onclick="window.location.href='log-in.html'"><strong>Log in</strong></div>
        <div class="menu-item" onclick="window.location.href='sign-up.html'"><strong>Sign-up</strong></div>
      `;
    }

    userMenu.appendChild(dropdownMenu);

    // Toggle dropdown on click
    signupLink.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      dropdownMenu.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', e => {
      if (!userMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
      }
    });

    // Setup event listeners for logged-in user actions
    if (isLoggedIn) {
      const viewProfileButton = dropdownMenu.querySelector('#viewProfileButton');
      const logoutButton = dropdownMenu.querySelector('#logoutButton');

      if (viewProfileButton) {
        viewProfileButton.addEventListener('click', () => {
          window.location.href = 'profile.html';
        });
      }

      if (logoutButton) {
        logoutButton.addEventListener('click', () => {
          localStorage.removeItem('firstName');
          localStorage.removeItem('isLoggedIn');
          window.location.href = 'log-in.html';
        });
      }
    }
  }

  // Sticky header ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const header = document.querySelector('header');
  const sticky = header.offsetTop;

  window.onscroll = function () {
    if (window.pageYOffset > sticky) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
    checkVisibility();
  };

  setTimeout(checkVisibility, 100);

  // Check element visibility ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function checkVisibility() {
    document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
  }

  // Star (Favorite) toggle ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const recipeId = star.getAttribute('data-recipe');
      star.classList.toggle('favorited');

      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

      if (star.classList.contains('favorited')) {
        if (!favorites.includes(recipeId)) favorites.push(recipeId);
      } else {
        favorites = favorites.filter(fav => fav !== recipeId);
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
      showPopup();
    });
  });

  // Show popup notification ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function showPopup() {
    let popup = document.getElementById('popupMessage');
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'popupMessage';
      popup.className = 'popup';
      popup.textContent = 'Recipe favorites updated!';
      document.body.appendChild(popup);
    }

    popup.style.display = 'block';
    setTimeout(() => popup.style.display = 'none', 3000);
  }

  // Budget slider ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const budgetSlider = document.getElementById("budgetSlider");
  const budgetAmount = document.getElementById("budgetAmount");
  const recipeCards = document.querySelectorAll(".recipe-card");

  function filterRecipesByBudget(budget) {
    recipeCards.forEach(card => {
      const price = parseInt(card.getAttribute("data-price"), 10);
      card.style.display = price <= budget ? "flex" : "none";
      card.style.opacity = price <= budget ? "1" : "0";
    });
  }

  if (budgetSlider && budgetAmount) {
    budgetSlider.addEventListener("input", () => {
      const value = parseInt(budgetSlider.value, 10);
      budgetAmount.textContent = value;
      filterRecipesByBudget(value);
    });
    filterRecipesByBudget(parseInt(budgetSlider.value, 10));
  }

  // Recipe card hover effects ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

  // Init: Mark favorited stars ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  document.querySelectorAll('.star').forEach(star => {
    const recipeId = star.getAttribute('data-recipe');
    if (favorites.includes(recipeId)) {
      star.classList.add('favorited');
    }
  });
});