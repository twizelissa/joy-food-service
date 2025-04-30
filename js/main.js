/**
 * Joy Food Service - Main JavaScript
 * - Handles all interactive elements and animations
 * - Includes smooth scrolling, mobile menu, image carousel, and Swiper initialization
 * - Last updated: April 30, 2025
 */

// ================ Smooth Scrolling ================
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
  
  // ================ Document Ready Function ================
  document.addEventListener("DOMContentLoaded", function () {
    // ================ Hero Image Carousel ================
    initializeHeroCarousel();
    
    // ================ News Section - Read More ================
    setupNewsReadMore();
    
    // ================ Mobile Menu ================
    setupMobileMenu();
    
    // ================ Initialize Swiper for Recruit Section ================
    initializeRecruitSwiper();
  });
  
  // ================ Hero Image Auto-Scroll Carousel ================
  function initializeHeroCarousel() {
    // Configuration
    const carouselConfig = {
      interval: 3000, // Time between slides in milliseconds
      transitionDuration: 500, // Transition duration in milliseconds
    };
  
    const heroSection = document.querySelector(".hero-section");
    if (!heroSection) return;
  
    const heroImageContainer = heroSection.querySelector(".hero-image-container");
    if (!heroImageContainer) return;
  
    const heroImage = heroImageContainer.querySelector(".hero-image");
    if (!heroImage) return;
  
    // Store the original image URL
    const originalImageUrl = heroImage.src;
  
    // Add additional image URLs - You need to have these images in your assets folder
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
  
  // ================ News Section - Read More Function ================
  function setupNewsReadMore() {
    const expandBtn = document.getElementById("expandNewsBtn");
    const hiddenNews = document.querySelectorAll(".hidden-news");
  
    if (expandBtn && hiddenNews.length > 0) {
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
  }
  
  // ================ Mobile Menu Function ================
  function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileNav = document.querySelector(".mobile-nav");
  
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
  }
  
  // ================ Initialize Swiper for Recruit Section ================
  function initializeRecruitSwiper() {
    // Check if Swiper is available, if not, load it
    if (typeof Swiper === 'undefined') {
      loadSwiperLibrary().then(() => {
        initSwiper();
      });
    } else {
      initSwiper();
    }
    
    function initSwiper() {
      const recruitSwiper = new Swiper(".recruit-swiper", {
        // Core settings
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 600,
        grabCursor: true,
        autoHeight: true, // Important: enable auto height
        
        // Prevent multiple slides showing
        effect: 'fade', // Use fade effect for smooth transition
        fadeEffect: {
          crossFade: true
        },
        
        // Prevent any unwanted scrolling
        allowTouchMove: true,
        simulateTouch: true,
        
        // Navigation
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        
        // Pagination
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        
        // Accessibility
        a11y: {
          prevSlideMessage: '前のスライド',
          nextSlideMessage: '次のスライド',
          firstSlideMessage: '最初のスライド',
          lastSlideMessage: '最後のスライド',
          paginationBulletMessage: 'スライド {{index}}に移動',
        },
        
        // Keyboard control
        keyboard: {
          enabled: true,
        },
        
        // Events
        on: {
          init: function() {
            updateNavigationVisibility(this);
          },
          slideChange: function() {
            updateNavigationVisibility(this);
          }
        }
      });
      
      // Function to update navigation button visibility
      function updateNavigationVisibility(swiper) {
        const prevBtn = document.querySelector('.swiper-button-prev');
        const nextBtn = document.querySelector('.swiper-button-next');
        
        if (prevBtn && nextBtn) {
          if (swiper.isBeginning) {
            prevBtn.classList.add('swiper-button-disabled');
          } else {
            prevBtn.classList.remove('swiper-button-disabled');
          }
          
          if (swiper.isEnd) {
            nextBtn.classList.add('swiper-button-disabled');
          } else {
            nextBtn.classList.remove('swiper-button-disabled');
          }
        }
      }
    }
  }
  
  // ================ Helper: Load Swiper Library if needed ================
  function loadSwiperLibrary() {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src*="swiper"]')) {
        resolve();
        return;
      }
      
      // Add Swiper script
      const swiperScript = document.createElement("script");
      swiperScript.src = "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js";
      document.head.appendChild(swiperScript);
      
      // Add Swiper CSS if needed
      if (!document.querySelector('link[href*="swiper"]')) {
        const swiperCSS = document.createElement("link");
        swiperCSS.rel = "stylesheet";
        swiperCSS.href = "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.css";
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