self.skipWaiting();

self.addEventListener('fetch', function(event) {
    console.log('fetch function executed')
});

self.addEventListener('install', function(event) {
    console.log('install function executed')
});

self.addEventListener('activate', function(event) {
    console.log('activate function executed')
});