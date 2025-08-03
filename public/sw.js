// Service Worker for QR Pro Generator - Updated Version with Cache Busting
const CACHE_VERSION = 'v1.0.3'; // Increment this with each update
const STATIC_CACHE = `qr-pro-generator-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `qr-pro-generator-dynamic-${CACHE_VERSION}`;
const API_CACHE = `qr-pro-generator-api-${CACHE_VERSION}`;

// Files to cache immediately - only cache files that actually exist
const STATIC_FILES = [
    '/',
    '/favicon.svg',
    '/manifest.json'
];

// CDN resources that should be cached
const CDN_PATTERNS = [
    /^https:\/\/cdn\.tailwindcss\.com/,
    /^https:\/\/esm\.sh/,
    /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
    /^https:\/\/cdnjs\.cloudflare\.com/
];

// Resources that should never be cached
const NEVER_CACHE_PATTERNS = [
    /^https:\/\/www\.google-analytics\.com/,
    /^https:\/\/www\.googletagmanager\.com/,
    /^https:\/\/pagead2\.googlesyndication\.com/,
    /analytics/,
    /gtag/
];

// Install event - cache static files with improved error handling
self.addEventListener('install', (event) => {
    console.log(`Service Worker: Installing version ${CACHE_VERSION}...`);
    
    event.waitUntil(
        Promise.all([
            // Cache static files with individual error handling
            caches.open(STATIC_CACHE).then((cache) => {
                console.log('Service Worker: Caching static files');
                return Promise.allSettled(
                    STATIC_FILES.map(url => 
                        cache.add(url).catch(error => {
                            console.warn(`Failed to cache ${url}:`, error);
                            return null;
                        })
                    )
                );
            }),
            // Pre-cache critical resources
            self.skipWaiting()
        ]).then(() => {
            console.log(`Service Worker: Installation complete for version ${CACHE_VERSION}`);
        }).catch((error) => {
            console.error('Service Worker: Installation failed', error);
            return self.skipWaiting();
        })
    );
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', (event) => {
    console.log(`Service Worker: Activating version ${CACHE_VERSION}...`);
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            return cacheName.startsWith('qr-pro-generator-') && 
                                   !cacheName.includes(CACHE_VERSION);
                        })
                        .map((cacheName) => {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            }),
            // Claim all clients immediately
            self.clients.claim()
        ]).then(() => {
            console.log(`Service Worker: Activation complete for version ${CACHE_VERSION}`);
            // Notify all clients of the update
            return self.clients.matchAll();
        }).then((clients) => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'SW_UPDATED',
                    version: CACHE_VERSION
                });
            });
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
    
    // Skip Chrome extensions and other protocols
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    // Skip analytics and ads (never cache these)
    if (NEVER_CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
        return;
    }
    
    event.respondWith(handleFetch(request));
});

// Enhanced fetch handler with better error recovery
async function handleFetch(request) {
    const url = new URL(request.url);
    
    try {
        // Try cache first for static resources
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            console.log('Service Worker: Serving from cache:', request.url);
            
            // For HTML files, check if we need to update in background
            if (request.destination === 'document') {
                // Background update for HTML
                fetch(request).then(response => {
                    if (response && response.status === 200) {
                        caches.open(STATIC_CACHE).then(cache => {
                            cache.put(request, response.clone());
                        });
                    }
                }).catch(() => {
                    // Ignore background update failures
                });
            }
            
            return cachedResponse;
        }
        
        // Fetch from network
        console.log('Service Worker: Fetching from network:', request.url);
        const response = await fetch(request, {
            // Add cache-busting for critical resources
            cache: request.destination === 'document' ? 'no-cache' : 'default'
        });
        
        // Handle different response scenarios
        if (!response) {
            throw new Error('No response received');
        }
        
        // Handle navigation requests to non-existent pages
        if (response.status === 404 && request.destination === 'document') {
            console.log('Service Worker: 404 for navigation, serving index');
            const indexResponse = await caches.match('/');
            return indexResponse || response;
        }
        
        // Don't cache error responses
        if (response.status >= 400) {
            console.warn(`Service Worker: HTTP ${response.status} for ${request.url}`);
            return response;
        }
        
        // Don't cache non-basic and non-cors responses for security
        if (response.type !== 'basic' && response.type !== 'cors' && response.type !== 'opaque') {
            return response;
        }
        
        // Clone response before caching
        const responseToCache = response.clone();
        
        // Determine cache strategy
        await cacheResponse(request, responseToCache);
        
        return response;
        
    } catch (error) {
        console.warn('Service Worker: Fetch failed for', request.url, error);
        return handleFetchError(request, error);
    }
}

// Improved cache response logic
async function cacheResponse(request, response) {
    const url = new URL(request.url);
    
    // Determine which cache to use
    let cacheName = DYNAMIC_CACHE;
    
    // Static files go to static cache
    if (STATIC_FILES.includes(url.pathname) || 
        url.pathname === '/' || 
        url.pathname.endsWith('.html')) {
        cacheName = STATIC_CACHE;
    }
    
    // CDN resources
    else if (CDN_PATTERNS.some(pattern => pattern.test(request.url))) {
        cacheName = DYNAMIC_CACHE;
    }
    
    // API responses (if any)
    else if (url.pathname.startsWith('/api/')) {
        cacheName = API_CACHE;
    }
    
    // Assets
    else if (url.pathname.startsWith('/assets/') ||
             url.pathname.match(/\.(js|css|svg|png|jpg|jpeg|gif|woff|woff2|ttf|eot)$/)) {
        cacheName = DYNAMIC_CACHE;
    }
    
    // Don't cache everything else
    else {
        return;
    }
    
    try {
        const cache = await caches.open(cacheName);
        await cache.put(request, response);
        console.log(`Service Worker: Cached in ${cacheName}:`, request.url);
    } catch (error) {
        console.warn('Service Worker: Failed to cache', request.url, error);
    }
}

// Enhanced error handling for failed fetches
async function handleFetchError(request, error) {
    console.error('Service Worker: Network fetch failed:', error);
    
    // Try to serve from any cache as fallback
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        console.log('Service Worker: Serving stale cache for failed request:', request.url);
        return cachedResponse;
    }
    
    // For navigation requests, serve offline page or index
    if (request.destination === 'document') {
        const indexResponse = await caches.match('/');
        if (indexResponse) {
            return indexResponse;
        }
        
        // Return offline page
        return new Response(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>QR Pro Generator - Offline</title>
                <style>
                    body { 
                        font-family: system-ui, sans-serif; 
                        text-align: center; 
                        padding: 50px; 
                        background: #f8f9fa; 
                        margin: 0;
                    }
                    .container { 
                        max-width: 500px; 
                        margin: 0 auto; 
                        background: white; 
                        padding: 40px; 
                        border-radius: 8px; 
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
                    }
                    h1 { color: #0D6EFD; margin-bottom: 20px; }
                    p { color: #6c757d; margin-bottom: 15px; line-height: 1.5; }
                    button { 
                        background: #0D6EFD; 
                        color: white; 
                        border: none; 
                        padding: 12px 24px; 
                        border-radius: 5px; 
                        cursor: pointer; 
                        font-size: 16px; 
                        margin: 5px;
                    }
                    button:hover { background: #0b5ed7; }
                    .error-details {
                        background: #f8f9fa;
                        padding: 15px;
                        border-radius: 5px;
                        margin: 15px 0;
                        font-size: 12px;
                        color: #6c757d;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🔌 Connection Issue</h1>
                    <p>QR Pro Generator is temporarily unavailable.</p>
                    <p>This might be due to:</p>
                    <ul style="text-align: left; display: inline-block;">
                        <li>Network connectivity issues</li>
                        <li>Server maintenance</li>
                        <li>Browser cache problems</li>
                    </ul>
                    <div>
                        <button onclick="window.location.reload(true)">🔄 Retry</button>
                        <button onclick="clearCacheAndReload()">🗑️ Clear Cache & Retry</button>
                    </div>
                    <div class="error-details">
                        Error: ${error.message || 'Network unavailable'}<br>
                        Time: ${new Date().toLocaleString()}<br>
                        SW Version: ${CACHE_VERSION}
                    </div>
                </div>
                <script>
                    function clearCacheAndReload() {
                        if ('caches' in window) {
                            caches.keys().then(function(cacheNames) {
                                return Promise.all(
                                    cacheNames.map(function(cacheName) {
                                        return caches.delete(cacheName);
                                    })
                                );
                            }).then(function() {
                                window.location.reload(true);
                            });
                        } else {
                            window.location.reload(true);
                        }
                    }
                    
                    // Auto-retry after 30 seconds
                    setTimeout(function() {
                        window.location.reload(true);
                    }, 30000);
                </script>
            </body>
            </html>
        `, { 
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 
                'Content-Type': 'text/html',
                'Cache-Control': 'no-cache'
            }
        });
    }
    
    // For other resources, return a generic error response
    return new Response(`Network Error: ${error.message}`, { 
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-cache'
        }
    });
}

