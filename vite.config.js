import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'bootstrap/dist/js': 'bootstrap/dist/js'
    }
  },
  optimizeDeps: {
    include: ['bootstrap']
  }
})
