// Service Worker for QR Pro Generator
const CACHE_NAME = 'qr-pro-generator-v1.0.0';
const STATIC_CACHE = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/index.html',
    '/favicon.svg',
    '/manifest.json'
];

// CDN resources that should be cached
const CDN_PATTERNS = [
    /^https:\/\/cdn\.tailwindcss\.com/,
    /^https:\/\/esm\.sh/,
    /^https:\/\/fonts\.(googleapis|gstatic)\.com/
];

// Install event - cache static files
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Installation complete');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Installation failed', error);
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

// Fetch event - serve from cache or network
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
                
                // Otherwise fetch from network with better error handling
                return fetch(fetchRequest)
                    .then((response) => {
                        // Check if response is valid
                        if (!response) {
                            throw new Error('No response received');
                        }
                        
                        // Don't cache error responses
                        if (response.status !== 200) {
                            return response;
                        }
                        
                        // Don't cache non-basic responses (CORS, etc.)
                        if (response.type !== 'basic' && response.type !== 'cors') {
                            return response;
                        }
                        
                        // Clone response before caching
                        const responseToCache = response.clone();
                        
                        // Check if we should cache this resource
                        const shouldCache = STATIC_FILES.includes(url.pathname) || 
                                          CDN_PATTERNS.some(pattern => pattern.test(request.url)) ||
                                          url.pathname.startsWith('/assets/');
                        
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
                        
                        // Return offline page for navigation requests
                        if (request.destination === 'document') {
                            return caches.match('/index.html')
                                .then(response => {
                                    if (response) {
                                        return response;
                                    }
                                    return new Response('Offline - Please check your connection', { 
                                        status: 503,
                                        statusText: 'Service Unavailable',
                                        headers: { 'Content-Type': 'text/plain' }
                                    });
                                });
                        }
                        
                        // For other resources, return a generic error response
                        return new Response('Network error', { 
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: { 'Content-Type': 'text/plain' }
                        });
                    });
            })
    );
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

// Helper function for offline QR generation
async function handleOfflineQRGeneration() {
    try {
        console.log('Service Worker: Handling offline QR generation');
        return Promise.resolve();
    } catch (error) {
        console.error('Service Worker: Offline QR generation failed', error);
        return Promise.reject(error);
    }
}
