# Multi-Authentication CRM Login System

A modern authentication system with both **phone (SMS)** and **email verification** using Material UI and Mailjet.

## 🚀 Features

### **🔐 Dual Authentication Methods**
- **📱 Phone Authentication**: SMS OTP verification
- **📧 Email Authentication**: Email verification codes via Mailjet
- **🎯 Method Selection**: Choose between phone or email authentication

### **🎨 Modern UI/UX**
- **Material UI Design System** with custom theming
- **📱 Fully Responsive** - Mobile-first design
- **🎭 Glass-morphism Effects** with backdrop blur
- **🌈 Gradient Backgrounds** and smooth animations
- **♿ Accessibility Compliant** with proper ARIA labels

### **⚡ Technical Stack**
- **Frontend**: React + TypeScript + Material UI + Vite
- **Backend**: FastAPI + Python
- **Email Service**: Mailjet API integration
- **Styling**: Material UI with custom theme

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Mailjet account (for email authentication)

## 🛠️ Setup Instructions

### **Frontend Setup**

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The frontend will run at `http://localhost:5173`

### **Backend Setup**

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` file with your credentials:
   ```env
   MAILJET_API_KEY=your_mailjet_api_key
   MAILJET_SECRET_KEY=your_mailjet_secret_key
   FROM_EMAIL=noreply@yourapp.com
   ```

5. **Start the server:**
   ```bash
   python main.py
   ```

   The backend will run at `http://localhost:8000`

## 🔧 Mailjet Setup

1. **Create a Mailjet account** at https://www.mailjet.com
2. **Get your API credentials** from the dashboard
3. **Add your credentials** to the `.env` file
4. **Verify your sender email** in Mailjet dashboard

## 📱 Authentication Flow

### **Method Selection**
1. User chooses between **Phone** or **Email** authentication
2. Animated selection with Material UI components

### **Phone Authentication**
1. User enters phone number
2. Backend generates and stores OTP (simulated SMS)
3. User enters 6-digit OTP
4. Backend verifies and issues access token

### **Email Authentication**
1. User enters email address
2. Backend generates verification code
3. **Mailjet sends HTML email** with styled verification code
4. User enters 6-digit code
5. Backend verifies and issues access token

### **Dashboard Access**
- Location services with geolocation API
- Material UI AppBar with logout functionality
- Responsive grid layouts

## 🎯 API Endpoints

### **Phone Authentication**
- `POST /send-otp` - Send OTP to phone
- `POST /verify-otp` - Verify phone OTP

### **Email Authentication**
- `POST /send-email-verification` - Send email verification
- `POST /verify-email-code` - Verify email code

### **General**
- `GET /` - Health check

## 🎨 UI Components

### **Material UI Components Used**
- `AuthMethodSelector` - Dual method selection
- `LoginPage` - Phone number input
- `EmailLogin` - Email address input  
- `OTPVerification` - Phone OTP verification
- `EmailVerification` - Email code verification
- `MainPage` - Dashboard with location services

### **Responsive Design Features**
- **Breakpoint-based layouts** using `useMediaQuery`
- **Adaptive typography** for different screen sizes
- **Touch-friendly buttons** (56px height on mobile)
- **Optimized spacing** and padding

## 🔒 Security Features

- **Input validation** on frontend and backend
- **Rate limiting ready** (implement with Redis)
- **Temporary code storage** with cleanup after use
- **Email masking** for privacy
- **Phone number formatting** and validation

## 🚀 Production Deployment

### **Frontend**
```bash
cd frontend
npm run build
# Deploy dist/ folder to CDN/static hosting
```

### **Backend**
```bash
cd backend
# Add production ASGI server
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### **Environment Variables**
- Set production Mailjet credentials
- Configure CORS origins for your domain
- Use Redis for code storage in production
- Add rate limiting middleware

## 📧 Email Template

The system sends beautifully formatted HTML emails with:
- **Responsive design** that works on all email clients
- **Large, centered verification codes** for easy reading
- **Professional styling** with your brand colors
- **Clear expiration messaging** (10 minutes)

## 🎭 Demo Mode

Without Mailjet credentials, the system runs in demo mode:
- **Phone OTP**: Any 6-digit number works
- **Email**: Codes are logged to console
- **Full UI functionality** remains intact

## 📝 Next Steps

1. **SMS Integration**: Add Twilio/AWS SNS for real SMS
2. **Database**: Replace in-memory storage with PostgreSQL/MongoDB  
3. **JWT**: Implement proper JWT tokens with refresh
4. **Rate Limiting**: Add Redis-based rate limiting
5. **Social Auth**: Add Google/GitHub OAuth integration

---

**🎉 Ready to authenticate!** The system is now fully configured for both phone and email authentication with a beautiful Material UI interface.