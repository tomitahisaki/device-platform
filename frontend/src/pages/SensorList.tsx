import { useState, useEffect } from 'react';
import { SensorData } from '../types/sensor';
import './SensorList.css';

export default function SensorList() {
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
          created_at: '2025-07-18T10:30:00Z',
          updated_at: '2025-07-18T10:30:00Z'
        },
        {
          id: 2,
          temperature: 24.1,
          humidity: 47.8,
          created_at: '2025-07-18T10:25:00Z',
          updated_at: '2025-07-18T10:25:00Z'
        },
        {
          id: 3,
          temperature: 22.9,
          humidity: 44.1,
          created_at: '2025-07-18T10:20:00Z',
          updated_at: '2025-07-18T10:20:00Z'
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
      <div className="sensor-list">
        <h2>温湿度データ</h2>
        <div className="loading">データを読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="sensor-list">
      <div className="header-section">
        <h2>温湿度データ</h2>
        <button 
          onClick={fetchSensorData} 
          className="refresh-button"
          disabled={loading}
        >
          更新
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
          <p className="error-note">開発用のダミーデータを表示しています</p>
        </div>
      )}

      <div className="data-grid">
        {sensorData.map((data) => (
          <div key={data.id} className="data-card">
            <div className="data-header">
              <span className="data-id">ID: {data.id}</span>
              <span className="data-time">{formatDateTime(data.created_at)}</span>
            </div>
            <div className="data-values">
              <div className="value-item temperature">
                <span className="value-label">温度</span>
                <span className="value">{data.temperature}°C</span>
              </div>
              <div className="value-item humidity">
                <span className="value-label">湿度</span>
                <span className="value">{data.humidity}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sensorData.length === 0 && !loading && (
        <div className="no-data">
          <p>データがありません</p>
        </div>
      )}
    </div>
  );
}
