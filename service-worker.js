// sw.js — Modern auto-updating with Offline Fallback

const CACHE_NAME = 'dynamic-cache';

// Files to precache (include only critical + offline page)
const PRECACHE_ASSETS = [
  '/',              
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/images/favicon-32x32.png',
  '/header.html',
  'layout.js',
  'members.html',
  'footer.html',
  'gallery.html',
  '/offline.html'   // fallback page
];

// Install: Precache essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

// Activate: Clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch: Stale-while-revalidate with offline fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If request fails and no cache available → show offline.html (for navigation)
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
