const CACHE_NAME = "buscafarma-v3"; // 🔥 sempre aumenta versão quando atualizar

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/dipirona.jpg",
  "/dorflex.jpg",
  "/paracetamol.jpg"
];

// 🔥 INSTALAÇÃO
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 🔥 ATIVAÇÃO (limpa cache antigo)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 🔥 FETCH (estratégia inteligente)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // salva no cache versão nova
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // se offline, tenta cache
        return caches.match(event.request);
      })
  );
});
