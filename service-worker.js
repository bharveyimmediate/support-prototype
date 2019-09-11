var CACHE_NAME = 'support-app';

const baseurl = '/support-prototype';

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
  '/subscriptions/2019/09/10/will-i-be-charged-twice-if-i-delete-or-lose-an-issue.html',
  '/subscriptions/2019/09/10/will-i-be-charged-twice-if-i-delete-or-lose-an-issue-and-re-install-it.html',
  '/subscriptions/2019/09/10/when-my-digital-subscription-expires-do-i-keep-the-issues.html',
  '/subscriptions/2019/09/10/im-not-a-subscriber-can-i-still-purchase-the-issues-as-and-when-they-become-available.html',
  '/subscriptions/2019/09/10/if-i-make-an-in-app-purchase-or-subscribe-on-my-ipad-can-i-access-the-content-on-my-iphone.html',
  '/subscriptions/2019/09/10/i-have-a-print-subscription-can-i-transfer-it.html',
  '/subscriptions/2019/09/10/how-do-i-restore-my-previous-purchases.html',
  '/subscriptions/2019/09/10/how-do-i-download-the-latest-issue-as-part-of-my-subscription.html',
  '/subscriptions/2019/09/10/how-can-i-claim-a-refund-if-i-m-not-happy-with-something-i-ve-purchased.html',
  '/subscriptions/2019/09/10/do-i-get-instant-access-to-the-magazine-when-i-subscribe.html',
  '/subscriptions/2019/09/10/do-i-get-any-cover-mounted-extras.html',
  '/subscriptions/2019/09/10/can-i-access-the-digital-editions-for-free-if-i-am-already-a-print-subscriber.html',
  '/accountmanagement/2019/09/10/my-ipad-iphone-is-broken-can-i-read-my-magazine-on-my-android-device.html',
  '/magazinecontent/2019/09/10/why-is-the-digital-edition-sometimes-released-after-the-print-edition-goes-on-sale.html',
  '/mydevice/2019/09/10/why-aren-t-the-links-to-websites-working.html',
  '/mydevice/2019/09/10/problems-with-links-and-downloads.html',
  '/mydevice/2019/09/10/once-i-have-finished-with-an-issue-how-do-i-delete-it-from-my-device-to-save-space.html',
  '/mydevice/2019/09/10/my-issue-isnt-downloading-or-is-not-responding-what-can-i-do.html',
  '/mydevice/2019/09/10/my-app-is-frozen-what-should-i-do.html',
  '/mydevice/2019/09/10/is-the-app-no-longer-viewable-in-landscape.html',
];

const install = function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache.map(url => baseurl + url));
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
