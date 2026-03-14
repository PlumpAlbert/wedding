// Countdown Timer
function updateCountdown() {
  const weddingDate = new Date("June 15, 2026 16:00:00").getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  // Calculate days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result
  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");

  // If the countdown is finished, display a message
  if (distance < 0) {
    clearInterval(countdownInterval);
    document.querySelector("#countdown .content h2").textContent =
      "We Are Married!";
    document.querySelector(".countdown").style.display = "none";
  }
}

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

// Initialize countdown
updateCountdown();
