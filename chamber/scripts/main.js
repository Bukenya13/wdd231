// ========================================
// KAMPALA KIREKA CHAMBER OF COMMERCE - MAIN JS
// ========================================

// ========================================
// 1. NAVIGATION TOGGLE (Hamburger Menu)
// ========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// 2. SAFE ELEMENT SELECTOR WITH NULL CHECK
// ========================================

function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
    return element;
}

function safeGetElementById(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element not found: #${id}`);
        return null;
    }
    return element;
}

// ========================================
// 3. WEATHER API CONFIGURATION - KAMPALA
// ========================================

const WEATHER_API_KEY = '4b6617030376791602a616bc73c4e742';
const KAMPALA_LAT = 0.3476;
const KAMPALA_LON = 32.5825;

// ========================================
// 4. FETCH CURRENT WEATHER
// ========================================

async function fetchCurrentWeather() {
    const weatherDiv = safeGetElementById('current-weather');
    if (!weatherDiv) {
        console.log('Current weather element not found');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${KAMPALA_LAT}&lon=${KAMPALA_LON}&units=metric&appid=${WEATHER_API_KEY}`;
    
    try {
        console.log('Fetching weather from:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Weather data received:', data);
        displayCurrentWeather(data);
    } catch (error) {
        console.error('Error fetching current weather:', error);
        if (weatherDiv) {
            weatherDiv.innerHTML = 
                '<p style="color: #e76f51; text-align: center;">Unable to load weather data. Please check your connection.</p>';
        }
    }
}

// ========================================
// 5. DISPLAY CURRENT WEATHER
// ========================================

function displayCurrentWeather(data) {
    const weatherDiv = safeGetElementById('current-weather');
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    
    weatherDiv.innerHTML = `
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Condition:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
    `;
}

// ========================================
// 6. FETCH 5-DAY WEATHER FORECAST
// ========================================

async function fetchWeatherForecast() {
    const forecastDiv = safeGetElementById('forecast-weather');
    if (!forecastDiv) {
        console.log('Forecast weather element not found');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${KAMPALA_LAT}&lon=${KAMPALA_LON}&units=metric&appid=${WEATHER_API_KEY}`;
    
    try {
        console.log('Fetching forecast from:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Forecast API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Forecast data received:', data);
        displayWeatherForecast(data);
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
        const forecastDiv = safeGetElementById('forecast-weather');
        if (forecastDiv) {
            forecastDiv.innerHTML = 
                '<p style="color: #e76f51; text-align: center;">Unable to load forecast data. Please check your connection.</p>';
        }
    }
}

// ========================================
// 7. DISPLAY WEATHER FORECAST
// ========================================

function displayWeatherForecast(data) {
    const forecastDiv = safeGetElementById('forecast-weather');
    let forecastHTML = '';
    
    // Get forecast for next 5 days (every 24 hours)
    for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        
        forecastHTML += `
            <div class="forecast-day">
                <p><strong>${date}</strong></p>
                <p>${temp}°C - ${day.weather[0].main}</p>
            </div>
        `;
    }
    
    forecastDiv.innerHTML = forecastHTML;
}

// ========================================
// 8. FETCH COMPANY SPOTLIGHT
// ========================================

