import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Paper,
  Container
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '../router/constants';
import { 
  Analytics as AnalyticsIcon,
  Thermostat as ThermostatIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

export default function HomeMui() {
  return (
    <Container maxWidth="md">
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
          IoTデバイス管理プラットフォーム
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
          センサーデータを簡単に管理・監視できるプラットフォームです
        </Typography>
        <Button
          component={Link}
          to={ROUTES.SENSOR_DATA}
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
          温湿度データを見る
        </Button>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card 
            elevation={2}
            sx={{ 
              height: '100%',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <AnalyticsIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                データ監視
              </Typography>
              <Typography variant="body1" color="text.secondary">
                リアルタイムでセンサーデータを監視できます
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            elevation={2}
            sx={{ 
              height: '100%',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <ThermostatIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                温湿度管理
              </Typography>
              <Typography variant="body1" color="text.secondary">
                温度と湿度の履歴を確認できます
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            elevation={2}
            sx={{ 
              height: '100%',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <TrendingUpIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                データ分析
              </Typography>
              <Typography variant="body1" color="text.secondary">
                時系列でのデータ変化を分析できます
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
