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
  let state = { open: { theme: true }, tab: "orders", note: "", authTab: "login", edit: null, page: "index.html", draft: null, data: null };
  // v10.14: "Remember me". The sign-in normally lasts until the tab closes (sessionStorage). With the tick box it is also kept on this
  // device for 30 days (localStorage "sb_keep" = {u, exp}); me() brings it back. Logging out removes both. Like the whole login, this is a
  // convenience lock on this browser, not server security (that comes with Supabase).
  const KEEP_DAYS = 30;
  const keep = () => { const k = J("sb_keep", null); return k && k.u && k.exp > Date.now() ? k : null; };
  const me = () => { let u = sessionStorage.getItem("sb_session"); if (!u) { const k = keep(); if (k) { u = k.u; sessionStorage.setItem("sb_session", u); } else if (J("sb_keep", null)) localStorage.removeItem("sb_keep"); } return u; };
  const keepFor = u => S("sb_keep", { u, exp: Date.now() + KEEP_DAYS * 864e5 });
  const flash = t => { state.note = t; render(); };

  async function seed() { if (!admins().length) saveA([await mk("admin", "admin1", { root: true, mustChange: true })]); }

  async function login(u, p, remember) {
    const a = find(admins(), u);
    if (!a || a.h !== await hash(p, a.salt)) return flash("Wrong username or password.");
    if (a.status !== "active") return flash("This account is waiting for approval by an admin.");
    sessionStorage.setItem("sb_session", a.u); state.note = "";
    if (remember) { keepFor(a.u); localStorage.setItem("sb_admin_u", a.u); } else { localStorage.removeItem("sb_keep"); localStorage.removeItem("sb_admin_u"); }
    render();
  }
  async function signup(u, p) {
    const all = admins();
    if (!ok(u)) return flash("Username: 3-20 letters, numbers, . _ -");
    if (p.length < 6) return flash("Password must be at least 6 characters.");
    if (find(all, u)) return flash("That username is taken.");
    all.push(await mk(u, p, { status: "pending" })); saveA(all);
    state.authTab = "login"; flash("Sign-up sent. An existing admin must approve it before you can log in.");
  }

  // v10.6: forgot password. There is no email/SMS on a static site, so the proof of identity is a one-time 6-digit code that
  // a logged-in admin sees under Admins > "Password reset requests" and passes on to the person (WhatsApp, a call, in person).
  // Codes last 15 minutes and are blocked after 5 wrong tries. Real email/SMS links come with the backend (v10.7).
  const RK = "sb_resets", RMIN = 15;
  const resets = () => J(RK, []).filter(r => r.exp > Date.now()), saveR = r => S(RK, r);
  const newCode = () => String(crypto.getRandomValues(new Uint32Array(1))[0] % 1000000).padStart(6, "0");
  function requestReset(u) {
    const a = find(admins(), u); state.resetUser = u;
    if (a && a.status === "active") { const all = resets().filter(r => r.u !== a.u); all.push({ u: a.u, code: newCode(), exp: Date.now() + RMIN * 60000, tries: 0 }); saveR(all); }
    state.authTab = "reset";   // same answer whether or not the account exists, so nobody can use this to find usernames
    flash(`If that account exists, a reset code was created. Ask an admin for it (it shows on their Admins tab). It works for ${RMIN} minutes.`);
  }
  async function useReset(u, code, p) {
    const all = resets(), r = all.find(x => x.u.toLowerCase() === u.toLowerCase());
    if (p.length < 6) return flash("New password must be at least 6 characters.");
    if (!r) return flash("That code is wrong or has expired. Request a new one.");
    if (r.tries >= 5) { saveR(all.filter(x => x !== r)); return flash("Too many wrong tries. Request a new code."); }
    if (String(code).trim() !== r.code) { r.tries++; saveR(all); return flash(`That code is wrong. ${5 - r.tries} ${5 - r.tries === 1 ? "try" : "tries"} left.`); }
    const rest = admins(), a = find(rest, r.u); a.salt = uid() + uid(); a.h = await hash(p, a.salt); delete a.mustChange; saveA(rest);
    saveR(all.filter(x => x !== r)); state.authTab = "login"; flash("Password changed. You can log in now.");
  }
  function recoverView() {
    const f = state.authTab === "forgot";
    return `<div class="adm-card adm-login"><h1>${f ? "Forgot password" : "Enter your reset code"}</h1>
    <p class="muted">${f ? "Enter your username. A one-time code is created, and an admin gives it to you, so we know it is really you." : "Type the 6-digit code an admin gave you, then choose a new password."}</p>
    ${state.note ? `<div class="msg">${esc(state.note)}</div>` : ""}
    <form data-form="${f ? "forgot" : "reset"}"><label>Username</label><input name="u" autocomplete="username" value="${esc(state.resetUser || "")}" required>
    ${f ? "" : `<label>Reset code</label><input name="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" required><label>New password</label><input name="p" type="password" autocomplete="new-password" minlength="6" required>`}
    <p style="margin-top:1rem"><button class="btn" type="submit">${f ? "Get a reset code" : "Change password"}</button></p></form>
    <p class="muted">${f ? '<button type="button" class="linkbtn" data-act="auth" data-v="reset">I already have a code</button> &middot; ' : '<button type="button" class="linkbtn" data-act="auth" data-v="forgot">Get a new code</button> &middot; '}<button type="button" class="linkbtn" data-act="auth" data-v="login">Back to log in</button></p></div>`;
  }

  // v10.12: only admins use this page. There is no public link to it (the footer "Staff login" link was removed) and no public sign-up:
  // new admins are added by an existing admin under Admins > Add an admin. (A real server-side lock arrives with the Supabase version.)
  function authView() {
    if (state.authTab === "forgot" || state.authTab === "reset") return recoverView();
    return `<div class="adm-card adm-login"><h1>Admin login</h1><p class="muted">For the bakery team only.</p>
    ${state.note ? `<div class="msg">${esc(state.note)}</div>` : ""}
    <form data-form="login"><label>Username</label><input name="u" autocomplete="username" value="${esc(localStorage.getItem("sb_admin_u") || "")}" required>
    <label>Password</label><input name="p" type="password" autocomplete="current-password" required>
    <label class="chk"><input type="checkbox" name="remember" ${localStorage.getItem("sb_admin_u") ? "checked" : ""}><span>Remember me on this device <span class="muted">(stay signed in for ${KEEP_DAYS} days)</span></span></label>
    <p style="margin-top:1rem"><button class="btn" type="submit">Log in</button></p></form>
    <p class="muted"><button type="button" class="linkbtn" data-act="auth" data-v="forgot">Forgot your password?</button></p>
    <p class="muted"><a href="index.html">Back to the website</a></p></div>`;
  }

  /* ---------- tabs ---------- */
  const TABS = [["orders", "Orders"], ["menu", "Menu items"], ["look", "Theme & layout"], ["admins", "Admins"], ["account", "My account"], ["publish", "Publish"]];

  function orders() {
    const o = J("sb_orders", []), f = state.filter || "pending", list = o.filter(x => f === "all" || x.status === f);
    const st = ["pending", "confirmed", "ready", "completed", "cancelled"];
    return `<div class="adm-split"><div class="adm-card"><h2>Add an order</h2>
    <form data-form="order"><label>Customer</label><input name="name" required>${SB.phoneField("o-phone", { label: "Phone" })}
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
    const d = state.data, e = d.products.find(p => p.id === state.edit) || { visible: true, category: d.categories[0]?.id, emoji: "🍰" }, cat = id => (d.categories.find(c => c.id === id) || {}).name || "";
    return `<div class="adm-split"><div class="adm-card adm-form"><h2>${state.edit ? "Edit item" : "Add item"}</h2>
    <form data-form="product"><label>Name</label><input name="name" value="${esc(e.name)}" required>
    <div class="adm-row"><div><label>Section</label><select name="category">${d.categories.map(c => `<option value="${c.id}" ${c.id === e.category ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select></div>
    <div><label>Price (R)</label><input name="price" type="number" min="0" value="${esc(e.price)}" required></div></div>
    <div class="adm-row"><div><label>Emoji</label><input name="emoji" value="${esc(e.emoji)}"></div><div></div></div>
    <label>Description</label><textarea name="description">${esc(e.description)}</textarea>
    <fieldset class="adm-fs"><legend>Dietary tags <span class="muted">(only tick what is definitely true)</span></legend><div class="adm-tags">${SB.TAGS.map(([id, n]) => `<label class="chk"><input type="checkbox" name="tag_${id}" ${(e.tags || []).includes(id) ? "checked" : ""}>${n}</label>`).join("")}</div></fieldset>
    <fieldset class="adm-fs"><legend>Where it shows</legend>
    <label class="chk"><input type="checkbox" name="visible" ${e.visible !== false ? "checked" : ""}>Visible on the menu</label>
    <label class="chk"><input type="checkbox" name="featured" ${e.featured ? "checked" : ""}>Home page: Our best sellers</label>
    <label class="chk"><input type="checkbox" name="popular" ${e.popular ? "checked" : ""}>Home page: Most popular</label></fieldset>
    <p><button class="btn btn--sm" type="submit">Save</button> ${state.edit ? '<button class="btn btn--sm btn--ghost" type="button" data-act="pcancel">Cancel</button>' : ""}</p></form></div>
    <div class="adm-card"><h2>${d.products.length} items</h2><p class="muted">"Sold out today" greys an item out for customers and switches itself off at midnight. Like every change here it reaches customers after you Publish.</p>
    <ul class="adm-list">${d.products.map(p => { const so = SB.isSoldOut(p); return `<li class="item"><div class="item__main"><span class="item__e" aria-hidden="true">${esc(p.emoji)}</span><div><strong>${esc(p.name)}</strong> <span class="muted">R ${esc(p.price)} &middot; ${esc(cat(p.category))}</span>
    <div class="item__tags">${p.featured ? '<span class="tag">home</span>' : ""}${p.popular ? '<span class="tag">popular</span>' : ""}${so ? '<span class="tag tag--sold">sold out today</span>' : ""}${p.visible === false ? '<span class="tag">hidden</span>' : ""}${(p.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div></div></div>
    <div class="adm-actions"><button class="btn btn--sm ${so ? "" : "btn--ghost"}" data-act="psold" data-id="${p.id}" aria-pressed="${so}">${so ? "Back in stock" : "Sold out today"}</button><button class="btn btn--sm btn--ghost" data-act="pedit" data-id="${p.id}">Edit</button><button class="btn btn--sm btn--ghost" data-act="pdel" data-id="${p.id}">Delete</button></div></li>`; }).join("")}</ul></div></div>`;
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
    <div class="adm-row"><div><label>Best sellers shown</label>${countSel("fc", s.featuredCount)}</div><div><label>"Just added" shown</label>${countSel("rc", s.recentCount || 3)}</div><div><label>"Most popular" shown</label>${countSel("pc", s.popularCount || 3)}</div>
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
    const a = admins(), rq = resets();
    const reqs = rq.length ? `<div class="adm-card"><h2>Password reset requests</h2><p class="muted">Someone asked to reset their password. Only give them the code if you are sure it is really them (call or WhatsApp them). It cannot be used after it expires.</p>
    <ul class="adm-list">${rq.map(r => `<li><div><strong>${esc(r.u)}</strong> &middot; code <strong class="adm-code">${esc(r.code)}</strong><br><span class="muted">expires in ${Math.max(1, Math.ceil((r.exp - Date.now()) / 60000))} min</span></div>
    <div class="adm-actions"><button class="btn btn--sm btn--ghost" data-act="rcancel" data-u="${esc(r.u)}">Cancel</button></div></li>`).join("")}</ul></div>` : "";
    return `${reqs}<div class="adm-split"><div class="adm-card"><h2>Add an admin</h2><form data-form="addadmin"><label>Username</label><input name="u" required><label>Password</label><input name="p" type="password" required>
    <p><button class="btn btn--sm" type="submit">Add admin</button></p></form><p class="muted">The root admin is always "admin" (password can change, account can't be removed). If an admin forgets their password they can use "Forgot your password?" on the login page; the code shows here.</p></div>
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
    <nav class="adm-nav" aria-label="Admin sections">${TABS.map(([k, n]) => `<button class="${state.tab === k ? "is-on" : ""}" ${state.tab === k ? 'aria-current="page"' : ""} data-act="tab" data-v="${k}">${n}</button>`).join("")}</nav>
    ${warn}${state.note ? `<div class="msg">${esc(state.note)}</div>` : ""}${body}`;
  }

  function render() { app.innerHTML = me() && find(admins(), me()) ? dash() : authView(); state.note = ""; }
  const go = (t, note) => { state.tab = t; state.note = note || ""; app.innerHTML = dash(); state.note = ""; if (t === "look") { drawDemo(); drawSeasonEditor(); drawSeasonStatus(); } };
  const dl = (name, text, type) => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: type || "application/json" })); a.download = name; a.click(); };
  const saveProducts = () => S("sb_products", { categories: state.data.categories, products: state.data.products });

  /* ---------- events ---------- */
  app.addEventListener("submit", async e => {
    e.preventDefault(); const f = e.target, v = Object.fromEntries(new FormData(f)), k = f.dataset.form;
    if (k === "login") return login(v.u.trim(), v.p, !!v.remember);
    if (k === "signup") return signup(v.u.trim(), v.p);
    if (k === "forgot") return requestReset(v.u.trim());
    if (k === "reset") { state.resetUser = v.u.trim(); return useReset(v.u.trim(), v.code, v.p); }
    if (k === "order") {
      const ph = SB.phoneRead("o-phone"); if (ph.error) return go("orders", ph.error);
      delete v["o-phone-cc"]; delete v["o-phone"];
      const o = J("sb_orders", []); o.unshift({ id: uid(), status: "pending", ...v, phone: ph.digits || "" }); S("sb_orders", o); return go("orders", "Order saved."); }
    if (k === "product") {
      const p = { ...v, price: Number(v.price), featured: !!v.featured, popular: !!v.popular, visible: !!v.visible, tags: SB.TAGS.map(t => t[0]).filter(id => v["tag_" + id]) }, L = state.data.products;
      SB.TAGS.forEach(t => delete p["tag_" + t[0]]);
      if (state.edit) Object.assign(L.find(x => x.id === state.edit), p); else L.push({ id: "p" + uid(), ...p, added: SB.today() });   // v10.9: the date decides "Just added"
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
      if (!a.root && v.u.trim() !== a.u) { if (!ok(v.u.trim()) || find(all, v.u.trim())) return go("account", "That username is not available."); a.u = v.u.trim(); sessionStorage.setItem("sb_session", a.u); if (keep()) keepFor(a.u); if (localStorage.getItem("sb_admin_u")) localStorage.setItem("sb_admin_u", a.u); }
      if (v.p) { if (v.p.length < 6) return go("account", "New password must be 6+ characters."); a.salt = uid() + uid(); a.h = await hash(v.p, a.salt); delete a.mustChange; }
      saveA(all); return go("account", "Account updated.");
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
    else if (a === "tag") s.tagline = t.value; else if (a === "gr") s.greeting = t.value; else if (a === "hs") s.heroStyle = t.value; else if (a === "fc") s.featuredCount = +t.value; else if (a === "fs") s.featuredStyle = t.value; else if (a === "rc") s.recentCount = +t.value; else if (a === "pc") s.popularCount = +t.value; else if (a === "deco") s.decorations = t.checked; else if (a === "ml") s.menuLayout = t.value; else if (a === "home") s.home[t.dataset.k] = t.checked; else if (a === "spon") (s.specials = s.specials || {}).enabled = t.checked; else if (a === "oron") (s.orders = s.orders || {}).enabled = t.checked; else if (a === "ortxt") (s.orders = s.orders || {}).items = t.value.split("\n").map(x => x.trim()).filter(Boolean).slice(0, 6); else if (a === "sptxt") (s.specials = s.specials || {}).items = t.value.split("\n").map(x => x.trim()).filter(Boolean).slice(0, 6); else return;
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
    if (a === "ostatus") { const o = J("sb_orders", []); o.find(x => x.id === t.dataset.id).status = t.value; S("sb_orders", o); go("orders"); }
  });

  app.addEventListener("click", async e => {
    const b = e.target.closest("button[data-act]"); if (!b) return; const a = b.dataset.act, v = b.dataset.v, id = b.dataset.id, u = b.dataset.u;
    if (a === "auth") { state.authTab = v; state.note = ""; return render(); }
    if (a === "logout") { sessionStorage.removeItem("sb_session"); localStorage.removeItem("sb_keep");   /* the username stays filled in (sb_admin_u) until a login without the tick */ sessionStorage.removeItem("sb_preview"); return render(); }
    if (a === "psold") { const p = state.data.products.find(x => x.id === id); if (SB.isSoldOut(p)) delete p.soldOut; else p.soldOut = SB.today(); saveProducts(); return go("menu", p.name + (p.soldOut ? " is marked sold out for today." : " is back in stock.")); }
    if (a === "tab") { state.tab = v; if (v === "look") await prepLook(); if (v === "menu") state.edit = null; if (v !== "look") sessionStorage.removeItem("sb_preview"); return go(v); }
    if (a === "odel") { S("sb_orders", J("sb_orders", []).filter(x => x.id !== id)); return go("orders"); }
    if (a === "pedit") { state.edit = id; return go("menu"); }
    if (a === "pcancel") { state.edit = null; return go("menu"); }
    if (a === "pdel") { if (confirm("Delete this item?")) { state.data.products = state.data.products.filter(p => p.id !== id); saveProducts(); } return go("menu"); }
    if (a === "theme") { state.draft.theme = v; state.peek = null; draftKey(); return go("look"); }
    if (a === "speek") { state.peek = v; draftKey(); return go("look"); }   // look at a season's theme without changing the saved one
    if (a === "ppage") { state.page = v; return go("look"); }
    if (a === "lsave") { S("sb_settings", state.draft); return go("look", "Saved on this device. Use the Publish tab to make it live for everyone."); }
    if (a === "lreset") { localStorage.removeItem("sb_settings"); await prepLook(true); return go("look", "Reset to the published settings."); }
    if (a === "rcancel") { saveR(resets().filter(r => r.u !== u)); return go("admins", "Reset request cancelled."); }
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
    state.draft = JSON.parse(JSON.stringify(s)); state.peek = null; draftKey();
  }
  async function init() { SB._p = null; sessionStorage.removeItem("sb_preview"); state.data = await SB.load(); state.draft = null; }

  seed().then(init).then(render);
})();
