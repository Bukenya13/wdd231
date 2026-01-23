// hamburger.js - Hamburger menu functionality

class HamburgerMenu {
    constructor() {
        this.hamburgerBtn = document.getElementById('hamburger-btn');
        this.navLinks = document.getElementById('nav-links');
        this.mobileOverlay = document.getElementById('mobile-overlay');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        // Set initial ARIA attributes
        this.updateAriaAttributes();
        
        // Hamburger button click
        this.hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });
        
        // Close menu when clicking overlay
        if (this.mobileOverlay) {
            this.mobileOverlay.addEventListener('click', () => this.close());
        }
        
        // Close menu when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.navLinks.contains(e.target) && 
                !this.hamburgerBtn.contains(e.target)) {
                this.close();
            }
        });
        
        // Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
                this.hamburgerBtn.focus();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && this.isOpen) {
                this.close();
            }
        });
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        this.isOpen = true;
        this.hamburgerBtn.classList.add('active');
        this.navLinks.classList.add('active');
        if (this.mobileOverlay) this.mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.updateAriaAttributes();
    }
    
    close() {
        this.isOpen = false;
        this.hamburgerBtn.classList.remove('active');
        this.navLinks.classList.remove('active');
        if (this.mobileOverlay) this.mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        this.updateAriaAttributes();
    }
    
    updateAriaAttributes() {
        this.hamburgerBtn.setAttribute('aria-expanded', this.isOpen);
        this.navLinks.setAttribute('aria-hidden', !this.isOpen);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.hamburgerMenu = new HamburgerMenu();
});