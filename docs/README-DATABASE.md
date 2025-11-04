# NutriWise360 - Database Setup Guide

## 🗄️ Database: MongoDB (localhost:27017)

### Database Structure

**Database Name:** `nutriwise360`

**Collections:**
1. **users** - User authentication data
2. **preferences** - User health goals and preferences
3. **dailylogs** - Daily food and activity logs
4. **sessions** - User session management

---

## 📊 Schema Details

### 1. Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, lowercase),
  password: String (hashed with bcrypt),
  name: String,
  profileComplete: Boolean,
  createdAt: Date
}
```

### 2. Preferences Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  
  // Basic Info
  age: Number,
  gender: String (male/female/other),
  height: Number (cm),
  currentWeight: Number (kg),
  targetWeight: Number (kg),
  
  // Goals
  primaryGoal: String (lose_weight/gain_weight/build_muscle/lose_fat/maintain_weight/improve_health),
  activityLevel: String (sedentary/lightly_active/moderately_active/very_active/extremely_active),
  
  // Diet
  dietType: String (vegetarian/non_vegetarian/vegan/pescatarian/no_preference),
  allergies: [String],
  dislikedFoods: [String],
  healthConditions: [String],
  
  // Calculated Targets
  targetCalories: Number,
  targetProtein: Number (grams),
  targetCarbs: Number (grams),
  targetFats: Number (grams),
  
  updatedAt: Date
}
```

### 3. Daily Logs Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  date: Date,
  
  meals: [{
    mealType: String (breakfast/lunch/dinner/snacks),
    foodItems: [{
      name: String,
      calories: Number,
      protein: Number,
      carbs: Number,
      fats: Number,
      quantity: String,
      time: Date
    }],
    totalCalories: Number
  }],
  
  water: Number (glasses),
  weight: Number (kg),
  
  totalCalories: Number,
  totalProtein: Number,
  totalCarbs: Number,
  totalFats: Number,
  
  createdAt: Date
}
```

---

## 🚀 Installation Steps

### 1. Install MongoDB
```bash
# Download MongoDB Community Server from:
# https://www.mongodb.com/try/download/community

# Or using Chocolatey (Windows):
choco install mongodb

# Verify installation:
mongod --version
```

### 2. Start MongoDB Server
```bash
# Windows:
mongod --dbpath C:\data\db

# Or as Windows Service:
net start MongoDB
```

### 3. Install Node.js Dependencies
```bash
cd C:\Users\barad\Downloads\NutriWise
npm install
```

### 4. Start the Application
```bash
# Development mode (auto-restart on changes):
npm run dev

# Production mode:
npm start
```

### 5. Access the Application
```
http://localhost:3000
```

---

## 🔐 API Endpoints

### Authentication
- `POST /api/register` - Create new account
- `POST /api/login` - Login
- `POST /api/logout` - Logout
- `GET /api/auth/check` - Check if authenticated

### Preferences
- `POST /api/preferences` - Save user preferences
- `GET /api/preferences` - Get user preferences

### Food Logging
- `POST /api/log/food` - Log a meal
- `GET /api/log/daily?date=YYYY-MM-DD` - Get daily logs

### Dashboard
- `GET /api/dashboard` - Get complete dashboard data

---

## 📝 User Flow

### 1. Registration/Login
```
User visits http://localhost:3000
  ↓
Shows login.html
  ↓
User registers or logs in
  ↓
Session created in MongoDB
```

### 2. First Time Setup
```
After registration
  ↓
Redirects to /preferences
  ↓
User fills out:
  - Age, gender, height, weight
  - Primary goal (lose weight, gain muscle, etc.)
  - Activity level
  - Diet preferences
  - Allergies & health conditions
  ↓
System calculates:
  - Target calories (BMR × activity multiplier ± goal adjustment)
  - Target macros (protein/carbs/fats)
  ↓
Saves to preferences collection
  ↓
Marks profileComplete = true
```

### 3. Dashboard Access
```
After profile setup
  ↓
Redirects to /dashboard (index.html)
  ↓
Loads user data from MongoDB:
  - User info
  - Preferences & targets
  - Today's food logs
  ↓
Shows personalized dashboard
```

### 4. Returning Users
```
User visits http://localhost:3000
  ↓
Checks session in MongoDB
  ↓
If authenticated:
  - profileComplete = true → /dashboard
  - profileComplete = false → /preferences
  ↓
If not authenticated → login.html
```

---

## 🎯 Goal-Based Calculations

### BMR (Basal Metabolic Rate)
**Mifflin-St Jeor Equation:**
- **Male:** BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5
- **Female:** BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161

### TDEE (Total Daily Energy Expenditure)
```
TDEE = BMR × Activity Multiplier

