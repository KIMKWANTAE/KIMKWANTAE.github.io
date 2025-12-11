// Navigation scroll effect
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = nav.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
});

// Tab switching for experience section
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        const targetPanel = document.getElementById(`${targetTab}-panel`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Observe hero elements
const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-title, .hero-description, .cta-button');
heroElements.forEach((el, index) => {
    setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }, index * 200);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navHeight = nav.offsetHeight;
        
        if (window.pageYOffset >= (sectionTop - navHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksList.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add typing effect to hero name (optional enhancement)
const heroName = document.querySelector('.hero-name .name-line');
if (heroName) {
    const text = heroName.textContent;
    heroName.textContent = '';
    heroName.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroName.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing after a delay
    setTimeout(() => {
        typeWriter();
    }, 1000);
}

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Add hover effect to cards
document.querySelectorAll('.education-card, .cert-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)';
    });
});

// Image Slider Functionality
const sliderTrack = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderIndicators = document.getElementById('sliderIndicators');
const slides = document.querySelectorAll('.slide');

let currentSlide = 0;
const totalSlides = slides.length;
let indicators = [];

// Create indicators
if (sliderIndicators && slides.length > 0) {
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        sliderIndicators.appendChild(indicator);
        indicators.push(indicator);
    });
}

// Update slider position
function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;
    updateSlider();
}

// Next slide
function nextSlide() {
    currentSlide++;
    if (currentSlide >= totalSlides) currentSlide = 0;
    updateSlider();
}

// Previous slide
function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    updateSlider();
}

// Event listeners
if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const sliderSection = document.getElementById('home-intro');
    if (sliderSection) {
        const rect = sliderSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        }
    }
});

// Auto-play slider (optional - can be disabled)
// let autoPlayInterval;
// function startAutoPlay() {
//     autoPlayInterval = setInterval(nextSlide, 5000);
// }
// function stopAutoPlay() {
//     clearInterval(autoPlayInterval);
// }
// startAutoPlay();

// Pause on hover (if auto-play is enabled)
// if (sliderTrack) {
//     sliderTrack.addEventListener('mouseenter', stopAutoPlay);
//     sliderTrack.addEventListener('mouseleave', startAutoPlay);
// }

// Reading Modal Functionality
const readingTag = document.getElementById('readingTag');
const readingModal = document.getElementById('readingModal');
const closeReadingModal = document.getElementById('closeReadingModal');

if (readingTag && readingModal) {
    // Open modal when reading tag is clicked
    readingTag.addEventListener('click', () => {
        readingModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal when close button is clicked
    if (closeReadingModal) {
        closeReadingModal.addEventListener('click', () => {
            readingModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close modal when clicking outside the modal content
    readingModal.addEventListener('click', (e) => {
        if (e.target === readingModal) {
            readingModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && readingModal.classList.contains('active')) {
            readingModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}

// Console message
console.log('%c안녕하세요! 👋', 'color: #64ffda; font-size: 20px; font-weight: bold;');
console.log('%c이 페이지는 HTML, CSS, JavaScript로만 제작되었습니다.', 'color: #8892b0; font-size: 14px;');
