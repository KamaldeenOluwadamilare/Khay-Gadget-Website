const CACHE_NAME = 'khay-gadget-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/laptop.html',
  '/phone.html',
  '/accessories.html',
  '/styles.css',
  '/script.js',
  '/logo.png',
  '/favicon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});