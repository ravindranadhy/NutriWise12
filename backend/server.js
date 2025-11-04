const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/nutriwise360', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    profileComplete: { type: Boolean, default: false }
});

// User Preferences Schema
const preferencesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    
    // Basic Info
    age: { type: Number },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    height: { type: Number }, // in cm
    currentWeight: { type: Number }, // in kg
    targetWeight: { type: Number }, // in kg
    
    // Goals
    primaryGoal: { 
        type: String, 
        enum: ['lose_weight', 'gain_weight', 'build_muscle', 'lose_fat', 'maintain_weight', 'improve_health'],
        required: true 
    },
    activityLevel: { 
        type: String, 
        enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'],
        required: true 
    },
    
    // Dietary Preferences
    dietType: { 
        type: String, 
        enum: ['vegetarian', 'non_vegetarian', 'vegan', 'pescatarian', 'no_preference'],
        default: 'no_preference'
    },
    allergies: [{ type: String }],
    dislikedFoods: [{ type: String }],
    
    // Health Conditions
    healthConditions: [{ 
        type: String,
        enum: ['diabetes', 'hypertension', 'heart_disease', 'thyroid', 'pcos', 'none']
    }],
    
    // Calculated Values
    targetCalories: { type: Number },
    targetProtein: { type: Number },
    targetCarbs: { type: Number },
    targetFats: { type: Number },
    
    updatedAt: { type: Date, default: Date.now }
});

// Daily Logs Schema
const dailyLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    
    meals: [{
        mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snacks'] },
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
    
    water: { type: Number, default: 0 }, // glasses
    weight: { type: Number }, // daily weight
    
    totalCalories: { type: Number, default: 0 },
    totalProtein: { type: Number, default: 0 },
    totalCarbs: { type: Number, default: 0 },
    totalFats: { type: Number, default: 0 },
    
    createdAt: { type: Date, default: Date.now }
});

// Create indexes
dailyLogSchema.index({ userId: 1, date: -1 });

const User = mongoose.model('User', userSchema);
const Preferences = mongoose.model('Preferences', preferencesSchema);
const DailyLog = mongoose.model('DailyLog', dailyLogSchema);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Session configuration - Persistent login for 30 days
app.use(session({
    secret: 'nutriwise360-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/nutriwise360',
        ttl: 30 * 24 * 60 * 60 // 30 days
    }),
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        sameSite: 'lax'
    }
}));

// Authentication middleware
const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: 'Please login first' });
    }
};

// ==================== ROUTES ====================

