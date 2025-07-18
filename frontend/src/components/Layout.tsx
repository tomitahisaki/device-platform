import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Button,
  Paper
} from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import { ROUTES } from '../router/constants';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link 
              to={ROUTES.HOME} 
              style={{ 
                color: 'inherit', 
                textDecoration: 'none' 
              }}
            >
              Device Platform
            </Link>
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              component={Link} 
              to={ROUTES.HOME_ALT}
              sx={{ textTransform: 'none' }}
            >
              ホーム
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to={ROUTES.SENSOR_DATA}
              sx={{ textTransform: 'none' }}
            >
              温湿度データ
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
      
      <Paper 
        component="footer" 
        sx={{ 
          mt: 'auto', 
          py: 2, 
          textAlign: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText'
        }}
      >
        <Typography variant="body2">
          &copy; 2025 Device Platform
        </Typography>
      </Paper>
    </Box>
  );
}
