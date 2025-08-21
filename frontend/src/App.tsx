import { useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { AuthMethodSelector } from './components/AuthMethodSelector'
import { LoginPage } from './components/LoginPage'
import { OTPVerification } from './components/OTPVerification'
import { EmailLogin } from './components/EmailLogin'
import { EmailVerification } from './components/EmailVerification'
import { MainPage } from './components/MainPage'
import { AdminLogin } from './components/AdminLogin'
import { sendOTP, verifyOTP, sendEmailVerification, verifyEmailCode } from './services/api'
import { theme } from './theme'
import type { AuthMethod, AuthStep } from './types/auth'

function App() {
  const [authStep, setAuthStep] = useState<AuthStep>('method')
  const [authMethod, setAuthMethod] = useState<AuthMethod | null>(null)
  const [credential, setCredential] = useState('') // phone number or email
  // Access token is managed implicitly for demo; no backend storage used.

  const handleSelectMethod = (method: AuthMethod) => {
    setAuthMethod(method)
    setAuthStep('login')
  }

  const handleSendOTP = async (phone: string) => {
    try {
      const response = await sendOTP(phone)
      if (response.success) {
        setCredential(phone)
        setAuthStep('verification')
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      console.error('Failed to send OTP:', error)
      alert('Failed to send OTP. Please try again.')
    }
  }

  const handleSendEmailVerification = async (email: string) => {
    try {
      const response = await sendEmailVerification(email)
      if (response.success) {
        setCredential(email)
        setAuthStep('verification')
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      console.error('Failed to send email verification:', error)
      alert('Failed to send email verification. Please try again.')
    }
  }

  const handleVerifyOTP = async (otp: string) => {
    try {
      const response = await verifyOTP(credential, otp)
      if (response.success && response.access_token) {
        setAuthStep('authenticated')
      } else {
        alert(response.message || 'Invalid OTP')
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error)
      alert('Failed to verify OTP. Please try again.')
    }
  }

  const handleVerifyEmailCode = async (code: string) => {
    try {
      const response = await verifyEmailCode(credential, code)
      if (response.success && response.access_token) {
        setAuthStep('authenticated')
      } else {
        alert(response.message || 'Invalid verification code')
      }
    } catch (error) {
      console.error('Failed to verify email code:', error)
      alert('Failed to verify email code. Please try again.')
    }
  }

  const handleLogout = () => {
    setAuthStep('method')
    setAuthMethod(null)
    setCredential('')
  }

  const handleBackToMethod = () => {
    setAuthStep('method')
    setAuthMethod(null)
    setCredential('')
  }

  const handleBackToLogin = () => {
    setAuthStep('login')
    setCredential('')
  }

  const handleAdminLogin = async (password: string) => {
    // Demo-only admin check. No backend call.
    if (password.trim() === 'admin') {
      setAuthStep('authenticated')
    } else {
      alert('Invalid admin password')
    }
  }

  const renderCurrentStep = () => {
    switch (authStep) {
      case 'method':
        return <AuthMethodSelector onSelectMethod={handleSelectMethod} />
      
      case 'login':
        if (authMethod === 'phone') {
          return (
            <LoginPage
              onSendOTP={handleSendOTP}
              onBack={handleBackToMethod}
            />
          )
        } else if (authMethod === 'email') {
          return (
            <EmailLogin
              onSendVerification={handleSendEmailVerification}
              onBack={handleBackToMethod}
            />
          )
        } else if (authMethod === 'admin') {
          return (
            <AdminLogin
              onVerifyAdmin={handleAdminLogin}
              onBack={handleBackToMethod}
            />
          )
        }
        return <AuthMethodSelector onSelectMethod={handleSelectMethod} />
      
      case 'verification':
        if (authMethod === 'phone') {
          return (
            <OTPVerification
              phoneNumber={credential}
              onVerifyOTP={handleVerifyOTP}
              onBack={handleBackToLogin}
            />
          )
        } else if (authMethod === 'email') {
          return (
            <EmailVerification
              email={credential}
              onVerifyCode={handleVerifyEmailCode}
              onBack={handleBackToLogin}
            />
          )
        }
        return <AuthMethodSelector onSelectMethod={handleSelectMethod} />
      
      case 'authenticated':
        return <MainPage onLogout={handleLogout} isAdmin={authMethod === 'admin'} />
      
      default:
        return <AuthMethodSelector onSelectMethod={handleSelectMethod} />
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {renderCurrentStep()}
    </ThemeProvider>
  )
}

export default App
