const CACHE_NAME = "tmnexus-pwa-cache-v2"; 
const ASSETS = [
  "/",
  "/manifest.json",
  "/assets/logo.png",
  "/assets/three-bg.js"
];

// Install: cache non-HTML assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activate: delete old cache versions
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

// Fetch: network-first for HTML, cache-first for others
self.addEventListener("fetch", event => {
  const req = event.request;
  
  if (req.mode === 'navigate' || req.destination === 'document') {
    // For HTML, always try network first
    event.respondWith(
      fetch(req).catch(() => caches.match("/index.html"))
    );
  } else {
    // For other requests (images, JS), use cache first
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req))
    );
  }
});
