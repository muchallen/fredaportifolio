// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// IntersectionObserver for reveal animations
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }
  }, {rootMargin: '0px 0px -10% 0px', threshold: 0.1});

  document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-zoom').forEach(el => io.observe(el));
}

// Light parallax on hero image
const heroImg = document.querySelector('.hero-image');
if (heroImg && !prefersReduced) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY || window.pageYOffset;
    // Move slightly slower than scroll
    heroImg.style.transform = `translate3d(0, ${Math.min(30, y * 0.06)}px, 0) scale(1.02)`;
  }, {passive:true});
}

// Accessibility: focus styles when using keyboard
(function(){
  function handleFirstTab(e){
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
})();
