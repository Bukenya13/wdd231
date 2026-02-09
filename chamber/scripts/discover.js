import attractions from '../data/attractions.mjs';

// DOM Elements
const attractionsContainer = document.getElementById('attractions-container');
const visitMessage = document.getElementById('visit-message');

// Display Attractions Cards
function displayAttractions() {
    attractionsContainer.innerHTML = '';
    
    attractions.forEach((attraction, index) => {
        const card = document.createElement('div');
        card.className = 'attraction-card';
        
        // Get stored likes from localStorage
        const storedLikes = localStorage.getItem(`likes-${attraction.id}`);
        const likeCount = storedLikes ? parseInt(storedLikes) : 0;
        
        card.innerHTML = `
            <h2>${attraction.name}</h2>
            <figure>
                <img src="${attraction.image}" 
                     alt="${attraction.name}" 
                     loading="lazy"
                     width="300" 
                     height="200">
            </figure>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <div class="card-buttons">
                <button class="learn-more-btn" data-link="${attraction.link}">Learn More</button>
                <button class="like-btn" data-id="${attraction.id}">❤️ <span class="like-count">${likeCount}</span> Likes</button>
            </div>
        `;
        
        attractionsContainer.appendChild(card);
    });
    
    // Add event listeners to buttons
    addEventListeners();
}

// Add event listeners to dynamic buttons
function addEventListeners() {
    // Learn More buttons
    document.querySelectorAll('.learn-more-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const link = e.target.getAttribute('data-link');
            window.open(link, '_blank', 'noopener,noreferrer');
        });
    });
    
    // Like buttons
    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const attractionId = e.target.getAttribute('data-id');
            const likeCountSpan = e.target.querySelector('.like-count');
            
            // Get current likes
            const storedLikes = localStorage.getItem(`likes-${attractionId}`);
            let currentLikes = storedLikes ? parseInt(storedLikes) : 0;
            
            // Increment likes
            currentLikes++;
            
            // Store updated likes
            localStorage.setItem(`likes-${attractionId}`, currentLikes.toString());
            
            // Update display
            likeCountSpan.textContent = currentLikes;
            
            // Add visual feedback
            e.target.style.transform = 'scale(1.2)';
            setTimeout(() => {
                e.target.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

// localStorage for Visit Message
function displayVisitMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now();
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-message';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close message');
    
    closeButton.addEventListener('click', () => {
        visitMessage.style.display = 'none';
    });
    
    // Determine message based on last visit
    let message = '';
    
    if (!lastVisit) {
        // First visit
        message = "Welcome! Let us know if you have any questions about our area.";
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const daysBetween = Math.floor((currentVisit - lastVisitDate) / (1000 * 60 * 60 * 24));
        
        if (daysBetween === 0) {
            message = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            message = `You last visited 1 day ago. Welcome back!`;
        } else {
            message = `You last visited ${daysBetween} days ago. We're glad to have you back!`;
        }
    }
    
    // Create and add message with close button
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    messageSpan.style.flexGrow = '1';
    
    visitMessage.innerHTML = '';
    visitMessage.appendChild(messageSpan);
    visitMessage.appendChild(closeButton);
    
    // Store current visit
    localStorage.setItem('lastVisit', currentVisit.toString());
}

// Handle responsive image loading
function handleImageLoading() {
    const images = document.querySelectorAll('.attraction-card img');
    
    images.forEach(img => {
        // Add loading animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        // Handle image errors
        img.addEventListener('error', () => {
            console.error(`Failed to load image: ${img.src}`);
            img.alt = 'Image not available';
            img.style.opacity = '1';
            img.style.backgroundColor = '#f0f0f0';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Display attractions
    displayAttractions();
    
    // Display visit message
    displayVisitMessage();
    
    // Handle image loading effects
    handleImageLoading();
    
    // Add some console logging for debugging
    console.log('Discover page initialized');
    console.log(`Loaded ${attractions.length} attractions`);
    
    // Log localStorage contents for debugging
    console.log('LocalStorage contents:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`${key}: ${localStorage.getItem(key)}`);
    }
});

// Optional: Add window resize handler for debugging
window.addEventListener('resize', () => {
    console.log(`Window resized to: ${window.innerWidth}px`);
    
    // Update a custom property for debugging
    document.documentElement.style.setProperty('--window-width', `${window.innerWidth}px`);
});
