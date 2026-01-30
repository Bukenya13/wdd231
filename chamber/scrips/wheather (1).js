// Weather functionality
document.addEventListener('DOMContentLoaded', function() {
    const currentWeather = document.getElementById('current-weather');
    const weatherForecast = document.getElementById('weather-forecast');

    // Static weather data for Mukono, Uganda
    const weatherData = {
        current: {
            temperature: 24,
            condition: "Partly Cloudy",
            humidity: 65,
            wind: 3.2
        },
        forecast: [
            { day: "Today", high: 26, low: 18, condition: "Partly Cloudy" },
            { day: "Tomorrow", high: 27, low: 19, condition: "Sunny" },
            { day: "Saturday", high: 25, low: 19, condition: "Light Rain" }
        ]
    };

    // Display current weather
    if (currentWeather) {
        currentWeather.innerHTML = `
            <div class="weather-info">
                <p><strong>Temperature:</strong> ${weatherData.current.temperature}°C</p>
                <p><strong>Condition:</strong> ${weatherData.current.condition}</p>
                <p><strong>Humidity:</strong> ${weatherData.current.humidity}%</p>
                <p><strong>Wind:</strong> ${weatherData.current.wind} m/s</p>
            </div>
        `;
    }

    // Display forecast
    if (weatherForecast) {
        let forecastHTML = '';
        weatherData.forecast.forEach(day => {
            forecastHTML += `
                <div class="weather-day">
                    <span>${day.day}</span>
                    <span>${day.condition}</span>
                    <span>${day.high}°/${day.low}°</span>
                </div>
            `;
        });
        weatherForecast.innerHTML = forecastHTML;
    }
});