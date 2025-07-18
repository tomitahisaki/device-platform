import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button,
  CircularProgress,
  Alert,
  Chip,
  Container
} from '@mui/material';
import { 
  Refresh as RefreshIcon,
  Thermostat as ThermostatIcon,
  Water as WaterIcon
} from '@mui/icons-material';
import { SensorData } from '../types/sensor';

export default function SensorListMui() {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSensorData();
  }, []);

  const fetchSensorData = async () => {
    try {
      setLoading(true);
      // TODO: 実際のAPIエンドポイントに置き換える
      const response = await fetch('/api/sensor-data');
      if (!response.ok) {
        throw new Error('データの取得に失敗しました');
      }
      const data = await response.json();
      setSensorData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
      // 開発用のダミーデータ
      setSensorData([
        {
          id: 1,
          temperature: 23.5,
          humidity: 45.2,
          created_at: '2025-07-19T10:30:00Z',
          updated_at: '2025-07-19T10:30:00Z'
        },
        {
          id: 2,
          temperature: 24.1,
          humidity: 47.8,
          created_at: '2025-07-19T10:25:00Z',
          updated_at: '2025-07-19T10:25:00Z'
        },
        {
          id: 3,
          temperature: 22.9,
          humidity: 44.1,
          created_at: '2025-07-19T10:20:00Z',
          updated_at: '2025-07-19T10:20:00Z'
        },
        {
          id: 4,
          temperature: 25.3,
          humidity: 50.5,
          created_at: '2025-07-19T10:15:00Z',
          updated_at: '2025-07-19T10:15:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('ja-JP');
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          温湿度データ
        </Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={fetchSensorData}
          disabled={loading}
          sx={{ textTransform: 'none' }}
        >
          更新
        </Button>
      </Box>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body1" component="div">
            ⚠️ {error}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            開発用のダミーデータを表示しています
          </Typography>
        </Alert>
      )}

      <Grid container spacing={3}>
        {sensorData.map((data) => (
          <Grid item xs={12} sm={6} md={4} key={data.id}>
            <Card 
              elevation={2}
              sx={{ 
                height: '100%',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.3s ease'
                }
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Chip 
                    label={`ID: ${data.id}`} 
                    color="primary" 
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {formatDateTime(data.created_at)}
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      p={2} 
                      bgcolor="error.light" 
                      borderRadius={1}
                    >
                      <ThermostatIcon sx={{ mr: 1, color: 'error.main' }} />
                      <Box>
                        <Typography variant="body2" color="error.main">
                          温度
                        </Typography>
                        <Typography variant="h6" color="error.main" fontWeight="bold">
                          {data.temperature}°C
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      p={2} 
                      bgcolor="info.light" 
                      borderRadius={1}
                    >
                      <WaterIcon sx={{ mr: 1, color: 'info.main' }} />
                      <Box>
                        <Typography variant="body2" color="info.main">
                          湿度
                        </Typography>
                        <Typography variant="h6" color="info.main" fontWeight="bold">
                          {data.humidity}%
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {sensorData.length === 0 && !loading && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            データがありません
          </Typography>
        </Box>
      )}
    </Container>
  );
}
