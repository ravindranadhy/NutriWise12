# 🚀 Deploy NutriWise360 to Render

**Complete step-by-step guide for deploying to Render.com**

---

## ✅ **Why Render?**

✅ **Free Tier Available** - Perfect for testing and small projects  
✅ **Easy Deployment** - Connect GitHub and deploy automatically  
✅ **Auto-Deploy** - Deploys on every git push  
✅ **Free SSL** - HTTPS enabled by default  
✅ **Great Performance** - Fast and reliable  
✅ **No Credit Card** - Free tier doesn't require payment info  

---

## 📋 **Prerequisites**

Before deploying to Render, you need:

1. ✅ **GitHub Account** - [github.com](https://github.com)
2. ✅ **Render Account** - [render.com](https://render.com) (free)
3. ✅ **MongoDB Atlas Account** - [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) (free)
4. ✅ **Your code pushed to GitHub**

---

## 🗄️ **STEP 1: Setup MongoDB Atlas**

Render doesn't provide MongoDB, so we'll use MongoDB Atlas (free tier).

### 1.1 Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"**
3. Sign up with email or Google

### 1.2 Create a Cluster

1. Choose **M0 (Free tier)**
2. Select **Cloud Provider**: AWS
3. Select **Region**: Closest to your users (e.g., Oregon, Mumbai)
4. Cluster Name: `nutriwise360-cluster`
5. Click **"Create Cluster"** (takes 3-5 minutes)

### 1.3 Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `nutriwise_admin`
5. Password: Click **"Autogenerate Secure Password"** (SAVE THIS!)
6. Database User Privileges: **Read and write to any database**
7. Click **"Add User"**

### 1.4 Whitelist IP Addresses

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
4. Click **"Confirm"**

⚠️ **Important:** For production, whitelist only Render's IP addresses.

### 1.5 Get Connection String

1. Go to **Database** → **Clusters**
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**
5. Version: **5.5 or later**
6. Copy the connection string:

```
mongodb+srv://nutriwise_admin:<password>@nutriwise360-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

7. Replace `<password>` with your actual password
8. Add database name at the end:

```
mongodb+srv://nutriwise_admin:YOUR_PASSWORD@nutriwise360-cluster.xxxxx.mongodb.net/nutriwise360?retryWrites=true&w=majority
```

✅ **Save this connection string - you'll need it for Render!**

---

## 📦 **STEP 2: Push Code to GitHub**

### 2.1 Initialize Git (if not already done)

```bash
cd c:\Users\ravin\Downloads\NutriWise\NutriWise

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - NutriWise360 ready for deployment"
```

### 2.2 Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **"+"** → **"New repository"**
3. Repository name: `nutriwise360`
4. Description: `Personalized nutrition tracking application`
5. Visibility: **Public** or **Private**
6. **DO NOT** initialize with README (you already have one)
7. Click **"Create repository"**

### 2.3 Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/nutriwise360.git

# Push code
git branch -M main
git push -u origin main
```

✅ **Your code is now on GitHub!**

---

## 🚀 **STEP 3: Deploy to Render**

### 3.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (recommended) or email

### 3.2 Connect GitHub

1. After signing up, you'll be asked to connect GitHub
2. Click **"Connect GitHub"**
3. Authorize Render to access your repositories
4. Select **"All repositories"** or choose `nutriwise360`

### 3.3 Create New Web Service

1. From Render Dashboard, click **"New +"**
2. Select **"Web Service"**
3. Find your `nutriwise360` repository
4. Click **"Connect"**

### 3.4 Configure Web Service

Fill in the following settings:

**Basic Settings:**
- **Name**: `nutriwise360` (or any name you prefer)
- **Region**: Choose closest to your users
  - 🇺🇸 Oregon (US West)
  - 🇺🇸 Ohio (US East)
  - 🇪🇺 Frankfurt (Europe)
  - 🇸🇬 Singapore (Asia)
- **Branch**: `main`
- **Root Directory**: Leave empty
- **Runtime**: **Node**

**Build & Deploy Settings:**
- **Build Command**: 
  ```bash
  cd backend && npm install
  ```
- **Start Command**: 
  ```bash
  cd backend && node server.js
  ```

**Instance Type:**
- Select **Free** (512 MB RAM, shared CPU)

### 3.5 Add Environment Variables

Scroll down to **Environment Variables** section.

Click **"Add Environment Variable"** for each:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `MONGODB_URI` | `mongodb+srv://nutriwise_admin:YOUR_PASSWORD@...` |
| `SESSION_SECRET` | Generate random 32-char string |
| `SESSION_MAX_AGE` | `86400000` |

**To generate SESSION_SECRET:**
```bash
# Option 1: Online generator
# Visit: https://randomkeygen.com/

# Option 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 3: PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

### 3.6 Advanced Settings (Optional)

**Health Check Path:**
- Set to: `/api/health`

**Auto-Deploy:**
- ✅ Enable (deploys automatically on git push)

### 3.7 Deploy!

1. Click **"Create Web Service"**
2. Render will start building your app
3. Watch the logs in real-time
4. Wait 3-5 minutes for deployment

---

## ✅ **STEP 4: Verify Deployment**

### 4.1 Check Build Logs

You'll see logs like:
```
==> Cloning from https://github.com/YOUR_USERNAME/nutriwise360...
==> Running build command 'cd backend && npm install'...
==> Installing dependencies...
==> Build successful!
==> Starting service with 'cd backend && node server.js'...
🚀 Server running on http://localhost:10000
📊 MongoDB connected to ...
✅ Connected to MongoDB
==> Your service is live 🎉
```

### 4.2 Access Your App

1. Render will provide a URL like:
   ```
   https://nutriwise360.onrender.com
   ```

2. Click the URL or copy it to your browser

3. You should see your login page! 🎉

### 4.3 Test Your App

1. **Register** a new account
2. **Complete** preferences
3. **Test** all features:
   - ✅ Dashboard loads
   - ✅ Food search works
   - ✅ Progress Analytics displays
   - ✅ User profile updates
   - ✅ Session persists

### 4.4 Check Health Endpoint

Visit: `https://nutriwise360.onrender.com/api/health`

You should see:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-04T10:30:00.000Z",
  "uptime": 123.45,
  "mongodb": "connected"
}
```

---

## 🔧 **STEP 5: Custom Domain (Optional)**

### 5.1 Add Custom Domain

1. In Render Dashboard, go to your service
2. Click **"Settings"**
3. Scroll to **"Custom Domains"**
4. Click **"Add Custom Domain"**
5. Enter your domain: `nutriwise360.com`

### 5.2 Configure DNS

Add these DNS records at your domain provider:

**For root domain (nutriwise360.com):**
```
Type: A
Name: @
Value: [Render's IP - shown in dashboard]
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: nutriwise360.onrender.com
```

### 5.3 SSL Certificate

- Render automatically provisions SSL certificates
- HTTPS will be enabled within minutes
- Free SSL via Let's Encrypt

---

## 🔄 **STEP 6: Auto-Deploy on Git Push**

Now whenever you push to GitHub, Render auto-deploys!

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main

# Render automatically:
# 1. Detects the push
# 2. Pulls latest code
# 3. Runs build command
# 4. Deploys new version
# 5. Zero-downtime deployment
```

---

## 📊 **Monitoring & Logs**

### View Logs

1. Go to Render Dashboard
2. Click your service
3. Click **"Logs"** tab
4. See real-time logs

### Metrics

1. Click **"Metrics"** tab
2. View:
   - CPU usage
   - Memory usage
   - Request count
   - Response times

### Alerts

1. Click **"Settings"**
2. Scroll to **"Notifications"**
3. Add email for deployment alerts

---

## ⚡ **Performance Tips**

### 1. Use Render's Free Tier Wisely

**Free Tier Limitations:**
- 512 MB RAM
- Shared CPU
- **Spins down after 15 minutes of inactivity**
- Spins up on first request (takes 30-60 seconds)

**Solutions:**
- Upgrade to paid tier ($7/month) for always-on
- Use cron job to ping every 10 minutes (keep alive)
- Accept cold starts for free tier

### 2. Keep-Alive Service (Optional)

Create a simple cron job:

```bash
# Use cron-job.org or UptimeRobot
# Ping: https://nutriwise360.onrender.com/api/health
# Interval: Every 10 minutes
```

### 3. Optimize Build Time

Your current build is already optimized:
```bash
cd backend && npm install
```

### 4. Database Connection Pooling

Already configured in your `server.js`:
```javascript
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

---

## 🐛 **Troubleshooting**

### Issue 1: Build Failed

**Error:** `npm install failed`

**Solution:**
```bash
# Check package.json exists in backend/
# Verify Node version in package.json
"engines": {
  "node": ">=18.0.0"
}
```

### Issue 2: MongoDB Connection Failed

**Error:** `MongooseError: connect ECONNREFUSED`

**Solutions:**
1. Check `MONGODB_URI` environment variable
2. Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
3. Check database user credentials
4. Ensure connection string includes database name

### Issue 3: Service Keeps Crashing

**Check Logs:**
1. Go to Render Dashboard → Logs
2. Look for error messages
3. Common issues:
   - Missing environment variables
   - Port conflicts (use `process.env.PORT`)
   - MongoDB connection issues

### Issue 4: 502 Bad Gateway

**Causes:**
- App crashed on startup
- Port mismatch
- Health check failing

**Solution:**
```javascript
// Ensure server.js uses Render's port
const PORT = process.env.PORT || 3000;
```

### Issue 5: Session Not Persisting

**Check:**
1. `SESSION_SECRET` is set
2. MongoDB is connected (sessions stored in DB)
3. Cookies are enabled in browser

---

## 💰 **Render Pricing**

### Free Tier
- ✅ **$0/month**
- ✅ 512 MB RAM
- ✅ Shared CPU
- ⚠️ Spins down after 15 min inactivity
- ✅ Free SSL
- ✅ Auto-deploy
- ✅ 100 GB bandwidth/month

### Starter Tier
- 💵 **$7/month**
- ✅ 512 MB RAM
- ✅ 0.5 CPU
- ✅ **Always on** (no spin down)
- ✅ Free SSL
- ✅ Auto-deploy
- ✅ 100 GB bandwidth/month

### Standard Tier
- 💵 **$25/month**
- ✅ 2 GB RAM
- ✅ 1 CPU
- ✅ Always on
- ✅ Everything in Starter

---

## 🔐 **Security Checklist**

Before going live:

- [ ] Strong `SESSION_SECRET` (32+ random characters)
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Strong database password
- [ ] HTTPS enabled (automatic on Render)
- [ ] Environment variables set (not hardcoded)
- [ ] `NODE_ENV=production`
- [ ] CORS configured for your domain
- [ ] Rate limiting enabled
- [ ] Input validation on all forms
- [ ] SQL injection protection (using Mongoose)

---

## 📈 **Scaling on Render**

### Vertical Scaling (Upgrade Instance)

1. Go to Settings
2. Change Instance Type:
   - Free → Starter ($7/mo)
   - Starter → Standard ($25/mo)
   - Standard → Pro ($85/mo)

### Horizontal Scaling (Multiple Instances)

1. Paid plans only
2. Settings → Scaling
3. Set number of instances
4. Load balancing automatic

---

## 🎉 **Deployment Complete!**

Your NutriWise360 app is now live on Render!

**Your Live URL:**
```
https://nutriwise360.onrender.com
```

**What You Get:**
- ✅ Live production app
- ✅ Free HTTPS/SSL
- ✅ Auto-deploy on git push
- ✅ Real-time logs
- ✅ Performance metrics
- ✅ 99.9% uptime
- ✅ Global CDN

---

## 📞 **Support**

**Render Documentation:**
- [docs.render.com](https://docs.render.com)

**MongoDB Atlas:**
- [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

**Common Issues:**
- Check logs first
- Verify environment variables
- Test MongoDB connection
- Check health endpoint

---

## 🚀 **Next Steps**

1. ✅ Share your app URL
2. ✅ Add custom domain
3. ✅ Set up monitoring
4. ✅ Configure backups
5. ✅ Add analytics
6. ✅ Implement CI/CD
7. ✅ Upgrade to paid tier (if needed)

---

**Congratulations! Your app is deployed! 🎊**

**Test it now:** `https://YOUR-APP-NAME.onrender.com`
