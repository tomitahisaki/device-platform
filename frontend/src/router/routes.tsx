import { RouteObject } from 'react-router-dom';
import LayoutMui from '../components/LayoutMui';
import HomeMui from '../pages/HomeMui';
import SensorListMui from '../pages/SensorListMui';

// ルートの定義
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutMui />,
    children: [
      {
        index: true, // ルートパス (/) にマッチ
        element: <HomeMui />,
      },
      {
        path: 'home',
        element: <HomeMui />,
      },
      {
        path: 'sensor-data',
        element: <SensorListMui />,
      },
    ],
  },
];

// ルートの設定をオブジェクトとしてエクスポート（管理しやすくするため）
export const routeConfig = {
  home: {
    path: '/home',
    element: <HomeMui />,
  },
  sensorData: {
    path: '/sensor-data',
    element: <SensorListMui />,
  },
} as const;
