import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
function pathResolve(dir: string) {
	return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
		alias: [
			{
				find: /~\//,
				replacement: pathResolve('.') + '/',
			},
			{
				find: /@\//,
				replacement: pathResolve('src') + '/',
			},
			{
				find: /@api/,
				replacement: pathResolve('src') + '/utils/api/index.ts',
			},
		],
	},
})
