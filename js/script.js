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

// Enhanced navigation functionality
// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate offset for fixed navbar
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// RSVP Button Functionality
document.querySelector('.rsvp-btn').addEventListener('click', function() {
    // Create loading state
    const btn = this;
    const originalText = btn.textContent;
    
    // Show loading state
    btn.textContent = 'Обработка...';
    btn.disabled = true;
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Restore button
        btn.textContent = originalText;
        btn.disabled = false;
        
        // Show confirmation message
        alert('Спасибо за ваш интерес! Пожалуйста, свяжитесь с нами по адресу annaandmichael2026@gmail.com для подтверждения участия.');
    }, 1500);
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

// Add tooltip functionality for color swatches
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
        // Create tooltip if it doesn't exist
        let tooltip = document.querySelector('.color-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'color-tooltip';
            tooltip.style.cssText = 'position: fixed; background: rgba(0,0,0,0.8); color: white; padding: 8px 12px; border-radius: 4px; font-size: 14px; z-index: 1000; pointer-events: none;';
            document.body.appendChild(tooltip);
        }
        
        // Set tooltip text and position
        tooltip.textContent = this.title;
        const rect = this.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        
        // Fade in
        gsap.to(tooltip, {opacity: 1, duration: 0.3, ease: 'power2.out'});
        
        // Auto hide after 2 seconds
        setTimeout(() => {
            gsap.to(tooltip, {opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => {
                if (tooltip && tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }});
        }, 2000);
    });
    
    // Also show tooltip on hover
    swatch.addEventListener('mouseenter', function() {
        let tooltip = document.querySelector('.color-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'color-tooltip';
            tooltip.style.cssText = 'position: fixed; background: rgba(0,0,0,0.8); color: white; padding: 8px 12px; border-radius: 4px; font-size: 14px; z-index: 1000; pointer-events: none; opacity: 0;';
            document.body.appendChild(tooltip);
        }
        
        tooltip.textContent = this.title;
        const rect = this.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        
        gsap.to(tooltip, {opacity: 1, duration: 0.3, ease: 'power2.out'});
    });
    
    swatch.addEventListener('mouseleave', function() {
        const tooltip = document.querySelector('.color-tooltip');
        if (tooltip) {
            gsap.to(tooltip, {opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => {
                if (tooltip && tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }});
        }
    });
});

// Gallery Lightbox Functionality
const galleryItems = document.querySelectorAll('.gallery-item');

// Create lightbox elements if they don't exist
if (galleryItems.length > 0) {
    // Create overlay
    let overlay = document.getElementById('gallery-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'gallery-overlay';
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.9); display: none; justify-content: center; align-items: center; z-index: 1001; cursor: pointer;';
        document.body.appendChild(overlay);
    }
    
    // Create lightbox image
    let lightboxImg = document.getElementById('lightbox-img');
    if (!lightboxImg) {
        lightboxImg = document.createElement('img');
        lightboxImg.id = 'lightbox-img';
        lightboxImg.style.cssText = 'max-width: 90%; max-height: 90%; object-fit: contain;';
        overlay.appendChild(lightboxImg);
    }
    
    // Create close button
    let closeBtn = document.getElementById('lightbox-close');
    if (!closeBtn) {
        closeBtn = document.createElement('div');
        closeBtn.id = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = 'position: absolute; top: 20px; right: 30px; color: white; font-size: 50px; font-weight: bold; cursor: pointer; z-index: 1002;';
        overlay.appendChild(closeBtn);
    }
    
    // Open lightbox when gallery item is clicked
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            lightboxImg.src = imgSrc;
            overlay.style.display = 'flex';
            
            // Add animation
            gsap.fromTo(lightboxImg,
                {opacity: 0, scale: 0.8},
                {opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out'}
            );
        });
    });
    
    // Close lightbox when overlay or close button is clicked
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay || e.target === closeBtn) {
            gsap.to(lightboxImg, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    overlay.style.display = 'none';
                }
            });
        }
    });
    
    // Close lightbox when escape key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.style.display === 'flex') {
            gsap.to(lightboxImg, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    overlay.style.display = 'none';
                }
            });
        }
    });
}