// Footer Content
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Weather API Integration
async function getWeather() {
    const API_KEY = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}';
    const CITY = 'Moscow';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

function displayWeather(data) {
    const container = document.getElementById('weather-data');
    const current = data.list[0];

    // Current Weather
    const currentHTML = `
        <p>Now: ${Math.round(current.main.temp)}°C</p>
        <p>${current.weather.map(w =>
        w.description.split(' ').map(word =>
            word[0].toUpperCase() + word.slice(1)).join(' ')
        }</p>
    `;

    // 3-Day Forecast
    const forecastHTML = data.list
        .filter((_, index) => index % 8 === 0)
        .slice(0, 3)
        .map(day => `
            <div class="forecast-day">
                <p>${new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p>${Math.round(day.main.temp)}°C</p>
            </div>
        `).join('');

    container.innerHTML = currentHTML + forecastHTML;
}

// Member Spotlights
async function loadSpotlights() {
    const response = await fetch('scripts/members.json');
    const members = await response.json();

    const qualified = members.filter(m =>
        ['gold', 'silver'].includes(m.membershipLevel.toLowerCase())
    );

    const shuffled = qualified.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const container = document.getElementById('spotlight-container');
    container.innerHTML = selected.map(member => `
        <div class="spotlight-card">
            <img src="images/logos/${member.logo}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}">Visit Website</a>
            <p class="membership-level">${member.membershipLevel}</p>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    getWeather();
    loadSpotlights();
});