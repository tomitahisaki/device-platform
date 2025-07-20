// 環境変数の管理
export const env = {
	API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
	NODE_ENV: import.meta.env.NODE_ENV || 'development',
	IS_DEVELOPMENT: import.meta.env.DEV,
	IS_PRODUCTION: import.meta.env.PROD,
} as const;
