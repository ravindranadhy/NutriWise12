// Progress Analytics Module
// Includes weekly calorie tracking, weight goal timeline, and health insights

// Initialize Progress Analytics
function initProgressAnalytics() {
    console.log('📈 Initializing Progress Analytics...');
    loadWeeklyCalorieData();
    calculateWeightGoalTimeline();
    generateHealthInsights();
}

// Load and display weekly calorie data
async function loadWeeklyCalorieData() {
    try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        
        if (data.success) {
            // Generate weekly data (last 7 days)
            const weeklyData = generateWeeklyData(data);
            renderCalorieChart(weeklyData);
            updateWeeklySummary(weeklyData);
        }
    } catch (error) {
        console.error('Error loading weekly data:', error);
    }
}

// Generate weekly calorie data
function generateWeeklyData(userData) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date().getDay();
    
    // Simulate weekly data (in production, fetch from database)
    const weeklyData = days.map((day, index) => {
        const caloriesConsumed = Math.floor(Math.random() * 500) + 1800; // 1800-2300
        const caloriesBurned = Math.floor(Math.random() * 400) + 400; // 400-800
        const netCalories = caloriesConsumed - caloriesBurned;
        
        return {
            day,
            consumed: caloriesConsumed,
            burned: caloriesBurned,
            net: netCalories,
            goal: userData.preferences?.dailyCalorieGoal || 2000
        };
    });
    
    return weeklyData;
}

// Render calorie chart using Canvas
function renderCalorieChart(weeklyData) {
    const canvas = document.getElementById('calorieChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth * 2; // Retina display
    const height = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    
    const padding = 40;
    const chartWidth = width / 2 - padding * 2;
    const chartHeight = height / 2 - padding * 2;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Find max value for scaling
    const maxValue = Math.max(...weeklyData.map(d => Math.max(d.consumed, d.burned)));
    const scale = chartHeight / maxValue;
    
    // Draw grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(padding + chartWidth, y);
        ctx.stroke();
        
        // Y-axis labels
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        const value = Math.round(maxValue - (maxValue / 5) * i);
        ctx.fillText(value, padding - 10, y + 4);
    }
    
    // Draw bars
    const barWidth = chartWidth / weeklyData.length / 3;
    const groupWidth = chartWidth / weeklyData.length;
    
    weeklyData.forEach((data, index) => {
        const x = padding + index * groupWidth;
        
        // Consumed calories (green)
        const consumedHeight = data.consumed * scale;
        ctx.fillStyle = '#16a34a';
        ctx.fillRect(x, padding + chartHeight - consumedHeight, barWidth, consumedHeight);
        
        // Burned calories (orange)
        const burnedHeight = data.burned * scale;
        ctx.fillStyle = '#f97316';
        ctx.fillRect(x + barWidth + 5, padding + chartHeight - burnedHeight, barWidth, burnedHeight);
        
        // Day labels
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(data.day, x + groupWidth / 2, height / 2 - 10);
    });
    
    // Draw legend
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(padding, 10, 15, 15);
    ctx.fillStyle = '#1e293b';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Consumed', padding + 20, 22);
    
    ctx.fillStyle = '#f97316';
    ctx.fillRect(padding + 120, 10, 15, 15);
    ctx.fillText('Burned', padding + 140, 22);
}

// Update weekly summary statistics
function updateWeeklySummary(weeklyData) {
    const totalConsumed = weeklyData.reduce((sum, day) => sum + day.consumed, 0);
    const totalBurned = weeklyData.reduce((sum, day) => sum + day.burned, 0);
    const avgConsumed = Math.round(totalConsumed / weeklyData.length);
    const avgBurned = Math.round(totalBurned / weeklyData.length);
    const netCalories = totalConsumed - totalBurned;
    
    document.getElementById('weeklyConsumed').textContent = totalConsumed.toLocaleString();
    document.getElementById('weeklyBurned').textContent = totalBurned.toLocaleString();
    document.getElementById('avgConsumed').textContent = avgConsumed.toLocaleString();
    document.getElementById('avgBurned').textContent = avgBurned.toLocaleString();
    document.getElementById('netCalories').textContent = netCalories.toLocaleString();
    
    // Update net calories color
    const netElement = document.getElementById('netCalories');
    if (netCalories > 0) {
        netElement.style.color = '#16a34a'; // Surplus - green
    } else {
        netElement.style.color = '#dc2626'; // Deficit - red
    }
}

