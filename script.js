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

if (yearEl) yearEl.textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navMenu?.classList.remove('open');
      history.pushState(null, '', a.getAttribute('href'));
    }
  });
});

// Experience Counter Animation
document.addEventListener('DOMContentLoaded', function() {
  const expCounter = document.getElementById('expCounter');
  if (expCounter) {
    let years = 6;
    let count = 0;
    let interval = setInterval(() => {
      if (count < years) {
        count++;
        expCounter.textContent = count;
      } else {
        clearInterval(interval);
      }
    }, 100);
  }
});

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
