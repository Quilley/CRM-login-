import { ReactNode } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  useTheme, 
  useMediaQuery,
  IconButton,
  Typography
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

export function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  onBack, 
  showBackButton = true 
}: AuthLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ position: 'relative', mb: 4 }}>
          {showBackButton && onBack && (
            <IconButton
              onClick={onBack}
              sx={{
                position: 'absolute',
                left: isMobile ? -8 : 0,
                top: 0,
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <ArrowBack />
            </IconButton>
          )}
          
          <Box sx={{ textAlign: 'center', pt: onBack && showBackButton && isMobile ? 6 : 0 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 1,
                fontSize: isMobile ? '2rem' : '2.5rem',
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>

        <Paper
          elevation={24}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
}