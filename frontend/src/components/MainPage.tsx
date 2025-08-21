import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  Divider,
} from '@mui/material'
// Using Box layout instead of Grid to avoid type issues
import {
  LocationOn,
  Logout,
  Dashboard,
  MyLocation,
  CheckCircle,
  Error,
} from '@mui/icons-material'

interface Location {
  latitude: number
  longitude: number
}

interface MainPageProps {
  onLogout: () => void
  isAdmin?: boolean
}

export function MainPage({ onLogout, isAdmin = false }: MainPageProps) {
  const [location, setLocation] = useState<Location | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const getCurrentLocation = () => {
    setIsLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.')
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setIsLoading(false)
      },
      () => {
        setError('Unable to retrieve your location. Please check permissions.')
        setIsLoading(false)
      }
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Dashboard sx={{ color: 'white', mr: 1 }} />
            <Typography
              variant="h6"
              component="h1"
              sx={{
                fontWeight: 600,
                color: 'white',
                fontSize: isMobile ? '1.1rem' : '1.25rem',
              }}
            >
              Dashboard
            </Typography>
            {isAdmin && (
              <Chip
                label="Admin"
                color="secondary"
                sx={{ ml: 2, color: 'white', fontWeight: 700 }}
              />
            )}
          </Box>
          <IconButton
            onClick={onLogout}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: 'white',
              fontWeight: 700,
              mb: 1,
              fontSize: isMobile ? '1.5rem' : '2rem',
            }}
          >
            Welcome to Your Dashboard
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: isMobile ? '0.9rem' : '1rem',
            }}
          >
            Manage your location services and account settings
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: { xs: '100%', md: '66%', lg: '50%' } }}>
            <Paper
              elevation={24}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
              }}
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
                      <LocationOn sx={{ color: 'white', fontSize: 28 }} />
                    </Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        mb: 1,
                      }}
                    >
                      Location Services
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        maxWidth: 400,
                        mx: 'auto',
                      }}
                    >
                      Get your current geographical location using browser geolocation API
                    </Typography>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={getCurrentLocation}
                    disabled={isLoading}
                    sx={{
                      height: 56,
                      fontSize: isMobile ? '16px' : '1rem',
                      fontWeight: 600,
                      mb: 3,
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
                      ) : (
                        <MyLocation />
                      )
                    }
                  >
                    {isLoading ? 'Getting Location...' : 'Get Current Location'}
                  </Button>

                  {error && (
                    <Alert
                      severity="error"
                      icon={<Error />}
                      sx={{
                        mb: 3,
                        borderRadius: 2,
                        '& .MuiAlert-message': {
                          fontSize: isMobile ? '0.9rem' : '1rem',
                        },
                      }}
                    >
                      {error}
                    </Alert>
                  )}

                  {location && (
                    <Alert
                      severity="success"
                      icon={<CheckCircle />}
                      sx={{
                        mb: 3,
                        borderRadius: 2,
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        border: '1px solid rgba(76, 175, 80, 0.3)',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 2 }}
                      >
                        Location Retrieved Successfully
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'text.secondary',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: 1,
                            }}
                          >
                            Latitude
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: 'monospace',
                              fontWeight: 600,
                              color: 'primary.main',
                              mt: 0.5,
                            }}
                          >
                            {location.latitude.toFixed(6)}°
                          </Typography>
                        </Paper>

                        <Paper
                          variant="outlined"
                          sx={{
                            p: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'text.secondary',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: 1,
                            }}
                          >
                            Longitude
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: 'monospace',
                              fontWeight: 600,
                              color: 'primary.main',
                              mt: 0.5,
                            }}
                          >
                            {location.longitude.toFixed(6)}°
                          </Typography>
                        </Paper>

                        <Divider sx={{ my: 1 }} />
                        
                        <Box sx={{ textAlign: 'center' }}>
                          <Chip
                            label="Coordinates Captured"
                            color="success"
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                          />
                        </Box>
                      </Box>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
