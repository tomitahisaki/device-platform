import { Paper, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { HomeFeatureConfig } from '../types';

interface HeroSectionProps {
  config: HomeFeatureConfig;
}

export function HeroSection({ config }: HeroSectionProps) {
  return (
    <Paper 
      elevation={3}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        p: 6,
        textAlign: 'center',
        borderRadius: 3,
        mb: 4
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        {config.title}
      </Typography>
      <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
        {config.description}
      </Typography>
      <Button
        component={Link}
        to={config.ctaLink}
        variant="contained"
        size="large"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          textTransform: 'none',
          fontWeight: 600
        }}
      >
        {config.ctaText}
      </Button>
    </Paper>
  );
}
