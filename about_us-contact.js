document.addEventListener('DOMContentLoaded', function() {
    const storedName = localStorage.getItem('firstName');
    if (storedName) {
        const userNameElements = document.querySelectorAll('#userName');
        userNameElements.forEach(element => {
            element.textContent = storedName;
        });
    } else {
        const userNameElements = document.querySelectorAll('#userName');
        userNameElements.forEach(element => {
            element.textContent = 'Guest';
        });
    }  

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

// sign-up button to user name ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
                
        // dropdow on click ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownMenu.classList.toggle('show');
        });
        
        document.addEventListener('click', function(e) {
            if (!userMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
                        
        const viewProfileButton = document.getElementById('viewProfileButton');
        if (viewProfileButton) {
            viewProfileButton.addEventListener('click', function() {
                if (currentPage !== 'profile.html') {
                    window.location.href = 'profile.html';
                } else {
                    dropdownMenu.classList.remove('show');
                }
            });
        }
        
        // Logout ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', function() {
                localStorage.removeItem('firstName');
                localStorage.removeItem('lastName');
                localStorage.removeItem('email');
                window.location.href = 'log-in.html';
            });
        }
    }

});

// animations~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

// check elements are visible~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

// form submission~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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