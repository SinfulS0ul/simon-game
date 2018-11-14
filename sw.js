const CACHE_NAME = 'network-or-cache-v1';

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        '/',
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cacheResponse => {
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            if (response && response.status === 200
                || response &&  response.type === 'basic') {
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));
            }

            return response;
          })
          .catch(() => cacheResponse);
      })
  );
});