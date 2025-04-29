// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.side-nav a, .mobile-nav a');
    
    navLinks.forEach(link => {
        // Skip links that go to different pages
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
    
    // Add blue glow effect to gallery items
    const addAquariumEffect = () => {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        
        galleryItems.forEach((item, index) => {
            if (index % 2 === 0) {
                item.classList.add('aquarium-effect');
            }
        });
    };
    
    addAquariumEffect();
    
    // Animation for news items on scroll
    const newsItems = document.querySelectorAll('.news-item');
    
    const fadeInNewsItems = () => {
        newsItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initially set news items to be hidden
    newsItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', fadeInNewsItems);
    
    // Call once on load to check for elements already in view
    fadeInNewsItems();
    
    // Add parallax effect to hero image
    const heroImage = document.querySelector('.hero-image img');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition <= window.innerHeight) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });
    
    // Add hover effect to system table rows
    const tableRows = document.querySelectorAll('.system-table tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f8ff';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // Highlight active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const sideNavLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    const highlightNavOnScroll = () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update side nav
        sideNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
        
        // Update mobile nav
        mobileNavLinks.forEach(link => {
            link.style.color = 'white';
            if (link.getAttribute('href') === '#' + currentSection) {
                link.style.color = '#0099ff';
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Call once on page load
});

// Create code for news detail page (separate file: news-detail.js)
/*
// This would be in news-detail.js
document.addEventListener('DOMContentLoaded', function() {
    // Get the news ID from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');
    
    // Sample news data - in a real application, this would come from a server
    const newsData = {
        "1": {
            title: "ゴールデンウィーク特別営業のお知らせ",
            date: "2025.04.05",
            content: "<p>ゴールデンウィーク期間中、特別営業を実施いたします。通常よりも営業時間を延長し、特別なカクテルメニューもご用意しております。</p><p>期間中は、バーテンダーによる特別なカクテルショーも開催予定です。店内の幻想的な雰囲気と共に、特別なひとときをお過ごしください。</p><p>また、期間限定の特別コースメニューもご用意しております。詳細は店舗までお問い合わせください。</p><p>皆様のご来店を心よりお待ちしております。</p>"
        },
        "2": {
            title: "春の新メニュー登場",
            date: "2025.03.20",
            content: "<p>春の訪れと共に、新しいドリンクメニューが登場しました。桜をイメージした特製カクテルなど、季節感あふれるメニューをお楽しみいただけます。</p><p>当店バーテンダーが厳選した春の食材を使用したカクテルは、見た目にも美しく、味わい深い一品となっております。</p><p>また、春の夜をより楽しむための特別なフードメニューも追加いたしました。カクテルとのペアリングを楽しみながら、特別なひとときをお過ごしください。</p>"
        },
        "3": {
            title: "バレンタインスペシャルイベント開催",
            date: "2025.02.14",
            content: "<p>バレンタインデーにあわせて、特別なカップルシートをご用意いたします。心地よい音楽と特別なカクテルで、素敵な時間をお過ごしください。ご予約はお早めに。</p><p>チョコレートを使用した特製カクテルや、甘さ控えめの大人向けスイーツなど、バレンタインデーにぴったりのメニューをご用意しております。</p><p>特別な方との大切な時間を、VERESTの上質な空間でお過ごしください。</p>"
        },
        "4": {
            title: "新年特別営業のお知らせ",
            date: "2025.01.10",
            content: "<p>新年あけましておめでとうございます。1月10日より通常営業を再開いたします。本年も皆様のご来店を心よりお待ちしております。</p><p>新年を祝して、期間限定の特別なカクテルメニューをご用意いたしました。新しい年の始まりにふさわしい、華やかで幸福感あふれる味わいをお楽しみください。</p><p>本年も変わらぬご愛顧のほど、よろしくお願い申し上げます。</p>"
        }
    };
    
    // Update the page with the news data
    if (newsData[newsId]) {
        const news = newsData[newsId];
        document.getElementById('news-title').textContent = news.title;
        document.getElementById('news-date').textContent = news.date;
        document.getElementById('news-content').innerHTML = news.content;
    } else {
        // Handle case where news ID is not found
        window.location.href = 'index.html#news';
    }
});
*/