// Message handling for cache management and updates
self.addEventListener('message', (event) => {
    console.log('Service Worker: Received message', event.data);
    
    const { type, data } = event.data || {};
    
    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
        case 'FORCE_UPDATE':
        case 'CLEAR_CACHE':
            handleClearCache().then((success) => {
                if (event.ports && event.ports[0]) {
                    event.ports[0].postMessage({ success });
                }
            });
            break;
            
        case 'GET_VERSION':
            if (event.ports && event.ports[0]) {
                event.ports[0].postMessage({ 
                    version: CACHE_VERSION,
                    caches: [STATIC_CACHE, DYNAMIC_CACHE, API_CACHE]
                });
            }
            break;
            
        case 'PREFETCH':
            if (data && data.urls) {
                prefetchResources(data.urls);
            }
            break;
    }
});

// Clear all caches
async function handleClearCache() {
    try {
        const cacheNames = await caches.keys();
        const deletePromises = cacheNames
            .filter(name => name.startsWith('qr-pro-generator-'))
            .map(name => caches.delete(name));
        
        await Promise.all(deletePromises);
        console.log('Service Worker: All caches cleared');
        
        // Claim clients and reload
        await self.clients.claim();
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({ type: 'CACHE_CLEARED' });
        });
        
        return true;
    } catch (error) {
        console.error('Service Worker: Failed to clear caches:', error);
        return false;
    }
}

