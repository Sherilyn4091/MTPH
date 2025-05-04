document.addEventListener('DOMContentLoaded', function() {
    
// Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
//header sticky
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

// animation
function addAnimationClasses() {
    //team section elements~~~~~~~~~~~~~~~
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

// check elements are visible in viewport
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

// form submission
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
        
        alert('Hi, Thank you for your message! We will get back to you soon, Happy Cooking:>.');
        
        form.reset();
    });
}