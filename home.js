document.addEventListener('DOMContentLoaded', function() {

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
      
      addAnimationClasses();
      setTimeout(checkVisibility, 100);
  });
  
//part 2
// Not needed for scrolling, kept for potential future use
window.addEventListener('DOMContentLoaded', () => {
  console.log("Seamless infinite scroll loaded.");
});

// Optional: Scroll to Part 3 when clicking 'Explore Recipes'
document.querySelector('.explore-recipes')?.addEventListener('click', (e) => {
  e.preventDefault();
  const recipeSection = document.getElementById('recipes');
  if (recipeSection) {
    recipeSection.scrollIntoView({ behavior: 'smooth' });
  }
});