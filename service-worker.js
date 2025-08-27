const CACHE_NAME = "tmnexus-pwa-cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/logo.png",
  "/assets/three-bg.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
