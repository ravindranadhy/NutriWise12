// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const leftSidebar = document.querySelector('.left-sidebar');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if (leftSidebar) {
            leftSidebar.style.display = leftSidebar.style.display === 'block' ? 'none' : 'block';
            if (window.innerWidth <= 768) {
                leftSidebar.style.position = 'fixed';
                leftSidebar.style.top = '88px';
                leftSidebar.style.left = '0';
                leftSidebar.style.zIndex = '999';
                leftSidebar.style.width = '240px';
            }
        }
    });
}

// Search functionality
const searchBar = document.querySelector('.search-bar');
if (searchBar) {
    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        console.log('Searching for:', query);
        // Add your search logic here
    });
}

// Barcode Scanner Button
const barcodeBtn = document.querySelectorAll('.search-btn')[0];
if (barcodeBtn) {
    barcodeBtn.addEventListener('click', () => {
        alert('📷 Barcode Scanner\n\nOpen your camera to scan food barcodes for instant nutritional information!');
    });
}

// Voice Search Button
const voiceBtn = document.querySelectorAll('.search-btn')[1];
if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
        alert('🎤 Voice Search\n\nSay what you ate:\n"I had masala dosa with sambar for breakfast"\n\nVoice recognition coming soon!');
    });
}

// Filter Button
const filterBtn = document.querySelectorAll('.search-btn')[2];
if (filterBtn) {
    filterBtn.addEventListener('click', () => {
        alert('⚙️ Filters\n\nFilter by:\n• Meal type (Breakfast, Lunch, Dinner)\n• Date range\n• Calories\n• Macros\n• Food categories');
    });
}

// Wait for all scripts to load
function initializeNavigation() {
    console.log('🚀 Initializing navigation system...');
    
    // Check if section functions are available
    if (typeof getDashboardHTML === 'undefined') {
        console.error('❌ sections.js not loaded! Retrying in 100ms...');
        setTimeout(initializeNavigation, 100);
        return;
    }
    
    console.log('✅ Section functions loaded!');
    
    // Section content mapping
    window.sectionContent = {
        'dashboard': getDashboardHTML,
        'food-logging': getFoodLoggingHTML,
        'health-metrics': getHealthMetricsHTML,
        'wearables': getWearablesHTML,
        'microbiome': getMicrobiomeHTML,
        'settings': getSettingsHTML
    };
    
    // Navigation function
    window.navigateToSection = function(sectionId) {
        console.log('🔄 Navigating to:', sectionId);
        
        // Check if section exists
        if (!window.sectionContent[sectionId]) {
            console.error('❌ Section not found:', sectionId);
            console.log('Available sections:', Object.keys(window.sectionContent));
            alert('Section "' + sectionId + '" not found!');
            return;
        }
        
        // Update active nav link
        const navLinks = document.querySelectorAll('.nav-link');
        console.log('📍 Found nav links:', navLinks.length);
        navLinks.forEach(link => {
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Load section content
        const mainContent = document.querySelector('.main-content');
        console.log('📦 Main content element:', mainContent ? 'Found' : 'Not found');
        
        if (!mainContent) {
            console.error('❌ Main content element not found!');
            alert('Error: Main content area not found in the page!');
            return;
        }
        
        try {
            console.log('✅ Loading section content...');
            const htmlContent = window.sectionContent[sectionId]();
            mainContent.innerHTML = htmlContent;
            console.log('✅ Content loaded successfully!');
            
            // Re-attach event listeners for the new content
            attachContentEventListeners();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('❌ Error loading section:', error);
            alert('Error loading section: ' + error.message);
        }
    };
    
    // Attach navigation to links
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('🔗 Attaching navigation to', navLinks.length, 'links');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.dataset.section;
            console.log('👆 Clicked:', sectionId);
            if (sectionId) {
                window.navigateToSection(sectionId);
            } else {
                console.error('❌ No data-section attribute found!');
            }
        });
    });
    
    console.log('✅ Navigation system ready!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
    initializeNavigation();
}

// Re-attach event listeners after content change
function attachContentEventListeners() {
    // Re-attach log items
    const logItems = document.querySelectorAll('.log-item');
    logItems.forEach(item => {
        item.addEventListener('click', () => {
            const mealType = item.querySelector('h4')?.textContent || 'Meal';
            const details = item.querySelector('p')?.textContent || '';
            const calories = item.querySelector('.log-calories-value')?.textContent || '0';
            alert(`${mealType}\n\n${details}\n\nCalories: ${calories} kcal\n\nClick to edit or view detailed breakdown.`);
        });
    });
    
    // Re-attach food cards
    const foodCards = document.querySelectorAll('.food-card');
    foodCards.forEach(card => {
        card.addEventListener('click', () => {
            const foodName = card.querySelector('.food-name')?.textContent || 'Food';
            const calories = card.querySelector('.food-calories')?.textContent || '0 kcal';
            alert(`${foodName}\n\n${calories}\n\nRecommended based on your preferences!`);
        });
    });
    
    // Re-attach card actions
    const cardActions = document.querySelectorAll('.card-action');
    cardActions.forEach(action => {
        action.addEventListener('click', (e) => {
            e.preventDefault();
            const cardTitle = action.parentElement.querySelector('.card-title')?.textContent || 'Section';
            alert(`View detailed ${cardTitle.toLowerCase()}\n\nOpening full view...`);
        });
    });
    
    // Sign Out button
    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', async () => {
            const confirmSignOut = confirm('🚪 Sign Out\n\nAre you sure you want to sign out?');
            if (confirmSignOut) {
                try {
                    const response = await fetch('/api/logout', { method: 'POST' });
                    if (response.ok) {
                        alert('✅ Signed out successfully!');
                        window.location.href = 'login.html';
                    } else {
                        alert('❌ Error signing out. Please try again.');
                    }
                } catch (error) {
                    console.error('Sign out error:', error);
                    alert('❌ Network error. Please try again.');
                }
            }
        });
    }
}

