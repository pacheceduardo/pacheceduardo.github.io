/**
 * Service worker do app de gestão (escopo /gestao/).
 *
 * Igual ao do app: guarda só a casca (HTML e ícones) para abrir rápido e não
 * cair na tela de dinossauro sem internet. Nunca guarda resposta da API: um
 * número velho de caixa ou de lista é pior do que nenhum.
 */

const CACHE = "4bros-gestao-v1";
const SHELL = [
  "/gestao/",
  "/gestao/manifest.webmanifest",
  "/gestao/icons/icon-192.png",
  "/gestao/icons/icon-512.png",
];

const MAX_ASSETS = 200;
const aparar = (cache) =>
  cache.keys().then((reqs) => {
    const assets = reqs.filter((r) => new URL(r.url).pathname.startsWith("/gestao/assets/"));
    const sobra = assets.length - MAX_ASSETS;
    if (sobra > 0) return Promise.all(assets.slice(0, sobra).map((r) => cache.delete(r)));
  });

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      // Só os caches da gestão: os do app (4bros-shell-*) são do outro service worker.
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("4bros-gestao-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match("/gestao/").then((r) => r ?? Response.error())));
    return;
  }

  // Arquivos com nome versionado pelo Vite: cache primeiro. Só guarda resposta OK.
  if (url.pathname.startsWith("/gestao/assets/") || url.pathname.startsWith("/gestao/icons/")) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ??
          fetch(request).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(request, copy).then(() => aparar(c)));
            }
            return res;
          }),
      ),
    );
  }
});
