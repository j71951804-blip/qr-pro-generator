// Service Worker for QR Pro Generator - Complete Version with Error Fixes
const CACHE_NAME = 'qr-pro-generator-v1.0.1';
const STATIC_CACHE = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;

// Files to cache immediately - only cache files that actually exist
const STATIC_FILES = [
    '/',
    '/favicon.svg'
    // Removed /index.html and /manifest.json as they're causing 401/404 errors
    // They will be cached dynamically if they load successfully
];

// CDN resources that should be cached
const CDN_PATTERNS = [
    /^https:\/\/cdn\.tailwindcss\.com/,
    /^https:\/\/esm\.sh/,
    /^https:\/\/fonts\.(googleapis|gstatic)\.com/
];

// Install event - cache static files with error handling
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static files');
                // Cache each file individually with error handling
                return Promise.allSettled(
                    STATIC_FILES.map(url => 
                        cache.add(url).catch(error => {
                            console.warn(`Failed to cache ${url}:`, error);
                            return null; // Continue even if one file fails
                        })
                    )
                );
            })
            .then(() => {
                console.log('Service Worker: Installation complete');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Installation failed', error);
                // Don't fail completely, just continue
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            return cacheName.startsWith('qr-pro-generator-') && 
                                   cacheName !== STATIC_CACHE && 
                                   cacheName !== DYNAMIC_CACHE;
                        })
                        .map((cacheName) => {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('Service Worker: Activation complete');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache or network with comprehensive error handling
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip Chrome extensions
    if (url.protocol === 'chrome-extension:') {
        return;
    }
    
    // Skip analytics and ads
    if (url.hostname.includes('google-analytics.com') || 
        url.hostname.includes('googlesyndication.com') ||
        url.hostname.includes('googletagmanager.com')) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                // Clone request to avoid consuming it
                const fetchRequest = request.clone();
                
                // Otherwise fetch from network with comprehensive error handling
                return fetch(fetchRequest)
                    .then((response) => {
                        // Check if response is valid
                        if (!response) {
                            throw new Error('No response received');
                        }
                        
                        // Handle different response types
                        if (response.status === 404) {
                            console.warn('Service Worker: 404 for', request.url);
                            // For navigation requests, try to serve index.html
                            if (request.destination === 'document') {
                                return caches.match('/').then(indexResponse => {
                                    return indexResponse || response;
                                });
                            }
                            return response;
                        }
                        
                        if (response.status === 401) {
                            console.warn('Service Worker: 401 Unauthorized for', request.url);
                            // Don't cache unauthorized responses, just return them
                            return response;
                        }
                        
                        // Don't cache error responses
                        if (response.status < 200 || response.status >= 400) {
                            return response;
                        }
                        
                        // Don't cache non-basic and non-cors responses for security
                        if (response.type !== 'basic' && response.type !== 'cors' && response.type !== 'opaque') {
                            return response;
                        }
                        
                        // Clone response before caching
                        const responseToCache = response.clone();
                        
                        // Check if we should cache this resource
                        const shouldCache = STATIC_FILES.includes(url.pathname) || 
                                          CDN_PATTERNS.some(pattern => pattern.test(request.url)) ||
                                          url.pathname.startsWith('/assets/') ||
                                          url.pathname === '/manifest.json' ||
                                          url.pathname === '/favicon.svg' ||
                                          url.pathname.endsWith('.js') ||
                                          url.pathname.endsWith('.css') ||
                                          url.pathname.endsWith('.svg') ||
                                          url.pathname.endsWith('.png') ||
                                          url.pathname.endsWith('.jpg') ||
                                          url.pathname.endsWith('.jpeg') ||
                                          url.pathname.endsWith('.gif') ||
                                          url.pathname.endsWith('.woff') ||
                                          url.pathname.endsWith('.woff2');
                        
                        if (shouldCache) {
                            const cacheName = STATIC_FILES.includes(url.pathname) ? STATIC_CACHE : DYNAMIC_CACHE;
                            
                            caches.open(cacheName)
                                .then((cache) => {
                                    cache.put(request, responseToCache);
                                })
                                .catch((error) => {
                                    console.warn('Service Worker: Failed to cache', request.url, error);
                                });
                        }
                        
                        return response;
                    })
                    .catch((error) => {
                        console.warn('Service Worker: Fetch failed for', request.url, error);
                        
                        // Try to serve from cache as fallback
                        return caches.match(request)
                            .then(fallbackResponse => {
                                if (fallbackResponse) {
                                    return fallbackResponse;
                                }
                                
                                // For navigation requests, try to serve index.html
                                if (request.destination === 'document') {
                                    return caches.match('/')
                                        .then(indexResponse => {
                                            if (indexResponse) {
                                                return indexResponse;
                                            }
                                            // Return a basic offline page
                                            return new Response(`
                                                <!DOCTYPE html>
                                                <html lang="en">
                                                <head>
                                                    <meta charset="UTF-8">
                                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                    <title>QR Pro Generator - Offline</title>
                                                    <style>
                                                        body { font-family: system-ui, sans-serif; text-align: center; padding: 50px; background: #f8f9fa; }
                                                        .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                                                        h1 { color: #0D6EFD; margin-bottom: 20px; }
                                                        p { color: #6c757d; margin-bottom: 15px; }
                                                        button { background: #0D6EFD; color: white; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; font-size: 16px; }
                                                        button:hover { background: #0b5ed7; }
                                                    </style>
                                                </head>
                                                <body>
                                                    <div class="container">
                                                        <h1>QR Pro Generator</h1>
                                                        <p>You're currently offline or there's a connection issue.</p>
                                                        <p>Please check your internet connection and try again.</p>
                                                        <button onclick="window.location.reload()">Retry</button>
                                                    </div>
                                                </body>
                                                </html>
                                            `, { 
                                                status: 503,
                                                statusText: 'Service Unavailable',
                                                headers: { 'Content-Type': 'text/html' }
                                            });
                                        });
                                }
                                
                                // For other resources, return a generic error response
                                return new Response('Network error - resource unavailable offline', { 
                                    status: 503,
                                    statusText: 'Service Unavailable',
                                    headers: { 'Content-Type': 'text/plain' }
                                });
                            });
                    });
            })
    );
});

