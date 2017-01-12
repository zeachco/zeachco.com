var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  'https://bootswatch.com/cosmo/bootstrap.min.css',
  '/static/js/bundle.js',
  '/api/profile/me'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});