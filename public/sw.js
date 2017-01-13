var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  'https://bootswatch.com/cosmo/bootstrap.min.css',
  '/static/js/bundle*',
  '/api/profile/me'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      // console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// self.addEventListener('sync', function(event) {
//   if (event.tag == 'myFirstSync') {
//     event.waitUntil(workerCUstomHandler());
//   }
// });


// function workerCUstomHandler() {
//   console.log('do some stuff!!!');
// }