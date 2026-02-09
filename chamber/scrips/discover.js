import attractions from '../data/attractions.mjs';

// DOM Elements
const attractionsContainer = document.getElementById('attractions-container');
const visitMessage = document.getElementById('visit-message');

// Display Attractions
function displayAttractions() {
    attractionsContainer.innerHTML = '';
    
    attractions.forEach(attraction => {
        const card = document.createElement('div');
        card.className = 'attraction-card';
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
            <button onclick="window.open('${attraction.link}', '_blank')">Learn More</button>
        `;
        attractionsContainer.appendChild(card);
    });
}

// localStorage for Visit Message
function displayVisitMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now();
    
    if (!lastVisit) {
        // First visit
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const daysBetween = Math.floor((currentVisit - lastVisitDate) / (1000 * 60 * 60 * 24));
        
        if (daysBetween < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            visitMessage.textContent = `You last visited 1 day ago.`;
        } else {
            visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
        }
    }
    
    // Store current visit
    localStorage.setItem('lastVisit', currentVisit.toString());
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayAttractions();
    displayVisitMessage();
});