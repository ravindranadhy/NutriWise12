# 🌿 NutriWise360 - Personalized Nutrition Tracking Application

## 📁 Project Structure (Organized)

```
NutriWise/
│
├── backend/                      # Backend Server Files
│   ├── server.js                 # Express + MongoDB server
│   ├── package.json              # Node.js dependencies
│   └── node_modules/             # Installed packages (after npm install)
│
├── frontend/                     # Frontend Client Files
│   ├── auth/
│   │   ├── login.html           # Login & Registration page
│   │   └── preferences.html     # Profile setup page
│   │
│   ├── dashboard/
│   │   ├── index.html           # Main dashboard (entry point)
│   │   ├── app.html             # Dashboard alternative
│   │   ├── dashboard.html       # Static dashboard
│   │   ├── dashboard-style.css  # Dashboard styling
│   │   ├── app-script.js       # Main interactivity
│   │   └── sections.js         # Dynamic section content
│   │
│   └── pages/
│       ├── features.html        # Features information
│       ├── how-it-works.html   # Process guide
│       ├── science.html        # Research & science
│       ├── get-started.html    # Getting started
│       └── demo.html           # Demo information
│
├── docs/                        # Documentation
│   ├── README-DATABASE.md      # Database schema & details
│   ├── INSTALLATION-GUIDE.md   # Installation instructions
│   ├── COMPLETE-SUMMARY.md     # Full project overview
│   └── QUICK-START.md          # Quick start guide
│
├── start.bat                    # Quick start script
└── README.md                    # This file
```

---

## 🚀 Quick Start

### Method 1: One-Click Start
```bash
# Double-click this file:
start.bat
```

### Method 2: Manual Start
```bash
# 1. Start MongoDB
net start MongoDB

# 2. Install dependencies and start server
cd backend
npm install
node server.js

# 3. Open browser
http://localhost:3000
```

---

## 🗂️ Backend Structure

### **Location:** `backend/`

**Files:**
- `server.js` - Express server with MongoDB integration
- `package.json` - Node.js dependencies

**Technologies:**
- Node.js & Express
- MongoDB & Mongoose
- bcrypt (password hashing)
- express-session (session management)
- connect-mongo (MongoDB session store)

**API Endpoints:**
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/auth/check` - Check authentication
- `POST /api/preferences` - Save user preferences
- `GET /api/preferences` - Get user preferences
- `POST /api/log/food` - Log food entry
- `GET /api/log/daily` - Get daily logs
- `GET /api/dashboard` - Get dashboard data

**Database:** `mongodb://localhost:27017/nutriwise360`

---

## 🎨 Frontend Structure

### **Location:** `frontend/`

### **1. Authentication Pages**
- `login.html` - Login & Sign Up interface
- `preferences.html` - Profile setup with goals & preferences

### **2. Dashboard**
- `index.html` - Main application dashboard
- `dashboard-style.css` - Styling for all dashboard elements
- `app-script.js` - Interactive features & navigation
- `sections.js` - Dynamic content for 8 dashboard sections

### **3. Information Pages**
- `features.html` - Feature details
- `how-it-works.html` - Process explanation
- `science.html` - Scientific backing
- `get-started.html` - Onboarding info
- `demo.html` - Demo video placeholder

**Technologies:**
- Pure HTML5
- CSS3 (modern styling, animations, responsive design)
- Vanilla JavaScript (no frameworks)
- Google Fonts (Inter)

---

## 🗄️ Database Structure

### **Database:** `nutriwise360`

### **Collections:**

#### 1. **users**
Stores user authentication data
```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  profileComplete: Boolean,
  createdAt: Date
}
```

#### 2. **preferences**
Stores user goals and calculated nutrition targets
```javascript
{
  userId: ObjectId,
  age: Number,
  gender: String,
  height: Number,
  currentWeight: Number,
  targetWeight: Number,
  primaryGoal: String,
  activityLevel: String,
  dietType: String,
  allergies: [String],
  dislikedFoods: [String],
  healthConditions: [String],
  targetCalories: Number,
  targetProtein: Number,
  targetCarbs: Number,
  targetFats: Number
}
```

#### 3. **dailylogs**
Stores daily food logs
```javascript
{
  userId: ObjectId,
  date: Date,
  meals: [{
    mealType: String,
    foodItems: [Object],
    totalCalories: Number
  }],
  water: Number,
  totalCalories: Number,
  totalProtein: Number,
  totalCarbs: Number,
  totalFats: Number
}
```

#### 4. **sessions**
Automatic session management by express-session

---