// Background sync for offline QR code generation
self.addEventListener('sync', (event) => {
    if (event.tag === 'qr-code-sync') {
        event.waitUntil(
            handleOfflineQRGeneration()
        );
    }
});

// Push notifications (for future features)
self.addEventListener('push', (event) => {
    if (!event.data) return;
    
    try {
        const data = event.data.json();
        const options = {
            body: data.body || 'New QR code features available!',
            icon: '/favicon.svg',
            badge: '/favicon.svg',
            vibrate: [100, 50, 100],
            data: data.url || '/',
            actions: [
                {
                    action: 'open',
                    title: 'Open App'
                },
                {
                    action: 'close',
                    title: 'Close'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title || 'QR Pro Generator', options)
        );
    } catch (error) {
        console.error('Service Worker: Error handling push notification', error);
    }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'open' || !event.action) {
        event.waitUntil(
            clients.openWindow(event.notification.data || '/')
        );
    }
});

// Message handling for cache updates
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName.startsWith('qr-pro-generator-')) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            if (event.ports && event.ports[0]) {
                event.ports[0].postMessage({ success: true });
            }
        });
    }
});

// Helper function for offline QR generation
async function handleOfflineQRGeneration() {
    try {
        console.log('Service Worker: Handling offline QR generation');
        
        // This would handle any queued QR code generations
        // that were attempted while offline
        // Implementation would depend on your offline storage strategy
        
        return Promise.resolve();
    } catch (error) {
        console.error('Service Worker: Offline QR generation failed', error);
        return Promise.reject(error);
    }
}

// Enhanced error handling for uncaught exceptions in service worker
self.addEventListener('error', (event) => {
    console.error('Service Worker: Uncaught error', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('Service Worker: Unhandled promise rejection', event.reason);
});

console.log('Service Worker: Script loaded successfully with enhanced error handling');
