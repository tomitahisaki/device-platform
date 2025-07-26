import axios from 'axios';
import { env } from '../constants/env';
import applyCaseMiddleware from 'axios-case-converter';

// Axiosインスタンスの作成
export const apiClient = applyCaseMiddleware(axios.create({
	baseURL: env.API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
}));

// リクエストインターセプター
apiClient.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// レスポンスインターセプター
apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);
