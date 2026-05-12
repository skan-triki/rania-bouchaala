// Rania Bouchaala — Candidature FLE
// Script : navigation mobile + smooth scroll + fade-in + navbar scroll

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const nav = document.querySelector('.nav');
  const links = document.querySelectorAll('.nav-links a');

  // --- Menu mobile ---
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      toggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        toggle.textContent = '☰';
      });
    });
  }

  // --- Navbar scroll effect ---
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // --- Parallaxe sur les formes ---
  const shapes = document.querySelectorAll('.shape');
  if (shapes.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          shapes.forEach((shape, i) => {
            const speed = 0.02 + (i * 0.01);
            shape.style.transform = `translateY(${y * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- Compteur animé ---
  const statNum = document.querySelector('.stat-num');
  if (statNum && !isNaN(parseInt(statNum.textContent))) {
    const target = parseInt(statNum.textContent);
    let counted = false;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          let current = 0;
          const duration = 1500;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            statNum.textContent = Math.floor(current);
          }, 16);
          counterObserver.unobserve(entry.target);
        }
      });
    });
    counterObserver.observe(statNum);
  }

  // --- Fade-in animations with stagger ---
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Auto-tag elements for animation if not already tagged
    const animateContainers = document.querySelectorAll('.specs-grid, .profil-grid, .lang-grid, .contact-grid, .timeline');
    animateContainers.forEach(container => {
      const children = container.children;
      Array.from(children).forEach((child, i) => {
        if (!child.classList.contains('fade-in')) {
          child.classList.add('fade-in', `stagger-${Math.min(i + 1, 5)}`);
        }
      });
    });

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  // --- Navbar active link ---
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  document.querySelectorAll('section[id], header[id]').forEach(el => sectionObserver.observe(el));
});
