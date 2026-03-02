# 🌐 Global Deployment Guide - Anonymous Feedback App

## 📋 Table of Contents
1. [Domain Name Setup](#domain-name-setup)
2. [Railway.app Deployment (Recommended)](#railwayapp-deployment)
3. [Alternative Deployment Options](#alternative-deployment-options)
4. [Environment Variables](#environment-variables)
5. [Custom Domain Configuration](#custom-domain-configuration)

---

## 🌍 Domain Name Setup

### Step 1: Buy a Domain

**Recommended Domain Registrars:**
- **Namecheap** (https://www.namecheap.com) - Best prices
- **GoDaddy** (https://www.godaddy.com) - Most popular
- **Google Domains** (https://domains.google) - Simple
- **Cloudflare** (https://www.cloudflare.com) - Cheapest

**Suggested Domain Names:**
1. **feedhub.app** - Professional & memorable
2. **truthbox.io** - Catchy
3. **anonvoice.com** - Clear purpose
4. **whisperbox.app** - Creative
5. **honestfeed.com** - Trustworthy

**Cost**: $10-15/year

---

## 🚀 Railway.app Deployment (Easiest & Recommended)

### Why Railway?
- ✅ $5 free credit every month
- ✅ PostgreSQL included (free)
- ✅ Auto-deployment from GitHub
- ✅ Custom domain support
- ✅ Easy to use

### Step 1: Push Code to GitHub

1. **Create a GitHub account** (if you don't have one): https://github.com
2. **Create a new repository**: Click "New" button
3. **Name it**: `anonymous-feedback-app`
4. **Keep it Private** (recommended)

5. **Push your code** (run these commands in your project folder):

```bash
cd D:\GitHubProjects\anonymous-feedback-app

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Anonymous Feedback App"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/anonymous-feedback-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend on Railway

1. **Go to Railway**: https://railway.app
2. **Sign up** with GitHub account
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your repository: `anonymous-feedback-app`
6. Railway will auto-detect Spring Boot

7. **Add PostgreSQL Database:**
   - Click **"+ New"** button
   - Select **"Database"** → **"PostgreSQL"**
   - Railway will create a database and auto-configure the connection

8. **Set Environment Variables** (click on your service → Variables):

```
SPRING_PROFILES_ACTIVE=prod
PORT=8080
FRONTEND_URL=https://your-frontend-domain.com
JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
BASE_URL=https://your-backend-domain.railway.app
```

9. **Deploy!** - Railway will automatically deploy your backend

10. **Get your backend URL**:
    - Click on your service → Settings → Generate Domain
    - You'll get something like: `https://anonymous-feedback-app-production.up.railway.app`

### Step 3: Deploy Frontend on Vercel/Netlify

#### Option A: Vercel (Recommended for React)

1. **Go to Vercel**: https://vercel.com
2. **Sign up** with GitHub
3. Click **"Add New Project"**
4. Select your GitHub repository
5. **Configure Build Settings:**
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
6. **Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-domain.railway.app/api
   ```
7. Click **"Deploy"**
8. You'll get a URL like: `https://anonymous-feedback-app.vercel.app`

#### Option B: Netlify

1. **Go to Netlify**: https://www.netlify.com
2. **Sign up** with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Select your GitHub repository
5. **Configure:**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
6. **Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend-domain.railway.app/api
   ```
7. Click **"Deploy site"**

### Step 4: Update Frontend API Configuration

Update `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';
```

### Step 5: Configure Custom Domain

#### For Backend (Railway):
1. Go to your Railway project
2. Click on your service → Settings → Domains
3. Click "Custom Domain"
4. Enter: `api.yourdomain.com`
5. Add CNAME record in your domain registrar pointing to Railway's domain

#### For Frontend (Vercel/Netlify):
1. Go to your project settings
2. Click "Domains"
3. Add custom domain: `yourdomain.com` or `www.yourdomain.com`
4. Add DNS records as instructed

**DNS Records Example:**
- **A Record**: `@` → Vercel/Netlify IP
- **CNAME**: `www` → `your-project.vercel.app`
- **CNAME**: `api` → `your-project.up.railway.app`

---

## 💰 Cost Breakdown

### Monthly Costs:

**Option 1: Railway + Vercel (Recommended)**
- Railway (Backend + PostgreSQL): $5-10/month
- Vercel (Frontend): Free
- Domain: ~$1/month ($12/year)
- **Total: ~$6-11/month**

**Option 2: Render (All-in-One)**
- Backend + Frontend + Database: $7-15/month
- Domain: ~$1/month
- **Total: ~$8-16/month**

**Option 3: Heroku**
- Eco Dyno: $7/month
- PostgreSQL: $9/month
- Domain: ~$1/month
- **Total: ~$17/month**

---

## 🔧 Environment Variables Reference

### Backend Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `SPRING_PROFILES_ACTIVE` | Active profile | `prod` |
| `PORT` | Server port | `8080` |
| `DATABASE_URL` | PostgreSQL URL | Auto-configured on Railway |
| `DATABASE_USERNAME` | DB username | Auto-configured on Railway |
| `DATABASE_PASSWORD` | DB password | Auto-configured on Railway |
| `JWT_SECRET` | JWT secret key | Your secret key |
| `BASE_URL` | Backend URL | `https://api.yourdomain.com` |
| `FRONTEND_URL` | Frontend URL | `https://yourdomain.com` |

### Frontend Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `https://api.yourdomain.com/api` |

---

## 📊 Alternative Deployment Options

### Option 2: Render.com

**Steps:**
1. Go to https://render.com
2. Sign up with GitHub
3. Create "New PostgreSQL" database (free tier)
4. Create "New Web Service" for backend
5. Create "New Static Site" for frontend
6. Configure environment variables
7. Deploy!

**Pros:**
- Simple setup
- Free tier available
- All-in-one platform

**Cons:**
- Free tier has sleep delays
- Database expires after 90 days on free tier

---

### Option 3: AWS (Advanced)

**Services:**
- **Backend**: AWS Elastic Beanstalk or EC2
- **Database**: AWS RDS PostgreSQL
- **Frontend**: AWS Amplify or S3 + CloudFront
- **Domain**: Route 53

**Cost**: $20-40/month

**Complexity**: High (requires AWS knowledge)

---

### Option 4: DigitalOcean

**Services:**
- **Backend**: App Platform
- **Database**: Managed PostgreSQL
- **Frontend**: App Platform Static Site

**Cost**: $12-20/month

---

## 🎯 Recommended Setup for Beginners

1. **Backend**: Railway.app ($5-10/month)
2. **Frontend**: Vercel (Free)
3. **Database**: Railway PostgreSQL (included)
4. **Domain**: Namecheap ($12/year)

**Total Cost**: ~$6-11/month

---

## 📝 Post-Deployment Checklist

- [ ] Backend is accessible via public URL
- [ ] Frontend is accessible via public URL
- [ ] Database is connected and working
- [ ] User registration works
- [ ] Login works
- [ ] Create feedback form works
- [ ] Submit anonymous feedback works
- [ ] View responses works
- [ ] Custom domain is configured (optional)
- [ ] SSL/HTTPS is enabled (automatic on Railway/Vercel)
- [ ] CORS is configured correctly
- [ ] Environment variables are set

---

## 🔐 Security Checklist

- [ ] Change JWT_SECRET to a strong random value
- [ ] Use HTTPS (SSL) for all connections
- [ ] Keep database credentials secret
- [ ] Enable CORS only for your domain
- [ ] Don't commit .env files to GitHub
- [ ] Use environment variables for all secrets
- [ ] Set up database backups

---

## 🌟 Final URLs

After deployment, your app will be accessible at:

- **Frontend**: https://yourdomain.com
- **Backend API**: https://api.yourdomain.com
- **Public Feedback Link**: https://yourdomain.com/f/{uniqueLink}

---

## 🎉 Congratulations!

Your Anonymous Feedback App is now accessible worldwide! 🌍

Users from anywhere can:
1. Register and create accounts
2. Create feedback forms
3. Share links globally
4. Receive anonymous feedback

---

## 📞 Need Help?

If you encounter any issues:
1. Check Railway/Vercel logs for errors
2. Verify environment variables are set correctly
3. Ensure database is connected
4. Check CORS configuration
5. Verify DNS records are propagated (takes 24-48 hours)

---

**Estimated Total Setup Time**: 1-2 hours
**Estimated Monthly Cost**: $6-11/month
**Global Reach**: ✅ Unlimited users worldwide!
