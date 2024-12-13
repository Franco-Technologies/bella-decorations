const header = document.getElementById("header");
let lastScrollPosition = 0;
let isNavigating = false; // Ignore scroll events during link navigation

function hideHeader() {
  header.classList.remove("translate-y-0");
  header.classList.add("-translate-y-full");
}

function showHeader() {
  header.classList.remove("-translate-y-full");
  header.classList.add("translate-y-0");
}

function makeHeaderTransparent() {
  header.classList.remove("bg-pink-500");
  header.classList.add("bg-transparent");
}

function makeHeaderPink() {
  header.classList.remove("bg-transparent");
  header.classList.add("bg-pink-500");
}

// Scroll event listener
window.addEventListener("scroll", () => {
  if (isNavigating) return;

  const currentScrollPosition = window.scrollY;

  // At the top of the page, always show transparent header
  if (currentScrollPosition <= header.clientHeight) {
    showHeader();
    makeHeaderTransparent();
    lastScrollPosition = currentScrollPosition;
    return;
  }

  if (currentScrollPosition > lastScrollPosition) {
    // Scrolling down: hide header
    hideHeader();
    makeHeaderTransparent();
  } else {
    // Scrolling up: show header and make it pink
    showHeader();
    makeHeaderPink();
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
const modalCaption = document.getElementById("modal-caption");
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
    // Update caption
    const caption = image.alt;
    modalCaption.textContent = caption;
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

const sections = document.querySelectorAll("section"); // All sections with an ID
const navLinks = document.querySelectorAll("nav a"); // All navigation links
const options = {
  root: null, // Use the viewport as the root
  rootMargin: "0px",
  threshold: 0.5, // Trigger when 50% of the section is visible
};

// Intersection Observer to detect which section is in view
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;

      // Update the active class on navigation links
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("bg-pink-400"); // Add active class to the current link
        } else {
          link.classList.remove("bg-pink-400"); // Remove from non-active links
        }
      });

      // Update the URL without refreshing
      history.replaceState(null, "", `#${id}`);
    }
  });
}, options);

// Observe each section
sections.forEach((section) => observer.observe(section));
