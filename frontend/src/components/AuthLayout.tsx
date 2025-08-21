import type { ReactNode } from 'react';
import { Box, Container, Paper, IconButton, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { gradients } from '../theme';

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
  showBackButton = true,
}: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: gradients.background,
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
                left: { xs: -8, sm: 0 },
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

          <Box sx={{ textAlign: 'center', pt: onBack && showBackButton ? { xs: 6, sm: 0 } : 0 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: '2rem', sm: '2.5rem' },
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
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