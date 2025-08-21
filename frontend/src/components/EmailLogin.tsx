import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material'
import { Email } from '@mui/icons-material'
import { AuthLayout } from './AuthLayout'

interface EmailLoginProps {
  onSendVerification: (email: string) => void
  onBack: () => void
}

export function EmailLogin({ onSendVerification, onBack }: EmailLoginProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSendVerification = async () => {
    if (!email || !isValidEmail(email)) return
    
    setIsLoading(true)
    try {
      await onSendVerification(email)
    } finally {
      setIsLoading(false)
    }
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendVerification()
    }
  }

  return (
    <AuthLayout 
      title="Email Sign In" 
      subtitle="Enter your email to receive a verification code"
      onBack={onBack}
    >
      <Card sx={{ border: 'none', boxShadow: 'none' }}>
        <CardContent sx={{ p: isMobile ? 3 : 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                mb: 2,
              }}
            >
              <Email sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                mb: 1,
              }}
            >
              Email Verification
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                maxWidth: 300,
                mx: 'auto',
              }}
            >
              We'll send a secure verification code to your email address
            </Typography>
          </Box>

          <Box component="form" sx={{ mt: 3 }}>
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              error={email.length > 0 && !isValidEmail(email)}
              helperText={
                email.length > 0 && !isValidEmail(email)
                  ? 'Please enter a valid email address'
                  : ''
              }
              variant="outlined"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  height: 56,
                },
              }}
              InputProps={{
                sx: {
                  fontSize: isMobile ? '16px' : '1rem',
                },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleSendVerification}
              disabled={!email || !isValidEmail(email) || isLoading}
              sx={{
                height: 56,
                fontSize: isMobile ? '16px' : '1rem',
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                },
                '&:disabled': {
                  background: 'rgba(0, 0, 0, 0.12)',
                },
              }}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                display: 'block',
                lineHeight: 1.5,
              }}
            >
              Check your email inbox and spam folder for the verification code
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}