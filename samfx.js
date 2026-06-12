/* ============================================
   SAMFIX TECHNOLOGY — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Product filter buttons ── */
  const filterBtns = document.querySelectorAll('.pf-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ── Add to cart buttons ── */
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (btn.dataset.added) return;
      btn.dataset.added = 'true';
      btn.textContent = '✓';
      btn.style.background = '#0fa899';
      setTimeout(() => {
        btn.textContent = '+';
        btn.style.background = '';
        delete btn.dataset.added;
      }, 1500);
    });
  });

  /* ── Mobile nav hamburger ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ── Smooth-scroll nav links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');

  function highlightNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navAs.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--white)'
        : '';
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ── Scroll-reveal animation ── */
  const revealEls = document.querySelectorAll(
    '.svc-card, .prod-card, .acc-card, .why-card, .rev-card, .r-step'
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    observer.observe(el);
  });

  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .revealed { opacity: 1 !important; transform: translateY(0) !important; }
    </style>
  `);

  /* ── CTA & nav-cta scroll to repair ── */
  document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── Social icon placeholder feedback ── */
  document.querySelectorAll('.soc').forEach(btn => {
    btn.addEventListener('click', () => {
      const original = btn.textContent;
      btn.textContent = '✓';
      setTimeout(() => (btn.textContent = original), 1000);
    });
  });

});