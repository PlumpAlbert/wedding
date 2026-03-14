// GSAP ScrollTrigger Animations for Wedding Invitation
// Ensure GSAP and ScrollTrigger are loaded (they are included via CDN)

document.addEventListener('DOMContentLoaded', function() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Helper function to create a fade-up animation
  function fadeUp(element, delay = 0) {
    gsap.fromTo(element,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }

  // Animate hero content
  const heroContent = document.querySelector('#hero .content');
  if (heroContent) {
    gsap.from(heroContent, {
      y: 30,
      opacity: 0,
      duration: 1.5,
      delay: 0.5,
      ease: 'power2.out',
    });
  }

  // Animate welcome message section
  const welcomeHeading = document.querySelector('#welcome-message h2');
  const welcomeParagraphs = document.querySelectorAll('#welcome-message p');
  if (welcomeHeading) fadeUp(welcomeHeading);
  welcomeParagraphs.forEach((p, i) => {
    fadeUp(p, i * 0.2);
  });

  // Animate countdown section
  const countdownHeading = document.querySelector('#countdown h2');
  const countdownItems = document.querySelectorAll('.countdown-item');
  if (countdownHeading) fadeUp(countdownHeading);
  countdownItems.forEach((item, i) => {
    fadeUp(item, i * 0.15);
  });

  // Animate details cards
  const detailCards = document.querySelectorAll('.detail-card');
  detailCards.forEach((card, i) => {
    gsap.fromTo(card,
      {
        y: 60,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: i * 0.2,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  });

  // Animate dress code section
  const dressCodeHeading = document.querySelector('#dress-code h2');
  const dressCodeContent = document.querySelector('#dress-code .dress-code-content');
  const colorSwatches = document.querySelectorAll('.color-swatch');
  if (dressCodeHeading) fadeUp(dressCodeHeading);
  if (dressCodeContent) fadeUp(dressCodeContent, 0.2);
  colorSwatches.forEach((swatch, i) => {
    gsap.fromTo(swatch,
      {
        scale: 0,
        rotation: -180,
      },
      {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: swatch,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  });

  // Animate gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, i) => {
    gsap.fromTo(item,
      {
        y: 80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
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

  // Animate RSVP section
  const rsvpHeading = document.querySelector('#rsvp h2');
  const rsvpButton = document.querySelector('.rsvp-btn');
  if (rsvpHeading) fadeUp(rsvpHeading);
  if (rsvpButton) {
    gsap.fromTo(rsvpButton,
      {
        scale: 0.5,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: 'bounce.out',
        scrollTrigger: {
          trigger: rsvpButton,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }

  // Debug log
  console.log('Scroll animations initialized.');
});