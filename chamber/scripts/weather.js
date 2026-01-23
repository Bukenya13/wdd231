// weather.js - OpenWeather API integration

const WEATHER_CONFIG = {
    API_KEY: '986663344c7d836ae8b4aa6569f499a7', // Replace with your OpenWeather API key
    CITY: 'Kampala',
    COUNTRY: 'UG',
    UNITS: 'metric',
    UPDATE_INTERVAL: 30 * 60 * 1000 // 30 minutes
};

class WeatherWidget {
    constructor() {
        this.container = document.getElementById('weather-info');
        this.refreshBtn = document.getElementById('refresh-weather');
        this.lastUpdate = null;
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        this.loadWeather();
        
        if (this.refreshBtn) {
            this.refreshBtn.addEventListener('click', () => this.loadWeather(true));
        }
        
        // Auto-refresh
        setInterval(() => this.loadWeather(), WEATHER_CONFIG.UPDATE_INTERVAL);
    }
    
    async loadWeather(force = false) {
        if (this.isLoading) return;
        
        // Check cache
        if (!force && this.shouldUseCache()) {
            this.displayWeather(this.getCachedData());
            return;
        }
        
        this.isLoading = true;
        this.showLoading();
        
        try {
            const weatherData = await this.fetchWeather();
            this.displayWeather(weatherData);
            this.cacheData(weatherData);
        } catch (error) {
            console.error('Weather error:', error);
            this.showError(error);
        } finally {
            this.isLoading = false;
        }
    }
    
    async fetchWeather() {
        const { API_KEY, CITY, COUNTRY, UNITS } = WEATHER_CONFIG;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&units=${UNITS}&appid=${API_KEY}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather API failed');
        
        const data = await response.json();
        return this.formatWeatherData(data);
    }
    
    formatWeatherData(data) {
        return {
            temp: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            wind_speed: data.wind.speed,
            city: data.name,
            country: data.sys.country,
            timestamp: Date.now()
        };
    }
    
    displayWeather(data) {
        const icon = this.getWeatherIcon(data.icon);
        const unit = WEATHER_CONFIG.UNITS === 'metric' ? '°C' : '°F';
        
        this.container.innerHTML = `
            <div class="weather-current">
                <div class="weather-icon-large">${icon}</div>
                <div class="weather-temp">
                    <span class="temp-value">${data.temp}</span>
                    <span class="temp-unit">${unit}</span>
                </div>
                <div class="weather-details">
                    <p class="weather-description">${this.capitalize(data.description)}</p>
                    <p class="feels-like">Feels like ${data.feels_like}${unit}</p>
                </div>
            </div>
            
            <div class="weather-stats">
                <div class="weather-stat">
                    <span class="stat-icon">💨</span>
                    <div>
                        <p class="stat-value">${data.wind_speed} m/s</p>
                        <p class="stat-label">Wind</p>
                    </div>
                </div>
                
                <div class="weather-stat">
                    <span class="stat-icon">💧</span>
                    <div>
                        <p class="stat-value">${data.humidity}%</p>
                        <p class="stat-label">Humidity</p>
                    </div>
                </div>
            </div>
            
            <div class="weather-footer">
                <p class="weather-location">📍 ${data.city}, ${data.country}</p>
                <p class="last-updated">Updated just now</p>
            </div>
        `;
    }
    
    getWeatherIcon(code) {
        const icons = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        return icons[code] || '🌡️';
    }
    
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    showLoading() {
        this.container.innerHTML = `
            <div class="weather-loading">
                <div class="weather-spinner"></div>
                <p>Loading weather data...</p>
            </div>
        `;
    }
    
    showError(error) {
        this.container.innerHTML = `
            <div class="weather-error">
                <p>⚠️ Unable to load weather</p>
                <button class="retry-btn" onclick="window.weatherWidget.loadWeather(true)">
                    Try Again
                </button>
            </div>
        `;
    }
    
    shouldUseCache() {
        const cached = this.getCachedData();
        if (!cached) return false;
        return Date.now() - cached.timestamp < WEATHER_CONFIG.UPDATE_INTERVAL;
    }
    
    getCachedData() {
        const cached = localStorage.getItem('weatherData');
        return cached ? JSON.parse(cached) : null;
    }
    
    cacheData(data) {
        localStorage.setItem('weatherData', JSON.stringify(data));
        this.lastUpdate = Date.now();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.weatherWidget = new WeatherWidget();
});