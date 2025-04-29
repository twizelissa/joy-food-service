// JavaScript for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 60,
        behavior: "smooth",
      });
    }
  });
});

// Auto-scrolling image carousel functionality (hero image only)
document.addEventListener("DOMContentLoaded", function () {
  // Configuration
  const carouselConfig = {
    interval: 3000, // Time between slides in milliseconds
    transitionDuration: 500, // Transition duration in milliseconds
  };

  // Initialize hero image auto-scroll only
  initializeHeroCarousel();

  // Hero Image Auto-Scroll
  function initializeHeroCarousel() {
    const heroSection = document.querySelector(".hero-section");
    if (!heroSection) return;

    const heroImageContainer = heroSection.querySelector(
      ".hero-image-container"
    );
    if (!heroImageContainer) return;

    const heroImage = heroImageContainer.querySelector(".hero-image");
    if (!heroImage) return;

    // Store the original image URL
    const originalImageUrl = heroImage.src;

    // Add additional image URLs - You need to have these images in your assets folder
    // Assuming you have these images already in your site
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

    // Add carousel to DOM (replace the original image but keep the overlay)
    const heroOverlay = heroImageContainer.querySelector(".hero-overlay");
    heroImage.remove(); // Remove the original image
    carouselContainer.appendChild(carouselTrack);
    heroImageContainer.insertBefore(carouselContainer, heroOverlay);

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

    // Initialize first slide
    updateCarousel();
  }

  // Show more news items when "Read more" is clicked
  const expandBtn = document.getElementById("expandNewsBtn");
  const hiddenNews = document.querySelectorAll(".hidden-news");

  if (expandBtn) {
    expandBtn.addEventListener("click", function () {
      // Toggle hidden news items
      let isExpanded = expandBtn.classList.contains("expanded");

      if (isExpanded) {
        // Hide items
        hiddenNews.forEach((item) => {
          item.style.display = "none";
        });
        expandBtn.textContent = "Read more";
        expandBtn.classList.remove("expanded");
      } else {
        // Show items
        hiddenNews.forEach((item) => {
          if (window.innerWidth <= 767) {
            item.style.display = "block";
          } else {
            item.style.display = "flex";
          }
        });
        expandBtn.textContent = "Show less";
        expandBtn.classList.add("expanded");
      }
    });

    // Adjust display style on window resize
    window.addEventListener("resize", function () {
      const isExpanded = expandBtn.classList.contains("expanded");

      if (isExpanded) {
        hiddenNews.forEach((item) => {
          if (window.innerWidth <= 767) {
            item.style.display = "block";
          } else {
            item.style.display = "flex";
          }
        });
      }
    });
  }
});

// Updated Recruit Section Pagination
const recruitPages = document.querySelectorAll(".recruit-page");
const indicators = document.querySelectorAll(".indicator");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const pagesContainer = document.querySelector(".recruit-pages");
let currentPage = 0;
const totalPages = recruitPages.length;

// Show the specified page and update indicators
function showPage(index) {
  // Move the entire container
  const offset = -index * 100;
  pagesContainer.style.transform = `translateX(${offset}%)`;

  // Update indicators
  indicators.forEach((indicator, i) => {
    if (i === index) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });

  // Update buttons state
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === totalPages - 1;

  // Update current page
  currentPage = index;
}

// Initialize pagination
showPage(0);

// Previous button click
prevBtn.addEventListener("click", function () {
  if (currentPage > 0) {
    showPage(currentPage - 1);
  }
});

// Next button click
nextBtn.addEventListener("click", function () {
  if (currentPage < totalPages - 1) {
    showPage(currentPage + 1);
  }
});

// Click on indicators
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", function () {
    showPage(index);
  });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileNav = document.querySelector(".mobile-nav");

mobileMenuBtn.addEventListener("click", function () {
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

// Add Swiper.js initialization
document.addEventListener("DOMContentLoaded", function () {
  // Add Swiper script and CSS to the page if not already included
  if (!document.querySelector('script[src*="swiper"]')) {
    const swiperScript = document.createElement("script");
    swiperScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js";
    document.head.appendChild(swiperScript);

    const swiperCSS = document.createElement("link");
    swiperCSS.rel = "stylesheet";
    swiperCSS.href =
      "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.css";
    document.head.appendChild(swiperCSS);
  }

  // Initialize Swiper (with a small delay to ensure script is loaded)
  setTimeout(function () {
    if (typeof Swiper !== "undefined") {
      const recruitSwiper = new Swiper(".recruit-swiper", {
        // Optional parameters
        loop: false,
        slidesPerView: 1,
        spaceBetween: 0,

        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        // Pagination
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
          },
        },

        // Disable preloading of all images
        preloadImages: false,

        // Enable lazy loading
        lazy: true,

        // Improve performance
        watchSlidesProgress: true,

        // Transition effect
        effect: "slide",
        speed: 400,

        // On init event
        on: {
          init: function () {
            // Hide prev button on first slide
            if (this.isBeginning) {
              document.querySelector(".swiper-button-prev").style.visibility =
                "hidden";
            }
          },
          slideChange: function () {
            // Show/hide navigation buttons based on slide position
            if (this.isBeginning) {
              document.querySelector(".swiper-button-prev").style.visibility =
                "hidden";
            } else {
              document.querySelector(".swiper-button-prev").style.visibility =
                "visible";
            }

            if (this.isEnd) {
              document.querySelector(".swiper-button-next").style.visibility =
                "hidden";
            } else {
              document.querySelector(".swiper-button-next").style.visibility =
                "visible";
            }
          },
        },
      });
    } else {
      console.error(
        "Swiper is not loaded. Please include Swiper.js in your project."
      );
    }
  }, 500);
});

// Other existing JavaScript for the page
// JavaScript for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 60,
        behavior: "smooth",
      });
    }
  });
});

// Mobile menu toggle

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener("click", function () {
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
}
