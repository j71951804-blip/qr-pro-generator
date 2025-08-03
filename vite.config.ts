import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsDir: 'assets',
    copyPublicDir: true,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          qr: ['qrcode.react'],
          utils: ['jspdf', 'jszip', 'file-saver', 'papaparse'],
          icons: ['lucide-react'],
          analytics: ['@vercel/analytics']
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const extType = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) {
            return `assets/images/[name].[hash].[ext]`
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return `assets/fonts/[name].[hash].[ext]`
          }
          return `assets/[name].[hash].[ext]`
        },
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js'
      }
    },
    // Ensure compatibility with older browsers
    target: 'es2015',
    minify: 'esbuild', // Use esbuild instead of terser
    // Remove terser options since we're using esbuild
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@components': resolve(__dirname, './components'),
      '@pages': resolve(__dirname, './pages'),
      '@services': resolve(__dirname, './services'),
      '@constants': resolve(__dirname, './constants.ts'),
      '@types': resolve(__dirname, './types.ts')
    }
  },
  server: {
    host: true,
    port: 3000,
    open: true,
    cors: true,
    strictPort: false
  },
  preview: {
    host: true,
    port: 3000,
    open: true,
    strictPort: false
  },
  define: {
    // Replace env variables at build time
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'qrcode.react',
      'lucide-react',
      'jspdf',
      'jszip',
      'file-saver',
      'papaparse',
      '@vercel/analytics'
    ]
  },
  css: {
    postcss: {
      plugins: []
    }
  },
  esbuild: {
    // Remove console.log in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  }
})
