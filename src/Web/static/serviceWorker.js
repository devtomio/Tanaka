/* eslint-disable */

const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
	'/',
	'/static/ackee.js',
	'/static/color-mode.js',
	'/static/modesta.js',
	'/static/script.js',
	'/static/typed.js',
	'/static/modesta.css',
	'/static/navbar.css',
	'/static/style.css',
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(PRECACHE)
			.then((cache) => cache.addAll(PRECACHE_URLS))
			.then(self.skipWaiting()),
	);
});

self.addEventListener('activate', (event) => {
	const currentCaches = [PRECACHE, RUNTIME];
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
			})
			.then((cachesToDelete) => {
				return Promise.all(
					cachesToDelete.map((cacheToDelete) => {
						return caches.delete(cacheToDelete);
					}),
				);
			})
			.then(() => self.clients.claim()),
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.url.startsWith(self.location.origin)) {
		event.respondWith(
			caches.match(event.request).then((cachedResponse) => {
				if (cachedResponse) {
					return cachedResponse;
				}

				return caches.open(RUNTIME).then((cache) => {
					return fetch(event.request).then((response) => {
						// Put a copy of the response in the runtime cache.
						return cache.put(event.request, response.clone()).then(() => {
							return response;
						});
					});
				});
			}),
		);
	}
});
