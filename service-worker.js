const CACHE_NAME = "buscafarma-v2";

self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/buscafarma/",
        "/buscafarma/index.html"
      ]);
    })
  );
});
