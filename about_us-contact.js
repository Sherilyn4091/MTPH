document.addEventListener('DOMContentLoaded', function() {
    const storedName = localStorage.getItem('firstName');
    
    // Check if user is logged in
    const isLoggedIn = storedName && storedName !== 'Guest';
    
    // Update any userName elements on the page
    const userNameElements = document.querySelectorAll('#userName');
    userNameElements.forEach(element => {
        element.textContent = storedName || 'Guest';
    });

    // Header sticky functionality ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

    // Setup user dropdown menu ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
            signupLink.innerHTML = `<strong>${storedName} ▼</strong>`;
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
        
        // Dropdown toggle on click ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
        
        // Setup event listeners for logged-in user actions
        if (isLoggedIn) {
            const viewProfileButton = document.getElementById('viewProfileButton');
            if (viewProfileButton) {
                viewProfileButton.addEventListener('click', function() {
                    const currentPage = window.location.pathname.split('/').pop();
                    if (currentPage !== 'profile.html') {
                        window.location.href = 'profile.html';
                    } else {
                        dropdownMenu.classList.remove('show');
                    }
                });
            }
            
            // Logout functionality ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            const logoutButton = document.getElementById('logoutButton');
            if (logoutButton) {
                logoutButton.addEventListener('click', function() {
                    localStorage.removeItem('firstName');
                    // localStorage.removeItem('lastName');
                    // localStorage.removeItem('email');
                    window.location.href = 'log-in.html';
                });
            }
        }
    }
});

// Animations ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function addAnimationClasses() {
    document.querySelectorAll('.team_heading, .contact_page h1').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    document.querySelectorAll('.sherilyn_name, .sherilyn_title, .sherilyn_bio').forEach(el => {
        el.classList.add('animate-left');
    });
    
    document.querySelectorAll('.jannalyn_name, .jannalyn_title, .jannalyn_bio').forEach(el => {
        el.classList.add('animate-left');
    });
    
    document.querySelectorAll('.sherilyn_pic, .jannalyn_pic').forEach(el => {
        el.classList.add('animate-right');
    });
    
    document.querySelectorAll('.contact_page p, .contact_page form').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
}

// Check elements are visible ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

// Form submission ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function sendMail() {
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const lastName = document.getElementById('last_name').value;
        const firstName = document.getElementById('first_name').value;
        const email = document.getElementById('your_email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!lastName || !firstName || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        alert('Hello, Thank you for your message! We will get back to you soon, Happy Cooking:>.');
        
        form.reset();
    });
}