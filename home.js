
// Hide loader after site loads
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 400);
});

// Show loader when clicking internal links
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href && !href.startsWith("http") && !href.startsWith("#") && !href.startsWith("mailto")) {
      e.preventDefault();
      const loader = document.getElementById("loader");
      loader.style.display = "flex";
      loader.style.opacity = "1";
      setTimeout(() => {
        window.location.href = href;
      }, 800);
    }
  });
});
/*-----------------third-----------------*/
// Show flash-section on scroll
window.addEventListener("scroll", () => {
  const flashSection = document.querySelector(".flash-section");
  const triggerPoint = window.innerHeight * 0.7;
  if (flashSection && !flashSection.classList.contains("visible")) {
    const rect = flashSection.getBoundingClientRect();
    if (rect.top < triggerPoint) {
      flashSection.style.display = "block";
      flashSection.classList.add("visible");
    }
  }
});


// Budget slider logic
const budgetSlider = document.getElementById("budget");
const budgetValue = document.getElementById("budget-value");
const recipeCards = document.querySelectorAll(".recipe-card");

if (budgetSlider && budgetValue) {
  budgetSlider.addEventListener("input", () => {
    const budget = parseInt(budgetSlider.value);
    budgetValue.textContent = `₱${budget}`;
    recipeCards.forEach(card => {
      const price = parseInt(card.getAttribute("data-price"));
      card.style.display = price <= budget ? "block" : "none";
    });
  });
}

// Tilt effect
document.querySelectorAll('.recipe-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });
});


// ----------------- recipe hover tilt & glow effect -----------------
document.querySelectorAll(".recipe-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);
    card.classList.add("glow-active");
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    card.classList.remove("glow-active");
  });
});


