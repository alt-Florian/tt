// Service Worker
const CACHE_NAME = "actioneo-cache-v1";

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(["/", "/index.html", "/manifest.json"]);
		})
	);
});

// Check connectivity periodically
const CHECK_INTERVAL = 3000; // 30 seconds

setInterval(() => {
	fetch("https://google.fr")
		.then(() => {
			self.clients.matchAll().then((clients) => {
				clients.forEach((client) => {
					client.postMessage({
						type: "CONNECTIVITY_STATUS",
						payload: { isOnline: true },
					});
				});
			});
		})
		.catch(() => {
			self.clients.matchAll().then((clients) => {
				clients.forEach((client) => {
					client.postMessage({
						type: "CONNECTIVITY_STATUS",
						payload: { isOnline: false },
					});
				});
			});
		});
}, CHECK_INTERVAL);
