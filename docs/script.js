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

// JavaScript for handling the modal

// Select the body element
const body = document.body;

// Function to disable scroll
const disableScroll = () => {
  body.classList.add("overflow-hidden");
};

// Function to enable scroll
const enableScroll = () => {
  body.classList.remove("overflow-hidden");
};

// JavaScript for handling the modal with navigation
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");
const prevImage = document.getElementById("prev-image");
const nextImage = document.getElementById("next-image");
const galleryItems = document.querySelectorAll(".gallery-item");

let currentIndex = 0;

// Function to update the modal image
const updateModalImage = (index) => {
  const image = galleryItems[index];
  if (image) {
    modalImage.src = image.src;
    currentIndex = index;
  }
};

// Open modal when an image is clicked
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentIndex = index;
    updateModalImage(currentIndex);
    modal.classList.remove("hidden");
    disableScroll(); // Disable scroll when the modal is open
  });
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  enableScroll(); // Re-enable scroll when the modal is closed
});

// Navigate to the previous image
prevImage.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updateModalImage(currentIndex);
});

// Navigate to the next image
nextImage.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updateModalImage(currentIndex);
});

// Close modal when clicking outside the image
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    enableScroll(); // Re-enable scroll when the modal is closed
  }
});

// Add swipe functionality for touch devices
let startX = 0;

modal.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

modal.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diffX = startX - endX;

  if (diffX > 50) {
    // Swipe left: Next image
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateModalImage(currentIndex);
  } else if (diffX < -50) {
    // Swipe right: Previous image
    currentIndex =
      (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateModalImage(currentIndex);
  }
});
