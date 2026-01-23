// chamber.js - Business directory functionality

document.addEventListener('DOMContentLoaded', function() {
    initChamber();
});

function initChamber() {
    // Load business data
    loadBusinessData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Hide loading initially
    hideLoading();
}

let allBusinesses = [];

async function loadBusinessData() {
    showLoading();
    
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Failed to load business data');
        
        allBusinesses = await response.json();
        displayBusinesses(allBusinesses);
    } catch (error) {
        console.error('Error loading business data:', error);
        showError('Failed to load business directory. Please try again later.');
    } finally {
        hideLoading();
    }
}

function displayBusinesses(businesses) {
    const container = document.getElementById('data-container');
    
    if (!businesses || businesses.length === 0) {
        container.innerHTML = '<p class="no-data">No businesses found.</p>';
        return;
    }
    
    container.innerHTML = businesses.map(business => createBusinessCard(business)).join('');
}

function createBusinessCard(business) {
    const membershipClass = getMembershipClass(business.membership);
    
    return `
        <article class="business-card" data-category="${business.category}" data-membership="${business.membership}">
            <div class="business-image">
                <img src="${business.image}" alt="${business.name}" loading="lazy">
                <span class="category-badge">${business.category}</span>
            </div>
            <div class="business-info">
                <h3>${business.name}</h3>
                <span class="membership ${membershipClass}">${business.membership}</span>
                
                ${business.address ? `<p class="address">${business.address}</p>` : ''}
                
                ${business.phone ? `
                    <p class="phone">
                        <a href="tel:${business.phone}">${business.phone}</a>
                    </p>` : ''}
                
                ${business.website ? `
                    <p class="website">
                        <a href="${ensureHttp(business.website)}" target="_blank" rel="noopener">
                            Visit Website
                        </a>
                    </p>` : ''}
                
                <button class="contact-btn" onclick="contactBusiness('${business.name}', '${business.phone}')">
                    Contact Business
                </button>
            </div>
        </article>
    `;
}

function getMembershipClass(membership) {
    const level = membership.toLowerCase();
    if (level.includes('platinum')) return 'platinum';
    if (level.includes('gold')) return 'gold';
    if (level.includes('silver')) return 'silver';
    return '';
}

function ensureHttp(url) {
    if (!url) return '#';
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return 'https://' + url;
    }
    return url;
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('business-search');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterBusinesses);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', filterBusinesses);
    }
    
    // Filter functionality
    const categoryFilter = document.getElementById('category-filter');
    const membershipFilter = document.getElementById('membership-filter');
    const resetBtn = document.getElementById('reset-filters');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterBusinesses);
    }
    
    if (membershipFilter) {
        membershipFilter.addEventListener('change', filterBusinesses);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
}

function filterBusinesses() {
    const searchTerm = document.getElementById('business-search')?.value.toLowerCase() || '';
    const category = document.getElementById('category-filter')?.value || '';
    const membership = document.getElementById('membership-filter')?.value || '';
    
    const filtered = allBusinesses.filter(business => {
        const matchesSearch = !searchTerm || 
            business.name.toLowerCase().includes(searchTerm) ||
            (business.address && business.address.toLowerCase().includes(searchTerm)) ||
            (business.category && business.category.toLowerCase().includes(searchTerm));
        
        const matchesCategory = !category || business.category === category;
        const matchesMembership = !membership || business.membership === membership;
        
        return matchesSearch && matchesCategory && matchesMembership;
    });
    
    displayBusinesses(filtered);
}

function resetFilters() {
    document.getElementById('business-search').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('membership-filter').value = '';
    displayBusinesses(allBusinesses);
}

function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'block';
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
}

function showError(message) {
    const container = document.getElementById('data-container');
    container.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <button onclick="location.reload()">Reload Page</button>
        </div>
    `;
}

// Global contact function
window.contactBusiness = function(name, phone) {
    if (phone) {
        window.open(`tel:${phone}`, '_self');
    } else {
        alert(`Contact information for ${name} is not available.`);
    }
};