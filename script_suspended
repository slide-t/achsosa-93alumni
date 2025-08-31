/* ===== Menu Toggle ===== */
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("show");
}

// Auto-close menu when a link is clicked (for mobile)
document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    const nav = document.getElementById("navLinks");
    if (nav.classList.contains("show")) nav.classList.remove("show");
  });
});

/* ===== Collapsible Sections ===== */
document.querySelectorAll(".collapsible").forEach(button => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});

/* ===== Slider (index.html only) ===== */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let slideIndex = 0;

function showSlide(n) {
  if (!slides.length) return; // Skip if no slides on page
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (dots[i]) dots[i].classList.remove('active');
  });
  slides[n].classList.add('active');
  if (dots[n]) dots[n].classList.add('active');
  slideIndex = n;
}

function nextSlide() {
  if (!slides.length) return;
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

if (slides.length) setInterval(nextSlide, 4000);

/* ===== Scroll-to-Top Button ===== */
const scrollTopBtn = document.getElementById("scrollTop");
if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });
  scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ===== Lightbox Gallery (gallery.html) ===== */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');

if (galleryItems.length && lightbox) {
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.close');
  const prevBtn = lightbox.querySelector('.prev');
  const nextBtn = lightbox.querySelector('.next');
  let currentIndex = 0;

  function showLightbox(index) {
    const item = galleryItems[index];
    lightboxImg.src = item.querySelector('img').src;
    lightboxCaption.textContent = item.querySelector('.caption').textContent;
    lightbox.style.display = 'flex';
    currentIndex = index;
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => showLightbox(index));
  });

  closeBtn.addEventListener('click', () => lightbox.style.display = 'none');

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    showLightbox(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    showLightbox(currentIndex);
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });
}

/* ===== Service Worker ===== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('Service Worker registered:', registration.scope))
      .catch(error => console.error('Service Worker failed:', error));
  });
}
