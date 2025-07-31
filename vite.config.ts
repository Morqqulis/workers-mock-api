import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': resolve('./src'),
			'@shared': resolve('./src/shared'),
			'@pages': resolve('./src/pages'),
			'@assets': resolve('./src/assets'),
			'@entities': resolve('./src/entities'),
			'@features': resolve('./src/features'),
			'@widgets': resolve('./src/widgets'),
			'@app': resolve('./src/app'),
			'@config': resolve('./src/config'),
			'@hooks': resolve('./src/hooks'),
			'@types': resolve('./src/types'),
		},
	},
})
