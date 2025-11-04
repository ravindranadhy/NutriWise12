# ⚡ NutriWise360 - Quick Start Guide

## 🚀 Start in 3 Steps

### Step 1: Start MongoDB
```bash
net start MongoDB
```

### Step 2: Install & Run
```bash
cd C:\Users\barad\Downloads\NutriWise
npm install
npm start
```

### Step 3: Open Browser
```
http://localhost:3000
```

---

## 📝 First Time Setup

### 1. Register Account
- Email: `your@email.com`
- Password: `your_password`
- Name: `Your Name`

### 2. Complete Profile
- Age, Gender, Height, Weight
- Goal: Lose Weight / Gain Weight / Build Muscle / etc.
- Activity Level: Sedentary to Extremely Active
- Diet: Vegetarian / Non-Veg / Vegan / etc.
- Allergies & Dislikes (optional)

### 3. Use Dashboard
- Click sidebar items to navigate
- Each section shows different content
- All data saved to MongoDB

---

## 🗂️ Languages Used

1. **HTML** - Structure
2. **CSS** - Styling
3. **JavaScript** - Interactivity
4. **Node.js** - Backend
5. **MongoDB** - Database

---

## 📊 Database Info

**Connection:** `mongodb://localhost:27017/nutriwise360`

**Collections:**
- `users` - Authentication
- `preferences` - User goals & settings
- `dailylogs` - Food logs
- `sessions` - Login sessions

---

## 🎯 Key Features

✅ Secure login with password hashing  
✅ Personalized profile setup  
✅ Smart nutrition calculation  
✅ 8 dynamic dashboard sections  
✅ Data persistence in MongoDB  
✅ Responsive design  

---

## 🔧 Troubleshooting

**MongoDB won't start?**
```bash
mongod --dbpath C:\data\db
```

**Port 3000 in use?**
```bash
# Change PORT in server.js to 3001
```

**Dependencies missing?**
```bash
npm install
```

---

## 📱 Dashboard Sections

1. **Dashboard** - Today's summary
2. **Food Logging** - Log meals
3. **Meal Plans** - Weekly plans
4. **Health Metrics** - Weight & body composition
5. **Wearables** - Connected devices
6. **DNA Insights** - Genetic profile
7. **Microbiome** - Gut health
8. **Settings** - Account settings

---

## 🎉 You're Ready!

**Your complete nutrition tracking app is running!**

Open `http://localhost:3000` and start your journey! 🌿
