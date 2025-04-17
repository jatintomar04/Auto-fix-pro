import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Import the right package for Tailwind with Vite
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ],
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://auto-fix-pro.onrender.com/",
        changeOrigin: true,
        secure: false,
      }
    }
  }
})