// Log Items Click
const logItems = document.querySelectorAll('.log-item');
logItems.forEach(item => {
    item.addEventListener('click', () => {
        const mealType = item.querySelector('h4').textContent;
        const details = item.querySelector('p').textContent;
        const calories = item.querySelector('.log-calories-value').textContent;
        
        alert(`${mealType}\n\n${details}\n\nCalories: ${calories} kcal\n\nClick to edit or view detailed breakdown.`);
    });
});

// Food Cards Click
const foodCards = document.querySelectorAll('.food-card');
foodCards.forEach(card => {
    card.addEventListener('click', () => {
        const foodName = card.querySelector('.food-name').textContent;
        const calories = card.querySelector('.food-calories').textContent;
        
        alert(`${foodName}\n\n${calories}\n\nRecommended based on your:\n• Dietary preferences\n• Nutritional goals\n• Recent eating patterns\n• Microbiome analysis\n\nClick "Add to Meal Plan" to include this.`);
    });
});

// Location Selector
const locationSelector = document.querySelector('.location-selector');
if (locationSelector) {
    locationSelector.addEventListener('click', () => {
        const newLocation = prompt('Enter your location:', 'Mumbai, India');
        if (newLocation) {
            document.querySelector('.location-text').textContent = newLocation;
        }
    });
}

// Profile Button
const profileBtn = document.querySelector('.profile-btn');
if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        alert('👤 Profile Menu\n\n• View Profile\n• Account Settings\n• Subscription\n• Health Goals\n• Privacy & Security\n• Help & Support\n• Logout');
    });
}

// Notifications Button
const notificationBtn = document.querySelectorAll('.icon-btn')[1];
if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        alert('🔔 Notifications (5)\n\n• Drink water reminder\n• Log dinner reminder\n• Weekly progress report ready\n• New recipe recommendation\n• Fitbit sync successful');
    });
}

// Saved Meals Button
const savedBtn = document.querySelectorAll('.icon-btn')[0];
if (savedBtn) {
    savedBtn.addEventListener('click', () => {
        alert('💾 Saved Meals (3)\n\n• Paneer Tikka Masala\n• Moong Dal Khichdi\n• Quinoa Salad Bowl\n\nQuickly add these to your meal log!');
    });
}

// Animate progress bars on load
window.addEventListener('load', () => {
    const progressBars = document.querySelectorAll('.summary-progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
});

// Real-time clock update in hero
function updateGreeting() {
    const hour = new Date().getHours();
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        let greeting = 'Welcome back';
        if (hour < 12) greeting = 'Good morning';
        else if (hour < 18) greeting = 'Good afternoon';
        else greeting = 'Good evening';
        
        heroTitle.textContent = `${greeting}, Ravi! 👋`;
    }
}

updateGreeting();

// Simulate real-time data updates
setInterval(() => {
    // Update water intake randomly
    const waterValue = document.querySelectorAll('.summary-value')[3];
    if (waterValue && Math.random() > 0.95) {
        let current = parseInt(waterValue.textContent);
        if (current < 8) {
            waterValue.textContent = current + 1;
            const progressBar = document.querySelectorAll('.summary-progress-bar')[3];
            progressBar.style.width = ((current + 1) / 8 * 100) + '%';
        }
    }
}, 5000);

// Card action links
const cardActions = document.querySelectorAll('.card-action');
cardActions.forEach(action => {
    action.addEventListener('click', (e) => {
        e.preventDefault();
        const cardTitle = action.parentElement.querySelector('.card-title').textContent;
        console.log('View more:', cardTitle);
        alert(`View detailed ${cardTitle.toLowerCase()}\n\nOpening full view...`);
    });
});

// Reminder items - checkboxes handle the interaction now

// Device items
const deviceItems = document.querySelectorAll('.device-item');
deviceItems.forEach(item => {
    item.addEventListener('click', () => {
        const deviceName = item.querySelector('.device-name').textContent;
        alert(`${deviceName}\n\nStatus: Connected ✓\nLast sync: 2 minutes ago\n\nOptions:\n• View sync history\n• Sync now\n• Disconnect device`);
    });
});

console.log('🌿 NutriWise360 Dashboard loaded successfully!');
console.log('All interactive features are ready.');