## 🔄 Complete User Flow

```
1. User visits http://localhost:3000
   ↓
2. Backend serves frontend/login.html
   ↓
3. User registers or logs in
   ↓
4. Backend validates & creates session
   ↓
5. If new user → redirect to /preferences
   If existing user → redirect to /dashboard
   ↓
6. User completes profile (if new)
   - Backend calculates nutrition targets
   - Saves to preferences collection
   ↓
7. User lands on dashboard
   - Backend fetches user data from MongoDB
   - Frontend displays personalized dashboard
   ↓
8. User navigates sections
   - sections.js dynamically loads content
   - No page reload needed
   ↓
9. User logs out
   - Session destroyed
   - Redirect to login
```

---

## 📊 Features Overview

### ✅ Backend Features
- User authentication with bcrypt hashing
- Session management with MongoDB store
- RESTful API design
- Smart nutrition calculation (BMR, TDEE, macros)
- MongoDB integration with Mongoose
- Input validation & error handling
- Protected routes with authentication middleware

### ✅ Frontend Features
- Beautiful, modern UI with animations
- Responsive design (mobile, tablet, desktop)
- Dynamic content loading without page reload
- 8 unique dashboard sections:
  1. Dashboard - Today's summary
  2. Food Logging - Log meals
  3. Meal Plans - Weekly plans
  4. Health Metrics - Body composition
  5. Wearables - Device sync
  6. DNA Insights - Genetic profile
  7. Microbiome - Gut health
  8. Settings - Account management
- Form validation
- Visual feedback (progress bars, animations)
- Interactive cards & selections

---

## 🎯 Languages & Technologies

### **Backend:**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### **Frontend:**
- **HTML5** - Structure
- **CSS3** - Styling & animations
- **JavaScript (ES6+)** - Interactivity

### **Security:**
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **Input validation** - Data sanitization

---

## 🔧 Installation

### Prerequisites
1. Node.js (v14 or higher)
2. MongoDB (v4.4 or higher)

### Steps

#### 1. Start MongoDB
```bash
net start MongoDB
# or
mongod --dbpath C:\data\db
```

#### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 3. Start Server
```bash
node server.js
```

#### 4. Access Application
```
http://localhost:3000
```

---

## 📖 Documentation

- **README-DATABASE.md** - Complete database documentation
- **INSTALLATION-GUIDE.md** - Detailed installation steps
- **COMPLETE-SUMMARY.md** - Full feature overview
- **QUICK-START.md** - Quick reference guide

---

## 🎨 Folder Benefits

### **Why Separate Backend & Frontend?**

✅ **Organization** - Clear separation of concerns  
✅ **Scalability** - Easy to scale independently  
✅ **Deployment** - Can deploy separately  
✅ **Development** - Team members can work independently  
✅ **Maintenance** - Easier to maintain and debug  
✅ **Testing** - Can test backend and frontend separately  

### **Backend Folder Benefits:**
- Contains all server-side logic
- Manages database operations
- Handles authentication & sessions
- Can be deployed to cloud (Heroku, AWS, etc.)

### **Frontend Folder Benefits:**
- Contains all client-side files
- Static files served by backend
- Can be deployed to CDN
- Can be converted to SPA framework later (React, Vue, etc.)

---

## 🚀 Development

### Backend Development
```bash
cd backend
npm install
npm start
```

### Frontend Development
- All frontend files are in `frontend/`
- Edit HTML, CSS, JS files directly
- Refresh browser to see changes
- No build step required

---

## 📱 Testing the Application

### 1. Register New User
```
Email: test@example.com
Password: test123
Name: Test User
```

### 2. Complete Profile
- Age: 25
- Gender: Male
- Height: 170 cm
- Weight: 70 kg
- Goal: Lose Weight
- Activity: Moderately Active

### 3. Explore Dashboard
- Click each sidebar menu item
- See different sections load
- Check MongoDB for saved data

### 4. Verify Database
```bash
mongosh
use nutriwise360
db.users.find()
db.preferences.find()
```

---

## 🎉 You're All Set!

Your NutriWise360 application is now organized into:
- **Backend** - Server logic & database
- **Frontend** - User interface & interactivity

**Start building your personalized nutrition journey!** 🌿

---

## 📞 Quick Commands

```bash
# Start MongoDB
net start MongoDB

# Start Application
cd backend
npm start

# Check Database
mongosh
use nutriwise360
db.users.find()

# Stop Server
Ctrl + C
```

---

**Built with ❤️ using Node.js, Express, MongoDB, HTML, CSS, and JavaScript**
