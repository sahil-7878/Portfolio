// Typing Effect - Hero
const typedText = document.getElementById('typed-text');
const roles = [
    'MCA Student',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Aspiring Software Developer'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typedText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

window.addEventListener('DOMContentLoaded', () => {
    typedText.textContent = '';
    setTimeout(typeEffect, 500);
});

// Navbar - Active link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Scroll Animations - Intersection Observer
const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            entry.target.classList.remove('hidden');
        }
    });
}, { threshold: 0.17 });

hiddenElements.forEach(el => observer.observe(el));

// Skill Bars - Animate fill width on scroll
const skillFills = document.querySelectorAll('.fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.getAttribute('data-width') || fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// Skill Percentage - Animate numbers counting up
const percentElements = document.querySelectorAll('.percent');

const percentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target')) || 0;
            let current = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current) + '%';
            }, 40);
        }
    });
}, { threshold: 0.4 });

percentElements.forEach(el => percentObserver.observe(el));

// Stats Counter - Animate numbers counting up (FASTER)
const statNumbers = document.querySelectorAll('.stat-number[data-count]');

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count')) || 0;
            let current = 0;
            const increment = target / 15;  // Increased from 50 → 15 (faster)
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current) + '+';
            }, 30);  // Reduced from 50ms → 30ms (faster)
        }
    });
}, { threshold: 0.4 });

statNumbers.forEach(el => statObserver.observe(el));

// About Popup
function openAbout() {
    document.getElementById('aboutPopup').style.display = 'flex';
}

function closeAbout() {
    document.getElementById('aboutPopup').style.display = 'none';
}

// Achievement Popup
function openAchievement() {
    document.getElementById('achievementPopup').style.display = 'flex';
}

function closeAchievement() {
    document.getElementById('achievementPopup').style.display = 'none';
}

// Image Popup
function openImage() {
    document.getElementById('imagePopup').style.display = 'flex';
}

function closeImage() {
    document.getElementById('imagePopup').style.display = 'none';
}

// Close popups on outside click
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('aboutPopup')) {
        closeAbout();
    }
    if (e.target === document.getElementById('achievementPopup')) {
        closeAchievement();
    }
    if (e.target === document.getElementById('imagePopup')) {
        closeImage();
    }
});

// Contact Form - Submit handler
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
    });
}