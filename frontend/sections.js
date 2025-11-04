// All section HTML content for dynamic navigation

function getDashboardHTML() {
    return `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Today's Summary</h2>
                <a href="#" class="card-action">View Details →</a>
            </div>
            <div class="summary-grid">
                <div class="summary-item">
                    <div class="summary-icon">🔥</div>
                    <div class="summary-value">1,450</div>
                    <div class="summary-label">of 2,000 kcal</div>
                    <div class="summary-progress"><div class="summary-progress-bar" style="width: 72.5%"></div></div>
                </div>
                <div class="summary-item">
                    <div class="summary-icon">🥩</div>
                    <div class="summary-value">85g</div>
                    <div class="summary-label">of 120g protein</div>
                    <div class="summary-progress"><div class="summary-progress-bar" style="width: 70.8%"></div></div>
                </div>
                <div class="summary-item">
                    <div class="summary-icon">🍚</div>
                    <div class="summary-value">180g</div>
                    <div class="summary-label">of 250g carbs</div>
                    <div class="summary-progress"><div class="summary-progress-bar" style="width: 72%"></div></div>
                </div>
                <div class="summary-item">
                    <div class="summary-icon">💧</div>
                    <div class="summary-value">6</div>
                    <div class="summary-label">of 8 glasses</div>
                    <div class="summary-progress"><div class="summary-progress-bar" style="width: 75%"></div></div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Recent Logs</h2>
                <a href="#" class="card-action">View All →</a>
            </div>
            <div class="log-list">
                <div class="log-item">
                    <div class="log-info">
                        <div class="log-icon">🌅</div>
                        <div class="log-details"><h4>Breakfast</h4><p>Masala Dosa with Sambar • 8:30 AM</p></div>
                    </div>
                    <div class="log-calories"><div class="log-calories-value">450</div><div class="log-calories-label">kcal</div></div>
                </div>
                <div class="log-item">
                    <div class="log-info">
                        <div class="log-icon">☀️</div>
                        <div class="log-details"><h4>Lunch</h4><p>Dal Tadka, Roti, Sabzi • 1:15 PM</p></div>
                    </div>
                    <div class="log-calories"><div class="log-calories-value">620</div><div class="log-calories-label">kcal</div></div>
                </div>
                <div class="log-item">
                    <div class="log-info">
                        <div class="log-icon">🍎</div>
                        <div class="log-details"><h4>Snacks</h4><p>Mixed Nuts, Green Tea • 4:30 PM</p></div>
                    </div>
                    <div class="log-calories"><div class="log-calories-value">200</div><div class="log-calories-label">kcal</div></div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Recommended for You</h2>
                <a href="#" class="card-action">See More →</a>
            </div>
            <div class="food-grid">
                <div class="food-card">
                    <div class="food-image">🥗</div>
                    <div class="food-name">Paneer Tikka Salad</div>
                    <div class="food-calories">320 kcal</div>
                </div>
                <div class="food-card">
                    <div class="food-image">🍲</div>
                    <div class="food-name">Moong Dal Khichdi</div>
                    <div class="food-calories">280 kcal</div>
                </div>
                <div class="food-card">
                    <div class="food-image">🥤</div>
                    <div class="food-name">Protein Smoothie</div>
                    <div class="food-calories">220 kcal</div>
                </div>
            </div>
        </div>
    `;
}

