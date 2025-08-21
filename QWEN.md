# Qwen Code Context: Multi-Authentication CRM Login System

## Project Overview

This is a modern authentication system for a CRM with dual authentication methods: phone (SMS OTP) and email verification. It uses a React frontend with Material UI and a FastAPI backend.

- **Frontend**: React + TypeScript + Material UI + Vite
- **Backend**: FastAPI + Python
- **Email Service**: Mailjet API integration (with demo mode)
- **Styling**: Material UI with custom theme

## Key Features

- Dual authentication (phone/email)
- Modern Material UI with responsive design
- Simulated SMS and email verification (demo mode)
- Location services on dashboard

## Setup & Running

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Mailjet account (optional, for email authentication)

### Frontend

```bash
cd frontend
npm install
npm run dev  # Starts development server at http://localhost:5173
npm run build  # Builds for production
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # Edit .env with your credentials
python main.py  # Starts server at http://localhost:8000
```

## Development Notes

### Project Structure

- `frontend/`: React application with Material UI
- `backend/`: FastAPI server with authentication endpoints
- `README.md`: Detailed project documentation

### Authentication Flow

1. User selects phone or email authentication
2. User enters phone number or email
3. System sends OTP (phone) or verification code (email)
4. User enters code
5. System verifies and grants access token
6. User accesses dashboard

### API Endpoints

- `POST /send-otp` - Send OTP to phone
- `POST /verify-otp` - Verify phone OTP
- `POST /send-email-verification` - Send email verification
- `POST /verify-email-code` - Verify email code
- `GET /` - Health check

### Demo Mode

Without Mailjet credentials, the system runs in demo mode:
- Phone OTP: Any 6-digit number works
- Email: Codes are logged to console