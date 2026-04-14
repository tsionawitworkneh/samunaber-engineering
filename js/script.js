// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== HERO SLIDESHOW =====
const slides = document.querySelectorAll('.hero-slide');
const indicatorsContainer = document.getElementById('indicators');
let current = 0;
let transitioning = false;

slides.forEach((_, i) => {
  const btn = document.createElement('button');
  btn.className = 'indicator' + (i === 0 ? ' active' : '');
  btn.onclick = () => goTo(i);
  indicatorsContainer.appendChild(btn);
});

slides[0].style.opacity = '1';
slides[0].style.zIndex = '1';

function goTo(index) {
  if (transitioning || index === current) return;
  transitioning = true;

  slides[index].style.zIndex = '2';
  slides[index].style.opacity = '1';
  slides[current].style.opacity = '0';

  document.querySelectorAll('.indicator').forEach((ind, i) => {
    ind.classList.toggle('active', i === index);
  });

  setTimeout(() => {
    slides[current].style.zIndex = '0';
    slides[index].style.zIndex = '1';
    current = index;
    transitioning = false;
  }, 1000);
}

setInterval(() => {
  goTo((current + 1) % slides.length);
}, 5000);

