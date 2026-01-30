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
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking a navigation link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu on escape key
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
// 3. WEATHER API CONFIGURATION
// ========================================

const WEATHER_CONFIG = {
    apiKey: '4b6617030376791602a616bc73c4e742',
    city: 'Kampala',
    country: 'UG',
    units: 'metric',
    lat: 0.3476,
    lon: 32.5825
};

// ========================================
// 4. FETCH CURRENT WEATHER (WITH NULL CHECK)
// ========================================

async function fetchCurrentWeather() {
    const weatherDiv = safeGetElementById('current-weather');
    if (!weatherDiv) {
        console.log('Current weather element not found - skipping weather fetch');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CONFIG.city},${WEATHER_CONFIG.country}&appid=${WEATHER_CONFIG.apiKey}&units=${WEATHER_CONFIG.units}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
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
// 5. DISPLAY CURRENT WEATHER (WITH NULL CHECK)
// ========================================

function displayCurrentWeather(data) {
    const weatherDiv = safeGetElementById('current-weather');
    if (!weatherDiv) return;

    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    
    weatherDiv.innerHTML = `
        <div class="weather-current">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" 
                 alt="${description}"
                 loading="lazy">
            <div class="weather-info">
                <h3>${temp}°C</h3>
                <p style="text-transform: capitalize; font-weight: 600; color: #264653;">${description}</p>
                <p><strong>Feels like:</strong> ${feelsLike}°C</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind:</strong> ${windSpeed} m/s</p>
            </div>
        </div>
    `;
}

// ========================================
// 6. FETCH 5-DAY WEATHER FORECAST (WITH NULL CHECK)
// ========================================

async function fetchWeatherForecast() {
    const forecastDiv = safeGetElementById('forecast-weather');
    if (!forecastDiv) {
        console.log('Forecast weather element not found - skipping forecast fetch');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${WEATHER_CONFIG.city},${WEATHER_CONFIG.country}&appid=${WEATHER_CONFIG.apiKey}&units=${WEATHER_CONFIG.units}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Forecast API error: ${response.status}`);
        }
        
        const data = await response.json();
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
// 7. DISPLAY WEATHER FORECAST (WITH NULL CHECK)
// ========================================

function displayWeatherForecast(data) {
    const forecastDiv = safeGetElementById('forecast-weather');
    if (!forecastDiv) return;

    let forecastHTML = '';
    
    // Show one forecast per day (every 8 items = 24 hours)
    for (let i = 0; i < data.list.length; i += 8) {
        const item = data.list[i];
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const temp = Math.round(item.main.temp);
        const description = item.weather[0].description;
        const icon = item.weather[0].icon;
        
        forecastHTML += `
            <div class="forecast-day">
                <p><strong>${date}</strong></p>
                <img src="https://openweathermap.org/img/wn/${icon}.png" 
                     alt="${description}"
                     loading="lazy">
                <p>Temp: ${temp}°C</p>
                <p style="text-transform: capitalize;">${description}</p>
            </div>
        `;
    }
    
    forecastDiv.innerHTML = forecastHTML;
}

// ========================================
// 8. FETCH COMPANY SPOTLIGHT (WITH NULL CHECK)
// ========================================

async function fetchCompanySpotlight() {
    const spotlightDiv = safeGetElementById('spotlight-container');
    if (!spotlightDiv) {
        console.log('Spotlight container not found - skipping company spotlight fetch');
        return;
    }

    try {
        const response = await fetch('data/members.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const companies = await response.json();
        displayCompanySpotlight(companies);
    } catch (error) {
        console.error('Error fetching company data:', error);
        if (spotlightDiv) {
            spotlightDiv.innerHTML = 
                '<p style="color: #e76f51; text-align: center;">Unable to load member spotlight. Please ensure data/members.json exists.</p>';
        }
    }
}

// ========================================
// 9. DISPLAY COMPANY SPOTLIGHT (WITH NULL CHECK)
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
    
    // Randomly select 2-3 companies
    const numToDisplay = Math.min(3, qualifiedMembers.length);
    const selectedCompanies = getRandomCompanies(qualifiedMembers, numToDisplay);
    
    let spotlightHTML = '';
    
    selectedCompanies.forEach(company => {
        spotlightHTML += `
            <div class="spotlight-card">
                <img src="${company.image}" 
                     alt="${company.name}"
                     loading="lazy"
                     onerror="this.src='images/placeholder.jpg'">
                <h3>${company.name}</h3>
                ${company.tagline ? `<p class="company-tagline">"${company.tagline}"</p>` : ''}
                <p><strong>Phone:</strong> ${company.phone}</p>
                <p><strong>Address:</strong> ${company.address}</p>
                <span class="membership-badge ${company.membershipLevel.toLowerCase()}">
                    ${company.membershipLevel} Member
                </span>
                <br>
                <a href="${company.website}" target="_blank" class="company-website">
                    Visit Website →
                </a>
            </div>
        `;
    });
    
    spotlightDiv.innerHTML = spotlightHTML;
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
    // Set current year
    const yearSpan = safeGetElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Set last modified date
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
        console.log('Visit tracking elements not found - skipping visit tracking');
        return;
    }

    const now = new Date();
    const lastVisitDate = localStorage.getItem('lastVisit');
    const currentVisitCount = parseInt(localStorage.getItem('visitCount') || '0');

    // Update visit count
    localStorage.setItem('visitCount', (currentVisitCount + 1).toString());
    
    if (lastVisitDate) {
        const lastVisitObj = new Date(lastVisitDate);
        const timeDiff = now - lastVisitObj;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        // Update display
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
        // First visit
        visitInfo.textContent = "Welcome! Let us know if you have any questions.";
        lastVisit.textContent = "This is your first visit!";
        daysBetween.textContent = "0";
    }
    
    // Store current visit
    localStorage.setItem('lastVisit', now.toString());
}

// ========================================
// 13. INITIALIZE ALL FUNCTIONS ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Kampala Kireka Chamber website loaded successfully!');
    
    // Initialize footer (exists on all pages)
    updateFooter();
    
    // Check which page we're on and initialize accordingly
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html') || currentPage === '/' || currentPage.endsWith('chamber/')) {
        // Homepage - initialize weather and spotlight
        console.log('Initializing homepage features...');
        fetchCurrentWeather();
        fetchWeatherForecast();
        fetchCompanySpotlight();
    } else if (currentPage.includes('discover.html')) {
        // Discover page - initialize visit tracking
        console.log('Initializing discover page features...');
        trackVisit();
    }
    
    // Only set up weather refresh if we're on homepage
    if (currentPage.includes('index.html') || currentPage === '/' || currentPage.endsWith('chamber/')) {
        // Refresh weather every 30 minutes (1800000 milliseconds)
        setInterval(() => {
            fetchCurrentWeather();
            fetchWeatherForecast();
        }, 1800000);
    }
});

// ========================================
// 14. ERROR HANDLING FOR IMAGES
// ========================================

// Add default error handler for all images on page load
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