async function fetchCompanySpotlight() {
    const spotlightDiv = safeGetElementById('spotlight-container');
    if (!spotlightDiv) {
        console.log('Spotlight container not found');
        return;
    }

    try {
        const response = await fetch('data/members.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const companies = await response.json();
        console.log('Members data received:', companies);
        displayCompanySpotlight(companies);
    } catch (error) {
        console.error('Error fetching company data:', error);
        if (spotlightDiv) {
            spotlightDiv.innerHTML = 
                '<p style="color: #e76f51; text-align: center;">Unable to load member spotlight.</p>';
        }
    }
}

// ========================================
// 9. DISPLAY COMPANY SPOTLIGHT
// ========================================

function displayCompanySpotlight(companies) {
    const spotlightDiv = safeGetElementById('spotlight-container');
    if (!spotlightDiv) return;
    
    // Filter for Gold and Silver members only
    const qualifiedMembers = companies.filter(company => 
        company.membershipLevel === 'Gold' || company.membershipLevel === 'Silver'
    );
    
    if (qualifiedMembers.length === 0) {
        spotlightDiv.innerHTML = '<p style="text-align: center;">No qualified members available for spotlight.</p>';
        return;
    }
    
    // Randomly select 3 companies
    const numToDisplay = Math.min(3, qualifiedMembers.length);
    const selectedCompanies = getRandomCompanies(qualifiedMembers, numToDisplay);
    
    let spotlightHTML = '<div class="spotlight-grid">';
    
    selectedCompanies.forEach((company, index) => {
        // Generate different random images for each company
        const randomImageId = Math.floor(Math.random() * 1000);
        const imageUrl = `https://images.unsplash.com/photo-${1500000000 + randomImageId}?auto=format&fit=crop&w=400&q=80`;
        
        // Fallback images based on company type
        const fallbackImages = [
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80'
        ];
        
        const displayImage = fallbackImages[index % fallbackImages.length];
        
        spotlightHTML += `
            <div class="spotlight-card">
                <img src="${displayImage}" 
                     alt="${company.name} - ${company.industry}"
                     loading="lazy"
                     class="spotlight-image"
                     data-company-id="${index}"
                     onerror="this.src='https://via.placeholder.com/300x250?text=${encodeURIComponent(company.name)}'">
                <h3>${company.name}</h3>
                <p class="company-industry"><strong>Industry:</strong> ${company.industry || 'Business Services'}</p>
                ${company.tagline ? `<p class="company-tagline">"${company.tagline}"</p>` : ''}
                <p><strong>📍 Phone:</strong> <a href="tel:${company.phone}">${company.phone}</a></p>
                <p><strong>📧 Email:</strong> <a href="mailto:${company.email}">${company.email}</a></p>
                <p><strong>🏢 Address:</strong> ${company.address}</p>
                <span class="membership-badge ${company.membershipLevel.toLowerCase()}">
                    ⭐ ${company.membershipLevel} Member
                </span>
                <br>
                <a href="${company.website}" target="_blank" rel="noopener noreferrer" class="company-website">
                    🌐 Visit Website
                </a>
            </div>
        `;
    });
    
    spotlightHTML += '</div>';
    spotlightDiv.innerHTML = spotlightHTML;
    
    // Add click event to shuffle through images
    document.querySelectorAll('.spotlight-image').forEach(img => {
        img.addEventListener('click', function() {
            rotateImage(this);
        });
    });
}

// ========================================
// 9.5 ROTATE SPOTLIGHT IMAGES
// ========================================

function rotateImage(imgElement) {
    const images = [
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80'
    ];
    
    const randomIndex = Math.floor(Math.random() * images.length);
    imgElement.style.opacity = '0.5';
    
    setTimeout(() => {
        imgElement.src = images[randomIndex];
        imgElement.style.opacity = '1';
    }, 200);
}

// ========================================
// 10. HELPER: GET RANDOM COMPANIES
// ========================================

function getRandomCompanies(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// ========================================
// 11. FOOTER: CURRENT YEAR & LAST MODIFIED
// ========================================

function updateFooter() {
    const yearSpan = safeGetElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    const modifiedSpan = safeGetElementById('lastModified');
    if (modifiedSpan) {
        modifiedSpan.textContent = document.lastModified;
    }
}

// ========================================
// 12. VISIT TRACKING FOR DISCOVER PAGE
// ========================================

function trackVisit() {
    const visitInfo = safeGetElementById('visit-info');
    const lastVisit = safeGetElementById('last-visit');
    const daysBetween = safeGetElementById('days-between');
    
    if (!visitInfo || !lastVisit || !daysBetween) {
        console.log('Visit tracking elements not found');
        return;
    }

    const now = new Date();
    const lastVisitDate = localStorage.getItem('lastVisit');

    localStorage.setItem('visitCount', (parseInt(localStorage.getItem('visitCount') || '0') + 1).toString());
    
    if (lastVisitDate) {
        const lastVisitObj = new Date(lastVisitDate);
        const timeDiff = now - lastVisitObj;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        lastVisit.textContent = lastVisitObj.toLocaleDateString();
        daysBetween.textContent = daysDiff;
        
        if (daysDiff === 0) {
            visitInfo.textContent = "Back so soon! Awesome!";
        } else if (daysDiff === 1) {
            visitInfo.textContent = "You last visited 1 day ago.";
        } else {
            visitInfo.textContent = `You last visited ${daysDiff} days ago.`;
        }
    } else {
        visitInfo.textContent = "Welcome! Let us know if you have any questions.";
        lastVisit.textContent = "This is your first visit!";
        daysBetween.textContent = "0";
    }
    
    localStorage.setItem('lastVisit', now.toString());
}

// ========================================
// 13. INITIALIZE ALL FUNCTIONS ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Kampala Kireka Chamber website loaded successfully!');
    
    updateFooter();
    
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html') || currentPage === '/' || currentPage.endsWith('chamber/')) {
        console.log('Initializing homepage features...');
        fetchCurrentWeather();
        fetchWeatherForecast();
        fetchCompanySpotlight();
    } else if (currentPage.includes('discover.html')) {
        console.log('Initializing discover page features...');
        trackVisit();
    }
    
    if (currentPage.includes('index.html') || currentPage === '/' || currentPage.endsWith('chamber/')) {
        setInterval(() => {
            fetchCurrentWeather();
            fetchWeatherForecast();
        }, 1800000);
    }
});

// ========================================
// 14. ERROR HANDLING FOR IMAGES
// ========================================

window.addEventListener('load', () => {
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('onerror')) {
            img.onerror = function() {
                this.style.display = 'none';
                console.warn('Image failed to load:', this.src);
            };
        }
    });
});

// ========================================
// END OF MAIN.JS
// ========================================