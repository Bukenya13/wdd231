// navigation.js - Navigation data and functionality

const NAV_DATA = {
    links: [
        { name: 'Home', url: '/', icon: '🏠' },
        { name: 'Directory', url: '/directory', icon: '📇' },
        { name: 'About', url: '/about', icon: 'ℹ️' },
        { name: 'Events', url: '/events', icon: '📅' },
        { name: 'Membership', url: '/membership', icon: '⭐' },
        { name: 'Contact', url: '/contact', icon: '📞' }
    ]
};

// Initialize navigation
function initNavigation() {
    // Set active link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
    
    // Add click handlers for navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('/')) {
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Simulate navigation (in a real app, this would be a page load)
                console.log(`Navigating to: ${this.getAttribute('href')}`);
                
                // If it's an anchor link, scroll smoothly
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initNavigation);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NAV_DATA, initNavigation };
}