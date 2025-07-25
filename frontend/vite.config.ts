import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api/v1': {
				target: process.env.VITE_API_URL || 'http://localhost:8080',
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
