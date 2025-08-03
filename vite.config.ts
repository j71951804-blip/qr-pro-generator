import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsDir: 'assets',
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          qr: ['qrcode.react'],
          utils: ['jspdf', 'jszip', 'file-saver', 'papaparse'],
          icons: ['lucide-react']
        },
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  },
  resolve: {
    alias: {
      '@': new URL('./', import.meta.url).pathname
    }
  },
  server: {
    host: true,
    port: 3000,
    open: true
  },
  preview: {
    host: true,
    port: 3000,
    open: true
  }
})
