/* pages.js: fills the Home "featured" row and the Menu page (category filter) from the data. */
SB.load().then(({ biz, settings: s, categories: cs, products }) => {
  const vis = products.filter(p => p.visible !== false), $ = q => document.querySelector(q);
  if ($("[data-home]")) {
    // Two hero styles live in index.html; keep the chosen one (or neither if the Hero box is switched off).
    const dropHero = s.home.hero === false ? ["hero", "hero-bakes"] : [s.heroStyle === "bakes" ? "hero" : "hero-bakes"];
    dropHero.forEach(k => { const e = $(`[data-section="${k}"]`); if (e) e.remove(); });
    ["featured", "cta"].forEach(k => { if (s.home[k] === false) { const e = $(`[data-section="${k}"]`); if (e) e.remove(); } });
    const g = document.getElementById("featured-grid");
    if (g) {
      const f = vis.filter(p => p.featured).slice(0, s.featuredCount);
      if (f.length) g.innerHTML = f.map(p => SB.card(p, biz)).join(""); else $('[data-section="featured"]').remove();
    }
    if (s.tagline) document.querySelectorAll("[data-tagline]").forEach(t => { t.textContent = s.tagline; });
    const gr = document.getElementById("bakes-greeting"); if (gr && s.greeting) gr.textContent = s.greeting;
    const hi = document.getElementById("bakes-hello"); if (hi) { const h = new Date().getHours(); hi.textContent = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"; }
  }
  const m = document.getElementById("menu-grid"), chips = document.getElementById("chips");
  if (m && chips) {
    let cur = new URLSearchParams(location.search).get("c") || "all";
    if (!cs.some(c => c.id === cur)) cur = "all";
    const draw = () => {
      chips.innerHTML = [{ id: "all", name: "All", icon: "" }, ...cs].map(c => `<button type="button" class="chip" data-c="${SB.esc(c.id)}" aria-pressed="${c.id === cur}">${c.icon ? SB.esc(c.icon) + " " : ""}${SB.esc(c.name)}</button>`).join("");
      const list = vis.filter(p => cur === "all" || p.category === cur);
      m.className = "menu menu--" + s.menuLayout;
      m.innerHTML = list.length ? list.map(p => SB.card(p, biz)).join("") : "<p>Nothing here yet, check back soon.</p>";
    };
    chips.addEventListener("click", e => { const b = e.target.closest("[data-c]"); if (!b) return; cur = b.dataset.c; history.replaceState(null, "", cur === "all" ? "menu.html" : "?c=" + cur); draw(); });
    draw();
  }
});
