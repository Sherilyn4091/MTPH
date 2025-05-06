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
  
    // Initial display based on default slider value
    filterRecipesByBudget(parseInt(budgetSlider.value, 10));
  }
  