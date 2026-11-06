/* site.js: renders the shared header + footer, wires WhatsApp links from config/business.json,
   and handles the mobile menu. Edit NAV below to change the menu everywhere. */
(function () {
  const NAV = [
    ["Home", "index.html"],
    ["Menu", "menu.html"],
    ["Custom Orders", "custom-orders.html"],
    ["About", "about.html"],
    ["Contact", "contact.html"]
  ];
  const page = location.pathname.split("/").pop() || "index.html";
  const links = NAV.map(([label, href]) =>
    `<a href="${href}"${href === page ? ' aria-current="page"' : ""}>${label.replace("&", "&amp;")}</a>`).join("");

  const header = document.getElementById("site-header");
  if (header) header.outerHTML = `
<header class="site-header">
  <div class="container">
    <div class="site-header__bar">
      <a class="brand" href="index.html" aria-label="The Sweetest Bakery, home">
        <img src="../assets/logo/logo-mark.png" alt="" width="34" height="44">
        <span data-biz="name">The Sweetest Bakery</span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
    </div>
    <nav class="nav" id="nav" aria-label="Main">${links}
      <a class="btn btn--whatsapp" data-wa href="#">WhatsApp us</a>
    </nav>
  </div>
</header>`;

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

  const toggle = document.querySelector(".nav-toggle"), nav = document.getElementById("nav");
  if (toggle && nav) {
    const setOpen = open => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open);
      toggle.textContent = open ? "Close" : "Menu";
    };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    // v5: the menu is a dropdown everywhere, so close it on Escape or when clicking elsewhere
    document.addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); } });
    document.addEventListener("click", e => { if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false); });
  }

  // Business details: single source of truth is config/business.json (never hardcode them here).
  fetch("../config/business.json").then(r => r.json()).then(b => {
    document.querySelectorAll("[data-biz]").forEach(el => { const v = b[el.dataset.biz]; if (v) el.textContent = el.dataset.biz === "owner" ? v.split(" ")[0] : v; });
    document.querySelectorAll("[data-wa]").forEach(el => {
      const msg = el.dataset.waText || "Hi! I'd like to order from The Sweetest Bakery.";
      el.href = `${b.whatsappLink}?text=${encodeURIComponent(msg)}`;
      el.target = "_blank"; el.rel = "noopener";
    });
  }).catch(() => {
    // e.g. opened straight from disk (file://). Serve the repo root to see WhatsApp links: python3 -m http.server
    document.querySelectorAll("[data-wa]").forEach(el => { el.href = "contact.html"; });
  });
})();
