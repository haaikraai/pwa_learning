const cache_name = 'flight-cache-v1'

window.addEventListener('offline', e => {
    alert('You are offline. Please connect to the internet to view the latest flight data');
});

window.addEventListener('online', e => {
    alert('You are online. You can now view the latest flight data');
});


self.addEventListener('offline', e => {
    console.log('connection went offline');
})

self.addEventListener('activate', e => {
    console.log('Activating service worker');
    // Perform any necessary cleanup steps for the previous service worker
});

self.addEventListener('fetch', async (e) => {
    console.log('Fetching resource');
    // Intercept and handle fetch requests
    if (navigator.onLine == 'true') {
        e.respondWith(
            fetch(e.request).then(response => {
                caches.open(cache_name).then(cache => {
                    if (response.status === 200 && cache.match(e.request) === undefined) {
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
        const cachedResponse = await caches.match('/offline.html')
        e.respondWith(cachedResponse);
    }
});

self.addEventListener('install', e => {
    console.log('installing service worker');
    // Perform any necessary setup steps for the service worker
    console.log('INSTALLING');
    console.log('INSTALLING');
    console.log('INSTALLING');
    console.log('INSTALLING');
    console.log('INSTALLING');

    e.waitUntil(async () => {
        // can have any name
        caches.open(cache_name).then(cache => {
            return cache.addAll(['./', './index.html', './offline.html', './app.js', './style.css', './assets/flight-data.json', './assets/icon128.png']);
        })
    });
})