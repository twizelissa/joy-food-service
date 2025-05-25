/**
 * VEREST Website JavaScript
 * Handles gallery slideshow with multiple images per slide, navigation and other interactive elements
 * With automatic sliding and no visible navigation arrows per request
 */
document.addEventListener("DOMContentLoaded", function () {
  // Multi-image Gallery Slideshow - FULL WIDTH WITH AUTOMATIC SLIDING
  function initGallerySlideshow() {
    const galleryContainer = document.querySelector(".gallery-container");
    if (!galleryContainer) return;

    const wrapper = galleryContainer.querySelector(".gallery-wrapper");
    const slides = galleryContainer.querySelectorAll(".gallery-slide");
    const controlsContainer =
      galleryContainer.querySelector(".gallery-controls");

    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds between slides
    let slideTimer;

    // Create navigation dots
    if (controlsContainer) {
      slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("gallery-dot");
        if (index === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
          goToSlide(index);
          resetTimer();
        });

        controlsContainer.appendChild(dot);
      });
    }

    // Function to go to a specific slide
    function goToSlide(index) {
      if (index < 0 || index >= slides.length) return;

      // Update dots
      if (controlsContainer) {
        const dots = controlsContainer.querySelectorAll(".gallery-dot");
        dots.forEach((dot) => dot.classList.remove("active"));
        dots[index].classList.add("active");
      }

      // Move to the new slide with a smooth transition
      wrapper.style.transform = `translateX(-${index * 100}%)`;
      currentSlide = index;
    }

    // Function for next slide
    function nextSlide() {
      goToSlide((currentSlide + 1) % slides.length);
    }

    // Reset the timer
    function resetTimer() {
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, slideInterval);
    }

    // Start the slideshow
    resetTimer();

    // Add touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    galleryContainer.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    galleryContainer.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );

    function handleSwipe() {
      const swipeThreshold = 50; // Minimum distance to register as a swipe

      if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - go to next slide
        goToSlide((currentSlide + 1) % slides.length);
        resetTimer();
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - go to previous slide
        goToSlide(currentSlide - 1 < 0 ? slides.length - 1 : currentSlide - 1);
        resetTimer();
      }
    }
  }

  // RECRUIT SLIDER FUNCTIONALITY - ADDED
  function initRecruitSlider() {
    const sliderWrapper = document.querySelector(".recruit-slider-wrapper");
    const slides = document.querySelectorAll(".recruit-slide");
    const dots = document.querySelectorAll(".recruit-dot");
    const prevBtn = document.querySelector(".recruit-nav.prev");
    const nextBtn = document.querySelector(".recruit-nav.next");
    const container = document.querySelector("#recruit .system-content");

    // Check if recruit slider elements exist
    if (!sliderWrapper || slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    const slideInterval = 5000; // 5 seconds between slides
    let slideTimer;

    // Function to go to a specific slide
    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;

      currentSlide = index;
      updateSlider();
      resetTimer();
    }

    // Update slider position and dots
    function updateSlider() {
      // Move slider - right to left movement
      const translateX = -currentSlide * 33.333; // Each slide is 33.333% width (100% / 3 slides)
      sliderWrapper.style.transform = `translateX(${translateX}%)`;

      // Update dots
      if (dots.length > 0) {
        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === currentSlide);
        });
      }
    }

    // Function for next slide (automatic right to left)
    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    // Reset the timer
    function resetTimer() {
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, slideInterval);
    }

    // Start the slideshow
    resetTimer();

    // Event listeners for navigation
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goToSlide(currentSlide + 1);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        goToSlide(currentSlide - 1);
      });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
    });

    // Pause on hover
    if (container) {
      container.addEventListener("mouseenter", () => {
        clearInterval(slideTimer);
      });

      container.addEventListener("mouseleave", () => {
        resetTimer();
      });
    }

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (container) {
      container.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );

      container.addEventListener(
        "touchend",
        (e) => {
          touchEndX = e.changedTouches[0].screenX;
          handleRecruitSwipe();
        },
        { passive: true }
      );
    }

    function handleRecruitSwipe() {
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - next slide (right to left)
        goToSlide(currentSlide + 1);
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - previous slide
        goToSlide(currentSlide - 1);
      }
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      // Only handle keyboard navigation if recruit section is visible
      const recruitSection = document.querySelector("#recruit");
      if (!recruitSection) return;

      const rect = recruitSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        if (e.key === "ArrowLeft") {
          goToSlide(currentSlide - 1);
        } else if (e.key === "ArrowRight") {
          goToSlide(currentSlide + 1);
        }
      }
    });
  }

  // Mobile Menu functionality
  function initMobileMenu() {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileNav = document.querySelector(".mobile-nav");

    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener("click", function () {
        this.classList.toggle("active");
        mobileNav.classList.toggle("active");
      });

      document.querySelectorAll(".mobile-nav a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenuBtn.classList.remove("active");
          mobileNav.classList.remove("active");
        });
      });
    }
  }

  // Smooth Scroll functionality
  function initSmoothScroll() {
    document.querySelectorAll(".side-nav a, .mobile-nav a").forEach((link) => {
      if (link.hash) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.hash);
          if (target) {
            window.scrollTo({
              top: target.offsetTop,
              behavior: "smooth",
            });
          }
        });
      }
    });
  }

  // Table hover effect for better responsiveness in system and recruit
  function initTableHoverEffect() {
    const tableRows = document.querySelectorAll(".system-table tr");
    tableRows.forEach((row) => {
      row.addEventListener("mouseenter", function () {
        this.style.backgroundColor = "#f0f8ff";
      });
      row.addEventListener("mouseleave", function () {
        this.style.backgroundColor = "";
      });
    });
  }

  // Parallax Effect for hero image
  function initParallaxEffect() {
    const heroImage = document.querySelector(".hero-image img");
    if (heroImage) {
      window.addEventListener("scroll", () => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition <= window.innerHeight) {
          heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
      });
    }
  }

  // Active Navigation Highlight
  function initActiveNavHighlight() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav a");

    const highlightNav = () => {
      let currentSection = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
          currentSection = section.id;
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.hash === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", highlightNav);
    highlightNav();
  }

  // Initialize responsive tables for system and recruit
  function initResponsiveTables() {
    const tables = document.querySelectorAll(".system-table");

    tables.forEach((table) => {
      const tableWidth = table.scrollWidth;
      const containerWidth = table.parentElement.clientWidth;

      if (tableWidth > containerWidth) {
        // Add a visual hint for scrollable tables on mobile
        table.parentElement.classList.add("scrollable-table");
      }
    });
  }

  // Add animation effects to aquarium elements
  function initAquariumEffects() {
    const aquariumElements = document.querySelectorAll(
      ".gallery-item:nth-child(2)"
    );
    aquariumElements.forEach((element) => {
      element.classList.add("aquarium-effect");
    });
  }

  // Optimize images on smaller devices
  function optimizeImagesForMobile() {
    if (window.innerWidth <= 767) {
      const galleryItems = document.querySelectorAll(".gallery-item img");
      galleryItems.forEach((img) => {
        // Lower quality version for mobile to improve performance
        const src = img.getAttribute("src");
        if (src && !src.includes("-mobile") && src.includes(".jpg")) {
          const mobileSrc = src.replace(".jpg", "-mobile.jpg");
          img.setAttribute("data-src", mobileSrc);
          // Only replace if mobile version exists (fallback to original)
          const tempImg = new Image();
          tempImg.onload = () => {
            img.src = mobileSrc;
          };
          tempImg.src = mobileSrc;
        }
      });
    }
  }

  // Function to make tables more responsive
  function enhanceTableResponsiveness() {
    const tables = document.querySelectorAll(".system-table");

    tables.forEach((table) => {
      const headers = table.querySelectorAll("th");
      const rows = table.querySelectorAll("tr");

      // Add data attributes to cells for mobile view
      rows.forEach((row, rowIndex) => {
        if (rowIndex === 0) return; // Skip header row

        const cells = row.querySelectorAll("td");
        cells.forEach((cell, cellIndex) => {
          if (headers[cellIndex]) {
            const headerText = headers[cellIndex].textContent.trim();
            cell.setAttribute("data-label", headerText);
          }
        });
      });
    });
  }

  // Handle viewport changes
  function handleResize() {
    initResponsiveTables();
    optimizeImagesForMobile();

    // Handle table display on narrow screens
    if (window.innerWidth <= 767) {
      enhanceTableResponsiveness();
    }
  }

  // Initialize all functions
  initGallerySlideshow();
  initRecruitSlider(); // ADDED - Initialize recruit slider
  initMobileMenu();
  initSmoothScroll();
  initTableHoverEffect();
  initParallaxEffect();
  initActiveNavHighlight();
  initResponsiveTables();
  initAquariumEffects();
  optimizeImagesForMobile();
  enhanceTableResponsiveness();

  // Add resize listener
  window.addEventListener("resize", handleResize);
});
