const slideImages = [
  "https://images.unsplash.com/photo-1756376748048-d51f2f2e87bc?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1770747965729-699a9923ef65?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1753597944169-e8a051118552?auto=format&fit=crop&w=1600&q=80"
];

const slides = document.querySelectorAll(".hero-slide");
slides.forEach((slide, index) => {
  slide.style.backgroundImage = `url(${slideImages[index % slideImages.length]})`;
});

let currentSlide = 0;
setInterval(() => {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}, 5000);

const countdownDate = new Date("November 22, 2027 19:00:00").getTime();
const countdownEls = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    Object.values(countdownEls).forEach((el) => (el.textContent = "00"));
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdownEls.days.textContent = String(days).padStart(2, "0");
  countdownEls.hours.textContent = String(hours).padStart(2, "0");
  countdownEls.minutes.textContent = String(minutes).padStart(2, "0");
  countdownEls.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.2 }
);

const animatedEls = document.querySelectorAll(".fade-in, .slide-in");
animatedEls.forEach((el) => observer.observe(el));

const galleryItems = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

galleryItems.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightbox.classList.add("active");
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

const scrollProgress = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = `${progress}%`;
});

const rsvpForm = document.querySelector(".rsvp-form");
rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  rsvpForm.reset();
  alert("Thank you for your RSVP. We look forward to celebrating with you.");
});
