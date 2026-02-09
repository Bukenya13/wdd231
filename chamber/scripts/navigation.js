document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navOverlay = document.getElementById('nav-overlay');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.add('open');
            if (navOverlay) navOverlay.classList.add('open');
            hamburger.classList.add('open');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('open');
            if (navOverlay) navOverlay.classList.remove('open');
            hamburger.classList.remove('open');
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navOverlay.classList.remove('open');
            hamburger.classList.remove('open');
        });
    }
});
