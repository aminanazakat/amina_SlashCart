document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".sec6-slider-track");
  const cards = document.querySelectorAll(".sec6-product-card");
  const btnLeft = document.querySelector(".sec6-left-btn");
  const btnRight = document.querySelector(".sec6-right-btn");

  const cardsPerView = 4; 
  const gap = 10;
  let currentIndex = 0;
  const maxIndex = cards.length - cardsPerView;

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth;
    const offset = (cardWidth + gap) * currentIndex;
    track.style.transform = `translateX(-${offset}px)`;
  }

  btnLeft.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  btnRight.addEventListener("click", () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  window.addEventListener("resize", updateSlider);
  updateSlider();
});
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".sec6-slider-track");
  const cards = document.querySelectorAll(".sec6-product-card");
  const pagination = document.querySelector(".sec6-pagination");
  const cardsPerView = 4; // number of cards visible
  const gap = 10; // gap between cards in px

  const totalPages = Math.ceil(cards.length / cardsPerView);
  let currentPage = 0;

  // Create pagination dots
  pagination.innerHTML = "";
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentPage = i;
      updateSlider();
      updateDots();
    });
    pagination.appendChild(dot);
  }

  const dots = document.querySelectorAll(".sec6-pagination .dot");

  // Update slider position based on current page
  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + gap;
    const offset = currentPage * cardsPerView * cardWidth;
    track.style.transform = `translateX(-${offset}px)`;
  }

  // Update active dot
  function updateDots() {
    dots.forEach((d, i) => d.classList.toggle("active", i === currentPage));
  }

  // Optional: update dots on resize
  window.addEventListener("resize", () => {
    updateSlider();
  });

  // Initialize
  updateSlider();
  updateDots();
});