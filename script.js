// ================================
// SMOOTH SCROLLING FOR NAVIGATION
// ================================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Also handle CTA button smooth scroll
document.querySelector('.cta-button')?.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
});

// ================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing after animation
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
});

// ================================
// PARALLAX EFFECT ON HERO SECTION
// ================================

let lastScrollY = 0;
let ticking = false;

function updateParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;
    
    // Only apply parallax when hero is visible
    if (scrolled < heroHeight) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        
        // Fade out hero content on scroll
        const heroContent = document.querySelector('.hero-content');
        const opacity = 1 - (scrolled / heroHeight) * 1.5;
        heroContent.style.opacity = Math.max(0, opacity);
    }
    
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestParallaxUpdate);

// ================================
// NAVBAR BACKGROUND ON SCROLL
// ================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add extra background opacity when scrolled
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ================================
// TIMELINE SEQUENTIAL ANIMATION
// ================================

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Get index of timeline item
            const timelineItems = document.querySelectorAll('.timeline-item');
            const index = Array.from(timelineItems).indexOf(entry.target);
            
            // Add staggered delay based on index
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150); // 150ms delay between each item
            
            timelineObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
});

// ================================
// CHAMPION CARDS STAGGERED ANIMATION
// ================================

const championObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const championCards = document.querySelectorAll('.champion-card');
            const index = Array.from(championCards).indexOf(entry.target);
            
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            
            championObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    const championCards = document.querySelectorAll('.champion-card');
    championCards.forEach(card => {
        championObserver.observe(card);
    });
});

// ================================
// MOMENT CARDS STAGGERED ANIMATION
// ================================

const momentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const momentCards = document.querySelectorAll('.moment-card');
            const index = Array.from(momentCards).indexOf(entry.target);
            
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            
            momentObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    const momentCards = document.querySelectorAll('.moment-card');
    momentCards.forEach(card => {
        momentObserver.observe(card);
    });
});

// ================================
// ACTIVE NAV LINK HIGHLIGHTING
// ================================

function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ================================
// PREVENT SCROLL JANK ON PAGE LOAD
// ================================

window.addEventListener('load', () => {
    document.body.style.overflow = 'visible';
    
    // Trigger initial checks
    setActiveNavLink();
    updateParallax();
});

// ================================
// HOVER EFFECTS ENHANCEMENT
// ================================

// Add dynamic hover effects to champion cards
document.querySelectorAll('.champion-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Add dynamic hover effects to moment cards
document.querySelectorAll('.moment-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.moment-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.moment-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ================================
// PERFORMANCE OPTIMIZATION
// ================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to resize events
const handleResize = debounce(() => {
    // Recalculate positions if needed
    setActiveNavLink();
}, 250);

window.addEventListener('resize', handleResize);

// ================================
// CONSOLE EASTER EGG
// ================================

console.log('%c🏎️ F1 Racing History', 'color: #e10600; font-size: 24px; font-weight: bold; font-family: Orbitron, sans-serif;');
console.log('%cWelcome to the ultimate F1 history experience!', 'color: #ffd700; font-size: 14px; font-family: Rajdhani, sans-serif;');
console.log('%cBuilt with passion for Formula 1 racing 🏁', 'color: #e0e0e0; font-size: 12px;');
