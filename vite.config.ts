import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: '0.0.0.0',
		port: 3000,
	},
	resolve: {
		alias: {
			'@adapters': path.resolve(__dirname, 'src/adapters'),
			'@apps': path.resolve(__dirname, 'src/apps'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@handlers': path.resolve(__dirname, 'src/handlers'),
			'@interfaces': path.resolve(__dirname, 'src/interfaces'),
			'@layouts': path.resolve(__dirname, 'src/layouts'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@services': path.resolve(__dirname, 'src/services'),
			'@classes': path.resolve(__dirname, 'src/classes'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@contexts': path.resolve(__dirname, 'src/contexts'),
			'@configs': path.resolve(__dirname, 'src/configs'),
		},
	},
});
