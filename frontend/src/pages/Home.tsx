import { Link } from 'react-router-dom';
import { ROUTES } from '../router/constants';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <h2>IoTデバイス管理プラットフォーム</h2>
        <p>センサーデータを簡単に管理・監視できるプラットフォームです</p>
        <div className="hero-actions">
          <Link to={ROUTES.SENSOR_DATA} className="cta-button">
            温湿度データを見る
          </Link>
        </div>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h3>📊 データ監視</h3>
          <p>リアルタイムでセンサーデータを監視できます</p>
        </div>
        <div className="feature-card">
          <h3>🌡️ 温湿度管理</h3>
          <p>温度と湿度の履歴を確認できます</p>
        </div>
        <div className="feature-card">
          <h3>📈 データ分析</h3>
          <p>時系列でのデータ変化を分析できます</p>
        </div>
      </div>
    </div>
  );
}
