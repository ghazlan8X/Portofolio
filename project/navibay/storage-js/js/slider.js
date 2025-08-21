const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicatorsContainer = document.querySelector('.indicators');
let currentIndex = 0;
let autoSlideInterval;

slides.forEach((_, index) => {
    const indicator = document.createElement('span');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => updateSlide(index));
    indicatorsContainer.appendChild(indicator);
});
const indicators = document.querySelectorAll('.indicators span');

function updateSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    indicators.forEach(ind => ind.classList.remove('active'));
    indicators[currentIndex].classList.add('active');
}

function autoSlide() {
    autoSlideInterval = setInterval(() => updateSlide(currentIndex + 1), 10000);
}
autoSlide();

nextBtn.addEventListener('click', () => { updateSlide(currentIndex + 1); resetAutoSlide(); });
prevBtn.addEventListener('click', () => { updateSlide(currentIndex - 1); resetAutoSlide(); });

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlide();
}

// Swipe gestures
let startX = 0;
track.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
track.addEventListener('touchend', (e) => {
    let diff = startX - e.changedTouches[0].clientX;
    if (diff > 50) updateSlide(currentIndex + 1);
    if (diff < -50) updateSlide(currentIndex - 1);
    resetAutoSlide();
});