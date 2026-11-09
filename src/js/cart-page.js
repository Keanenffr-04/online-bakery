/* cart-page.js (v10.2): draws the Cart page from SBCart + the product data and builds the WhatsApp link. */
SB.load().then(async ({ biz, settings }) => {
  const root = document.getElementById("cart-root"), E = SB.esc, C = SBCart;
  let state = await C.lines();
  const cal = settings.calendar, dl = settings.delivery, booked = await SB.bookedDates();   // v10.21: order calendar + delivery fees
  const val = id => (document.getElementById(id) || {}).value || "";
  // What the customer has picked for delivery right now (area + fee). Fee is 0 for collection or when the order is over the free-delivery amount.
  const extras = () => {
    const method = val("c-method"), on = dl.enabled !== false && (dl.areas || []).length > 0, delivering = method === "Delivery" && on, area = delivering ? val("c-area") : "", f = area ? SB.deliveryFee(dl, area, state.total) : null;
    const isDelivery = method === "Delivery", addr = isDelivery ? SB.addr.clean(val("c-addr")) : "";   // v10.26.6: Delivery always needs an address, even when no fee areas are set up
    return { method, delivering, isDelivery, addr, area: f ? area : "", fee: f ? f.fee : 0, free: !!(f && f.free) };
  };
  // Why the order cannot be sent yet ("" = fine): a date that does not work, or Delivery without an area.
  const blocker = () => SB.dateMsg(val("c-date"), "cart", cal, booked) || (extras().delivering && !extras().area ? "Please choose your delivery area." : "") || (extras().isDelivery && !SB.addr.ok(extras().addr) ? SB.addr.MSG : "");

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
    const m = { ...C.meta() }, me = SB.me.get(), today = SB.today(), minDate = (() => { const d = new Date(today + "T12:00"); d.setDate(d.getDate() + (cal.enabled === false ? 0 : Math.max(0, +cal.cartDays || 0))); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); })();
    if (me.remember !== false) { m.name = m.name || me.name || ""; m.phoneRaw = m.phoneRaw || me.phone || ""; m.method = m.method || me.method || ""; }   // v10.13: this device's saved details
    root.innerHTML = `
    ${state.lines.some(l => l.soldOut) ? `<p class="notice">Some items in your cart are sold out today. You can still send the order and ask us about another day, or remove them.</p>` : ""}
    ${state.gone.length ? `<p class="notice">Some items in your cart are no longer on the menu and were left out.</p>` : ""}
    <div class="cart">
      <ul class="cart-list">${state.lines.map(row).join("")}</ul>
      <aside class="cart-side card"><div class="card__body">
        <h2>Order summary</h2>
        <p class="cart-total" id="c-items-row"><span>Items</span><strong>${C.money(state.total)}</strong></p>
        <p class="cart-total" id="c-fee-row" hidden><span id="c-fee-lbl">Delivery</span><strong id="c-fee"></strong></p>
        <p class="cart-total"><span>Total</span><strong id="cart-total">${C.money(state.total)}</strong></p>
        <p class="muted small">Prices are as listed. We confirm availability, the date and the final price on WhatsApp.</p>
        <div class="form">
          <label for="c-name">Your name</label><input id="c-name" autocomplete="name" value="${E(m.name || "")}">
          ${SB.phoneField("c-phone", { label: "Your phone number", value: m.phoneRaw })}<p class="form__error form__error--inline" id="c-phone-err" role="alert" hidden></p>
          <label for="c-date">Date you need it <span class="muted">(optional)</span></label><input id="c-date" type="date" min="${minDate}" value="${E(m.dateISO || "")}"><p class="form__error form__error--inline" id="c-date-msg" role="alert" hidden></p>
          <label for="c-method">Collection or delivery</label>
          <select id="c-method">${["Not sure yet", "Collection", "Delivery"].map(o => `<option${(m.method || "Not sure yet") === o ? " selected" : ""}>${o}</option>`).join("")}</select>
          <div id="c-area-wrap" hidden><label for="c-area">Delivery area</label><select id="c-area"><option value="">Choose your area&hellip;</option>${(dl.areas || []).map(a => `<option value="${E(a.name)}"${m.area === a.name ? " selected" : ""}>${E(a.name)} (${C.money(a.fee)})</option>`).join("")}</select></div>
          <div id="c-addr-wrap" hidden><label for="c-addr">Delivery address</label><textarea id="c-addr" rows="2" maxlength="200" autocomplete="street-address" placeholder="Street and number, suburb (gate or complex details help too)">${E(m.addr || "")}</textarea></div>
          <p class="muted small" id="c-method-note" hidden></p>
          ${SB.spam.field()}
          <label for="c-notes">Notes <span class="muted">(optional)</span></label><textarea id="c-notes" rows="3" placeholder="Allergies, message on the cake, anything we should know">${E(m.notes || "")}</textarea>
        </div>
        ${SB.me.box("c-remember")}
        <p class="form__error" id="c-send-err" role="alert" hidden></p>
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
    const x = extras(), dm = SB.dateMsg(dISO, "cart", cal, booked), dEl = document.getElementById("c-date-msg"), g = id => document.getElementById(id);
    if (dEl) { dEl.textContent = dm; dEl.hidden = !dm; }
    if (g("c-area-wrap")) g("c-area-wrap").hidden = !x.delivering;
    if (g("c-addr-wrap")) g("c-addr-wrap").hidden = !x.isDelivery;   // v10.26.6
    if (g("c-method-note")) { const t = x.method === "Collection" && dl.enabled !== false ? dl.collectionNote || "" : ""; g("c-method-note").textContent = t; g("c-method-note").hidden = !t; }
    if (g("c-fee-row")) { g("c-fee-row").hidden = !x.area; g("c-fee-lbl").textContent = "Delivery, " + x.area; g("c-fee").textContent = x.free ? "Free" : C.money(x.fee); }
    if (g("cart-total")) g("cart-total").textContent = C.money(state.total + x.fee);
    const meta = { name: v("c-name").trim(), date, method: v("c-method"), notes: v("c-notes").trim(), phone: ph.display || "", area: x.area, fee: x.fee, addr: x.addr };
    C.meta({ name: meta.name, dateISO: dISO, method: meta.method, notes: meta.notes, phoneRaw: v("c-phone"), area: v("c-area"), addr: v("c-addr") });
    if (!biz.whatsappLink) { a.href = "contact.html"; a.removeAttribute("target"); return; }
    a.href = biz.whatsappLink + "?text=" + encodeURIComponent(C.message(state.lines, state.total, biz, meta));
  };

  const refresh = async () => { state = await C.lines(); draw(); };
  // v10.13: pressing send saves the details on this device (if ticked); "Forget my details" clears them and the boxes.
  root.addEventListener("click", e => {
    if (e.target.closest("#cart-send")) {   // v10.21: do not send an order the calendar or delivery rules refuse
      const why = blocker(), box = document.getElementById("c-send-err"); if (box) { box.textContent = why; box.hidden = !why; }
      if (why) { e.preventDefault(); const f = document.getElementById(SB.dateMsg(val("c-date"), "cart", cal, booked) ? "c-date" : (extras().delivering && !extras().area ? "c-area" : "c-addr")); if (f) f.focus(); return; }
    }
    if (e.target.closest("#cart-send")) {   // v10.17: also save the order online (the WhatsApp message still opens as before)
      const g = id => (document.getElementById(id) || {}).value || "", ph0 = SB.phoneRead("c-phone");
      if (state.lines.length) SB.saveOrder({ source: "cart", name: g("c-name").trim().slice(0, 120), phone: ph0.digits || "", items: state.lines.map(l => l.q + " x " + l.p.name).join(", ").slice(0, 3000), date: g("c-date"), total: state.total + extras().fee, details: { lines: state.lines.map(l => ({ id: l.p.id, q: l.q })), method: g("c-method"), notes: g("c-notes").trim().slice(0, 500), ...(extras().area || extras().addr ? { delivery: { ...(extras().area ? { area: extras().area, fee: extras().fee } : {}), ...(extras().addr ? { address: extras().addr } : {}) } } : {}) } });   // v10.26.6: address saved with the order
      if (state.lines.length && biz.whatsappLink) {   // v10.19.1: show the thank-you page once the WhatsApp tab has opened (gives the save a moment to leave)
        let wa = ""; try { wa = new URL(document.getElementById("cart-send").href).searchParams.get("text") || ""; } catch (x) { /* no message text: the thank-you button just opens the chat */ }
        SB.lastOrder({ source: "cart", wa, name: g("c-name").trim(), items: state.lines.map(l => l.q + " x " + l.p.name), date: g("c-date"), total: state.total + extras().fee, method: extras().area ? "Delivery to " + extras().area + (extras().free ? " (free)" : " (" + C.money(extras().fee) + ")") : g("c-method"), address: extras().addr });
        // v10.26.4: the order is sent, so the cart starts fresh (items + this order's date / notes / area; name and phone stay for the next order). The message text is kept in sb_last so the thank-you page can still re-open the chat with it.
        setTimeout(() => { C.clear(); C.meta({ dateISO: "", notes: "", area: "", addr: "" }); location.href = "thanks.html"; }, 900);
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
