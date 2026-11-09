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
  const SEASON_RULES = [{"theme": "valentines", "type": "range", "from": "02-01", "to": "02-14", "on": true}, {"theme": "easter", "type": "easter", "before": 9, "after": 1, "on": true}, {"theme": "mothers", "type": "nthweekday", "month": 5, "n": 2, "weekday": 0, "before": 7, "after": 0, "on": true}, {"theme": "fathers", "type": "nthweekday", "month": 6, "n": 3, "weekday": 0, "before": 7, "after": 0, "on": true}, {"theme": "braai", "type": "range", "from": "09-17", "to": "09-24", "on": true}, {"theme": "halloween", "type": "range", "from": "10-24", "to": "10-31", "on": true}, {"theme": "christmas", "type": "range", "from": "12-01", "to": "12-26", "on": true}, {"theme": "newyear", "type": "range", "from": "12-27", "to": "01-03", "on": true}, {"theme": "womens", "type": "range", "from": "08-02", "to": "08-09", "on": true}, {"theme": "blackfriday", "type": "nthweekday", "month": 11, "n": 4, "weekday": 4, "before": 1, "after": 4, "on": true}, {"theme": "diwali", "type": "range", "from": "11-03", "to": "11-09", "on": false, "moving": true}, {"theme": "eid", "type": "range", "from": "03-06", "to": "03-10", "on": false, "moving": true}];
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

  // v10.13: built-in wording for each season (home greeting + one line for the top strip). Becca can overwrite either per season in
  // Admin > Theme & layout > Automatic seasons (rule.greeting / rule.special); blank = these. Used only while that season is on.
  const SEASON_WORDS = {
    valentines: { greeting: "Happy Valentine's Day, something sweet for someone special.", special: "Valentine's treats and custom cakes: order early so we can fit you in" },
    easter: { greeting: "Happy Easter, fresh-baked treats for the long weekend.", special: "Easter treats and custom cakes: order early for the long weekend" },
    mothers: { greeting: "Happy Mother's Day, treat the special lady in your life.", special: "Mother's Day cakes and treat boxes: order early" },
    fathers: { greeting: "Happy Father's Day, bake dad's day sweeter.", special: "Father's Day cakes and treats: order early" },
    braai: { greeting: "Happy Braai Day, celebrate Heritage Day with something sweet.", special: "Heritage Day (Braai Day) treats: order early" },
    halloween: { greeting: "Happy Halloween, spooky and sweet treats are baking.", special: "Halloween treats and custom cakes: order early" },
    christmas: { greeting: "Merry Christmas from our kitchen to yours.", special: "Christmas cakes and treats: order early, spaces fill up fast" },
    newyear: { greeting: "Happy New Year, here is to a sweet start.", special: "New Year treats and celebration cakes: order early" },
    womens: { greeting: "Happy Women's Day, treat a woman who deserves it.", special: "Women's Day cakes and treat boxes: order early" },
    blackfriday: { greeting: "Black Friday weekend, treat yourself to something sweet.", special: "Black Friday weekend: ask us on WhatsApp what is baking" },
    diwali: { greeting: "Happy Diwali, a festival of light and sweet things.", special: "Diwali treats and gift boxes: order early" },
    eid: { greeting: "Eid Mubarak, sweet wishes from our kitchen.", special: "Eid treats and gift boxes: order early" }
  };
  // Placeholder for the "Meet Becca" section until Becca writes her own (shows a small "Draft text" tag; the tag goes when she edits it in admin).
  const MEET_TEXT = "Hi, I'm Becca, the baker behind The Sweetest Bakery. Everything here is handmade and baked fresh to order, so nothing sits on a shelf waiting for you.\n\nTell me what you're celebrating and I'll bake something sweet for it.";
  const D = { theme: "classic", tagline: "", heroStyle: "logo", greeting: "Welcome in, something sweet is baking.", home: { hero: true, shop: true, featured: true, fresh: true, meet: true, steps: true, cta: true }, homeOrder: ["hero", "shop", "featured", "fresh", "reviews", "meet", "steps", "cta"], meet: { heading: "Meet Becca", text: MEET_TEXT, draft: true }, featuredCount: 3, featuredStyle: "glass", recentCount: 3, popularCount: 3, popularAuto: true, newDays: 14, decorations: true, autoTheme: { enabled: true, rules: SEASON_RULES }, menuLayout: "grid", faq: [], reviews: [], specials: { enabled: true, items: ["Today's specials: ask Becca on WhatsApp", "Custom cakes for every occasion, order online"] }, orders: { enabled: true, items: ["How to order: message Becca on WhatsApp", "Tell us what you'd like, the date you need it and any notes"] },
    // v10.21: order calendar + delivery fees. PLACEHOLDER numbers (draft: true) until Becca sets her real ones in Admin > Theme & layout > Order calendar & delivery.
    calendar: { enabled: true, draft: true, cartDays: 3, customDays: 7, dailyLimit: 6, closedDays: [], blocked: [] },
    delivery: { enabled: true, draft: true, areas: [{ name: "Close to the bakery", fee: 50 }, { name: "Further out", fee: 90 }], freeOver: 0, collectionNote: "Collection is free. Becca shares the pick-up details when she confirms." },
    // v10.22: cake price guide. PLACEHOLDER sizes and prices (draft: true) until Becca sets her real ones in Admin > Theme & layout > Cake price guide.
    // v10.26: how to pay (EFT / SnapScan / Capitec Pay). EMPTY until Becca types her real details (draft: true); the thank-you page shows nothing while draft, so no fake bank details are ever public.
    payment: { enabled: true, draft: true, intro: "Please pay only after Becca has confirmed your total on WhatsApp.", note: "Use the reference below so Becca can find your payment, then send her the proof of payment on WhatsApp.", bank: { on: true, bank: "", holder: "", number: "", type: "", branch: "" }, snapscan: { on: false, link: "" }, capitec: { on: false, cell: "" } },
    priceGuide: { enabled: true, draft: true, note: "This is a guide only. Becca confirms the final price in her quote (designs, extra decoration and delivery can change it).", sizes: [{ name: "Small (15 cm round)", serves: 10, price: 350 }, { name: "Medium (20 cm round)", serves: 16, price: 550 }, { name: "Large (25 cm round)", serves: 25, price: 800 }], flavours: [{ name: "Vanilla", extra: 0 }, { name: "Chocolate", extra: 0 }, { name: "Red velvet", extra: 40 }, { name: "Carrot", extra: 30 }] } };
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const SB = window.SB = {
    esc, TAGS: [["vegan", "Vegan"], ["gluten-free", "Gluten-free"], ["nut-free", "Nut-free"], ["dairy-free", "Dairy-free"]],
    THEMES: [["classic", "Classic Black & White"], ["cocoa", "Cocoa & Cream"], ["pastel", "Soft Pastel"]],
    // Special-occasion themes (v10.6): tokens live in themes/theme-seasonal.css. The admin shows them as a second group.
    OCCASION_THEMES: [["christmas", "Christmas"], ["valentines", "Valentine's Day"], ["easter", "Easter"], ["halloween", "Halloween"], ["braai", "Braai Day (Heritage Day)"], ["mothers", "Mother's Day"], ["fathers", "Father's Day"], ["newyear", "New Year"], ["womens", "Women's Day"], ["blackfriday", "Black Friday"], ["diwali", "Diwali"], ["eid", "Eid"]],
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
    // v10.17.4: the order of the Home page sections (setting homeOrder, dragged in Admin > Theme & layout > Home page). Always returns every section once:
    // unknown names are dropped, sections missing from a saved list (e.g. added in a later version) go at the end in the default order.
    HOME_ORDER: ["hero", "shop", "featured", "fresh", "reviews", "meet", "steps", "cta"],
    homeOrder(list) { const D = SB.HOME_ORDER, seen = new Set(), out = []; (Array.isArray(list) ? list : []).concat(D).forEach(k => { if (D.includes(k) && !seen.has(k)) { seen.add(k); out.push(k); } }); return out; },
    isSoldOut(p) { return !!p && p.soldOut === SB.today(); },
    // v10.15: "New" badge for items added in the last SB.newDays days (setting newDays, default 14, 0 = off). p.added is a YYYY-MM-DD date set when the item is created.
    isNew(p) { const n = SB.newDays == null ? 14 : SB.newDays; if (!p || !p.added || !n) return false; const d = Math.round((new Date(SB.today() + "T00:00") - new Date(p.added + "T00:00")) / 864e5); return d >= 0 && d < n; },
    SEASON_RULES, SEASON_WORDS,
    // v10.13: wording for a season theme id: the rule's own greeting / special if Becca wrote one, else the built-in text.
    seasonWords(settings, id) {
      const r = (((settings || {}).autoTheme || {}).rules || []).find(x => x.theme === id) || {}, d = SEASON_WORDS[id] || {};
      return { greeting: (r.greeting || "").trim() || d.greeting || "", special: (r.special || "").trim() || d.special || "" };
    },
    // v10.13: "remember my details on this device". Name, phone, collection/delivery and allergies live ONLY in this browser (localStorage
    // "sb_me"), never sent anywhere except inside the WhatsApp message the customer chooses to send. remember:false = customer opted out.
    me: {
      get() { try { const m = JSON.parse(localStorage.getItem("sb_me")); return m && typeof m === "object" ? m : {}; } catch (e) { return {}; } },
      save(d) { try { localStorage.setItem("sb_me", JSON.stringify({ ...SB.me.get(), ...d, remember: true })); } catch (e) { /* private mode: nothing to remember */ } },
      optOut() { try { localStorage.setItem("sb_me", JSON.stringify({ remember: false })); } catch (e) { /* ignore */ } },
      forget() { try { localStorage.removeItem("sb_me"); localStorage.removeItem("sb_cc"); } catch (e) { /* ignore */ } },
      has() { const m = SB.me.get(); return m.remember !== false && !!(m.name || m.phone); },
      // The tick box + "Forget" link drawn under a form. Wire it with SB.me.wire().
      box(id) { const m = SB.me.get(); return `<div class="remember"><label class="chk"><input type="checkbox" id="${id}" ${m.remember === false ? "" : "checked"}> Remember my details on this device</label><span class="muted small">Kept only on this phone or computer, never on our server. <button type="button" class="linkbtn" data-forget${SB.me.has() ? "" : " hidden"}>Forget my details</button></span></div><p class="muted small remember__priv">When you send, we also keep a copy of your order (name, phone, items) so Becca can find it. <a href="privacy.html">Privacy</a></p>`; },
      // After a send: save (ticked) or clear (unticked). Only call when the customer actually sends.
      commit(id, d) { const c = document.getElementById(id); if (c && !c.checked) SB.me.optOut(); else SB.me.save(d); },
    },
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
    // v10.17: read the public rows (menu + settings) with a plain request, no library needed. null = database not reachable / not set up.
    async dbRead(cfg) {
      if (!cfg || !cfg.url || !cfg.key) return null;
      try {
        const c = new AbortController(), tm = setTimeout(() => c.abort(), 4000);
        const r = await fetch(cfg.url + "/rest/v1/site_data?select=key,value", { headers: { apikey: cfg.key }, signal: c.signal }); clearTimeout(tm);
        if (!r.ok) return null; const o = {}; (await r.json()).forEach(x => { o[x.key] = x.value; }); return o;
      } catch (e) { return null; }
    },
    // v10.21: how many orders are already booked per date (upcoming, cancelled ignored): {"2026-11-20": 3} or null if unavailable. Needs setup.sql section 9.
    // Only dates + counts are public, never names or phones. Never throws.
    async bookedDates(cfg) {
      if (SB._booked !== undefined) return SB._booked;
      cfg = cfg || (SB._biz || {}).supabase; if (!cfg || !cfg.url || !cfg.key || location.protocol === "file:") return (SB._booked = null);
      try {
        const c = new AbortController(), tm = setTimeout(() => c.abort(), 4000);
        const r = await fetch(cfg.url + "/rest/v1/rpc/booked_dates", { method: "POST", headers: { apikey: cfg.key, "Content-Type": "application/json" }, body: "{}", signal: c.signal }); clearTimeout(tm);
        if (!r.ok) return (SB._booked = null); const a = await r.json(); if (!Array.isArray(a)) return (SB._booked = null);
        const o = {}; a.forEach(x => { if (/^\d{4}-\d{2}-\d{2}$/.test(x.day)) o[x.day] = +x.n || 0; }); return (SB._booked = o);
      } catch (e) { return (SB._booked = null); }
    },
    // v10.21: is this date OK for an order? kind = "cart" | "custom". Returns { ok, reason }. Rules come from settings.calendar (notice days, closed weekdays, blocked dates, daily limit).
    dateCheck(iso, kind, cal, booked) {
      if (!iso || !cal || cal.enabled === false) return { ok: true };
      const t = new Date(iso + "T12:00"), today = new Date(SB.today() + "T12:00"); if (isNaN(t)) return { ok: true };
      const days = Math.max(0, +(kind === "custom" ? cal.customDays : cal.cartDays) || 0), diff = Math.round((t - today) / 864e5);
      const nice = d => d.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long" });
      if (diff < 0) return { ok: false, reason: "That date has passed." };
      if (diff < days) return { ok: false, reason: (kind === "custom" ? "Custom orders" : "Orders") + " need " + days + (days === 1 ? " day" : " days") + " notice." };
      if ((cal.blocked || []).includes(iso)) return { ok: false, reason: "Becca is not taking orders on " + nice(t) + "." };
      if ((cal.closedDays || []).includes(t.getDay())) return { ok: false, reason: "Becca does not do orders on " + t.toLocaleDateString("en-ZA", { weekday: "long" }) + "s." };
      const lim = +cal.dailyLimit || 0; if (lim && booked && (booked[iso] || 0) >= lim) return { ok: false, reason: nice(t) + " is fully booked." };
      return { ok: true };
    },
    // First date from today that passes dateCheck (looks 180 days ahead), as ISO, or "".
    nextFreeDate(kind, cal, booked) {
      const d = new Date(SB.today() + "T12:00");
      for (let i = 0; i < 180; i++, d.setDate(d.getDate() + 1)) { const iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); if (SB.dateCheck(iso, kind, cal, booked).ok) return iso; }
      return "";
    },
    // The sentence shown when a date does not work: the reason + the first date that does.
    dateMsg(iso, kind, cal, booked) {
      const r = SB.dateCheck(iso, kind, cal, booked); if (r.ok) return "";
      const n = SB.nextFreeDate(kind, cal, booked);
      return r.reason + (n ? " The first free date is " + new Date(n + "T12:00").toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long" }) + "." : "");
    },
    // v10.26: which payment methods are ready to show. Returns null while the details are still the empty placeholder (draft), switched off, or empty.
    payInfo(pay) {
      if (!pay || pay.enabled === false || pay.draft) return null;
      const t = v => String(v || "").trim(), b = pay.bank || {}, sn = pay.snapscan || {}, cp = pay.capitec || {};
      const bank = b.on !== false && t(b.number) && t(b.holder) ? { bank: t(b.bank), holder: t(b.holder), number: t(b.number), type: t(b.type), branch: t(b.branch) } : null;
      const snap = sn.on && /^https?:\/\//i.test(t(sn.link)) ? { link: t(sn.link) } : null;
      const cap = cp.on && t(cp.cell) ? { cell: t(cp.cell) } : null;
      return bank || snap || cap ? { intro: t(pay.intro), note: t(pay.note), bank, snap, cap } : null;
    },
    // v10.22: price guide estimate. pg = settings.priceGuide, si / fi = chosen size and flavour (numbers). Returns { size, serves, flavour, price } or null.
    guidePrice(pg, si, fi) {
      const z = ((pg && pg.sizes) || [])[si], f = ((pg && pg.flavours) || [])[fi]; if (!z) return null;
      const price = Math.max(0, Math.round((+z.price || 0) + (f ? +f.extra || 0 : 0)));
      return { size: z.name, serves: Math.max(1, Math.round(+z.serves || 1)), flavour: f ? f.name : "", price };
    },
    // v10.21: delivery fee for an area (0 when the order is over the free-delivery amount). Returns { fee, free } or null if the area is not on the list.
    deliveryFee(dl, area, total) {
      if (!dl || dl.enabled === false) return null; const a = (dl.areas || []).find(x => x.name === area); if (!a) return null;
      const free = +dl.freeOver > 0 && total >= +dl.freeOver; return { fee: free ? 0 : Math.max(0, +a.fee || 0), free };
    },
    // v10.19: the items ordered most (last 90 days, cancelled orders ignored): [{id, qty}] or null if unavailable. Needs setup.sql section 7.
    // Only item ids and counts are public, never names or phone numbers. Never throws.
    async popularRank(cfg) {
      cfg = cfg || (SB._biz || {}).supabase; if (!cfg || !cfg.url || !cfg.key || location.protocol === "file:") return null;
      try {
        const c = new AbortController(), tm = setTimeout(() => c.abort(), 4000);
        const r = await fetch(cfg.url + "/rest/v1/rpc/popular_items", { method: "POST", headers: { apikey: cfg.key, "Content-Type": "application/json" }, body: JSON.stringify({ days: 90, max_items: 12 }), signal: c.signal }); clearTimeout(tm);
        if (!r.ok) return null; const a = await r.json(); return Array.isArray(a) ? a.map(x => ({ id: String(x.id), qty: +x.qty || 0 })) : null;
      } catch (e) { return null; }
    },
    // v10.18: the customer's sign-in (kept by account.html under localStorage "sb-customer", separate from the admin's). saveOrder links an order to a signed-in
    // customer; customerWarm() quietly renews an old token on every page so that works days later. Both use plain requests (no library).
    customer() { try { const t = JSON.parse(localStorage.getItem("sb-customer") || "null"); return t && t.access_token && t.user ? t : null; } catch (e) { return null; } },
    customerWarm() {
      try {
        const c = (SB._biz || {}).supabase, t = SB.customer(); if (!c || !t || !t.refresh_token || t.expires_at * 1000 - Date.now() > 120000 || SB._warm) return; SB._warm = 1;
        fetch(c.url + "/auth/v1/token?grant_type=refresh_token", { method: "POST", headers: { apikey: c.key, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: t.refresh_token }) })
          .then(r => r.ok ? r.json() : null).then(n => { if (n && n.access_token) localStorage.setItem("sb-customer", JSON.stringify({ ...t, ...n })); }).catch(() => { /* offline */ });
      } catch (e) { /* ignore */ }
    },
    // v10.19.1: remember what was just sent (this tab only) so thanks.html can show it. Never leaves the browser.
    lastOrder(o) { try { if (o) sessionStorage.setItem("sb_last", JSON.stringify({ ...o, at: Date.now() })); else return JSON.parse(sessionStorage.getItem("sb_last") || "null"); } catch (e) { return null; } },
    // v10.23: spam traps. A hidden box real people never see (bots fill it in) + a bot-fast timer. A trapped form only skips the ONLINE copy:
    // the WhatsApp message always works, so a real customer is never blocked. The database has its own rate limits too (setup.sql section 10).
    spam: {
      t0: Date.now(),
      field() { return '<div class="hp" aria-hidden="true"><label>Leave this box empty<input type="text" name="hp_extra" tabindex="-1" autocomplete="off"></label></div>'; },
      bot(root) { const h = (root || document).querySelector('input[name="hp_extra"]'); return !!(h && h.value.trim() !== "") || Date.now() - SB.spam.t0 < 3000; }
    },
    // v10.17: save an order online (anyone may add one, only admins can read them). Never blocks or breaks the WhatsApp message.
    saveOrder(o) {
      // v10.25: returns a promise (true = saved online, false = not) so a slow photo upload can be waited for. It never rejects.
      try {
        if (SB.spam.bot()) return Promise.resolve(false);   // v10.23
        const c = (SB._biz || {}).supabase; if (!c || !c.url || !c.key || window.top !== window) return Promise.resolve(false);
        const t = SB.customer(), live = t && t.expires_at * 1000 > Date.now() + 30000, h = { apikey: c.key, "Content-Type": "application/json", Prefer: "return=minimal" };
        if (live) { h.Authorization = "Bearer " + t.access_token; o = { ...o, user_id: t.user.id }; }   // v10.18: signed in = shows under My account
        return fetch(c.url + "/rest/v1/orders", { method: "POST", keepalive: true, headers: h, body: JSON.stringify(o) }).then(r => r.ok).catch(() => false);   // offline: the WhatsApp message still goes
      } catch (e) { return Promise.resolve(false); }
    },
    // v10.25: inspiration photo for a custom order. shrink() makes a small JPEG in the browser (max 1400 px, under 1.8 MB); upload() puts it in the
    // private "inspiration" bucket under a random name and returns that name (or null). Neither ever throws, and a failed photo never blocks the order.
    photo: {
      async shrink(file) {
        try {
          if (!file || !/^image\//.test(file.type)) return null;
          const url = URL.createObjectURL(file), img = await new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = url; });
          const k = Math.min(1, 1400 / Math.max(img.naturalWidth, img.naturalHeight)), cv = document.createElement("canvas");
          cv.width = Math.max(1, Math.round(img.naturalWidth * k)); cv.height = Math.max(1, Math.round(img.naturalHeight * k));
          const cx = cv.getContext("2d"); cx.fillStyle = "#fff"; cx.fillRect(0, 0, cv.width, cv.height); cx.drawImage(img, 0, 0, cv.width, cv.height); URL.revokeObjectURL(url);
          for (const q of [0.82, 0.65, 0.5]) { const b = await new Promise(r => cv.toBlob(r, "image/jpeg", q)); if (b && b.size <= 1.8 * 1024 * 1024) return b; }
          return null;
        } catch (e) { return null; }
      },
      async upload(blob) {
        try {
          const c = (SB._biz || {}).supabase; if (!blob || !c || !c.url || !c.key || window.top !== window || location.protocol === "file:") return null;
          const name = (crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, ch => { const r = Math.random() * 16 | 0; return (ch === "x" ? r : (r & 3 | 8)).toString(16); })) + ".jpg";
          const ctl = new AbortController(), tm = setTimeout(() => ctl.abort(), 15000);
          const r = await fetch(c.url + "/storage/v1/object/inspiration/" + name, { method: "POST", headers: { apikey: c.key, Authorization: "Bearer " + c.key, "Content-Type": "image/jpeg" }, body: blob, signal: ctl.signal }); clearTimeout(tm);
          return r.ok ? name : null;
        } catch (e) { return null; }
      }
    },
    load() {
      return SB._p || (SB._p = (async () => {
        // Opened from disk (file://)? Browsers block fetch() there, so read the copy in js/offline-data.js instead.
        const FILE = location.protocol === "file:";
        const mirror = () => window.SB_OFFLINE ? Promise.resolve(window.SB_OFFLINE) : new Promise(res => {
          const el = document.createElement("script"); el.src = "js/offline-data.js";
          el.onload = el.onerror = () => res(window.SB_OFFLINE || {}); document.head.appendChild(el);
        });
        const get = (u, key) => FILE ? mirror().then(m => m[key] || null) : fetch(u).then(r => r.json()).catch(() => null);
        const biz = await get("../config/business.json", "business"); SB._biz = biz || {};
        // v10.17: the menu and settings live in the online database (Supabase) when it answers; the files are the fallback.
        const [fSet, fProd, db] = await Promise.all([get("../config/site-settings.json", "settings"), get("data/products.json", "products"), SB.dbRead(SB._biz.supabase)]);
        SB.dbOK = db !== null; SB.dbRows = db || {};
        const pubSet = (db && db.settings) || fSet, pubProd = (db && db.products) || fProd;
        const pv = window.top !== window ? J(sessionStorage, "sb_preview") : null;
        const base = { ...D, ...(pubSet || {}) }, own = (pv && pv.settings) || (SB.dbOK ? null : J(localStorage, "sb_settings")) || {};
        const settings = { ...base, ...own, home: { ...D.home, ...(base.home || {}), ...(own.home || {}) }, meet: { ...D.meet, ...(base.meet || {}), ...(own.meet || {}) }, specials: { ...D.specials, ...(base.specials || {}), ...(own.specials || {}) }, orders: { ...D.orders, ...(base.orders || {}), ...(own.orders || {}) }, autoTheme: { ...D.autoTheme, ...(base.autoTheme || {}), ...(own.autoTheme || {}) },
          calendar: { ...D.calendar, ...(base.calendar || {}), ...(own.calendar || {}) }, delivery: { ...D.delivery, ...(base.delivery || {}), ...(own.delivery || {}) },   // v10.21
          priceGuide: { ...D.priceGuide, ...(base.priceGuide || {}), ...(own.priceGuide || {}) },   // v10.22
          payment: (() => { const b = base.payment || {}, w = own.payment || {}; return { ...D.payment, ...b, ...w, bank: { ...D.payment.bank, ...(b.bank || {}), ...(w.bank || {}) }, snapscan: { ...D.payment.snapscan, ...(b.snapscan || {}), ...(w.snapscan || {}) }, capitec: { ...D.payment.capitec, ...(b.capitec || {}), ...(w.capitec || {}) } }; })() };   // v10.26
        // v10.20: seasons added in later versions reach already-saved settings too (added at the end, nothing Becca chose is changed).
        { const au = settings.autoTheme, have = new Set((au.rules || []).map(r => r.theme)); au.rules = [...(au.rules || []), ...SEASON_RULES.filter(r => !have.has(r.theme)).map(r => ({ ...r }))]; }
        const data = (SB.dbOK ? null : J(localStorage, "sb_products")) || pubProd || { categories: [], products: [] };
        // v10.9: themeNow = the theme showing right now (a season's theme when one is on, else the owner's everyday theme).
        // settings.theme is NEVER changed by the seasons, so the admin and Publish always keep the owner's own choice.
        // Inside the admin preview (pv) we show exactly the chosen theme, so the owner can look at any theme any time of year.
        const season = pv ? (pv.peek || null) : SB.seasonTheme(settings.autoTheme), themeNow = season || settings.theme;
        document.documentElement.dataset.theme = themeNow;
        // v10.15: sections can be hidden (c.hidden). Customers only ever get shownCategories / shownProducts (an item inside a hidden section is hidden too);
        // the admin keeps using categories / products (everything).
        const cats = data.categories || [], prods = data.products || [], hid = new Set(cats.filter(c => c.hidden).map(c => c.id));
        SB.newDays = settings.newDays == null ? 14 : +settings.newDays;
        return { biz: biz || {}, settings, themeNow, season, categories: cats, products: prods, shownCategories: cats.filter(c => !c.hidden), shownProducts: prods.filter(p => p.visible !== false && !hid.has(p.category)), published: { settings: base, products: pubProd } };
      })());
    },
    // v10.2: the card button adds to the cart (SBCart, js/cart.js). One WhatsApp message is sent from the Cart page.
    card(p, biz) {
      const tg = (p.tags || []).map(id => (SB.TAGS.find(t => t[0] === id) || [])[1]).filter(Boolean);
      const so = SB.isSoldOut(p), nw = !so && SB.isNew(p);
      return `<article class="card pcard${so ? " pcard--sold" : ""}"><div class="card__media" aria-hidden="true">${esc(p.emoji || "🍰")}</div><div class="card__body"><h3>${esc(p.name)}${so ? ' <span class="badge badge--sold">Sold out today</span>' : ""}${nw ? ' <span class="badge badge--new">New</span>' : ""}</h3><p class="pcard__desc">${esc(p.description)}</p>${tg.length ? `<p class="pcard__tags" aria-label="Dietary tags">${tg.map(t => `<span class="badge">${esc(t)}</span>`).join("")}</p>` : ""}<div class="pcard__foot"><span class="card__price">R ${esc(p.price)}</span>${so ? `<button type="button" class="btn btn--sm" disabled aria-label="${esc(p.name)} is sold out today">Sold out</button>` : `<button type="button" class="btn btn--sm" data-add="${esc(p.id)}" data-name="${esc(p.name)}" aria-label="Add ${esc(p.name)} to cart">Add</button>`}</div></div></article>`;
    }
  };
})();
