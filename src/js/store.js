/* store.js: one place that loads site data. Published files first, then this device's admin changes
   (localStorage). Inside the admin preview iframe it uses the unsaved draft instead. */
(function () {
  const J = (s, k) => { try { return JSON.parse(s.getItem(k)); } catch (e) { return null; } };
  const D = { theme: "classic", tagline: "", home: { hero: true, featured: true, cta: true }, featuredCount: 3, menuLayout: "grid" };
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const SB = window.SB = {
    esc, THEMES: [["classic", "Classic Black & White"], ["cocoa", "Cocoa & Cream"], ["pastel", "Soft Pastel"]],
    load() {
      return SB._p || (SB._p = (async () => {
        const get = u => fetch(u).then(r => r.json()).catch(() => null);
        const [biz, pubSet, pubProd] = await Promise.all([get("../config/business.json"), get("../config/site-settings.json"), get("data/products.json")]);
        const pv = window.top !== window ? J(sessionStorage, "sb_preview") : null;
        const base = { ...D, ...(pubSet || {}) }, own = (pv && pv.settings) || J(localStorage, "sb_settings") || {};
        const settings = { ...base, ...own, home: { ...D.home, ...(base.home || {}), ...(own.home || {}) } };
        const data = J(localStorage, "sb_products") || pubProd || { categories: [], products: [] };
        document.documentElement.dataset.theme = settings.theme;
        return { biz: biz || {}, settings, categories: data.categories || [], products: data.products || [], published: { settings: base, products: pubProd } };
      })());
    },
    card(p, biz) {
      const href = (biz.whatsappLink || "contact.html") + "?text=" + encodeURIComponent("Hi! I'd like to order: " + p.name);
      return `<article class="card pcard"><div class="card__media" aria-hidden="true">${esc(p.emoji || "🍰")}</div><div class="card__body"><h3>${esc(p.name)}</h3><p class="pcard__desc">${esc(p.description)}</p><div class="pcard__foot"><span class="card__price">R ${esc(p.price)}</span><a class="btn btn--sm" target="_blank" rel="noopener" href="${href}">Order</a></div></div></article>`;
    }
  };
})();
