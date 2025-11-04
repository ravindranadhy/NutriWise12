# ⚡ Render Quick Start - 5 Minutes

**Deploy NutriWise360 to Render in 5 minutes!**

---

## 🎯 **Quick Checklist**

- [ ] MongoDB Atlas account created
- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Environment variables ready

---

## 📝 **Step-by-Step (5 Minutes)**

### **1️⃣ MongoDB Atlas (2 min)**

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up → Create **M0 Free** cluster
3. Create database user: `nutriwise_admin` + password
4. Network Access → **Allow 0.0.0.0/0**
5. Get connection string:
   ```
   mongodb+srv://nutriwise_admin:PASSWORD@cluster.mongodb.net/nutriwise360
   ```

### **2️⃣ Push to GitHub (1 min)**

```bash
cd c:\Users\ravin\Downloads\NutriWise\NutriWise
git init
git add .
git commit -m "Deploy to Render"
git remote add origin https://github.com/YOUR_USERNAME/nutriwise360.git
git push -u origin main
```

### **3️⃣ Deploy to Render (2 min)**

1. Go to [render.com](https://render.com) → Sign up with GitHub
2. **New +** → **Web Service**
3. Connect `nutriwise360` repository
4. Configure:
   - **Name**: `nutriwise360`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node server.js`
   - **Instance Type**: **Free**

5. **Add Environment Variables:**
   ```
   NODE_ENV = production
   PORT = 10000
   MONGODB_URI = mongodb+srv://nutriwise_admin:PASSWORD@...
   SESSION_SECRET = [32 random characters]
   ```

6. Click **"Create Web Service"**

### **4️⃣ Wait & Test (1-2 min)**

- Wait for build to complete
- Visit: `https://YOUR-APP-NAME.onrender.com`
- Register and test! 🎉

---

## ✅ **Done!**

Your app is live at: `https://YOUR-APP-NAME.onrender.com`

**Full guide:** See `RENDER-DEPLOYMENT.md`

---

## 🔑 **Generate SESSION_SECRET**

```bash
# PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})

# Or use: https://randomkeygen.com/
```

---

## ⚠️ **Important Notes**

1. **Free tier spins down** after 15 min inactivity
2. **First request** takes 30-60 seconds (cold start)
3. **Upgrade to $7/mo** for always-on
4. **Auto-deploys** on every git push

---

## 🐛 **Quick Troubleshooting**

**Build failed?**
- Check `backend/package.json` exists
- Verify build command

**Can't connect to MongoDB?**
- Check MONGODB_URI is correct
- Verify IP whitelist: `0.0.0.0/0`
- Check database user credentials

**App crashes?**
- View logs in Render dashboard
- Check environment variables
- Verify PORT is `10000`

---

**Need help?** Read `RENDER-DEPLOYMENT.md` for detailed guide!
