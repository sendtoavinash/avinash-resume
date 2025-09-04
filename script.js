const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const yearEl = document.getElementById('year');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme !== 'light';
    document.documentElement.dataset.theme = dark ? 'light' : 'dark';
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('formMsg').textContent = 'Thank you! I will get back to you soon.';
    contactForm.reset();
  };
}

// Theme Toggle with localStorage
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.onclick = function() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  };
  // Load theme preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
  }
}

// Smooth scroll for sidebar nav (if visible)
document.querySelectorAll('.sidebar-nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
