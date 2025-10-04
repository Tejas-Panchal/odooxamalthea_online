import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // All requests to /api will be proxied
      '/api': {
        target: 'http://localhost:5001', // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
