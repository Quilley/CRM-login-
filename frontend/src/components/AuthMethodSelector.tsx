import { Box, Button, Typography, Divider, useTheme, useMediaQuery } from '@mui/material'
import { Phone, Email, AdminPanelSettings } from '@mui/icons-material'
import type { AuthMethod } from '../types/auth'
import { AuthLayout } from './AuthLayout'
import { ResponsiveCard } from './ResponsiveCard'

interface AuthMethodSelectorProps {
  onSelectMethod: (method: AuthMethod) => void
}

export function AuthMethodSelector({ onSelectMethod }: AuthMethodSelectorProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <AuthLayout 
      title="Choose Sign-In Method" 
      subtitle="Select how you'd like to authenticate your account"
      showBackButton={false}
    >
      <ResponsiveCard>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 3 }}>
            <Box>
              <Button
                fullWidth
                variant="contained"
                onClick={() => onSelectMethod('phone')}
                sx={{
                  height: 80,
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: 600,
                  transition: 'all 0.2s ease-in-out',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
                startIcon={<Phone sx={{ fontSize: '28px !important' }} />}
              >
                <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
                  Phone Number
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ opacity: 0.9, fontSize: '0.8rem' }}
                >
                  Receive SMS verification code
                </Typography>
              </Button>
            </Box>

            <Box>
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Divider />
                <Typography
                  variant="body2"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    px: 2,
                    color: 'text.secondary',
                    fontWeight: 500,
                  }}
                >
                  OR
                </Typography>
              </Box>
            </Box>

            <Box>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => onSelectMethod('email')}
                sx={{
                  height: 80,
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: 600,
                  borderColor: '#1976d2',
                  borderWidth: 2,
                  color: '#1976d2',
                  '&:hover': {
                    borderColor: '#1565c0',
                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
                startIcon={<Email sx={{ fontSize: '28px !important' }} />}
              >
                <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
                  Email Address
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ opacity: 0.7, fontSize: '0.8rem' }}
                >
                  Receive email verification code
                </Typography>
              </Button>
            </Box>
          </Box>

          <Box>
            <Box sx={{ position: 'relative', mb: 2, mt: 1 }}>
              <Divider />
              <Typography
                variant="body2"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bgcolor: 'background.paper',
                  px: 2,
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                Special
              </Typography>
            </Box>
          </Box>

          <Box>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => onSelectMethod('admin')}
              sx={{
                height: 72,
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: 600,
                borderColor: '#9c27b0',
                borderWidth: 2,
                color: '#9c27b0',
                '&:hover': {
                  borderColor: '#7b1fa2',
                  backgroundColor: 'rgba(156, 39, 176, 0.06)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
              }}
              startIcon={<AdminPanelSettings sx={{ fontSize: '26px !important' }} />}
            >
              <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
                Admin Login
              </Typography>
              <Typography
                variant="body2"
                component="span"
                sx={{ opacity: 0.7, fontSize: '0.8rem' }}
              >
                Sign in with admin password
              </Typography>
            </Button>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                display: 'block',
                lineHeight: 1.5,
              }}
            >
              Both methods are secure and use industry-standard encryption
            </Typography>
          </Box>
      </ResponsiveCard>
    </AuthLayout>
  )
}
