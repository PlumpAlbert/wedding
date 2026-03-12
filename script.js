// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('June 15, 2026 16:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Calculate days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    // If the countdown is finished, display a message
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('#countdown .content h2').textContent = 'We Are Married!';
        document.querySelector('.countdown').style.display = 'none';
    }
}

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

// Initialize countdown
updateCountdown();

// Enhanced Parallax Effects with GSAP
// Hero section parallax
gsap.to("#hero", {
    backgroundPosition: "50% 100%",
    ease: "none",
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Countdown section parallax
gsap.to("#countdown", {
    backgroundPosition: "50% 100%",
    ease: "none",
    scrollTrigger: {
        trigger: "#countdown",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

// RSVP section parallax
gsap.to("#rsvp", {
    backgroundPosition: "50% 100%",
    ease: "none",
    scrollTrigger: {
        trigger: "#rsvp",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

// Smooth scrolling for navigation (if we add nav links later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// RSVP Button Functionality
document.querySelector('.rsvp-btn').addEventListener('click', function() {
    alert('Thank you for your interest! Please contact us at annaandmichael2026@gmail.com to RSVP.');
});

// Enhanced animations on scroll with GSAP
// Hero content animation
gsap.from("#hero .content", {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#hero",
        start: "top center",
        toggleActions: "play none none reverse"
    }
});

// Our Story animation
gsap.from("#story .story-content p", {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#story",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// Details cards animation
gsap.from(".detail-card", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    ease: "back.out(1.1)",
    scrollTrigger: {
        trigger: ".detail-card",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// Dress code animation
gsap.from("#dress-code .dress-code-content", {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#dress-code",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// RSVP button animation
gsap.from(".rsvp-btn", {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: "#rsvp",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

// Removed floating animation for handwritten text as per request