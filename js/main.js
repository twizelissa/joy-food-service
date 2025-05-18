/**
 * Joy Food Service - Main JavaScript
 *
 * Handles all interactive elements and animations for the website
 * - Mobile menu functionality
 * - Smooth scrolling
 * - News section expansion
 * - Hero image carousel
 * - Recruit section Swiper initialization
 *
 * Version: 1.0.0
 * Last updated: May 16, 2025
 * Author: Joy Food Service Web Team
 */

// ================ Document Ready Function ================
/**
 * Wait for DOM to be fully loaded before initializing scripts
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all main functions
  setupSmoothScrolling();
  setupMobileMenu();
  setupNewsReadMore();
  initializeHeroCarousel();
  initializeRecruitSwiper();
  addSwiperStyles();
  setupScrollSpy();
});

// ================ Smooth Scrolling ================
/**
 * Setup smooth scrolling for all anchor links
 * Offsets scrolling to account for fixed header
 */

// page scrolling

document.addEventListener("DOMContentLoaded", function () {
  // Get the scroll indicator element
  const scrollIndicator = document.getElementById("scrollIndicator");

  // Add click event listener
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      // Get the mission section (or whatever section comes after hero)
      const missionSection = document.querySelector(".mission-section");

      // If mission section exists, scroll to it
      if (missionSection) {
        // Calculate position with offset for fixed header
        const headerHeight = document.querySelector("header").offsetHeight;
        const missionSectionTop =
          missionSection.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        // Smooth scroll to the mission section
        window.scrollTo({
          top: missionSectionTop,
          behavior: "smooth",
        });
      }
    });
  }

  // Optional: Hide scroll indicator when user scrolls down
  window.addEventListener("scroll", function () {
    if (scrollIndicator && window.scrollY > 100) {
      scrollIndicator.style.opacity = "0";
    } else if (scrollIndicator) {
      scrollIndicator.style.opacity = "1";
    }
  });

  // Fix for restaurant cards to ensure equal size
  const restaurantCards = document.querySelectorAll(".restaurant-card");
  const cardHeight = 350; // Fixed height for all cards

  restaurantCards.forEach((card) => {
    card.style.height = cardHeight + "px";

    // Ensure all large images and small images have correct height
    const largeImage = card.querySelector(".large-image");
    const smallImages = card.querySelector(".small-images");

    if (largeImage) {
      largeImage.style.height = "100%";
    }

    if (smallImages) {
      smallImages.style.height = "100%";

      // Ensure all small images inside have correct size
      const smallImagesCollection = smallImages.querySelectorAll(
        "img.restaurant-img-small"
      );
      smallImagesCollection.forEach((img) => {
        img.style.objectFit = "cover";
        img.style.width = "100%";
        img.style.height = "100%";
      });
    }
  });
});

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60, // Account for header height
          behavior: "smooth",
        });
      }
    });
  });
}

// ================ Mobile Menu Function ================
/**
 * Setup mobile menu toggle functionality
 * Handles opening/closing the mobile navigation
 */
function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");

  if (mobileMenuBtn && mobileNav) {
    // Toggle mobile menu when button is clicked
    mobileMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent event from bubbling up

      // Toggle active classes
      this.classList.toggle("active");
      mobileNav.classList.toggle("active");

      console.log("Mobile menu toggled"); // Debug log
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".mobile-nav a").forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenuBtn.classList.remove("active");
        mobileNav.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      // Only process if menu is open
      if (mobileNav.classList.contains("active")) {
        // Check if click was inside menu or button
        const isClickInside =
          mobileMenuBtn.contains(event.target) ||
          mobileNav.contains(event.target);

        if (!isClickInside) {
          mobileMenuBtn.classList.remove("active");
          mobileNav.classList.remove("active");
        }
      }
    });
  } else {
    console.error("Mobile menu elements not found");
  }
}

// ================ News Section - Read More Function ================
/**
 * Setup the news section "Read more" functionality
 * Shows/hides additional news items
 */
