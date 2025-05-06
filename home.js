
window.addEventListener('DOMContentLoaded', () => {
  console.log("Welcome to Must Try PH - The Best Banana Recipes!");
});

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
