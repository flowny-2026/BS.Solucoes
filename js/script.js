/* ===================================
   BS Soluções - Dark Premium
   Landing Page JavaScript
   =================================== */

// === Navbar Scroll Effect ===
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// === Mobile Menu Toggle ===
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// === Smooth Scrolling ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// === Particles Animation ===
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const leftPos = Math.random() * 100;
        particle.style.left = `${leftPos}%`;
        
        // Random delay
        const delay = Math.random() * 15;
        particle.style.animationDelay = `${delay}s`;
        
        // Random duration
        const duration = 10 + Math.random() * 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random size
        const size = 2 + Math.random() * 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on load
window.addEventListener('load', createParticles);

// === Intersection Observer for Animations ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation if it's a stat item
            if (entry.target.classList.contains('stat-item')) {
                const numberElement = entry.target.querySelector('.stat-number');
                if (numberElement && !numberElement.classList.contains('counted')) {
                    animateCounter(numberElement);
                }
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));
});

// === Counter Animation ===
function animateCounter(element) {
    element.classList.add('counted');
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// === Testimonials Slider ===
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialDots = document.querySelectorAll('.dot');
let currentTestimonial = 0;
const totalTestimonials = testimonialDots.length;
let autoSlideInterval;

function updateTestimonialSlider(index) {
    currentTestimonial = index;
    const offset = -100 * currentTestimonial;
    testimonialTrack.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    testimonialDots.forEach((dot, i) => {
        if (i === currentTestimonial) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextTestimonial() {
    const next = (currentTestimonial + 1) % totalTestimonials;
    updateTestimonialSlider(next);
}

function prevTestimonial() {
    const prev = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonialSlider(prev);
}

// Dot navigation
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateTestimonialSlider(index);
        resetAutoSlide();
    });
});

// Auto slide
function startAutoSlide() {
    autoSlideInterval = setInterval(nextTestimonial, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

testimonialTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

testimonialTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextTestimonial();
        } else {
            prevTestimonial();
        }
        resetAutoSlide();
    }
}

// Start auto slide on load
startAutoSlide();

// Pause auto slide when user hovers over testimonials
const testimonialsSection = document.querySelector('.testimonials-slider');
testimonialsSection.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

testimonialsSection.addEventListener('mouseleave', () => {
    startAutoSlide();
});

// === Parallax Effect on Hero ===
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
        const opacity = 1 - (scrolled / heroHeight) * 0.5;
        hero.style.opacity = opacity;
    }
});

// === Active Link Highlighting ===
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// === Prevent FOUC (Flash of Unstyled Content) ===
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// === Performance Optimization: Debounce Scroll Events ===
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    // Additional scroll-based functionality can be added here
}));

// === Add hover effects to service cards ===
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// === Console Message ===
console.log('%c🔌 BS Soluções - Elétrica e Rede', 'font-size: 20px; color: #FFD700; font-weight: bold;');
console.log('%cIluminando caminhos e conectando vidas', 'font-size: 14px; color: #CCCCCC; font-style: italic;');
console.log('%cDesenvolvido com ❤️ e JavaScript Vanilla', 'font-size: 12px; color: #25D366;');

// === Dynamic Year in Footer ===
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
    }
});

// === Loading Animation ===
window.addEventListener('load', () => {
    // Smooth reveal of hero content
    const heroElements = document.querySelectorAll('.animate-on-load');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// === Keyboard Navigation Support ===
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Arrow keys for testimonial navigation
    if (e.key === 'ArrowLeft') {
        prevTestimonial();
        resetAutoSlide();
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
        resetAutoSlide();
    }
});

// === Accessibility: Focus Management ===
const focusableElements = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

navMenu.addEventListener('transitionend', () => {
    if (navMenu.classList.contains('active')) {
        const firstFocusable = navMenu.querySelector(focusableElements);
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
});

// === WhatsApp Float Button Analytics (optional) ===
const whatsappFloat = document.querySelector('.whatsapp-float');
const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .btn-primary[href*="wa.me"]');

whatsappFloat?.addEventListener('click', () => {
    console.log('WhatsApp Float Button clicked');
    // Add analytics tracking here if needed
});

whatsappButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('WhatsApp CTA Button clicked');
        // Add analytics tracking here if needed
    });
});

// === Lazy Loading for Better Performance ===
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// === Error Handling ===
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.message);
});

// === Viewport Height Fix for Mobile ===
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', debounce(setViewportHeight, 100));

// === HVAC Comparador Antes/Depois ===
function comparar(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const divisor = e.currentTarget.querySelector('.divisor-gold');
    const antes = e.currentTarget.querySelector('.img-antes');
    
    // Pega a posição X (seja mouse ou toque)
    let posX = (e.pageX || (e.touches ? e.touches[0].pageX : 0)) - rect.left;
    
    // Bloqueia para não sair das bordas
    if (posX < 0) posX = 0;
    if (posX > rect.width) posX = rect.width;
    
    // Converte para porcentagem
    let calcPercent = (posX / rect.width) * 100;
    
    // Aplica no CSS
    antes.style.width = calcPercent + "%";
    divisor.style.left = calcPercent + "%";
}

// HVAC Button Actions
document.addEventListener('DOMContentLoaded', () => {
    const hvacButtons = document.querySelectorAll('.hvac-btn');
    
    hvacButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            let message = '';
            
            switch(service) {
                case 'instalacao':
                    message = 'Olá! Gostaria de um orçamento para instalação de ar-condicionado.';
                    break;
                case 'higienizacao':
                    message = 'Olá! Gostaria de solicitar o serviço de higienização de ar-condicionado.';
                    break;
                case 'manutencao':
                    message = 'Olá! Gostaria de agendar uma manutenção de ar-condicionado.';
                    break;
                default:
                    message = 'Olá! Gostaria de mais informações sobre climatização.';
            }
            
            const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });
});

// === Portfolio Particles (Optional) ===
function createPortfolioParticles() {
    const portfolioParticles = document.getElementById('particles-portfolio');
    if (!portfolioParticles) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const leftPos = Math.random() * 100;
        particle.style.left = `${leftPos}%`;
        
        // Random delay
        const delay = Math.random() * 20;
        particle.style.animationDelay = `${delay}s`;
        
        // Random duration
        const duration = 15 + Math.random() * 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random size
        const size = 1 + Math.random() * 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        portfolioParticles.appendChild(particle);
    }
}

// Initialize portfolio particles
window.addEventListener('load', () => {
    createPortfolioParticles();
});

// === Initialize all features on DOM ready ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ All features initialized successfully!');
});