function getFoodLoggingHTML() {
    return `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Quick Log Methods</h2>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
                <button class="quick-log-btn" onclick="alert('📷 Barcode Scanner\\n\\nScan any food package barcode for instant nutritional info!')">
                    <div style="font-size: 48px; margin-bottom: 12px;">📷</div>
                    <h3>Scan Barcode</h3>
                    <p>Instant product lookup</p>
                </button>
                <button class="quick-log-btn" onclick="openFoodCamera()">
                    <div style="font-size: 48px; margin-bottom: 12px;">📸</div>
                    <h3>Take Photo</h3>
                    <p>AI recognizes food</p>
                </button>
                <button class="quick-log-btn" onclick="startVoiceRecognition()">
                    <div style="font-size: 48px; margin-bottom: 12px;">🎤</div>
                    <h3>Voice Input</h3>
                    <p>Say what you ate</p>
                </button>
                <button class="quick-log-btn" onclick="openManualSearch()">
                    <div style="font-size: 48px; margin-bottom: 12px;">🔍</div>
                    <h3>Manual Search</h3>
                    <p>Browse database</p>
                </button>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Today's Meals</h2>
                <a href="#" class="card-action">Add Meal →</a>
            </div>
            <div class="log-list">
                <div class="log-item">
                    <div class="log-info">
                        <div class="log-icon">🌅</div>
                        <div class="log-details"><h4>Breakfast</h4><p>Masala Dosa, Sambar, Coconut Chutney • 8:30 AM</p></div>
                    </div>
                    <div class="log-calories">
                        <div class="log-calories-value">450</div>
                        <div class="log-calories-label">kcal</div>
                    </div>
                </div>
                <div class="log-item">
                    <div class="log-info">
                        <div class="log-icon">☀️</div>
                        <div class="log-details"><h4>Lunch</h4><p>Dal Tadka, 2 Roti, Mixed Veg Sabzi • 1:15 PM</p></div>
                    </div>
                    <div class="log-calories">
                        <div class="log-calories-value">620</div>
                        <div class="log-calories-label">kcal</div>
                    </div>
                </div>
                <div class="log-item">
                    <div class="log-info">
                        <div class="log-icon">🍎</div>
                        <div class="log-details"><h4>Snacks</h4><p>Mixed Nuts (30g), Green Tea • 4:30 PM</p></div>
                    </div>
                    <div class="log-calories">
                        <div class="log-calories-value">200</div>
                        <div class="log-calories-label">kcal</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getMealPlansHTML() {
    return `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">This Week's Plan</h2>
                <a href="#" class="card-action">Generate New Plan →</a>
            </div>
            <div style="display: grid; gap: 16px;">
                ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => `
                    <div style="background: #f8fafc; border-radius: 12px; padding: 20px;">
                        <h3 style="margin-bottom: 16px; font-size: 18px; color: #16a34a;">${day}</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                            <div style="background: white; padding: 12px; border-radius: 8px;">
                                <div style="font-weight: 600; margin-bottom: 4px;">🌅 Breakfast</div>
                                <div style="font-size: 14px; color: #64748b;">Oats with Fruits</div>
                                <div style="font-size: 12px; color: #16a34a; margin-top: 4px;">350 kcal</div>
                            </div>
                            <div style="background: white; padding: 12px; border-radius: 8px;">
                                <div style="font-weight: 600; margin-bottom: 4px;">☀️ Lunch</div>
                                <div style="font-size: 14px; color: #64748b;">Grilled Chicken Salad</div>
                                <div style="font-size: 12px; color: #16a34a; margin-top: 4px;">480 kcal</div>
                            </div>
                            <div style="background: white; padding: 12px; border-radius: 8px;">
                                <div style="font-weight: 600; margin-bottom: 4px;">🌙 Dinner</div>
                                <div style="font-size: 14px; color: #64748b;">Dal Tadka with Roti</div>
                                <div style="font-size: 12px; color: #16a34a; margin-top: 4px;">420 kcal</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getHealthMetricsHTML() {
    return `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Weight Trend</h2>
                <a href="#" class="card-action">View Details →</a>
            </div>
            <div style="background: #f8fafc; padding: 24px; border-radius: 12px; text-align: center;">
                <div style="font-size: 48px; font-weight: 800; color: #16a34a; margin-bottom: 8px;">72.5 kg</div>
                <div style="font-size: 16px; color: #64748b; margin-bottom: 16px;">Current Weight</div>
                <div style="display: flex; justify-content: center; gap: 32px; margin-top: 24px;">
                    <div>
                        <div style="font-size: 24px; font-weight: 700; color: #ef4444;">-2.3 kg</div>
                        <div style="font-size: 14px; color: #64748b;">This Month</div>
                    </div>
                    <div>
                        <div style="font-size: 24px; font-weight: 700; color: #16a34a;">-5.8 kg</div>
                        <div style="font-size: 14px; color: #64748b;">Total Progress</div>
                    </div>
                    <div>
                        <div style="font-size: 24px; font-weight: 700; color: #2563eb;">68 kg</div>
                        <div style="font-size: 14px; color: #64748b;">Goal Weight</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Body Composition</h2>
            </div>
            <div class="summary-grid">
                <div class="summary-item">
                    <div class="summary-icon">💪</div>
                    <div class="summary-value">28%</div>
                    <div class="summary-label">Body Fat</div>
                    <div class="summary-progress"><div class="summary-progress-bar" style="width: 28%"></div></div>
                </div>
                <div class="summary-item">
                    <div class="summary-icon">🏋️</div>
                    <div class="summary-value">52 kg</div>
                    <div class="summary-label">Muscle Mass</div>
                    <div class="summary-progress"><div class="summary-progress-bar" style="width: 72%"></div></div>
                </div>
                <div class="summary-item">
                    <div class="summary-icon">💧</div>
                    <div class="summary-value">58%</div>
                    <div class="summary-label">Body Water</div>
                    <div class="summary-progress"><div class="summary-progress-bar" style="width: 58%"></div></div>
                </div>
                <div class="summary-item">
                    <div class="summary-icon">🦴</div>
                    <div class="summary-value">2.8 kg</div>
                    <div class="summary-label">Bone Mass</div>
                    <div class="summary-progress"><div class="summary-progress-bar" style="width: 85%"></div></div>
                </div>
            </div>
        </div>
    `;
}

function getWearablesHTML() {
    return `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Connected Devices</h2>
                <a href="#" class="card-action">Add Device →</a>
            </div>
            <div style="display: grid; gap: 16px;">
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="font-size: 48px;">⌚</div>
                        <div>
                            <h3 style="font-size: 18px; margin-bottom: 4px;">Fitbit Charge 5</h3>
                            <p style="font-size: 14px; color: #64748b;">Last synced: 2 minutes ago</p>
                            <p style="font-size: 12px; color: #16a34a;">✓ Connected • Battery: 85%</p>
                        </div>
                    </div>
                    <button style="padding: 8px 16px; background: #16a34a; color: white; border: none; border-radius: 8px; cursor: pointer;">Sync Now</button>
                </div>
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="font-size: 48px;">📱</div>
                        <div>
                            <h3 style="font-size: 18px; margin-bottom: 4px;">Apple Health</h3>
                            <p style="font-size: 14px; color: #64748b;">Last synced: 5 minutes ago</p>
                            <p style="font-size: 12px; color: #16a34a;">✓ Connected</p>
                        </div>
                    </div>
                    <button style="padding: 8px 16px; background: #16a34a; color: white; border: none; border-radius: 8px; cursor: pointer;">Sync Now</button>
                </div>
            </div>
        </div>
    `;
}

function getDNAInsightsHTML() {
    return `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Your Genetic Profile</h2>
            </div>
            <div style="background: linear-gradient(135deg, #16a34a, #22c55e); color: white; padding: 32px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
                <div style="font-size: 64px; margin-bottom: 16px;">🧬</div>
                <h3 style="font-size: 28px; margin-bottom: 12px;">DNA Analysis Complete</h3>
                <p style="font-size: 16px; opacity: 0.9;">Based on 100+ genetic markers</p>
            </div>
            <div class="summary-grid">
                <div class="summary-item">
                    <div class="summary-icon">⚡</div>
                    <div class="summary-value">Fast</div>
                    <div class="summary-label">Metabolism Type</div>
                </div>
                <div class="summary-item">
                    <div class="summary-icon">🥩</div>
                    <div class="summary-value">High</div>
                    <div class="summary-label">Protein Need</div>
                </div>
                <div class="summary-item">
                    <div class="summary-icon">🍚</div>
                    <div class="summary-value">Moderate</div>
                    <div class="summary-label">Carb Tolerance</div>
                </div>
                <div class="summary-item">
                    <div class="summary-icon">☕</div>
                    <div class="summary-value">Slow</div>
                    <div class="summary-label">Caffeine Metabolism</div>
                </div>
            </div>
        </div>
    `;
}

function getMicrobiomeHTML() {
    return `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Gut Health Score</h2>
            </div>
            <div style="background: #f8fafc; padding: 32px; border-radius: 12px; text-align: center;">
                <div style="font-size: 72px; font-weight: 800; color: #16a34a; margin-bottom: 8px;">85/100</div>
                <div style="font-size: 18px; color: #64748b;">Excellent Gut Health</div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Microbiome Composition</h2>
            </div>
            <div style="display: grid; gap: 12px;">
                <div style="background: #f8fafc; padding: 16px; border-radius: 12px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight: 600;">🦠 Beneficial Bacteria</span>
                        <span style="color: #16a34a; font-weight: 700;">78%</span>
                    </div>
                    <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                        <div style="height: 100%; width: 78%; background: #16a34a;"></div>
                    </div>
                </div>
                <div style="background: #f8fafc; padding: 16px; border-radius: 12px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight: 600;">⚖️ Neutral Bacteria</span>
                        <span style="color: #f59e0b; font-weight: 700;">18%</span>
                    </div>
                    <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                        <div style="height: 100%; width: 18%; background: #f59e0b;"></div>
                    </div>
                </div>
                <div style="background: #f8fafc; padding: 16px; border-radius: 12px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight: 600;">⚠️ Harmful Bacteria</span>
                        <span style="color: #ef4444; font-weight: 700;">4%</span>
                    </div>
                    <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                        <div style="height: 100%; width: 4%; background: #ef4444;"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getSettingsHTML() {
    return `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Account Settings</h2>
            </div>
            <div style="display: grid; gap: 16px;">
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h4 style="margin-bottom: 4px;">Profile Information</h4>
                        <p style="font-size: 14px; color: #64748b;">Update your personal details</p>
                    </div>
                    <button style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer;">Edit</button>
                </div>
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h4 style="margin-bottom: 4px;">Health Goals</h4>
                        <p style="font-size: 14px; color: #64748b;">Manage your fitness targets</p>
                    </div>
                    <button style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer;">Edit</button>
                </div>
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h4 style="margin-bottom: 4px;">Notifications</h4>
                        <p style="font-size: 14px; color: #64748b;">Control your alerts and reminders</p>
                    </div>
                    <button style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer;">Edit</button>
                </div>
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h4 style="margin-bottom: 4px;">Privacy & Security</h4>
                        <p style="font-size: 14px; color: #64748b;">Manage data and privacy settings</p>
                    </div>
                    <button style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer;">Edit</button>
                </div>
                <div style="background: #fef3c7; padding: 20px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #fde68a;">
                    <div>
                        <h4 style="margin-bottom: 4px; color: #d97706;">Sign Out</h4>
                        <p style="font-size: 14px; color: #64748b;">Sign out from your account</p>
                    </div>
                    <button id="signOutBtn" style="padding: 8px 16px; background: #f59e0b; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">Sign Out</button>
                </div>
                <div style="background: #fff1f2; padding: 20px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #fecdd3;">
                    <div>
                        <h4 style="margin-bottom: 4px; color: #ef4444;">Delete Account</h4>
                        <p style="font-size: 14px; color: #64748b;">Permanently delete your account</p>
                    </div>
                    <button style="padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer;">Delete</button>
                </div>
            </div>
        </div>
    `;
}

function getProgressAnalyticsHTML() {
    return `
        <!-- Progress Analytics Section -->
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">📈 Progress Analytics</h2>
                <p style="color: #64748b; font-size: 14px; margin-top: 8px;">Track your weekly progress, weight goals, and health insights</p>
            </div>
        </div>

        <!-- Weekly Calorie Chart -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">📊 Weekly Calorie Tracking</h3>
                <p style="color: #64748b; font-size: 14px;">Calories consumed vs burned over the last 7 days</p>
            </div>
            <div style="padding: 20px;">
                <canvas id="calorieChart" style="width: 100%; height: 300px;"></canvas>
            </div>
            
            <!-- Weekly Summary Stats -->
            <div class="summary-grid" style="margin-top: 20px;">
                <div class="summary-item">
                    <div class="summary-icon">🍽️</div>
                    <div class="summary-value" id="weeklyConsumed">14,200</div>
                    <div class="summary-label">Total Consumed</div>
                </div>
                <div class="summary-item">
                    <div class="summary-icon">🔥</div>
                    <div class="summary-value" id="weeklyBurned">4,200</div>
                    <div class="summary-label">Total Burned</div>
                </div>
                <div class="summary-item">
                    <div class="summary-icon">📊</div>
                    <div class="summary-value" id="avgConsumed">2,029</div>
                    <div class="summary-label">Avg Daily Consumed</div>
                </div>
                <div class="summary-item">
                    <div class="summary-icon">⚡</div>
                    <div class="summary-value" id="avgBurned">600</div>
                    <div class="summary-label">Avg Daily Burned</div>
                </div>
                <div class="summary-item">
                    <div class="summary-icon">💯</div>
                    <div class="summary-value" id="netCalories">+10,000</div>
                    <div class="summary-label">Net Calories (Week)</div>
                </div>
            </div>
        </div>

        <!-- Weight Goal Timeline -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title" id="goalType">🎯 Weight Goal Timeline</h3>
            </div>
            <div style="padding: 20px;">
                <div class="weight-timeline">
                    <div class="timeline-row">
                        <div class="timeline-label">Current Weight</div>
                        <div class="timeline-value"><span id="currentWeight">70</span> kg</div>
                    </div>
                    <div class="timeline-row">
                        <div class="timeline-label">Goal Weight</div>
                        <div class="timeline-value"><span id="goalWeight">65</span> kg</div>
                    </div>
                    <div class="timeline-row">
                        <div class="timeline-label">Weight to Lose/Gain</div>
                        <div class="timeline-value"><span id="weightDifference">5.0</span> kg</div>
                    </div>
                    <div class="timeline-row">
                        <div class="timeline-label">Estimated Time</div>
                        <div class="timeline-value"><span id="weeksToGoal">7</span> weeks (<span id="monthsToGoal">2</span> months)</div>
                    </div>
                    <div class="timeline-row">
                        <div class="timeline-label">Target Date</div>
                        <div class="timeline-value" id="targetDate">January 15, 2026</div>
                    </div>
                </div>
                
                <!-- Progress Bar -->
                <div style="margin-top: 30px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span style="font-weight: 600;">Progress to Goal</span>
                        <span style="color: #16a34a; font-weight: 600;">On Track 🎯</span>
                    </div>
                    <div style="background: #e2e8f0; height: 20px; border-radius: 10px; overflow: hidden;">
                        <div id="weightProgress" style="background: linear-gradient(90deg, #16a34a, #22c55e); height: 100%; width: 30%; transition: width 0.5s;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Health Score -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">💯 Overall Health Score</h3>
            </div>
            <div style="padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 72px; font-weight: bold; color: #16a34a;" id="healthScore">85</div>
                    <div style="font-size: 18px; color: #64748b; margin-top: 10px;">
                        <span id="scoreRating">Excellent</span> Health Score
                    </div>
                    <div style="background: #e2e8f0; height: 10px; border-radius: 5px; margin-top: 20px; overflow: hidden;">
                        <div id="healthScoreBar" style="background: linear-gradient(90deg, #16a34a, #22c55e); height: 100%; width: 85%; transition: width 0.5s;"></div>
                    </div>
                    <div style="margin-top: 10px; color: #64748b; font-size: 14px;">
                        <span id="healthScorePercent">85</span>/100 points
                    </div>
                </div>
                
                <!-- Score Breakdown -->
                <div id="scoreBreakdown"></div>
            </div>
        </div>

        <!-- Health Insights -->
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">🔍 Personalized Health Insights</h3>
                <p style="color: #64748b; font-size: 14px;">Based on your age, activity level, and goals</p>
            </div>
            <div id="healthInsightsContainer" style="padding: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                <!-- Insights will be dynamically loaded -->
            </div>
        </div>
    `;
}

function attachDynamicEventListeners() {
    // Re-attach any dynamic event listeners after content update
    const logItems = document.querySelectorAll('.log-item');
    logItems.forEach(item => {
        item.addEventListener('click', () => {
            alert('Meal details clicked!');
        });
    });

    const foodCards = document.querySelectorAll('.food-card');
    foodCards.forEach(card => {
        card.addEventListener('click', () => {
            alert('Food recommendation clicked!');
        });
    });

    const quickLogBtns = document.querySelectorAll('.quick-log-btn');
    quickLogBtns.forEach(btn => {
        btn.style.cssText = 'background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; cursor: pointer; transition: all 0.2s; text-align: center;';
        btn.addEventListener('mouseenter', () => {
            btn.style.borderColor = '#16a34a';
            btn.style.transform = 'translateY(-4px)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.borderColor = '#e2e8f0';
            btn.style.transform = 'translateY(0)';
        });
    });
}
