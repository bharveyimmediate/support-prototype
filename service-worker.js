var CACHE_NAME = 'support-app';
var urlsToCache = [
  '/',
  '/css/bootstrap.min.css',
  '/css/style.css',
  '/js/lunr.js',
  '/js/search.js',
  '/category/subscriptions',
  '/category/accountmanagement',
  '/category/magazinecontent',
  '/category/promotions',
  '/category/mydevice',
  '/mydevice/2019/09/10/once-i-have-finished-with-an-issue-how-do-i-delete-it-from-my-device-to-save-space.html',
  '/mydevice/2019/09/10/my-issue-isnt-downloading-or-is-not-responding-what-can-i-do.html',
  '/accountmanagement/2019/09/10/my-ipad-iphone-is-broken-can-i-read-my-magazine-on-my-android-device.html',
];

const install = function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
};

const handleFetch = function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {

        // if the file is stored in the cache, serve it
        if (response) {
          return response;
        }

        // if the file isn't stored in the cache, fetch it from the internet and serve it
        // return fetch(event.request);

        return fetch(event.request)
          .then(function(response) {
            // serve the response without adding it to the cache if it isn't valid
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // clone the response, because it's a stream and both the cache and
            // the browser can't consume the same stream
            const responseForCache = response.clone();

            // store the response in the cache
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseForCache);
              });

            // serve the file to the browser
            return response;
          });
      })
  )
};

self.addEventListener('install', install);
self.addEventListener('fetch', handleFetch);
