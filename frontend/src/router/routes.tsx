import { RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import SensorList from '../pages/SensorList';

// ルートの定義
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // ルートパス (/) にマッチ
        element: <Home />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'sensor-data',
        element: <SensorList />,
      },
    ],
  },
];

// ルートの設定をオブジェクトとしてエクスポート（管理しやすくするため）
export const routeConfig = {
  home: {
    path: '/home',
    element: <Home />,
  },
  sensorData: {
    path: '/sensor-data',
    element: <SensorList />,
  },
} as const;