function setupNewsReadMore() {
  const expandBtn = document.getElementById("expandNewsBtn");

  // Check if button has a direct link
  if (expandBtn && expandBtn.querySelector("a")) {
    // Button already has link, no need for toggle functionality
    return;
  }

  const newsItems = document.querySelectorAll(".news-item");

  // Only proceed if we have more than 3 news items
  if (expandBtn && newsItems.length > 3) {
    // Get only the hidden news items (after the first 3)
    const hiddenNews = Array.from(newsItems).slice(3);

    // Initially hide news items after the first 3
    hiddenNews.forEach((item) => {
      item.classList.add("hidden-news");
      item.style.display = "none";
    });

    // Toggle hidden news items when clicking "Read more"
    expandBtn.addEventListener("click", function (e) {
      // Prevent default link behavior if it's a link
      if (e.target.tagName === "A") {
        e.preventDefault();
      }

      // Check if currently expanded by looking at button text
      const isExpanded = expandBtn.textContent.includes("less");

      if (isExpanded) {
        // Hide items
        hiddenNews.forEach((item) => {
          item.style.display = "none";
        });
        expandBtn.textContent = "Read more";
      } else {
        // Show items with appropriate display style based on screen width
        hiddenNews.forEach((item) => {
          if (window.innerWidth <= 767) {
            item.style.display = "block";
          } else {
            item.style.display = "list-item"; // Since they're in a list
          }
        });
        expandBtn.textContent = "Show less";
      }
    });

    // Adjust display style on window resize
    window.addEventListener("resize", function () {
      // Only adjust if items are currently visible
      if (hiddenNews.length > 0 && hiddenNews[0].style.display !== "none") {
        hiddenNews.forEach((item) => {
          if (window.innerWidth <= 767) {
            item.style.display = "block";
          } else {
            item.style.display = "list-item";
          }
        });
      }
    });
  }
}

// ================ Hero Image Carousel ================
/**
 * Initialize hero image carousel/slider
 * Creates a fade-transition between multiple images
 */
function initializeHeroCarousel() {
  // Configuration
  const carouselConfig = {
    interval: 5000, // Time between slides (ms)
    transitionDuration: 500, // Transition duration (ms)
  };

  const heroSection = document.querySelector(".hero-section");
  if (!heroSection) return;

  const heroImageContainer = heroSection.querySelector(".hero-image-container");
  if (!heroImageContainer) return;

  const heroImage = heroImageContainer.querySelector(".hero-image");
  if (!heroImage) return;

  // Store the original image URL
  const originalImageUrl = heroImage.src;

  // Define image URLs for carousel
  // Make sure these images exist in assets/images/
  const heroImageUrls = [
    originalImageUrl,
    "assets/images/verest-bg.jpg",
    "assets/images/hagiya-top.jpeg",
  ];

  // Create carousel container
  const carouselContainer = document.createElement("div");
  carouselContainer.className = "image-carousel hero-carousel";

  // Create carousel track
  const carouselTrack = document.createElement("div");
  carouselTrack.className = "carousel-track";

  // Create slides
  heroImageUrls.forEach((url) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    slide.style.backgroundImage = `url(${url})`;
    carouselTrack.appendChild(slide);
  });

  // Add carousel to DOM (replace original image but keep overlay)
  const heroOverlay = heroImageContainer.querySelector(".hero-overlay");
  if (heroImage && heroOverlay) {
    heroImage.remove(); // Remove the original image
    carouselContainer.appendChild(carouselTrack);
    heroImageContainer.insertBefore(carouselContainer, heroOverlay);
  }

  // Initialize carousel state
  let currentSlide = 0;
  const totalSlides = heroImageUrls.length;

  // Function to move to next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  // Update carousel position
  function updateCarousel() {
    const offset = -currentSlide * 100;
    carouselTrack.style.transition = `transform ${carouselConfig.transitionDuration}ms ease`;
    carouselTrack.style.transform = `translateX(${offset}%)`;
  }

  // Start auto-scrolling
  const intervalId = setInterval(nextSlide, carouselConfig.interval);

  // Pause on hover
  carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });

  carouselContainer.addEventListener("mouseleave", () => {
    clearInterval(intervalId);
    setInterval(nextSlide, carouselConfig.interval);
  });

  // Add carousel styles
  addHeroCarouselStyles();

  // Initialize first slide
  updateCarousel();
}

// ================ Add Hero Carousel Styles ================
/**
 * Add required CSS for the hero carousel
 */
function addHeroCarouselStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .hero-carousel {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    
    .carousel-track {
      display: flex;
      width: 300%; /* For 3 slides */
      height: 100%;
      transition: transform 0.5s ease;
    }
    
    .carousel-slide {
      width: 33.333%; /* 100% / 3 slides */
      height: 100%;
      background-size: cover;
      background-position: center;
    }
  `;
  document.head.appendChild(style);
}

// ================ Initialize Swiper for Recruit Section ================
/**
 * Initialize Swiper JS for the recruitment section
 * - Shows exactly one slide at a time with no partial views
 * - Visible slide transitions with no preview of next/previous slides
 * - Manual navigation only - no auto-advancement
 */
function initializeRecruitSwiper() {
  // Check if Swiper is available
  if (typeof Swiper === "undefined") {
    loadSwiperLibrary().then(() => {
      initSwiper();
    });
  } else {
    initSwiper();
  }

  function initSwiper() {
    try {
      const recruitSwiper = new Swiper(".recruit-swiper", {
        // Core settings
        slidesPerView: 1, // Show exactly one slide at a time
        spaceBetween: 0, // No space between slides to prevent partial views
        speed: 800, // Transition speed
        grabCursor: true,
        autoHeight: true, // Adjust height to content

        // Disable autoplay
        autoplay: true,

        // Use slide effect for visible movement
        effect: "slide",

        // Slide visibility settings
        centeredSlides: false, // Don't center slides (keeps exactly one visible)
        loop: true, // No looping

        // Enable touch but with reduced sensitivity to prevent accidental slides
        allowTouchMove: true,
        simulateTouch: true,
        touchRatio: 0.7, // Reduced touch sensitivity
        threshold: 10, // Higher threshold for touch action

        // Improve transitions
        watchSlidesProgress: true, // Track slide visibility

        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        // Pagination dots
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },

        // Events
        on: {
          init: function () {
            updateNavigationVisibility(this);

            // Make all slides fully visible but positioned off-screen
            document.querySelectorAll(".swiper-slide").forEach((slide) => {
              slide.style.opacity = "1";
              slide.style.visibility = "visible";
            });
          },
          slideChange: function () {
            updateNavigationVisibility(this);
          },
        },
      });

      console.log("Swiper initialized successfully - One slide at a time");

      // Function to update navigation button visibility
      function updateNavigationVisibility(swiper) {
        const prevBtn = document.querySelector(".swiper-button-prev");
        const nextBtn = document.querySelector(".swiper-button-next");

        if (prevBtn && nextBtn) {
          if (swiper.isBeginning) {
            prevBtn.classList.add("swiper-button-disabled");
          } else {
            prevBtn.classList.remove("swiper-button-disabled");
          }

          if (swiper.isEnd) {
            nextBtn.classList.add("swiper-button-disabled");
          } else {
            nextBtn.classList.remove("swiper-button-disabled");
          }
        }
      }
    } catch (error) {
      console.error("Error initializing Swiper:", error);
    }
  }
}

// ================ Add Custom Swiper Styles ================
/**
 * Add custom CSS for the Swiper to ensure only one slide is visible at a time
 */
function addSwiperStyles() {
  const style = document.createElement("style");
  style.textContent = `
    /* Container styles to hide overflow */
    .recruit-swiper {
      overflow: hidden !important;
      position: relative;
    }
    
    /* Make slides fully opaque */
    .swiper-slide {
      opacity: 1 !important;
      transition: transform 0.8s ease !important;
      visibility: visible !important;
    }
    
    /* Enhanced active slide appearance */
    .swiper-slide-active {
      opacity: 1 !important;
      visibility: visible !important;
    }
    
    /* Hide non-active slides */
    .swiper-slide-prev,
    .swiper-slide-next {
      visibility: hidden !important;
      opacity: 0 !important;
      transition: visibility 0s 0.8s, opacity 0.8s ease !important;
    }
    
    /* Improve pagination visibility */
    .swiper-pagination {
      margin-top: 20px !important;
    }
    
    .swiper-pagination-bullet {
      width: 12px !important;
      height: 12px !important;
      margin: 0 5px !important;
    }
    
    .swiper-pagination-bullet-active {
      background-color: #f04e5c !important;
      transform: scale(1.3) !important;
    }
    
    /* Enhance navigation buttons */
    .recruit-nav-button {
      transform: scale(1.1) !important;
      transition: all 0.3s ease !important;
    }
    
    .recruit-nav-button:hover {
      transform: scale(1.2) !important;
    }
  `;
  document.head.appendChild(style);
}

// ================ Helper: Load Swiper Library if needed ================
/**
 * Load Swiper JS library dynamically if not already loaded
 * @returns {Promise} - Resolves when library is loaded
 */
function loadSwiperLibrary() {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (document.querySelector('script[src*="swiper"]')) {
      resolve();
      return;
    }

    // Add Swiper script
    const swiperScript = document.createElement("script");
    swiperScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js";
    document.head.appendChild(swiperScript);

    // Add Swiper CSS if needed
    if (!document.querySelector('link[href*="swiper"]')) {
      const swiperCSS = document.createElement("link");
      swiperCSS.rel = "stylesheet";
      swiperCSS.href =
        "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.css";
      document.head.appendChild(swiperCSS);
    }

    // Wait for script to load
    swiperScript.onload = () => resolve();
    swiperScript.onerror = () => {
      console.error("Failed to load Swiper library");
      reject();
    };
  });
}

// ================ Active Navigation Highlighting ================
/**
 * Highlight active section in navigation when scrolling
 */
function setupScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".side-nav a, .mobile-nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
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
