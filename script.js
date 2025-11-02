// Weather Icons SVG Templates
const weatherIcons = {
    rain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 13v8m-8-8v8m4-10v10M12 3a5 5 0 0 1 5 5v1a3 3 0 0 1 0 6H7a3 3 0 0 1 0-6v-1a5 5 0 0 1 5-5z"/>
    </svg>`,
    
    cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>`,
    
    sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>`,
    
    drizzle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 19v2m8-2v2m-4-2v2M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>`,
    
    default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
    </svg>`
};

// Global variable to store weather data
let weatherData = null;

/**
 * Fetch weather data from the API
 */
async function fetchWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const days = document.getElementById('daysInput').value;
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    if (!days || days < 1 || days > 7) {
        alert('Please enter a valid number of days (1-7)');
        return;
    }
    
    // Show loading state
    showLoading();
    
    try {
        const response = await fetch(`http://localhost:8080/weather/forecast?city=${city}&days=${days}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        weatherData = await response.json();
        displayWeather();
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError(error.message);
    }
}

/**
 * Display loading state
 */
function showLoading() {
    document.getElementById('initialState').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    document.getElementById('error').style.display = 'none';
    document.getElementById('weatherContent').style.display = 'none';
}

/**
 * Display error state
 */
function showError(message) {
    document.getElementById('initialState').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'block';
    document.getElementById('weatherContent').style.display = 'none';
    document.getElementById('errorMessage').textContent = message;
}

/**
 * Display weather data on the page
 */
function displayWeather() {
    // Hide all other states, show content
    document.getElementById('initialState').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    document.getElementById('weatherContent').style.display = 'block';
    
    const { weatherResponse, dayTemp } = weatherData;
    
    // Update current date and time
    updateDateTime();
    
    // Update current weather section
    document.getElementById('cityName').textContent = weatherResponse.city;
    document.getElementById('location').textContent = `${weatherResponse.region}, ${weatherResponse.country}`;
    document.getElementById('condition').textContent = weatherResponse.condition;
    document.getElementById('weatherIcon').innerHTML = getWeatherIcon(weatherResponse.condition);
    document.getElementById('temperature').textContent = `${Math.round(weatherResponse.temperature)}°`;
    
    // Update weather details (these are placeholder values since API doesn't provide them)
    // You can modify these based on your actual API response
    document.getElementById('feelsLike').textContent = `${Math.round(weatherResponse.temperature + 2)}°`;
    document.getElementById('wind').textContent = '12 km/h';
    document.getElementById('humidity').textContent = '65%';
    
    // Create forecast cards
    const forecastContainer = document.getElementById('forecastCards');
    forecastContainer.innerHTML = '';
    
    dayTemp.forEach((day, index) => {
        const card = createForecastCard(day, index, weatherResponse.condition);
        forecastContainer.appendChild(card);
    });
    
    // Update last update timestamp
    document.getElementById('lastUpdate').textContent = new Date().toLocaleString();
}

/**
 * Update current date and time display
 */
function updateDateTime() {
    const now = new Date();
    
    // Format date: "Sunday, November 02, 2025"
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateStr = now.toLocaleDateString('en-US', dateOptions);
    
    // Format time: "02:30 PM"
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    };
    const timeStr = now.toLocaleTimeString('en-US', timeOptions);
    
    document.getElementById('currentDate').textContent = dateStr;
    document.getElementById('currentTime').textContent = timeStr;
}

// Update time every second
setInterval(() => {
    if (document.getElementById('weatherContent').style.display === 'block') {
        updateDateTime();
    }
}, 1000);

/**
 * Create a forecast card element
 */
function createForecastCard(day, index, condition) {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    
    const dayName = getDayName(day.date);
    const dateStr = formatDate(day.date);
    const fullDateStr = formatFullDate(day.date);
    const tempRange = calculateTempRange(day.minTemp, day.maxTemp);
    
    card.innerHTML = `
        <div class="day-name">${dayName}</div>
        <div class="date">${dateStr}</div>
        <div class="full-date">${fullDateStr}</div>
        <div class="weather-icon">${getWeatherIcon(condition)}</div>
        <div class="temp-details">
            <div class="temp-row">
                <span class="temp-label">High</span>
                <span class="temp-value">${Math.round(day.maxTemp)}°</span>
            </div>
            <div class="temp-row">
                <span class="temp-label">Avg</span>
                <span class="temp-value avg">${Math.round(day.avgTemp)}°</span>
            </div>
            <div class="temp-row">
                <span class="temp-label">Low</span>
                <span class="temp-value avg">${Math.round(day.minTemp)}°</span>
            </div>
            <div class="temp-bar">
                <div class="temp-bar-fill" style="width: ${tempRange}%"></div>
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Get weather icon based on condition
 */
function getWeatherIcon(condition) {
    const cond = condition.toLowerCase();
    
    // Determine icon type
    let icon = weatherIcons.default;
    if (cond.includes('rain')) {
        icon = weatherIcons.rain;
    } else if (cond.includes('cloud')) {
        icon = weatherIcons.cloud;
    } else if (cond.includes('sun') || cond.includes('clear')) {
        icon = weatherIcons.sun;
    } else if (cond.includes('drizzle')) {
        icon = weatherIcons.drizzle;
    }
    
    // Determine color
    const iconColor = cond.includes('rain') ? '#3498db' : 
                     cond.includes('cloud') ? '#95a5a6' :
                     cond.includes('sun') || cond.includes('clear') ? '#f39c12' :
                     cond.includes('drizzle') ? '#5dade2' : '#bdc3c7';
    
    return `<div style="color: ${iconColor}">${icon}</div>`;
}

/**
 * Format date to readable string
 */
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
}

/**
 * Format full date with day name
 */
function formatFullDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
    });
}

/**
 * Get day name (Today, Tomorrow, or weekday)
 */
function getDayName(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { weekday: 'short' });
}

/**
 * Calculate temperature range percentage
 */
function calculateTempRange(minTemp, maxTemp) {
    if (maxTemp === 0) return 0;
    return ((maxTemp - minTemp) / maxTemp * 100).toFixed(0);
}

/**
 * Handle Enter key press in input fields
 */
document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('cityInput');
    const daysInput = document.getElementById('daysInput');
    
    // Add Enter key listener to both inputs
    [cityInput, daysInput].forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                fetchWeather();
            }
        });
    });
    
    // Focus on city input when page loads
    cityInput.focus();
});

// Export functions for potential reuse
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchWeather,
        getWeatherIcon,
        formatDate,
        getDayName
    };
}