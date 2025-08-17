// 環境変数の管理
export const env = {
	// API Base URL の設定
	// 開発環境: Viteプロキシ経由 (空文字列)
	// 本番環境: Nginxプロキシ経由 (空文字列)
	// 本番ビルド時に VITE_API_URL で上書き可能
	API_BASE_URL: import.meta.env.VITE_API_URL || '',
	
	NODE_ENV: import.meta.env.NODE_ENV || 'development',
	IS_DEVELOPMENT: import.meta.env.DEV,
	IS_PRODUCTION: import.meta.env.PROD,
} as const;

// 環境別のAPI URL説明
// 開発時（npm run dev）: '' → /api/v1/* → Viteプロキシ → http://localhost:8080/api/v1/*
// 本番時（Docker）: '' → /api/v1/* → Nginxプロキシ → backend:8080/api/v1/*
