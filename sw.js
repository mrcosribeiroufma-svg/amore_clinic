// Muda este número a cada deploy para forçar atualização
const CACHE = "amore-v3";

self.addEventListener("install", e => {
  // Ativa imediatamente sem esperar aba fechar
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  // Apaga todos os caches antigos
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  // Sempre busca da rede primeiro; só usa cache se offline
  e.respondWith(
    fetch(e.request)
      .then(response => response)
      .catch(() => caches.match(e.request))
  );
});
