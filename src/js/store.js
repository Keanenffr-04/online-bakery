/* store.js: one place that loads site data. Published files first, then this device's admin changes
   (localStorage). Inside the admin preview iframe it uses the unsaved draft instead. */
(function () {
  const J = (s, k) => { try { return JSON.parse(s.getItem(k)); } catch (e) { return null; } };
  const D = { theme: "classic", tagline: "", heroStyle: "logo", greeting: "Welcome in, something sweet is baking.", home: { hero: true, featured: true, cta: true }, featuredCount: 3, featuredStyle: "glass", menuLayout: "grid", faq: [], reviews: [], specials: { enabled: true, items: ["Today's specials: ask Becca on WhatsApp", "Custom cakes for every occasion, order online"] }, orders: { enabled: true, items: ["How to order: message Becca on WhatsApp", "Tell us what you'd like, the date you need it and any notes"] } };
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const SB = window.SB = {
    esc, TAGS: [["vegan", "Vegan"], ["gluten-free", "Gluten-free"], ["nut-free", "Nut-free"], ["dairy-free", "Dairy-free"]],
    THEMES: [["classic", "Classic Black & White"], ["cocoa", "Cocoa & Cream"], ["pastel", "Soft Pastel"]],
    // Special-occasion themes (v10.6): tokens live in themes/theme-seasonal.css. The admin shows them as a second group.
    OCCASION_THEMES: [["christmas", "Christmas"], ["valentines", "Valentine's Day"], ["easter", "Easter"], ["halloween", "Halloween"], ["braai", "Braai Day (Heritage Day)"], ["mothers", "Mother's Day"]],
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
        const settings = { ...base, ...own, home: { ...D.home, ...(base.home || {}), ...(own.home || {}) }, specials: { ...D.specials, ...(base.specials || {}), ...(own.specials || {}) }, orders: { ...D.orders, ...(base.orders || {}), ...(own.orders || {}) } };
        const data = J(localStorage, "sb_products") || pubProd || { categories: [], products: [] };
        document.documentElement.dataset.theme = settings.theme;
        return { biz: biz || {}, settings, categories: data.categories || [], products: data.products || [], published: { settings: base, products: pubProd } };
      })());
    },
    // v10.2: the card button adds to the cart (SBCart, js/cart.js). One WhatsApp message is sent from the Cart page.
    card(p, biz) {
      const tg = (p.tags || []).map(id => (SB.TAGS.find(t => t[0] === id) || [])[1]).filter(Boolean);
      return `<article class="card pcard"><div class="card__media" aria-hidden="true">${esc(p.emoji || "🍰")}</div><div class="card__body"><h3>${esc(p.name)}</h3><p class="pcard__desc">${esc(p.description)}</p>${tg.length ? `<p class="pcard__tags" aria-label="Dietary tags">${tg.map(t => `<span class="badge">${esc(t)}</span>`).join("")}</p>` : ""}<div class="pcard__foot"><span class="card__price">R ${esc(p.price)}</span><button type="button" class="btn btn--sm" data-add="${esc(p.id)}" data-name="${esc(p.name)}" aria-label="Add ${esc(p.name)} to cart">Add</button></div></div></article>`;
    }
  };
})();
