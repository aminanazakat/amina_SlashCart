///Section 5
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".sec5-slider-track");
  const slides = Array.from(document.querySelectorAll(".sec5-slide"));
  const paginationWrap = document.querySelector(".sec5-pagination");
  const sliderWrapper = document.querySelector(".sec5-slider");

  if (!track || slides.length === 0 || !paginationWrap) return;

  let currentIndex = 0;
  let slideHeight = 0;
  let autoTimer = null;
  const AUTO_MS = 4500;

  // Create dots
  slides.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", `Go to slide ${i+1}`);
    if (i === 0) btn.classList.add("active");
    btn.addEventListener("click", () => goTo(i));
    paginationWrap.appendChild(btn);
  });
  const dots = Array.from(paginationWrap.querySelectorAll("button"));

  function measure() {
    slideHeight = sliderWrapper.clientHeight;
    slides.forEach(s => s.style.height = `${slideHeight}px`);
    applyTransform();
  }

  function applyTransform() {
    track.style.transform = `translateY(-${currentIndex * slideHeight}px)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, slides.length - 1));
    applyTransform();
    resetAutoplay();
  }

  function startAutoplay() {
    stopAutoplay();
    autoTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      applyTransform();
    }, AUTO_MS);
  }
  function stopAutoplay() {
    if (autoTimer) clearInterval(autoTimer);
  }
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Wait for images to load
  const imgs = sliderWrapper.querySelectorAll("img");
  let imagesToLoad = imgs.length;
  if (imagesToLoad === 0) {
    measure();
    startAutoplay();
  } else {
    imgs.forEach(img => {
      if (img.complete) {
        imagesToLoad--;
      } else {
        img.addEventListener("load", () => {
          imagesToLoad--;
          if (imagesToLoad === 0) {
            measure();
            startAutoplay();
          }
        }, { once: true });
      }
    });
    if (imagesToLoad === 0) {
      measure();
      startAutoplay();
    }
  }

  // Resize
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      slides.forEach(s => s.style.height = '');
      measure();
    }, 120);
  });

  // Pause on hover
  sliderWrapper.addEventListener("mouseenter", stopAutoplay);
  sliderWrapper.addEventListener("mouseleave", startAutoplay);
});

const leftPanels = document.querySelectorAll('.op-left-panel');

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => {
    // Hide all left panels
    leftPanels.forEach(panel => panel.hidden = true);
    // Show the one matching category
    leftPanels[i].hidden = false;
  });
});