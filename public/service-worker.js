self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('install', function(event) {
    console.log('install function executed')
});

self.addEventListener('activate', function(event) {
    console.log('activate function executed')
});