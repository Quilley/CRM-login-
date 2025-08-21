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
import { Phone } from '@mui/icons-material'
import { AuthLayout } from './AuthLayout'

interface LoginPageProps {
  onSendOTP: (phoneNumber: string) => void
  onBack?: () => void
}

export function LoginPage({ onSendOTP, onBack }: LoginPageProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSendOTP = async () => {
    if (!phoneNumber) return
    
    setIsLoading(true)
    try {
      await onSendOTP(phoneNumber)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to continue to your account"
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
              <Phone sx={{ color: 'white', fontSize: 28 }} />
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
              Phone Verification
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                maxWidth: 300,
                mx: 'auto',
              }}
            >
              Enter your phone number to receive a verification code
            </Typography>
          </Box>

          <Box component="form" sx={{ mt: 3 }}>
            <TextField
              fullWidth
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              onClick={handleSendOTP}
              disabled={!phoneNumber || isLoading}
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
        </CardContent>
      </Card>
    </AuthLayout>
  )
}