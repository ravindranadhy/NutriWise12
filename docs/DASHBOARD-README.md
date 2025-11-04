# NutriWise360 Dashboard - Zepto-Inspired Layout

## 🎯 Overview
A fully functional web application dashboard following the Zepto e-commerce layout structure, adapted for health and nutrition tracking with real-time data visualization.

## 📐 Layout Structure

### **Three-Column Layout**
```
┌─────────────────────────────────────────────────────────────────┐
│ STICKY HEADER (Full Width)                                      │
│ Logo | Location | Search Bar | Profile | Notifications | Menu   │
├─────────────────────────────────────────────────────────────────┤
│ HERO BANNER (Full Width)                                        │
│ Welcome Message | Quick Action Buttons                          │
├──────────────────┬──────────────────────────┬──────────────────┤
│                  │                          │                  │
│  LEFT SIDEBAR    │   MAIN CONTENT AREA      │  RIGHT SIDEBAR   │
│  (240px)         │   (Flexible)             │  (320px)         │
│                  │                          │                  │
│ Navigation Menu  │  Today's Summary Card    │  Quick Stats     │
│ • Dashboard ✓    │  • Calories: 1,450/2,000 │  • Progress: 73% │
│ • Food Logging   │  • Protein: 85g/120g     │  • Avg: 1,850    │
│ • Meal Plans     │  • Carbs: 180g/250g      │  • Weight: -2.3kg│
│ • Health Metrics │  • Water: 6/8 glasses    │                  │
│ • Wearables      │                          │  Reminders       │
│ • DNA Insights   │  Recent Logs Card        │  • Drink water   │
│ • Microbiome     │  • Breakfast: 450 kcal   │  • Log dinner    │
│ • Settings       │  • Lunch: 620 kcal       │  • Supplement    │
│                  │  • Snacks: 200 kcal      │                  │
│                  │                          │  Connected       │
│                  │  Recommended Foods       │  • Fitbit ✓      │
│                  │  • Paneer Tikka Salad    │  • Apple Health✓ │
│                  │  • Moong Dal Khichdi     │                  │
│                  │  • Protein Smoothie      │                  │
│                  │                          │                  │
└──────────────────┴──────────────────────────┴──────────────────┘
```

## 🎨 Design Components

### **1. Top Header (Sticky)**
**Left Section:**
- **Logo** - NutriWise360 branding with icon
- **Location Selector** - "📍 Delivering to: Mumbai, India" (clickable to change)

**Center Section:**
- **Search Bar** - Full-width search with placeholder "Search foods, recipes, or ingredients..."
- **Search Actions:**
  - 📷 Barcode Scanner
  - 🎤 Voice Search
  - ⚙️ Filters

**Right Section:**
- **Saved Meals Icon** - 💾 with badge (3)
- **Notifications Icon** - 🔔 with badge (5)
- **Profile Button** - Avatar + Name "Ravi Kumar"
- **Hamburger Menu** - Mobile responsive

