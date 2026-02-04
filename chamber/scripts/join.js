class JoinFormManager {
    constructor() {
        this.form = document.getElementById('joinForm');
        this.modals = document.querySelectorAll('.modal');
        this.buttons = document.querySelectorAll('.info-btn');
        this.closeButtons = document.querySelectorAll('.modal-close');
        this.init();
    }

    init() {
        this.setTimestamp();
        this.setupModals();
        this.setupFormValidation();
        this.setupFormSubmission();
        this.setupAccessibility();
        this.updateFooterInfo();
    }

    // Set current timestamp when page loads
    setTimestamp() {
        const now = new Date();
        const timestamp = now.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        const timestampField = document.getElementById('timestamp');
        if (timestampField) {
            timestampField.value = timestamp;
        }
    }

    // ===== MODAL MANAGEMENT =====
    setupModals() {
        // Open modal on info button click
        this.buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = btn.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    this.openModal(modal);
                }
            });
        });

        // Close modal on close button click
        this.closeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = btn.closest('.modal');
                this.closeModal(modal);
            });
        });

        // Close modal when clicking outside (backdrop)
        this.modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.modals.forEach(modal => {
                    if (modal.classList.contains('open')) {
                        this.closeModal(modal);
                    }
                });
            }
        });
    }

    openModal(modal) {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus on close button for accessibility
        const closeBtn = modal.querySelector('.modal-close');
        setTimeout(() => closeBtn.focus(), 100);
    }

    closeModal(modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }

    // ===== FORM VALIDATION =====
    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Validate on blur
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            // Real-time feedback on input
            input.addEventListener('input', () => {
                if (input.value) {
                    this.validateField(input);
                }
            });

            // Remove error on focus
            input.addEventListener('focus', () => {
                input.classList.remove('error');
                input.setAttribute('aria-invalid', 'false');
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;

        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                isValid = value.length > 0;
                break;
            
            case 'orgTitle':
                // Minimum 7 characters, letters/hyphens/spaces only
                const titlePattern = /^[a-zA-Z\s\-]{7,}$/;
                isValid = titlePattern.test(value) || value === '';
                break;
            
            case 'email':
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailPattern.test(value) || value === '';
                break;
            
            case 'phone':
                isValid = value.length > 0;
                break;
            
            case 'businessName':
                isValid = value.length > 0;
                break;
            
            default:
                isValid = true;
        }

        // Apply visual feedback
        if (!isValid && value !== '') {
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');
        } else {
            field.classList.remove('error');
            field.setAttribute('aria-invalid', 'false');
        }

        return isValid;
    }

    // ===== FORM SUBMISSION =====
    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            if (!this.validateAllFields()) {
                e.preventDefault();
                this.showValidationError();
                return false;
            }
        });
    }

    validateAllFields() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field) || field.value.trim() === '') {
                isValid = false;
                field.classList.add('error');
                field.setAttribute('aria-invalid', 'true');
            } else {
                field.classList.remove('error');
                field.setAttribute('aria-invalid', 'false');
            }
        });

        return isValid;
    }

    showValidationError() {
        // Remove existing error message
        const existingError = document.querySelector('.validation-error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create new error message
        const errorMsg = document.createElement('div');
        errorMsg.className = 'validation-error-message';
        errorMsg.setAttribute('role', 'alert');
        errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill in all required fields correctly.';
        
        // Insert at top of form
        this.form.insertBefore(errorMsg, this.form.firstChild);
        
        // Scroll to error
        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorMsg.parentNode) {
                errorMsg.remove();
            }
        }, 5000);
    }

    // ===== ACCESSIBILITY SETUP =====
    setupAccessibility() {
        // Add aria-labels to form inputs
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const label = group.querySelector('label');
            const input = group.querySelector('input, textarea, select');
            
            if (label && input && !input.getAttribute('aria-label')) {
                // Remove asterisk from label text
                const labelText = label.textContent.replace(/\s\*/, '').trim();
                input.setAttribute('aria-label', labelText);
            }
        });

        // Ensure form has proper role
        this.form.setAttribute('role', 'form');
    }

    // ===== FOOTER UPDATES =====
    updateFooterInfo() {
        const currentYear = new Date().getFullYear();
        const yearElement = document.getElementById('currentYear');
        const modifiedElement = document.getElementById('lastModified');

        if (yearElement) {
            yearElement.textContent = currentYear;
        }

        if (modifiedElement) {
            modifiedElement.textContent = document.lastModified;
        }
    }
}

// Initialize form manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new JoinFormManager();
});

// Handle hamburger menu (if not in main.js)
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('open');
        });

        // Close menu when link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('open');
            });
        });
    }
});