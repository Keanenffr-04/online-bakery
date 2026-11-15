/* sw.js (v10.26.17): a small service worker so the website can be installed and still opens when the internet is flaky.
   SAFE BY DESIGN:
   - Only plain GET requests to THIS website are ever touched. Everything else (Supabase orders, sign-in, storage, the map, fonts, WhatsApp) goes straight to the network, never cached.
   - Pages and data (config/*.json, data/*.json, js/offline-data.js): NETWORK FIRST. Online you always get the newest; the saved copy is used only when the network fails.
   - CSS and JS: network first too (3.5 s patience on a slow line), so a new version is never mixed with old code. Logos and icons: show the saved copy at once and refresh it in the background.
   - The admin (admin.html, admin.js, admin.css) is NEVER cached.
   - The cart and remembered details live in the phone's own storage, not here, so they can never be stale.
   Change VERSION whenever the site changes so old copies are cleared. */
const VERSION = "sb-v10.28";
const SHELL = ["index.html", "menu.html", "cart.html", "custom-orders.html", "contact.html", "faq.html", "about.html", "offline.html",
  "css/site.css", "js/boot.js", "js/store.js", "js/site.js", "js/cart.js", "js/pages.js", "js/decor.js", "js/pwa.js",
  "themes/base.css", "themes/theme-classic.css", "themes/theme-cocoa.css", "themes/theme-pastel.css", "themes/theme-seasonal.css",
  "../config/business.json", "../config/site-settings.json", "data/products.json", "../assets/icons/icon-192.png", "../assets/logo/logo-light.png", "../assets/logo/logo-mark.png"];
const NEVER = /(^|\/)(admin\.html|theme-preview\.html|sw\.js)$|\/js\/admin\.js$|\/css\/admin\.css$/;
const DATA = /\/(config|data)\/[^/]+\.json$|\/js\/offline-data\.js$/;

self.addEventListener("install", e => {
  // Save the shell page by page: one missing file must not stop the install.
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(SHELL.map(u => c.add(new Request(u, { cache: "reload" })).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.indexOf("sb-v") === 0 && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Network first, but on a slow line give up after 3.5 s and use the saved copy (if there is one), so a flaky connection never hangs the page.
async function networkFirst(req, fallbackUrl) {
  const c = await caches.open(VERSION), saved = await c.match(req, { ignoreSearch: true });
  try {
    const go = fetch(req).then(r => { if (r && r.ok) c.put(req, r.clone()); return r; });
    if (!saved && !fallbackUrl) return await go;
    const r = await Promise.race([go, new Promise((_, no) => setTimeout(() => no(new Error("slow")), 3500))]);
    return r;
  } catch (err) {
    if (saved) return saved;
    if (fallbackUrl) { const f = await c.match(fallbackUrl); if (f) return f; }
    return new Response("", { status: 503, statusText: "Offline" });
  }
}
async function staleWhileRevalidate(req) {
  const c = await caches.open(VERSION), hit = await c.match(req);
  const net = fetch(req).then(r => { if (r && r.ok) c.put(req, r.clone()); return r; }).catch(() => null);
  return hit || (await net) || new Response("", { status: 503, statusText: "Offline" });
}

self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin || NEVER.test(url.pathname)) return;   // the browser handles it as normal
  if (req.mode === "navigate") return void e.respondWith(networkFirst(req, "offline.html"));
  if (DATA.test(url.pathname)) return void e.respondWith(networkFirst(req));
  if (/\.(css|js|webmanifest)$/.test(url.pathname)) return void e.respondWith(networkFirst(req));
  if (/\.(png|jpe?g|svg|webp|ico)$/.test(url.pathname)) return void e.respondWith(staleWhileRevalidate(req));
});
