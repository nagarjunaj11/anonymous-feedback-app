# ⚡ Quick Deploy Checklist

## 📝 Before You Start
- [ ] Code is ready in `D:\GitHubProjects\anonymous-feedback-app`
- [ ] GitHub account created
- [ ] Running locally successfully

---

## 1️⃣ GitHub (5 minutes)
```bash
cd D:\GitHubProjects\anonymous-feedback-app
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/anonymous-feedback-app.git
git push -u origin main
```

---

## 2️⃣ Railway - Backend (10 minutes)

### Setup:
1. Go to https://railway.app
2. Login with GitHub
3. New Project → Deploy from GitHub repo
4. Select `anonymous-feedback-app`
5. Add Database → PostgreSQL

### Environment Variables:
```
SPRING_PROFILES_ACTIVE = prod
PORT = 8080
DATABASE_URL = ${{Postgres.DATABASE_URL}}
DATABASE_USERNAME = ${{Postgres.PGUSER}}
DATABASE_PASSWORD = ${{Postgres.PGPASSWORD}}
JWT_SECRET = 404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
FRONTEND_URL = http://localhost:3000
```

### Get Backend URL:
- Settings → Generate Domain
- **Save URL**: `_____________________________`

---

## 3️⃣ Vercel - Frontend (10 minutes)

### Setup:
1. Go to https://vercel.com
2. Login with GitHub
3. Add New → Project
4. Import `anonymous-feedback-app`
5. Root Directory: `frontend`

### Environment Variable:
```
REACT_APP_API_URL = https://YOUR_RAILWAY_URL.up.railway.app/api
```

### Get Frontend URL:
- After deploy, copy URL
- **Save URL**: `_____________________________`

---

## 4️⃣ Update Railway CORS (2 minutes)

1. Go to Railway → Your Service → Variables
2. Update `FRONTEND_URL` to your Vercel URL
3. Save (auto-redeploys)

---

## 5️⃣ Test! (5 minutes)

1. Open your Vercel URL
2. Register new user
3. Create feedback form
4. Test anonymous submission
5. View responses

---

## ✅ Done!

**Your URLs:**
- Frontend: https://_________________.vercel.app
- Backend: https://_________________.up.railway.app
- Feedback: https://_________________.vercel.app/f/[link]

---

## 💰 Monthly Cost: $5-10

## 🌐 Optional: Custom Domain

**Good Names:**
- feedhub.app
- truthbox.io
- anonvoice.com
- whisperbox.app
- honestfeed.com

**Buy at:**
- Namecheap.com
- GoDaddy.com

**Cost:** ~$12/year

---

## 🆘 Quick Fixes

**Backend not working?**
- Check Railway Logs
- Verify environment variables
- Test: `https://your-backend.up.railway.app/actuator/health`

**Frontend showing errors?**
- Check browser console (F12)
- Verify `REACT_APP_API_URL` on Vercel
- Hard refresh: `Ctrl + Shift + R`

**CORS errors?**
- Update `FRONTEND_URL` on Railway
- Must match exactly (no trailing slash)
- Redeploy

---

## 📞 Help

- Railway: https://docs.railway.app
- Vercel: https://vercel.com/docs

---

**Total Time: ~30 minutes**
**Difficulty: Easy** ⭐⭐