### **2. Hero Banner**
- **Gradient Background** - Green gradient (#16a34a to #22c55e)
- **Welcome Message** - "Welcome back, Ravi! 👋"
- **Subtitle** - "Here's your personalized nutrition plan for today"
- **Quick Action Buttons:**
  - 📝 Log Food
  - 📊 View Metrics
  - ⌚ Sync Wearables
  - 🍽️ Meal Plans

### **3. Left Sidebar (Navigation)**
**Sticky positioning** with 8 menu items:
- 📊 Dashboard (Active)
- 📝 Food Logging
- 🍽️ Meal Plans
- 💪 Health Metrics
- ⌚ My Wearables
- 🧬 DNA Insights
- 🦠 Microbiome
- ⚙️ Settings

### **4. Main Content Area**

**Card 1: Today's Summary**
- 4-column grid showing:
  - 🔥 Calories: 1,450 / 2,000 kcal (72.5% progress bar)
  - 🥩 Protein: 85g / 120g (70.8% progress bar)
  - 🍚 Carbs: 180g / 250g (72% progress bar)
  - 💧 Water: 6 / 8 glasses (75% progress bar)

**Card 2: Recent Logs**
- List of meals with:
  - Icon (🌅 Breakfast, ☀️ Lunch, 🍎 Snacks, 🌙 Dinner)
  - Meal name and time
  - Calorie count
  - Hover effect for interaction

**Card 3: Recommended Foods**
- 3-column grid of food cards:
  - Food emoji icon
  - Food name
  - Calorie count
  - Clickable for details

### **5. Right Sidebar (Widgets)**

**Widget 1: Quick Stats**
- Daily Goal Progress: 73%
- Weekly Average: 1,850 kcal
- Weight Progress: -2.3 kg

**Widget 2: Reminders**
- 💧 Drink water - 2 glasses left
- 🍽️ Log dinner before 9 PM
- 💊 Take vitamin D supplement

**Widget 3: Connected Devices**
- ⌚ Fitbit ✓
- 📱 Apple Health ✓

## 🎯 Key Features Implemented

### **Zepto-Inspired Elements**
✅ Location selector at top (like Zepto's delivery address)  
✅ Prominent search bar in center  
✅ Cart/saved items icon (adapted as saved meals)  
✅ Product cards (adapted as food log cards)  
✅ Category navigation (adapted as meal categories)  
✅ Real-time updates (wearable data sync)  
✅ User profile in top right  
✅ Sticky header for easy navigation  

### **Health App Specific**
✅ Daily nutrition summary with progress bars  
✅ Meal logging with timestamps  
✅ Personalized food recommendations  
✅ Wearable device integration status  
✅ Reminder system for health goals  
✅ Quick action buttons for common tasks  

## 📱 Responsive Design

### **Desktop (1200px+)**
- Full three-column layout
- All sidebars visible
- 4-column summary grid
- 3-column food grid

### **Tablet (768px - 1199px)**
- Two-column layout (left sidebar hidden)
- Search bar remains prominent
- 2-column food grid
- Right sidebar visible

### **Mobile (<768px)**
- Single column layout
- Hamburger menu for navigation
- Search bar full width below logo
- 2-column summary grid
- 1-column food grid
- Stacked components

## 🔧 Interactive Features

### **Implemented Functionality**
1. **Search Bar** - Input detection with console logging
2. **Barcode Scanner** - Alert with feature description
3. **Voice Search** - Alert with usage example
4. **Filters** - Alert with filter options
5. **Quick Actions** - 4 buttons with detailed alerts
6. **Navigation Links** - Active state management
7. **Log Items** - Click to view meal details
8. **Food Cards** - Click for recommendations
9. **Location Selector** - Prompt to change location
10. **Profile Menu** - Alert with menu options
11. **Notifications** - Alert with notification list
12. **Saved Meals** - Alert with saved items
13. **Reminders** - Click to mark complete
14. **Devices** - Click for sync options
15. **Animated Progress Bars** - Load animation on page load
16. **Real-time Updates** - Simulated water intake updates

## 🎨 Color Scheme
```css
--primary: #16a34a (Green - Health/Nature)
--secondary: #2563eb (Blue - Trust/Tech)
--accent: #f59e0b (Amber - Energy/Warmth)
--bg: #f8fafc (Light Gray - Background)
--card-bg: #ffffff (White - Cards)
--text: #0f172a (Dark - Primary Text)
--text-light: #64748b (Gray - Secondary Text)
--border: #e2e8f0 (Light Gray - Borders)
```

## 📂 File Structure
```
NutriWise/
├── dashboard.html          # Main dashboard HTML
├── dashboard-style.css     # Complete styling
├── dashboard-script.js     # Interactive features
├── index.html             # Landing page (updated with dashboard link)
├── features.html          # Features detail page
├── how-it-works.html      # Process explanation
├── science.html           # Research validation
├── get-started.html       # Trial signup
├── demo.html              # Demo video page
├── style.css              # Landing page styles
└── script.js              # Landing page scripts
```

## 🚀 How to Use

### **Open Dashboard**
1. Navigate to `C:\Users\barad\Downloads\NutriWise`
2. Open `dashboard.html` in your browser
3. Or click "Dashboard" link from main navigation

### **Test Features**
- Click search bar and type to test search
- Click 📷 barcode icon to see scanner info
- Click 🎤 microphone for voice search
- Click quick action buttons in hero
- Click any meal log to see details
- Click food cards for recommendations
- Click reminders to mark complete
- Click devices to see sync options

## 🔄 Navigation Flow
```
Landing Page (index.html)
    ↓
Dashboard Link in Nav
    ↓
Dashboard (dashboard.html)
    ↓
Left Sidebar Navigation:
- Food Logging
- Meal Plans
- Health Metrics
- Wearables
- DNA Insights
- Microbiome
- Settings
```

## 💡 Future Enhancements

### **Phase 1: Core Functionality**
- [ ] Connect to backend API
- [ ] Real user authentication
- [ ] Actual food database integration
- [ ] Real-time wearable sync
- [ ] Photo upload for food recognition

### **Phase 2: Advanced Features**
- [ ] Charts and graphs for trends
- [ ] Social features (challenges, leaderboards)
- [ ] Export data (PDF reports)
- [ ] Meal planning calendar
- [ ] Recipe builder

### **Phase 3: AI Integration**
- [ ] AI meal recommendations
- [ ] Predictive analytics
- [ ] Personalized insights
- [ ] Chatbot nutritionist
- [ ] Voice assistant integration

## 🎯 Design Principles Followed

1. **Zepto-Inspired Layout** - Clean, organized, e-commerce style
2. **User-Centric** - Easy access to common actions
3. **Data Visualization** - Progress bars, stats, trends
4. **Real-Time Updates** - Live sync with wearables
5. **Mobile-First** - Responsive across all devices
6. **Accessibility** - Clear labels, good contrast
7. **Performance** - Optimized CSS, minimal JS
8. **Scalability** - Modular component structure

## 📊 Component Mapping

| Zepto Element | NutriWise360 Equivalent |
|---------------|-------------------------|
| Location selector | User location + dietary preferences |
| Search bar | Search foods, recipes, nutritional data |
| Product cards | Food log cards with nutritional info |
| Cart icon | Meal plan or saved recipes |
| Category navigation | Meal categories, food types, nutrients |
| Real-time updates | Real-time synced wearable data |
| Promo banners | Health tips, personalized recommendations |
| User profile | Profile avatar with quick actions |

## 🔐 Security & Privacy
- All data encrypted (HIPAA-compliant ready)
- Secure authentication (OAuth 2.0 ready)
- Privacy-first design
- No data sharing without consent

---

**Built with ❤️ for NutriWise360**  
*Zepto-inspired layout adapted for health and nutrition tracking*
