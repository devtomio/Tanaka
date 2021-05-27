/* eslint-disable */

const version = 'v1::';

self.addEventListener('install', (event) => {
	console.log('[ServiceWorker]: Install in progress...');

	event.waitUntil(
		caches
			.open(`${version}fundamentals`)
			.then((cache) => {
				return cache.addAll([
					'/',
					'/static/ackee.js',
					'/static/color-mode.js',
					'/static/modesta.js',
					'/static/script.js',
					'/static/typed.js',
					'/static/modesta.css',
					'/static/navbar.css',
					'/static/style.css',
				]);
			})
			.then(() => console.log('[ServiceWorker]: Install complete!')),
	);
});

self.addEventListener('fetch', (event) => {
	console.log('[ServiceWorker]: Fetch in progress...');

	if (event.request.method !== 'GET')
		return console.log(`[ServiceWorker]: Blocked a request.\n${event.request.method} ${event.request.url}`);

	event.respondWith(
		caches.match(event.request).then((cached) => {
			const fetchedFromNetwork = (response) => {
				const cacheCopy = response.clone();

				console.log(`[ServiceWorker]: Response from network.\n${event.request.url}`);

				caches.open(`${version}pages`)
					.then((cache) => cache.put(event.request, cacheCopy))
					.then(() =>
						console.log(
							`[ServiceWorker]: Response stored in cache.\n${event.request.url}`,
						),
					);

				return response;
			};

			const unableToResolve = () => {
				console.log(`[ServiceWorker]: Fetch request failed.`);

				return new Response('<h1>Service Unavailable</h1>', {
					status: 503,
					statusText: 'Service Unavailable',
					headers: new Headers({
						'Content-Type': 'text/html',
					}),
				});
			};

			const networked = fetch(event.request).then(fetchedFromNetwork).catch(unableToResolve);
		}),
	);
});
