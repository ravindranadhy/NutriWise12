// Live Dashboard with Real MongoDB Data
let currentUser = null;
let userPreferences = null;
let todayLog = null;

// Load dashboard data on page load
async function loadDashboardData() {
    try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();

        if (response.ok && data.success) {
            currentUser = data.user;
            userPreferences = data.preferences;
            todayLog = data.todayLog;

            updateDashboardUI();
        } else {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        window.location.href = '/';
    }
}

// Update UI with real data
function updateDashboardUI() {
    // Update welcome message
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage && currentUser) {
        welcomeMessage.textContent = `Welcome back, ${currentUser.name}! 👋`;
    }

    // Update today's summary with real data
    updateTodaySummary();

    // Update recent logs
    updateRecentLogs();

    // Load recommendations based on user preferences
    updateRecommendations();
}

// Update today's summary with real data
function updateTodaySummary() {
    if (!userPreferences || !todayLog) return;

    const calories = todayLog.totalCalories || 0;
    const protein = todayLog.totalProtein || 0;
    const carbs = todayLog.totalCarbs || 0;
    const water = todayLog.water || 0;

    const targetCalories = userPreferences.targetCalories || 2000;
    const targetProtein = userPreferences.targetProtein || 120;
    const targetCarbs = userPreferences.targetCarbs || 250;
    const targetWater = 8; // glasses

    // Update summary values
    updateSummaryItem('calories', calories, targetCalories, 'kcal');
    updateSummaryItem('protein', protein, targetProtein, 'g');
    updateSummaryItem('carbs', carbs, targetCarbs, 'g');
    updateSummaryItem('water', water, targetWater, 'glasses');
}

function updateSummaryItem(type, current, target, unit) {
    const percentage = (current / target) * 100;
    const summaryItems = document.querySelectorAll('.summary-item');

    summaryItems.forEach(item => {
        const label = item.querySelector('.summary-label');
        if (label && label.textContent.toLowerCase().includes(type)) {
            const valueEl = item.querySelector('.summary-value');
            const progressBar = item.querySelector('.summary-progress-bar');

            if (valueEl) {
                valueEl.textContent = Math.round(current);
            }

            if (label) {
                label.textContent = `of ${target} ${unit}`;
            }

            if (progressBar) {
                progressBar.style.width = Math.min(percentage, 100) + '%';
            }
        }
    });
}

// Update recent logs
function updateRecentLogs() {
    if (!todayLog || !todayLog.meals || todayLog.meals.length === 0) return;

    const logList = document.querySelector('.log-list');
    if (!logList) return;

    logList.innerHTML = '';

    todayLog.meals.forEach(meal => {
        const mealIcons = {
            breakfast: '🌅',
            lunch: '☀️',
            dinner: '🌙',
            snacks: '🍎'
        };

        const logItem = document.createElement('div');
        logItem.className = 'log-item';
        logItem.style.cursor = 'pointer';
        logItem.innerHTML = `
            <div class="log-info">
                <div class="log-icon">${mealIcons[meal.mealType] || '🍽️'}</div>
                <div class="log-details">
                    <h4>${meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)}</h4>
                    <p>${meal.foodItems.map(item => item.name).join(', ')}</p>
                </div>
            </div>
            <div class="log-calories">
                <div class="log-calories-value">${Math.round(meal.totalCalories)}</div>
                <div class="log-calories-label">kcal</div>
            </div>
        `;
        
        logItem.addEventListener('click', () => showMealDetails(meal));
        logList.appendChild(logItem);
    });
}

// Show meal details
function showMealDetails(meal) {
    const details = meal.foodItems.map(item => `
        ${item.name}: ${item.calories}kcal
        Protein: ${item.protein}g | Carbs: ${item.carbs}g | Fats: ${item.fats}g
    `).join('\n\n');

    alert(`${meal.mealType.toUpperCase()} Details\n\n${details}`);
}

// Update recommendations based on user preferences
function updateRecommendations() {
    if (!userPreferences) return;

    const recommendations = getPersonalizedRecommendations();
    const foodGrid = document.querySelector('.food-grid');

    if (foodGrid && recommendations.length > 0) {
        foodGrid.innerHTML = '';
        recommendations.forEach(food => {
            const foodCard = document.createElement('div');
            foodCard.className = 'food-card';
            foodCard.style.cursor = 'pointer';
            foodCard.innerHTML = `
                <div class="food-image">${food.icon}</div>
                <div class="food-name">${food.name}</div>
                <div class="food-calories">${food.calories} kcal</div>
            `;
            foodCard.addEventListener('click', () => quickAddFood(food));
            foodGrid.appendChild(foodCard);
        });
    }
}

