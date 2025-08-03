import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsDir: 'assets',
    rollupOptions: {
      input: './index.html',
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    host: true,
    port: 3000
  },
  preview: {
    host: true,
    port: 3000
  }
})
