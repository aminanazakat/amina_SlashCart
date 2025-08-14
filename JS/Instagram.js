const sliderTrack = document.querySelector('.instagram-slider-track');
const cards = Array.from(document.querySelectorAll('.instagram-image-card'));
const pagination = document.querySelector('.instagram-pagination');

let currentIndex = 0;

// Get how many cards per page depending on screen width
function getCardsPerPage() {
  const width = window.innerWidth;
  if (width <= 480) return 2;
  if (width <= 768) return 3;
  return 4;
}

let cardsPerPage = getCardsPerPage();

// Set width of each card to evenly fill container
function updateCardWidths() {
  const containerWidth = document.querySelector('.instagram-slider-container').offsetWidth;
  const cardWidth = (containerWidth - (cardsPerPage - 1) * 10) / cardsPerPage; // include gap
  cards.forEach(card => {
    card.style.flex = `0 0 ${cardWidth}px`;
  });
}

// Create pagination dots
function createPagination() {
  pagination.innerHTML = '';
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToPage(i));
    pagination.appendChild(dot);
  }
}

// Go to a specific page
function goToPage(pageIndex) {
  const containerWidth = document.querySelector('.instagram-slider-container').offsetWidth;
  const offset = pageIndex * containerWidth; 
  sliderTrack.style.transform = `translateX(-${offset}px)`;
  currentIndex = pageIndex;

  // Update active dot
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === pageIndex);
  });
}

// Initialize slider
function initSlider() {
  cardsPerPage = getCardsPerPage();
  updateCardWidths();
  createPagination();
  goToPage(0);
}

// Resize listener
window.addEventListener('resize', initSlider);

initSlider();
