
    // JavaScript Code

    // Navigation Toggle
    const menuButton = document.getElementById('menu-button');
    const mainNav = document.getElementById('main-nav');

    menuButton.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        const isOpen = mainNav.classList.contains('open');
        menuButton.setAttribute('aria-expanded', isOpen);
        menuButton.textContent = isOpen ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !menuButton.contains(e.target)) {
            mainNav.classList.remove('open');
            menuButton.textContent = '☰';
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });

    // Weather Simulation
    function getKampalaWeather() {
        const weatherConditions = [
            { temp: 24, high: 28, low: 19, humidity: 65, desc: 'Partly Cloudy' },
            { temp: 26, high: 30, low: 21, humidity: 70, desc: 'Sunny' },
            { temp: 23, high: 27, low: 20, humidity: 75, desc: 'Light Rain' },
            { temp: 25, high: 29, low: 20, humidity: 68, desc: 'Mostly Sunny' }
        ];
        
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        const weatherIndex = dayOfYear % weatherConditions.length;
        
        return weatherConditions[weatherIndex];
    }

    function displayWeather() {
        const weather = getKampalaWeather();
        
        document.getElementById('current-temp').textContent = weather.temp;
        document.getElementById('weather-desc').textContent = weather.desc;
        document.getElementById('high-temp').textContent = weather.high;
        document.getElementById('low-temp').textContent = weather.low;
        document.getElementById('humidity').textContent = weather.humidity;
    }

    // Member Spotlights
    const members = [
        {
            name: "Nakumatt Supermarket",
            description: "Leading retail chain providing quality products to Ugandans for over 20 years",
            level: "Gold Member"
        },
        {
            name: "Uganda Crafts 2000 Ltd",
            description: "Promoting local artisans and supporting sustainable craft production",
            level: "Silver Member"
        },
        {
            name: "Kampala Tech Hub",
            description: "Fostering innovation and supporting tech startups across East Africa",
            level: "Gold Member"
        }
    ];

    function displaySpotlights() {
        const container = document.getElementById('spotlight-container');
        
        members.forEach(member => {
            const spotlightItem = document.createElement('div');
            spotlightItem.className = 'spotlight-item';
            spotlightItem.innerHTML = `
                <h4>${member.name}</h4>
                <p>${member.description}</p>
                <p class="membership-level">${member.level}</p>
            `;
            container.appendChild(spotlightItem);
        });
    }

    // Footer Dynamic Content
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

    // Initialize on page load
    window.addEventListener('DOMContentLoaded', () => {
        displayWeather();
        displaySpotlights();
    });
