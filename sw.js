/**
 * Service worker do 4Bros.
 *
 * Deliberadamente conservador: guarda só a casca do app (HTML, ícones) para
 * abrir rápido e não mostrar tela de dinossauro sem internet.
 *
 * NÃO faz cache de chamadas à API. Guardar resposta de /rest/v1 significaria
 * mostrar lista de presença velha ou saldo desatualizado — pior do que não
 * mostrar nada, porque a pessoa confia no número errado.
 */

const CACHE = "4bros-shell-v2";
const SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // O Torneio vive em outro app, no subcaminho /torneio. O SW do 4Bros não deve
  // interceptar nada dali (senão, offline, serviria a casca errada).
  if (url.pathname.startsWith("/torneio")) return;

  // Nada de outra origem (Supabase, Google Fonts) passa pelo cache.
  if (url.origin !== self.location.origin) return;

  // Navegação: tenta a rede e cai para o cache quando estiver offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/").then((r) => r ?? Response.error())),
    );
    return;
  }

  // Assets versionados pelo Vite: cache primeiro, é seguro porque o nome muda.
  if (url.pathname.startsWith("/assets/") || url.pathname.startsWith("/icons/")) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ??
          fetch(request).then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
            return res;
          }),
      ),
    );
  }
});

// Notificação push: chega mesmo com o app fechado, desde que o aparelho
// tenha aceitado e o atalho esteja instalado (obrigatório no iPhone).
self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: "4Bros", body: event.data ? event.data.text() : "" };
  }

  event.waitUntil(
    self.registration.showNotification(data.title || "4Bros", {
      body: data.body || "",
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      data: { link: data.link || "/dashboard" },
    }),
  );
});

// Toque na notificação: foca uma aba já aberta no link, ou abre uma nova.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const link = event.notification.data?.link || "/dashboard";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(link) && "focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(link);
    }),
  );
});
