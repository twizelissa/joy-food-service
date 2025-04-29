// News page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Table of Contents toggle functionality
    const hideLink = document.querySelector('.hide-link');
    const tableOfContents = document.querySelector('.news-table-of-contents ol');
    
    if (hideLink && tableOfContents) {
        hideLink.addEventListener('click', function() {
            // Toggle visibility of the table of contents
            if (tableOfContents.style.display === 'none') {
                tableOfContents.style.display = 'block';
                hideLink.textContent = '[hide]';
            } else {
                tableOfContents.style.display = 'none';
                hideLink.textContent = '[show]';
            }
        });
    }
    
    // Smooth scrolling for table of contents links
    document.querySelectorAll('.news-table-of-contents a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current section in table of contents
    const sections = document.querySelectorAll('.news-content section');
    const tocLinks = document.querySelectorAll('.news-table-of-contents a');
    
    function highlightTocLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all links
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                tocLinks[index].classList.add('active');
            }
        });
    }
    
    // Add active class CSS
    const style = document.createElement('style');
    style.textContent = `
        .news-table-of-contents a.active {
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
    
    // Listen for scroll to highlight the active TOC link
    window.addEventListener('scroll', highlightTocLink);
    
    // Run once on page load
    highlightTocLink();
});