from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
import random
import string
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Multi-Auth API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for demo (use Redis/database in production)
verification_codes = {}

# Pydantic models
class PhoneNumberRequest(BaseModel):
    phone_number: str

class EmailRequest(BaseModel):
    email: str

class OTPVerificationRequest(BaseModel):
    phone_number: str
    otp: str

class EmailVerificationRequest(BaseModel):
    email: str
    verification_code: str

class OTPResponse(BaseModel):
    success: bool
    message: str
    session_id: Optional[str] = None

class EmailVerificationResponse(BaseModel):
    success: bool
    message: str
    verification_id: Optional[str] = None

class VerificationResponse(BaseModel):
    success: bool
    message: str
    access_token: Optional[str] = None

def generate_verification_code():
    """Generate a 6-digit verification code"""
    return ''.join(random.choices(string.digits, k=6))

def send_email_via_mailjet(to_email: str, code: str):
    """Send email using Mailjet API"""
    try:
        # Get Mailjet credentials from environment
        mailjet_api_key = os.getenv("MAILJET_API_KEY")
        mailjet_secret_key = os.getenv("MAILJET_SECRET_KEY")
        
        if not mailjet_api_key or not mailjet_secret_key:
            print("Warning: Mailjet credentials not found. Email not sent.")
            return True  # Return True for demo purposes
        
        import requests
        
        # Mailjet API endpoint
        url = "https://api.mailjet.com/v3.1/send"
        
        # Email data
        data = {
            "Messages": [
                {
                    "From": {
                        "Email": os.getenv("FROM_EMAIL", "noreply@yourapp.com"),
                        "Name": "Your App"
                    },
                    "To": [
                        {
                            "Email": to_email,
                            "Name": to_email
                        }
                    ],
                    "Subject": "Your Verification Code",
                    "TextPart": f"Your verification code is: {code}",
                    "HTMLPart": f"""
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">Verification Code</h2>
                        <p>Your verification code is:</p>
                        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1976d2;">
                            {code}
                        </div>
                        <p>This code will expire in 10 minutes.</p>
                        <p style="color: #666;">If you didn't request this code, please ignore this email.</p>
                    </div>
                    """
                }
            ]
        }
        
        response = requests.post(
            url,
            auth=(mailjet_api_key, mailjet_secret_key),
            json=data
        )
        
        return response.status_code == 200
    except Exception as e:
        print(f"Email sending failed: {e}")
        return False

@app.get("/")
async def root():
    return {"message": "Multi-Auth API is running"}

# Phone authentication endpoints
@app.post("/send-otp", response_model=OTPResponse)
async def send_otp(request: PhoneNumberRequest):
    """Send OTP to the provided phone number"""
    try:
        print(f"Sending OTP to {request.phone_number}")
        
        # Generate and store OTP
        otp = generate_verification_code()
        verification_codes[request.phone_number] = otp
        
        # In real implementation, you would send SMS here
        print(f"Generated OTP for {request.phone_number}: {otp}")
        
        return OTPResponse(
            success=True,
            message=f"OTP sent to {request.phone_number}",
            session_id="mock_session_id_123"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/verify-otp", response_model=VerificationResponse)
async def verify_otp(request: OTPVerificationRequest):
    """Verify OTP and authenticate user"""
    try:
        print(f"Verifying OTP {request.otp} for {request.phone_number}")
        
        stored_otp = verification_codes.get(request.phone_number)
        
        if stored_otp and stored_otp == request.otp:
            # Clean up used OTP
            del verification_codes[request.phone_number]
            
            return VerificationResponse(
                success=True,
                message="OTP verified successfully",
                access_token="mock_jwt_token_123"
            )
        else:
            return VerificationResponse(
                success=False,
                message="Invalid or expired OTP"
            )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Email authentication endpoints
@app.post("/send-email-verification", response_model=EmailVerificationResponse)
async def send_email_verification(request: EmailRequest):
    """Send verification code to the provided email address"""
    try:
        print(f"Sending verification code to {request.email}")
        
        # Generate and store verification code
        code = generate_verification_code()
        verification_codes[request.email] = code
        
        # Send email via Mailjet
        email_sent = send_email_via_mailjet(request.email, code)
        
        if email_sent:
            return EmailVerificationResponse(
                success=True,
                message=f"Verification code sent to {request.email}",
                verification_id="mock_verification_id_123"
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to send email")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/verify-email-code", response_model=VerificationResponse)
async def verify_email_code(request: EmailVerificationRequest):
    """Verify email verification code and authenticate user"""
    try:
        print(f"Verifying code {request.verification_code} for {request.email}")
        
        stored_code = verification_codes.get(request.email)
        
        if stored_code and stored_code == request.verification_code:
            # Clean up used code
            del verification_codes[request.email]
            
            return VerificationResponse(
                success=True,
                message="Email verified successfully",
                access_token="mock_jwt_token_123"
            )
        else:
            return VerificationResponse(
                success=False,
                message="Invalid or expired verification code"
            )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)