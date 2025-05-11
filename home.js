document.addEventListener('DOMContentLoaded', function() {
  // Welcome message
  console.log("Welcome to Must Try PH - The Best Banana Recipes!");

  // Set user name from localStorage or default to Guest
  const storedName = localStorage.getItem('firstName');
  const userNameElements = document.querySelectorAll('#userName');
  userNameElements.forEach(element => {
    element.textContent = storedName ? storedName : 'Guest';
  });

  // Header sticky functionality
  const header = document.querySelector('header');
  if (header) {
    const sticky = header.offsetTop;

    window.onscroll = function() {
      if (window.pageYOffset > sticky) {
        header.classList.add('fixed');
      } else {
        header.classList.remove('fixed');
      }
      if (typeof checkVisibility === 'function') {
        checkVisibility();
      }
    };

    if (typeof addAnimationClasses === 'function') {
      addAnimationClasses();
    }
    if (typeof checkVisibility === 'function') {
      setTimeout(checkVisibility, 100);
    }
  }

  // Sign-up button to user name and dropdown
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

    // Dropdown on click
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

    // Logout button
    dropdownMenu.querySelector('#logoutButton')?.addEventListener('click', function() {
      // Uncomment below if you want to clear localStorage on logout
      // localStorage.removeItem('firstName');
      // localStorage.removeItem('lastName');
      // localStorage.removeItem('email');
      window.location.href = 'log-in.html';
    });
  }

  // Explore Recipes button
  const exploreButton = document.querySelector('.explore-recipes');
  if (exploreButton) {
    exploreButton.addEventListener('mouseenter', () => {
      console.log('Explore Recipes hovered');
    });

    exploreButton.addEventListener('click', (event) => {
      console.log('Explore Recipes clicked');
      exploreButton.classList.add('clicked');
      setTimeout(() => {
        window.location.href = exploreButton.href;
      }, 150);
      event.preventDefault();
    });
  }

  // Budget slider functionality
  const slider = document.getElementById("budgetSlider");
  const amount = document.getElementById("budgetAmount");
  const cards = document.querySelectorAll(".recipe-card");

  if (slider && amount && cards.length > 0) {
    slider.addEventListener("input", () => {
      const value = parseInt(slider.value);
      amount.textContent = value;
      cards.forEach(card => {
        const price = parseInt(card.getAttribute("data-price"));
        card.style.display = price <= value ? "flex" : "none";
      });
    });
  }
});

