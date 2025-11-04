# 🎨 Frontend - NutriWise360 Client

## 📁 Structure

```
frontend/
├── login.html              # Authentication page
├── preferences.html        # Profile setup page
├── index.html             # Main dashboard
├── app.html               # Dashboard alternative
├── dashboard.html         # Static dashboard
├── dashboard-style.css    # Main stylesheet
├── app-script.js         # Main JavaScript
├── sections.js           # Dynamic section content
├── features.html         # Features page
├── how-it-works.html     # Process guide
├── science.html          # Science & research
├── get-started.html      # Getting started
└── demo.html             # Demo information
```

---

## 🚀 Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with:
  - Flexbox & Grid layouts
  - CSS animations
  - Responsive design
  - Custom properties
- **JavaScript ES6+** - Vanilla JS (no frameworks)
- **Google Fonts** - Inter font family

---

## 📄 Pages Overview

### 1. **login.html** - Authentication
**Purpose:** User login and registration

**Features:**
- Tab-based interface (Login/Sign Up)
- Form validation
- Password confirmation
- Error/success messages
- Auto-redirect after authentication
- Responsive design

**API Calls:**
- `POST /api/login`
- `POST /api/register`
- `GET /api/auth/check`

### 2. **preferences.html** - Profile Setup
**Purpose:** Collect user goals and preferences

**Features:**
- Multi-section form
- Visual card selection
- Progress bar tracking
- Tag-based input for allergies
- Checkbox groups
- Smart validation
- Auto-calculation of nutrition targets

**Collects:**
- Basic info (age, gender, height, weight)
- Primary goal (6 options)
- Activity level (5 options)
- Diet type (5 options)
- Allergies & dislikes (tags)
- Health conditions (checkboxes)

**API Calls:**
- `POST /api/preferences`
- `GET /api/auth/check`

### 3. **index.html** - Main Dashboard
**Purpose:** Primary application interface

**Layout:**
- Sticky header with search, notifications, profile
- Hero banner with welcome message
- Left sidebar with 8 navigation sections
- Main content area (dynamic)
- Right sidebar with widgets

**8 Sections:**
1. Dashboard - Today's summary
2. Food Logging - Log meals
3. Meal Plans - Weekly plans
4. Health Metrics - Body composition
5. Wearables - Device sync
6. DNA Insights - Genetic profile
7. Microbiome - Gut health
8. Settings - Account management

**API Calls:**
- `GET /api/dashboard`
- `GET /api/preferences`

---

## 🎨 Styling (dashboard-style.css)

### Design System

**Colors:**
```css
Primary: #16a34a (Green)
Secondary: #2563eb (Blue)
Accent: #f59e0b (Amber)
Error: #ef4444 (Red)
Background: #f8fafc (Light Gray)
Text: #0f172a (Dark)
```

**Typography:**
```css
Font Family: 'Inter', sans-serif
Weights: 300, 400, 500, 600, 700, 800
```

**Breakpoints:**
```css
Mobile: < 768px
Tablet: 768px - 1199px
Desktop: ≥ 1200px
```

### Key Components

