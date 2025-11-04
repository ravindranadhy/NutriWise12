# 🚀 NutriWise360 - Complete Installation Guide

## Prerequisites

### 1. Install Node.js
```bash
# Download from: https://nodejs.org/
# Verify installation:
node --version
npm --version
```

### 2. Install MongoDB
```bash
# Download from: https://www.mongodb.com/try/download/community
# Or using Chocolatey (Windows):
choco install mongodb

# Verify installation:
mongod --version
```

---

## Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd C:\Users\barad\Downloads\NutriWise
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- express-session
- connect-mongo

### Step 3: Create MongoDB Data Directory
```bash
# Create data directory:
mkdir C:\data\db
```

### Step 4: Start MongoDB Server
```bash
# Option 1: Start as service (if installed as service)
net start MongoDB

# Option 2: Start manually
mongod --dbpath C:\data\db
```

**Keep this terminal open!**

### Step 5: Start NutriWise360 Server
Open a **NEW terminal** and run:
```bash
cd C:\Users\barad\Downloads\NutriWise
npm start
```

**Or for development (auto-restart):**
```bash
npm run dev
```

### Step 6: Access the Application
Open your browser and go to:
```
http://localhost:3000
```

---

## 🎯 Complete User Flow

### 1. Registration
```
http://localhost:3000
  ↓
Click "Sign Up" tab
  ↓
Enter:
  - Full Name: Ravi Kumar
  - Email: ravi@example.com
  - Password: ******
  - Confirm Password: ******
  ↓
Click "Create Account"
  ↓
Account created in MongoDB users collection
```

### 2. Profile Setup
```
Automatically redirects to /preferences
  ↓
Fill Basic Information:
  - Age: 28
  - Gender: Male
  - Height: 175 cm
  - Current Weight: 78 kg
  - Target Weight: 70 kg
  ↓
Select Primary Goal:
  - Choose: "Lose Weight" 📉
  ↓
Select Activity Level:
  - Choose: "Moderately Active" 🏃
  ↓
Select Diet Type:
  - Choose: "Vegetarian" 🥬
  ↓
Add Allergies (optional):
  - Type "peanuts" and press Enter
  - Type "dairy" and press Enter
  ↓
Add Disliked Foods (optional):
  - Type "broccoli" and press Enter
  ↓
Select Health Conditions (optional):
  - Check: "None"
  ↓
Click "Complete Setup →"
  ↓
System calculates:
  - Target Calories: 2000 kcal
  - Target Protein: 120g
  - Target Carbs: 250g
  - Target Fats: 67g
  ↓
Saves to MongoDB preferences collection
```

### 3. Dashboard Access
```
Automatically redirects to /dashboard
  ↓
Shows personalized dashboard with:
  - Welcome message with your name
  - Today's nutrition summary
  - Target calories and macros
  - Quick action buttons
  - Navigation menu
```

### 4. Using the Dashboard

**Navigate Sections:**
- Click "Food Logging" → See food logging interface
- Click "Meal Plans" → See weekly meal plans
- Click "Health Metrics" → See weight and body composition
- Click "Wearables" → See connected devices
- Click "DNA Insights" → See genetic profile
- Click "Microbiome" → See gut health score
- Click "Settings" → See account settings

**Each section shows different content dynamically!**

---

## 📊 Database Verification

### Check MongoDB Data
```bash
# Open MongoDB Shell
mongosh

# Switch to database
use nutriwise360

# View all users
db.users.find().pretty()

# View preferences
db.preferences.find().pretty()

# View daily logs
db.dailylogs.find().pretty()
```

### Example Data After Registration

**Users Collection:**
```json
{
  "_id": ObjectId("..."),
  "email": "ravi@example.com",
  "name": "Ravi Kumar",
  "profileComplete": true,
  "createdAt": ISODate("2025-11-03T10:00:00Z")
}
```

**Preferences Collection:**
```json
{
  "_id": ObjectId("..."),
  "userId": ObjectId("..."),
  "age": 28,
  "gender": "male",
  "height": 175,
  "currentWeight": 78,
  "targetWeight": 70,
  "primaryGoal": "lose_weight",
  "activityLevel": "moderately_active",
  "dietType": "vegetarian",
  "allergies": ["peanuts", "dairy"],
  "dislikedFoods": ["broccoli"],
  "healthConditions": ["none"],
  "targetCalories": 2000,
  "targetProtein": 120,
  "targetCarbs": 250,
  "targetFats": 67
}
```

