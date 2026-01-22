import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
    server: {
        port: 3000,
        open: true,
        proxy: {
            '/auth': 'http://localhost:8000/api',
            '/users': 'http://localhost:8000/api',
            '/menuInfo': 'http://localhost:8000/api',
            '/problems': 'http://localhost:8000/api',
            '/ratings': 'http://localhost:8000/api',
            '/recommendations': 'http://localhost:8000/api',
            '/saved': 'http://localhost:8000/api',
        }
    }
})
