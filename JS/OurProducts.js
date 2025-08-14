  /* <!-- =================== -->
 <!-- Products + Categories -->
  <!-- =================== !> */

document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".op-cat-btn");
  const productPanels = document.querySelectorAll(".op-products-panel");
  const leftPanels = document.querySelectorAll(".op-left-panel"); // NEW

  let activeIndex = 0;
  showCategory(activeIndex);

  categoryButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (i !== activeIndex) {
        showCategory(i);
      }
    });
  });

  function showCategory(index) {
    // Update button states
    categoryButtons.forEach((btn, i) => {
      btn.classList.toggle("op-cat-active", i === index);
      btn.setAttribute("aria-selected", i === index);
      btn.setAttribute("tabindex", i === index ? "0" : "-1");
    });

    // Show the relevant right panel
    productPanels.forEach((panel, i) => {
      if (i === index) {
        panel.removeAttribute("hidden");
        resetSlider(panel);
      } else {
        panel.setAttribute("hidden", "");
      }
    });

    // Show the relevant left panel
    leftPanels.forEach((panel, i) => {
      if (i === index) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "");
      }
    });

    activeIndex = index;
  }

  function resetSlider(panel) {
    const slider = panel.querySelector(".op-products-slider");
    if (slider) {
      slider.scrollTo({ left: 0, behavior: "instant" });
    }
  }

  // Keep your existing slider code
  productPanels.forEach((panel) => {
    const slider = panel.querySelector(".op-products-slider");
    const btnLeft = panel.querySelector(".op-slider-left");
    const btnRight = panel.querySelector(".op-slider-right");
    const cards = slider ? slider.querySelectorAll(".op-product-card") : [];

    if (!slider || cards.length === 0) return;

    const cardStyle = getComputedStyle(cards[0]);
    const gap = parseInt(cardStyle.marginRight || cardStyle.gap || 0) || 20;
    const cardWidth = cards[0].offsetWidth + gap;

    btnLeft.addEventListener("click", () => {
      slider.scrollBy({ left: -cardWidth, behavior: "smooth" });
    });

    btnRight.addEventListener("click", () => {
      slider.scrollBy({ left: cardWidth, behavior: "smooth" });
    });

    window.addEventListener("resize", () => {
      resetSlider(panel);
    });
  });
});