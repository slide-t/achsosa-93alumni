const CACHE_NAME = 'achsosa-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',    // adjust path if CSS is separate
  '/js/script.js',       // adjust path if JS is separate
  '/img/achsosa2.jpg',
  '/img/achsosa3.jpg',
  '/img/achsosa7.jpg',
  '/img/slide4.jpg',
  '/img/slide5.jpg',
  '/images/favicon-32x32.png',
  '/gallery.html',
  '/footer.html',
  // add other assets you want cached
];

// Install event – cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event – clean old caches
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

// Fetch event – serve cached assets first, update cache automatically
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Update cache in background
        fetch(event.request).then(networkResponse => {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
        });
        return cachedResponse;
      }
      return fetch(event.request).then(networkResponse => {
        // Cache new requests
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // Optional: return offline fallback page or image
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
