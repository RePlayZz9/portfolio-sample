// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-icon');
        
        this.init();
    }
    
    init() {
        this.applyTheme();
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
    }
    
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }
    
    updateThemeIcon() {
        this.themeIcon.textContent = this.theme === 'light' ? '🌙' : '☀️';
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileToggle = document.getElementById('mobile-menu-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.handleScroll();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    handleScroll() {
        const scrolled = window.scrollY > 50;
        this.navbar.classList.toggle('scrolled', scrolled);
    }
    
    setupMobileMenu() {
        this.mobileToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.mobileToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (this.navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.navMenu.classList.contains('active')) {
                this.navMenu.classList.remove('active');
                this.mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
                
                // Close mobile menu if open
                this.navMenu.classList.remove('active');
                this.mobileToggle.classList.remove('active');
            });
        });
    }
    
    scrollToSection(selector) {
        const element = document.querySelector(selector);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Portfolio Filter Management
class PortfolioManager {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card[data-category]');
        
        this.init();
    }
    
    init() {
        this.setupFilters();
    }
    
    setupFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
                this.updateActiveFilter(button);
            });
        });
    }
    
    filterProjects(filter) {
        this.projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });
    }
    
    updateActiveFilter(activeButton) {
        this.filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
}

// Contact Form Management
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitButton = this.form.querySelector('.form-submit');
        this.submitText = this.submitButton.querySelector('.submit-text');
        this.submitLoading = this.submitButton.querySelector('.submit-loading');
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Show loading state
        this.setLoadingState(true);
        
        // Simulate form submission
        await this.simulateSubmission();
        
        // Show success message
        this.showSuccessMessage();
        
        // Reset form
        this.form.reset();
        this.setLoadingState(false);
    }
    
    setLoadingState(loading) {
        this.submitButton.disabled = loading;
        this.submitText.style.display = loading ? 'none' : 'flex';
        this.submitLoading.style.display = loading ? 'flex' : 'none';
    }
    
    async simulateSubmission() {
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        });
    }
    
    showSuccessMessage() {
        alert('Message sent successfully! I\'ll get back to you within 24 hours.');
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, this.observerOptions);
        
        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll(
            '.value-card, .stat-item, .service-card, .project-card, .contact-item'
        );
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Mouse Movement Effects
class MouseEffects {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.heroBackground = this.hero?.querySelector('.hero-background');
        
        this.init();
    }
    
    init() {
        if (this.hero && this.heroBackground) {
            this.hero.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        }
    }
    
    handleMouseMove(e) {
        const rect = this.hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create a subtle gradient that follows the mouse
        const gradient = `radial-gradient(600px circle at ${x}px ${y}px, rgba(147, 51, 234, 0.1), transparent 40%)`;
        this.heroBackground.style.background = gradient;
    }
}

// Utility Functions
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new PortfolioManager();
    new ContactFormManager();
    new ScrollAnimations();
    new MouseEffects();
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            scrollToSection(targetId);
        });
    });
    
    // Add loading animation to page
    document.body.classList.add('fade-in');
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
    document.head.appendChild(script);
}