// Service Worker for Prayer Times PWA
const CACHE_NAME = 'prayer-times-v1.1.0';
const PRAYER_CACHE_NAME = 'prayer-times-data-v1';
const CACHE_DURATION_DAYS = 30;

// Static assets to cache
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== PRAYER_CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Handle API requests differently
    if (url.hostname === 'api.aladhan.com') {
        event.respondWith(handleAPIRequest(request));
    } else {
        // For static assets, use cache-first strategy
        event.respondWith(handleStaticRequest(request));
    }
});

// Handle API requests with network-first, fallback to cache
async function handleAPIRequest(request) {
    const cache = await caches.open(PRAYER_CACHE_NAME);
    
    try {
        // Try network first
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache the response for offline use
            cache.put(request, networkResponse.clone());
            
            // Add timestamp to track cache age
            const cacheMetadata = {
                timestamp: Date.now(),
                url: request.url
            };
            cache.put(request.url + '-metadata', new Response(JSON.stringify(cacheMetadata)));
        }
        
        return networkResponse;
    } catch (error) {
        // Network failed, try cache
        console.log('[Service Worker] Network failed, trying cache for:', request.url);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            // Check cache age
            const metadataResponse = await cache.match(request.url + '-metadata');
            if (metadataResponse) {
                const metadata = await metadataResponse.json();
                const cacheAge = Date.now() - metadata.timestamp;
                const maxAge = CACHE_DURATION_DAYS * 24 * 60 * 60 * 1000;
                
                if (cacheAge > maxAge) {
                    console.log('[Service Worker] Cache expired for:', request.url);
                    // Could delete expired cache here
                }
            }
            
            return cachedResponse;
        }
        
        // No cache available, return error response
        return new Response(
            JSON.stringify({
                error: 'No internet connection and no cached data available',
                offline: true
            }),
            {
                status: 503,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// Handle static assets with cache-first strategy
async function handleStaticRequest(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('[Service Worker] Failed to fetch:', request.url);
        
        // Return offline page or fallback
        return new Response('Offline', { status: 503 });
    }
}

// Listen for messages from the app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            })
        );
    }
});

// Background sync for updating prayer times
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-prayer-times') {
        event.waitUntil(syncPrayerTimes());
    }
});

async function syncPrayerTimes() {
    console.log('[Service Worker] Background sync: Updating prayer times');
    // This will be triggered by the app when it comes back online
    // The actual fetching is handled by the app itself
}

