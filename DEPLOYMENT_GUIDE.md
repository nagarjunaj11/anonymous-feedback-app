# 🚀 Deployment Guide - Anonymous Feedback App

This guide will help you deploy your Anonymous Feedback App to make it accessible throughout India.

## Quick Deployment Options

### 🌟 Option 1: Railway (Recommended - Easiest)

#### Backend Deployment on Railway

1. **Create Railway Account**
   - Visit https://railway.app
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli

   # Login
   railway login

   # Initialize project
   railway init

   # Deploy
   railway up
   ```

3. **Add MySQL Database**
   - In Railway dashboard, click "New"
   - Select "Database" → "MySQL"
   - Copy connection details

4. **Configure Environment Variables**
   ```
   SPRING_DATASOURCE_URL=jdbc:mysql://[host]:[port]/[database]
   SPRING_DATASOURCE_USERNAME=[username]
   SPRING_DATASOURCE_PASSWORD=[password]
   APP_BASE_URL=https://your-backend.railway.app
   APP_FRONTEND_URL=https://your-frontend.vercel.app
   ```

#### Frontend Deployment on Vercel

1. **Create Vercel Account**
   - Visit https://vercel.com
   - Sign up with GitHub

2. **Deploy Frontend**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Navigate to frontend
   cd frontend

   # Deploy
   vercel
   ```

3. **Update API URL**
   - Edit `src/services/api.js`
   - Update `API_BASE_URL` to your Railway backend URL

4. **Redeploy**
   ```bash
   vercel --prod
   ```

### 🔥 Option 2: Heroku

#### Backend on Heroku

1. **Create Heroku Account**
   - Visit https://heroku.com
   - Install Heroku CLI

2. **Create Heroku App**
   ```bash
   heroku create your-feedback-app-backend
   ```

3. **Add MySQL ClearDB**
   ```bash
   heroku addons:create cleardb:ignite
   ```

4. **Configure Procfile**
   Create `Procfile` in root:
   ```
   web: java -jar target/anonymous-feedback-app-1.0.0.jar --server.port=$PORT
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

#### Frontend on Vercel (same as Option 1)

### 💻 Option 3: AWS (Production-Ready)

#### Backend on AWS EC2

1. **Launch EC2 Instance**
   - Ubuntu Server 22.04 LTS
   - t2.micro (free tier)
   - Configure security group (ports 80, 443, 8080)

2. **Connect to Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Java & Maven**
   ```bash
   sudo apt update
   sudo apt install openjdk-17-jdk maven -y
   ```

4. **Upload Application**
   ```bash
   scp -i your-key.pem -r . ubuntu@your-ec2-ip:~/app
   ```

5. **Run Application**
   ```bash
   cd ~/app
   mvn clean package
   nohup java -jar target/anonymous-feedback-app-1.0.0.jar &
   ```

6. **Configure Nginx (Optional)**
   ```bash
   sudo apt install nginx -y
   ```

   Create `/etc/nginx/sites-available/feedback`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:8080;
       }
   }
   ```

#### Database on AWS RDS
1. Create MySQL RDS instance
2. Update `application.yml` with RDS credentials

#### Frontend on AWS S3 + CloudFront
1. Build frontend: `npm run build`
2. Upload build folder to S3
3. Configure S3 for static hosting
4. Add CloudFront CDN

### 🌐 Option 4: DigitalOcean

1. **Create Droplet**
   - Ubuntu 22.04
   - 1GB RAM minimum
   - Add SSH key

2. **Install Dependencies**
   ```bash
   # Java
   sudo apt install openjdk-17-jdk -y

   # Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install nodejs -y

   # Nginx
   sudo apt install nginx -y

   # MySQL
   sudo apt install mysql-server -y
   ```

3. **Deploy Backend**
   ```bash
   cd /var/www
   git clone your-repo
   cd anonymous-feedback-app
   mvn clean package
   ```

