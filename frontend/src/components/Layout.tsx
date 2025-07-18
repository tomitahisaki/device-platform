import { Outlet, Link } from 'react-router-dom';
import { ROUTES } from '../router/constants';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1 className="app-title">
            <Link to={ROUTES.HOME} className="title-link">Device Platform</Link>
          </h1>
          <nav className="nav">
            <Link to={ROUTES.HOME_ALT} className="nav-link">ホーム</Link>
            <Link to={ROUTES.SENSOR_DATA} className="nav-link">温湿度データ</Link>
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="footer">
        <p>&copy; 2025 Device Platform</p>
      </footer>
    </div>
  );
}
