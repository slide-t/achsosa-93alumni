const CACHE_NAME = 'achsosa-cache-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/gallery.html',
  '/footer.html',
  '/css/style.css',
  '/js/script.js',
  '/images/achsosa2.jpg',
  '/images/achsosa3.jpg',
  '/images/achsosa7.jpg',
  '/images/slide4.jpg',
  '/images/slide5.jpg',
  '/images/achsosaazeez.jpg',
  '/images/favicon-32x32.png',
  '/images/offline-placeholder.png' // offline fallback image
];

// Install event – cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event – remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event – cache-first with background update & image fallback
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
          // HTML pages fallback
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
          // Image fallback
          if (event.request.destination === 'image') {
            return caches.match('/images/offline-placeholder.png');
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});
