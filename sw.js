const CACHE_NAME = 'estudo-historia-v2';
const VERSION = '2026-04-27_v1'; 
// A cada alteração neste arquivo, o navegador detecta a mudança e força a atualização.
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Força o novo Service Worker a assumir imediatamente
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // Deleta todos os caches antigos que não são o v4
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Toma o controle das páginas abertas
  );
});

self.addEventListener('fetch', event => {
  // ESTRATÉGIA NETWORK-FIRST (Sempre tenta buscar a versão mais recente da internet primeiro)
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Se a rede funcionou, atualiza o cache silenciosamente e retorna a resposta fresca
        if(response && response.status === 200 && response.type === 'basic') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
        }
        return response;
      })
      .catch(() => {
        // Se a rede falhar (offline), busca no cache
        return caches.match(event.request);
      })
  );
});
