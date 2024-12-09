// Header behavior
const header = document.getElementById("header");
let lastScrollPosition = 0;
let isNavigating = false; // Flag to track navigation through links

// Function to hide the header
function hideHeader() {
  header.style.transform = "translateY(-100%)";
}

// Function to show the header
function showHeader() {
  header.style.transform = "translateY(0)";
}

// Scroll event listener
window.addEventListener("scroll", () => {
  if (isNavigating) return; // Ignore scroll if navigating through links

  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition <= header.clientHeight) {
    // Show header when at the top of the page
    showHeader();
    return;
  }

  if (currentScrollPosition > lastScrollPosition) {
    // Hide header when scrolling down
    hideHeader();
  } else {
    // Show header when scrolling up
    showHeader();
  }

  lastScrollPosition = currentScrollPosition;
});

// JavaScript to toggle menu visibility

const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  drawer.classList.remove("translate-x-full");
  overlay.classList.add("opacity-50");
  overlay.classList.remove("pointer-events-none");
});

closeBtn.addEventListener("click", () => {
  drawer.classList.add("translate-x-full");
  overlay.classList.remove("opacity-50");
  overlay.classList.add("pointer-events-none");
});

// Close the drawer when clicking outside of it
document.addEventListener("click", (e) => {
  if (!drawer.contains(e.target) && !menuBtn.contains(e.target)) {
    drawer.classList.add("translate-x-full");
    overlay.classList.remove("opacity-50");
    overlay.classList.add("pointer-events-none");
  }
});

// Close the drawer when scrolling
document.addEventListener("scroll", () => {
  if (!drawer.classList.contains("translate-x-full")) {
    drawer.classList.add("translate-x-full");
    overlay.classList.remove("opacity-50");
    overlay.classList.add("pointer-events-none");
  }
});

// Close the drawer when resizing the window
window.addEventListener("resize", () => {
  drawer.classList.add("translate-x-full");
  overlay.classList.remove("opacity-50");
  overlay.classList.add("pointer-events-none");
});
