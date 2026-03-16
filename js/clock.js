// Countdown Timer with digit flip and confetti at zero
(function () {
  const weddingDate = new Date("June 24, 2026 16:00:00").getTime();
  const digitIds = ['days', 'hours', 'minutes', 'seconds'];
  const prevValues = { days: '00', hours: '00', minutes: '00', seconds: '00' };
  let countdownInterval;
  let confettiFired = false;

  function flipDigit(id, newStr) {
    const el = document.getElementById(id);
    if (!el) return;
    const inner = el.querySelector('.countdown-digit-inner');
    if (!inner || inner.textContent === newStr) return;
    const parent = el.closest('.countdown-digit');
    if (!parent || typeof gsap === 'undefined') {
      inner.textContent = newStr;
      return;
    }
    gsap.to(inner, {
      rotationX: -90,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: function () {
        inner.textContent = newStr;
        gsap.set(inner, { rotationX: 90 });
        gsap.to(inner, {
          rotationX: 0,
          duration: 0.2,
          ease: 'power2.out',
        });
      },
    });
  }

  function setDigit(idTens, idOnes, value) {
    const str = Math.min(99, Math.max(0, value)).toString().padStart(2, '0');
    flipDigit(idTens, str[0]);
    flipDigit(idOnes, str[1]);
  }

  function pulseCountdown() {
    const heart = document.querySelector('.countdown-heart');
    if (heart && typeof gsap !== 'undefined') {
      gsap.to(heart, { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1 });
    }
  }

  function fireConfetti() {
    if (confettiFired || typeof gsap === 'undefined') return;
    confettiFired = true;
    const container = document.querySelector('#countdown .content');
    if (!container) return;
    const colors = ['#f79aaf', '#99a982', '#697c60', '#f9f5f0'];
    const shapes = [];
    for (let i = 0; i < 50; i++) {
      const s = document.createElement('div');
      s.className = 'countdown-confetti';
      s.style.cssText = `
        position:absolute; width:8px; height:8px; border-radius:50%;
        left:50%; top:50%; background:${colors[i % colors.length]};
        pointer-events:none;
      `;
      if (i % 4 === 0) {
        s.style.borderRadius = '2px';
        s.style.width = '6px';
        s.style.height = '10px';
      }
      container.appendChild(s);
      const angle = Math.random() * 360;
      const dist = 80 + Math.random() * 200;
      const tx = Math.cos(angle * Math.PI / 180) * dist;
      const ty = Math.sin(angle * Math.PI / 180) * dist - 100;
      gsap.to(s, {
        x: tx,
        y: ty,
        opacity: 0,
        rotation: Math.random() * 360,
        duration: 1.5 + Math.random() * 0.5,
        ease: 'power2.out',
        onComplete: function () { s.remove(); },
      });
    }
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      document.querySelector("#countdown .content h2").textContent = "Мы поженились!";
      const heart = document.querySelector(".countdown-heart");
      const countdown = document.querySelector(".countdown");
      if (heart) heart.style.display = "none";
      if (countdown) countdown.style.display = "none";
      fireConfetti();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setDigit('days-tens', 'days-ones', days);
    setDigit('hours-tens', 'hours-ones', hours);
    setDigit('minutes-tens', 'minutes-ones', minutes);
    setDigit('seconds-tens', 'seconds-ones', seconds);

    prevValues.days = days.toString().padStart(2, '0');
    prevValues.hours = hours.toString().padStart(2, '0');
    prevValues.minutes = minutes.toString().padStart(2, '0');
    prevValues.seconds = seconds.toString().padStart(2, '0');

    pulseCountdown();
  }

  countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
})();
