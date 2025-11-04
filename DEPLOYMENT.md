# 🚀 NutriWise360 Deployment Guide

Complete guide for deploying NutriWise360 to various platforms.

---

## 📋 **Table of Contents**
1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Docker Deployment](#docker-deployment)
4. [Heroku Deployment](#heroku-deployment)
5. [Vercel Deployment](#vercel-deployment)
6. [Netlify Deployment](#netlify-deployment)
7. [AWS/DigitalOcean Deployment](#vps-deployment)
8. [Environment Variables](#environment-variables)
9. [Database Setup](#database-setup)
10. [Troubleshooting](#troubleshooting)

---

## ✅ **Prerequisites**

### Required Software:
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB** >= 7.0 (local or Atlas)
- **Git** (for version control)

### Optional:
- **Docker** & **Docker Compose** (for containerized deployment)
- **Heroku CLI** (for Heroku deployment)
- **Vercel CLI** (for Vercel deployment)

---

## 💻 **Local Development**

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/nutriwise360.git
cd nutriwise360
```

### Step 2: Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Return to root
cd ..
```

### Step 3: Setup Environment Variables
```bash
# Copy example env file
cp .env.example backend/.env

# Edit backend/.env with your values
# Required: MONGODB_URI, SESSION_SECRET
```

### Step 4: Start MongoDB
```bash
# Option 1: Local MongoDB
mongod --dbpath ./data

# Option 2: MongoDB Atlas
# Use connection string in .env
```

### Step 5: Run Application
```bash
# From root directory
npm start

# Or with auto-reload
npm run dev
```

### Step 6: Access Application
```
http://localhost:3000
```

---

## 🐳 **Docker Deployment**

### Quick Start with Docker Compose

```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Manual Docker Build

```bash
# Build image
docker build -t nutriwise360 .

# Run container
docker run -d \
  -p 3000:3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/nutriwise360 \
  -e SESSION_SECRET=your-secret-key \
  --name nutriwise-app \
  nutriwise360
```

### Docker Commands

```bash
# View running containers
docker ps

# View logs
docker logs -f nutriwise-app

# Stop container
docker stop nutriwise-app

# Remove container
docker rm nutriwise-app

# Remove image
docker rmi nutriwise360
```

---

## 🌐 **Heroku Deployment**

### Prerequisites
```bash
# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login
```

### Deployment Steps

```bash
# 1. Create Heroku app
heroku create nutriwise360-app

# 2. Add MongoDB addon
heroku addons:create mongolab:sandbox

# 3. Set environment variables
heroku config:set SESSION_SECRET=your-super-secret-key
heroku config:set NODE_ENV=production

# 4. Deploy
git push heroku main

# 5. Open app
heroku open

# 6. View logs
heroku logs --tail
```

### Heroku Config

The `Procfile` is already configured:
```
web: cd backend && node server.js
```

---

## ⚡ **Vercel Deployment**

### Prerequisites
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login
```

### Deployment Steps

```bash
# 1. Deploy to Vercel
vercel

# 2. Set environment variables
vercel env add MONGODB_URI
vercel env add SESSION_SECRET

# 3. Deploy to production
vercel --prod
```

### Vercel Dashboard Setup

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set environment variables:
   - `MONGODB_URI`
   - `SESSION_SECRET`
4. Deploy

**Note:** `vercel.json` is already configured.

---

## 🌊 **Netlify Deployment**

### Prerequisites
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login
```

### Deployment Steps

```bash
# 1. Initialize Netlify
netlify init

# 2. Set environment variables
netlify env:set MONGODB_URI "your-mongodb-uri"
netlify env:set SESSION_SECRET "your-secret-key"

# 3. Deploy
netlify deploy --prod
```

### Netlify Dashboard Setup

1. Go to [netlify.com](https://netlify.com)
2. Import repository
3. Build settings:
   - Build command: `cd backend && npm install`
   - Publish directory: `frontend`
4. Environment variables:
   - Add `MONGODB_URI`
   - Add `SESSION_SECRET`
5. Deploy

**Note:** `netlify.toml` is already configured.

---

## 🖥️ **VPS Deployment (AWS/DigitalOcean/Linode)**

### Prerequisites
- Ubuntu 22.04 LTS server
- SSH access
- Domain name (optional)

### Step 1: Server Setup

```bash
# SSH into server
ssh root@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Install PM2 (Process Manager)
sudo npm install -g pm2
```

### Step 2: Deploy Application

```bash
# Clone repository
cd /var/www
git clone https://github.com/yourusername/nutriwise360.git
cd nutriwise360

# Install dependencies
cd backend
npm install --production

# Create .env file
nano .env
# Add your environment variables

# Start with PM2
pm2 start server.js --name nutriwise360
pm2 save
pm2 startup
```

### Step 3: Setup Nginx (Optional)

```bash
# Install Nginx
sudo apt install -y nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/nutriwise360
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/nutriwise360 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 4: SSL Certificate (Optional)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 🔐 **Environment Variables**

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `production` |
| `MONGODB_URI` | MongoDB connection | `mongodb://localhost:27017/nutriwise360` |
| `SESSION_SECRET` | Session encryption key | `random-32-char-string` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `FRONTEND_URL` | Frontend URL | `https://nutriwise360.com` |
| `ALLOWED_ORIGINS` | CORS origins | `https://app.nutriwise360.com` |
| `SESSION_MAX_AGE` | Session duration (ms) | `86400000` (24 hours) |

### Setting Environment Variables

**Local (.env file):**
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/nutriwise360
SESSION_SECRET=your-secret-key-here
```

**Heroku:**
```bash
heroku config:set VARIABLE_NAME=value
```

**Vercel:**
```bash
vercel env add VARIABLE_NAME
```

**Docker:**
```bash
docker run -e VARIABLE_NAME=value ...
```

---

## 🗄️ **Database Setup**

### MongoDB Atlas (Recommended for Production)

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create Cluster**
   - Choose region closest to your users
   - Select M0 (Free tier)

3. **Setup Database User**
   - Database Access → Add New User
   - Username: `nutriwise_admin`
   - Password: Generate secure password

4. **Whitelist IP**
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allow from anywhere) or specific IPs

5. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your password
   - Example: `mongodb+srv://nutriwise_admin:password@cluster0.xxxxx.mongodb.net/nutriwise360?retryWrites=true&w=majority`

6. **Update Environment Variable**
   ```bash
   MONGODB_URI=mongodb+srv://nutriwise_admin:password@cluster0.xxxxx.mongodb.net/nutriwise360?retryWrites=true&w=majority
   ```

### Local MongoDB

```bash
# Start MongoDB
mongod --dbpath ./data

# Connection string
MONGODB_URI=mongodb://localhost:27017/nutriwise360
```

---

## 🐛 **Troubleshooting**

### Common Issues

#### 1. **Port Already in Use**
```bash
# Find process using port 3000
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

#### 2. **MongoDB Connection Failed**
```bash
# Check MongoDB is running
sudo systemctl status mongod  # Linux
brew services list  # Mac

# Check connection string
# Ensure IP is whitelisted (Atlas)
# Ensure username/password are correct
```

#### 3. **Module Not Found**
```bash
# Reinstall dependencies
cd backend
rm -rf node_modules package-lock.json
npm install
```

#### 4. **Session Issues**
```bash
# Clear browser cookies
# Regenerate SESSION_SECRET
# Restart server
```

#### 5. **CORS Errors**
```bash
# Add your frontend URL to ALLOWED_ORIGINS
# Check server.js CORS configuration
```

### Logs

**View Application Logs:**
```bash
# PM2
pm2 logs nutriwise360

# Docker
docker logs -f nutriwise-app

# Heroku
heroku logs --tail

# Local
# Check console output
```

---

## 📊 **Performance Optimization**

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas (not local)
- [ ] Enable HTTPS/SSL
- [ ] Use CDN for static files
- [ ] Enable gzip compression
- [ ] Set up monitoring (PM2, New Relic)
- [ ] Configure log rotation
- [ ] Set up automated backups
- [ ] Use environment variables (never hardcode secrets)
- [ ] Enable rate limiting
- [ ] Set up health checks

---

## 🔒 **Security Best Practices**

1. **Never commit `.env` files**
2. **Use strong SESSION_SECRET** (32+ random characters)
3. **Enable HTTPS** in production
4. **Whitelist specific IPs** in MongoDB Atlas
5. **Use strong database passwords**
6. **Keep dependencies updated**: `npm audit fix`
7. **Enable CORS** only for trusted origins
8. **Implement rate limiting**
9. **Use helmet.js** for security headers
10. **Regular security audits**

---

## 📞 **Support**

For deployment issues:
- Check logs first
- Review this guide
- Check MongoDB connection
- Verify environment variables
- Test locally before deploying

---

## 🎉 **Deployment Complete!**

Your NutriWise360 application should now be live!

**Test your deployment:**
1. Visit your deployed URL
2. Register a new account
3. Complete preferences
4. Test all features
5. Monitor logs for errors

**Next Steps:**
- Set up monitoring
- Configure backups
- Add custom domain
- Enable SSL/HTTPS
- Set up CI/CD pipeline

---

**Happy Deploying! 🚀**
