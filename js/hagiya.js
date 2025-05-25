/**
 * Hagiya Restaurant - Main JavaScript File
 * Version: 2.0 - Updated with Infinite Gallery Scroll
 *
 * Table of Contents:
 * 1. DOM Content Loaded Event
 * 2. Mobile Menu Toggle
 * 3. Fade In Elements on Scroll
 * 4. Smooth Scrolling for Navigation
 * 5. Gallery Infinite Auto-Scroll Functionality (UPDATED)
 * 6. Resize Handlers for Responsive Layout
 * 7. News Section Enhancement
 * 8. Map Responsive Handling
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all JS functionality
  initMobileMenu();
  initFadeInElements();
  initSmoothScrolling();
  initGalleryInfiniteScroll(); // UPDATED function name
  handleResponsiveLayout();
  enhanceNewsSection();
  makeMapResponsive();

  // Add resize event listener
  window.addEventListener("resize", function () {
    handleResponsiveLayout();
    makeMapResponsive();
  });

  // Other initialization if needed
  console.log("Hagiya website initialized with infinite scroll");
});

/**
 * 2. Mobile Menu Toggle
 * ----------------------------
 * Handles the mobile menu toggle functionality
 */
function initMobileMenu() {
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    mainNav.classList.toggle("active");

    // Prevent scrolling when menu is open
    document.body.classList.toggle("menu-open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".site-header")) {
      menuToggle.classList.remove("active");
      mainNav.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

  // Close menu when clicking on a nav link
  const navLinks = mainNav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menuToggle.classList.remove("active");
      mainNav.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
}

/**
 * 3. Fade In Elements on Scroll
 * ----------------------------
 * Adds fade-in animation to elements when they become visible in the viewport
 */
function initFadeInElements() {
  // Add fade-element class to desired elements
  const sectionsToFade = document.querySelectorAll("section");
  sectionsToFade.forEach((section) => {
    if (!section.classList.contains("fade-element")) {
      section.classList.add("fade-element");
    }
  });

  const fadeElements = document.querySelectorAll(".fade-element");

  // If no fade elements exist, return early
  if (!fadeElements.length) return;

  // Initial check for elements in viewport on page load
  checkFadeElements();

  // Set up scroll event listener for fade effect
  window.addEventListener("scroll", checkFadeElements);

  function checkFadeElements() {
    const windowHeight = window.innerHeight;

    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150; // How many pixels from the bottom of the viewport to start the animation

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("fade-in");
      }
    });
  }
}

