/* cart.js (v10.2): the simple cart. Lives in this browser (localStorage "sb_cart"), no accounts, no payments.
   The customer adds items, opens the Cart page, and sends ONE WhatsApp message with the whole order.
   Loaded on every public page (after store.js, before site.js) so the header badge and every "Add" button work everywhere. */
(function () {
  const KEY = "sb_cart", MAX = 99;
  const read = () => { try { const c = JSON.parse(localStorage.getItem(KEY)); return c && Array.isArray(c.items) ? c : { items: [], meta: {} }; } catch (e) { return { items: [], meta: {} }; } };
  const write = c => { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) { /* private mode / storage full: the cart just won't persist */ } };
  const money = n => "R " + String(Math.round((Number(n) || 0) * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const price = p => Number(p && p.price) || 0;
  let live; // visually hidden status line for screen readers ("X added to cart")
  const say = t => {
    if (!live) { live = document.createElement("div"); live.className = "sr-only"; live.setAttribute("role", "status"); live.setAttribute("aria-live", "polite"); document.body.append(live); }
    live.textContent = ""; setTimeout(() => { live.textContent = t; }, 30);
  };

  const Cart = window.SBCart = {
    money, price,
    get() { return read(); },
    count() { return read().items.reduce((n, i) => n + i.q, 0); },
    qty(id) { const i = read().items.find(x => x.id === id); return i ? i.q : 0; },
    add(id, n) { const c = read(), i = c.items.find(x => x.id === id); if (i) i.q = Math.min(MAX, i.q + (n || 1)); else c.items.push({ id, q: Math.min(MAX, n || 1) }); write(c); Cart.sync(); },
    set(id, q) { const c = read(); q = Math.max(0, Math.min(MAX, Math.floor(q) || 0)); c.items = q ? c.items.map(i => i.id === id ? { ...i, q } : i) : c.items.filter(i => i.id !== id); write(c); Cart.sync(); },
    remove(id) { Cart.set(id, 0); },
    clear() { const c = read(); c.items = []; write(c); Cart.sync(); },
    meta(patch) { const c = read(); if (patch) { c.meta = { ...c.meta, ...patch }; write(c); } return c.meta || {}; },
    // Cart rows joined with the live product data. Items whose product was removed or hidden are dropped from the view.
    async lines() {
      const { products } = await SB.load(), vis = products.filter(p => p.visible !== false);
      const lines = [], gone = [];
      read().items.forEach(i => { const p = vis.find(x => x.id === i.id); if (p) lines.push({ p, q: i.q, sub: price(p) * i.q }); else gone.push(i.id); });
      return { lines, gone, total: lines.reduce((s, l) => s + l.sub, 0) };
    },
    // The one WhatsApp message. Plain text so it reads well in the chat.
    message(lines, total, biz, meta) {
      const owner = (biz.owner || "").split(" ")[0] || "there", out = [];
      out.push(`Hi ${owner}! I'd like to order from ${biz.name || "The Sweetest Bakery"}:`, "");
      lines.forEach(l => out.push(`${l.q} x ${l.p.name} (${money(price(l.p))} each) = ${money(l.sub)}`));
      out.push("", `Total: ${money(total)}`, "");
      if (meta.name) out.push(`Name: ${meta.name}`);
      if (meta.date) out.push(`Date needed: ${meta.date}`);
      if (meta.method && meta.method !== "Not sure yet") out.push(`Collection or delivery: ${meta.method}`);
      if (meta.notes) out.push(`Notes: ${meta.notes}`);
      out.push("", "Please confirm availability and the final price. Thank you!");
      return out.join("\n");
    },
    // Keeps the header badge in step with the cart (also when it changes in another tab).
    sync() {
      const n = Cart.count();
      document.querySelectorAll(".cart-link").forEach(a => {
        a.setAttribute("aria-label", n ? `Cart, ${n} ${n === 1 ? "item" : "items"}` : "Cart, empty");
        const b = a.querySelector(".cart-badge"); if (!b) return;
        const was = b.textContent; b.textContent = n > 99 ? "99+" : n; b.hidden = !n;
        if (n && was !== b.textContent) { b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
      });
      document.dispatchEvent(new CustomEvent("sb:cart"));
    }
  };

  // "Add" buttons on product cards (rendered by SB.card). One delegated listener for the whole page.
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-add]"); if (!b) return;
    Cart.add(b.dataset.add);
    const name = b.dataset.name || "Item", label = b.dataset.label || b.textContent;
    b.dataset.label = label; b.textContent = "Added \u2713"; b.classList.add("is-added");
    say(`${name} added to your cart. ${Cart.count()} in total.`);
    clearTimeout(b._t); b._t = setTimeout(() => { b.textContent = label; b.classList.remove("is-added"); }, 1400);
  });
  window.addEventListener("storage", e => { if (e.key === KEY) Cart.sync(); });
  document.addEventListener("DOMContentLoaded", Cart.sync);
})();
