// DOM Elements
const landingPage = document.getElementById('landingPage');
const dashboard = document.getElementById('dashboard');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const sidebar = document.querySelector('.sidebar');

// Theme Management
const theme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', theme);

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle icon
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

// Sidebar Toggle
function toggleSidebar() {
    sidebar.classList.toggle('active');
    const menuIcon = document.querySelector('.menu-toggle i');
    menuIcon.className = sidebar.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
}

// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        showDashboard();
    }
});

// Show/Hide Modals
function showLoginModal() {
    loginModal.style.display = 'block';
}

function closeLoginModal() {
    loginModal.style.display = 'none';
}

function showSignupModal() {
    // Toggle between login and signup form
    const modalTitle = loginModal.querySelector('h2');
    modalTitle.textContent = modalTitle.textContent.includes('Login') ? 
        'Sign Up to SmartFarm' : 'Login to SmartFarm';
}

// Handle Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    // Simulate login (in real app, this would be an API call)
    if (email && password) {
        const userData = {
            email: email,
            name: email.split('@')[0],
            loginTime: new Date().toISOString(),
            lastActive: new Date().toISOString()
        };
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
        showDashboard();
        updateUserInfo(userData);
    }
});

function updateUserInfo(userData) {
    const userName = document.getElementById('userName');
    if (userName) {
        userName.textContent = userData.name;
    }
    
    // Update last active timestamp
    userData.lastActive = new Date().toISOString();
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Handle Google Login
document.querySelector('.google-login').addEventListener('click', () => {
    // Simulate Google login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', 'user@gmail.com');
    showDashboard();
});

// Handle Phone Login
document.querySelector('.phone-login').addEventListener('click', () => {
    // Simulate Phone login
    const phoneNumber = prompt('Enter your phone number:');
    if (phoneNumber) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userPhone', phoneNumber);
        showDashboard();
    }
});

// Show Dashboard
function showDashboard() {
    landingPage.style.display = 'none';
    dashboard.style.display = 'block';
    closeLoginModal();
    updateDashboard();
}

// Handle Logout
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    landingPage.style.display = 'block';
    dashboard.style.display = 'none';
}

// Update Dashboard Data
function updateDashboard() {
    // Update user name
    const userEmail = localStorage.getItem('userEmail');
    const userPhone = localStorage.getItem('userPhone');
    document.getElementById('userName').textContent = userEmail || userPhone || 'User';

    // Simulate real-time data updates
    setInterval(updateSensorData, 5000);
    updateWeatherForecast();
}

// Update Sensor Data
function updateSensorData() {
    const temperature = Math.floor(Math.random() * (30 - 20) + 20);
    const humidity = Math.floor(Math.random() * (80 - 60) + 60);
    const soilMoisture = Math.floor(Math.random() * (60 - 40) + 40);

    document.querySelector('.stat-card:nth-child(1) p').textContent = `${temperature}°C`;
    document.querySelector('.stat-card:nth-child(2) p').textContent = `${humidity}%`;
    document.querySelector('.stat-card:nth-child(3) p').textContent = `${soilMoisture}%`;
}

// Update Weather Forecast
function updateWeatherForecast() {
    const weatherContainer = document.querySelector('.weather-forecast');
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    
    const forecastHTML = daysOfWeek.map(day => {
        const temp = Math.floor(Math.random() * (30 - 20) + 20);
        return `
            <div class="weather-day">
                <span>${day}</span>
                <i class="fas fa-sun"></i>
                <span>${temp}°C</span>
            </div>
        `;
    }).join('');

    weatherContainer.innerHTML = forecastHTML;
}

// Handle Mobile Menu
document.querySelector('.menu-toggle').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeLoginModal();
    }
});

// Handle Sidebar Navigation
document.querySelectorAll('.sidebar li').forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        document.querySelectorAll('.sidebar li').forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        
        // Hide all sections and show the selected one
        const sectionId = item.dataset.section;
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    });
});

