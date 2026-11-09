/* account.js: the customer "My account" page (v10.18). Sign in (email or Google), profile (username + picture), details saved on this device,
   past orders, change password, delete my account. Uses Supabase sign-in under its own storage key "sb-customer" so it never
   mixes with the admin's sign-in. Orders are linked to the customer by store.js (SB.saveOrder). The locks are in supabase/setup.sql (section 6). */
(function () {
  const $ = q => document.querySelector(q), root = $("#acct"), esc = SB.esc;
  const ok = s => /^\S+@\S+\.\S+$/.test(s);
  const WEB = () => /^https?:$/.test(location.protocol), HERE = () => location.origin + location.pathname;
  const LIB = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js";
  const loadLib = () => window.supabase ? Promise.resolve() : new Promise((res, rej) => { const s = document.createElement("script"); s.src = LIB; s.onload = res; s.onerror = () => rej(new Error("lib")); document.head.appendChild(s); });
  const STATUS = { pending: "Waiting for Becca to confirm", confirmed: "Confirmed", ready: "Ready", completed: "Completed", cancelled: "Cancelled" };
  let sb = null, biz = {}, shown = [], state = { tab: "login", note: "", user: null, profile: null, profErr: false, orders: [], picTmp: null };

  const flash = t => { state.note = t; render(); };
  // Supabase's free built-in email sender only emails the project team, so confirm / reset emails may not arrive until the bakery's own email sender is set up.
  const MAILNOTE = " If no email arrives, it is not coming yet (the bakery's email sender is still being set up). Try Continue with Google, or message us on WhatsApp.";
  const mailErr = e => /rate limit|over_email|not authorized|sending|smtp|email address/i.test((e && (e.message + " " + (e.code || ""))) || "") ? "We could not send the email right now." + MAILNOTE : "Could not send the email: " + ((e && e.message) || "unknown error") + ".";

  // ---- profile picture (same idea as the admin: crop to a square, 160 px, tiny JPEG kept in the database) ----
  const initial = s => esc(((s || "?").trim()[0] || "?").toUpperCase());
  const avatar = (p, email) => p && p.avatar && /^data:image\//.test(p.avatar) ? `<img class="acct__av" src="${esc(p.avatar)}" alt="">` : `<span class="acct__av" aria-hidden="true">${initial((p && p.username) || email)}</span>`;
  const shrink = file => new Promise((res, rej) => {
    if (!/^image\//.test(file.type)) return rej(new Error("type"));
    const img = new Image(), u = URL.createObjectURL(file);
    img.onload = () => { const n = 160, c = document.createElement("canvas"); c.width = c.height = n; const s = Math.min(img.width, img.height); c.getContext("2d").drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, n, n); URL.revokeObjectURL(u); res(c.toDataURL("image/jpeg", 0.82)); };
    img.onerror = () => rej(new Error("img")); img.src = u;
  });

  async function boot() {
    try { const d = await SB.load(); biz = d.biz || {}; shown = d.shownProducts || []; } catch (e) { /* fall through */ }
    const c = biz.supabase;
    if (!c || !c.url || !c.key) { state.noDb = "Accounts are not switched on yet. You can still order from the Menu and send it on WhatsApp."; return render(); }
    try { await loadLib(); } catch (e) { state.noDb = "Could not load the sign-in. Check your internet connection and reload."; return render(); }
    sb = window.supabase.createClient(c.url, c.key, { auth: { storageKey: "sb-customer", persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
    sb.auth.onAuthStateChange((ev) => { if (ev === "PASSWORD_RECOVERY") { state.tab = "newpw"; render(); } });   // came from the reset-password email
    await refresh();
  }
  async function refresh() {
    const { data } = await sb.auth.getSession(); state.user = (data.session && data.session.user) || null; state.profile = null; state.orders = []; state.profErr = false;
    if (state.user && state.tab !== "newpw") {
      const [p, o] = await Promise.all([sb.from("profiles").select("*").eq("user_id", state.user.id).maybeSingle(), sb.from("orders").select("id,created_at,source,items,total,date,status,details").eq("user_id", state.user.id).order("created_at", { ascending: false }).limit(50)]);
      state.profErr = !!p.error; state.profile = p.data || null; state.orders = o.data || [];
    }
    render();
  }

  // ---- views ----
  function authView() {
    if (state.tab === "forgot") return `<div class="acct__card"><h2>Forgot password</h2><p class="muted">Type your email and we send you a link to choose a new one.</p><form data-form="forgot"><label for="a-em">Email</label><input id="a-em" name="u" type="email" autocomplete="email" value="${esc(state.email || "")}" required><p><button class="btn" type="submit">Send me the link</button></p></form><p><button type="button" class="linkbtn" data-act="tab" data-v="login">Back to log in</button></p></div>`;
    if (state.tab === "newpw") return `<div class="acct__card"><h2>Choose a new password</h2><form data-form="newpw"><label for="a-np">New password</label><input id="a-np" name="p" type="password" autocomplete="new-password" minlength="6" required><p><button class="btn" type="submit">Save new password</button></p></form></div>`;
    const up = state.tab === "signup";
    return `<div class="acct__card"><div class="acct__tabs"><button type="button" class="btn btn--sm ${up ? "btn--ghost" : ""}" data-act="tab" data-v="login">Log in</button><button type="button" class="btn btn--sm ${up ? "" : "btn--ghost"}" data-act="tab" data-v="signup">Create account</button></div>
    <p class="muted">${up ? "An account is optional. It lets you see your past orders in one place." : "Welcome back."}</p>
    <form data-form="${up ? "signup" : "login"}">${up ? SB.spam.field() : ""}<label for="a-em">Email</label><input id="a-em" name="u" type="email" autocomplete="email" value="${esc(state.email || "")}" required>
    <label for="a-pw">Password</label><input id="a-pw" name="p" type="password" autocomplete="${up ? "new-password" : "current-password"}" ${up ? 'minlength="6"' : ""} required>
    ${up ? `<label class="chk"><input type="checkbox" name="agree" required> <span>I have read the <a href="privacy.html" target="_blank" rel="noopener">privacy policy</a> and the <a href="terms.html" target="_blank" rel="noopener">terms</a>.</span></label>` : ""}
    <p class="acct__row"><button class="btn" type="submit">${up ? "Create my account" : "Log in"}</button> <button type="button" class="btn btn--ghost" data-act="google">Continue with Google</button></p></form>
    ${up ? "" : `<p><button type="button" class="linkbtn" data-act="tab" data-v="forgot">Forgot password?</button></p>`}</div>`;
  }
  function picRow(p) {
    const cur = state.picTmp === null ? p : { ...p, avatar: state.picTmp || null };
    return `<div class="acct__who"><span id="av-prev">${avatar(cur, state.user.email)}</span><div><label class="btn btn--sm btn--ghost" style="display:inline-block;margin:0">Choose a picture<input type="file" accept="image/*" data-act="pic" hidden></label> <button type="button" class="btn btn--sm btn--ghost" data-act="pic-remove">Remove</button><p class="muted small" style="margin:.35rem 0 0">Optional. Cropped to a square and made small automatically.</p></div></div>`;
  }
  function profileForm(first) {
    const p = state.profile || {};
    return `<form data-form="profile">${picRow(p)}<label for="a-un">Username</label><input id="a-un" name="username" type="text" value="${esc(p.username || "")}" minlength="3" maxlength="20" pattern="[A-Za-z0-9_.\\-]{3,20}" autocomplete="nickname" required><p class="muted small">3 to 20 letters, numbers, . _ -</p><p><button class="btn${first ? "" : " btn--sm"}" type="submit">${first ? "Save and continue" : "Save profile"}</button></p></form>`;
  }
  function setupView() {
    if (state.profErr) return `<div class="acct__card"><h2>Almost ready</h2><div class="acct__msg">Accounts need one more setup step by the bakery (the database has not been updated yet). Please try again later, or order from the Menu as usual.</div><p><button type="button" class="btn btn--ghost" data-act="logout">Log out</button></p></div>`;
    return `<div class="acct__card"><h2>Welcome!</h2><p class="muted">Signed in as ${esc(state.user.email)}. Choose a username and, if you like, a picture.</p>${profileForm(true)}</div>`;
  }
  const orderLi = o => {
    const d = new Date(o.created_at);
    return `<li><div class="top"><span>${esc(isNaN(d) ? "" : d.toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }))}${o.date ? " &middot; for " + esc(o.date) : ""}</span><span>${esc(STATUS[o.status] || o.status)}</span></div>
      <p>${esc(o.items || "")}${o.total != null ? ` <strong>R ${esc(o.total)}</strong>` : ""}</p></li>`;
  };
  function homeView() {
    const p = state.profile, m = SB.me.get();
    return `<div class="acct__card"><div class="acct__who">${avatar(p, state.user.email)}<div><h1 style="margin:0;font-size:1.5rem">Hi, ${esc(p.username)}</h1><p class="muted small" style="margin:.2rem 0 0">${esc(state.user.email)}</p></div></div></div>
    <div class="acct__card"><h2>Your past orders</h2>${state.orders.length ? `<ul class="acct__orders">${state.orders.map(orderLi).join("")}</ul>` : `<p class="muted">No orders yet. Orders you send while signed in show up here. <a href="menu.html">Browse the menu</a></p>`}</div>
    <div class="acct__card"><h2>Details saved on this device</h2><p class="muted small">Used to fill in the Cart and Custom Order forms. Kept only in this browser, never on our server.</p>
      <form data-form="me"><label for="a-nm">Name</label><input id="a-nm" name="name" type="text" autocomplete="name" maxlength="120" value="${esc(m.name || "")}"><label for="a-ph">Phone</label><input id="a-ph" name="phone" type="tel" autocomplete="tel" maxlength="30" value="${esc(m.phone || "")}">
      <p class="acct__row"><button class="btn btn--sm" type="submit">Save details</button> <button type="button" class="btn btn--sm btn--ghost" data-act="meforget">Forget my details</button></p></form></div>
    <div class="acct__card"><h2>Profile</h2>${profileForm(false)}</div>
    <div class="acct__card"><h2>Password</h2><form data-form="newpw"><label for="a-np">New password</label><input id="a-np" name="p" type="password" autocomplete="new-password" minlength="6" required><p><button class="btn btn--sm" type="submit">Change password</button></p></form></div>
    <div class="acct__card acct__danger"><h2>Delete my account</h2><p class="muted small">This removes your login and profile and takes your name and phone off your past orders. It cannot be undone. Type DELETE to confirm.</p>
      <form data-form="delete"><label for="a-del">Type DELETE</label><input id="a-del" name="c" type="text" autocomplete="off"><p><button class="btn btn--sm" type="submit">Delete my account</button></p></form></div>
    <p><button type="button" class="btn btn--ghost" data-act="logout">Log out</button></p>`;
  }
  function render() {
    let h;
    if (state.noDb) h = `<div class="acct__card"><h1>My account</h1><div class="acct__msg">${esc(state.noDb)}</div><p><a class="btn" href="menu.html">See the menu</a></p></div>`;
    else if (!sb) h = `<p class="muted">Loading...</p>`;
    else if (!state.user) h = `<div class="section__head" style="margin-bottom:1rem"><h1>My account</h1></div>${state.note ? `<div class="acct__msg" role="status">${esc(state.note)}</div>` : ""}${authView()}`;
    else if (state.tab === "newpw") h = `${state.note ? `<div class="acct__msg" role="status">${esc(state.note)}</div>` : ""}${authView()}`;
    else if (!state.profile) h = `${state.note ? `<div class="acct__msg" role="status">${esc(state.note)}</div>` : ""}${setupView()}`;
    else h = `${state.note ? `<div class="acct__msg" role="status">${esc(state.note)}</div>` : ""}${homeView()}`;
    state.note = ""; root.innerHTML = h;
  }

  // ---- actions ----
  async function login(email, p) {
    state.email = email; const { error } = await sb.auth.signInWithPassword({ email, password: p });
    if (error) return flash(/confirm/i.test(error.message) ? "This account is not confirmed yet. Open the confirm email we sent." + MAILNOTE : "Wrong email or password. New here? Choose Create account.");
    state.note = ""; await refresh();
  }
  async function signup(email, p) {
    state.email = email; if (SB.spam.bot()) { state.tab = "login"; return flash("Account created. Open the confirm email we sent you, then log in."); }   // v10.23: bots get a pretend success, nothing is created
     if (!ok(email)) return flash("Type a valid email address."); if (p.length < 6) return flash("Password must be at least 6 characters.");
    const { data, error } = await sb.auth.signUp({ email, password: p, options: WEB() ? { emailRedirectTo: HERE() } : {} });
    if (error) { state.tab = "signup"; return flash(mailErr(error)); }
    if (data && data.session) { state.note = ""; return refresh(); }
    if (data && data.user && data.user.identities && !data.user.identities.length) { state.tab = "login"; return flash("That email already has an account. Log in, or use Forgot password."); }
    state.tab = "login"; flash("Account created. Open the confirm email we sent you, then log in." + MAILNOTE);
  }
  async function resetMail(email) {
    if (ok(email)) { const { error } = await sb.auth.resetPasswordForEmail(email, WEB() ? { redirectTo: HERE() } : {}); if (error && /rate limit|over_email|not authorized|sending|smtp/i.test(error.message + " " + (error.code || ""))) { state.tab = "login"; return flash(mailErr(error)); } }
    state.tab = "login"; flash("If that email has an account, a link to choose a new password may be on its way." + MAILNOTE);   // same answer either way
  }
  async function saveProfile(f) {
    const username = f.username.value.trim(), p = state.profile || {}, avatarVal = state.picTmp === null ? (p.avatar || null) : (state.picTmp || null);
    if (!/^[A-Za-z0-9_.-]{3,20}$/.test(username)) return flash("Username: 3 to 20 letters, numbers, . _ -");
    const row = { user_id: state.user.id, email: state.user.email, username, avatar: avatarVal, updated_at: new Date().toISOString() };
    const r = state.profile ? await sb.from("profiles").update(row).eq("user_id", state.user.id) : await sb.from("profiles").insert(row);
    if (r.error) return flash(r.error.code === "23505" ? "That username is taken. Try another." : "Could not save: " + r.error.message);
    state.picTmp = null; await refresh(); flash("Saved.");
  }
  async function deleteMe() {
    const { error } = await sb.rpc("delete_my_account");
    if (error) return flash(/admin/i.test(error.message) ? error.message : "Could not delete the account: " + error.message + " (If this keeps happening, message us on WhatsApp.)");
    SB.me.forget(); await sb.auth.signOut(); state.user = null; state.profile = null; state.orders = []; state.tab = "login"; flash("Your account is deleted. Thank you for ordering with us.");
  }

  root.addEventListener("submit", async e => {
    const f = e.target.closest("form[data-form]"); if (!f) return; e.preventDefault(); const k = f.dataset.form, g = n => (f.elements[n] || {}).value || "";
    if (k === "login") return login(g("u").trim(), g("p"));
    if (k === "signup") return signup(g("u").trim(), g("p"));
    if (k === "forgot") return resetMail(g("u").trim());
    if (k === "profile") return saveProfile(f);
    if (k === "me") { SB.me.save({ name: g("name").trim(), phone: g("phone").trim() }); return flash("Saved on this device."); }
    if (k === "newpw") {
      if (g("p").length < 6) return flash("New password must be at least 6 characters.");
      const { error } = await sb.auth.updateUser({ password: g("p") }); if (error) return flash("Could not change it: " + error.message);
      const was = state.tab === "newpw"; state.tab = "login"; history.replaceState(null, "", location.pathname); await refresh(); return flash(was ? "New password saved. You are signed in." : "Password changed.");
    }
    if (k === "delete") { if (g("c").trim() !== "DELETE") return flash("Type DELETE (capital letters) to confirm."); return deleteMe(); }
  });
  root.addEventListener("click", async e => {
    const b = e.target.closest("button[data-act]"); if (!b) return; const a = b.dataset.act;
    if (a === "tab") { state.tab = b.dataset.v; state.note = ""; return render(); }
    if (a === "google") { const { error } = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: HERE() } }); if (error) flash("Google sign-in is not switched on yet: " + error.message); return; }
    if (a === "logout") { await sb.auth.signOut(); state.user = null; state.profile = null; state.orders = []; state.tab = "login"; return render(); }
    if (a === "meforget") { SB.me.forget(); return flash("Your saved details are removed from this device."); }
    if (a === "pic-remove") { state.picTmp = ""; const el = $("#av-prev"); if (el) el.innerHTML = avatar({ username: (document.querySelector("input[name=username]") || {}).value }, state.user.email); }
  });
  root.addEventListener("change", async e => {
    const t = e.target; if (t.dataset.act !== "pic" || !t.files || !t.files[0]) return;
    try { state.picTmp = await shrink(t.files[0]); const el = $("#av-prev"); if (el) el.innerHTML = avatar({ avatar: state.picTmp }, state.user.email); } catch (err) { flash("That file is not a picture we can use."); }
  });

  boot();
})();
