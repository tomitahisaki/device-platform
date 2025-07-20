import type { RouteObject } from 'react-router-dom';
import Layout from '../shared/components/Layout';
import { HomePage } from '../features/home';
import { SensorDataPage } from '../features/sensor-data';

// ルートの定義
export const routes: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true, // ルートパス (/) にマッチ
				element: <HomePage />,
			},
			{
				path: 'sensor-data',
				element: <SensorDataPage />,
			},
		],
	},
];

// ルートの設定をオブジェクトとしてエクスポート（管理しやすくするため）
export const routeConfig = {
	sensorData: {
		path: '/sensor-data',
		element: <SensorDataPage />,
	},
} as const;
