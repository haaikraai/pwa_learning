const cache_name = 'flight-cache-v1.0.3'
console.log('In service worker with cache name: ' + cache_name);

self.addEventListener('offline', e => {
    alert('You are offline. Please connect to the internet to view the latest flight data');
});

self.addEventListener('online', e => {
    alert('You are online. You can now view the latest flight data');
});


self.addEventListener('offline', e => {
    console.log('connection went offline');
})

self.addEventListener('activate', e => {
    // Perform any necessary cleanup steps for the previous service worker
    console.log('Activating service worker: ' + e.target);
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            console.log('Found stored caches: ' + cacheNames);
            cacheNames.forEach((cacheName) => {
                console.log('Found stored cache: ' + cacheName);
                // Todo: delete old caches
            })
        })
    )
});

if (!self.navigator.onLine) {
    self.location.href = './offline.html';
}

self.addEventListener('fetch', async (e) => {
    console.log('Fetching resource: ' + e.request.url);
    // Intercept and handle fetch requests
    if (navigator.onLine == 'true') {
        e.respondWith(
            fetch(e.request).then(response => {
                caches.open(cache_name).then(cache => {
                    console.log('Service worker handling fetch event: ' + e.request.url);
                    if (response.status === 200 && cache.match(e.request) === undefined) {
                        console.log('Caching new resource: ' + e);
                        cache.put(e)
                    }
                })
                return response;
            }).catch(err => {
                console.log('Error fetching resource');
            })
        );
    }
    if (navigator.onLine == 'false') {
        const cachedResponse = await caches.match('./offline.html')
        e.respondWith(cachedResponse);
    }
});



self.addEventListener('install', e => {
    console.log('installing service worker');
    // Perform any necessary setup steps for the service worker
    console.log('INSTALLING');
    console.log('INSTALLING');
    console.log('INSTALLING');
    console.log(e.target);
    console.log('INSTALLING');


    e.waitUntil(
        caches.open(cache_name).then(cache => {
            console.log('caching: ' + cache.keys());
            console.log('inside install waitUntil');

            return cache.addAll(['./', './index.html', './offline.html', './app.js', './style.css', './assets/flight-data.json', './assets/icon512.png']);
        }).catch(err => {
            console.log('Error caching files: ' + err);
        })
    );
})