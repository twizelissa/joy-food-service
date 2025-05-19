document.addEventListener("DOMContentLoaded", function () {
  // Initialize all main functions
  setupSmoothScrolling();
  setupMobileMenu();
  setupNewsReadMore();
  initializeHeroSlider();
  initializeRecruitSwiper();
  setupScrollSpy();
});

// Smooth scrolling for anchor links
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

  // Scroll indicator functionality
  const scrollIndicator = document.getElementById("scrollIndicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const missionSection = document.querySelector(".mission-section");
      if (missionSection) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const missionSectionTop =
          missionSection.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: missionSectionTop,
          behavior: "smooth",
        });
      }
    });

    // Hide scroll indicator when scrolling down
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = "0";
      } else {
        scrollIndicator.style.opacity = "1";
      }
    });
  }
}

// Mobile menu toggle functionality
function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");

  if (mobileMenuBtn && mobileNav) {
    // Toggle mobile menu when button is clicked
    mobileMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.toggle("active");
      mobileNav.classList.toggle("active");
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
      if (mobileNav.classList.contains("active")) {
        const isClickInside =
          mobileMenuBtn.contains(event.target) ||
          mobileNav.contains(event.target);
        if (!isClickInside) {
          mobileMenuBtn.classList.remove("active");
          mobileNav.classList.remove("active");
        }
      }
    });
  }
}

// News section read more functionality
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

// Hero Slider initialization - FIXED
function initializeHeroSlider() {
  const carouselTrack = document.querySelector(".carousel-track");
  if (!carouselTrack) return;

  const slides = document.querySelectorAll(".carousel-slide");
  if (slides.length <= 1) return;

  let currentSlide = 0;
  const slideCount = slides.length;
  const slideInterval = 5000; // Time between slides (ms)

  // Function to move to a specific slide
  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    const offset = -currentSlide * (100 / slideCount);
    carouselTrack.style.transform = `translateX(${offset}%)`;
  }

  // Function to advance to next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    goToSlide(currentSlide);
  }

  // Start auto-rotation
  const sliderInterval = setInterval(nextSlide, slideInterval);

  // Optional: Pause on hover
  const heroCarousel = document.querySelector(".hero-carousel");
  if (heroCarousel) {
    heroCarousel.addEventListener("mouseenter", () => {
      clearInterval(sliderInterval);
    });

    heroCarousel.addEventListener("mouseleave", () => {
      clearInterval(sliderInterval);
      setInterval(nextSlide, slideInterval);
    });
  }

  // Initialize first slide
  goToSlide(0);
}

// Initialize Swiper for Recruit Section
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
        speed: 3000, // Transition speed
        grabCursor: true,
        autoHeight: true, // Adjust height to content

        // Autoplay
        autoplay: true,

        // Use slide effect for visible movement
        effect: "slide",

        // Slide visibility settings
        centeredSlides: false, // Don't center slides (keeps exactly one visible)
        loop: true, // Loop enabled

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
              // slide.style.opacity = "1";
              slide.style.visibility = "visible";
            });
          },
          slideChange: function () {
            updateNavigationVisibility(this);
          },
        },
      });

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

// Helper: Load Swiper Library if needed
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

// Active Navigation Highlighting
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
