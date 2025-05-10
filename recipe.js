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

const budgetSlider = document.getElementById("budgetSlider");
const budgetAmount = document.getElementById("budgetAmount");
const recipeCards = document.querySelectorAll(".recipe-card");

function filterRecipesByBudget(budget) {
  recipeCards.forEach(card => {
    const price = parseInt(card.getAttribute("data-price"), 10);
    if (price <= budget) {
      card.style.display = "block";
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

  filterRecipesByBudget(parseInt(budgetSlider.value, 10));
}
/*-----------------star--------------------*/
// Function to handle the click on the star
document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', () => {
    const recipeId = star.getAttribute('data-recipe');
    star.classList.toggle('favorited'); // Toggle the star between favorited and not

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (star.classList.contains('favorited')) {
      // Add to favorites
      if (!favorites.includes(recipeId)) {
        favorites.push(recipeId);
      }
    } else {
      // Remove from favorites
      favorites = favorites.filter(fav => fav !== recipeId);
    }

    // Save the updated favorites list to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Show the popup notification
    showPopup();
  });
});

// Function to show the popup
function showPopup() {
  const popup = document.getElementById('popupMessage');
  popup.style.display = 'block';

  // Hide the popup after 3 seconds
  setTimeout(() => {
    popup.style.display = 'none';
  }, 3000);
}

// Check if the recipe is favorited when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  document.querySelectorAll('.star').forEach(star => {
    const recipeId = star.getAttribute('data-recipe');
    if (favorites.includes(recipeId)) {
      star.classList.add('favorited');
    }
  });
});

=======
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
  
  const budgetSlider = document.getElementById("budgetSlider");
  const budgetAmount = document.getElementById("budgetAmount");
  const recipeCards = document.querySelectorAll(".recipe-card");
  
  function filterRecipesByBudget(budget) {
    recipeCards.forEach(card => {
      const price = parseInt(card.getAttribute("data-price"), 10);
      if (price <= budget) {
        card.style.display = "block";
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
  
    filterRecipesByBudget(parseInt(budgetSlider.value, 10));
  }
  