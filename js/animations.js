// GSAP ScrollTrigger Animations for Wedding Invitation
// Enhanced with amazing animations for better quality

document.addEventListener("DOMContentLoaded", function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) {
    document.documentElement.classList.add("reduce-motion");
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Helper: fade-up with more dynamic options
  function fadeUp(element, delay = 0, y = 50) {
    gsap.fromTo(
      element,
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
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }

  // Helper: stagger animation for a group of elements
  function staggerGroup(selector, options = {}) {
    const {
      y = 60,
      opacity = 0,
      scale = 0.9,
      duration = 0.8,
      stagger = 0.15,
      ease = "back.out(1.2)",
    } = options;
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    gsap.fromTo(
      elements,
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
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }

  // ========== HERO SECTION ==========
  const heroContent = document.querySelector("#hero .content");
  if (heroContent) {
    // Split hero content into children for staggered entrance
    const heroChildren = heroContent.children;
    gsap.fromTo(
      heroChildren,
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
        ease: "elastic.out(1, 0.5)",
        delay: 0.5,
      },
    );
  }

  // Hero hearts fall (♥)
  const heroParticlesEl = document.getElementById("hero-particles");
  if (heroParticlesEl) {
    const particleCount = 48;
    const colors = [
      "var(--dark-green)",
      "var(--black-pink)",
      "var(--light-green)",
      "var(--dark-pink)",
    ];
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("span");
      p.className = "hero-particle hero-particle--heart";
      p.setAttribute("aria-hidden", "true");
      p.textContent = "\u2665";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = -5 - Math.random() * 25 + "%";
      p.style.setProperty("--rotate", (Math.random() - 0.5) * 60 + "deg");
      p.style.color = colors[i % colors.length];
      heroParticlesEl.appendChild(p);
      const duration = 14 + Math.random() * 10;
      const xDrift = (Math.random() - 0.5) * 70;
      gsap.to(p, {
        y: "120vh",
        x: xDrift,
        rotation: (Math.random() - 0.5) * 40,
        duration,
        ease: "none",
        repeat: -1,
        delay: Math.random() * duration,
      });
      gsap.to(p, {
        opacity: 0.12,
        duration: duration * 0.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3,
      });
    }
  }

  // Animate hero decorations (floating + gentle pulse)
  const heroDecorations = document.querySelectorAll(".hero-decoration");
  heroDecorations.forEach((wrapper, i) => {
    const dec = wrapper.querySelector("object");
    if (dec) {
      gsap.to(dec, {
        y: i % 2 === 0 ? -10 : 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(wrapper, {
        scale: 0.99,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    }
  });

  // ========== WELCOME MESSAGE ==========
  const welcomeHeading = document.querySelector("#welcome-message h2");
  if (welcomeHeading) {
    gsap.fromTo(
      welcomeHeading,
      {
        opacity: 0,
        scale: 1.2,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: welcomeHeading,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }
  // Paragraphs with staggered fade-up
  staggerGroup("#welcome-message p", { y: 40, stagger: 0.2 });

  // Date as stamp / badge (scale + rotation)
  const welcomeDate = document.querySelector("#welcome-message p.date");
  if (welcomeDate) {
    gsap.fromTo(
      welcomeDate,
      { scale: 0.8, rotation: -5, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 0.54,
        duration: 0.9,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: welcomeDate,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }

  // ========== COUNTDOWN SECTION ==========
  const countdownHeading = document.querySelector("#countdown h2");
  if (countdownHeading) fadeUp(countdownHeading, 0, 30);

  // Countdown items with a cool numeric flip effect (simulated with scale)
  const countdownItems = document.querySelectorAll(".countdown-item");
  countdownItems.forEach((item, i) => {
    gsap.fromTo(
      item,
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
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  // ========== DETAILS (ZIGZAG) ==========
  const zigzagHeading = document.querySelector("#details h2");
  if (zigzagHeading) fadeUp(zigzagHeading);

  const zigzagLine = document.querySelector(".zigzag-line");
  if (zigzagLine) {
    // Line is centered via left + margin-left (not transform),
    // so GSAP can safely own transform for scaleY animation.
    gsap.to(zigzagLine, {
      scaleY: 1,
      duration: 1.4,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".zigzag",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }

  document.querySelectorAll(".zigzag-item").forEach((item) => {
    const dot     = item.querySelector(".zigzag-dot");
    const content = item.querySelector(".zigzag-content");
    const isLeft  = item.classList.contains("zigzag-item--left");

    if (dot) {
      gsap.fromTo(dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (content) {
      // --left card slides in from the right (x: 30 → 0)
      // --right card slides in from the left (x: -30 → 0)
      gsap.fromTo(content,
        { x: isLeft ? 30 : -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  });

  // Dress-code background wash when section enters view
  const dressCodeSection = document.getElementById("dress-code");
  if (dressCodeSection) {
    ScrollTrigger.create({
      trigger: dressCodeSection,
      start: "top 85%",
      onEnter: () => dressCodeSection.classList.add("wash-visible"),
      onLeaveBack: () => dressCodeSection.classList.remove("wash-visible"),
    });
  }

  // ========== DRESS CODE ==========
  const dressCodeHeading = document.querySelector("#dress-code h2");
  if (dressCodeHeading) fadeUp(dressCodeHeading);

  // Color swatches with a pop-in effect
  const colorSwatches = document.querySelectorAll(".color-swatch");
  colorSwatches.forEach((swatch, i) => {
    gsap.fromTo(
      swatch,
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
        ease: "elastic.out(1.2, 0.5)",
        scrollTrigger: {
          trigger: swatch,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  // ========== GALLERY ==========
  // Gallery items with clip-path circle reveal + zoom-in
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item, i) => {
    gsap.fromTo(
      item,
      {
        clipPath: "circle(0% at 50% 50%)",
        opacity: 0,
        scale: 0.9,
      },
      {
        clipPath: "circle(150% at 50% 50%)",
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  // ========== RSVP SECTION ==========
  const rsvpHeading = document.querySelector("#rsvp h2");
  if (rsvpHeading) fadeUp(rsvpHeading);

  const rsvpButton = document.querySelector(".rsvp-btn");
  if (rsvpButton) {
    // Magnetic button effect on hover
    rsvpButton.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = rsvpButton.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      gsap.to(rsvpButton, {
        x: x * 10,
        y: y * 10,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    rsvpButton.addEventListener("mouseleave", () => {
      gsap.to(rsvpButton, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    });

    // Ripple on click
    rsvpButton.addEventListener("click", (e) => {
      const rect = rsvpButton.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "rsvp-ripple";
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      rsvpButton.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 0.35 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        },
      );
    });

    // Heartbeat / glow pulse loop
    gsap.to(rsvpButton, {
      scale: 1.03,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      repeatDelay: 1.5,
    });

    // Entrance animation
    gsap.fromTo(
      rsvpButton,
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
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: rsvpButton,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }

  // ========== PARALLAX EFFECT (optional) ==========
  const parallaxSections = document.querySelectorAll(".parallax-section");
  parallaxSections.forEach((section) => {
    gsap.to(section, {
      backgroundPosition: "50% 100px",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // ========== FOOTER ==========
  const footer = document.querySelector("footer");
  if (footer) {
    gsap.fromTo(
      footer,
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
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }

  // ========== MOBILE SNAP SCROLL ==========
  // gsap.matchMedia scopes the ScrollTrigger to mobile only.
  // ScrollTrigger.matchMedia is deprecated since GSAP 3.11 — use gsap.matchMedia().
  const snapMM = gsap.matchMedia();
  snapMM.add("(max-width: 768px)", () => {
    const SECTIONS = [
      "#hero",
      "#welcome-message",
      "#details",
      "#dress-code",
      "#gallery",
      "#rsvp",
      "#countdown",
    ]
      .map((sel) => document.querySelector(sel))
      .filter(Boolean);

    const THRESHOLD = 0.25; // fraction of viewport height required to advance
    const THROTTLE_MS = 600; // minimum ms between snaps (prevents rapid skipping)
    let lastSnapTime = 0;
    let lastSnapPosition = 0; // stored in px, not as normalised 0-1

    // Called on every snapTo invocation. offsetTop values are stable after
    // ScrollTrigger.refresh() which runs automatically on init.
    // For sections taller than 1.2 × viewport a second snap point is added
    // at the section's bottom, allowing the user to read all content before
    // advancing to the next section.
    function buildSnapPoints() {
      // || 1 guard: maxScroll is used only as a filter bound (not a divisor),
      // so || 1 is harmless and prevents a degenerate 0-filtered points array
      // during any early-init edge case where layout hasn't settled.
      const maxScroll = ScrollTrigger.maxScroll(window) || 1;
      const vh = window.innerHeight;
      const points = [];

      SECTIONS.forEach((section) => {
        const top = Math.round(section.getBoundingClientRect().top + window.scrollY);
        points.push(top);

        if (section.offsetHeight > vh * 1.2) {
          points.push(top + section.offsetHeight - vh);
        }
      });

      return points
        .filter((p) => p >= 0 && p <= maxScroll)
        .sort((a, b) => a - b);
    }

    // trigger + start + end give ScrollTrigger a page-wide scroll range to observe.
    // Without them the snap callback never fires.
    // end is a function so it re-evaluates after ScrollTrigger.refresh().
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      snap: {
        snapTo(value, self) {
          const now = Date.now();
          if (now - lastSnapTime < THROTTLE_MS) {
            // Throttle: return last snapped position unchanged.
            // Fall back to the raw `value` if no snap has occurred yet
            // (lastSnapPosition is 0 on first-ever scroll event).
            if (lastSnapPosition === 0) return value;
            const max = ScrollTrigger.maxScroll(window) || 1;
            return lastSnapPosition / max;
          }

          const maxScroll = ScrollTrigger.maxScroll(window) || 1;
          const scrollY = value * maxScroll;
          const vh = window.innerHeight;
          const threshold = vh * THRESHOLD;
          const points = buildSnapPoints();
          const direction = self?.direction ?? 1;

          // nearest point AT OR BELOW current scroll position
          const prevPoint = [...points].reverse().find((p) => p <= scrollY + 1);
          // nearest point STRICTLY ABOVE current scroll position
          const nextPoint = points.find((p) => p > scrollY + 1);

          let target;
          if (direction > 0 && nextPoint !== undefined) {
            // Scrolling down: advance only if scrolled > threshold past prevPoint
            target =
              scrollY - (prevPoint ?? 0) >= threshold
                ? nextPoint
                : (prevPoint ?? 0);
          } else if (direction < 0 && prevPoint !== undefined) {
            // Scrolling up: retreat only if scrolled > threshold above nextPoint.
            // When nextPoint is undefined (already past last snap point),
            // snap to prevPoint unconditionally — there is no forward to return to.
            target =
              nextPoint !== undefined && nextPoint - scrollY >= threshold
                ? nextPoint
                : prevPoint;
          } else {
            // Default: snap to nearest point
            target = points.reduce((a, b) =>
              Math.abs(b - scrollY) < Math.abs(a - scrollY) ? b : a
            );
          }

          lastSnapTime = now;
          lastSnapPosition = target; // store in px for throttle return
          return target / maxScroll;
        },
        duration: { min: 0.4, max: 0.7 },
        ease: "power2.inOut",
        delay: 0.05,
      },
    });

    // Cleanup called by gsap.matchMedia when viewport exceeds 768px
    return () => {};
  });

  // Debug log
  console.log("Enhanced scroll animations initialized.");
});
