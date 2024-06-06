importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.3.0/workbox-sw.js');

const { precacheAndRoute } = workbox.precaching;
const { registerRoute } = workbox.routing;
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;

// Precache all assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache CSS and JS files with a CacheFirst strategy
registerRoute(
  ({ request }) => request.destination === 'style' ||
                 request.destination === 'script',
  new CacheFirst()
);

// Cache images using StaleWhileRevalidate strategy
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate()
);

// Cache HTML pages using CacheFirst strategy
registerRoute(
  ({ request }) => request.destination === 'document',
  new CacheFirst({
    cacheName: 'html-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Activate the service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});