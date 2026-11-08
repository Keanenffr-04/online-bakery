/* admin.js: admin panel (v10.17: real sign-in with Supabase; orders, menu and settings are saved in the online database).
   Only a confirmed email on the admins list can get in, and the database itself refuses everyone else (supabase/setup.sql). */
(function () {
  const $ = q => document.querySelector(q), app = $("#app"), esc = SB.esc;
  const J = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
  const S = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const uid = () => Math.random().toString(36).slice(2, 9);
  const ok = s => /^\S+@\S+\.\S+$/.test(s);
  let state = { open: { theme: true, msec: true }, tab: "orders", note: "", authTab: "login", edit: null, page: "index.html", draft: null, data: null, user: null, isAdmin: false, orders: [], admins: [] };
  const flash = t => { state.note = t; render(); };
  const HERE = () => location.origin + location.pathname, WEB = () => /^https?:$/.test(location.protocol);

  // ---- Supabase client (library loaded from a CDN, pinned version) ----
  // "Remember me" decides where the sign-in is kept: ticked = this device (localStorage), unticked = until the tab closes (sessionStorage).
  const LIB = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js";
  const loadLib = () => window.supabase ? Promise.resolve() : new Promise((res, rej) => { const s = document.createElement("script"); s.src = LIB; s.onload = res; s.onerror = () => rej(new Error("lib")); document.head.appendChild(s); });
  const store = { getItem: k => { const a = sessionStorage.getItem(k); return a != null ? a : localStorage.getItem(k); }, setItem: (k, v) => (localStorage.getItem("sb_keep") === "1" ? localStorage : sessionStorage).setItem(k, v), removeItem: k => { sessionStorage.removeItem(k); localStorage.removeItem(k); } };
  let sb = null;
  async function boot() {
    const c = (state.data.biz || {}).supabase;
    if (!c || !c.url || !c.key) { state.noDb = "The online database is not set up in config/business.json."; return; }
    try { await loadLib(); } catch (e) { state.noDb = "Could not load the sign-in library. Check your internet connection and reload."; return; }
    sb = window.supabase.createClient(c.url, c.key, { auth: { storage: store, persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
    sb.auth.onAuthStateChange((ev, s) => { if (ev === "PASSWORD_RECOVERY") { state.authTab = "newpw"; state.recovering = true; render(); } });   // came from the reset-password email
    await refreshUser();
  }
  async function refreshUser() {
    const { data } = await sb.auth.getSession(); state.user = (data.session && data.session.user) || null; state.isAdmin = false; state.setupErr = false;
    if (state.user) { const r = await sb.rpc("is_admin"); if (r.error) state.setupErr = true; state.isAdmin = r.data === true; }
  }
  async function loadAdminData() {
    if (!state.isAdmin) return;
    const [o, a] = await Promise.all([sb.from("orders").select("*").order("created_at", { ascending: false }).limit(1000), sb.from("admins").select("*").order("added_at")]);
    state.orders = o.data || []; state.admins = a.data || []; if (o.error || a.error) state.note = "Could not load from the online database: " + ((o.error || a.error).message || "unknown error");
  }
  // First time ever: copy the menu and settings from the project files into the database so nothing is lost.
  async function seedDb() {
    if (!SB.dbOK) return; const rows = [];
    if (!SB.dbRows.products) rows.push({ key: "products", value: { categories: state.data.categories, products: state.data.products } });
    if (!SB.dbRows.settings) rows.push({ key: "settings", value: state.data.published.settings });
    if (!rows.length) return; const r = await sb.from("site_data").upsert(rows); if (!r.error) { SB._p = null; SB.dbRows = {}; state.data = await SB.load(); }
  }
  const dbSave = async (key, value) => { const r = await sb.from("site_data").upsert({ key, value, updated_at: new Date().toISOString() }); if (r.error) { alert("Could not save online: " + r.error.message); return false; } return true; };
  async function enter() {
    await refreshUser();
    if (state.user && !state.isAdmin) { const who = state.user.email; await sb.auth.signOut(); state.user = null; return flash(state.setupErr ? "The online database is not set up yet (run supabase/setup.sql, see the roadmap)." : who + " is not on the admin list. Ask an existing admin to add that email.") }
    if (state.isAdmin) { await seedDb(); await loadAdminData(); }
    render();
  }

  async function login(email, p, remember) {
    localStorage.setItem("sb_keep", remember ? "1" : "0"); if (remember) localStorage.setItem("sb_admin_u", email); else localStorage.removeItem("sb_admin_u");
    const { error } = await sb.auth.signInWithPassword({ email, password: p });
    if (error) return flash(/confirm/i.test(error.message) ? "Please confirm your email first (check your inbox, then log in)." : "Wrong email or password.");
    state.note = ""; await enter();
  }
  async function signup(email, p) {
    if (!ok(email)) return flash("Type a valid email address."); if (p.length < 6) return flash("Password must be at least 6 characters.");
    localStorage.setItem("sb_keep", "0");
    const { error } = await sb.auth.signUp({ email, password: p, options: { emailRedirectTo: HERE() } });
    state.authTab = "login"; flash(error ? "Could not create the login: " + error.message : "Check your email and click the confirm link, then log in here. (Only emails on the admin list can enter.)");
  }
  async function google(remember) {
    localStorage.setItem("sb_keep", remember ? "1" : "0");
    const { error } = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: HERE() } }); if (error) flash("Google sign-in is not switched on yet: " + error.message);
  }
  async function requestReset(email) {
    if (ok(email)) await sb.auth.resetPasswordForEmail(email, { redirectTo: HERE() });
    state.authTab = "login"; flash("If that email has a login, a reset link is on its way. Open it on this device.");   // same answer either way
  }
  async function newPassword(p) {
    if (p.length < 6) return flash("New password must be at least 6 characters.");
    const { error } = await sb.auth.updateUser({ password: p }); if (error) return flash("Could not change it: " + error.message);
    state.authTab = "login"; state.recovering = false; history.replaceState(null, "", location.pathname); await enter();
  }
  function recoverView() {
    const f = state.authTab === "forgot";
    return `<div class="adm-card adm-login"><h1>${f ? "Forgot password" : "Choose a new password"}</h1>
    <p class="muted">${f ? "Type your email. We send you a link to choose a new password." : "Type the new password you want to use."}</p>
    ${state.note ? `<div class="msg">${esc(state.note)}</div>` : ""}
    <form data-form="${f ? "forgot" : "newpw"}">${f ? `<label>Email</label><input name="u" type="email" autocomplete="email" value="${esc(localStorage.getItem("sb_admin_u") || "")}" required>` : `<label>New password</label><input name="p" type="password" autocomplete="new-password" minlength="6" required>`}
    <p style="margin-top:1rem"><button class="btn" type="submit">${f ? "Send me the link" : "Save new password"}</button></p></form>
    ${f ? `<p class="muted"><button type="button" class="linkbtn" data-act="auth" data-v="login">Back to log in</button></p>` : ""}</div>`;
  }

  // Only admins use this page. There is no public link to it and no public sign-up: a person can only get in if their confirmed
  // email is on the admins list in the database (the database itself enforces this, not just this page).
  function authView() {
    if (state.noDb) return `<div class="adm-card adm-login"><h1>Admin login</h1><div class="msg msg--warn">${esc(state.noDb)}</div><p class="muted"><a href="index.html">Back to the website</a></p></div>`;
    if (!sb) return `<div class="adm-card adm-login"><h1>Admin login</h1><p class="muted">Loading...</p></div>`;
    if (state.authTab === "forgot" || state.authTab === "newpw") return recoverView();
    const first = state.authTab === "first", em = esc(localStorage.getItem("sb_admin_u") || "");
    return `<div class="adm-card adm-login"><h1>${first ? "Create my login" : "Admin login"}</h1><p class="muted">${first ? "First time? Use the email that is on the admin list, choose a password, then confirm the email we send you." : "For the bakery team only."}</p>
    ${state.note ? `<div class="msg">${esc(state.note)}</div>` : ""}
    <form data-form="${first ? "signup" : "login"}"><label>Email</label><input name="u" type="email" autocomplete="email" value="${em}" required>
    <label>Password</label><input name="p" type="password" autocomplete="${first ? "new-password" : "current-password"}" ${first ? 'minlength="6"' : ""} required>
    ${first ? "" : `<label class="chk"><input type="checkbox" name="remember" ${em ? "checked" : ""}><span>Remember me on this device <span class="muted">(stay signed in)</span></span></label>`}
    <p style="margin-top:1rem"><button class="btn" type="submit">${first ? "Create my login" : "Log in"}</button></p></form>
    ${first ? "" : (WEB() ? `<p><button type="button" class="btn btn--ghost btn--block" data-act="google">Sign in with Google</button></p>` : `<p class="muted">Sign in with Google works once the site is online (https).</p>`)}
    <p class="muted">${first ? '<button type="button" class="linkbtn" data-act="auth" data-v="login">I already have a login</button>' : '<button type="button" class="linkbtn" data-act="auth" data-v="forgot">Forgot your password?</button> &middot; <button type="button" class="linkbtn" data-act="auth" data-v="first">First time here?</button>'}</p>
    <p class="muted"><a href="index.html">Back to the website</a></p></div>`;
  }

  /* ---------- tabs ---------- */
  const TABS = [["orders", "Orders"], ["menu", "Menu items"], ["look", "Theme & layout"], ["admins", "Admins"], ["account", "My account"], ["publish", "Backup & files"]];

  function orders() {
    const o = state.orders || [], f = state.filter || "pending", list = o.filter(x => f === "all" || x.status === f);
    const st = ["pending", "confirmed", "ready", "completed", "cancelled"];
    return `<div class="adm-split"><div class="adm-card"><h2>Add an order</h2>
    <form data-form="order"><label>Customer</label><input name="name" required>${SB.phoneField("o-phone", { label: "Phone" })}
    <label>What they ordered</label><textarea name="items" required></textarea><div class="adm-row"><div><label>Needed on</label><input name="date" type="date"></div><div><label>Total (R)</label><input name="total" type="number" min="0"></div></div>
    <p><button class="btn btn--sm" type="submit">Save order</button></p></form></div>
    <div class="adm-card"><div class="adm-top"><h2>${list.length} ${f === "all" ? "" : f} order${list.length === 1 ? "" : "s"}</h2>
    <select data-act="filter" style="width:auto">${["all", ...st].map(s => `<option ${s === f ? "selected" : ""}>${s}</option>`).join("")}</select></div>
    <ul class="adm-list">${list.map(x => `<li><div><strong>${esc(x.name)}</strong> <span class="tag">${x.status}</span><br><span class="muted">${esc(x.items)}${x.date ? " &middot; for " + esc(x.date) : ""}${x.source && x.source !== "admin" ? " &middot; from the website (" + (x.source === "cart" ? "cart" : "custom order") + ")" : ""}${x.total ? " &middot; R " + esc(x.total) : ""}</span></div>
    <div class="adm-actions"><select data-act="ostatus" data-id="${x.id}" style="width:auto">${st.map(s => `<option ${s === x.status ? "selected" : ""}>${s}</option>`).join("")}</select>
    ${x.phone ? `<a class="btn btn--sm btn--whatsapp" target="_blank" rel="noopener" href="https://wa.me/${esc(x.phone.replace(/\D/g, ""))}">WhatsApp</a>` : ""}
    <button class="btn btn--sm btn--ghost" data-act="odel" data-id="${x.id}">Delete</button></div></li>`).join("") || "<li>No orders here.</li>"}</ul></div></div>
    <p class="muted">Orders sent from the Cart or the Custom Order form are saved here automatically (the WhatsApp message still goes to you too). You can also add one by hand. They are stored online, so you see the same list on every device.</p>`;
  }

  function menu() {
    const d = state.data, e = d.products.find(p => p.id === state.edit) || { visible: true, category: d.categories[0]?.id, emoji: "🍰" }, cat = id => (d.categories.find(c => c.id === id) || {}).name || "";
    return `<div class="adm-split"><div class="adm-card adm-form"><h2>${state.edit ? "Edit item" : "Add item"}</h2>
    <form data-form="product"><label>Name</label><input name="name" value="${esc(e.name)}" required>
    <div class="adm-row"><div><label>Section</label><select name="category">${d.categories.map(c => `<option value="${c.id}" ${c.id === e.category ? "selected" : ""}>${esc(c.name)}${c.hidden ? " (hidden)" : ""}</option>`).join("")}</select></div>
    <div><label>Price (R)</label><input name="price" type="number" min="0" value="${esc(e.price)}" required></div></div>
    <div class="adm-row"><div><label>Emoji</label><input name="emoji" value="${esc(e.emoji)}"></div><div></div></div>
    <label>Description</label><textarea name="description">${esc(e.description)}</textarea>
    <fieldset class="adm-fs"><legend>Dietary tags <span class="muted">(only tick what is definitely true)</span></legend><div class="adm-tags">${SB.TAGS.map(([id, n]) => `<label class="chk"><input type="checkbox" name="tag_${id}" ${(e.tags || []).includes(id) ? "checked" : ""}>${n}</label>`).join("")}</div></fieldset>
    <fieldset class="adm-fs"><legend>Where it shows</legend>
    <label class="chk"><input type="checkbox" name="visible" ${e.visible !== false ? "checked" : ""}>Visible on the menu</label>
    <label class="chk"><input type="checkbox" name="featured" ${e.featured ? "checked" : ""}>Home page: Our best sellers</label>
    <label class="chk"><input type="checkbox" name="popular" ${e.popular ? "checked" : ""}>Home page: Most popular</label></fieldset>
    <p><button class="btn btn--sm" type="submit">Save</button> ${state.edit ? '<button class="btn btn--sm btn--ghost" type="button" data-act="pcancel">Cancel</button>' : ""}</p></form></div>
    <div>${sec("msec", "Menu sections", d.categories.length + (d.categories.length === 1 ? " section" : " sections"), `<p class="muted">The groups on your Menu page. The order here is the order customers see (Menu page buttons, the menu in the header and the Home "Shop by treat" tiles). Hiding a section hides its items too. Changes reach customers after you Publish.</p>
    <ul class="adm-list">${d.categories.map((c, i) => { const n = d.products.filter(p => p.category === c.id).length; return `<li class="item sec-row"><form class="csec" data-form="csec" data-id="${esc(c.id)}"><input name="icon" value="${esc(c.icon || "")}" maxlength="4" aria-label="Emoji for ${esc(c.name)}"><input name="name" value="${esc(c.name)}" required maxlength="40" aria-label="Section name"><button class="btn btn--sm btn--ghost" type="submit">Save</button></form>
    <div class="item__tags"><span class="tag">${n} ${n === 1 ? "item" : "items"}</span>${c.hidden ? '<span class="tag">hidden</span>' : ""}</div>
    <div class="adm-actions"><button class="btn btn--sm btn--ghost" data-act="cup" data-id="${esc(c.id)}" aria-label="Move ${esc(c.name)} up" ${i === 0 ? "disabled" : ""}>&uarr;</button><button class="btn btn--sm btn--ghost" data-act="cdown" data-id="${esc(c.id)}" aria-label="Move ${esc(c.name)} down" ${i === d.categories.length - 1 ? "disabled" : ""}>&darr;</button><button class="btn btn--sm btn--ghost" data-act="chide" data-id="${esc(c.id)}" aria-pressed="${!!c.hidden}">${c.hidden ? "Show" : "Hide"}</button><button class="btn btn--sm btn--ghost" data-act="cdel" data-id="${esc(c.id)}" ${n ? 'disabled title="Move or delete its items first"' : ""}>Delete</button></div></li>`; }).join("") || "<li>No sections yet. Add one below, then you can add items.</li>"}</ul>
    <form class="sec-add" data-form="csecnew"><label for="csec-new-name">Add a section</label><div class="csec"><input name="icon" placeholder="🍪" maxlength="4" aria-label="Emoji for the new section"><input id="csec-new-name" name="name" placeholder="e.g. Cookies" required maxlength="40"><button class="btn btn--sm" type="submit">Add</button></div></form>`)}
    ${sec("mitems", "Menu items", d.products.length + (d.products.length === 1 ? " item" : " items"), `<p class="muted">"Sold out today" greys an item out for customers and switches itself off at midnight. Like every change here it reaches customers after you Publish.</p>
    <ul class="adm-list">${d.products.map(p => { const so = SB.isSoldOut(p); return `<li class="item"><div class="item__main"><span class="item__e" aria-hidden="true">${esc(p.emoji)}</span><div><strong>${esc(p.name)}</strong> <span class="muted">R ${esc(p.price)} &middot; ${esc(cat(p.category))}</span>
    <div class="item__tags">${SB.isNew(p) ? '<span class="tag">new</span>' : ""}${p.featured ? '<span class="tag">home</span>' : ""}${p.popular ? '<span class="tag">popular</span>' : ""}${so ? '<span class="tag tag--sold">sold out today</span>' : ""}${p.visible === false ? '<span class="tag">hidden</span>' : ""}${(p.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div></div></div>
    <div class="adm-actions"><button class="btn btn--sm ${so ? "" : "btn--ghost"}" data-act="psold" data-id="${p.id}" aria-pressed="${so}">${so ? "Back in stock" : "Sold out today"}</button><button class="btn btn--sm btn--ghost" data-act="pedit" data-id="${p.id}">Edit</button><button class="btn btn--sm btn--ghost" data-act="pdel" data-id="${p.id}">Delete</button></div></li>`; }).join("")}</ul>`)}</div></div>`;
  }

  const OFFLINE_HEAD = "/* offline-data.js: a COPY of config/business.json, config/site-settings.json and src/data/products.json.\n   Only used when the site is opened straight from disk (file://, e.g. preview.html), because browsers block\n   fetch() of local files. The live/hosted site ignores this file and reads the real JSON files.\n   KEEP IN SYNC: whenever one of those three files changes, regenerate this file (see docs/AI_HANDOFF.md). */\n";
  const draftKey = () => sessionStorage.setItem("sb_preview", JSON.stringify({ peek: state.peek || null, settings: state.peek ? { ...state.draft, theme: state.peek } : state.draft }));
  // v10.11: Theme & layout is split into five tidy sections (click a heading to open / close it). Every theme is in ONE dropdown,
  // grouped "Everyday themes" and "Special occasions", and each special one also says "(special)" so you can tell when it is closed.
  const sec = (id, title, hint, body) => `<details class="adm-sec" data-sec="${id}" ${state.open[id] ? "open" : ""}><summary><span class="adm-sec__t">${title}</span><span class="adm-sec__h">${hint}</span></summary><div class="adm-sec__b">${body}</div></details>`;
  const isSpecial = id => SB.OCCASION_THEMES.some(t => t[0] === id);
  const countSel = (act, cur) => `<select data-act="${act}">${[1, 2, 3, 4, 5, 6].map(n => `<option ${n == cur ? "selected" : ""}>${n}</option>`).join("")}</select>`;
  function themeBox(s) {
    return `<label for="theme-pick">Everyday theme</label>
    <select id="theme-pick" data-act="theme"><optgroup label="Everyday themes">${SB.THEMES.map(([id, n]) => `<option value="${id}" ${s.theme === id ? "selected" : ""}>${esc(n)}</option>`).join("")}</optgroup>
    <optgroup label="Special occasions (moving decorations)">${SB.OCCASION_THEMES.map(([id, n]) => `<option value="${id}" ${s.theme === id ? "selected" : ""}>${esc(n)} (special)</option>`).join("")}</optgroup></select>
    <p class="muted">${isSpecial(s.theme) ? "This is a special-occasion theme, so it has moving decorations." : "This is an everyday theme, calm with no moving decorations."} Picking a theme only previews it until you save.</p>
    <label class="chk"><input type="checkbox" data-act="deco" ${s.decorations !== false ? "checked" : ""}>Moving decorations (special-occasion themes only)</label>
    <div class="deco-demo" id="deco-demo" data-theme="${esc(state.peek || s.theme)}" aria-live="polite"></div>`;
  }
  function look() {
    const s = state.draft, pg = (v, n) => `<button class="btn btn--sm ${state.page === v ? "" : "btn--ghost"}" data-act="ppage" data-v="${v}">${n}</button>`;
    const homeBox = `${[["hero", "Hero"], ["shop", "Shop by treat (section tiles)"], ["featured", "Featured items"], ["fresh", "New and popular"], ["meet", "Meet Becca"], ["steps", "How ordering works"], ["cta", "Order banner"]].map(([k, n]) => `<label class="chk"><input type="checkbox" data-act="home" data-k="${k}" ${s.home[k] !== false ? "checked" : ""}>${n}</label>`).join("")}
    <div class="adm-row"><div><label>Best sellers shown</label>${countSel("fc", s.featuredCount)}</div><div><label>"Just added" shown</label>${countSel("rc", s.recentCount || 3)}</div><div><label>"Most popular" shown</label>${countSel("pc", s.popularCount || 3)}</div><div><label>"New" badge stays for</label><select data-act="nd">${[[0, "Off"], [7, "1 week"], [14, "2 weeks"], [28, "4 weeks"]].map(([n, l]) => `<option value="${n}" ${n === (s.newDays == null ? 14 : s.newDays) ? "selected" : ""}>${l}</option>`).join("")}</select></div>
    <div><label>Card style</label><select data-act="fs"><option value="glass" ${s.featuredStyle !== "plain" ? "selected" : ""}>Glass (frosted)</option><option value="plain" ${s.featuredStyle === "plain" ? "selected" : ""}>Plain</option></select></div></div>
    <p class="muted">Best sellers are items ticked "Show on home page"; Most popular are items ticked "Show in Most popular".</p>
    <div class="adm-row"><div><label>Hero style</label><select data-act="hs"><option value="logo" ${s.heroStyle !== "bakes" ? "selected" : ""}>Logo (rabbit)</option><option value="bakes" ${s.heroStyle === "bakes" ? "selected" : ""}>Baked goods + greeting</option></select></div>
    <div><label>Greeting (baked goods hero)</label><input data-act="gr" maxlength="80" value="${esc(s.greeting)}"></div></div>
    <label>Hero text</label><textarea data-act="tag">${esc(s.tagline)}</textarea>
    <p class="adm-sub">Meet Becca (about you, on the Home page)</p>
    <label>Heading</label><input data-act="mh" maxlength="40" value="${esc((s.meet || {}).heading || "Meet Becca")}">
    <label>Your story <span class="muted">(a few sentences; a blank line starts a new paragraph)</span></label><textarea data-act="mt" maxlength="700" rows="5">${esc((s.meet || {}).text || "")}</textarea>
    <p class="muted">${(s.meet || {}).draft ? "This is placeholder text: the site shows a small \"Draft text\" tag until you change it." : "Clear the box to hide the section."}</p>`;
    const stripBox = `<label class="chk"><input type="checkbox" data-act="spon" ${s.specials && s.specials.enabled === false ? "" : "checked"}><strong>Top strip</strong>&nbsp;(specials, scrolls at the top of every page)</label>
    <label>Specials (one per line, up to 6)</label><textarea data-act="sptxt" maxlength="500" placeholder="e.g. Cupcake boxes: buy 2, get 1 free this week">${esc(((s.specials || {}).items || []).join("\n"))}</textarea>
    <label class="chk" style="margin-top:1rem"><input type="checkbox" data-act="oron" ${s.orders && s.orders.enabled === false ? "" : "checked"}><strong>Bottom strip</strong>&nbsp;(orders, scrolls at the bottom of every page)</label>
    <label>Order messages (one per line, up to 6)</label><textarea data-act="ortxt" maxlength="500" placeholder="e.g. Orders need 3 days notice">${esc(((s.orders || {}).items || []).join("\n"))}</textarea>`;
    const menuBox = `<label>Menu layout</label><select data-act="ml"><option value="grid" ${s.menuLayout === "grid" ? "selected" : ""}>Grid</option><option value="list" ${s.menuLayout === "list" ? "selected" : ""}>List</option></select>`;
    return `<div class="adm-split"><div class="adm-side">
    ${sec("theme", "Theme", themeName(s.theme), themeBox(s))}
    ${sec("seasons", "Automatic seasons", (s.autoTheme || {}).enabled === false ? "off" : "on", seasonsBox(s))}
    ${sec("home", "Home page", "what shows and how many", homeBox)}
    ${sec("strips", "Top and bottom strips", "specials and order messages", stripBox)}
    ${sec("menu", "Menu page", s.menuLayout === "list" ? "list" : "grid", menuBox)}
    <div class="adm-save"><button class="btn btn--sm" data-act="lsave">Save to this device</button> <button class="btn btn--sm btn--ghost" data-act="lreset">Reset</button><span class="muted">Then use Publish to make it live.</span></div></div>
    <div class="adm-preview"><div class="adm-tabs">${pg("index.html", "Home")}${pg("menu.html", "Menu")}</div>
    <iframe title="Live preview" src="${state.page}"></iframe></div></div>`;
  }

  // v10.8: the little live preview of the moving decorations. It redraws straight away when the theme is clicked or the tick box changes
  // (no reload, no waiting for the page preview). Same code and same movement as the real site (js/decor.js).
  function drawDemo() {
    const box = $("#deco-demo"), s = state.draft; if (!box || !s) return;
    const th = state.peek || s.theme, name = (SB.THEMES.concat(SB.OCCASION_THEMES).find(t => t[0] === th) || [0, th])[1];
    box.dataset.theme = th;
    const on = window.SBDecor && SBDecor.has(th) && s.decorations !== false;
    const msg = !window.SBDecor ? "" : !SBDecor.has(th) ? "This theme has no decorations. Pick one under Special occasions." : s.decorations === false ? "Decorations are switched off, so visitors will see none." : "";
    box.innerHTML = `${on ? `<div class="deco deco--demo" aria-hidden="true">${SBDecor.html(th, { scale: 0.55 })}</div>` : ""}<div class="deco-demo__label"><strong>${esc(name)}</strong><span>${esc(msg || "Live preview of the moving decorations")}</span></div>`;
  }

  // v10.9: Automatic seasons. The buttons above set the EVERYDAY theme (used outside every season); a season's theme switches on by date.
  // "Preview" shows a season's theme in the preview without changing anything that gets saved.
  const themeName = id => (SB.THEMES.concat(SB.OCCASION_THEMES).find(t => t[0] === id) || [0, id])[1];
  const ddmm = md => { const [m, d] = md.split("-"); return d + "/" + m; };
  const MONTHS = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const seasonLabel = (r, yr) => `${themeName(r.theme)}: ${SB.seasonText(r, yr)}${r.on === false ? " (off)" : ""}`;
  // One section for every season: a dropdown lists them all with their dates, and the editor below changes just the one picked.
  function seasonsBox(s) {
    const au = s.autoTheme || (s.autoTheme = { enabled: true, rules: JSON.parse(JSON.stringify(SB.SEASON_RULES)) }), yr = new Date().getFullYear();
    if (!(state.seasonSel >= 0 && state.seasonSel < au.rules.length)) state.seasonSel = 0;
    return `<label class="chk"><input type="checkbox" data-act="auto" ${au.enabled !== false ? "checked" : ""}>Change the theme automatically for each season</label>
    <p class="muted" id="season-status" aria-live="polite"></p>
    <label for="season-pick">Season to change <span class="muted">(all seasons and their dates this year)</span></label>
    <select id="season-pick" data-act="ssel">${au.rules.map((r, i) => `<option value="${i}" ${i === state.seasonSel ? "selected" : ""}>${esc(seasonLabel(r, yr))}</option>`).join("")}</select>
    <div class="season-card" id="season-editor"></div>
    <label>Try a date <span class="muted">(see which theme the site would show)</span><input type="date" data-act="sdate" id="season-date"></label>
    <p class="muted" id="season-try" aria-live="polite"></p>
    <p class="muted">Outside every season the site uses your everyday theme (the one picked in the buttons above). Dates use the visitor's own calendar.</p>`;
  }
  // The editor for the season picked in the dropdown above.
  function drawSeasonEditor() {
    const box = $("#season-editor"), s = state.draft; if (!box || !s || !s.autoTheme) return;
    const r = s.autoTheme.rules[state.seasonSel || 0], yr = new Date().getFullYear(), i = state.seasonSel || 0, nm = esc(themeName(r.theme));
    box.innerHTML = `<label class="chk"><input type="checkbox" data-act="son" data-i="${i}" ${r.on !== false ? "checked" : ""}>Use the ${nm} season</label>
    <p class="muted" id="season-dates">${esc(SB.seasonText(r, yr))} this year</p>
    <div class="season-edit">${r.type === "range"
      ? `<label>From <input data-act="sfrom" data-i="${i}" value="${ddmm(r.from)}" size="5" maxlength="5" inputmode="numeric" aria-label="${nm} starts (day/month)"></label> <label>to <input data-act="sto" data-i="${i}" value="${ddmm(r.to)}" size="5" maxlength="5" inputmode="numeric" aria-label="${nm} ends (day/month)"></label>`
      : `<span class="muted">${r.type === "easter" ? `${r.before == null ? 9 : r.before} days before Easter Sunday to ${r.after == null ? 1 : r.after} day after (worked out each year, nothing to edit)` : `The week up to the ${["first", "second", "third", "fourth"][r.n - 1] || r.n + "th"} Sunday of ${MONTHS[r.month]} (worked out each year, nothing to edit)`}</span>`}
      <button type="button" class="btn btn--sm btn--ghost" data-act="speek" data-v="${esc(r.theme)}">Preview ${nm}</button></div>
    <label>Home greeting during ${nm} <span class="muted">(blank = the suggested one below)</span><input data-act="sgr" data-i="${i}" maxlength="80" value="${esc(r.greeting || "")}" placeholder="${esc(SB.seasonWords({}, r.theme).greeting)}"></label>
    <label>Top strip message during ${nm} <span class="muted">(shown first; blank = suggested)</span><input data-act="ssp" data-i="${i}" maxlength="100" value="${esc(r.special || "")}" placeholder="${esc(SB.seasonWords({}, r.theme).special)}"></label>
    <p class="muted">These replace your normal greeting and add to the top strip only while ${nm} is on. Use Preview ${nm} to see them.</p>`;
  }
  // After a change, refresh the dropdown wording and the dates line without rebuilding the editor (keeps focus while typing).
  function refreshSeasonLabels() {
    const s = state.draft, pick = $("#season-pick"); if (!s || !pick) return;
    const yr = new Date().getFullYear(); s.autoTheme.rules.forEach((r, i) => { if (pick.options[i]) pick.options[i].textContent = seasonLabel(r, yr); });
    const d = $("#season-dates"); if (d) d.textContent = SB.seasonText(s.autoTheme.rules[state.seasonSel || 0], yr) + " this year";
  }
  function drawSeasonStatus() {
    const s = state.draft, st = $("#season-status"); if (!s || !st) return;
    const au = s.autoTheme || {}, now = SB.seasonTheme(au), dt = $("#season-date") && $("#season-date").value;
    st.textContent = (state.peek ? `Previewing ${themeName(state.peek)} (not saved). Click a theme button above to go back. ` : "") + (au.enabled === false ? `Automatic seasons are off, so the site always shows ${themeName(s.theme)}.` : now ? `Today the site shows ${themeName(now)} (a season is on). Your everyday theme is ${themeName(s.theme)}.` : `No season is on today, so the site shows your everyday theme: ${themeName(s.theme)}.`);
    const tr = $("#season-try");
    if (tr) { const d = dt ? new Date(dt + "T12:00:00") : null; tr.textContent = !d ? "" : au.enabled === false ? "Automatic seasons are off." : `On ${d.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "long", year: "numeric" })} the site shows ${themeName(SB.seasonTheme(au, d) || s.theme)}${SB.seasonTheme(au, d) ? " (season)" : " (everyday theme)"}.`; }
  }

  function adminsView() {
    const a = state.admins, me = (state.user.email || "").toLowerCase();
    return `<div class="adm-split"><div class="adm-card"><h2>Add an admin</h2><form data-form="addadmin"><label>Email</label><input name="u" type="email" required>
    <p><button class="btn btn--sm" type="submit">Add admin</button></p></form><p class="muted">Use the email the person will sign in with (their Google address if they use Google). They then choose <strong>First time here?</strong> on the login page, or use Sign in with Google. Anyone not on this list is refused by the database itself.</p></div>
    <div class="adm-card"><h2>Admins</h2><ul class="adm-list">${a.map(x => `<li><div><strong>${esc(x.email)}</strong> ${x.email.toLowerCase() === me ? '<span class="tag">you</span>' : ""}</div>
    <div class="adm-actions">${x.email.toLowerCase() === me ? "" : `<button class="btn btn--sm btn--ghost" data-act="adel" data-u="${esc(x.email)}">Remove</button>`}</div></li>`).join("") || "<li>No admins found.</li>"}</ul></div></div>`;
  }

  function account() {
    return `<div class="adm-card" style="max-width:460px"><h2>My account</h2><p>Signed in as <strong>${esc(state.user.email)}</strong></p><form data-form="account">
    <label>New password</label><input name="p" type="password" autocomplete="new-password" minlength="6" required>
    <p><button class="btn btn--sm" type="submit">Change password</button></p></form><p class="muted">Signed in with Google? Then there is no password to change here.</p></div>`;
  }

  function publish() {
    return `<div class="adm-card"><h2>Backup</h2>
    <p>Menu and settings are saved online as soon as you press Save, so there is nothing to publish any more. The free Supabase plan has no automatic backups, so download one now and then (it holds the menu, settings, orders and admin list).</p>
    <p><button class="btn btn--sm" data-act="dl-backup">Download a backup (JSON)</button> <button class="btn btn--sm btn--ghost" data-act="dl-ord">Download orders (CSV)</button></p></div>
    <div class="adm-card"><h2>Project files (advanced)</h2><p class="muted">Only needed to keep the project folder and the double-click <code>preview.html</code> in step with the online copy.</p>
    <p><button class="btn btn--sm btn--ghost" data-act="dl-set">Download site-settings.json</button> <button class="btn btn--sm btn--ghost" data-act="dl-prod">Download products.json</button> <button class="btn btn--sm btn--ghost" data-act="dl-off">Download offline-data.js</button></p></div>`;
  }

  function dash() {
    const body = { orders, menu, look, admins: adminsView, account, publish }[state.tab]();
    const dbw = SB.dbOK ? "" : `<div class="msg msg--warn">The online database is not answering (has <code>supabase/setup.sql</code> been run?). Changes cannot be saved until it is.</div>`;
    return `<div class="adm-top"><h1>Admin</h1><div class="adm-actions"><span class="muted">Hi, ${esc(state.user.email)}</span><a class="btn btn--sm btn--ghost" href="index.html">View site</a><button class="btn btn--sm" data-act="logout">Log out</button></div></div>
    <nav class="adm-nav" aria-label="Admin sections">${TABS.map(([k, n]) => `<button class="${state.tab === k ? "is-on" : ""}" ${state.tab === k ? 'aria-current="page"' : ""} data-act="tab" data-v="${k}">${n}</button>`).join("")}</nav>
    ${dbw}${state.note ? `<div class="msg">${esc(state.note)}</div>` : ""}${body}`;
  }

  function render() { app.innerHTML = state.isAdmin && !state.recovering ? dash() : authView(); state.note = ""; }
    const go = (t, note) => { state.tab = t; state.note = note || ""; app.innerHTML = dash(); state.note = ""; if (t === "look") { drawDemo(); drawSeasonEditor(); drawSeasonStatus(); } };
  const dl = (name, text, type) => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: type || "application/json" })); a.download = name; a.click(); };
  const saveProducts = () => dbSave("products", { categories: state.data.categories, products: state.data.products });   // v10.17: saved online, live for everyone at once

  /* ---------- events ---------- */
  app.addEventListener("submit", async e => {
    e.preventDefault(); const f = e.target, v = Object.fromEntries(new FormData(f)), k = f.dataset.form;
    if (k === "login") return login(v.u.trim(), v.p, !!v.remember);
    if (k === "signup") return signup(v.u.trim(), v.p);
    if (k === "forgot") return requestReset(v.u.trim());
    if (k === "newpw") return newPassword(v.p);
    if (k === "order") {
      const ph = SB.phoneRead("o-phone"); if (ph.error) return go("orders", ph.error);
      const r = await sb.from("orders").insert({ source: "admin", status: "pending", name: v.name, items: v.items, date: v.date || null, total: v.total === "" ? null : Number(v.total), phone: ph.digits || "" });
      if (r.error) return go("orders", "Could not save: " + r.error.message); await loadAdminData(); return go("orders", "Order saved."); }
    if (k === "csec") {   // v10.15: rename / change emoji (the id never changes, so links and items keep working)
      const c = state.data.categories.find(x => x.id === f.dataset.id), nm = (v.name || "").trim(); if (!c || !nm) return go("menu", "A section needs a name.");
      c.name = nm; c.icon = (v.icon || "").trim(); await saveProducts(); return go("menu", "Section saved.");
    }
    if (k === "csecnew") {
      const nm = (v.name || "").trim(); if (!nm) return go("menu", "Give the new section a name.");
      const L = state.data.categories; if (L.some(c => c.name.toLowerCase() === nm.toLowerCase())) return go("menu", "You already have a section called " + nm + ".");
      const base = nm.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "section"; let id = base, n = 2; while (L.some(c => c.id === id)) id = base + "-" + n++;
      L.push({ id, name: nm, icon: (v.icon || "").trim() || "🍰" }); await saveProducts(); return go("menu", nm + " added. It shows on the Menu once it has an item.");
    }
    if (k === "product") {
      if (!v.category) return go("menu", "Add a menu section first, then you can add items.");
      const p = { ...v, price: Number(v.price), featured: !!v.featured, popular: !!v.popular, visible: !!v.visible, tags: SB.TAGS.map(t => t[0]).filter(id => v["tag_" + id]) }, L = state.data.products;
      SB.TAGS.forEach(t => delete p["tag_" + t[0]]);
      if (state.edit) Object.assign(L.find(x => x.id === state.edit), p); else L.push({ id: "p" + uid(), ...p, added: SB.today() });   // v10.9: the date decides "Just added"
      state.edit = null; await saveProducts(); return go("menu", "Menu saved.");
    }
    if (k === "addadmin") {
      const em = v.u.trim().toLowerCase(); if (!ok(em)) return go("admins", "Type a valid email address.");
      const r = await sb.from("admins").insert({ email: em }); if (r.error) return go("admins", r.error.code === "23505" ? "That email is already an admin." : "Could not add: " + r.error.message);
      await loadAdminData(); return go("admins", em + " added. They can now create their login or use Google.");
    }
    if (k === "account") {
      if (v.p.length < 6) return go("account", "New password must be 6+ characters.");
      const r = await sb.auth.updateUser({ password: v.p }); return go("account", r.error ? "Could not change it: " + r.error.message : "Password changed.");
    }
  });

  app.addEventListener("input", e => {
    const t = e.target, a = t.dataset.act, s = state.draft; if (!a || !s || t.tagName === "BUTTON") return;
    if (a === "theme") { s.theme = t.value; state.peek = null; draftKey(); go("look"); const el = $("#theme-pick"); if (el) el.focus(); return; }   // v10.11: themes dropdown
    if (a === "ssel") { state.seasonSel = +t.value; drawSeasonEditor(); return; }
    if (a === "sgr" || a === "ssp") { const r = (s.autoTheme.rules || [])[+t.dataset.i]; if (r) { r[a === "sgr" ? "greeting" : "special"] = t.value; if (!t.value.trim()) delete r[a === "sgr" ? "greeting" : "special"]; } draftKey(); return; }   // v10.13
    if (["auto", "son", "sfrom", "sto", "sdate"].includes(a)) {
      const au = s.autoTheme || (s.autoTheme = { enabled: true, rules: JSON.parse(JSON.stringify(SB.SEASON_RULES)) }), r = au.rules[+t.dataset.i];
      if (a === "auto") au.enabled = t.checked;
      else if (a === "son") r.on = t.checked;
      else if (a === "sfrom" || a === "sto") {
        const m = /^\s*(\d{1,2})\s*[\/.\-]\s*(\d{1,2})\s*$/.exec(t.value), dd = m && +m[1], mm = m && +m[2], ok = m && mm >= 1 && mm <= 12 && dd >= 1 && new Date(2024, mm - 1, dd).getMonth() === mm - 1;   // 2024 = leap year, so 29/02 is allowed
        t.setAttribute("aria-invalid", ok ? "false" : "true");
        if (ok) r[a === "sfrom" ? "from" : "to"] = String(mm).padStart(2, "0") + "-" + String(dd).padStart(2, "0");
      }
      draftKey(); refreshSeasonLabels(); return drawSeasonStatus();
    }
    if (a === "mh") (s.meet = s.meet || {}).heading = t.value; else if (a === "mt") { s.meet = s.meet || {}; s.meet.text = t.value; s.meet.draft = false; }   // v10.13: editing the story removes the placeholder "Draft text" tag
    else if (a === "tag") s.tagline = t.value; else if (a === "gr") s.greeting = t.value; else if (a === "hs") s.heroStyle = t.value; else if (a === "fc") s.featuredCount = +t.value; else if (a === "fs") s.featuredStyle = t.value; else if (a === "rc") s.recentCount = +t.value; else if (a === "pc") s.popularCount = +t.value; else if (a === "nd") s.newDays = +t.value; else if (a === "deco") s.decorations = t.checked; else if (a === "ml") s.menuLayout = t.value; else if (a === "home") s.home[t.dataset.k] = t.checked; else if (a === "spon") (s.specials = s.specials || {}).enabled = t.checked; else if (a === "oron") (s.orders = s.orders || {}).enabled = t.checked; else if (a === "ortxt") (s.orders = s.orders || {}).items = t.value.split("\n").map(x => x.trim()).filter(Boolean).slice(0, 6); else if (a === "sptxt") (s.specials = s.specials || {}).items = t.value.split("\n").map(x => x.trim()).filter(Boolean).slice(0, 6); else return;
    draftKey();
    if (a === "deco") drawDemo();   // tick box: redraw the little preview at once
    // Show the change where it can be seen: layout -> Menu preview, everything else here -> Home preview.
    const want = a === "ml" ? "menu.html" : a === "spon" || a === "sptxt" || a === "oron" || a === "ortxt" ? state.page : "index.html";
    if (state.page !== want) {
      state.page = want; go("look");
      const el = $(`[data-act="${a}"]`); if (el) { el.focus(); if (el.setSelectionRange && el.type !== "checkbox") el.setSelectionRange(el.value.length, el.value.length); }
      return;
    }
    const fr = $("iframe"); if (fr) fr.src = state.page;
  });

  app.addEventListener("toggle", e => { const d = e.target; if (d.dataset && d.dataset.sec) state.open[d.dataset.sec] = d.open; }, true);   // remember open sections across redraws

  app.addEventListener("change", e => {
    const t = e.target, a = t.dataset.act;
    if (a === "filter") { state.filter = t.value; go("orders"); }
    if (a === "ostatus") { sb.from("orders").update({ status: t.value }).eq("id", t.dataset.id).then(async r => { await loadAdminData(); go("orders", r.error ? "Could not update: " + r.error.message : ""); }); }
  });

  app.addEventListener("click", async e => {
    const b = e.target.closest("button[data-act]"); if (!b) return; const a = b.dataset.act, v = b.dataset.v, id = b.dataset.id, u = b.dataset.u;
    if (a === "auth") { state.authTab = v; state.note = ""; return render(); }
    if (a === "logout") { await sb.auth.signOut(); state.user = null; state.isAdmin = false; localStorage.removeItem("sb_keep"); sessionStorage.removeItem("sb_preview"); state.authTab = "login"; return render(); }
    if (a === "google") { const f = app.querySelector("input[name=remember]"); return google(!!(f && f.checked)); }
    if (a === "psold") { const p = state.data.products.find(x => x.id === id); if (SB.isSoldOut(p)) delete p.soldOut; else p.soldOut = SB.today(); await saveProducts(); return go("menu", p.name + (p.soldOut ? " is marked sold out for today." : " is back in stock.")); }
    if (a === "tab") { state.tab = v; if (v === "look") await prepLook(); if (v === "menu") state.edit = null; if (v === "orders" || v === "admins") await loadAdminData(); if (v !== "look") sessionStorage.removeItem("sb_preview"); return go(v); }
    if (a === "odel") { if (!confirm("Delete this order?")) return; const r = await sb.from("orders").delete().eq("id", id); await loadAdminData(); return go("orders", r.error ? "Could not delete: " + r.error.message : ""); }
    if (a === "cup" || a === "cdown") { const L = state.data.categories, i = L.findIndex(c => c.id === id), j = a === "cup" ? i - 1 : i + 1; if (i < 0 || j < 0 || j >= L.length) return go("menu"); [L[i], L[j]] = [L[j], L[i]]; await saveProducts(); return go("menu", L[j].name + " moved " + (a === "cup" ? "up." : "down.")); }
    if (a === "chide") { const c = state.data.categories.find(x => x.id === id); if (c.hidden) delete c.hidden; else c.hidden = true; await saveProducts(); return go("menu", c.name + (c.hidden ? " is hidden from customers." : " is showing again.")); }
    if (a === "cdel") { const c = state.data.categories.find(x => x.id === id); if (state.data.products.some(p => p.category === id)) return go("menu", "Move or delete the items in " + c.name + " first."); if (confirm("Delete the section " + c.name + "?")) { state.data.categories = state.data.categories.filter(x => x.id !== id); await saveProducts(); } return go("menu"); }
    if (a === "pedit") { state.edit = id; return go("menu"); }
    if (a === "pcancel") { state.edit = null; return go("menu"); }
    if (a === "pdel") { if (confirm("Delete this item?")) { state.data.products = state.data.products.filter(p => p.id !== id); await saveProducts(); } return go("menu"); }
    if (a === "theme") { state.draft.theme = v; state.peek = null; draftKey(); return go("look"); }
    if (a === "speek") { state.peek = v; draftKey(); return go("look"); }   // look at a season's theme without changing the saved one
    if (a === "ppage") { state.page = v; return go("look"); }
    if (a === "lsave") { if (!await dbSave("settings", state.draft)) return; await prepLook(true); return go("look", "Saved. It is live for everyone now."); }
    if (a === "lreset") { await prepLook(true); return go("look", "Reset to the saved settings."); }
    if (a === "adel") { if (confirm("Remove " + u + " from the admins?")) { const r = await sb.from("admins").delete().eq("email", u); await loadAdminData(); return go("admins", r.error ? "Could not remove: " + r.error.message : u + " removed."); } return; }
    if (a === "dl-set") return dl("site-settings.json", JSON.stringify(state.draft || state.data.settings, null, 2));
    if (a === "dl-off") return dl("offline-data.js", OFFLINE_HEAD + "window.SB_OFFLINE = " + JSON.stringify({ business: state.data.biz, settings: state.draft || state.data.settings, products: { categories: state.data.categories, products: state.data.products } }, null, 2) + ";\n", "text/javascript");
    if (a === "dl-prod") return dl("products.json", JSON.stringify({ categories: state.data.categories, products: state.data.products }, null, 2));
    if (a === "dl-ord") { const rows = [["created", "source", "name", "phone", "items", "date", "total", "status"], ...state.orders.map(o => [o.created_at, o.source, o.name, o.phone, o.items, o.date, o.total, o.status])]; return dl("orders.csv", rows.map(r => r.map(c => '"' + String(c == null ? "" : c).replace(/"/g, '""') + '"').join(",")).join("\n"), "text/csv"); }
    if (a === "dl-backup") { await loadAdminData(); const sd = await sb.from("site_data").select("*"); return dl("sweetest-bakery-backup-" + SB.today() + ".json", JSON.stringify({ exported: new Date().toISOString(), site_data: sd.data || [], orders: state.orders, admins: state.admins }, null, 2)); }
  });

  async function prepLook(fresh) {
    if (fresh) SB._p = null;
    state.data = await SB.load(); const s = state.data.settings;
    state.draft = JSON.parse(JSON.stringify(s)); state.peek = null; draftKey();
  }
  async function init() { SB._p = null; sessionStorage.removeItem("sb_preview"); state.data = await SB.load(); state.draft = null; }

  init().then(boot).then(() => state.user ? enter() : render());
})();
