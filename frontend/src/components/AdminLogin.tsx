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
import { AdminPanelSettings } from '@mui/icons-material'
import { AuthLayout } from './AuthLayout'

interface AdminLoginProps {
  onVerifyAdmin: (password: string) => void
  onBack: () => void
}

export function AdminLogin({ onVerifyAdmin, onBack }: AdminLoginProps) {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleVerify = async () => {
    if (!password) return
    setIsLoading(true)
    try {
      await onVerifyAdmin(password)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleVerify()
    }
  }

  return (
    <AuthLayout 
      title="Admin Access" 
      subtitle="Enter admin password to continue"
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
                background: 'linear-gradient(45deg, #9c27b0, #ce93d8)',
                mb: 2,
              }}
            >
              <AdminPanelSettings sx={{ color: 'white', fontSize: 28 }} />
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
              Admin Login
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                maxWidth: 360,
                mx: 'auto',
              }}
            >
              This path bypasses OTP. For demo only.
            </Typography>
          </Box>

          <Box component="form" sx={{ mt: 3 }}>
            <TextField
              fullWidth
              id="admin-password"
              label="Admin Password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
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
              onClick={handleVerify}
              disabled={!password || isLoading}
              sx={{
                height: 56,
                fontSize: isMobile ? '16px' : '1rem',
                fontWeight: 600,
                background: 'linear-gradient(45deg, #9c27b0 30%, #ce93d8 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #7b1fa2 30%, #9c27b0 90%)',
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
              {isLoading ? 'Checking...' : 'Sign in as Admin'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default AdminLogin

