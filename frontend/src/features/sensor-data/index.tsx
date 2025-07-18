import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert, 
  Button 
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

import { SensorDataTable } from './components/SensorDataTable';
import { useSensorData } from './hooks/useSensorData';

export function SensorDataPage() {
  const { sensorData, loading, error, refresh } = useSensorData();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            温湿度データ
          </Typography>
          <Button
            startIcon={<RefreshIcon />}
            onClick={refresh}
            variant="outlined"
            disabled={loading}
          >
            更新
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && sensorData.length === 0 && (
          <Alert severity="info">
            データがありません
          </Alert>
        )}

        {!loading && sensorData.length > 0 && (
          <SensorDataTable sensorData={sensorData} />
        )}
      </Box>
    </Container>
  );
}