// Prefetch resources
async function prefetchResources(urls) {
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        const prefetchPromises = urls.map(async (url) => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    await cache.put(url, response);
                    console.log('Service Worker: Prefetched', url);
                }
            } catch (error) {
                console.warn('Service Worker: Failed to prefetch', url, error);
            }
        });
        
        await Promise.allSettled(prefetchPromises);
    } catch (error) {
        console.error('Service Worker: Prefetch failed:', error);
    }
}

// Background sync for offline QR code generation
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync triggered', event.tag);
    
    if (event.tag === 'qr-code-sync') {
        event.waitUntil(handleOfflineQRGeneration());
    }
});

// Handle offline QR generation
async function handleOfflineQRGeneration() {
    try {
        console.log('Service Worker: Handling offline QR generation');
        
        // Get queued QR generations from IndexedDB or localStorage
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({ 
                type: 'SYNC_QR_GENERATION',
                message: 'Processing queued QR codes...'
            });
        });
        
        return Promise.resolve();
    } catch (error) {
        console.error('Service Worker: Offline QR generation failed', error);
        return Promise.reject(error);
    }
}

// Push notifications (for future features)
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push received', event);
    
    if (!event.data) return;
    
    try {
        const data = event.data.json();
        const options = {
            body: data.body || 'QR Pro Generator has new features!',
            icon: '/favicon.svg',
            badge: '/favicon.svg',
            image: data.image,
            vibrate: [100, 50, 100],
            data: {
                url: data.url || '/',
                timestamp: Date.now()
            },
            actions: [
                {
                    action: 'open',
                    title: 'Open App',
                    icon: '/favicon.svg'
                },
                {
                    action: 'close',
                    title: 'Dismiss'
                }
            ],
            requireInteraction: data.requireInteraction || false,
            silent: data.silent || false
        };
        
        event.waitUntil(
            self.registration.showNotification(
                data.title || 'QR Pro Generator', 
                options
            )
        );
    } catch (error) {
        console.error('Service Worker: Error handling push notification', error);
    }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification clicked', event);
    
    event.notification.close();
    
    const urlToOpen = event.notification.data?.url || '/';
    
    if (event.action === 'open' || !event.action) {
        event.waitUntil(
            self.clients.matchAll({ type: 'window' }).then((clients) => {
                // Check if app is already open
                const existingClient = clients.find(client => 
                    client.url.includes(self.location.origin)
                );
                
                if (existingClient) {
                    existingClient.focus();
                    existingClient.postMessage({
                        type: 'NOTIFICATION_CLICKED',
                        url: urlToOpen
                    });
                } else {
                    self.clients.openWindow(urlToOpen);
                }
            })
        );
    }
});

// Periodic background sync (for cleanup and updates)
self.addEventListener('periodicsync', (event) => {
    console.log('Service Worker: Periodic sync', event.tag);
    
    if (event.tag === 'cache-cleanup') {
        event.waitUntil(performCacheCleanup());
    }
});

// Clean up old cache entries
async function performCacheCleanup() {
    try {
        const cacheNames = await caches.keys();
        
        for (const cacheName of cacheNames) {
            if (cacheName.startsWith('qr-pro-generator-')) {
                const cache = await caches.open(cacheName);
                const requests = await cache.keys();
                
                // Remove entries older than 7 days
                const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
                
                for (const request of requests) {
                    const response = await cache.match(request);
                    const dateHeader = response?.headers.get('date');
                    
                    if (dateHeader) {
                        const cacheDate = new Date(dateHeader).getTime();
                        if (cacheDate < oneWeekAgo) {
                            await cache.delete(request);
                            console.log('Service Worker: Cleaned up old cache entry', request.url);
                        }
                    }
                }
            }
        }
        
        console.log('Service Worker: Cache cleanup completed');
    } catch (error) {
        console.error('Service Worker: Cache cleanup failed', error);
    }
}

// Enhanced error handling for uncaught exceptions
self.addEventListener('error', (event) => {
    console.error('Service Worker: Uncaught error', event.error);
    
    // Report to clients
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({
                type: 'SW_ERROR',
                error: event.error?.message || 'Unknown service worker error',
                version: CACHE_VERSION
            });
        });
    });
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('Service Worker: Unhandled promise rejection', event.reason);
    
    // Report to clients
    self.clients.matchAll().then(clients => {
        clients.forEach(client => {
            client.postMessage({
                type: 'SW_ERROR',
                error: event.reason?.message || 'Unhandled promise rejection',
                version: CACHE_VERSION
            });
        });
    });
});

// Initialization log
console.log(`Service Worker: Script loaded successfully - Version ${CACHE_VERSION}`);
console.log('Service Worker: Ready to handle requests with enhanced caching and error recovery');