// Register
app.post('/api/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        console.log('🆕 Registration attempt for:', email);
        
        // Validate input
        if (!email || !password || !name) {
            console.log('❌ Missing required fields');
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        // Normalize email to lowercase
        const normalizedEmail = email.toLowerCase().trim();
        
        // Check if user exists
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            console.log('❌ Email already registered:', normalizedEmail);
            return res.status(400).json({ error: 'Email already registered' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        console.log('✅ Creating user:', normalizedEmail);
        
        // Create user
        const user = new User({
            email: normalizedEmail,
            password: hashedPassword,
            name
        });
        
        await user.save();
        
        console.log('✅ User created successfully:', user.email);
        
        // Auto login after registration - save session
        req.session.userId = user._id;
        
        // Save session before responding
        req.session.save((err) => {
            if (err) {
                console.error('❌ Session save error:', err);
                return res.status(500).json({ error: 'Session creation failed' });
            }
            
            console.log('✅ Session created for new user:', user.email);
            
            res.json({ 
                success: true, 
                message: 'Registration successful',
                user: { id: user._id, email: user.email, name: user.name, profileComplete: false }
            });
        });
    } catch (error) {
        console.error('❌ Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('📧 Login attempt for:', email);
        
        // Validate input
        if (!email || !password) {
            console.log('❌ Missing email or password');
            return res.status(400).json({ error: 'Email and password are required' });
        }
        
        // Find user
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            console.log('❌ User not found:', email);
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        console.log('✅ User found:', user.email);
        
        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            console.log('❌ Invalid password for:', email);
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        console.log('✅ Password valid');
        
        // Create persistent session and save it
        req.session.userId = user._id;
        
        // Save session before sending response
        req.session.save((err) => {
            if (err) {
                console.error('❌ Session save error:', err);
                return res.status(500).json({ error: 'Session creation failed' });
            }
            
            console.log('✅ Session created for user:', user.email);
            
            res.json({ 
                success: true, 
                message: 'Login successful',
                user: { 
                    id: user._id, 
                    email: user.email, 
                    name: user.name,
                    profileComplete: user.profileComplete
                }
            });
        });
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Check authentication status
app.get('/api/auth/check', async (req, res) => {
    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId).select('-password');
            res.json({ authenticated: true, user });
        } catch (error) {
            res.json({ authenticated: false });
        }
    } else {
        res.json({ authenticated: false });
    }
});

// Save user preferences
app.post('/api/preferences', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;
        const {
            age, gender, height, currentWeight, targetWeight,
            primaryGoal, activityLevel, dietType,
            allergies, dislikedFoods, healthConditions
        } = req.body;
        
        // Calculate target calories and macros based on goals
        const { calories, protein, carbs, fats } = calculateNutritionTargets({
            age, gender, height, currentWeight, targetWeight,
            primaryGoal, activityLevel
        });
        
        // Update or create preferences
        const preferences = await Preferences.findOneAndUpdate(
            { userId },
            {
                userId,
                age, gender, height, currentWeight, targetWeight,
                primaryGoal, activityLevel, dietType,
                allergies: allergies || [],
                dislikedFoods: dislikedFoods || [],
                healthConditions: healthConditions || [],
                targetCalories: calories,
                targetProtein: protein,
                targetCarbs: carbs,
                targetFats: fats,
                updatedAt: new Date()
            },
            { upsert: true, new: true }
        );
        
        // Mark profile as complete
        await User.findByIdAndUpdate(userId, { profileComplete: true });
        
        res.json({ 
            success: true, 
            message: 'Preferences saved successfully',
            preferences 
        });
    } catch (error) {
        console.error('Preferences save error:', error);
        res.status(500).json({ error: 'Failed to save preferences' });
    }
});

// Get user preferences
app.get('/api/preferences', requireAuth, async (req, res) => {
    try {
        const preferences = await Preferences.findOne({ userId: req.session.userId });
        res.json({ success: true, preferences });
    } catch (error) {
        console.error('Get preferences error:', error);
        res.status(500).json({ error: 'Failed to get preferences' });
    }
});

// Log daily food
app.post('/api/log/food', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;
        const { mealType, foodItems, date } = req.body;
        
        const logDate = date ? new Date(date) : new Date();
        logDate.setHours(0, 0, 0, 0);
        
        // Calculate meal totals
        const mealCalories = foodItems.reduce((sum, item) => sum + (item.calories || 0), 0);
        
        // Find or create daily log
        let dailyLog = await DailyLog.findOne({ userId, date: logDate });
        
        if (!dailyLog) {
            dailyLog = new DailyLog({ userId, date: logDate, meals: [] });
        }
        
        // Add meal
        dailyLog.meals.push({
            mealType,
            foodItems,
            totalCalories: mealCalories
        });
        
        // Update totals
        dailyLog.totalCalories = dailyLog.meals.reduce((sum, meal) => sum + meal.totalCalories, 0);
        dailyLog.totalProtein = dailyLog.meals.reduce((sum, meal) => 
            sum + meal.foodItems.reduce((s, item) => s + (item.protein || 0), 0), 0);
        dailyLog.totalCarbs = dailyLog.meals.reduce((sum, meal) => 
            sum + meal.foodItems.reduce((s, item) => s + (item.carbs || 0), 0), 0);
        dailyLog.totalFats = dailyLog.meals.reduce((sum, meal) => 
            sum + meal.foodItems.reduce((s, item) => s + (item.fats || 0), 0), 0);
        
        await dailyLog.save();
        
        res.json({ success: true, message: 'Food logged successfully', dailyLog });
    } catch (error) {
        console.error('Food log error:', error);
        res.status(500).json({ error: 'Failed to log food' });
    }
});

