importScripts('./js/config.js');

const CONFIG = self.OCEAN_WATCH_CONFIG;
const CACHE_NAME = `${CONFIG.CACHE_PREFIX}-v${CONFIG.CACHE_VERSION}`;
const APP_SHELL = [
  './',
  './index.html',
  './favicon.ico',
  './css/base.css',
  './css/layout.css',
  './css/components.css',
  './css/responsive.css',
  './css/print.css',
  './js/config.js',
  './js/i18n.js',
  './js/app.js',
  './js/share.js',
  './js/map.js',
  './js/pfz-map.js',
  './js/pfz.js',
  './js/advisory.js',
  './js/tsunami.js',
  './js/cyclone.js',
  './js/seismic.js',
  './js/port-tides.js',
  './js/voice-summary.js',
  './js/status.js',
  './js/notifications.js',
  './js/pwa.js',
  './js/tchp.js',
  './js/announcements.js',
  './vendor/leaflet/leaflet.js',
  './vendor/leaflet/leaflet.css',
  './vendor/qrcode.min.js',
  './vendor/html2canvas.min.js',
  './data/pfz-lines.geojson',
  './data/pfz-sectors.geojson',
  './data/pfz-eez.geojson',
  './data/pfz-landing-centres.geojson',
  './data/osf-district-polygons.geojson',
  './data/tides.json',
  './manifest.webmanifest',
  './icons/ocean-watch-v3-192.png',
  './icons/ocean-watch-v3-512.png',
  './icons/ocean-watch-v3-maskable.png',
  './icons/ocean-watch-v3-apple.png',
  './assets/ocean-watch-v3-512.png',
  './assets/earthquake-network-icon.png',
  './assets/ocean-wave-service-icon.png',
  './assets/tsunami-service-icon.png',
  './assets/cyclone-service-icon.png',
  './assets/storm-surge-icon.png',
  './assets/potential-fishing-zone-icon.jpg',
  './assets/marine-climate-icon.png',
  './1786177913304.png'
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
    if (!response.ok) return (await cache.match(request)) || (fallbackUrl ? await cache.match(fallbackUrl) : null) || response;
    await cache.put(request,response.clone());
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
    if (!response.ok) return (await cache.match(cacheKey)) || response;
    await cache.put(cacheKey,response.clone());
    return response;
  } catch {
    return (await cache.match(cacheKey)) || Response.error();
  }
}

async function vendorCacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) {
    const headers = new Headers(cached.headers);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return new Response(cached.body, {
      status: cached.status,
      statusText: cached.statusText,
      headers
    });
  }
  const response = await fetch(request);
  if (response.ok) {
    await cache.put(request, response.clone());
  }
  return response;
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
  if (url.pathname.endsWith('/data/tides.json')) {
    event.respondWith(networkFirst(event.request));
    return;
  }
  if (url.pathname.includes('/vendor/')) {
    event.respondWith(vendorCacheFirst(event.request));
    return;
  }
  if (url.pathname.endsWith('/announcements.js')) {
    event.respondWith(networkFirst(event.request,'./js/announcements.js'));
    return;
  }
  if (/\/data\/pfz-[^/]+\.geojson$/.test(url.pathname)) {
    event.respondWith(networkFirst(event.request));
    return;
  }
  if (url.pathname.includes('/audio/bulletins/')) {
    event.respondWith(fetch(event.request));
    return;
  }
  if (url.pathname.includes('/js/') || url.pathname.includes('/css/')) {
    event.respondWith(networkFirst(event.request));
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) {
      return cached;
    }
    const response = await fetch(event.request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(event.request,response.clone());
    }
    return response;
  })());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || './';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        if (client.url && 'focus' in client) {
          if (event.notification.data?.url && client.navigate) {
            client.navigate(targetUrl);
          }
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

self.addEventListener('push', event => {
  if (!event.data) return;
  try {
    const payload = event.data.json();
    const title = payload.title || '🚨 Ocean Watch Alert';
    const options = {
      body: payload.body || 'New coastal advisory update.',
      icon: './icons/ocean-watch-v3-192.png',
      badge: './icons/ocean-watch-v3-192.png',
      vibrate: [200, 100, 200],
      tag: payload.tag || 'ocean-watch-push',
      data: { url: payload.url || './' }
    };
    event.waitUntil(self.registration.showNotification(title, options));
  } catch {
    event.waitUntil(self.registration.showNotification('🚨 Ocean Watch Alert', {
      body: event.data.text() || 'New coastal advisory update.',
      icon: './icons/ocean-watch-v3-192.png',
      badge: './icons/ocean-watch-v3-192.png'
    }));
  }
});
