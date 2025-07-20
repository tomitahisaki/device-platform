// パスの定数定義
export const ROUTES = {
	HOME: '/',
	SENSOR_DATA: '/sensor-data',
} as const;

// パスの型定義
export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
