/* pages.js: fills the Home "featured" row and the Menu page (category filter) from the data. */
SB.load().then(({ biz, settings: s, shownCategories: cs, shownProducts: vis, season }) => {
  const $ = q => document.querySelector(q);
  if ($("[data-home]")) {
    // Two hero styles live in index.html; keep the chosen one (or neither if the Hero box is switched off).
    const dropHero = s.home.hero === false ? ["hero", "hero-bakes"] : [s.heroStyle === "bakes" ? "hero" : "hero-bakes"];
    dropHero.forEach(k => { const e = $(`[data-section="${k}"]`); if (e) e.remove(); });
    ["shop", "featured", "fresh", "meet", "steps", "cta"].forEach(k => { if (s.home[k] === false) { const e = $(`[data-section="${k}"]`); if (e) e.remove(); } });
    const g = document.getElementById("featured-grid");
    if (g) {
      g.classList.toggle("menu--glass", s.featuredStyle !== "plain");  // v10.5: glass-style cards unless admin picks "Plain"
      const sec = $('[data-section="featured"]'); if (sec) sec.classList.toggle("section--glass", s.featuredStyle !== "plain");
      const f = vis.filter(p => p.featured).slice(0, s.featuredCount);
      if (f.length) g.innerHTML = f.map(p => SB.card(p, biz)).join(""); else $('[data-section="featured"]').remove();
    }
    // v10.9: "New and popular". Just added = newest items (by the date each item was added); Most popular = items the owner ticked
    // "Show in Most popular" (automatic ranking from real orders comes with the order tools). An item is never shown twice in this
    // section. Same card style and the same Glass / Plain choice as Our best sellers; empty rows (and an empty section) are hidden.
    const fresh = $('[data-section="fresh"]');
    if (fresh) {
      const recent = vis.filter(p => p.added).sort((a, b) => b.added.localeCompare(a.added)).slice(0, s.recentCount || 3);
      const seen = new Set(recent.map(p => p.id)), popular = vis.filter(p => p.popular && !seen.has(p.id)).slice(0, s.popularCount || 3);
      [["recent", recent], ["popular", popular]].forEach(([k, list]) => {
        const row = fresh.querySelector(`[data-row="${k}"]`), grid = document.getElementById(k + "-grid");
        if (!list.length) return row.remove();
        grid.classList.toggle("menu--glass", s.featuredStyle !== "plain"); grid.innerHTML = list.map(p => SB.card(p, biz)).join("");
      });
      // v10.17.3: one row left = a single, narrower column instead of a stretched one.
      const left = fresh.querySelectorAll("[data-row]").length;
      if (!left) fresh.remove(); else { fresh.classList.toggle("section--glass", s.featuredStyle !== "plain"); fresh.querySelector(".fresh").classList.toggle("fresh--one", left === 1); }
    }
    // v10.12: "Shop by treat": one tile per menu section that has visible items (link opens the Menu on that section) + a Custom cake tile.
    const sh = document.getElementById("shop-tiles");
    if (sh) {
      const tile = (href, e, name, sub) => `<a class="tile-link" href="${href}"><span class="tile-link__e" aria-hidden="true">${SB.esc(e)}</span><strong>${SB.esc(name)}</strong><span class="tile-link__s">${SB.esc(sub)}</span></a>`;
      sh.innerHTML = cs.map(c => { const n = vis.filter(p => p.category === c.id).length; return n ? tile("menu.html?c=" + encodeURIComponent(c.id), c.icon || "🍰", c.name, n + (n === 1 ? " item" : " items")) : ""; }).join("") + tile("custom-orders.html", "🎂", "Custom cake", "Tell us your idea");
    }
    // v10.13: "Meet Becca" (heading + text from settings.meet; blank lines make new paragraphs).
    const mt = document.getElementById("meet-text");
    if (mt) {
      const m = s.meet || {}, paras = String(m.text || "").split(/\n\s*\n|\n/).map(x => x.trim()).filter(Boolean);
      if (!paras.length) { const e = $('[data-section="meet"]'); if (e) e.remove(); }
      else {
        mt.innerHTML = paras.map(x => `<p>${SB.esc(x)}</p>`).join(""); document.getElementById("meet-heading").textContent = m.heading || "Meet Becca";
        document.getElementById("meet-draft").hidden = !m.draft;
      }
    }
    if (s.tagline) document.querySelectorAll("[data-tagline]").forEach(t => { t.textContent = s.tagline; });
    // v10.13: while a season is on, the greeting follows it (Becca's own season wording, else the built-in text). Outside seasons: her normal greeting.
    const sw = season ? SB.seasonWords(s, season) : null;
    const gr = document.getElementById("bakes-greeting"); if (gr && (sw && sw.greeting || s.greeting)) gr.textContent = (sw && sw.greeting) || s.greeting;
    if (sw && sw.greeting) { const ey = document.querySelector('[data-section="hero"] .eyebrow'); if (ey) ey.textContent = sw.greeting; }   // the logo hero has no greeting box: its small line above the title carries it
    const hi = document.getElementById("bakes-hello"); if (hi) { const h = new Date().getHours(); hi.textContent = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"; }
  }
  const m = document.getElementById("menu-grid"), chips = document.getElementById("chips");
  if (m && chips) {
    // v10.4: section chips + search box + dietary tag filters (a tag filter keeps only items that have ALL the picked tags)
    let cur = new URLSearchParams(location.search).get("c") || "all", q = "";
    if (!cs.some(c => c.id === cur)) cur = "all";
    const picked = new Set(), qi = document.getElementById("menu-q"), tc = document.getElementById("tag-chips"), tn = document.getElementById("tag-note");
    const used = SB.TAGS.filter(([id]) => vis.some(p => (p.tags || []).includes(id)));  // only offer tags somebody has actually set
    if (tc && used.length) { tc.hidden = false; if (tn) tn.hidden = false; }
    const drawTags = () => { if (tc) tc.innerHTML = used.map(([id, n]) => `<button type="button" class="chip" data-t="${SB.esc(id)}" aria-pressed="${picked.has(id)}">${SB.esc(n)}</button>`).join(""); };
    const draw = () => {
      chips.innerHTML = [{ id: "all", name: "All", icon: "" }, ...cs].map(c => `<button type="button" class="chip" data-c="${SB.esc(c.id)}" aria-pressed="${c.id === cur}">${c.icon ? SB.esc(c.icon) + " " : ""}${SB.esc(c.name)}</button>`).join("");
      drawTags();
      const words = q.toLowerCase().split(/\s+/).filter(Boolean);
      const list = vis.filter(p => (cur === "all" || p.category === cur) && [...picked].every(t => (p.tags || []).includes(t)) &&
        words.every(w => (p.name + " " + (p.description || "")).toLowerCase().includes(w)));
      m.className = "menu menu--" + s.menuLayout;
      m.innerHTML = list.length ? list.map(p => SB.card(p, biz)).join("") : `<div class="menu-empty"><p>${q || picked.size ? "Nothing matches that." : "Nothing here yet, check back soon."}</p>${q || picked.size || cur !== "all" ? '<button type="button" class="btn btn--sm btn--ghost" data-clear>Clear filters</button>' : ""}</div>`;
    };
    chips.addEventListener("click", e => { const b = e.target.closest("[data-c]"); if (!b) return; cur = b.dataset.c; history.replaceState(null, "", cur === "all" ? "menu.html" : "?c=" + cur); draw(); });
    if (tc) tc.addEventListener("click", e => { const b = e.target.closest("[data-t]"); if (!b) return; const t = b.dataset.t; picked.has(t) ? picked.delete(t) : picked.add(t); draw(); const nb = tc.querySelector(`[data-t="${t}"]`); if (nb) nb.focus(); });
    if (qi) qi.addEventListener("input", () => { q = qi.value.trim(); draw(); });
    m.addEventListener("click", e => { if (!e.target.closest("[data-clear]")) return; cur = "all"; q = ""; picked.clear(); if (qi) qi.value = ""; history.replaceState(null, "", "menu.html"); draw(); });
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