#### Cards
```css
.card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

#### Buttons
```css
.btn {
  padding: 16px 32px;
  background: linear-gradient(135deg, #16a34a, #22c55e);
  color: white;
  border-radius: 12px;
  transition: all 0.3s;
}
```

#### Progress Bars
```css
.summary-progress {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
}
```

### Responsive Design
```css
/* Mobile First Approach */
@media (max-width: 768px) {
  .left-sidebar { display: none; }
  .main-layout { grid-template-columns: 1fr; }
}

@media (min-width: 1200px) {
  .main-layout {
    grid-template-columns: 250px 1fr 300px;
  }
}
```

---

## 💻 JavaScript (app-script.js)

### Key Features

#### 1. Onboarding Tour
```javascript
const onboardingSteps = [
  { icon: '🎉', title: 'Welcome!', text: '...' },
  { icon: '📊', title: 'Track Progress', text: '...' },
  // ... more steps
];
```

#### 2. Dynamic Navigation
```javascript
function navigateToSection(section) {
  // Update active nav
  // Load section content
  // Update hero banner
  // Re-attach event listeners
}
```

#### 3. Section Content (sections.js)
```javascript
function getDashboardHTML() { return `...`; }
function getFoodLoggingHTML() { return `...`; }
function getMealPlansHTML() { return `...`; }
// ... more sections
```

#### 4. Interactive Elements
- Search bar
- Barcode/voice search buttons
- Quick action buttons
- Navigation menu
- Clickable cards
- Toast notifications

---

## 🔄 User Flow

### First Time User
```
1. Visit site → login.html
   ↓
2. Click "Sign Up" tab
   ↓
3. Fill registration form
   ↓
4. Submit → API call → Session created
   ↓
5. Redirect to preferences.html
   ↓
6. Complete profile setup
   ↓
7. Submit → Targets calculated
   ↓
8. Redirect to index.html (dashboard)
   ↓
9. See onboarding overlay (4 steps)
   ↓
10. Click "Next" or "Skip"
   ↓
11. Explore dashboard sections
```

### Returning User
```
1. Visit site → Check session
   ↓
2. If authenticated → Redirect to dashboard
   ↓
3. Load user data from API
   ↓
4. Display personalized dashboard
   ↓
5. Navigate between sections
```

---

## 🎯 Dashboard Sections

### 1. Dashboard
**Content:**
- Today's nutrition summary (4 metrics)
- Recent meal logs (3 items)
- Food recommendations (3 cards)

### 2. Food Logging
**Content:**
- 4 quick log methods (barcode, photo, voice, search)
- Today's meals timeline
- Saved meals library

### 3. Meal Plans
**Content:**
- Weekly meal plan (7 days)
- Breakfast, lunch, dinner for each day
- Shopping list by category

### 4. Health Metrics
**Content:**
- Weight trend graph
- Body composition (4 metrics)
- Activity & sleep stats

### 5. Wearables
**Content:**
- Connected devices list
- Sync status and battery
- Add new device button

### 6. DNA Insights
**Content:**
- Genetic profile overview
- Metabolism type
- Nutrient sensitivities

### 7. Microbiome
**Content:**
- Gut health score
- Bacteria composition breakdown
- Recommendations

### 8. Settings
**Content:**
- Profile information
- Health goals
- Notifications
- Privacy & security
- Account deletion

---

## 🎨 Visual Elements

### Icons
Using emoji for simplicity:
```
🌿 - Logo
🔍 - Search
📷 - Barcode
🎤 - Voice
💾 - Saved
🔔 - Notifications
👤 - Profile
🔥 - Calories
🥩 - Protein
🍚 - Carbs
💧 - Water
```

### Animations
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(30px); }
  to { transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(22, 163, 74, 0); }
}
```

---

## 📱 Responsive Features

### Mobile (< 768px)
- Hamburger menu
- Single column layout
- Touch-friendly buttons
- Simplified navigation

### Tablet (768px - 1199px)
- Two column layout
- Collapsible sidebar
- Optimized spacing

### Desktop (≥ 1200px)
- Three column layout
- Fixed sidebars
- Full navigation visible

---

## 🔧 Development

### No Build Process Required
- Edit HTML/CSS/JS files directly
- Refresh browser to see changes
- No compilation needed

### Testing
1. Start backend server
2. Open `http://localhost:3000`
3. Test all pages and features
4. Check responsive design
5. Verify API integrations

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

---

## 🎯 Key Features

✅ **No Framework** - Vanilla JavaScript  
✅ **Modern CSS** - Grid, Flexbox, Animations  
✅ **Responsive** - Mobile, Tablet, Desktop  
✅ **Interactive** - Dynamic content loading  
✅ **Accessible** - Semantic HTML  
✅ **Fast** - No heavy dependencies  
✅ **Clean Code** - Well-organized  

---

## 📊 File Sizes

```
login.html: ~10 KB
preferences.html: ~15 KB
index.html: ~13 KB
dashboard-style.css: ~15 KB
app-script.js: ~12 KB
sections.js: ~8 KB
```

**Total: ~73 KB** (very lightweight!)

---

## 🚀 Performance

- No external libraries (except Google Fonts)
- Minimal HTTP requests
- Optimized CSS animations
- Efficient DOM manipulation
- Lazy loading for sections

---

## 🎨 Customization

### Change Colors
Edit `dashboard-style.css`:
```css
:root {
  --primary: #16a34a;
  --secondary: #2563eb;
  --accent: #f59e0b;
}
```

### Add New Section
1. Add HTML in `sections.js`:
```javascript
function getNewSectionHTML() {
  return `<div class="card">...</div>`;
}
```

2. Add to navigation in `app-script.js`:
```javascript
'new-section': {
  title: 'New Section',
  subtext: 'Description',
  html: getNewSectionHTML()
}
```

3. Add menu item in `index.html`:
```html
<li class="nav-item">
  <a href="#new-section" class="nav-link" data-section="new-section">
    <span class="nav-icon">🆕</span>
    <span>New Section</span>
  </a>
</li>
```

---

## 🐛 Common Issues

### Sections Not Loading
**Issue:** Clicking nav items doesn't change content  
**Solution:** Check if `sections.js` is loaded before `app-script.js`

### Styles Not Applied
**Issue:** Page looks unstyled  
**Solution:** Verify `dashboard-style.css` path is correct

### API Calls Failing
**Issue:** Data not loading from backend  
**Solution:** Check backend server is running and CORS settings

---

## 📈 Future Enhancements

- [ ] Add loading spinners
- [ ] Implement food search
- [ ] Add charts (Chart.js)
- [ ] Photo upload functionality
- [ ] Real-time notifications
- [ ] Offline support (Service Worker)
- [ ] Dark mode toggle
- [ ] Accessibility improvements

---

**Frontend is ready to provide an amazing user experience!** 🎨
