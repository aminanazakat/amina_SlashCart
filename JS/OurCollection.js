
// OUR COLLECTION SECTION JS=======================

(() => {
  const sliderTrack = document.querySelector('.slider-track');
  const slides = [...document.querySelectorAll('.slide')];
  const pagination = document.querySelector('.pagination');
  const prevBtn = document.querySelector('.slider-btn.left');
  const nextBtn = document.querySelector('.slider-btn.right');

  let slideWidthPercent = 33.3333; // default 3 slides visible
  let currentIndex = 0;

  // Update slideWidthPercent based on current flex basis (responsive)
  const updateSlideWidthPercent = () => {
    const slideStyle = getComputedStyle(slides[0]);
    slideWidthPercent = parseFloat(slideStyle.flexBasis);
  };

  // Calculate max index to prevent empty space on right
  const getMaxIndex = () => {
    const visibleCount = Math.round(100 / slideWidthPercent);
    return Math.max(slides.length - visibleCount, 0);
  };

  const maxIndex = () => getMaxIndex();

  // Update slider transform
  const updateSlider = () => {
    const translateX = -(currentIndex * slideWidthPercent);
    sliderTrack.style.transform = `translateX(${translateX}%)`;
    updatePagination();
  };

  // Pagination dots
  const createPagination = () => {
    pagination.innerHTML = '';
    const maxIdx = maxIndex();
    const pages = maxIdx + 1;
    for(let i=0; i<pages; i++) {
      const dot = document.createElement('button');
      dot.className = 'pagination-dot';
      dot.setAttribute('aria-label', `Go to slide ${i+1}`);
      if(i === 0) dot.classList.add('active');
      dot.onclick = () => {
        currentIndex = i;
        updateSlider();
      };
      pagination.appendChild(dot);
    }
  };

  const updatePagination = () => {
    pagination.querySelectorAll('.pagination-dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  };

  // Button handlers
  prevBtn.onclick = () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex();
    updateSlider();
  };

  nextBtn.onclick = () => {
    currentIndex = currentIndex < maxIndex() ? currentIndex + 1 : 0;
    updateSlider();
  };

  // On resize update widths, maxIndex, pagination
  window.addEventListener('resize', () => {
    updateSlideWidthPercent();
    createPagination();
    if(currentIndex > maxIndex()) currentIndex = maxIndex();
    updateSlider();
  });

  // Init
  updateSlideWidthPercent();
  createPagination();
  updateSlider();
})();
