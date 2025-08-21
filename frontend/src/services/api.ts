const API_BASE_URL = 'http://localhost:8000'

export interface OTPResponse {
  success: boolean
  message: string
  session_id?: string
}

export interface VerificationResponse {
  success: boolean
  message: string
  access_token?: string
}

export interface EmailVerificationResponse {
  success: boolean
  message: string
  verification_id?: string
}

// Phone authentication
export const sendOTP = async (phoneNumber: string): Promise<OTPResponse> => {
  const response = await fetch(`${API_BASE_URL}/send-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone_number: phoneNumber }),
  })

  if (!response.ok) {
    throw new Error('Failed to send OTP')
  }

  return response.json()
}

export const verifyOTP = async (phoneNumber: string, otp: string): Promise<VerificationResponse> => {
  const response = await fetch(`${API_BASE_URL}/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone_number: phoneNumber, otp }),
  })

  if (!response.ok) {
    throw new Error('Failed to verify OTP')
  }

  return response.json()
}

// Email authentication
export const sendEmailVerification = async (email: string): Promise<EmailVerificationResponse> => {
  const response = await fetch(`${API_BASE_URL}/send-email-verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    throw new Error('Failed to send email verification')
  }

  return response.json()
}

export const verifyEmailCode = async (email: string, verificationCode: string): Promise<VerificationResponse> => {
  const response = await fetch(`${API_BASE_URL}/verify-email-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, verification_code: verificationCode }),
  })

  if (!response.ok) {
    throw new Error('Failed to verify email code')
  }

  return response.json()
}