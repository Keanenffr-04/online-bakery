/* cart-page.js (v10.2): draws the Cart page from SBCart + the product data and builds the WhatsApp link. */
SB.load().then(async ({ biz }) => {
  const root = document.getElementById("cart-root"), E = SB.esc, C = SBCart;
  let state = await C.lines();

  const empty = () => `<div class="cart-empty"><p>Your cart is empty.</p><a class="btn" href="menu.html">Browse the menu</a></div>`;
  const row = ({ p, q, sub }) => `<li class="cart-row" data-id="${E(p.id)}">
    <div class="cart-row__img" aria-hidden="true">${E(p.emoji || "🍰")}</div>
    <div class="cart-row__info"><h3>${E(p.name)}</h3><span class="muted">${C.money(C.price(p))} each</span></div>
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
    const m = C.meta(), today = new Date().toISOString().slice(0, 10);
    root.innerHTML = `
    ${state.gone.length ? `<p class="notice">Some items in your cart are no longer on the menu and were left out.</p>` : ""}
    <div class="cart">
      <ul class="cart-list">${state.lines.map(row).join("")}</ul>
      <aside class="cart-side card"><div class="card__body">
        <h2>Order summary</h2>
        <p class="cart-total"><span>Total</span><strong id="cart-total">${C.money(state.total)}</strong></p>
        <p class="muted small">Prices are as listed. We confirm availability and the final price on WhatsApp.</p>
        <div class="form">
          <label for="c-name">Your name</label><input id="c-name" autocomplete="name" value="${E(m.name || "")}">
          <label for="c-date">Date you need it <span class="muted">(optional)</span></label><input id="c-date" type="date" min="${today}" value="${E(m.dateISO || "")}">
          <label for="c-method">Collection or delivery</label>
          <select id="c-method">${["Not sure yet", "Collection", "Delivery"].map(o => `<option${(m.method || "Not sure yet") === o ? " selected" : ""}>${o}</option>`).join("")}</select>
          <label for="c-notes">Notes <span class="muted">(optional)</span></label><textarea id="c-notes" rows="3" placeholder="Allergies, message on the cake, anything we should know">${E(m.notes || "")}</textarea>
        </div>
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
    const meta = { name: v("c-name").trim(), date, method: v("c-method"), notes: v("c-notes").trim() };
    C.meta({ name: meta.name, dateISO: dISO, method: meta.method, notes: meta.notes });
    if (!biz.whatsappLink) { a.href = "contact.html"; a.removeAttribute("target"); return; }
    a.href = biz.whatsappLink + "?text=" + encodeURIComponent(C.message(state.lines, state.total, biz, meta));
  };

  const refresh = async () => { state = await C.lines(); draw(); };
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