// Calculate weight goal timeline
async function calculateWeightGoalTimeline() {
    try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        
        if (data.success && data.preferences) {
            const currentWeight = data.preferences.weight || 70;
            const goalWeight = data.preferences.goalWeight || 65;
            const weightDiff = Math.abs(currentWeight - goalWeight);
            const goal = data.preferences.goal || 'maintain';
            
            // Calculate timeline based on safe weight loss/gain rate
            // Safe rate: 0.5-1 kg per week
            const weeksNeeded = Math.ceil(weightDiff / 0.75); // 0.75 kg per week average
            const monthsNeeded = Math.ceil(weeksNeeded / 4);
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + (weeksNeeded * 7));
            
            // Update UI
            document.getElementById('currentWeight').textContent = currentWeight;
            document.getElementById('goalWeight').textContent = goalWeight;
            document.getElementById('weightDifference').textContent = weightDiff.toFixed(1);
            document.getElementById('weeksToGoal').textContent = weeksNeeded;
            document.getElementById('monthsToGoal').textContent = monthsNeeded;
            document.getElementById('targetDate').textContent = targetDate.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
            });
            
            // Update progress bar
            const progressPercent = Math.min(100, ((currentWeight - goalWeight) / weightDiff) * 100);
            document.getElementById('weightProgress').style.width = `${Math.abs(progressPercent)}%`;
            
            // Update goal type
            const goalTypeElement = document.getElementById('goalType');
            if (goal === 'lose') {
                goalTypeElement.textContent = '🎯 Weight Loss Journey';
                goalTypeElement.style.color = '#dc2626';
            } else if (goal === 'gain') {
                goalTypeElement.textContent = '💪 Weight Gain Journey';
                goalTypeElement.style.color = '#16a34a';
            } else {
                goalTypeElement.textContent = '⚖️ Weight Maintenance';
                goalTypeElement.style.color = '#2563eb';
            }
        }
    } catch (error) {
        console.error('Error calculating timeline:', error);
    }
}

// Generate personalized health insights
async function generateHealthInsights() {
    try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        
        if (data.success && data.preferences) {
            const insights = [];
            const prefs = data.preferences;
            
            // Calculate BMI
            const heightInMeters = prefs.height / 100;
            const bmi = prefs.weight / (heightInMeters * heightInMeters);
            
            // Calculate age from date of birth
            const birthDate = new Date(prefs.dateOfBirth);
            const age = Math.floor((new Date() - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
            
            // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
            let bmr;
            if (prefs.gender === 'male') {
                bmr = 10 * prefs.weight + 6.25 * prefs.height - 5 * age + 5;
            } else {
                bmr = 10 * prefs.weight + 6.25 * prefs.height - 5 * age - 161;
            }
            
            // Calculate TDEE (Total Daily Energy Expenditure)
            const activityMultipliers = {
                'sedentary': 1.2,
                'light': 1.375,
                'moderate': 1.55,
                'active': 1.725,
                'very_active': 1.9
            };
            const tdee = Math.round(bmr * (activityMultipliers[prefs.activityLevel] || 1.2));
            
            // Generate insights
            insights.push({
                icon: '📊',
                title: 'Body Mass Index (BMI)',
                value: bmi.toFixed(1),
                description: getBMICategory(bmi),
                color: getBMIColor(bmi)
            });
            
            insights.push({
                icon: '🔥',
                title: 'Daily Calorie Burn (TDEE)',
                value: `${tdee} kcal`,
                description: `Your body burns approximately ${tdee} calories per day based on your activity level`,
                color: '#f97316'
            });
            
            insights.push({
                icon: '💪',
                title: 'Recommended Protein',
                value: `${Math.round(prefs.weight * 1.6)}g`,
                description: 'Daily protein intake for optimal muscle maintenance and growth',
                color: '#8b5cf6'
            });
            
            insights.push({
                icon: '💧',
                title: 'Daily Water Goal',
                value: `${Math.round(prefs.weight * 0.033)} L`,
                description: 'Recommended daily water intake based on your body weight',
                color: '#3b82f6'
            });
            
            insights.push({
                icon: '🏃',
                title: 'Weekly Exercise Target',
                value: '150 min',
                description: 'Moderate-intensity aerobic activity recommended by WHO',
                color: '#10b981'
            });
            
            insights.push({
                icon: '😴',
                title: 'Sleep Recommendation',
                value: age < 65 ? '7-9 hrs' : '7-8 hrs',
                description: 'Optimal sleep duration for recovery and health',
                color: '#6366f1'
            });
            
            // Render insights
            renderHealthInsights(insights);
            
            // Update health score
            calculateHealthScore(data, bmi, tdee);
        }
    } catch (error) {
        console.error('Error generating insights:', error);
    }
}

// Get BMI category
function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight - Consider gaining weight';
    if (bmi < 25) return 'Normal weight - Maintain your current lifestyle';
    if (bmi < 30) return 'Overweight - Consider weight loss';
    return 'Obese - Consult a healthcare professional';
}