4. **Create Systemd Service**
   Create `/etc/systemd/system/feedback-app.service`:
   ```
   [Unit]
   Description=Feedback App
   After=syslog.target

   [Service]
   User=ubuntu
   ExecStart=/usr/bin/java -jar /var/www/anonymous-feedback-app/target/anonymous-feedback-app-1.0.0.jar
   SuccessExitStatus=143

   [Install]
   WantedBy=multi-user.target
   ```

   Enable and start:
   ```bash
   sudo systemctl enable feedback-app
   sudo systemctl start feedback-app
   ```

5. **Deploy Frontend**
   ```bash
   cd frontend
   npm install
   npm run build
   sudo cp -r build/* /var/www/html/
   ```

## 🔧 Production Configuration

### Backend (`application-prod.yml`)
```yaml
spring:
  datasource:
    url: ${DATABASE_URL}
    username: ${DATABASE_USERNAME}
    password: ${DATABASE_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false

server:
  port: ${PORT:8080}

app:
  jwt:
    secret: ${JWT_SECRET}
    expiration: 86400000
  base-url: ${BASE_URL}
  frontend-url: ${FRONTEND_URL}
```

### Environment Variables
```bash
# Backend
DATABASE_URL=jdbc:mysql://host:port/database
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
JWT_SECRET=your-super-secret-key-change-this
BASE_URL=https://api.yourapp.com
FRONTEND_URL=https://yourapp.com

# Frontend
REACT_APP_API_URL=https://api.yourapp.com/api
```

## 🌍 Custom Domain Setup

### Configure Domain for Backend
1. Buy domain (GoDaddy, Namecheap, Google Domains)
2. Add A record: `api.yourapp.com` → Your server IP
3. Install SSL certificate (Let's Encrypt)

### Configure Domain for Frontend
1. Add A record: `yourapp.com` → Frontend server IP
2. Add CNAME: `www.yourapp.com` → `yourapp.com`
3. Enable HTTPS

### Let's Encrypt SSL (Free)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d yourapp.com -d www.yourapp.com
```

## 📊 Performance Optimization

### Backend
- Enable caching
- Configure connection pooling
- Add Redis for session storage
- Use CDN for static content

### Frontend
- Enable gzip compression
- Minimize bundle size
- Lazy load components
- Use CDN for assets

## 🔍 Monitoring & Analytics

### Backend Monitoring
- Spring Boot Actuator
- AWS CloudWatch
- New Relic
- Datadog

### Frontend Analytics
- Google Analytics
- Mixpanel
- Hotjar

## 🐛 Troubleshooting

### Common Issues

1. **CORS Error**
   - Update `SecurityConfig.java`
   - Add frontend URL to allowed origins

2. **Database Connection Failed**
   - Check connection string
   - Verify firewall rules
   - Test database credentials

3. **Frontend Can't Connect to Backend**
   - Verify API_BASE_URL in api.js
   - Check CORS configuration
   - Ensure backend is running

## 📱 Mobile Optimization

The app is already responsive, but for better mobile experience:
- Add PWA manifest
- Enable offline mode
- Add mobile-specific optimizations

## 🎯 Cost Estimation (Monthly)

### Free Tier Option
- **Railway**: Free (with limitations)
- **Vercel**: Free
- **Total**: ₹0

### Budget Option (India)
- **Railway**: ₹500
- **Vercel**: Free
- **Domain**: ₹100
- **Total**: ₹600/month

### Production Option
- **AWS EC2 t2.small**: ₹1,500
- **AWS RDS**: ₹2,000
- **Vercel Pro**: ₹1,600
- **Domain**: ₹100
- **Total**: ₹5,200/month

## ✅ Pre-Launch Checklist

- [ ] Test all features thoroughly
- [ ] Configure production database
- [ ] Set up SSL certificates
- [ ] Configure domain names
- [ ] Enable error logging
- [ ] Set up monitoring
- [ ] Create backup strategy
- [ ] Test on mobile devices
- [ ] Optimize for SEO
- [ ] Add analytics tracking
- [ ] Create user documentation
- [ ] Set up email notifications (optional)

## 🎉 You're Live!

Once deployed, your app will be accessible:
- **Frontend**: https://yourapp.com
- **Backend API**: https://api.yourapp.com

Share your feedback link with anyone in India!

---

Need help? Check the troubleshooting section or contact support.