// Get daily logs
app.get('/api/log/daily', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;
        const date = req.query.date ? new Date(req.query.date) : new Date();
        date.setHours(0, 0, 0, 0);
        
        const dailyLog = await DailyLog.findOne({ userId, date });
        res.json({ success: true, dailyLog });
    } catch (error) {
        console.error('Get daily log error:', error);
        res.status(500).json({ error: 'Failed to get daily log' });
    }
});

// Get user dashboard data
app.get('/api/dashboard', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const [user, preferences, todayLog] = await Promise.all([
            User.findById(userId).select('-password'),
            Preferences.findOne({ userId }),
            DailyLog.findOne({ userId, date: today })
        ]);
        
        res.json({ 
            success: true, 
            user,
            preferences,
            todayLog: todayLog || {
                totalCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFats: 0,
                water: 0,
                meals: []
            }
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: 'Failed to get dashboard data' });
    }
});

// Helper function to calculate nutrition targets
function calculateNutritionTargets({ age, gender, height, currentWeight, targetWeight, primaryGoal, activityLevel }) {
    // BMR calculation (Mifflin-St Jeor Equation)
    let bmr;
    if (gender === 'male') {
        bmr = 10 * currentWeight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * currentWeight + 6.25 * height - 5 * age - 161;
    }
    
    // Activity multiplier
    const activityMultipliers = {
        'sedentary': 1.2,
        'lightly_active': 1.375,
        'moderately_active': 1.55,
        'very_active': 1.725,
        'extremely_active': 1.9
    };
    
    let tdee = bmr * (activityMultipliers[activityLevel] || 1.2);
    
    // Adjust based on goal
    let calories = tdee;
    let proteinRatio = 0.3;
    let carbsRatio = 0.4;
    let fatsRatio = 0.3;
    
    switch (primaryGoal) {
        case 'lose_weight':
        case 'lose_fat':
            calories = tdee - 500; // 500 calorie deficit
            proteinRatio = 0.35;
            carbsRatio = 0.35;
            fatsRatio = 0.3;
            break;
        case 'gain_weight':
            calories = tdee + 500; // 500 calorie surplus
            proteinRatio = 0.25;
            carbsRatio = 0.5;
            fatsRatio = 0.25;
            break;
        case 'build_muscle':
            calories = tdee + 300; // 300 calorie surplus
            proteinRatio = 0.35;
            carbsRatio = 0.45;
            fatsRatio = 0.2;
            break;
        case 'maintain_weight':
            calories = tdee;
            break;
    }
    
    // Calculate macros (protein: 4 cal/g, carbs: 4 cal/g, fats: 9 cal/g)
    const protein = Math.round((calories * proteinRatio) / 4);
    const carbs = Math.round((calories * carbsRatio) / 4);
    const fats = Math.round((calories * fatsRatio) / 9);
    
    return {
        calories: Math.round(calories),
        protein,
        carbs,
        fats
    };
}

// Health check endpoint (for Docker, Kubernetes, load balancers)
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Serve HTML pages
app.get('/', async (req, res) => {
    // Check if user is already logged in
    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);
            if (user) {
                // User is logged in, redirect to appropriate page
                if (user.profileComplete) {
                    return res.redirect('/dashboard');
                } else {
                    return res.redirect('/preferences');
                }
            }
        } catch (error) {
            console.error('Session check error:', error);
        }
    }
    // Not logged in, show login page
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/preferences', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/preferences.html'));
});

app.get('/dashboard', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 MongoDB connected to localhost:27017/nutriwise360`);
});
