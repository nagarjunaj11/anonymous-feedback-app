# 🚀 Deploy to Railway.app - Complete Guide

## ✅ What You'll Get
- **Backend**: Deployed globally on Railway
- **Database**: PostgreSQL on Railway (free)
- **Frontend**: Deployed on Vercel (free)
- **Cost**: $5-10/month (Railway gives $5 free credit every month)
- **Time**: 30-45 minutes

---

## 📋 Prerequisites

- ✅ GitHub account (create at https://github.com if you don't have)
- ✅ Railway account (will create in Step 1)
- ✅ Vercel account (will create in Step 3)
- ✅ Your code is ready in: `D:\GitHubProjects\anonymous-feedback-app`

---

## 🎯 Step-by-Step Deployment

### **STEP 1: Push Code to GitHub**

#### 1.1 Create GitHub Repository

1. Go to **https://github.com**
2. Sign in (or create account if new)
3. Click the **"+"** button (top right) → **"New repository"**
4. Fill in:
   - **Repository name**: `anonymous-feedback-app`
   - **Description**: `Anonymous Feedback Collection Platform`
   - **Privacy**: Choose **Private** (recommended)
   - **DO NOT** initialize with README
5. Click **"Create repository"**

#### 1.2 Push Your Code

Open **Command Prompt** or **PowerShell** and run:

```bash
# Navigate to your project
cd D:\GitHubProjects\anonymous-feedback-app

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Add GitHub remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/anonymous-feedback-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**If prompted for credentials:**
- Username: Your GitHub username
- Password: Use **Personal Access Token** (not your password)
  - Get token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token (classic)
  - Select scopes: `repo`, `workflow`

✅ **Checkpoint**: Visit `https://github.com/YOUR_USERNAME/anonymous-feedback-app` to see your code!

---

### **STEP 2: Deploy Backend on Railway**

#### 2.1 Create Railway Account

1. Go to **https://railway.app**
2. Click **"Login"** button (top right)
3. Select **"Login with GitHub"**
4. Authorize Railway to access your GitHub

#### 2.2 Create New Project

1. Click **"New Project"** button
2. Select **"Deploy from GitHub repo"**
3. If asked, click **"Configure GitHub App"** and select your repository
4. Choose your repository: `anonymous-feedback-app`

Railway will automatically:
- Detect it's a Spring Boot app (Maven/pom.xml)
- Start building your backend
- Deploy it

#### 2.3 Add PostgreSQL Database

1. In your Railway project dashboard, click **"+ New"** button
2. Select **"Database"**
3. Click **"Add PostgreSQL"**

Railway automatically:
- Creates a PostgreSQL database
- Generates credentials
- Injects them as environment variables: `DATABASE_URL`, `PGUSER`, `PGPASSWORD`, etc.

#### 2.4 Configure Environment Variables

1. Click on your **backend service** (shows Spring Boot logo)
2. Go to **"Variables"** tab
3. Click **"+ New Variable"** and add these one by one:

```
SPRING_PROFILES_ACTIVE = prod
PORT = 8080
JWT_SECRET = 404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
FRONTEND_URL = http://localhost:3000
```

**Note**: We'll update `FRONTEND_URL` later after deploying frontend!

4. Click **"Add"** for each variable

#### 2.5 Configure Railway Database Connection

Railway provides these variables automatically, but we need to map them:

Add these additional variables:

```
DATABASE_URL = ${{Postgres.DATABASE_URL}}
DATABASE_USERNAME = ${{Postgres.PGUSER}}
DATABASE_PASSWORD = ${{Postgres.PGPASSWORD}}
```

Railway will automatically replace `${{Postgres.XXX}}` with actual values!

#### 2.6 Generate Public Domain

1. Go to **"Settings"** tab of your backend service
2. Scroll down to **"Networking"** section
3. Click **"Generate Domain"**
4. Railway will give you a URL like: `https://anonymous-feedback-app-production.up.railway.app`

✅ **Save this URL! You'll need it for frontend.**

#### 2.7 Test Backend

1. Open your Railway backend URL in browser: `https://your-app.up.railway.app`
2. Add `/actuator/health` to the end: `https://your-app.up.railway.app/actuator/health`
3. You should see: `{"status":"UP"}` or something similar

If you see JSON response, **backend is working!** 🎉

---

### **STEP 3: Deploy Frontend on Vercel**

#### 3.1 Create Vercel Account

1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel

#### 3.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Click **"Import"** next to your `anonymous-feedback-app` repository
3. If you don't see it, click **"Adjust GitHub App Permissions"** and give access

#### 3.3 Configure Build Settings

Vercel will auto-detect React, but configure these:

1. **Root Directory**: Click **"Edit"** → Enter: `frontend`
2. **Build Command**: `npm run build` (should be auto-filled)
3. **Output Directory**: `build` (should be auto-filled)
4. **Install Command**: `npm install` (should be auto-filled)

#### 3.4 Add Environment Variables

Before deploying, add environment variable:

1. Expand **"Environment Variables"** section
2. Add:
   ```
   Name: REACT_APP_API_URL
   Value: https://your-railway-backend-url.up.railway.app/api
   ```

   **Replace with your actual Railway backend URL from Step 2.6!**

   For example: `https://anonymous-feedback-app-production.up.railway.app/api`

3. Click **"Add"**

#### 3.5 Deploy!

1. Click **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://anonymous-feedback-app-xyz.vercel.app`

✅ **Save this URL! This is your frontend URL.**

---

### **STEP 4: Update Backend CORS**

Now update Railway backend to allow your Vercel frontend:

1. Go back to **Railway dashboard**
2. Click on your **backend service**
3. Go to **"Variables"** tab
4. Find `FRONTEND_URL` variable
5. Update value to your Vercel URL: `https://anonymous-feedback-app-xyz.vercel.app`
6. Click **"Update"**
7. Railway will automatically redeploy

---

### **STEP 5: Test Your App! 🎉**

1. Open your Vercel URL: `https://your-app.vercel.app`
2. Click **"Register"**
3. Create an account:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `Test@123`
   - UPI ID: `test@paytm` (optional)
4. Login with those credentials
5. Create a feedback form
6. Copy the feedback link
7. Open it in **incognito/private window**
8. Submit anonymous feedback
9. Go back to dashboard and view responses!

✅ **If everything works, congratulations! Your app is LIVE globally!** 🌍

---

## 🎯 Your Live URLs

After deployment:

- **Frontend (Users visit this)**: `https://your-app.vercel.app`
- **Backend API**: `https://your-app.up.railway.app`
- **Database**: Railway PostgreSQL (internal)
- **Feedback Links**: `https://your-app.vercel.app/f/{uniqueLink}`

---

## 💰 Costs

- **Railway**: $5 free credit/month, then $5-10/month
- **Vercel**: FREE forever
- **Total**: ~$5-10/month (or FREE if usage stays under $5/month)

---

## 🌐 Add Custom Domain (Optional)

### Buy Domain

1. Go to **Namecheap** or **GoDaddy**
2. Search for domain: `feedhub.app`, `truthbox.io`, etc.
3. Buy it (~$12/year)

### Configure Domain on Vercel

1. Go to Vercel project → **Settings** → **Domains**
2. Add your domain: `yourdomain.com`
3. Vercel will show DNS records to add

### Configure Domain on Railway (for API)

1. Go to Railway service → **Settings** → **Networking**
2. Click **"Custom Domain"**
3. Add: `api.yourdomain.com`
4. Railway will show DNS records

### Add DNS Records at Namecheap/GoDaddy

Add these records in your domain registrar:

**For Frontend (yourdomain.com):**
- Type: `A`
- Host: `@`
- Value: `76.76.21.21` (Vercel's IP)

**For Backend (api.yourdomain.com):**
- Type: `CNAME`
- Host: `api`
- Value: `your-app.up.railway.app`

**For www (optional):**
- Type: `CNAME`
- Host: `www`
- Value: `cname.vercel-dns.com`

Wait 24-48 hours for DNS to propagate!

---

## 🔧 Environment Variables Summary

### Railway Backend Variables:
```
SPRING_PROFILES_ACTIVE=prod
PORT=8080
DATABASE_URL=${{Postgres.DATABASE_URL}}
DATABASE_USERNAME=${{Postgres.PGUSER}}
DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
BASE_URL=https://your-railway-url.up.railway.app
FRONTEND_URL=https://your-vercel-url.vercel.app
```

### Vercel Frontend Variables:
```
REACT_APP_API_URL=https://your-railway-url.up.railway.app/api
```

---

## 🐛 Troubleshooting

### Backend not deploying on Railway?
- Check **"Deployments"** tab for error logs
- Verify `pom.xml` is in root directory
- Ensure Java 17 is specified in `pom.xml`

### Frontend showing blank page?
- Check browser console for errors (F12)
- Verify `REACT_APP_API_URL` is set correctly on Vercel
- Hard refresh: `Ctrl + Shift + R`

### CORS errors?
- Update `FRONTEND_URL` on Railway with exact Vercel URL (no trailing slash)
- Redeploy backend on Railway

### Database connection errors?
- Verify PostgreSQL is running on Railway
- Check that database variables are linked: `${{Postgres.DATABASE_URL}}`

### Can't login or register?
- Open browser console (F12) → Network tab
- Check if API calls are going to correct backend URL
- Verify backend is responding: `https://your-backend.up.railway.app/actuator/health`

---

## 📊 Monitoring

### Railway Dashboard:
- **Metrics**: CPU, Memory, Request count
- **Logs**: Real-time application logs
- **Deployments**: Deployment history

### Vercel Dashboard:
- **Analytics**: Page views, visitors
- **Logs**: Build and function logs
- **Deployments**: Deployment history

---

## 🎉 Success Checklist

- [ ] Code pushed to GitHub
- [ ] Railway backend deployed
- [ ] PostgreSQL database created on Railway
- [ ] Environment variables set on Railway
- [ ] Backend URL accessible and shows response
- [ ] Vercel frontend deployed
- [ ] Frontend environment variable set
- [ ] Frontend accessible via Vercel URL
- [ ] Can register a new user
- [ ] Can login successfully
- [ ] Can create feedback form
- [ ] Can submit anonymous feedback
- [ ] Can view responses
- [ ] CORS working (no errors in browser console)

---

## 🌟 Next Steps

1. **Buy a domain** (optional): Makes your app look professional
2. **Configure custom domain**: Point domain to Vercel and Railway
3. **Share your app**: Give your Vercel URL to friends/colleagues
4. **Monitor usage**: Check Railway dashboard for usage
5. **Set up backups**: Railway auto-backups PostgreSQL daily

---

## 📞 Support

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **Railway Discord**: https://discord.gg/railway
- **Vercel Discord**: https://discord.gg/vercel

---

## 🎊 Congratulations!

Your Anonymous Feedback App is now:
- ✅ Deployed globally
- ✅ Accessible from anywhere in the world
- ✅ Running on production database
- ✅ Secured with HTTPS
- ✅ Ready to collect feedback!

**Share your app and start collecting anonymous feedback!** 🚀