// Get BMI color
function getBMIColor(bmi) {
    if (bmi < 18.5) return '#f59e0b';
    if (bmi < 25) return '#16a34a';
    if (bmi < 30) return '#f97316';
    return '#dc2626';
}

// Render health insights
function renderHealthInsights(insights) {
    const container = document.getElementById('healthInsightsContainer');
    if (!container) return;
    
    container.innerHTML = insights.map(insight => `
        <div class="insight-card">
            <div class="insight-icon" style="background-color: ${insight.color}20; color: ${insight.color}">
                ${insight.icon}
            </div>
            <div class="insight-content">
                <div class="insight-title">${insight.title}</div>
                <div class="insight-value" style="color: ${insight.color}">${insight.value}</div>
                <div class="insight-description">${insight.description}</div>
            </div>
        </div>
    `).join('');
}

// Calculate overall health score
function calculateHealthScore(data, bmi, tdee) {
    let score = 0;
    const factors = [];
    
    // BMI score (0-25 points)
    if (bmi >= 18.5 && bmi < 25) {
        score += 25;
        factors.push({ name: 'BMI', score: 25, max: 25, status: 'excellent' });
    } else if (bmi >= 25 && bmi < 30) {
        score += 15;
        factors.push({ name: 'BMI', score: 15, max: 25, status: 'good' });
    } else {
        score += 5;
        factors.push({ name: 'BMI', score: 5, max: 25, status: 'needs improvement' });
    }
    
    // Activity level score (0-25 points)
    const activityScores = {
        'sedentary': 5,
        'light': 10,
        'moderate': 20,
        'active': 25,
        'very_active': 25
    };
    const activityScore = activityScores[data.preferences?.activityLevel] || 5;
    score += activityScore;
    factors.push({ name: 'Activity Level', score: activityScore, max: 25, status: activityScore >= 20 ? 'excellent' : 'good' });
    
    // Nutrition balance (0-25 points) - simulated
    const nutritionScore = 20;
    score += nutritionScore;
    factors.push({ name: 'Nutrition Balance', score: nutritionScore, max: 25, status: 'good' });
    
    // Consistency (0-25 points) - simulated
    const consistencyScore = 18;
    score += consistencyScore;
    factors.push({ name: 'Consistency', score: consistencyScore, max: 25, status: 'good' });
    
    // Update UI
    document.getElementById('healthScore').textContent = score;
    document.getElementById('healthScorePercent').textContent = score;
    document.getElementById('healthScoreBar').style.width = `${score}%`;
    
    // Update score color
    const scoreElement = document.getElementById('healthScore');
    if (score >= 80) {
        scoreElement.style.color = '#16a34a';
        document.getElementById('scoreRating').textContent = 'Excellent';
    } else if (score >= 60) {
        scoreElement.style.color = '#f97316';
        document.getElementById('scoreRating').textContent = 'Good';
    } else {
        scoreElement.style.color = '#dc2626';
        document.getElementById('scoreRating').textContent = 'Needs Improvement';
    }
    
    // Render score breakdown
    renderScoreBreakdown(factors);
}

// Render score breakdown
function renderScoreBreakdown(factors) {
    const container = document.getElementById('scoreBreakdown');
    if (!container) return;
    
    container.innerHTML = factors.map(factor => `
        <div class="score-factor">
            <div class="factor-header">
                <span class="factor-name">${factor.name}</span>
                <span class="factor-score">${factor.score}/${factor.max}</span>
            </div>
            <div class="factor-bar">
                <div class="factor-progress" style="width: ${(factor.score / factor.max) * 100}%"></div>
            </div>
            <div class="factor-status status-${factor.status}">${factor.status}</div>
        </div>
    `).join('');
}

// Initialize when section is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Listen for section changes
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (e.currentTarget.dataset.section === 'progress-analytics') {
                setTimeout(() => {
                    initProgressAnalytics();
                }, 100);
            }
        });
    });
});
