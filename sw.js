const CACHE_NAME = "vibechat-v2";

const APP_FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png",
    "./IMG-20261001-WA0004.jpg"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(APP_FILES);
            })
            .then(function() {
                return self.skipWaiting();
            })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames
                    .filter(function(name) {
                        return name !== CACHE_NAME;
                    })
                    .map(function(name) {
                        return caches.delete(name);
                    })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        fetch(event.request)
            .then(function(response) {
                return response;
            })
            .catch(function() {
                return caches.match(event.request);
            })
    );
});
