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
  // v10.3: FAQ (accordion) + reviews. Both come from config/site-settings.json (faq, reviews). Reviews stay hidden while empty.
  const stars = n => { n = Math.max(0, Math.min(5, Math.round(Number(n) || 0))); return n ? `<span class="stars" role="img" aria-label="${n} out of 5 stars">${"\u2605".repeat(n)}${"\u2606".repeat(5 - n)}</span>` : ""; };
  const fl = document.getElementById("faq-list");
  if (fl) {
    const items = (s.faq || []).filter(f => f && f.q && f.a);
    fl.innerHTML = items.length ? items.map(f => `<details class="faq__item"><summary>${SB.esc(f.q)}</summary><div class="faq__a"><p>${SB.esc(f.a)}</p>${f.draft ? '<p class="faq__draft">Draft answer, to be confirmed by Becca</p>' : ""}</div></details>`).join("") : "<p>Questions and answers are coming soon.</p>";
  }
  const rg = document.getElementById("reviews-grid");
  if (rg) {
    const rv = (s.reviews || []).filter(r => r && r.text);
    if (rv.length) rg.innerHTML = rv.map(r => `<figure class="review card"><div class="card__body">${stars(r.rating)}<blockquote>${SB.esc(r.text)}</blockquote><figcaption>${SB.esc(r.name || "Happy customer")}${r.date ? ' <span class="muted">&middot; ' + SB.esc(r.date) + "</span>" : ""}</figcaption></div></figure>`).join("");
    else if ($("[data-home]")) { const e = $('[data-section="reviews"]'); if (e) e.remove(); }
    else { rg.remove(); const em = document.getElementById("reviews-empty"); if (em) em.hidden = false; }
  }
});