Activity Multipliers:
- Sedentary: 1.2
- Lightly Active: 1.375
- Moderately Active: 1.55
- Very Active: 1.725
- Extremely Active: 1.9
```

### Goal Adjustments
```
Lose Weight/Fat:
  Calories = TDEE - 500 (500 cal deficit)
  Protein: 35% | Carbs: 35% | Fats: 30%

Gain Weight:
  Calories = TDEE + 500 (500 cal surplus)
  Protein: 25% | Carbs: 50% | Fats: 25%

Build Muscle:
  Calories = TDEE + 300 (300 cal surplus)
  Protein: 35% | Carbs: 45% | Fats: 20%

Maintain Weight:
  Calories = TDEE
  Protein: 30% | Carbs: 40% | Fats: 30%
```

### Macro Calculation
```
Protein (g) = (Calories × Protein%) / 4
Carbs (g) = (Calories × Carbs%) / 4
Fats (g) = (Calories × Fats%) / 9
```

---

## 💾 Data Storage Examples

### Example User Document
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "ravi@example.com",
  "password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  "name": "Ravi Kumar",
  "profileComplete": true,
  "createdAt": "2025-11-03T10:00:00.000Z"
}
```

### Example Preferences Document
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "age": 28,
  "gender": "male",
  "height": 175,
  "currentWeight": 78,
  "targetWeight": 70,
  "primaryGoal": "lose_weight",
  "activityLevel": "moderately_active",
  "dietType": "vegetarian",
  "allergies": ["peanuts"],
  "dislikedFoods": ["broccoli"],
  "healthConditions": ["none"],
  "targetCalories": 2000,
  "targetProtein": 120,
  "targetCarbs": 250,
  "targetFats": 67,
  "updatedAt": "2025-11-03T10:05:00.000Z"
}
```

### Example Daily Log Document
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "date": "2025-11-03T00:00:00.000Z",
  "meals": [
    {
      "mealType": "breakfast",
      "foodItems": [
        {
          "name": "Masala Dosa",
          "calories": 350,
          "protein": 8,
          "carbs": 60,
          "fats": 10,
          "quantity": "1 piece",
          "time": "2025-11-03T08:30:00.000Z"
        },
        {
          "name": "Sambar",
          "calories": 100,
          "protein": 5,
          "carbs": 15,
          "fats": 2,
          "quantity": "1 bowl",
          "time": "2025-11-03T08:30:00.000Z"
        }
      ],
      "totalCalories": 450
    }
  ],
  "water": 6,
  "weight": 77.5,
  "totalCalories": 1450,
  "totalProtein": 85,
  "totalCarbs": 180,
  "totalFats": 45,
  "createdAt": "2025-11-03T08:30:00.000Z"
}
```

---

## 🔍 MongoDB Queries

### Check Users
```javascript
// In MongoDB Shell or Compass
use nutriwise360
db.users.find().pretty()
```

### Check Preferences
```javascript
db.preferences.find().pretty()
```

### Check Today's Logs
```javascript
db.dailylogs.find({
  date: {
    $gte: new Date(new Date().setHours(0,0,0,0)),
    $lt: new Date(new Date().setHours(23,59,59,999))
  }
}).pretty()
```

### Get User's Complete Data
```javascript
const userId = ObjectId("507f1f77bcf86cd799439011");

// User info
db.users.findOne({ _id: userId });

// Preferences
db.preferences.findOne({ userId: userId });

// Recent logs
db.dailylogs.find({ userId: userId }).sort({ date: -1 }).limit(7);
```

---

## 🛠️ Troubleshooting

### MongoDB Not Starting
```bash
# Check if MongoDB is running:
tasklist | findstr mongod

# Start MongoDB service:
net start MongoDB

# Or manually:
mongod --dbpath C:\data\db
```

### Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running on port 27017

### Session Issues
```
Error: Session store not available
```
**Solution:** Check MongoDB connection and ensure connect-mongo is installed

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** Change PORT in server.js or kill process using port 3000

---

## 📦 Dependencies Explained

- **express** - Web framework for Node.js
- **mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **connect-mongo** - MongoDB session store
- **nodemon** - Auto-restart server on changes (dev only)

---

## 🔒 Security Features

✅ **Password Hashing** - bcrypt with salt rounds  
✅ **Session Management** - Secure session cookies  
✅ **Input Validation** - Required fields and type checking  
✅ **Unique Email** - Prevents duplicate accounts  
✅ **Protected Routes** - Authentication middleware  

---

## 📈 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] OAuth (Google, Facebook login)
- [ ] Two-factor authentication
- [ ] Data export (PDF, CSV)
- [ ] Meal photo upload & AI recognition
- [ ] Barcode scanning integration
- [ ] Wearable device sync
- [ ] Social features (friends, challenges)
- [ ] Nutrition insights & reports

---

**Your NutriWise360 database is ready! 🎉**

Start the server and begin your personalized nutrition journey!
