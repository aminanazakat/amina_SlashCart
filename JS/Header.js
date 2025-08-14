// Header Js code
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');

menuToggle.addEventListener('click', () => {
  sidebar.style.right = '0';
  overlay.classList.add('active');
  menuToggle.style.display = 'none'; // hide hamburger
});

closeBtn.addEventListener('click', () => {
  sidebar.style.right = '-300px';
  overlay.classList.remove('active');
  menuToggle.style.display = 'block'; // show hamburger again
});

overlay.addEventListener('click', () => {
  sidebar.style.right = '-300px';
  overlay.classList.remove('active');
  menuToggle.style.display = 'block'; // show hamburger again
});


//Search popup
document.getElementById("searchIcon").addEventListener("click", function() {
  document.getElementById("searchPopup").style.display = "flex";
});

document.getElementById("closeSearch").addEventListener("click", function() {
  document.getElementById("searchPopup").style.display = "none";
});

const iconCart = document.querySelector('.icon-cart');
  const closeCartBtn = iconCart.querySelector('.close-cart');
  const continueBtn = iconCart.querySelector('.continue-btn');
  const cartIconImgs = iconCart.querySelectorAll('.cart-icon');

  // Toggle cart popup on cart icon click
  iconCart.addEventListener('click', e => {
    e.preventDefault();
    // Ignore clicks on close button or continue button
    if (e.target === closeCartBtn || e.target === continueBtn) return;
    iconCart.classList.toggle('open');
  });

  // Close cart popup on close button click
  closeCartBtn.addEventListener('click', e => {
    e.preventDefault();
    iconCart.classList.remove('open');
  });

  // Close cart popup on continue button click
  continueBtn.addEventListener('click', e => {
    e.preventDefault();
    iconCart.classList.remove('open');
  });

   const iconAccount = document.querySelector('.icon-account');
  const accountPopup = document.querySelector('.account-popup');
  const closeAccountBtn = document.querySelector('.close-account');

  iconAccount.addEventListener('click', e => {
    e.preventDefault();
    accountPopup.style.display = 'block';
  });

  closeAccountBtn.addEventListener('click', () => {
    accountPopup.style.display = 'none';
  });

  
// Mobile menu toggle
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.querySelectorAll(".nav-left, .nav-right").forEach(nav => {
    nav.style.display = (nav.style.display === "flex") ? "none" : "flex";
  });
});

// Scroll effect for header change
window.addEventListener("scroll", function () {
  const header = document.querySelector(".site-header");
  const topbar = document.querySelector(".topbar");

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
    if (topbar) topbar.style.display = "none";
  } else {
    header.classList.remove("scrolled");
    if (topbar) topbar.style.display = "block";
  }
});

document.querySelectorAll('.sidebar-nav .dropdown > a').forEach(dropdownLink => {
  dropdownLink.addEventListener('click', function(e) {
    e.preventDefault();  // prevent link navigation
    this.parentElement.classList.toggle('open');
  });
});
