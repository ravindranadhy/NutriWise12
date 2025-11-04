# 🔧 Backend - NutriWise360 Server

## 📁 Structure

```
backend/
├── server.js           # Main Express server
├── package.json        # Dependencies
└── node_modules/       # Installed packages
```

---

## 🚀 Technologies

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **connect-mongo** - MongoDB session store

---

## 📦 Installation

```bash
cd backend
npm install
```

---

## 🏃 Running the Server

### Development Mode (auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server will start on `http://localhost:3000`

---

## 🗄️ Database Connection

**MongoDB URL:** `mongodb://localhost:27017/nutriwise360`

Make sure MongoDB is running before starting the server:
```bash
net start MongoDB
# or
mongod --dbpath C:\data\db
```

---

## 🔐 API Endpoints

### Authentication

#### Register User
```
POST /api/register
Body: {
  email: string,
  password: string,
  name: string
}
Response: {
  success: boolean,
  user: object
}
```

#### Login
```
POST /api/login
Body: {
  email: string,
  password: string
}
Response: {
  success: boolean,
  user: object
}
```

#### Logout
```
POST /api/logout
Response: {
  success: boolean
}
```

#### Check Auth Status
```
GET /api/auth/check
Response: {
  authenticated: boolean,
  user: object
}
```

### User Preferences

#### Save Preferences
```
POST /api/preferences
Headers: Session cookie (authenticated)
Body: {
  age: number,
  gender: string,
  height: number,
  currentWeight: number,
  targetWeight: number,
  primaryGoal: string,
  activityLevel: string,
  dietType: string,
  allergies: string[],
  dislikedFoods: string[],
  healthConditions: string[]
}
Response: {
  success: boolean,
  preferences: object
}
```

#### Get Preferences
```
GET /api/preferences
Headers: Session cookie (authenticated)
Response: {
  success: boolean,
  preferences: object
}
```

### Food Logging

#### Log Food
```
POST /api/log/food
Headers: Session cookie (authenticated)
Body: {
  mealType: string,
  foodItems: array,
  date: string (optional)
}
Response: {
  success: boolean,
  dailyLog: object
}
```

#### Get Daily Log
```
GET /api/log/daily?date=YYYY-MM-DD
Headers: Session cookie (authenticated)
Response: {
  success: boolean,
  dailyLog: object
}
```

### Dashboard Data

#### Get Complete Dashboard Data
```
GET /api/dashboard
Headers: Session cookie (authenticated)
Response: {
  success: boolean,
  user: object,
  preferences: object,
  todayLog: object
}
```

---

## 🗂️ Database Schemas

### User Schema
```javascript
{
  email: String (unique, required),
  password: String (required, hashed),
  name: String (required),
  profileComplete: Boolean (default: false),
  createdAt: Date
}
```

### Preferences Schema
```javascript
{
  userId: ObjectId (ref: User),
  age: Number,
  gender: String (enum),
  height: Number,
  currentWeight: Number,
  targetWeight: Number,
  primaryGoal: String (enum),
  activityLevel: String (enum),
  dietType: String (enum),
  allergies: [String],
  dislikedFoods: [String],
  healthConditions: [String],
  targetCalories: Number,
  targetProtein: Number,
  targetCarbs: Number,
  targetFats: Number,
  updatedAt: Date
}
```

### Daily Log Schema
```javascript
{
  userId: ObjectId (ref: User),
  date: Date,
  meals: [{
    mealType: String,
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
  water: Number,
  weight: Number,
  totalCalories: Number,
  totalProtein: Number,
  totalCarbs: Number,
  totalFats: Number,
  createdAt: Date
}
```

---

## 🔐 Security Features

✅ **Password Hashing** - bcrypt with 10 salt rounds  
✅ **Session Management** - Secure HTTP-only cookies  
✅ **Input Validation** - Required fields and type checking  
✅ **Unique Constraints** - Prevents duplicate emails  
✅ **Protected Routes** - Authentication middleware  
✅ **Lowercase Emails** - Consistent email format  

---

## 🎯 Nutrition Calculation

### BMR (Basal Metabolic Rate)
**Mifflin-St Jeor Equation:**
```javascript
Male: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5
Female: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161
```

### TDEE (Total Daily Energy Expenditure)
```javascript
TDEE = BMR × Activity Multiplier

Activity Multipliers:
- Sedentary: 1.2
- Lightly Active: 1.375
- Moderately Active: 1.55
- Very Active: 1.725
- Extremely Active: 1.9
```

### Goal-Based Adjustments
```javascript
Lose Weight/Fat: Calories = TDEE - 500
Gain Weight: Calories = TDEE + 500
Build Muscle: Calories = TDEE + 300
Maintain Weight: Calories = TDEE
```

### Macro Distribution
```javascript
Protein: (Calories × Protein%) / 4
Carbs: (Calories × Carbs%) / 4
Fats: (Calories × Fats%) / 9
```

---

## 🔄 Middleware

### Authentication Middleware
```javascript
const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: 'Please login first' });
    }
};
```

Used on protected routes:
- `/api/preferences`
- `/api/log/food`
- `/api/log/daily`
- `/api/dashboard`
- `/preferences` (HTML)
- `/dashboard` (HTML)

---

## 📊 Session Configuration

```javascript
{
  secret: 'nutriwise360-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  store: MongoStore (MongoDB),
  cookie: {
    maxAge: 24 hours
  }
}
```

Sessions are stored in MongoDB `sessions` collection.

---

## 🛠️ Development Tips

### Testing API with curl

#### Register
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","name":"Test User"}'
```

#### Login
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}' \
  -c cookies.txt
```

#### Get Dashboard (with session)
```bash
curl http://localhost:3000/api/dashboard \
  -b cookies.txt
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB first
```bash
net start MongoDB
```

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
**Solution:** Change PORT in server.js or kill process
```bash
# Find process
netstat -ano | findstr :3000
# Kill process
taskkill /F /PID <PID>
```

### Session Not Persisting
**Solution:** Check MongoDB connection and clear browser cookies

---

## 📈 Future Enhancements

- [ ] Email verification
- [ ] Password reset
- [ ] JWT token authentication
- [ ] Rate limiting
- [ ] API documentation (Swagger)
- [ ] Unit tests (Jest)
- [ ] Integration tests
- [ ] Logging (Winston)
- [ ] Environment variables (.env)
- [ ] Production deployment config

---

## 🎯 Server Output

When server starts successfully:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:3000
📊 MongoDB connected to localhost:27017/nutriwise360
```

---

**Backend is ready to serve your nutrition tracking application!** 🚀
