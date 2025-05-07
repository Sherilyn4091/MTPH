document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');

    const storedName = localStorage.getItem('firstName');
    if (storedName) {
        updateUserMenu(storedName);
    }
    
    // Sticky ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Form submitz~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const newsletter = document.getElementById('newsletter').checked;
            
            if (!firstName || !lastName || !email || !password) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            alert('Sign up successful! Welcome to Must Try PH!');
            // signupForm.reset();

            localStorage.setItem('firstName', firstName);
            updateUserMenu(firstName);

            window.location.href = 'home.html';
        });
    }
    
    // Email validation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function updateUserMenu(firstName) {
        const userMenu = document.getElementById('userMenu');
        userMenu.innerHTML = `
            <span class="user-name">${firstName}</span>
            <div class="dropdown">
                <a href="#">View Profile</a>
                <a href="#" id="logoutBtn">Log Out</a>
            </div>
        `;
    
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('firstName');
            // location.reload(); // Refresh page to reset to Sign-up
        });
    }
    
        
});