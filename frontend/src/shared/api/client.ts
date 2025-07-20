import axios from 'axios';
import { env } from '../constants/env';

// Axiosインスタンスの作成
export const apiClient = axios.create({
	baseURL: env.API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// リクエストインターセプター
apiClient.interceptors.request.use(
	(config) => {
		// リクエスト前の処理（認証トークンの追加など）
		console.log('Request:', config.method?.toUpperCase(), config.url);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// レスポンスインターセプター
apiClient.interceptors.response.use(
	(response) => {
		// 成功レスポンスの処理
		console.log('Response:', response.status, response.config.url);
		return response;
	},
	(error) => {
		// エラーレスポンスの処理
		console.error('API Error:', error.response?.status, error.response?.statusText);
		return Promise.reject(error);
	}
);
