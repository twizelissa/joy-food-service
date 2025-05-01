/**
 * VEREST Website JavaScript
 * Handles automatic slideshow, mobile menu, smooth scrolling, and other interactive elements
 */
document.addEventListener("DOMContentLoaded", function () {
  // Gallery slideshow functionality
  function initGallerySlideshow() {
    const galleryContainer = document.querySelector(".gallery-container");
    if (!galleryContainer) return;

    const slides = galleryContainer.querySelectorAll(".gallery-item");
    const dotsContainer = galleryContainer.querySelector(".gallery-dots");

    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds between slides
    let slideTimer;

    // Initialize first slide
    slides[0].classList.add("active");

    // Create dots if container exists
    if (dotsContainer) {
      slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("gallery-dot");
        if (index === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
          goToSlide(index);
          resetTimer();
        });

        dotsContainer.appendChild(dot);
      });
    }

    // Function to go to a specific slide
    function goToSlide(index) {
      // Remove active class from all slides and dots
      slides.forEach((slide) => slide.classList.remove("active"));
      if (dotsContainer) {
        dotsContainer
          .querySelectorAll(".gallery-dot")
          .forEach((dot) => dot.classList.remove("active"));
      }

      // Add active class to current slide and dot
      slides[index].classList.add("active");
      if (dotsContainer) {
        dotsContainer
          .querySelectorAll(".gallery-dot")
          [index].classList.add("active");
      }

      currentSlide = index;
    }

    // Function for next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      goToSlide(currentSlide);
    }

    // Reset the timer
    function resetTimer() {
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, slideInterval);
    }

    // Start the slideshow
    resetTimer();

    // Pause slideshow when user hovers over it (optional)
    galleryContainer.addEventListener("mouseenter", () => {
      clearInterval(slideTimer);
    });

    galleryContainer.addEventListener("mouseleave", () => {
      resetTimer();
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
