# 🚀 Quick Deployment Guide - NutriWise360

**Deploy your app in 15 minutes!** Follow these steps to get your NutriWise360 app live on the internet.

---

## 📦 Step 1: Setup MongoDB Atlas (Free Database)

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up for a free account

2. **Create a Free Cluster**
   - Click "Build a Database"
   - Select **"M0 FREE"** tier
   - Choose a cloud provider and region (select one closest to you)
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Create Database User**
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Authentication Method: Password
   - Username: `nutriwise_admin`
   - Password: Click "Autogenerate Secure Password" and **SAVE IT**
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Allow Network Access**
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (adds 0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" (left sidebar)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Driver: Node.js, Version: 5.5 or later
   - Copy the connection string, it looks like:
     ```
     mongodb+srv://nutriwise_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with the password you saved earlier
   - Add database name at the end: `...mongodb.net/nutriwise360?retryWrites=true&w=majority`

✅ **Your MongoDB connection string is ready!**

---

## 🌐 Step 2: Deploy to Render.com (Free Hosting)

1. **Create Render Account**
   - Visit: https://render.com/
   - Click "Get Started for Free"
   - Sign up with GitHub (recommended)

2. **Connect GitHub Repository**
   - In Render Dashboard, click "New +"
   - Select "Web Service"
   - Connect your GitHub account if not already connected
   - Select repository: `ravindranadhy/NutriWise12`
   - Click "Connect"

3. **Configure Web Service**
   Fill in the following details:
   
   - **Name**: `nutriwise360` (or any name you like)
   - **Region**: Choose closest to your location
   - **Branch**: `main`
   - **Root Directory**: Leave blank
   - **Runtime**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Instance Type**: `Free`

4. **Add Environment Variables**
   Scroll down to "Environment Variables" section and add these:
   
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `MONGODB_URI` | Paste your MongoDB Atlas connection string from Step 1 |
   | `SESSION_SECRET` | Click "Generate" or use a random 32+ character string |

5. **Deploy**
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment to complete
   - You'll see build logs in real-time

6. **Get Your Live URL**
   - Once deployed, you'll see: **"Your service is live 🎉"**
   - Your app URL will be: `https://nutriwise360.onrender.com`
   - Click the URL to open your app!

---

## ✅ Step 3: Test Your Deployment

1. Open your Render URL (e.g., `https://nutriwise360.onrender.com`)
2. Register a new account
3. Complete the preferences setup
4. Test the dashboard features
5. Log food, check analytics

---

## 🔧 Common Issues & Solutions

### Issue 1: "Application Error" or "Service Unavailable"
**Solution**: Check the logs in Render dashboard
- Click on your service
- Go to "Logs" tab
- Look for MongoDB connection errors
- Verify your `MONGODB_URI` is correct

### Issue 2: "Cannot connect to MongoDB"
**Solution**: 
- Verify IP whitelist includes `0.0.0.0/0` in MongoDB Atlas
- Check your connection string has the correct password
- Ensure database name is `nutriwise360` at the end of the URI

### Issue 3: "Session/Login not working"
**Solution**: 
- Verify `SESSION_SECRET` is set in Render environment variables
- Clear browser cookies and try again

### Issue 4: "Free instance spins down after inactivity"
**Note**: Render's free tier spins down after 15 minutes of inactivity. First request after spin down may take 30-60 seconds. This is normal for free tier.

---

## 🎉 Your App is Live!

**Your deployment link**: `https://[your-service-name].onrender.com`

Share this link with anyone - they can now access your NutriWise360 app!

---

## 📱 Optional: Custom Domain

Want a custom domain like `nutriwise.com`?

1. Buy a domain from Namecheap, GoDaddy, or Google Domains
2. In Render dashboard, go to your service
3. Click "Settings" → "Custom Domain"
4. Follow the instructions to add DNS records
5. Wait for SSL certificate (automatic, takes 5-10 minutes)

---

## 🔄 Update Your App

Whenever you make changes to your code:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Render will automatically detect the changes and redeploy! 🚀

---

## 💰 Cost Breakdown

- **MongoDB Atlas**: FREE (512MB storage)
- **Render Web Service**: FREE (750 hours/month)
- **Total Cost**: $0/month 🎉

---

## 📞 Need Help?

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Render Docs: https://render.com/docs
- Check logs in both platforms if something goes wrong

---

**Happy Deploying! 🚀**
