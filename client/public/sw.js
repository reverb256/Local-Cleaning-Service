const CACHE_NAME = 'workplace-janitorial-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/src/index.css',
  '/src/main.tsx'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache installation failed:', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .catch(() => {
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
          });
      })
  );
});