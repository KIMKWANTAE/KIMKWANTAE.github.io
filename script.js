// ========================================
// Smooth Scrolling for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Expertise Accordion
// ========================================
const expertiseItems = document.querySelectorAll('.expertise-item');

expertiseItems.forEach(item => {
    const header = item.querySelector('.expertise-item-header');
    const toggle = item.querySelector('.expertise-toggle');

    header.addEventListener('click', () => {
        // Close other items
        expertiseItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// ========================================
// Reading Modal
// ========================================
const readingCard = document.getElementById('readingCard');
const readingModal = document.getElementById('readingModal');
const closeReadingModal = document.getElementById('closeReadingModal');

if (readingCard && readingModal && closeReadingModal) {
    readingCard.addEventListener('click', () => {
        readingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeReadingModal.addEventListener('click', () => {
        readingModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    readingModal.addEventListener('click', (e) => {
        if (e.target === readingModal) {
            readingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && readingModal.classList.contains('active')) {
            readingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// Scroll Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ========================================
// Home Photos Slider
// ========================================
let currentHomeSlide = 0;
const homeSliderTrack = document.getElementById('homeSliderTrack');
const homeSlides = document.querySelectorAll('.home-slide');
const homePrevBtn = document.getElementById('homePrevBtn');
const homeNextBtn = document.getElementById('homeNextBtn');
const homeSliderDots = document.getElementById('homeSliderDots');

if (homeSliderTrack && homeSlides.length > 0) {
    // Create pagination dots
    homeSlides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `사진 ${index + 1}로 이동`);
        dot.addEventListener('click', () => goToHomeSlide(index));
        homeSliderDots.appendChild(dot);
    });

    const dots = homeSliderDots.querySelectorAll('.slider-dot');

    function updateHomeSlider() {
        const offset = -currentHomeSlide * 100;
        homeSliderTrack.style.transform = `translateX(${offset}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentHomeSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToHomeSlide(index) {
        currentHomeSlide = index;
        updateHomeSlider();
    }

    function nextHomeSlide() {
        currentHomeSlide = (currentHomeSlide + 1) % homeSlides.length;
        updateHomeSlider();
    }

    function prevHomeSlide() {
        currentHomeSlide = (currentHomeSlide - 1 + homeSlides.length) % homeSlides.length;
        updateHomeSlider();
    }

    if (homeNextBtn) {
        homeNextBtn.addEventListener('click', nextHomeSlide);
    }

    if (homePrevBtn) {
        homePrevBtn.addEventListener('click', prevHomeSlide);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevHomeSlide();
        } else if (e.key === 'ArrowRight') {
            nextHomeSlide();
        }
    });
}

// ========================================
// Parallax Effect for Star Accent
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const starAccent = document.querySelector('.star-accent');

    if (starAccent) {
        const parallaxSpeed = 0.3;
        starAccent.style.transform = `translateY(${scrolled * parallaxSpeed}px) rotate(${scrolled * 0.1}deg)`;
    }
});

// ========================================
// Header Show/Hide on Scroll
// ========================================
let lastScroll = 0;
const topMenu = document.querySelector('.top-menu');
const logoCircle = document.querySelector('.logo-circle');
const socialLinks = document.querySelector('.social-links');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        if (currentScroll > lastScroll) {
            // Scrolling down
            if (topMenu) topMenu.style.transform = 'translateX(-50%) translateY(-100px)';
            if (logoCircle) logoCircle.style.transform = 'translateY(-100px)';
            if (socialLinks) socialLinks.style.transform = 'translateY(-100px)';
        } else {
            // Scrolling up
            if (topMenu) topMenu.style.transform = 'translateX(-50%) translateY(0)';
            if (logoCircle) logoCircle.style.transform = 'translateY(0)';
            if (socialLinks) socialLinks.style.transform = 'translateY(0)';
        }
    } else {
        // At top
        if (topMenu) topMenu.style.transform = 'translateX(-50%) translateY(0)';
        if (logoCircle) logoCircle.style.transform = 'translateY(0)';
        if (socialLinks) socialLinks.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// ========================================
// Add Transition to Navigation Elements
// ========================================
if (topMenu) topMenu.style.transition = 'transform 0.3s ease';
if (logoCircle) logoCircle.style.transition = 'transform 0.3s ease';
if (socialLinks) socialLinks.style.transition = 'transform 0.3s ease';

// ========================================
// Page Load Animation
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Hobby Cards Animation on Hover
// ========================================
const hobbyCards = document.querySelectorAll('.hobby-card');

hobbyCards.forEach((card, index) => {
    // Stagger animation on load
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.3s ease';

    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100 * index);
});

// ========================================
// Contact Circle Button Rotation on Hover
// ========================================
const contactCircleBtn = document.querySelector('.contact-circle-btn');

if (contactCircleBtn) {
    contactCircleBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05) rotate(5deg)';
    });

    contactCircleBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
}
