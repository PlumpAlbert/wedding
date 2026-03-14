// GSAP ScrollTrigger Animations for Wedding Invitation
// Enhanced with amazing animations for better quality

document.addEventListener('DOMContentLoaded', function() {
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

  // Animate hero decorations (floating effect)
  const heroDecorations = document.querySelectorAll('.hero-decoration object');
  heroDecorations.forEach((dec, i) => {
    gsap.to(dec, {
      y: i % 2 === 0 ? -10 : 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
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

  // ========== DETAILS CARDS ==========
  staggerGroup('.detail-card', { y: 80, scale: 0.85, stagger: 0.25, ease: 'power3.out' });

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
  // Gallery items with a subtle zoom-in
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, i) => {
    gsap.fromTo(item,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: i * 0.1,
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