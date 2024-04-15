console.log('in sw indeed');

// skipwaiting employed
const cache_name = 'flight-cache-v1.7';

/**
 * Array of files to be cached by the service worker.
 * @type {string[]}
 */
const filestoCache = [
    'index.html',
    'offline.html',
    'style.css',
    'app.js',
    'sw.js',
    'manifest.json',
    'assets/flight_data.json',
    'assets/icon16.png',
    'assets/icon64.png',
    'assets/icon128.png',
    'assets/icon144.png',
    'assets/icon512.png'
];

  const offlineResources = filestoCache.concat(filestoCache, assetoCache);

    

self.addEventListener('activate', e => {
  console.log('activating service worker');
  // Perform any necessary cleanup steps for the previous service worker
  e.waitUntil(
    caches.keys()
      .then((keys) => {
        keys.forEach(key => {
          console.log('Found key: ' + key);
          if (key !== cache_name) {
            console.log('Found old key, will delete later: ' + key);
            caches.delete(key);
          }
        });
      })
  );

  console.log('Claiming clients');
  self.clients.claim();
});

self.addEventListener('install', e => {
  console.log('installing service worker');
  // Perform any necessary setup steps for the service worker
  console.log('INSTALLING');
  console.log('INSTALLING');
  console.log('INSTALLING');
  console.log('INSTALLING');
  console.log('INSTALLING');

  e.waitUntil(
    caches.open(cache_name)
      .then((cache) => {
        console.log('adding resources');
        return cache.addAll(offlineResources);
      })
      .catch((err) => {
        console.log('Error caching resources: ', err);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // If the request is in the cache, return the cached response
          return cachedResponse;
        }

        // If the request is not in the cache and the user is online, fetch the request and cache the response
        if (navigator.onLine) {
          return fetch(e.request)
            .then(response => {
              if (response.status === 200) {
                return caches.open(cache_name)
                  .then(cache => {
                    cache.put(e.request.url, response.clone())
                    .then(() => console.log('Successfully cached response: ', e.request.url))
                    .catch(err => console.log('Error caching response: ', err));
                    //   console.log(response);
                    return response;
                  })
              }
              console.log(response);
              return response;
            });
        }

        // If the user is offline, return the offline page
        return caches.match('/offline.html');
      })
  );
});
