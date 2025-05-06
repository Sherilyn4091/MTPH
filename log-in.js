// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get the header element
    const header = document.getElementById('header');
    
    // Sticky navigation functionality
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Form submission handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (!email || !password) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Form is valid - you would typically send this data to a server
            // For demo purposes, we'll just show a success message
            alert('Login successful! Welcome back to Must Try PH!');
            
            // Here you would typically redirect to a dashboard page
            // window.location.href = "dashboard.html";
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Forgot password link handler
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Here you would typically show a modal or redirect to a password reset page
            // For demo purposes, we'll just show a prompt to enter email
            const resetEmail = prompt('Please enter your email address to reset your password:');
            
            if (resetEmail && isValidEmail(resetEmail)) {
                alert('Password reset instructions have been sent to your email.');
            } else if (resetEmail) {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation for form elements - add animation when they come into view
    const formGroups = document.querySelectorAll('.form-group');
    
    // Add a small delay between each form field animation
    formGroups.forEach((group, index) => {
        setTimeout(() => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
    
    // Add animations to other elements
    const formElements = [
        document.querySelector('.login-form-wrapper h2'),
        document.querySelector('.subtitle'),
        document.querySelector('.forgot-password'),
        document.querySelector('.signup-prompt'),
        document.querySelector('.terms-notice')
    ];
    
    formElements.forEach((element, index) => {
        if (element) {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }, (index + formGroups.length) * 100);
        }
    });
    
    // Add hover animations to navigation items
    const navItems = document.querySelectorAll('.nav-menu a');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'color 0.3s ease';
        });
    });
    
    // Scroll to top button appearance
    const scrollTopBtn = document.querySelector('.scroll-to-top a');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Initialize the scroll to top button state
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.visibility = 'hidden';
    scrollTopBtn.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
});