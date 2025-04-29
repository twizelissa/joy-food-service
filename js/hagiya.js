/**
 * Hagiya Restaurant - Main JavaScript File
 * Version: 1.0
 * 
 * Table of Contents:
 * 1. DOM Content Loaded Event
 * 2. Fade In Elements on Scroll
 * 3. Smooth Scrolling for Navigation
 * 4. Gallery Auto-Scroll Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all JS functionality
    initFadeInElements();
    initSmoothScrolling();
    initGalleryAutoScroll();
  
    // Other initialization if needed
    console.log('Hagiya website initialized');
  });
  
  /**
   * 2. Fade In Elements on Scroll
   * ----------------------------
   * Adds fade-in animation to elements when they become visible in the viewport
   */
  function initFadeInElements() {
    const fadeElements = document.querySelectorAll('.fade-element');
    
    // If no fade elements exist, return early
    if (!fadeElements.length) return;
    
    // Initial check for elements in viewport on page load
    checkFadeElements();
    
    // Set up scroll event listener for fade effect
    window.addEventListener('scroll', checkFadeElements);
    
    function checkFadeElements() {
      const windowHeight = window.innerHeight;
      
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // How many pixels from the bottom of the viewport to start the animation
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('fade-in');
        }
      });
    }
  }
  
  /**
   * 3. Smooth Scrolling for Navigation
   * ----------------------------
   * Implements smooth scrolling for navigation links
   */
  function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Prevent default anchor behavior
        e.preventDefault();
        
        // Get the target element
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Smooth scroll to target
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update active navigation link
          navLinks.forEach(link => link.classList.remove('active'));
          this.classList.add('active');
        }
      });
    });
    
    // Update active navigation based on scroll position
    window.addEventListener('scroll', function() {
      let current = '';
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
  
  /**
   * 4. Gallery Auto-Scroll Functionality
   * ----------------------------
   * Implements automatic horizontal scrolling for the gallery section
   */
  function initGalleryAutoScroll() {
    // Get the gallery container
    const galleryContainer = document.querySelector('.gallery-container');
    
    // If gallery doesn't exist, return early
    if (!galleryContainer) return;
    
    // Auto-scroll variables
    let scrollInterval;
    let isPaused = false;
    const scrollSpeed = 2; // Pixels per interval (lower = slower)
    const scrollInterval_ms = 30; // Milliseconds between scroll increments
    
    // Function to start auto-scrolling
    function startAutoScroll() {
      if (scrollInterval) clearInterval(scrollInterval);
      
      scrollInterval = setInterval(() => {
        if (!isPaused) {
          // If we've reached the end, loop back to start
          if (galleryContainer.scrollLeft >= (galleryContainer.scrollWidth - galleryContainer.clientWidth - 10)) {
            // Adding a small animation to reset smoothly
            galleryContainer.style.scrollBehavior = 'auto';
            galleryContainer.scrollLeft = 0;
            setTimeout(() => {
              galleryContainer.style.scrollBehavior = 'smooth';
            }, 50);
          } else {
            // Regular scrolling
            galleryContainer.scrollLeft += scrollSpeed;
          }
        }
      }, scrollInterval_ms);
    }
    
    // Pause scrolling when user hovers over the gallery
    galleryContainer.addEventListener('mouseenter', () => {
      isPaused = true;
    });
    
    // Resume scrolling when user leaves the gallery
    galleryContainer.addEventListener('mouseleave', () => {
      isPaused = false;
    });
    
    // Pause scrolling when user is touching the gallery (for mobile)
    galleryContainer.addEventListener('touchstart', () => {
      isPaused = true;
    });
    
    // Resume scrolling after touch ends with a delay
    galleryContainer.addEventListener('touchend', () => {
      setTimeout(() => {
        isPaused = false;
      }, 1500); // Delay in milliseconds
    });
    
    // Add navigation arrows for manual control
    function addNavigationArrows() {
      // Create arrow elements
      const leftArrow = document.createElement('button');
      leftArrow.className = 'gallery-arrow gallery-arrow-left';
      leftArrow.innerHTML = '&larr;';
      leftArrow.setAttribute('aria-label', 'Scroll left');
      
      const rightArrow = document.createElement('button');
      rightArrow.className = 'gallery-arrow gallery-arrow-right';
      rightArrow.innerHTML = '&rarr;';
      rightArrow.setAttribute('aria-label', 'Scroll right');
      
      // Add click event listeners
      leftArrow.addEventListener('click', () => {
        isPaused = true; // Pause auto-scrolling temporarily
        galleryContainer.scrollBy({
          left: -300,
          behavior: 'smooth'
        });
        
        // Resume auto-scrolling after a delay
        setTimeout(() => {
          isPaused = false;
        }, 2000);
      });
      
      rightArrow.addEventListener('click', () => {
        isPaused = true; // Pause auto-scrolling temporarily
        galleryContainer.scrollBy({
          left: 300,
          behavior: 'smooth'
        });
        
        // Resume auto-scrolling after a delay
        setTimeout(() => {
          isPaused = false;
        }, 2000);
      });
      
      // Add arrows to gallery section
      const gallerySection = document.querySelector('.gallery-section');
      gallerySection.appendChild(leftArrow);
      gallerySection.appendChild(rightArrow);
    }
    
    // Initialize auto-scroll
    startAutoScroll();
    
    // Add navigation arrows
    addNavigationArrows();
  }