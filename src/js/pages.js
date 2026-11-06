/* pages.js: fills the Home "featured" row and the Menu page (category filter) from the data. */
SB.load().then(({ biz, settings: s, categories: cs, products }) => {
  const vis = products.filter(p => p.visible !== false), $ = q => document.querySelector(q);
  if ($("[data-home]")) {
    ["hero", "featured", "cta"].forEach(k => { if (s.home[k] === false) { const e = $(`[data-section="${k}"]`); if (e) e.remove(); } });
    const g = document.getElementById("featured-grid");
    if (g) {
      const f = vis.filter(p => p.featured).slice(0, s.featuredCount);
      if (f.length) g.innerHTML = f.map(p => SB.card(p, biz)).join(""); else $('[data-section="featured"]').remove();
    }
    const t = document.getElementById("hero-tagline"); if (t && s.tagline) t.textContent = s.tagline;
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
