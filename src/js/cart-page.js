/* cart-page.js (v10.2): draws the Cart page from SBCart + the product data and builds the WhatsApp link. */
SB.load().then(async ({ biz }) => {
  const root = document.getElementById("cart-root"), E = SB.esc, C = SBCart;
  let state = await C.lines();

  const empty = () => `<div class="cart-empty"><p>Your cart is empty.</p><a class="btn" href="menu.html">Browse the menu</a></div>`;
  const row = ({ p, q, sub }) => `<li class="cart-row" data-id="${E(p.id)}">
    <div class="cart-row__img" aria-hidden="true">${E(p.emoji || "🍰")}</div>
    <div class="cart-row__info"><h3>${E(p.name)}</h3><span class="muted">${C.money(C.price(p))} each</span>${SB.isSoldOut(p) ? ' <span class="badge badge--sold">Sold out today</span>' : ""}</div>
    <div class="qty" role="group" aria-label="Quantity of ${E(p.name)}">
      <button type="button" data-q="-1" aria-label="One less ${E(p.name)}">&minus;</button>
      <output>${q}</output>
      <button type="button" data-q="1" aria-label="One more ${E(p.name)}">+</button>
    </div>
    <div class="cart-row__sub">${C.money(sub)}</div>
    <button type="button" class="linkbtn" data-rm aria-label="Remove ${E(p.name)}">Remove</button>
  </li>`;

  const draw = () => {
    const keepFocus = document.activeElement && document.activeElement.closest && document.activeElement.closest(".cart-row") ? document.activeElement.closest(".cart-row").dataset.id + "|" + (document.activeElement.dataset.q || (document.activeElement.hasAttribute("data-rm") ? "rm" : "")) : "";
    if (!state.lines.length) { root.innerHTML = empty(); return; }
    const m = { ...C.meta() }, me = SB.me.get(), today = SB.today();
    if (me.remember !== false) { m.name = m.name || me.name || ""; m.phoneRaw = m.phoneRaw || me.phone || ""; m.method = m.method || me.method || ""; }   // v10.13: this device's saved details
    root.innerHTML = `
    ${state.lines.some(l => l.soldOut) ? `<p class="notice">Some items in your cart are sold out today. You can still send the order and ask us about another day, or remove them.</p>` : ""}
    ${state.gone.length ? `<p class="notice">Some items in your cart are no longer on the menu and were left out.</p>` : ""}
    <div class="cart">
      <ul class="cart-list">${state.lines.map(row).join("")}</ul>
      <aside class="cart-side card"><div class="card__body">
        <h2>Order summary</h2>
        <p class="cart-total"><span>Total</span><strong id="cart-total">${C.money(state.total)}</strong></p>
        <p class="muted small">Prices are as listed. We confirm availability and the final price on WhatsApp.</p>
        <div class="form">
          <label for="c-name">Your name</label><input id="c-name" autocomplete="name" value="${E(m.name || "")}">
          ${SB.phoneField("c-phone", { label: "Your phone number", value: m.phoneRaw })}<p class="form__error form__error--inline" id="c-phone-err" role="alert" hidden></p>
          <label for="c-date">Date you need it <span class="muted">(optional)</span></label><input id="c-date" type="date" min="${today}" value="${E(m.dateISO || "")}">
          <label for="c-method">Collection or delivery</label>
          <select id="c-method">${["Not sure yet", "Collection", "Delivery"].map(o => `<option${(m.method || "Not sure yet") === o ? " selected" : ""}>${o}</option>`).join("")}</select>
          <label for="c-notes">Notes <span class="muted">(optional)</span></label><textarea id="c-notes" rows="3" placeholder="Allergies, message on the cake, anything we should know">${E(m.notes || "")}</textarea>
        </div>
        ${SB.me.box("c-remember")}
        <a class="btn btn--whatsapp btn--block" id="cart-send" target="_blank" rel="noopener" href="contact.html">Send order on WhatsApp</a>
        <p class="cart-actions"><a href="menu.html">Keep browsing</a><button type="button" class="linkbtn" id="cart-clear">Empty cart</button></p>
      </div></aside>
    </div>`;
    link();
    if (keepFocus) { const [id, w] = keepFocus.split("|"), r = root.querySelector(`.cart-row[data-id="${CSS.escape(id)}"]`); const t = r && (w === "rm" ? r.querySelector("[data-rm]") : r.querySelector(`[data-q="${w}"]`)); if (t) t.focus(); }
  };

  // Rebuilds the WhatsApp link from the current form values + cart (called on every change).
  const link = () => {
    const a = document.getElementById("cart-send"); if (!a) return;
    const v = id => (document.getElementById(id) || {}).value || "";
    const dISO = v("c-date"), date = dISO ? new Date(dISO + "T12:00").toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "long", year: "numeric" }) : "";
    const ph = SB.phoneRead("c-phone"), bad = document.getElementById("c-phone-err");
    if (bad) { bad.textContent = ph.error || ""; bad.hidden = !ph.error; }
    const meta = { name: v("c-name").trim(), date, method: v("c-method"), notes: v("c-notes").trim(), phone: ph.display || "" };
    C.meta({ name: meta.name, dateISO: dISO, method: meta.method, notes: meta.notes, phoneRaw: v("c-phone") });
    if (!biz.whatsappLink) { a.href = "contact.html"; a.removeAttribute("target"); return; }
    a.href = biz.whatsappLink + "?text=" + encodeURIComponent(C.message(state.lines, state.total, biz, meta));
  };

  const refresh = async () => { state = await C.lines(); draw(); };
  // v10.13: pressing send saves the details on this device (if ticked); "Forget my details" clears them and the boxes.
  root.addEventListener("click", e => {
    if (e.target.closest("#cart-send")) {   // v10.17: also save the order online (the WhatsApp message still opens as before)
      const g = id => (document.getElementById(id) || {}).value || "", ph0 = SB.phoneRead("c-phone");
      if (state.lines.length) SB.saveOrder({ source: "cart", name: g("c-name").trim().slice(0, 120), phone: ph0.digits || "", items: state.lines.map(l => l.q + " x " + l.p.name).join(", ").slice(0, 3000), date: g("c-date"), total: state.total, details: { lines: state.lines.map(l => ({ id: l.p.id, q: l.q })), method: g("c-method"), notes: g("c-notes").trim().slice(0, 500) } });
      if (state.lines.length && biz.whatsappLink) {   // v10.19.1: show the thank-you page once the WhatsApp tab has opened (gives the save a moment to leave)
        SB.lastOrder({ source: "cart", name: g("c-name").trim(), items: state.lines.map(l => l.q + " x " + l.p.name), date: g("c-date"), total: state.total, method: g("c-method") });
        setTimeout(() => { location.href = "thanks.html"; }, 900);
      }
    }
    if (e.target.closest("#cart-send")) { const v = id => (document.getElementById(id) || {}).value || ""; SB.me.commit("c-remember", { name: v("c-name").trim(), phone: v("c-phone").trim(), method: v("c-method") }); const f = root.querySelector("[data-forget]"); if (f) f.hidden = !SB.me.has(); }
    if (e.target.closest("[data-forget]")) { SB.me.forget(); C.meta({ name: "", phoneRaw: "", method: "" }); draw(); }
  });
  root.addEventListener("input", link);
  root.addEventListener("change", link);
  root.addEventListener("click", e => {
    const row = e.target.closest(".cart-row");
    if (e.target.closest("[data-q]") && row) { C.set(row.dataset.id, C.qty(row.dataset.id) + Number(e.target.closest("[data-q]").dataset.q)); refresh(); }
    else if (e.target.closest("[data-rm]") && row) { C.remove(row.dataset.id); refresh(); }
    else if (e.target.closest("#cart-clear") && confirm("Empty your cart?")) { C.clear(); refresh(); }
  });
  // If the cart changes in another tab, follow it.
  document.addEventListener("sb:cart", () => { C.lines().then(s => { if (JSON.stringify(s.lines.map(l => [l.p.id, l.q])) !== JSON.stringify(state.lines.map(l => [l.p.id, l.q]))) { state = s; draw(); } }); });
  draw();
});