---

## 🔧 Troubleshooting

### Problem: MongoDB won't start
```
Error: Failed to start MongoDB
```
**Solution:**
```bash
# Check if already running:
tasklist | findstr mongod

# Kill existing process:
taskkill /F /IM mongod.exe

# Start fresh:
mongod --dbpath C:\data\db
```

### Problem: Port 3000 already in use
```
Error: EADDRINUSE :::3000
```
**Solution:**
```bash
# Find process using port 3000:
netstat -ano | findstr :3000

# Kill the process (replace PID):
taskkill /F /PID <PID>

# Or change port in server.js:
const PORT = 3001;
```

### Problem: npm install fails
```
Error: Cannot find module 'express'
```
**Solution:**
```bash
# Delete node_modules and package-lock.json:
rmdir /s /q node_modules
del package-lock.json

# Reinstall:
npm install
```

### Problem: Session not persisting
```
Error: Session store unavailable
```
**Solution:**
- Ensure MongoDB is running
- Check connection string in server.js
- Clear browser cookies and try again

### Problem: Can't login after registration
```
Error: Invalid email or password
```
**Solution:**
- Check if user exists in database:
  ```bash
  mongosh
  use nutriwise360
  db.users.find({ email: "your@email.com" })
  ```
- Try registering with a new email
- Check server console for errors

---

## 🎨 Features Overview

### ✅ Authentication System
- Secure registration with password hashing
- Login with session management
- Auto-redirect based on profile completion
- Logout functionality

### ✅ Profile Setup
- Comprehensive user information collection
- Goal-based nutrition calculation
- Activity level assessment
- Dietary preferences
- Allergy and food avoidance tracking
- Health condition consideration

### ✅ Dynamic Dashboard
- 8 different sections with unique content
- Real-time navigation without page reload
- Personalized data display
- Interactive elements

### ✅ Database Integration
- MongoDB for data persistence
- Structured collections for users, preferences, and logs
- Session storage in MongoDB
- Efficient data retrieval

---

## 📁 Project Structure

```
NutriWise/
├── server.js                 # Express server with MongoDB
├── package.json              # Dependencies
├── login.html                # Login/Register page
├── preferences.html          # Profile setup page
├── index.html                # Dashboard (main app)
├── app.html                  # Dashboard copy
├── dashboard-style.css       # Dashboard styling
├── app-script.js            # Dashboard interactivity
├── sections.js              # Section HTML content
├── features.html            # Features page
├── how-it-works.html        # How it works page
├── science.html             # Science page
├── get-started.html         # Get started page
├── demo.html                # Demo page
├── README-DATABASE.md       # Database documentation
└── INSTALLATION-GUIDE.md    # This file
```

---

## 🔐 Security Features

✅ **Password Hashing** - bcrypt with 10 salt rounds  
✅ **Session Management** - Secure HTTP-only cookies  
✅ **Input Validation** - Required fields and type checking  
✅ **Unique Constraints** - Prevents duplicate emails  
✅ **Protected Routes** - Authentication middleware  
✅ **XSS Protection** - Input sanitization  

---

## 📈 Next Steps

### Test the Complete Flow:
1. ✅ Register a new account
2. ✅ Complete profile setup
3. ✅ Explore dashboard sections
4. ✅ Check MongoDB data
5. ✅ Logout and login again
6. ✅ Verify data persistence

### Future Enhancements:
- [ ] Food logging functionality
- [ ] Meal plan generation
- [ ] Progress tracking charts
- [ ] Wearable device integration
- [ ] Photo-based food recognition
- [ ] Barcode scanning
- [ ] Social features
- [ ] Export reports (PDF/CSV)

---

## 🎉 You're All Set!

Your NutriWise360 application is now running with:
- ✅ MongoDB database (localhost:27017)
- ✅ Express server (localhost:3000)
- ✅ User authentication
- ✅ Profile management
- ✅ Dynamic dashboard
- ✅ Data persistence

**Start your personalized nutrition journey!** 🌿

---

## 📞 Quick Commands Reference

```bash
# Start MongoDB
net start MongoDB
# or
mongod --dbpath C:\data\db

# Start Application
npm start

# Development Mode (auto-restart)
npm run dev

# Check MongoDB Data
mongosh
use nutriwise360
db.users.find()
db.preferences.find()

# Stop MongoDB
net stop MongoDB

# Kill Node Process
taskkill /F /IM node.exe
```

---

**Happy Coding! 🚀**
