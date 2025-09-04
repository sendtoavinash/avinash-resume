// Utilities
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Dark mode is the default; theme toggle removed

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const messageElement = document.getElementById('formMsg');
    if (messageElement) {
      messageElement.textContent = 'Thank you! I will get back to you soon.';
    }
    contactForm.reset();
  });
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

// IntersectionObserver: animate skill bars and reveal timeline items
const onVisibleObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Animate skill bars
    if (entry.target.classList.contains('skills-grid')) {
      entry.target.querySelectorAll('.skill-bar .bar-fill').forEach(fill => {
        const targetWidth = fill.dataset.width;
        if (targetWidth && !fill.dataset.animated) {
          fill.style.width = targetWidth + '%';
          fill.dataset.animated = 'true';
        }
      });
    }

    // Reveal timeline items
    if (entry.target.classList.contains('timeline-item')) {
      entry.target.classList.add('show');
    }

    observer.unobserve(entry.target);
  });
}, { threshold: 0.2 });

// Observe skills grid
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) {
  onVisibleObserver.observe(skillsGrid);
}

// Prepare and observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
  item.classList.add('reveal');
  onVisibleObserver.observe(item);
});

// Experience Counters (About section)
const animateCounter = (element, target, durationMs, decimals = 0) => {
  if (!element) return;
  const start = 0;
  const startTime = performance.now();
  const step = (now) => {
    const progress = Math.min((now - startTime) / durationMs, 1);
    const raw = start + (target - start) * progress;
    const factor = Math.pow(10, decimals);
    const value = Math.round(raw * factor) / factor;
    element.textContent = value.toFixed(decimals);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const aboutCounters = document.querySelectorAll('[data-counter]');
if (aboutCounters.length) {
  const countersObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      let target = Number(element.getAttribute('data-target')) || 0;
      let decimals = 0;
      if (element.getAttribute('data-compute') === 'years-experience') {
        // Compute years since May 2018 to current date
        const startDate = new Date('2018-05-01T00:00:00Z');
        const now = new Date();
        const diffMs = now - startDate;
        const years = diffMs / (1000 * 60 * 60 * 24 * 365.25);
        target = Math.max(0, years);
        decimals = 1;
      }
      animateCounter(element, target, 1200, decimals);
      observer.unobserve(element);
    });
  }, { threshold: 0.4 });

  aboutCounters.forEach(el => countersObserver.observe(el));
}

// Skills filter chips -> filter experience timeline
const chipsContainer = document.getElementById('skillChips');
const timelineItems = Array.from(document.querySelectorAll('.timeline-item'));
if (chipsContainer && timelineItems.length) {
  chipsContainer.addEventListener('click', (e) => {
    const target = e.target.closest('.chip');
    if (!target) return;

    // Toggle selection
    if (target.dataset.value === 'all') {
      chipsContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      target.classList.add('active');
      timelineItems.forEach(item => item.classList.remove('dim'));
      return;
    }

    // Non-ALL selection
    chipsContainer.querySelector('.chip[data-value="all"]').classList.remove('active');
    target.classList.toggle('active');

    const activeValues = Array.from(chipsContainer.querySelectorAll('.chip.active'))
      .map(c => c.dataset.value)
      .filter(v => v && v !== 'all');

    if (activeValues.length === 0) {
      chipsContainer.querySelector('.chip[data-value="all"]').classList.add('active');
      timelineItems.forEach(item => item.classList.remove('dim'));
      return;
    }

    timelineItems.forEach(item => {
      const tags = (item.getAttribute('data-tags') || '').toLowerCase().split(',').map(s => s.trim());
      const matches = activeValues.every(v => tags.includes(v));
      item.classList.toggle('dim', !matches);
    });
  });
}
