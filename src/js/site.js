/* site.js: renders the shared header + footer, wires WhatsApp links from config/business.json,
   and handles the food-menu dropdown. Edit NAV below to change the menu everywhere. */
(function () {
  // Third value = true means "this item is the food-menu dropdown" (the only dropdown in the header).
  const NAV = [
    ["Home", "index.html"],
    ["Menu", "menu.html", true],
    ["Custom Orders", "custom-orders.html"],
    ["FAQ", "faq.html"],
    ["About", "about.html"],
    ["Contact", "contact.html"]
  ];
  const page = location.pathname.split("/").pop() || "index.html";
  const item = ([label, href, drop]) => drop
    ? `<div class="nav__drop">
        <button class="nav__trigger${href === page ? " is-current" : ""}" type="button" aria-expanded="false" aria-controls="menu-panel">${label}</button>
        <div class="nav__panel" id="menu-panel" hidden><a href="${href}">Full menu</a></div>
      </div>`
    : `<a href="${href}"${href === page ? ' aria-current="page"' : ""}>${label.replace("&", "&amp;")}</a>`;

  const header = document.getElementById("site-header");
  if (header) header.outerHTML = `
<header class="site-header">
  <div class="container">
    <div class="site-header__bar">
      <a class="brand" href="index.html" aria-label="The Sweetest Bakery, home">
        <img src="../assets/logo/logo-mark.png" alt="" width="34" height="44">
        <span data-biz="name">The Sweetest Bakery</span>
      </a>
      <button class="nav__burger" type="button" aria-expanded="false" aria-controls="nav" aria-label="Open menu"><span></span><span></span><span></span></button>
      <nav class="nav" id="nav" aria-label="Main">${NAV.map(item).join("")}</nav>
      <a class="cart-link" href="cart.html"${page === "cart.html" ? ' aria-current="page"' : ""} aria-label="Cart, empty"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M5 8h14l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3L5 8Zm4 0V6.5a3 3 0 0 1 6 0V8"/></svg><span class="cart-badge" hidden>0</span></a>
    </div>
  </div>
</header>`;

  window.SBCart && SBCart.sync(); // header exists now: show the current cart count

  // Scrolling ticker strips: "specials" at the very top of every page (v9) and "orders" at the very bottom (v10).
  // Text + on/off come from admin (settings.specials / settings.orders).
  const strip = (cfg, cls, label, add, cssVar) => {
    const items = ((cfg || {}).items || []).filter(Boolean);
    if ((cfg || {}).enabled === false || !items.length || document.querySelector("." + cls)) return;
    const group = (hidden, n) => `<div class="specials__group"${hidden ? ' aria-hidden="true"' : ""}>${Array.from({ length: n }, (_, i) => items.map(t => `<span class="specials__item"${i ? " data-rep" : ""}>${SB.esc(t)}</span>`).join("")).join("")}</div>`;
    const bar = document.createElement("div");
    bar.className = "specials " + cls; bar.setAttribute("role", "region"); bar.setAttribute("aria-label", label);
    bar.innerHTML = `<div class="specials__track">${group(false, 1)}${group(true, 1)}</div>`;
    add(bar);
    // Repeat the messages until one group is wider than the screen, so the loop never shows a gap.
    const track = bar.firstElementChild;
    let n = 1; while (track.firstElementChild.scrollWidth < window.innerWidth && n < 12) { n++; track.innerHTML = group(false, n) + group(true, n); }
    track.style.setProperty("--specials-time", Math.max(14, track.firstElementChild.scrollWidth / 55) + "s");
    // Publish this strip's height so the header (sticks under the top strip), page bottom padding and the floating button can make room.
    const publish = () => document.documentElement.style.setProperty(cssVar, bar.offsetHeight + "px");
    publish(); if (window.ResizeObserver) new ResizeObserver(publish).observe(bar);
  };
  window.SB && SB.load().then(({ settings, season }) => {
    // v10.13: while a season is on, its line goes first in the top strip (only if Becca has the top strip switched on).
    const sw = season && SB.seasonWords(settings, season), sp = settings.specials || {};
    strip(sw && sw.special && sp.enabled !== false ? { ...sp, items: [sw.special, ...(sp.items || [])] } : sp, "specials--top", "Specials", el => document.body.prepend(el), "--specials-h");
    strip(settings.orders, "specials--bottom", "How to order", el => document.body.append(el), "--orders-h");
  });

  // v10: one floating WhatsApp button on every page (the only WhatsApp button besides the one on the Contact page).
  if (!document.querySelector(".wa-float")) {
    const fab = document.createElement("a");
    fab.className = "wa-float"; fab.href = "contact.html"; fab.setAttribute("data-wa", ""); fab.setAttribute("aria-label", "Chat with us on WhatsApp");
    fab.innerHTML = `<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413"/></svg>`;
    document.body.append(fab);
  }

  const footer = document.getElementById("site-footer");
  if (footer) footer.outerHTML = `
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__grid">
      <div><h3 data-biz="name">The Sweetest Bakery</h3><p>Handmade cakes, cupcakes, cookies and bread by <span data-biz="owner">Becca</span>.</p></div>
      <div><h3>Explore</h3><ul>${NAV.slice(1).map(([l, h]) => `<li><a href="${h}">${l.replace("&", "&amp;")}</a></li>`).join("")}</ul></div>
      <div><h3>Order</h3><p>Online orders only.<br>WhatsApp: <span data-biz="phoneDisplay"></span></p></div>
      <div class="social" data-social hidden><h3>Follow us</h3><ul class="social__list"></ul></div>
    </div>
    <small>&copy; <span id="year"></span> <span data-biz="name">The Sweetest Bakery</span></small>
  </div>
</footer>`;

  const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();

  // Menu: a dropdown on desktop, an expandable list inside the three-line menu on phones (under 860px).
  // Closes on Escape, outside click or tabbing away (desktop). One codebase, the CSS picks the layout.
  const drop = document.querySelector(".nav__drop"), hdr = document.querySelector(".site-header"), burger = document.querySelector(".nav__burger");
  const isMobile = () => matchMedia("(max-width:859px)").matches;
  if (drop) {
    const trig = drop.querySelector(".nav__trigger"), panel = drop.querySelector(".nav__panel");
    const setOpen = open => { panel.hidden = !open; trig.setAttribute("aria-expanded", open); };
    const setMenu = open => {
      hdr.classList.toggle("is-open", open); burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (open && isMobile()) setOpen(true); // show all the food sections right away
    };
    trig.addEventListener("click", () => setOpen(panel.hidden));
    burger.addEventListener("click", () => setMenu(!hdr.classList.contains("is-open")));
    document.addEventListener("keydown", e => {
      if (e.key !== "Escape") return;
      if (hdr.classList.contains("is-open")) { setMenu(false); burger.focus(); }
      else if (!panel.hidden) { setOpen(false); trig.focus(); }
    });
    document.addEventListener("click", e => {
      if (!isMobile() && !drop.contains(e.target)) setOpen(false);
      if (!hdr.contains(e.target)) setMenu(false);
    });
    drop.addEventListener("focusout", e => { if (!isMobile() && e.relatedTarget && !drop.contains(e.relatedTarget)) setOpen(false); });
    matchMedia("(max-width:859px)").addEventListener("change", () => { setMenu(false); setOpen(false); });

    // Sections in the dropdown come from the product data (same list as the filter buttons on the Menu page).
    window.SB && SB.load().then(({ categories }) => {
      const cur = page === "menu.html" ? (new URLSearchParams(location.search).get("c") || "") : null;
      const rows = [["", "Full menu"], ...categories.map(c => [c.id, (c.icon ? c.icon + " " : "") + c.name])];
      panel.innerHTML = rows.map(([id, label]) =>
        `<a href="menu.html${id ? "?c=" + encodeURIComponent(id) : ""}"${cur === id ? ' aria-current="page"' : ""}>${SB.esc(label)}</a>`).join("");
    });
  }

  // v10.5: Instagram + Facebook links in the footer. Handles come from config/business.json (instagram, facebook);
  // an empty handle hides that link, and the whole column hides if both are empty. Accepts a handle or a full https:// link.
  const ICONS = {
    instagram: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><defs><linearGradient id="ig-g" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#FEDA75"/><stop offset=".35" stop-color="#FA7E1E"/><stop offset=".62" stop-color="#D62976"/><stop offset=".85" stop-color="#962FBF"/><stop offset="1" stop-color="#4F5BD5"/></linearGradient></defs><rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="url(#ig-g)"/><rect x="5.4" y="5.4" width="13.2" height="13.2" rx="4" fill="none" stroke="#fff" stroke-width="1.7"/><circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" stroke-width="1.7"/><circle cx="16.3" cy="7.7" r="1" fill="#fff"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="11" fill="#1877F2"/><path fill="#fff" d="M13.3 19.5v-6.4h2.1l.4-2.6h-2.5V8.9c0-.8.3-1.3 1.4-1.3h1.2V5.3c-.2 0-1-.1-1.9-.1-2 0-3.3 1.2-3.3 3.4v1.9H8.6v2.6h2.1v6.4h2.6Z"/></svg>`
  };
  const socialUrl = (kind, v) => /^https?:\/\//i.test(v) ? v : `https://${kind}.com/${encodeURIComponent(v.replace(/^@/, "").replace(/\/+$/, ""))}`;
  const social = document.querySelector("[data-social]");
  if (social && window.SB) SB.load().then(({ biz }) => {
    const rows = [["instagram", "Instagram"], ["facebook", "Facebook"]].map(([k, n]) => [k, n, String(biz[k] || "").trim()]).filter(r => r[2]);
    if (!rows.length) return;
    social.querySelector("ul").innerHTML = rows.map(([k, n, v]) => `<li><a href="${SB.esc(socialUrl(k, v))}" target="_blank" rel="noopener">${ICONS[k]}<span>${n}</span></a></li>`).join("");
    social.hidden = false;
  });

  // Business details: single source of truth is config/business.json (never hardcode them here).
  // SB.load() reads the JSON on a server, or its offline copy when the page is opened straight from disk.
  (window.SB ? SB.load().then(d => d.biz) : Promise.resolve({})).then(b => {
    document.querySelectorAll("[data-biz]").forEach(el => { const v = b[el.dataset.biz]; if (v) el.textContent = el.dataset.biz === "owner" ? v.split(" ")[0] : v; });
    document.querySelectorAll("[data-wa]").forEach(el => {
      if (!b.whatsappLink) { el.href = "contact.html"; return; }
      const msg = el.dataset.waText || "Hi! I'd like to order from The Sweetest Bakery.";
      el.href = `${b.whatsappLink}?text=${encodeURIComponent(msg)}`;
      el.target = "_blank"; el.rel = "noopener";
    });
  });
})();
