const CACHE_NAME = 'achsosa-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/gallery.html',
  '/footer.html',        // pre-cache footer
  '/css/style.css',
  '/js/script.js',
  '/alumni.html',
  '/json/gallery.json',
  '/images/favicon-32x32.png',
  '/images/achsosa2.jpg',
  '/images/achsosa3.jpg',
  '/images/achsosa7.jpg',
  '/images/slide4.jpg',
  '/images/slide5.jpg',
  // add any other assets you want cached
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

// Fetch event – cache with network update (stale-while-revalidate)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request)
        .then(networkResponse => {
          // Update cache with latest response
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        })
        .catch(() => null); // fallback if offline

      // Always serve footer.html from network if available, else fallback to cache
      if (event.request.url.endsWith('footer.html')) {
        return fetchPromise.then(resp => resp || cachedResponse);
      }

      // For other assets: serve cache first, update in background
      return cachedResponse || fetchPromise;
    })
  );
});
