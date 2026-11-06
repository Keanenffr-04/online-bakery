/* site.js: renders the shared header + footer, wires WhatsApp links from config/business.json,
   and handles the food-menu dropdown. Edit NAV below to change the menu everywhere. */
(function () {
  // Third value = true means "this item is the food-menu dropdown" (the only dropdown in the header).
  const NAV = [
    ["Home", "index.html"],
    ["Menu", "menu.html", true],
    ["Custom Orders", "custom-orders.html"],
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
      <a class="btn btn--sm btn--whatsapp site-header__wa" data-wa href="#">WhatsApp us</a>
      <nav class="nav" id="nav" aria-label="Main">${NAV.map(item).join("")}</nav>
    </div>
  </div>
</header>`;

  // v9: specials strip at the very top of every page (scrolling ticker). Text + on/off come from admin (settings.specials).
  window.SB && SB.load().then(({ settings }) => {
    const sp = settings.specials || {}, items = (sp.items || []).filter(Boolean);
    if (sp.enabled === false || !items.length || document.querySelector(".specials")) return;
    const group = (hidden, n) => `<div class="specials__group"${hidden ? ' aria-hidden="true"' : ""}>${Array.from({ length: n }, (_, i) => items.map(t => `<span class="specials__item"${i ? " data-rep" : ""}>${SB.esc(t)}</span>`).join("")).join("")}</div>`;
    const bar = document.createElement("div");
    bar.className = "specials"; bar.setAttribute("role", "region"); bar.setAttribute("aria-label", "Specials");
    bar.innerHTML = `<div class="specials__track">${group(false, 1)}${group(true, 1)}</div>`;
    document.body.prepend(bar);
    // Repeat the messages until one group is wider than the screen, so the loop never shows a gap.
    const track = bar.firstElementChild;
    let n = 1; while (track.firstElementChild.scrollWidth < window.innerWidth && n < 12) { n++; track.innerHTML = group(false, n) + group(true, n); }
    track.style.setProperty("--specials-time", Math.max(14, track.firstElementChild.scrollWidth / 55) + "s");
  });

  const footer = document.getElementById("site-footer");
  if (footer) footer.outerHTML = `
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__grid">
      <div><h3 data-biz="name">The Sweetest Bakery</h3><p>Handmade cakes, cupcakes, cookies and bread by <span data-biz="owner">Becca</span>.</p></div>
      <div><h3>Explore</h3><ul>${NAV.slice(1).map(([l, h]) => `<li><a href="${h}">${l.replace("&", "&amp;")}</a></li>`).join("")}</ul></div>
      <div><h3>Order</h3><p>Online orders only.<br>WhatsApp: <a data-wa data-biz="phoneDisplay" href="#"></a></p></div>
    </div>
    <small>&copy; <span id="year"></span> <span data-biz="name">The Sweetest Bakery</span> &middot; <a href="admin.html">Staff login</a></small>
  </div>
</footer>`;

  const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();

  // Food-menu dropdown: click/tap or keyboard to open; closes on Escape, outside click or tabbing away.
  const drop = document.querySelector(".nav__drop");
  if (drop) {
    const trig = drop.querySelector(".nav__trigger"), panel = drop.querySelector(".nav__panel");
    const setOpen = open => { panel.hidden = !open; trig.setAttribute("aria-expanded", open); };
    trig.addEventListener("click", () => setOpen(panel.hidden));
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) { setOpen(false); trig.focus(); } });
    document.addEventListener("click", e => { if (!drop.contains(e.target)) setOpen(false); });
    drop.addEventListener("focusout", e => { if (e.relatedTarget && !drop.contains(e.relatedTarget)) setOpen(false); });

    // Sections in the dropdown come from the product data (same list as the filter buttons on the Menu page).
    window.SB && SB.load().then(({ categories }) => {
      const cur = page === "menu.html" ? (new URLSearchParams(location.search).get("c") || "") : null;
      const rows = [["", "Full menu"], ...categories.map(c => [c.id, (c.icon ? c.icon + " " : "") + c.name])];
      panel.innerHTML = rows.map(([id, label]) =>
        `<a href="menu.html${id ? "?c=" + encodeURIComponent(id) : ""}"${cur === id ? ' aria-current="page"' : ""}>${SB.esc(label)}</a>`).join("");
    });
  }

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
