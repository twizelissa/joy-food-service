/**
 * VEREST Website JavaScript
 * Handles gallery slideshow with infinite scrolling animation
 */
document.addEventListener("DOMContentLoaded", function () {
  // Infinite Scrolling Gallery - UPDATED
  function initGallerySlideshow() {
    const galleryContainer = document.querySelector(".gallery-container");
    if (!galleryContainer) return;

    const wrapper = galleryContainer.querySelector(".gallery-wrapper");
    const originalSlides = galleryContainer.querySelectorAll(".gallery-slide");
    
    if (originalSlides.length === 0) return;

    // Clone slides for infinite effect
    originalSlides.forEach(slide => {
      const clone = slide.cloneNode(true);
      wrapper.appendChild(clone);
    });

    // Set up infinite animation
    const totalSlides = originalSlides.length;
    const slideWidth = 100; // Each slide is 100% width
    const animationDuration = 20; // 20 seconds per full cycle
    
    // Apply continuous animation
    wrapper.style.animation = `infiniteSlide ${animationDuration}s linear infinite`;
    
    // Create CSS keyframes dynamically
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes infiniteSlide {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-${totalSlides * slideWidth}%);
        }
      }
    `;
    document.head.appendChild(styleSheet);

    // Pause animation on hover
    wrapper.addEventListener('mouseenter', () => {
      wrapper.style.animationPlayState = 'paused';
    });

    wrapper.addEventListener('mouseleave', () => {
      wrapper.style.animationPlayState = 'running';
    });
  }

  // RECRUIT SLIDER FUNCTIONALITY - UNCHANGED
  function initRecruitSlider() {
    const sliderWrapper = document.querySelector(".recruit-slider-wrapper");
    const slides = document.querySelectorAll(".recruit-slide");
    const dots = document.querySelectorAll(".recruit-dot");
    const prevBtn = document.querySelector(".recruit-nav.prev");
    const nextBtn = document.querySelector(".recruit-nav.next");
    const container = document.querySelector("#recruit .system-content");

    if (!sliderWrapper || slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    const slideInterval = 5000;
    let slideTimer;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;

      currentSlide = index;
      updateSlider();
      resetTimer();
    }

    function updateSlider() {
      const translateX = -currentSlide * 33.333;
      sliderWrapper.style.transform = `translateX(${translateX}%)`;

      if (dots.length > 0) {
        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === currentSlide);
        });
      }
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function resetTimer() {
      clearInterval(slideTimer);
      slideTimer = setInterval(nextSlide, slideInterval);
    }

    resetTimer();

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

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
    });

    if (container) {
      container.addEventListener("mouseenter", () => {
        clearInterval(slideTimer);
      });

      container.addEventListener("mouseleave", () => {
        resetTimer();
      });
    }

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
        goToSlide(currentSlide + 1);
      } else if (touchEndX - touchStartX > swipeThreshold) {
        goToSlide(currentSlide - 1);
      }
    }

    document.addEventListener("keydown", (e) => {
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

  // Parallax Effect
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

  // Initialize responsive tables
  function initResponsiveTables() {
    const tables = document.querySelectorAll(".system-table");

    tables.forEach((table) => {
      const tableWidth = table.scrollWidth;
      const containerWidth = table.parentElement.clientWidth;

      if (tableWidth > containerWidth) {
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

  // Optimize images for mobile
  function optimizeImagesForMobile() {
    if (window.innerWidth <= 767) {
      const galleryItems = document.querySelectorAll(".gallery-item img");
      galleryItems.forEach((img) => {
        const src = img.getAttribute("src");
        if (src && !src.includes("-mobile") && src.includes(".jpg")) {
          const mobileSrc = src.replace(".jpg", "-mobile.jpg");
          img.setAttribute("data-src", mobileSrc);
          const tempImg = new Image();
          tempImg.onload = () => {
            img.src = mobileSrc;
          };
          tempImg.src = mobileSrc;
        }
      });
    }
  }

  // Enhance table responsiveness
  function enhanceTableResponsiveness() {
    const tables = document.querySelectorAll(".system-table");

    tables.forEach((table) => {
      const headers = table.querySelectorAll("th");
      const rows = table.querySelectorAll("tr");

      rows.forEach((row, rowIndex) => {
        if (rowIndex === 0) return;

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

    if (window.innerWidth <= 767) {
      enhanceTableResponsiveness();
    }
  }

  // Initialize all functions
  initGallerySlideshow();
  initRecruitSlider();
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