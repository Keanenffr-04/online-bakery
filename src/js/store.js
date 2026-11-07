/* store.js: one place that loads site data. Published files first, then this device's admin changes
   (localStorage). Inside the admin preview iframe it uses the unsaved draft instead. */
(function () {
  const J = (s, k) => { try { return JSON.parse(s.getItem(k)); } catch (e) { return null; } };
  // ---- v10.9: automatic seasonal themes. The site switches theme by date; outside every season it uses the owner's everyday theme.
  // Rules live in config/site-settings.json (autoTheme.rules) and are editable in Admin > Theme & layout > Automatic seasons.
  //   range       { from: "MM-DD", to: "MM-DD" }                       same dates every year (may cross New Year)
  //   easter      { before, after }                                  days around Easter Sunday (worked out each year)
  //   nthweekday  { month, n, weekday(0=Sun), before, after }        e.g. 2nd Sunday of May = Mother's Day (South Africa)
  // The first matching rule wins. Uses the visitor's own calendar date.
  const SEASON_RULES = [{"theme": "valentines", "type": "range", "from": "02-01", "to": "02-14", "on": true}, {"theme": "easter", "type": "easter", "before": 9, "after": 1, "on": true}, {"theme": "mothers", "type": "nthweekday", "month": 5, "n": 2, "weekday": 0, "before": 7, "after": 0, "on": true}, {"theme": "fathers", "type": "nthweekday", "month": 6, "n": 3, "weekday": 0, "before": 7, "after": 0, "on": true}, {"theme": "braai", "type": "range", "from": "09-17", "to": "09-24", "on": true}, {"theme": "halloween", "type": "range", "from": "10-24", "to": "10-31", "on": true}, {"theme": "christmas", "type": "range", "from": "12-01", "to": "12-26", "on": true}];
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dOf = (y, m, d) => new Date(y, m - 1, d);                        // local midnight (JS rolls over days past month end)
  const shiftDay = (dt, n) => dOf(dt.getFullYear(), dt.getMonth() + 1, dt.getDate() + n);
  const easterOf = y => { const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), mo = Math.floor((h + l - 7 * m + 114) / 31), da = (h + l - 7 * m + 114) % 31 + 1; return dOf(y, mo, da); };
  const nthDay = (y, mo, n, wd) => { const off = (wd - dOf(y, mo, 1).getDay() + 7) % 7; return dOf(y, mo, 1 + off + 7 * (n - 1)); };
  const seasonWindow = (r, y) => {
    if (r.type === "easter") { const e = easterOf(y); return [shiftDay(e, -(r.before == null ? 9 : r.before)), shiftDay(e, r.after == null ? 1 : r.after)]; }
    if (r.type === "nthweekday") { const d = nthDay(y, r.month, r.n, r.weekday || 0); return [shiftDay(d, -(r.before == null ? 7 : r.before)), shiftDay(d, r.after || 0)]; }
    const [fm, fd] = r.from.split("-").map(Number), [tm, td] = r.to.split("-").map(Number);
    return [dOf(y, fm, fd), dOf(tm < fm || (tm === fm && td < fd) ? y + 1 : y, tm, td)];
  };
  const dayText = d => d.getDate() + " " + MON[d.getMonth()];

  const D = { theme: "classic", tagline: "", heroStyle: "logo", greeting: "Welcome in, something sweet is baking.", home: { hero: true, featured: true, fresh: true, cta: true }, featuredCount: 3, featuredStyle: "glass", recentCount: 3, popularCount: 3, decorations: true, autoTheme: { enabled: true, rules: SEASON_RULES }, menuLayout: "grid", faq: [], reviews: [], specials: { enabled: true, items: ["Today's specials: ask Becca on WhatsApp", "Custom cakes for every occasion, order online"] }, orders: { enabled: true, items: ["How to order: message Becca on WhatsApp", "Tell us what you'd like, the date you need it and any notes"] } };
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const SB = window.SB = {
    esc, TAGS: [["vegan", "Vegan"], ["gluten-free", "Gluten-free"], ["nut-free", "Nut-free"], ["dairy-free", "Dairy-free"]],
    THEMES: [["classic", "Classic Black & White"], ["cocoa", "Cocoa & Cream"], ["pastel", "Soft Pastel"]],
    // Special-occasion themes (v10.6): tokens live in themes/theme-seasonal.css. The admin shows them as a second group.
    OCCASION_THEMES: [["christmas", "Christmas"], ["valentines", "Valentine's Day"], ["easter", "Easter"], ["halloween", "Halloween"], ["braai", "Braai Day (Heritage Day)"], ["mothers", "Mother's Day"], ["fathers", "Father's Day"]],
    // v10.6: phone numbers. A country-code dropdown (South Africa +27 first and the default) next to the number box.
    // SB.phoneField() draws it, SB.phoneRead() turns what was typed into one clean number (digits only, e.g. 27833413166).
    COUNTRIES: [["27", "South Africa"], ["264", "Namibia"], ["267", "Botswana"], ["263", "Zimbabwe"], ["258", "Mozambique"], ["266", "Lesotho"], ["268", "Eswatini"], ["260", "Zambia"], ["265", "Malawi"], ["244", "Angola"], ["254", "Kenya"], ["234", "Nigeria"], ["233", "Ghana"], ["44", "United Kingdom"], ["353", "Ireland"], ["1", "USA / Canada"], ["61", "Australia"], ["64", "New Zealand"], ["49", "Germany"], ["31", "Netherlands"], ["33", "France"], ["34", "Spain"], ["351", "Portugal"], ["39", "Italy"], ["971", "United Arab Emirates"], ["91", "India"], ["86", "China"]],
    phoneField(id, { required, label, value } = {}) {
      let cc = "27"; try { cc = localStorage.getItem("sb_cc") || "27"; } catch (e) { /* ignore */ }
      if (!SB.COUNTRIES.some(c => c[0] === cc)) cc = "27";
      return `<label for="${id}">${label || "Phone number"} ${required ? '<span class="req" aria-hidden="true">*</span>' : '<span class="muted">(optional)</span>'}</label>
      <div class="phone"><select id="${id}-cc" aria-label="Country code" autocomplete="tel-country-code">${SB.COUNTRIES.map(([c, n]) => `<option value="${c}"${c === cc ? " selected" : ""}>+${c} ${SB.esc(n)}</option>`).join("")}</select>
      <input id="${id}" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="${cc === "27" ? "83 341 3166" : "Phone number"}" value="${SB.esc(value || "")}"${required ? " required" : ""}></div>`;
    },
    groupDigits: n => n.length === 9 ? `${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5)}` : n.length >= 7 ? `${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`.trim() : n,
    // Returns { empty } if nothing typed, { error } if it can't be right, else { digits: "27833413166", display: "+27 83 341 3166" }.
    // A number typed with + or 00 in front is taken as already international; a leading 0 is dropped (083... = +27 83...).
    phoneRead(id) {
      const num = document.getElementById(id), sel = document.getElementById(id + "-cc"); if (!num || !sel) return { empty: true };
      const raw = num.value.trim(); if (!raw) return { empty: true };
      try { localStorage.setItem("sb_cc", sel.value); } catch (e) { /* ignore */ }
      let d = raw.replace(/\D/g, ""), intl = /^\s*(\+|00)/.test(raw);
      if (intl) { d = d.replace(/^00/, ""); } else { d = d.replace(/^0+/, ""); if (!d.startsWith(sel.value) || d.length < sel.value.length + 7) d = sel.value + d; }
      if (d.length < 8 || d.length > 15) return { error: "That phone number doesn't look right. Check it and try again." };
      const cc = intl ? (SB.COUNTRIES.map(c => c[0]).sort((a, b) => b.length - a.length).find(c => d.startsWith(c)) || "") : sel.value;
      return { digits: d, display: cc ? "+" + cc + " " + SB.groupDigits(d.slice(cc.length)) : "+" + d };
    },
    // v10.10: today's date in the visitor's own time zone (YYYY-MM-DD). toISOString() is UTC and shows "yesterday" in South Africa
    // between 00:00 and 02:00, so every "today" in the site uses this instead.
    today() { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); },
    // "Sold out today": the item carries the DATE it was marked (p.soldOut = "2026-11-08"). It only counts on that day, so it switches itself
    // off at midnight, even on a published site nobody touches.
    isSoldOut(p) { return !!p && p.soldOut === SB.today(); },
    SEASON_RULES,
    // Which special-occasion theme should show on this date? Returns a theme id, or null (= use the everyday theme).
    seasonTheme(auto, date) {
      if (!auto || auto.enabled === false) return null;
      const dt = date || new Date(), t = dOf(dt.getFullYear(), dt.getMonth() + 1, dt.getDate()).getTime();
      for (const r of auto.rules || []) {
        if (r.on === false) continue;
        for (const y of [dt.getFullYear() - 1, dt.getFullYear()]) { try { const [a, b] = seasonWindow(r, y); if (t >= a.getTime() && t <= b.getTime()) return r.theme; } catch (e) { /* bad rule: skip it */ } }
      }
      return null;
    },
    // "1 Feb to 14 Feb" for the admin table (the dates a rule covers in the given year).
    seasonText(r, year) { try { const [a, b] = seasonWindow(r, year || new Date().getFullYear()); return dayText(a) + " to " + dayText(b); } catch (e) { return ""; } },
    load() {
      return SB._p || (SB._p = (async () => {
        // Opened from disk (file://)? Browsers block fetch() there, so read the copy in js/offline-data.js instead.
        const FILE = location.protocol === "file:";
        const mirror = () => window.SB_OFFLINE ? Promise.resolve(window.SB_OFFLINE) : new Promise(res => {
          const el = document.createElement("script"); el.src = "js/offline-data.js";
          el.onload = el.onerror = () => res(window.SB_OFFLINE || {}); document.head.appendChild(el);
        });
        const get = (u, key) => FILE ? mirror().then(m => m[key] || null) : fetch(u).then(r => r.json()).catch(() => null);
        const [biz, pubSet, pubProd] = await Promise.all([get("../config/business.json", "business"), get("../config/site-settings.json", "settings"), get("data/products.json", "products")]);
        const pv = window.top !== window ? J(sessionStorage, "sb_preview") : null;
        const base = { ...D, ...(pubSet || {}) }, own = (pv && pv.settings) || J(localStorage, "sb_settings") || {};
        const settings = { ...base, ...own, home: { ...D.home, ...(base.home || {}), ...(own.home || {}) }, specials: { ...D.specials, ...(base.specials || {}), ...(own.specials || {}) }, orders: { ...D.orders, ...(base.orders || {}), ...(own.orders || {}) }, autoTheme: { ...D.autoTheme, ...(base.autoTheme || {}), ...(own.autoTheme || {}) } };
        const data = J(localStorage, "sb_products") || pubProd || { categories: [], products: [] };
        // v10.9: themeNow = the theme showing right now (a season's theme when one is on, else the owner's everyday theme).
        // settings.theme is NEVER changed by the seasons, so the admin and Publish always keep the owner's own choice.
        // Inside the admin preview (pv) we show exactly the chosen theme, so the owner can look at any theme any time of year.
        const season = pv ? null : SB.seasonTheme(settings.autoTheme), themeNow = season || settings.theme;
        document.documentElement.dataset.theme = themeNow;
        return { biz: biz || {}, settings, themeNow, season, categories: data.categories || [], products: data.products || [], published: { settings: base, products: pubProd } };
      })());
    },
    // v10.2: the card button adds to the cart (SBCart, js/cart.js). One WhatsApp message is sent from the Cart page.
    card(p, biz) {
      const tg = (p.tags || []).map(id => (SB.TAGS.find(t => t[0] === id) || [])[1]).filter(Boolean);
      const so = SB.isSoldOut(p);
      return `<article class="card pcard${so ? " pcard--sold" : ""}"><div class="card__media" aria-hidden="true">${esc(p.emoji || "🍰")}</div><div class="card__body"><h3>${esc(p.name)}${so ? ' <span class="badge badge--sold">Sold out today</span>' : ""}</h3><p class="pcard__desc">${esc(p.description)}</p>${tg.length ? `<p class="pcard__tags" aria-label="Dietary tags">${tg.map(t => `<span class="badge">${esc(t)}</span>`).join("")}</p>` : ""}<div class="pcard__foot"><span class="card__price">R ${esc(p.price)}</span>${so ? `<button type="button" class="btn btn--sm" disabled aria-label="${esc(p.name)} is sold out today">Sold out</button>` : `<button type="button" class="btn btn--sm" data-add="${esc(p.id)}" data-name="${esc(p.name)}" aria-label="Add ${esc(p.name)} to cart">Add</button>`}</div></div></article>`;
    }
  };
})();
