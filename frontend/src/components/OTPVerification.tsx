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
import { Shield } from '@mui/icons-material'
import { AuthLayout } from './AuthLayout'

interface OTPVerificationProps {
  phoneNumber: string
  onVerifyOTP: (otp: string) => void
  onBack: () => void
}

export function OTPVerification({ phoneNumber, onVerifyOTP, onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleVerifyOTP = async () => {
    if (!otp) return
    
    setIsLoading(true)
    try {
      await onVerifyOTP(otp)
    } finally {
      setIsLoading(false)
    }
  }

  const formatPhoneNumber = (phone: string) => {
    if (phone.length > 6) {
      return phone.slice(0, 3) + '***' + phone.slice(-2)
    }
    return phone
  }

  return (
    <AuthLayout 
      title="Verification" 
      subtitle="Enter the code sent to your phone"
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
              <Shield sx={{ color: 'white', fontSize: 28 }} />
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
              Enter Verification Code
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                maxWidth: 300,
                mx: 'auto',
              }}
            >
              We've sent a 6-digit code to
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                mt: 0.5,
              }}
            >
              {formatPhoneNumber(phoneNumber)}
            </Typography>
          </Box>

          <Box component="form" sx={{ mt: 3 }}>
            <TextField
              fullWidth
              id="otp"
              label="Verification Code"
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                setOtp(value)
              }}
              variant="outlined"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  fontSize: isMobile ? '18px' : '20px',
                  fontFamily: 'monospace',
                  letterSpacing: '0.5em',
                  textAlign: 'center',
                },
                '& .MuiOutlinedInput-input': {
                  textAlign: 'center',
                },
              }}
              inputProps={{
                maxLength: 6,
                style: {
                  fontSize: isMobile ? '18px' : '20px',
                  fontFamily: 'monospace',
                  letterSpacing: '0.5em',
                  textAlign: 'center',
                },
              }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6 || isLoading}
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
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={onBack}
                sx={{
                  height: 48,
                  fontSize: isMobile ? '14px' : '0.9rem',
                  color: 'text.secondary',
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                  },
                }}
              >
                Back to Phone Number
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  display: 'block',
                  mb: 1,
                }}
              >
                Didn't receive the code?
              </Typography>
              <Button
                variant="text"
                size="small"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                }}
              >
                Resend Code
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}