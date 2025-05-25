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

// Hero Slider initialization - UNSTOPPABLE VERSION
function initializeHeroSlider() {
  const carouselTrack = document.querySelector(".carousel-track");
  if (!carouselTrack) return;

  const originalSlides = document.querySelectorAll(".carousel-slide");
  if (originalSlides.length <= 1) return;

  // Clone all slides to create seamless infinite loop
  const slideArray = Array.from(originalSlides);
  slideArray.forEach((slide) => {
    const clone = slide.cloneNode(true);
    carouselTrack.appendChild(clone);
  });

  // Now we have 6 slides total (3 original + 3 clones)
  const allSlides = document.querySelectorAll(".carousel-slide");
  const totalSlides = allSlides.length; // 6

  // Update track width and slide widths
  carouselTrack.style.width = `${totalSlides * 100}%`; // 600%
  allSlides.forEach((slide) => {
    slide.style.width = `${100 / totalSlides}%`; // 16.666% each
  });

  let currentSlide = 0;
  const originalSlideCount = originalSlides.length; // 3
  const slideInterval = 4000;

  // Function to move to a specific slide
  function goToSlide(slideIndex, immediate = false) {
    const translateValue = -(slideIndex * (100 / totalSlides));

    if (immediate) {
      carouselTrack.style.transition = "none";
      carouselTrack.style.transform = `translateX(${translateValue}%)`;
      // Force reflow
      carouselTrack.offsetHeight;
      carouselTrack.style.transition =
        "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)";
    } else {
      carouselTrack.style.transform = `translateX(${translateValue}%)`;
    }
  }

  // Function to advance to next slide
  function nextSlide() {
    currentSlide++;

    if (currentSlide >= originalSlideCount) {
      goToSlide(currentSlide);
      setTimeout(() => {
        currentSlide = 0;
        goToSlide(currentSlide, true);
      }, 1200);
    } else {
      goToSlide(currentSlide);
    }
  }

  // Initialize and start - NO STOPPING, NO CONDITIONS
  goToSlide(0);

  // Start the slider and NEVER stop it
  setInterval(nextSlide, slideInterval);

  console.log("Hero slider started - will never stop");
}
// Initialize Swiper for Recruit Section - INFINITE SMOOTH SLIDER
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
        // Core settings for infinite smooth sliding
        slidesPerView: 1, // Show exactly one slide at a time
        spaceBetween: 0, // No space between slides
        speed: 800, // Smooth transition speed (reduced for smoother feel)
        grabCursor: true,
        autoHeight: true, // Adjust height to content

        // Infinite loop settings
        loop: true, // Enable infinite loop
        loopAdditionalSlides: 1, // Add extra slides for smoother loop

        // Autoplay settings
        autoplay: {
          delay: 4000, // Time between slides
          disableOnInteraction: false, // Continue autoplay after user interaction
          pauseOnMouseEnter: true, // Pause on hover
        },

        // Smooth slide effect
        effect: "slide",

        // Touch settings for smooth interaction
        allowTouchMove: true,
        simulateTouch: true,
        touchRatio: 1, // Full touch sensitivity
        threshold: 5, // Lower threshold for easier swiping
        longSwipesRatio: 0.3, // Easier long swipes

        // Slide visibility and transition settings
        centeredSlides: false,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,

        // Navigation arrows (always enabled for infinite scroll)
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        // Pagination dots
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3, // Show 3 main bullets
        },

        // Events
        on: {
          init: function () {
            // Ensure all slides are visible and properly initialized
            document.querySelectorAll(".swiper-slide").forEach((slide) => {
              slide.style.visibility = "visible";
              slide.style.opacity = "1";
            });

            // Remove any disabled states from navigation buttons
            const prevBtn = document.querySelector(
              ".swiper-button-prev.recruit-nav-button"
            );
            const nextBtn = document.querySelector(
              ".swiper-button-next.recruit-nav-button"
            );

            if (prevBtn) prevBtn.classList.remove("swiper-button-disabled");
            if (nextBtn) nextBtn.classList.remove("swiper-button-disabled");

            console.log("Recruit Swiper initialized with infinite loop");
          },

          slideChange: function () {
            // Ensure navigation buttons never get disabled (infinite scroll)
            const prevBtn = document.querySelector(
              ".swiper-button-prev.recruit-nav-button"
            );
            const nextBtn = document.querySelector(
              ".swiper-button-next.recruit-nav-button"
            );

            if (prevBtn) prevBtn.classList.remove("swiper-button-disabled");
            if (nextBtn) nextBtn.classList.remove("swiper-button-disabled");
          },

          // Smooth transition events
          slideChangeTransitionStart: function () {
            // Add any custom transition start effects here if needed
          },

          slideChangeTransitionEnd: function () {
            // Ensure smooth transition completion
            const prevBtn = document.querySelector(
              ".swiper-button-prev.recruit-nav-button"
            );
            const nextBtn = document.querySelector(
              ".swiper-button-next.recruit-nav-button"
            );

            if (prevBtn) prevBtn.classList.remove("swiper-button-disabled");
            if (nextBtn) nextBtn.classList.remove("swiper-button-disabled");
          },
        },
      });

      // Store swiper instance for external access if needed
      window.recruitSwiperInstance = recruitSwiper;
    } catch (error) {
      console.error("Error initializing Recruit Swiper:", error);
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
