self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
      .open('my-cache-name')
      .then(function(cache) {
        return cache.addAll([
          'index.html',
          'app.css',
          'app.js',
          'index.js',
          '.',
          'milkicon.png',
          'https://redom.js.org/redom.es.js'
        ]);
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Activate');
});

self.addEventListener('fetch', function(event) {
  console.log('Fetch: ', event);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