// Language Support
const languageSelect = document.getElementById('languageSelect');
languageSelect.addEventListener('change', (e) => {
    const language = e.target.value;
    // In a real app, this would load translations
    console.log(`Language changed to: ${language}`);
});

// Calculator Functions
function calculateResources() {
    const area = document.getElementById('fieldArea').value;
    const cropType = document.getElementById('cropType').value;
    const results = document.getElementById('calculationResults');
    
    // Dummy calculations
    const waterNeeded = area * 1000; // liters
    const fertilizer = area * 50; // kg
    
    results.innerHTML = `
        <h4>Recommended Resources:</h4>
        <p>Water Needed: ${waterNeeded} liters</p>
        <p>Fertilizer Needed: ${fertilizer} kg</p>
    `;
}

// Chat Bot Functions
function sendMessage() {
    const input = document.getElementById('userMessage');
    const message = input.value.trim();
    if (!message) return;

    // Add user message
    addChatMessage('user', message);
    input.value = '';

    // Simulate AI response
    setTimeout(() => {
        const responses = [
            "I recommend checking the soil moisture level.",
            "Based on the weather forecast, you should water your crops tomorrow.",
            "Your crops appear to be growing healthy!",
            "Consider applying fertilizer in the next few days."
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage('bot', response);
    }, 1000);
}

function addChatMessage(type, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// E-Commerce Functions
const products = [
    { id: 1, name: 'Organic Fertilizer', price: 29.99 },
    { id: 2, name: 'Garden Tools Set', price: 49.99 },
    { id: 3, name: 'Premium Seeds Pack', price: 19.99 }
];

function initializeShop() {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="https://via.placeholder.com/150" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Analytics Charts
function initializeCharts() {
    // Soil Analytics Chart
    const soilCtx = document.getElementById('soilAnalyticsChart')?.getContext('2d');
    if (soilCtx) {
        new Chart(soilCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Soil Health Index',
                    data: [65, 70, 68, 74, 72, 75],
                    borderColor: '#2ecc71'
                }]
            }
        });
    }

    // Water Analytics Chart
    const waterCtx = document.getElementById('waterAnalyticsChart')?.getContext('2d');
    if (waterCtx) {
        new Chart(waterCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Water Usage (Liters)',
                    data: [1200, 1100, 1300, 1150, 1250, 1180],
                    backgroundColor: '#3498db'
                }]
            }
        });
    }
}

// Real-time Monitoring
function updateMonitoringData() {
    const sensorReadings = document.querySelector('.sensor-readings');
    const irrigationStatus = document.querySelector('.irrigation-status');
    const weatherReadings = document.querySelector('.weather-readings');

    if (sensorReadings) {
        sensorReadings.innerHTML = `
            <p>Soil Moisture: ${Math.floor(Math.random() * 30 + 40)}%</p>
            <p>Soil pH: ${(Math.random() * 2 + 5).toFixed(1)}</p>
            <p>Soil Temperature: ${Math.floor(Math.random() * 10 + 20)}°C</p>
        `;
    }

    if (irrigationStatus) {
        const status = Math.random() > 0.5 ? 'Active' : 'Inactive';
        irrigationStatus.innerHTML = `
            <p>System Status: ${status}</p>
            <p>Water Flow: ${Math.floor(Math.random() * 50 + 100)} L/hr</p>
            <p>Last Active: ${new Date().toLocaleTimeString()}</p>
        `;
    }

    if (weatherReadings) {
        weatherReadings.innerHTML = `
            <p>Temperature: ${Math.floor(Math.random() * 10 + 20)}°C</p>
            <p>Humidity: ${Math.floor(Math.random() * 30 + 40)}%</p>
            <p>Wind Speed: ${Math.floor(Math.random() * 20 + 5)} km/h</p>
        `;
    }
}

