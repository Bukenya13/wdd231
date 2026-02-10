// ========================================
// MAIN.JS - FitCore Gym Homepage Scripts
// ========================================

// Hamburger Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '#membership-form') return;
        
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// FEATURED MEMBERS - Load from JSON
// ========================================

async function loadFeaturedMembers() {
    const container = document.getElementById('featuredMembersContainer');
    if (!container) return;

    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const members = await response.json();
        
        // Show first 4 members as featured
        const featured = members.slice(0, 4);
        
        container.innerHTML = featured.map(member => `
            <div class="member-card">
                <img src="${member.image}" 
                     alt="${member.name}" 
                     loading="lazy"
                     onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <span class="level">${member.fitnessLevel || member.membershipLevel}</span>
                    <p>${member.specialty}</p>
                </div>
            </div>
        `).join('');

        console.log('Featured members loaded:', featured.length);
    } catch (error) {
        console.error('Error loading featured members:', error);
        container.innerHTML = '<p style="text-align:center; color:#666;">Unable to load featured members.</p>';
    }
}

// ========================================
// FOOTER - Dynamic Year
// ========================================

function updateFooterYear() {
    const yearElements = document.querySelectorAll('.footer .container p');
    if (yearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        yearElements[0].innerHTML = yearElements[0].innerHTML.replace(/\d{4}/, currentYear);
    }
}

// ========================================
// ACTIVE NAV HIGHLIGHT ON SCROLL
// ========================================

function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// INITIALIZE
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('FitCore Gym - Main script loaded');
    loadFeaturedMembers();
    updateFooterYear();
    highlightActiveNav();
});
