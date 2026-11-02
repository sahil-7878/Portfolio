// Typing Effect - Hero
const typedText = document.getElementById('typed-text');
const roles = ['MCA Student', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Aspiring Software Developer'];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    const current = roles[roleIndex];
    let speed;

    if (isDeleting) {
        typedText.textContent = current.substring(0, --charIndex);
        speed = 50;
    } else {
        typedText.textContent = current.substring(0, ++charIndex);
        speed = 100;
    }

    if (!isDeleting && charIndex === current.length) { isDeleting = true; speed = 2000; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 500; }

    setTimeout(typeEffect, speed);
}

// Navbar - Active link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveLink() {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
}

// Scroll Animations - Intersection Observer
const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            entry.target.classList.remove('hidden');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.17 });

// Skill Bars
const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const fill = entry.target;
        const width = fill.getAttribute('data-width') || fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => { fill.style.width = width; }, 100);
        obs.unobserve(fill);
    });
}, { threshold: 0.3 });

// Percent Counter
const percentObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target')) || 0;
        const start = performance.now();
        const tick = now => {
            const p = Math.min((now - start) / 1200, 1);
            el.textContent = Math.floor(target * p) + '%';
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
    });
}, { threshold: 0.4 });

// Stats Counter
const statObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count')) || 0;
        const suffix = el.getAttribute('data-suffix') ?? '+';
        const start = performance.now();
        const tick = now => {
            const p = Math.min((now - start) / 900, 1);
            el.textContent = Math.floor(target * p) + suffix;
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
    });
}, { threshold: 0.4 });

// Popups
function openPopup(id) { const p = document.getElementById(id); if (p) p.style.display = 'flex'; }
function closePopup(id) { const p = document.getElementById(id); if (p) p.style.display = 'none'; }
const openAbout = () => openPopup('aboutPopup');
const closeAbout = () => closePopup('aboutPopup');
const openAchievement = () => openPopup('achievementPopup');
const closeAchievement = () => closePopup('achievementPopup');
const openImage = () => openPopup('imagePopup');
const closeImage = () => closePopup('imagePopup');

// Contact form helpers
const PHONE = '916359915993';
function showStatus(msg, color) {
    const s = document.getElementById('formStatus');
    if (s) { s.innerHTML = msg; s.style.color = color; }
}
function validateForm() {
    const name = document.getElementById('formName')?.value.trim();
    const email = document.getElementById('formEmail')?.value.trim();
    const message = document.getElementById('formMessage')?.value.trim();
    if (!name || !email || !message) { showStatus('⚠️ Please fill in all fields.', '#ff6b6b'); return null; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showStatus('⚠️ Please enter a valid email.', '#ff6b6b'); return null; }
    return {
        name, email, message,
        subject: document.getElementById('formSubject')?.value.trim() || ''
    };
}

// WhatsApp Contact Form Handler
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('whatsappForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = validateForm();
        if (!data) return;

        let whatsappMsg = 'New message from Portfolio:\n\n';
        whatsappMsg += '👤 Name: ' + data.name + '\n';
        whatsappMsg += '📧 Email: ' + data.email + '\n';
        if (data.subject) whatsappMsg += '📌 Subject: ' + data.subject + '\n';
        whatsappMsg += '💬 Message: ' + data.message;

        window.open('https://wa.me/' + PHONE + '?text=' + encodeURIComponent(whatsappMsg), '_blank', 'noopener');
        showStatus('✅ Redirecting to WhatsApp...', '#25D366');
        setTimeout(function () {
            form.reset();
            showStatus('✨ Message sent! Check WhatsApp.', '#25D366');
        }, 2000);
    });
});

// Email Form Handler (Web3Forms)
function sendEmailForm() {
    const data = validateForm();
    if (!data) return;

    const form = document.getElementById('whatsappForm');
    const btn = document.querySelector('[onclick="sendEmailForm()"]');
    if (btn) btn.disabled = true;
    showStatus('⏳ Sending...', '#888');

    fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) })
        .then(r => r.json())
        .then(res => {
            if (res.success) {
                showStatus('✅ Email sent successfully!', '#25D366');
                form.reset();
            } else {
                showStatus('❌ ' + (res.message || 'Something went wrong. Try again.'), '#ff6b6b');
            }
        })
        .catch(() => showStatus('❌ Network error. Please try again.', '#ff6b6b'))
        .finally(() => { if (btn) btn.disabled = false; });
}

// Popup outside-click & Escape
window.addEventListener('click', e => {
    if (e.target.id === 'aboutPopup') closeAbout();
    if (e.target.id === 'achievementPopup') closeAchievement();
    if (e.target.id === 'imagePopup') closeImage();
});
window.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeAbout(); closeAchievement(); closeImage(); }
});

// Init
window.addEventListener('DOMContentLoaded', () => {
    // Typing
    if (typedText) {
        if (reduceMotion) { typedText.textContent = roles[0]; }
        else { typedText.textContent = ''; setTimeout(typeEffect, 500); }
    }
    // Navbar
    if (sections.length) {
        setActiveLink();
        window.addEventListener('scroll', setActiveLink, { passive: true });
    }
    // Observers
    document.querySelectorAll('.hidden').forEach(el => revealObserver.observe(el));
    document.querySelectorAll('.fill').forEach(f => skillObserver.observe(f));
    document.querySelectorAll('.percent').forEach(el => percentObserver.observe(el));
    document.querySelectorAll('.stat-number[data-count]').forEach(el => statObserver.observe(el));
});