// Crop Data Management
const crops = [
    {
        id: 1,
        name: 'Wheat',
        localNames: {
            hi: 'गेहूं',
            mr: 'गहू',
            bn: 'গম',
            te: 'గోధుమ',
            ta: 'கோதுமை',
            kn: 'ಗೋಧಿ',
            gu: 'ઘઉં',
            pa: 'ਕਣਕ',
            ml: 'ഗോതമ്പ്',
            or: 'ଗହମ'
        },
        season: 'rabi',
        soil: 'Well-drained loamy soil',
        water: '450-650mm per season',
        temperature: '20-25°C',
        growingPeriod: 'November - April',
        states: ['punjab', 'haryana', 'uttar-pradesh', 'madhya-pradesh']
    },
    // Add more crops with their details
];

// Initialize Crop Section
function initializeCropSection() {
    const searchInput = document.querySelector('.search-box input');
    const seasonFilter = document.getElementById('seasonFilter');
    const stateFilter = document.getElementById('stateFilter');

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterCrops(searchTerm, seasonFilter.value, stateFilter.value);
    });

    // Filter functionality
    seasonFilter.addEventListener('change', () => {
        filterCrops(searchInput.value.toLowerCase(), seasonFilter.value, stateFilter.value);
    });

    stateFilter.addEventListener('change', () => {
        filterCrops(searchInput.value.toLowerCase(), seasonFilter.value, stateFilter.value);
    });

    // Initial load
    displayCrops(crops);
}

function filterCrops(searchTerm, season, state) {
    let filteredCrops = crops;

    if (searchTerm) {
        filteredCrops = filteredCrops.filter(crop => 
            crop.name.toLowerCase().includes(searchTerm) ||
            Object.values(crop.localNames).some(name => 
                name.toLowerCase().includes(searchTerm)
            )
        );
    }

    if (season) {
        filteredCrops = filteredCrops.filter(crop => crop.season === season);
    }

    if (state) {
        filteredCrops = filteredCrops.filter(crop => crop.states.includes(state));
    }

    displayCrops(filteredCrops);
}

function displayCrops(cropsToDisplay) {
    const cropGrid = document.querySelector('.crop-grid');
    const currentLanguage = document.getElementById('languageSelect').value;

    cropGrid.innerHTML = cropsToDisplay.map(crop => `
        <div class="crop-card">
            <div class="crop-image">
                <img src="https://source.unsplash.com/400x300/?${crop.name.toLowerCase()}-farm" alt="${crop.name}">
                <span class="season-tag">${crop.season.charAt(0).toUpperCase() + crop.season.slice(1)}</span>
            </div>
            <div class="crop-content">
                <h3>${crop.name} (${crop.localNames[currentLanguage] || crop.localNames.en})</h3>
                <div class="crop-details">
                    <div class="detail-item">
                        <i class="fas fa-seedling"></i>
                        <div>
                            <h4>Soil Requirements</h4>
                            <p>${crop.soil}</p>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-cloud-rain"></i>
                        <div>
                            <h4>Water Needs</h4>
                            <p>${crop.water}</p>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-calendar-alt"></i>
                        <div>
                            <h4>Growing Period</h4>
                            <p>${crop.growingPeriod}</p>
                        </div>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-temperature-high"></i>
                        <div>
                            <h4>Temperature</h4>
                            <p>${crop.temperature}</p>
                        </div>
                    </div>
                </div>
                <div class="crop-actions">
                    <button class="view-details-btn" onclick="viewCropDetails(${crop.id})">
                        <i class="fas fa-info-circle"></i> View Details
                    </button>
                    <button class="add-to-farm-btn" onclick="addToMyFarm(${crop.id})">
                        <i class="fas fa-plus"></i> Add to My Farm
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize shop products
    initializeShop();
    
    // Initialize charts if Chart.js is loaded
    if (typeof Chart !== 'undefined') {
        initializeCharts();
    }
    
    // Initialize crop section
    initializeCropSection();
    
    // Start real-time monitoring updates
    setInterval(updateMonitoringData, 5000);
    
    // Initialize language selector
    document.getElementById('languageSelect').addEventListener('change', () => {
        // Refresh crop display with new language
        displayCrops(crops);
        // Update UI text based on selected language
        updateUILanguage();
    });
});
