const CACHE_NAME = 'ocean-watch-v20';
const APP_SHELL = [
  './',
  './index.html',
  './status.json',
  './manifest.webmanifest',
  './icons/ocean-watch-v3-192.png',
  './icons/ocean-watch-v3-512.png',
  './icons/ocean-watch-v3-maskable.png',
  './icons/ocean-watch-v3-apple.png',
  './assets/earthquake-network-icon.png',
  './assets/ocean-wave-service-icon.png',
  './assets/tsunami-service-icon.png',
  './assets/cyclone-service-icon.png',
  './assets/storm-surge-icon.png',
  './assets/potential-fishing-zone-icon.jpg'
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
    const response = await fetch(request,{cache:'no-store'});
    if (response.ok) cache.put(request,response.clone());
    return response;
  } catch {
    return (await cache.match(request)) || (fallbackUrl ? await cache.match(fallbackUrl) : Response.error());
  }
}

async function statusNetworkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cacheKey = new Request(new URL('./status.json',self.location.href));
  try {
    const response = await fetch(request,{cache:'no-store'});
    if (response.ok) await cache.put(cacheKey,response.clone());
    return response;
  } catch {
    return (await cache.match(cacheKey)) || Response.error();
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
    event.respondWith(statusNetworkFirst(event.request));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request,response.clone()));
    return response;
  })));
});