// Get personalized food recommendations
function getPersonalizedRecommendations() {
    if (!userPreferences) return [];

    const dietType = userPreferences.dietType || 'no_preference';
    const goal = userPreferences.primaryGoal;

    let recommendations = [];

    if (dietType === 'vegetarian' || dietType === 'vegan') {
        recommendations = [
            { icon: '🥗', name: 'Paneer Tikka Salad', calories: 320, protein: 18, carbs: 25, fats: 15 },
            { icon: '🍲', name: 'Moong Dal Khichdi', calories: 280, protein: 12, carbs: 45, fats: 8 },
            { icon: '🥤', name: 'Protein Smoothie', calories: 220, protein: 20, carbs: 30, fats: 5 }
        ];
    } else {
        recommendations = [
            { icon: '🍗', name: 'Grilled Chicken Salad', calories: 350, protein: 35, carbs: 20, fats: 12 },
            { icon: '🍳', name: 'Egg White Omelette', calories: 180, protein: 24, carbs: 5, fats: 7 },
            { icon: '🥩', name: 'Lean Beef Stir Fry', calories: 420, protein: 40, carbs: 30, fats: 15 }
        ];
    }

    return recommendations.slice(0, 3);
}

// Quick add food
async function quickAddFood(food) {
    const mealType = prompt('Which meal? (breakfast/lunch/dinner/snacks)');
    if (!mealType) return;

    try {
        const response = await fetch('/api/log/food', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mealType: mealType.toLowerCase(),
                foodItems: [food]
            })
        });

        const data = await response.json();

        if (response.ok) {
            showToast(`${food.name} added to ${mealType}!`);
            await loadDashboardData(); // Reload data
        } else {
            showToast('Failed to add food', 'error');
        }
    } catch (error) {
        console.error('Error adding food:', error);
        showToast('Network error', 'error');
    }
}

// Log water intake
async function logWater() {
    if (!todayLog) return;

    const currentWater = todayLog.water || 0;
    const newWater = currentWater + 1;

    try {
        const response = await fetch('/api/log/water', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ glasses: newWater })
        });

        if (response.ok) {
            showToast(`💧 Water logged! (${newWater}/8 glasses)`);
            await loadDashboardData();
        }
    } catch (error) {
        console.error('Error logging water:', error);
    }
}

// Log weight
async function logWeight() {
    const weight = prompt('Enter your current weight (kg):');
    if (!weight || isNaN(weight)) return;

    try {
        const response = await fetch('/api/log/weight', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ weight: parseFloat(weight) })
        });

        if (response.ok) {
            showToast(`⚖️ Weight logged: ${weight} kg`);
            await loadDashboardData();
        }
    } catch (error) {
        console.error('Error logging weight:', error);
    }
}

// Custom food logging
async function logCustomFood() {
    const mealType = prompt('Which meal? (breakfast/lunch/dinner/snacks)');
    if (!mealType) return;

    const name = prompt('Food name:');
    if (!name) return;

    const calories = prompt('Calories:');
    if (!calories || isNaN(calories)) return;

    const protein = prompt('Protein (g):') || 0;
    const carbs = prompt('Carbs (g):') || 0;
    const fats = prompt('Fats (g):') || 0;

    const foodItem = {
        name,
        calories: parseInt(calories),
        protein: parseInt(protein),
        carbs: parseInt(carbs),
        fats: parseInt(fats),
        quantity: '1 serving'
    };

    try {
        const response = await fetch('/api/log/food', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mealType: mealType.toLowerCase(),
                foodItems: [foodItem]
            })
        });

        if (response.ok) {
            showToast(`${name} added to ${mealType}!`);
            await loadDashboardData();
        }
    } catch (error) {
        console.error('Error logging food:', error);
    }
}

// Toast notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#16a34a' : '#ef4444'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10001;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize on page load
window.addEventListener('load', loadDashboardData);

// Auto-refresh every 30 seconds
setInterval(loadDashboardData, 30000);

// Export functions for global use
window.logWater = logWater;
window.logWeight = logWeight;
window.logCustomFood = logCustomFood;
window.quickAddFood = quickAddFood;
