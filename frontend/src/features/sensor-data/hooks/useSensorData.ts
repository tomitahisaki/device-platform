import { useState, useEffect } from 'react';
import { SensorData } from '../../../shared/types/sensor';

export function useSensorData() {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSensorData = async () => {
    try {
      setLoading(true);
      
      // APIエンドポイントからデータを取得
      const response = await fetch('/api/sensor-data');
      if (!response.ok) {
        throw new Error('データの取得に失敗しました');
      }
      
      const data = await response.json();
      setSensorData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
      
      // 開発時のダミーデータ
      const dummyData: SensorData[] = [
        {
          id: 1,
          temperature: 22.5,
          humidity: 45.2,
          created_at: '2024-01-15T10:30:00Z',
          updated_at: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          temperature: 23.1,
          humidity: 48.7,
          created_at: '2024-01-15T11:30:00Z',
          updated_at: '2024-01-15T11:30:00Z'
        },
        {
          id: 3,
          temperature: 21.8,
          humidity: 52.1,
          created_at: '2024-01-15T12:30:00Z',
          updated_at: '2024-01-15T12:30:00Z'
        }
      ];
      setSensorData(dummyData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
  }, []);

  const refresh = () => {
    setError(null);
    fetchSensorData();
  };

  return {
    sensorData,
    loading,
    error,
    refresh
  };
}
