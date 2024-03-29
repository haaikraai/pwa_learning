console.log('in sw indeed');

const cache_name = 'flight-cache-v1.3';
const offlineResources = [
    'offline.html',
    'style.css',
    'app.js'];

self.addEventListener('offline', e => {
    alert('You are offline. Please connect to the internet to view the latest flight data');
});:

self.addEventListener('online', e => {
    alert('You are online. You can now view the latest flight data');
});


self.addEventListener('offline', e => {
    console.log('connection went offline');
})

self.addEventListener('activate', e => {
    console.log('Activating service worker in sw.js');
    // Perform any necessary cleanup steps for the previous service worker
});

self.addEventListener('fetch', async (e) => {
    console.log('Fetching resource');
    // Intercept and handle fetch requests
    // Online/offline check does not seem to work. Never true
    if (self.navigator.onLine == true) {
        console.log('Online, fetching from network');
        e.respondWith(
            fetch(e.request).then(response => {
                caches.open(cache_name).then(cache => {
                    if (response.status === 200 && cache.match(e.request) === undefined) {
                        console.log('Found a cached match: ' + e.request.url);
                        cache.put(e);
                    }
                })
                return response;
            }).catch(err => {
                console.log('Error fetching resource: ', err);

            })
        );
    }
    if (self.navigator.onLine == false) {
        console.log('Offline, going to page');
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

    e.waitUntil((async () => {
        try{
        const cache = await caches.open(cache_name)
        console.log('adding resources');
        await cache.addAll(offlineResources);
    } catch (err) {
        console.log('Error caching resources: ', err);
    }
    })());
});