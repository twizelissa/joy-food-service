/**
 * Hagiya Restaurant - Main JavaScript File
 * Version: 1.0
 *
 * Table of Contents:
 * 1. DOM Content Loaded Event
 * 2. Mobile Menu Toggle
 * 3. Fade In Elements on Scroll
 * 4. Smooth Scrolling for Navigation
 * 5. Gallery Auto-Scroll Functionality
 * 6. Resize Handlers for Responsive Layout
 * 7. News Section Enhancement
 * 8. Map Responsive Handling
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all JS functionality
  initMobileMenu();
  initFadeInElements();
  initSmoothScrolling();
  initGalleryAutoScroll();
  handleResponsiveLayout();
  enhanceNewsSection();
  makeMapResponsive();

  // Add resize event listener
  window.addEventListener("resize", function () {
    handleResponsiveLayout();
    makeMapResponsive();
  });

  // Other initialization if needed
  console.log("Hagiya website initialized");
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
 * 5. Gallery Auto-Scroll Functionality
 * ----------------------------
 * Implements automatic horizontal scrolling for the gallery section
 */
function initGalleryAutoScroll() {
  const galleryContainer = document.querySelector(".gallery-container");
  if (!galleryContainer) return;

  let scrollInterval;
  let isPaused = false;
  const scrollSpeed = 2; // Pixels per interval
  const scrollInterval_ms = 30;

  function startAutoScroll() {
    if (scrollInterval) clearInterval(scrollInterval);

    scrollInterval = setInterval(() => {
      if (!isPaused) {
        if (
          galleryContainer.scrollLeft >=
          galleryContainer.scrollWidth - galleryContainer.clientWidth - 10
        ) {
          galleryContainer.style.scrollBehavior = "auto";
          galleryContainer.scrollLeft = 0;
          setTimeout(() => {
            galleryContainer.style.scrollBehavior = "smooth";
          }, 50);
        } else {
          galleryContainer.scrollLeft += scrollSpeed;
        }
      }
    }, scrollInterval_ms);
  }

  // Pause when user hovers
  galleryContainer.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  // Resume when user stops hovering
  galleryContainer.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  // Start scrolling on load
  startAutoScroll();
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

  // Readjust gallery arrows position
  const gallerySection = document.querySelector(".gallery-section");
  if (gallerySection) {
    // Remove and re-add arrows to ensure proper positioning
    const existingArrows = document.querySelectorAll(".gallery-arrow");
    if (existingArrows.length > 0) {
      existingArrows.forEach((arrow) => arrow.remove());

      // Add navigation arrows back
      const galleryContainer = document.querySelector(".gallery-container");
      if (galleryContainer) {
        // Create arrow elements
        const leftArrow = document.createElement("button");
        leftArrow.className = "gallery-arrow gallery-arrow-left";
        leftArrow.innerHTML = "&larr;";
        leftArrow.setAttribute("aria-label", "Scroll left");

        const rightArrow = document.createElement("button");
        rightArrow.className = "gallery-arrow gallery-arrow-right";
        rightArrow.innerHTML = "&rarr;";
        rightArrow.setAttribute("aria-label", "Scroll right");

        // Add click event listeners
        leftArrow.addEventListener("click", () => {
          const galleryContainer = document.querySelector(".gallery-container");
          galleryContainer.scrollBy({
            left: -300,
            behavior: "smooth",
          });
        });

        rightArrow.addEventListener("click", () => {
          const galleryContainer = document.querySelector(".gallery-container");
          galleryContainer.scrollBy({
            left: 300,
            behavior: "smooth",
          });
        });

        // Add arrows to gallery section
        gallerySection.appendChild(leftArrow);
        gallerySection.appendChild(rightArrow);
      }
    }
  }
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
      content.style.maxHeight = null;
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