/**
 * 4. Smooth Scrolling for Navigation
 * ----------------------------
 * Implements smooth scrolling for navigation links
 */
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Prevent default anchor behavior
      e.preventDefault();

      // Get the target element
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Get mobile menu height for offset
        const headerHeight =
          document.querySelector(".site-header").offsetHeight;

        // Calculate the position to scroll to
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update active navigation link
        navLinks.forEach((link) => link.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Update active navigation based on scroll position
  window.addEventListener("scroll", function () {
    let current = "";
    const sections = document.querySelectorAll("section[id]");
    const headerHeight = document.querySelector(".site-header").offsetHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.clientHeight;

      if (
        pageYOffset >= sectionTop &&
        pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/**
 * 5. Gallery Infinite Auto-Scroll Functionality - PIXEL-BASED LIKE VEREST
 * ----------------------------
 * Shows exactly 5 images at a time with slow infinite scrolling
 */
function initGalleryInfiniteScroll() {
  const galleryContainer = document.querySelector(".gallery-container");
  if (!galleryContainer) return;

  const originalImages = galleryContainer.querySelectorAll(".gallery-image");
  if (originalImages.length === 0) return;

  // Store original images
  const imageElements = Array.from(originalImages);

  // Clear container and create wrapper
  galleryContainer.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.className = "gallery-wrapper";
  galleryContainer.appendChild(wrapper);

  // Create slides with 5 images each - make many copies for infinite effect
  const imagesPerView = 5;
  const totalCopies = 50; // Create 50 copies total for truly infinite scroll

  let imageIndex = 0;
  for (let i = 0; i < totalCopies; i++) {
    const slide = document.createElement("div");
    slide.className = "gallery-slide";

    // Add 5 images to each slide
    for (let j = 0; j < imagesPerView; j++) {
      const originalImage = imageElements[imageIndex % imageElements.length];
      const clonedImage = originalImage.cloneNode(true);
      slide.appendChild(clonedImage);
      imageIndex++;
    }

    wrapper.appendChild(slide);
  }

  // Get the actual width of one slide
  const slideWidth = window.innerWidth; // Each slide is full viewport width
  const originalSetWidth =
    Math.ceil(imageElements.length / imagesPerView) * slideWidth;

  // VERY slow animation - 120 seconds to go through original set once
  const animationDuration = 120;

  // Apply continuous animation using pixel values
  wrapper.style.animation = `infiniteGallerySlide ${animationDuration}s linear infinite`;

  // Create CSS keyframes dynamically using pixel-based movement
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes infiniteGallerySlide {
      0% {
        transform: translateX(0px);
      }
      100% {
        transform: translateX(-${originalSetWidth}px);
      }
    }
    
    .gallery-wrapper {
      display: flex;
      width: fit-content;
    }
    
    .gallery-slide {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
      min-width: 100vw;
      padding: 0 20px;
      flex-shrink: 0;
      box-sizing: border-box;
    }
  `;
  document.head.appendChild(styleSheet);

  // Pause animation on hover
  wrapper.addEventListener("mouseenter", () => {
    wrapper.style.animationPlayState = "paused";
  });

  wrapper.addEventListener("mouseleave", () => {
    wrapper.style.animationPlayState = "running";
  });

  // Handle window resize to recalculate animation
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Restart the gallery with new dimensions
      initGalleryInfiniteScroll();
    }, 250);
  });

  // Remove existing arrows
  const existingArrows = document.querySelectorAll(".gallery-arrow");
  existingArrows.forEach((arrow) => arrow.remove());
}
/**
 * 6. Resize Handlers for Responsive Layout
 * ----------------------------
 * Handle specific layout adjustments when resizing the window
 */
function handleResponsiveLayout() {
  // Check window width
  const windowWidth = window.innerWidth;

  // Handle vertical text based on screen size
  const verticalText = document.querySelector(".vertical-text");
  const verticalTextMenu = document.querySelector(".vertical-text-menu");

  if (windowWidth <= 1024) {
    // Convert vertical writing to horizontal on smaller screens
    if (verticalText) {
      verticalText.style.writingMode = "horizontal-tb";
    }
    if (verticalTextMenu) {
      verticalTextMenu.style.writingMode = "horizontal-tb";
    }
  } else {
    // Restore vertical writing on larger screens
    if (verticalText) {
      verticalText.style.writingMode = "vertical-rl";
    }
    if (verticalTextMenu) {
      verticalTextMenu.style.writingMode = "vertical-rl";
    }
  }

  // Note: Gallery arrows are no longer needed for infinite scroll
  // Removed arrow repositioning code since we're using infinite scroll
}

/**
 * 7. News Section Enhancement
 * ----------------------------
 * Add interactive features to the news section
 */
function enhanceNewsSection() {
  const newsItems = document.querySelectorAll(".news-item");

  if (!newsItems.length) return;

  // Add interactive hover effect
  newsItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "rgba(249, 249, 249, 0.9)";
    });

    item.addEventListener("mouseleave", function () {
      if (!this.classList.contains("expanded")) {
        this.style.backgroundColor = "";
      }
    });

    // Add click event to expand/collapse news items on mobile
    item.addEventListener("click", function () {
      // Only apply this functionality on mobile
      if (window.innerWidth <= 768) {
        const content = this.querySelector(".news-content");

        // Toggle expanded class
        this.classList.toggle("expanded");

        if (this.classList.contains("expanded")) {
          // Set max-height for animation
          content.style.maxHeight = content.scrollHeight + "px";
          // Keep background color when expanded
          this.style.backgroundColor = "rgba(249, 249, 249, 0.9)";
        } else {
          content.style.maxHeight = null;
          this.style.backgroundColor = "";
        }

        // Collapse other items
        newsItems.forEach((otherItem) => {
          if (otherItem !== this && otherItem.classList.contains("expanded")) {
            otherItem.classList.remove("expanded");
            otherItem.querySelector(".news-content").style.maxHeight = null;
            otherItem.style.backgroundColor = "";
          }
        });
      }
    });
  });

  // Initialize news items based on current screen size
  if (window.innerWidth <= 768) {
    newsItems.forEach((item) => {
      const content = item.querySelector(".news-content");
      if (content) {
        content.style.maxHeight = null;
      }
    });
  }

  // Add animation effect on load
  setTimeout(() => {
    newsItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "0";
        item.style.transform = "translateX(-20px)";

        setTimeout(() => {
          item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          item.style.opacity = "1";
          item.style.transform = "translateX(0)";
        }, 50);
      }, index * 150);
    });
  }, 500);
}

/**
 * 8. Map Responsive Handling
 * ----------------------------
 * Make embedded maps responsive
 */
function makeMapResponsive() {
  const mapContainers = document.querySelectorAll(".map-container, .map-embed");

  mapContainers.forEach((container) => {
    const iframe = container.querySelector("iframe");
    if (iframe) {
      // Ensure iframe fills container properly
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "0";
    }
  });

  // Handle any Google Maps or other embedded maps
  const embeddedMaps = document.querySelectorAll('iframe[src*="maps"]');
  embeddedMaps.forEach((map) => {
    // Wrap in responsive container if not already wrapped
    if (!map.parentElement.classList.contains("map-responsive")) {
      const wrapper = document.createElement("div");
      wrapper.className = "map-responsive";
      wrapper.style.position = "relative";
      wrapper.style.paddingBottom = "56.25%"; // 16:9 aspect ratio
      wrapper.style.height = "0";
      wrapper.style.overflow = "hidden";

      map.parentNode.insertBefore(wrapper, map);
      wrapper.appendChild(map);

      map.style.position = "absolute";
      map.style.top = "0";
      map.style.left = "0";
      map.style.width = "100%";
      map.style.height = "100%";
    }
  });
}
