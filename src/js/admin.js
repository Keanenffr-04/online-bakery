/* admin.js: client-side admin (login, sign-up, orders, menu, look & layout, admins, export).
   NOTE: this is a static site, so everything is saved in THIS browser (localStorage). It is a convenience
   lock, not real security. Use "Publish" to export files that make changes live for everyone. */
(function () {
  const $ = q => document.querySelector(q), app = $("#app"), esc = SB.esc;
  const J = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
  const S = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const uid = () => Math.random().toString(36).slice(2, 9);
  const ok = s => /^[A-Za-z0-9_.-]{3,20}$/.test(s);
  async function hash(pw, salt) {
    if (window.crypto && crypto.subtle) { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + pw)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join(""); }
    let h = 5381; for (const c of salt + pw) h = ((h * 33) ^ c.charCodeAt(0)) >>> 0; return "f" + h;
  }
  const mk = async (u, p, extra) => { const salt = uid() + uid(); return { u, salt, h: await hash(p, salt), status: "active", ...extra }; };
  const admins = () => J("sb_admins", []), saveA = a => S("sb_admins", a);
  const find = (a, u) => a.find(x => x.u.toLowerCase() === u.toLowerCase());
  let state = { tab: "orders", note: "", authTab: "login", edit: null, page: "index.html", draft: null, data: null };
  const me = () => sessionStorage.getItem("sb_session");
  const flash = t => { state.note = t; render(); };

  async function seed() { if (!admins().length) saveA([await mk("admin", "admin1", { root: true, mustChange: true })]); }

  async function login(u, p) {
    const a = find(admins(), u);
    if (!a || a.h !== await hash(p, a.salt)) return flash("Wrong username or password.");
    if (a.status !== "active") return flash("This account is waiting for approval by an admin.");
    sessionStorage.setItem("sb_session", a.u); state.note = ""; render();
  }
  async function signup(u, p) {
    const all = admins();
    if (!ok(u)) return flash("Username: 3-20 letters, numbers, . _ -");
    if (p.length < 6) return flash("Password must be at least 6 characters.");
    if (find(all, u)) return flash("That username is taken.");
    all.push(await mk(u, p, { status: "pending" })); saveA(all);
    state.authTab = "login"; flash("Sign-up sent. An existing admin must approve it before you can log in.");
  }

  function authView() {
    const l = state.authTab === "login";
    return `<div class="adm-card adm-login"><h1>${l ? "Admin login" : "Admin sign-up"}</h1>
    <div class="adm-tabs"><button class="btn btn--sm ${l ? "" : "btn--ghost"}" data-act="auth" data-v="login">Log in</button><button class="btn btn--sm ${l ? "btn--ghost" : ""}" data-act="auth" data-v="signup">Sign up</button></div>
    ${state.note ? `<div class="msg">${esc(state.note)}</div>` : ""}
    <form data-form="${l ? "login" : "signup"}"><label>Username</label><input name="u" autocomplete="username" required>
    <label>Password</label><input name="p" type="password" autocomplete="${l ? "current-password" : "new-password"}" required>
    <p style="margin-top:1rem"><button class="btn" type="submit">${l ? "Log in" : "Request access"}</button></p></form>
    <p class="muted"><a href="index.html">Back to the website</a></p></div>`;
  }

  /* ---------- tabs ---------- */
  const TABS = [["orders", "Orders"], ["menu", "Menu items"], ["look", "Theme & layout"], ["admins", "Admins"], ["account", "My account"], ["publish", "Publish"]];

  function orders() {
    const o = J("sb_orders", []), f = state.filter || "pending", list = o.filter(x => f === "all" || x.status === f);
    const st = ["pending", "confirmed", "ready", "completed", "cancelled"];
    return `<div class="adm-split"><div class="adm-card"><h2>Add an order</h2>
    <form data-form="order"><label>Customer</label><input name="name" required><label>Phone (with country code)</label><input name="phone" placeholder="27831234567">
    <label>What they ordered</label><textarea name="items" required></textarea><div class="adm-row"><div><label>Needed on</label><input name="date" type="date"></div><div><label>Total (R)</label><input name="total" type="number" min="0"></div></div>
    <p><button class="btn btn--sm" type="submit">Save order</button></p></form></div>
    <div class="adm-card"><div class="adm-top"><h2>${list.length} ${f === "all" ? "" : f} order${list.length === 1 ? "" : "s"}</h2>
    <select data-act="filter" style="width:auto">${["all", ...st].map(s => `<option ${s === f ? "selected" : ""}>${s}</option>`).join("")}</select></div>
    <ul class="adm-list">${list.map(x => `<li><div><strong>${esc(x.name)}</strong> <span class="tag">${x.status}</span><br><span class="muted">${esc(x.items)}${x.date ? " &middot; for " + esc(x.date) : ""}${x.total ? " &middot; R " + esc(x.total) : ""}</span></div>
    <div class="adm-actions"><select data-act="ostatus" data-id="${x.id}" style="width:auto">${st.map(s => `<option ${s === x.status ? "selected" : ""}>${s}</option>`).join("")}</select>
    ${x.phone ? `<a class="btn btn--sm btn--whatsapp" target="_blank" rel="noopener" href="https://wa.me/${esc(x.phone.replace(/\D/g, ""))}">WhatsApp</a>` : ""}
    <button class="btn btn--sm btn--ghost" data-act="odel" data-id="${x.id}">Delete</button></div></li>`).join("") || "<li>No orders here.</li>"}</ul></div></div>
    <p class="muted">Orders arrive on WhatsApp, so add them here to keep track. They are stored in this browser only.</p>`;
  }

  function menu() {
    const d = state.data, e = d.products.find(p => p.id === state.edit) || { visible: true, category: d.categories[0]?.id, emoji: "🍰" };
    return `<div class="adm-split"><div class="adm-card"><h2>${state.edit ? "Edit item" : "Add item"}</h2>
    <form data-form="product"><label>Name</label><input name="name" value="${esc(e.name)}" required>
    <label>Section</label><select name="category">${d.categories.map(c => `<option value="${c.id}" ${c.id === e.category ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select>
    <label>Description</label><textarea name="description">${esc(e.description)}</textarea>
    <div class="adm-row"><div><label>Price (R)</label><input name="price" type="number" min="0" value="${esc(e.price)}" required></div><div><label>Emoji</label><input name="emoji" value="${esc(e.emoji)}"></div></div>
    <label class="chk"><input type="checkbox" name="featured" ${e.featured ? "checked" : ""}>Show on home page</label>
    <label class="chk"><input type="checkbox" name="visible" ${e.visible !== false ? "checked" : ""}>Visible on menu</label>
    <p><button class="btn btn--sm" type="submit">Save</button> ${state.edit ? '<button class="btn btn--sm btn--ghost" type="button" data-act="pcancel">Cancel</button>' : ""}</p></form></div>
    <div class="adm-card"><h2>${d.products.length} items</h2><ul class="adm-list">${d.products.map(p => `<li><div>${esc(p.emoji)} <strong>${esc(p.name)}</strong> <span class="muted">R ${esc(p.price)}</span> ${p.featured ? '<span class="tag">home</span>' : ""} ${p.visible === false ? '<span class="tag">hidden</span>' : ""}</div>
    <div class="adm-actions"><button class="btn btn--sm btn--ghost" data-act="pedit" data-id="${p.id}">Edit</button><button class="btn btn--sm btn--ghost" data-act="pdel" data-id="${p.id}">Delete</button></div></li>`).join("")}</ul></div></div>`;
  }

  const OFFLINE_HEAD = "/* offline-data.js: a COPY of config/business.json, config/site-settings.json and src/data/products.json.\n   Only used when the site is opened straight from disk (file://, e.g. preview.html), because browsers block\n   fetch() of local files. The live/hosted site ignores this file and reads the real JSON files.\n   KEEP IN SYNC: whenever one of those three files changes, regenerate this file (see docs/AI_HANDOFF.md). */\n";
  const draftKey = () => sessionStorage.setItem("sb_preview", JSON.stringify({ settings: state.draft }));
  function look() {
    const s = state.draft;
    return `<div class="adm-split"><div class="adm-card"><h2>Theme</h2><div class="themes">${SB.THEMES.map(([id, n]) => `<button class="btn btn--sm ${s.theme === id ? "" : "btn--ghost"}" data-act="theme" data-v="${id}">${n}</button>`).join("")}</div>
    <h2 style="margin-top:1.2rem">Home page</h2>${[["hero", "Hero"], ["featured", "Featured items"], ["cta", "Order banner"]].map(([k, n]) => `<label class="chk"><input type="checkbox" data-act="home" data-k="${k}" ${s.home[k] !== false ? "checked" : ""}>${n}</label>`).join("")}
    <label>Featured items shown</label><select data-act="fc">${[2, 3, 4, 6].map(n => `<option ${n == s.featuredCount ? "selected" : ""}>${n}</option>`).join("")}</select>
    <label>Hero style</label><select data-act="hs"><option value="logo" ${s.heroStyle !== "bakes" ? "selected" : ""}>Logo (rabbit)</option><option value="bakes" ${s.heroStyle === "bakes" ? "selected" : ""}>Baked goods + greeting</option></select>
    <label>Greeting (baked goods hero)</label><input data-act="gr" maxlength="80" value="${esc(s.greeting)}">
    <label>Hero text</label><textarea data-act="tag">${esc(s.tagline)}</textarea>
    <h2 style="margin-top:1.2rem">Specials strip</h2>
    <label class="chk"><input type="checkbox" data-act="spon" ${s.specials && s.specials.enabled === false ? "" : "checked"}>Show the scrolling strip at the top of every page</label>
    <label>Specials (one per line, up to 6)</label><textarea data-act="sptxt" maxlength="500" placeholder="e.g. Cupcake boxes: buy 2, get 1 free this week">${esc(((s.specials || {}).items || []).join("\n"))}</textarea>
    <label>Menu layout</label><select data-act="ml"><option value="grid" ${s.menuLayout === "grid" ? "selected" : ""}>Grid</option><option value="list" ${s.menuLayout === "list" ? "selected" : ""}>List</option></select>
    <p style="margin-top:1rem"><button class="btn btn--sm" data-act="lsave">Save to this device</button> <button class="btn btn--sm btn--ghost" data-act="lreset">Reset</button></p>
    <p class="muted">Clicking a theme only previews it until you save.</p></div>
    <div><div class="adm-tabs"><button class="btn btn--sm ${state.page === "index.html" ? "" : "btn--ghost"}" data-act="ppage" data-v="index.html">Home</button><button class="btn btn--sm ${state.page === "menu.html" ? "" : "btn--ghost"}" data-act="ppage" data-v="menu.html">Menu</button></div>
    <iframe title="Live preview" src="${state.page}"></iframe></div></div>`;
  }

  function adminsView() {
    const a = admins();
    return `<div class="adm-split"><div class="adm-card"><h2>Add an admin</h2><form data-form="addadmin"><label>Username</label><input name="u" required><label>Password</label><input name="p" type="password" required>
    <p><button class="btn btn--sm" type="submit">Add admin</button></p></form><p class="muted">The root admin is always "admin" (password can change, account can't be removed).</p></div>
    <div class="adm-card"><h2>Admins</h2><ul class="adm-list">${a.map(x => `<li><div><strong>${esc(x.u)}</strong> ${x.root ? '<span class="tag">root</span>' : ""} ${x.status === "pending" ? '<span class="tag">waiting</span>' : ""}</div>
    <div class="adm-actions">${x.status === "pending" ? `<button class="btn btn--sm" data-act="aok" data-u="${esc(x.u)}">Approve</button>` : ""}
    ${x.root ? "" : `<button class="btn btn--sm btn--ghost" data-act="areset" data-u="${esc(x.u)}">New password</button>`}${x.root ? "" : `<button class="btn btn--sm btn--ghost" data-act="adel" data-u="${esc(x.u)}">${x.status === "pending" ? "Decline" : "Remove"}</button>`}</div></li>`).join("")}</ul></div></div>`;
  }

  function account() {
    const a = find(admins(), me());
    return `<div class="adm-card" style="max-width:460px"><h2>My account</h2><form data-form="account">
    <label>Username</label><input name="u" value="${esc(a.u)}" ${a.root ? "readonly" : ""}>
    <label>Current password</label><input name="cur" type="password" required><label>New password (leave empty to keep)</label><input name="p" type="password">
    <p><button class="btn btn--sm" type="submit">Save</button></p></form></div>`;
  }

  function publish() {
    return `<div class="adm-card"><h2>Make changes live for everyone</h2>
    <p>Saved changes only show in this browser. To publish them, download these three files and replace the originals in the project, then re-upload the site:</p>
    <p><button class="btn btn--sm" data-act="dl-set">Download site-settings.json</button> <span class="muted">replaces <code>config/site-settings.json</code></span></p>
    <p><button class="btn btn--sm" data-act="dl-prod">Download products.json</button> <span class="muted">replaces <code>src/data/products.json</code></span></p>
    <p><button class="btn btn--sm" data-act="dl-off">Download offline-data.js</button> <span class="muted">replaces <code>src/js/offline-data.js</code> (keeps <code>preview.html</code> showing the same thing)</span></p>
    <p><button class="btn btn--sm btn--ghost" data-act="dl-ord">Download orders (CSV)</button></p>
    <p><button class="btn btn--sm btn--ghost" data-act="discard">Discard my saved changes on this device</button></p></div>`;
  }

  function dash() {
    const a = find(admins(), me());
    const warn = a.root && a.mustChange ? `<div class="msg msg--warn">You are still using the default password. Please change it under <strong>My account</strong>.</div>` : "";
    const body = { orders, menu, look, admins: adminsView, account, publish }[state.tab]();
    return `<div class="adm-top"><h1>Admin</h1><div class="adm-actions"><span class="muted">Hi, ${esc(a.u)}</span><a class="btn btn--sm btn--ghost" href="index.html">View site</a><button class="btn btn--sm" data-act="logout">Log out</button></div></div>
    <div class="adm-tabs">${TABS.map(([k, n]) => `<button class="btn btn--sm ${state.tab === k ? "" : "btn--ghost"}" data-act="tab" data-v="${k}">${n}</button>`).join("")}</div>
    ${warn}${state.note ? `<div class="msg">${esc(state.note)}</div>` : ""}${body}`;
  }

  function render() { app.innerHTML = me() && find(admins(), me()) ? dash() : authView(); state.note = ""; }
  const go = (t, note) => { state.tab = t; state.note = note || ""; app.innerHTML = dash(); state.note = ""; };
  const dl = (name, text, type) => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: type || "application/json" })); a.download = name; a.click(); };
  const saveProducts = () => S("sb_products", { categories: state.data.categories, products: state.data.products });

  /* ---------- events ---------- */
  app.addEventListener("submit", async e => {
    e.preventDefault(); const f = e.target, v = Object.fromEntries(new FormData(f)), k = f.dataset.form;
    if (k === "login") return login(v.u.trim(), v.p);
    if (k === "signup") return signup(v.u.trim(), v.p);
    if (k === "order") { const o = J("sb_orders", []); o.unshift({ id: uid(), status: "pending", ...v }); S("sb_orders", o); return go("orders", "Order saved."); }
    if (k === "product") {
      const p = { ...v, price: Number(v.price), featured: !!v.featured, visible: !!v.visible }, L = state.data.products;
      if (state.edit) Object.assign(L.find(x => x.id === state.edit), p); else L.push({ id: "p" + uid(), ...p });
      state.edit = null; saveProducts(); return go("menu", "Menu saved.");
    }
    if (k === "addadmin") {
      const a = admins(); if (!ok(v.u.trim()) || v.p.length < 6) return go("admins", "Username 3-20 characters, password 6+.");
      if (find(a, v.u.trim())) return go("admins", "That username is taken.");
      a.push(await mk(v.u.trim(), v.p)); saveA(a); return go("admins", "Admin added.");
    }
    if (k === "account") {
      const all = admins(), a = find(all, me());
      if (a.h !== await hash(v.cur, a.salt)) return go("account", "Current password is wrong.");
      if (!a.root && v.u.trim() !== a.u) { if (!ok(v.u.trim()) || find(all, v.u.trim())) return go("account", "That username is not available."); a.u = v.u.trim(); sessionStorage.setItem("sb_session", a.u); }
      if (v.p) { if (v.p.length < 6) return go("account", "New password must be 6+ characters."); a.salt = uid() + uid(); a.h = await hash(v.p, a.salt); delete a.mustChange; }
      saveA(all); return go("account", "Account updated.");
    }
  });

  app.addEventListener("input", e => {
    const t = e.target, a = t.dataset.act, s = state.draft; if (!a || !s || t.tagName === "BUTTON") return;
    if (a === "tag") s.tagline = t.value; else if (a === "gr") s.greeting = t.value; else if (a === "hs") s.heroStyle = t.value; else if (a === "fc") s.featuredCount = +t.value; else if (a === "ml") s.menuLayout = t.value; else if (a === "home") s.home[t.dataset.k] = t.checked; else if (a === "spon") (s.specials = s.specials || {}).enabled = t.checked; else if (a === "sptxt") (s.specials = s.specials || {}).items = t.value.split("\n").map(x => x.trim()).filter(Boolean).slice(0, 6); else return;
    draftKey();
    // Show the change where it can be seen: layout -> Menu preview, everything else here -> Home preview.
    const want = a === "ml" ? "menu.html" : a === "spon" || a === "sptxt" ? state.page : "index.html";
    if (state.page !== want) {
      state.page = want; go("look");
      const el = $(`[data-act="${a}"]`); if (el) { el.focus(); if (el.setSelectionRange && el.type !== "checkbox") el.setSelectionRange(el.value.length, el.value.length); }
      return;
    }
    const fr = $("iframe"); if (fr) fr.src = state.page;
  });

  app.addEventListener("change", e => {
    const t = e.target, a = t.dataset.act;
    if (a === "filter") { state.filter = t.value; go("orders"); }
    if (a === "ostatus") { const o = J("sb_orders", []); o.find(x => x.id === t.dataset.id).status = t.value; S("sb_orders", o); go("orders"); }
  });

  app.addEventListener("click", async e => {
    const b = e.target.closest("button[data-act]"); if (!b) return; const a = b.dataset.act, v = b.dataset.v, id = b.dataset.id, u = b.dataset.u;
    if (a === "auth") { state.authTab = v; return render(); }
    if (a === "logout") { sessionStorage.removeItem("sb_session"); sessionStorage.removeItem("sb_preview"); return render(); }
    if (a === "tab") { state.tab = v; if (v === "look") await prepLook(); if (v === "menu") state.edit = null; if (v !== "look") sessionStorage.removeItem("sb_preview"); return go(v); }
    if (a === "odel") { S("sb_orders", J("sb_orders", []).filter(x => x.id !== id)); return go("orders"); }
    if (a === "pedit") { state.edit = id; return go("menu"); }
    if (a === "pcancel") { state.edit = null; return go("menu"); }
    if (a === "pdel") { if (confirm("Delete this item?")) { state.data.products = state.data.products.filter(p => p.id !== id); saveProducts(); } return go("menu"); }
    if (a === "theme") { state.draft.theme = v; draftKey(); return go("look"); }
    if (a === "ppage") { state.page = v; return go("look"); }
    if (a === "lsave") { S("sb_settings", state.draft); return go("look", "Saved on this device. Use the Publish tab to make it live for everyone."); }
    if (a === "lreset") { localStorage.removeItem("sb_settings"); await prepLook(true); return go("look", "Reset to the published settings."); }
    if (a === "aok") { const all = admins(); find(all, u).status = "active"; saveA(all); return go("admins", u + " approved."); }
    if (a === "adel") { if (confirm("Remove " + u + "?")) saveA(admins().filter(x => x.u !== u || x.root)); return go("admins"); }
    if (a === "areset") { const p = prompt("New password for " + u + " (6+ characters):"); if (p && p.length >= 6) { const all = admins(), x = find(all, u); x.salt = uid() + uid(); x.h = await hash(p, x.salt); saveA(all); return go("admins", "Password changed."); } return; }
    if (a === "dl-set") return dl("site-settings.json", JSON.stringify(state.draft || state.data.settings, null, 2));
    if (a === "dl-off") return dl("offline-data.js", OFFLINE_HEAD + "window.SB_OFFLINE = " + JSON.stringify({ business: state.data.biz, settings: state.draft || state.data.settings, products: { categories: state.data.categories, products: state.data.products } }, null, 2) + ";\n", "text/javascript");
    if (a === "dl-prod") return dl("products.json", JSON.stringify({ categories: state.data.categories, products: state.data.products }, null, 2));
    if (a === "dl-ord") { const rows = [["name", "phone", "items", "date", "total", "status"], ...J("sb_orders", []).map(o => [o.name, o.phone, o.items, o.date, o.total, o.status])]; return dl("orders.csv", rows.map(r => r.map(c => '"' + String(c || "").replace(/"/g, '""') + '"').join(",")).join("\n"), "text/csv"); }
    if (a === "discard") { if (confirm("Remove all changes saved on this device (settings and menu)? Orders are kept.")) { ["sb_settings", "sb_products"].forEach(k => localStorage.removeItem(k)); sessionStorage.removeItem("sb_preview"); await init(); return go("publish", "Back to the published version."); } }
  });

  async function prepLook(fresh) {
    if (fresh) SB._p = null;
    state.data = await SB.load(); const s = state.data.settings;
    state.draft = JSON.parse(JSON.stringify(s)); draftKey();
  }
  async function init() { SB._p = null; sessionStorage.removeItem("sb_preview"); state.data = await SB.load(); state.draft = null; }

  seed().then(init).then(render);
})();
