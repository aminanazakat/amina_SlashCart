document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".reviews-slider-track");
  const cards = document.querySelectorAll(".review-card");
  const pagination = document.querySelector(".reviews-pagination");

  const cardsPerPage = 3; // Always show 3 reviews at a time
  let currentPage = 0;
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  function renderPagination() {
    pagination.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === currentPage) dot.classList.add("active");
      dot.addEventListener("click", () => goToPage(i));
      pagination.appendChild(dot);
    }
  }

  function goToPage(pageIndex) {
    currentPage = pageIndex;
    const offset = -(pageIndex * (100 / cardsPerPage) * cardsPerPage); 
    // Or simply -(pageIndex * 100) since each "page" is 100% width of container
    track.style.transform = `translateX(-${pageIndex * 100}%)`;
    updateActiveDot();
  }

  function updateActiveDot() {
    const dots = document.querySelectorAll(".reviews-pagination .dot");
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentPage].classList.add("active");
  }

  function initSlider() {
    currentPage = 0;
    track.style.transform = "translateX(0%)";
    renderPagination();
  }

  initSlider();
});
