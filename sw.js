const CACHE_NAME = 'historia-app-v5';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap',
  './assets/images/context_1889.png',
  './assets/images/queda_imperio.png',
  './assets/images/republica_espada.png',
  './assets/images/encilhamento.png',
  './assets/images/constituicao_1891.png',
  './assets/images/republica_oligarquica.png',
  './assets/images/coronelismo.png',
  './assets/images/voto_cabresto.png',
  './assets/images/politica_governadores.png'
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
