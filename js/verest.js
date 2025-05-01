/**
 * VEREST Website JavaScript
 * Handles gallery slideshow with multiple images per slide, navigation and other interactive elements
 */
document.addEventListener("DOMContentLoaded", function () {
  // Multi-image Gallery Slideshow
  function initGallerySlideshow() {
    const galleryContainer = document.querySelector(".gallery-container");
    if (!galleryContainer) return;

    const wrapper = galleryContainer.querySelector(".gallery-wrapper");
    const slides = galleryContainer.querySelectorAll(".gallery-slide");
    const controlsContainer =
      galleryContainer.querySelector(".gallery-controls");
    const prevButton = galleryContainer.querySelector(".gallery-prev");
    const nextButton = galleryContainer.querySelector(".gallery-next");

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

    // Add event listeners to navigation buttons
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        goToSlide(currentSlide - 1 < 0 ? slides.length - 1 : currentSlide - 1);
        resetTimer();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        goToSlide((currentSlide + 1) % slides.length);
        resetTimer();
      });
    }

    // Function to go to a specific slide
    function goToSlide(index) {
      if (index < 0 || index >= slides.length || index === currentSlide) return;

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

    // Pause slideshow when user hovers over it
    galleryContainer.addEventListener("mouseenter", () => {
      clearInterval(slideTimer);
    });

    galleryContainer.addEventListener("mouseleave", () => {
      resetTimer();
    });

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

  // Table hover effect
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

  // Initialize all functions
  initGallerySlideshow();
  initMobileMenu();
  initSmoothScroll();
  initTableHoverEffect();
  initParallaxEffect();
  initActiveNavHighlight();
});
