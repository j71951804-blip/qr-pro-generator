// main.tsx - Updated version
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { registerSW, setupPWAInstall } from './utils/serviceWorker'
import { analytics } from './services/analytics'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

// Initialize analytics
analytics;

// Register service worker
registerSW();

// Setup PWA install prompt
setupPWAInstall();

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'exception', {
      description: event.error?.message || 'Unknown error',
      fatal: false,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  }
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'exception', {
      description: event.reason?.message || 'Unhandled promise rejection',
      fatal: false,
      promise_rejection: true
    });
  }
});

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
