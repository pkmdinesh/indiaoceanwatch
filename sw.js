const CACHE_NAME = 'ocean-watch-v2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/ocean-watch-v2-192.png',
  './icons/ocean-watch-v2-512.png',
  './icons/ocean-watch-v2-maskable.png',
  './icons/ocean-watch-v2-apple.png',
  './assets/earthquake-network-icon.png',
  './assets/storm-surge-icon.png',
  './assets/underwater-fish-icon.png'
];

self.addEventListener('install',event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate',event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request, fallbackUrl) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request,response.clone());
    return response;
  } catch {
    return (await cache.match(request)) || (fallbackUrl ? await cache.match(fallbackUrl) : Response.error());
  }
}

self.addEventListener('fetch',event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirst(event.request,'./index.html'));
    return;
  }
  if (url.pathname.endsWith('/status.json')) {
    event.respondWith(networkFirst(event.request));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request,response.clone()));
    return response;
  })));
});
