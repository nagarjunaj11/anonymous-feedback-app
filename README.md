# 🎯 Anonymous Feedback App

A stunning, professional-grade web application for collecting anonymous feedback. Built with Spring Boot and React, designed to be accessible throughout India with a beautiful UI inspired by modern social platforms.

![Anonymous Feedback App](https://img.shields.io/badge/Status-Production%20Ready-success)
![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-green)
![React](https://img.shields.io/badge/React-18.2-blue)

## ✨ Features

### Core Features
- 🔒 **100% Anonymous Feedback** - Complete privacy for respondents
- 🔗 **Shareable Links** - Unique link for each feedback form
- 📱 **Responsive Design** - Works perfectly on all devices
- ⭐ **Rating System** - Optional star ratings (1-5 stars)
- 📊 **Real-time Dashboard** - View and manage all feedback
- 🎨 **Stunning UI** - Modern, professional design

### User Types Supported
- 👔 Managers - Team feedback
- 🎥 Content Creators - Audience feedback
- 🎓 Students & Teachers - Peer reviews
- 💼 Professionals - Career insights

### Additional Features
- 💳 **UPI Payment Integration** - Support creators via UPI
- 🔄 **Multiple Feedback Forms** - Organize by purpose
- 🌍 **Multi-platform Sharing** - WhatsApp, Facebook, Twitter
- 📧 **Email Sharing** - Share via email
- 🎯 **Category-based Organization** - Work, Content, Education, Personal

## 🏗️ Architecture

### Backend (Spring Boot)
- RESTful API architecture
- JWT-based authentication
- JPA/Hibernate for data persistence
- H2 (dev) / MySQL (production) database
- Spring Security for authorization

### Frontend (React)
- Modern React 18 with Hooks
- React Router for navigation
- Axios for API calls
- React Toastify for notifications
- Framer Motion for animations

## 📦 Project Structure

```
anonymous-feedback-app/
├── src/main/java/com/feedback/
│   ├── controller/          # REST API endpoints
│   ├── dto/                 # Data Transfer Objects
│   ├── model/               # JPA Entities
│   ├── repository/          # Data access layer
│   ├── security/            # JWT & Security config
│   └── service/             # Business logic
├── src/main/resources/
│   └── application.yml      # App configuration
├── frontend/
│   ├── public/              # Static files
│   └── src/
│       ├── components/      # React components
│       ├── pages/           # Page components
│       ├── services/        # API services
│       └── App.js           # Main app component
├── pom.xml                  # Maven dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16+ and npm
- Maven 3.6+
- Git

### Installation

#### 1. Clone the Repository
```bash
cd D:\GitHubProjects
git clone <your-repo-url> anonymous-feedback-app
cd anonymous-feedback-app
```

#### 2. Backend Setup

```bash
# Install backend dependencies
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run
```

The backend will start at `http://localhost:8080`

#### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start at `http://localhost:3000`

## 🎮 Usage Guide

### For Feedback Collectors

1. **Register an Account**
   - Visit `http://localhost:3000/register`
   - Fill in your details (username, email, password)
   - Add your UPI ID for donations (optional)

2. **Create Feedback Form**
   - Login to your dashboard
   - Click "Create New Form"
   - Add title, description, and category
   - Get your unique shareable link

3. **Share Your Link**
   - Copy the generated link
   - Share via WhatsApp, Facebook, Twitter
   - Or copy and share anywhere

4. **View Responses**
   - View all responses in your dashboard
   - See ratings and messages
   - Mark responses as read

### For Feedback Givers

1. **Open Feedback Link**
   - Click on the shared feedback link
   - No account required!

2. **Submit Anonymous Feedback**
   - Rate (optional)
   - Write your message
   - Submit completely anonymously

3. **Support Creator (Optional)**
   - After submitting, you can donate via UPI
   - Support creators you appreciate

## 🌐 Making It Accessible Throughout India

### Option 1: Local Network (LAN)
```bash
# Find your local IP
ipconfig  # Windows
# Look for IPv4 Address (e.g., 192.168.1.100)

# Update application.yml
app:
  base-url: http://192.168.1.100:8080
  frontend-url: http://192.168.1.100:3000

# Share: http://192.168.1.100:3000
```

### Option 2: Deploy to Cloud

#### Backend Deployment Options:
1. **Heroku** (Free tier available)
2. **AWS EC2** (Reliable, scalable)
3. **DigitalOcean** (Simple, affordable)
4. **Railway** (Modern, easy to use)

#### Frontend Deployment Options:
1. **Vercel** (Recommended for React)
2. **Netlify** (Easy deployment)
3. **AWS S3 + CloudFront**
4. **Firebase Hosting**

#### Database Options:
1. **AWS RDS** (MySQL)
2. **Railway** (PostgreSQL)
3. **MongoDB Atlas** (NoSQL alternative)

### Option 3: Use ngrok (Quick Testing)
```bash
# Install ngrok: https://ngrok.com/download

# Expose backend
ngrok http 8080

# Expose frontend
ngrok http 3000

# Update URLs in application.yml and api.js
```

## 🔧 Configuration

### Backend Configuration (`application.yml`)

```yaml
# For production, update these:
spring:
  datasource:
    url: jdbc:mysql://your-db-host:3306/feedbackdb
    username: your-db-username
    password: your-db-password

app:
  base-url: https://your-backend-domain.com
  frontend-url: https://your-frontend-domain.com
```

### Frontend Configuration (`src/services/api.js`)

```javascript
// Update API_BASE_URL for production
const API_BASE_URL = 'https://your-backend-domain.com/api';
```

## 🎨 Customization

### Change Colors
Edit `frontend/src/index.css`:
```css
:root {
  --primary: #6366f1;  /* Change to your brand color */
  --secondary: #ec4899;
  /* ... other colors */
}
```

### Update Branding
- Change logo in navigation
- Update app name in components
- Modify landing page content

## 📱 Features Walkthrough

### 1. Landing Page
- Eye-catching hero section
- Feature showcase
- Use case examples
- Call-to-action sections

### 2. Authentication
- Secure JWT-based auth
- Password encryption
- Session management

### 3. Dashboard
- Create unlimited forms
- View all responses
- Share on social media
- Copy shareable links
- Delete forms

### 4. Feedback Submission
- Anonymous by design
- Optional star ratings
- Character counter
- UPI donation option

### 5. Social Sharing
- WhatsApp integration
- Facebook sharing
- Twitter sharing
- Email sharing

## 🔐 Security Features

- JWT token authentication
- Password hashing (BCrypt)
- CORS configuration
- SQL injection prevention
- XSS protection
- Input validation

## 📊 Database Schema

### Users
- ID, Username, Email, Password
- Full Name, Profile Type, Bio
- UPI ID, Created At, Updated At

### Feedback Forms
- ID, Unique Link, Title, Description
- Category, Active Status
- User ID (Foreign Key)

### Feedback Responses
- ID, Message, Rating
- Form ID (Foreign Key)
- IP Address (for spam prevention)
- Submitted At

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Support

If you find this project helpful, please:
- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest new features
- 📢 Share with others

## 📞 Contact

Created with ❤️ by [Your Name]

For support: [Your Email/UPI ID]

---

**Made in India 🇮🇳 | Accessible Throughout India**
