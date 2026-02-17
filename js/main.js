// ===== Typing Animation =====
const typingPhrases = [
    "AI Researcher",
    "CS Student",
    "Reinforcement Learning Enthusiast",
    "Robotics & Embedded AI",
    "Low-Resource NLP",
    "Community Advocate"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeText() {
    const currentPhrase = typingPhrases[phraseIndex];

    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 40 : 70;

    if (!isDeleting && charIndex === currentPhrase.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        delay = 400;
    }

    setTimeout(typeText, delay);
}

// Start typing after page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 800);
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
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
}

window.addEventListener('scroll', updateActiveLink);

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navLinksContainer = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    navToggle.classList.toggle('active');
});

// Close mobile nav on link click
navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        navToggle.classList.remove('active');
    });
});

// ===== Scroll Fade-In Animation =====
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== Smooth scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Contact Form — AJAX submit + inline thank-you =====
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formResetBtn = document.getElementById('form-reset-btn');
const formSubmitBtn = document.getElementById('form-submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        formSubmitBtn.textContent = 'Sending...';
        formSubmitBtn.disabled = true;

        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');
                contactForm.reset();
            } else {
                throw new Error('submission failed');
            }
        })
        .catch(() => {
            formSubmitBtn.textContent = 'Something went wrong. Try again.';
            formSubmitBtn.disabled = false;
            setTimeout(() => { formSubmitBtn.textContent = 'Send Message'; }, 3000);
        });
    });
}

if (formResetBtn) {
    formResetBtn.addEventListener('click', function() {
        formSuccess.classList.remove('show');
        contactForm.style.display = 'flex';
        formSubmitBtn.textContent = 'Send Message';
        formSubmitBtn.disabled = false;
    });
}
