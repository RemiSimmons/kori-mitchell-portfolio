document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile nav toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ── Scroll reveal with Intersection Observer ──
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .skills-category');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');

      // Stagger skill tags within a category
      const tags = entry.target.querySelectorAll('.skill-tag');
      tags.forEach((tag, i) => {
        tag.style.transitionDelay = `${i * 80}ms`;
      });

      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Staggered reveal for experience cards ──
  const experienceCards = document.querySelectorAll('.experience-card');
  experienceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 120}ms`;
  });

  // ── Stagger stats ──
  const stats = document.querySelectorAll('.stat');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      stats.forEach((stat, i) => {
        stat.style.transitionDelay = `${i * 100}ms`;
        stat.classList.add('visible');
      });
      statsObserver.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  if (stats.length > 0) {
    statsObserver.observe(stats[0].parentElement);
  }

  // ── Smooth anchor scrolling (fallback for older browsers) ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
