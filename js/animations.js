// GSAP ScrollTrigger Animations for Wedding Invitation
// Enhanced with amazing animations for better quality

document.addEventListener('DOMContentLoaded', function() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduce-motion');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Helper: fade-up with more dynamic options
  function fadeUp(element, delay = 0, y = 50) {
    gsap.fromTo(element,
      {
        y: y,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }

  // Helper: stagger animation for a group of elements
  function staggerGroup(selector, options = {}) {
    const { y = 60, opacity = 0, scale = 0.9, duration = 0.8, stagger = 0.15, ease = 'back.out(1.2)' } = options;
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    gsap.fromTo(elements,
      {
        y: y,
        opacity: opacity,
        scale: scale,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: duration,
        stagger: stagger,
        ease: ease,
        scrollTrigger: {
          trigger: elements[0].parentElement,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }

  // ========== HERO SECTION ==========
  const heroContent = document.querySelector('#hero .content');
  if (heroContent) {
    // Split hero content into children for staggered entrance
    const heroChildren = heroContent.children;
    gsap.fromTo(heroChildren,
      {
        y: 40,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.5,
      }
    );
  }

  // Hero soft particle / petal fall
  const heroParticlesEl = document.getElementById('hero-particles');
  if (heroParticlesEl) {
    const particleCount = 18;
    const colors = ['var(--dark-green)', 'var(--light-green)', 'var(--black-pink)'];
    for (let i = 0; i < particleCount; i++) {
      const isPetal = i % 4 === 0;
      const p = document.createElement('div');
      p.className = 'hero-particle' + (isPetal ? ' hero-particle--petal' : '');
      p.style.left = Math.random() * 100 + '%';
      p.style.top = -20 - Math.random() * 20 + '%';
      p.style.setProperty('--rotate', Math.random() * 360 + 'deg');
      if (!isPetal) p.style.backgroundColor = colors[i % colors.length];
      heroParticlesEl.appendChild(p);
      const duration = 12 + Math.random() * 8;
      const xDrift = (Math.random() - 0.5) * 80;
      gsap.to(p, {
        y: '120vh',
        x: xDrift,
        duration,
        ease: 'none',
        repeat: -1,
        delay: Math.random() * duration,
      });
      gsap.to(p, {
        opacity: isPetal ? 0.08 : 0.12,
        duration: duration * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.4,
      });
    }
  }

  // Animate hero decorations (floating + gentle pulse)
  const heroDecorations = document.querySelectorAll('.hero-decoration');
  heroDecorations.forEach((wrapper, i) => {
    const dec = wrapper.querySelector('object');
    if (dec) {
      gsap.to(dec, {
        y: i % 2 === 0 ? -10 : 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(wrapper, {
        scale: 0.99,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    }
  });

  // ========== WELCOME MESSAGE ==========
  const welcomeHeading = document.querySelector('#welcome-message h2');
  if (welcomeHeading) {
    gsap.fromTo(welcomeHeading,
      {
        opacity: 0,
        scale: 1.2,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: welcomeHeading,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }
  // Paragraphs with staggered fade-up
  staggerGroup('#welcome-message p', { y: 40, stagger: 0.2 });

  // Date as stamp / badge (scale + rotation)
  const welcomeDate = document.querySelector('#welcome-message p.date');
  if (welcomeDate) {
    gsap.fromTo(welcomeDate,
      { scale: 0.8, rotation: -5, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 0.54,
        duration: 0.9,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: welcomeDate,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // ========== COUNTDOWN SECTION ==========
  const countdownHeading = document.querySelector('#countdown h2');
  if (countdownHeading) fadeUp(countdownHeading, 0, 30);

  // Countdown items with a cool numeric flip effect (simulated with scale)
  const countdownItems = document.querySelectorAll('.countdown-item');
  countdownItems.forEach((item, i) => {
    gsap.fromTo(item,
      {
        y: 60,
        opacity: 0,
        rotationX: 90,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1,
        delay: i * 0.2,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  });

  // ========== DETAILS (TIMELINE) ==========
  const detailsHeading = document.querySelector('#details h2');
  if (detailsHeading) fadeUp(detailsHeading);

  const timeline = document.querySelector('.timeline');
  const timelineLine = document.querySelector('.timeline-line');
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timeline && timelineLine) {
    gsap.to(timelineLine, {
      scaleY: 1,
      duration: 1.2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: timeline,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }
  timelineItems.forEach((item, i) => {
    const dot = item.querySelector('.timeline-dot');
    const content = item.querySelector('.timeline-content');
    if (dot) {
      gsap.fromTo(dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
    if (content) {
      gsap.fromTo(content,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  });

  // Section divider flourish (draw-in on scroll)
  document.querySelectorAll('.section-divider-line').forEach((line) => {
    gsap.to(line, {
      scaleX: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // Dress-code background wash when section enters view
  const dressCodeSection = document.getElementById('dress-code');
  if (dressCodeSection) {
    ScrollTrigger.create({
      trigger: dressCodeSection,
      start: 'top 85%',
      onEnter: () => dressCodeSection.classList.add('wash-visible'),
      onLeaveBack: () => dressCodeSection.classList.remove('wash-visible'),
    });
  }

  // ========== DRESS CODE ==========
  const dressCodeHeading = document.querySelector('#dress-code h2');
  if (dressCodeHeading) fadeUp(dressCodeHeading);

  // Color swatches with a pop-in effect
  const colorSwatches = document.querySelectorAll('.color-swatch');
  colorSwatches.forEach((swatch, i) => {
    gsap.fromTo(swatch,
      {
        scale: 0,
        rotation: 180,
        opacity: 0,
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'elastic.out(1.2, 0.5)',
        scrollTrigger: {
          trigger: swatch,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  });

  // ========== GALLERY ==========
  // Gallery items with clip-path circle reveal + zoom-in
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, i) => {
    gsap.fromTo(item,
      {
        clipPath: 'circle(0% at 50% 50%)',
        opacity: 0,
        scale: 0.9,
      },
      {
        clipPath: 'circle(150% at 50% 50%)',
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  });

  // ========== RSVP SECTION ==========
  const rsvpHeading = document.querySelector('#rsvp h2');
  if (rsvpHeading) fadeUp(rsvpHeading);

  const rsvpButton = document.querySelector('.rsvp-btn');
  if (rsvpButton) {
    // Magnetic button effect on hover
    rsvpButton.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = rsvpButton.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      gsap.to(rsvpButton, {
        x: x * 10,
        y: y * 10,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    rsvpButton.addEventListener('mouseleave', () => {
      gsap.to(rsvpButton, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    });

    // Ripple on click
    rsvpButton.addEventListener('click', (e) => {
      const rect = rsvpButton.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'rsvp-ripple';
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      rsvpButton.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 0.35 }, {
        scale: 1,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => ripple.remove(),
      });
    });

    // Heartbeat / glow pulse loop
    gsap.to(rsvpButton, {
      scale: 1.03,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      repeatDelay: 1.5,
    });

    // Entrance animation
    gsap.fromTo(rsvpButton,
      {
        scale: 0,
        opacity: 0,
        rotation: -180,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: rsvpButton,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }

  // ========== PARALLAX EFFECT (optional) ==========
  const parallaxSections = document.querySelectorAll('.parallax-section');
  parallaxSections.forEach(section => {
    gsap.to(section, {
      backgroundPosition: '50% 100px',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  });

  // ========== FOOTER ==========
  const footer = document.querySelector('footer');
  if (footer) {
    gsap.fromTo(footer,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: footer,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }

  // Debug log
  console.log('Enhanced scroll animations initialized.');
});