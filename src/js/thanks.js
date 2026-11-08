/* thanks.js (v10.19.1): the page after an order is sent. Shows what was just sent (kept only in this browser tab, never read from the database). */
SB.load().then(({ biz }) => {
  const root = document.getElementById("thanks-root"), o = SB.lastOrder(), esc = SB.esc;
  if (!o) { root.innerHTML = `<h1>Thank you!</h1><p>If you have just sent an order, Becca will reply on WhatsApp to confirm it.</p><p><a class="btn" href="menu.html">Back to the menu</a></p>`; return; }
  const when = o.date ? ` for <strong>${esc(o.date)}</strong>` : "";
  root.innerHTML = `<h1>Thank you${o.name ? ", " + esc(o.name.split(" ")[0]) : ""}! &#127856;</h1>
    <p>Your ${o.source === "custom" ? "custom cake request" : "order"} is saved${when}. <strong>It is not confirmed yet:</strong> Becca replies on WhatsApp to confirm it and the price. If WhatsApp did not open, or you did not press send there, use the button below.</p>
    <div class="thanks__box"><h2>What you sent</h2><ul>${(o.items || []).map(i => `<li>${esc(i)}</li>`).join("")}</ul>${o.total ? `<p><strong>Total: R ${esc(Math.round(o.total))}</strong></p>` : ""}${o.method && o.method !== "Not sure yet" ? `<p class="muted">${esc(o.method)}</p>` : ""}</div>
    <p class="thanks__actions">${biz.whatsappLink ? `<a class="btn btn--whatsapp" target="_blank" rel="noopener" href="${esc(biz.whatsappLink)}">Open WhatsApp</a>` : ""}<a class="btn btn--ghost" href="menu.html">Back to the menu</a><a class="btn btn--ghost" href="account.html">My account</a></p>
    ${o.source === "cart" && (o.lines || []).length ? `<p><button class="btn btn--ghost" id="again" type="button">Order the same again</button> <span class="muted">Puts these items back in your cart.</span></p><p class="thanks__msg" id="again-msg" role="status" hidden></p>` : ""}${o.source === "custom" ? `<p><a class="btn btn--ghost" href="custom-orders.html">Make another custom request</a></p>` : ""}
    ${o.source === "cart" && window.SBCart && window.SBCart.count && window.SBCart.count() ? `<p><button class="btn btn--ghost" id="clear-cart" type="button">Empty my cart</button> <span class="muted">Your cart still holds these items.</span></p>` : ""}`;
  const again = document.getElementById("again");   // v10.22: Order again. Replaces the cart with the same items (so nothing doubles if the cart still holds them); skips items that are gone or sold out today.
  if (again) again.addEventListener("click", async () => {
    const { shownProducts } = await SB.load(), msg = document.getElementById("again-msg"); let added = 0, missed = 0;
    const ok = [];
    (o.lines || []).forEach(l => { const p = shownProducts.find(x => x.id === l.id); if (p && !SB.isSoldOut(p)) ok.push([p.id, l.q]); else missed++; });
    if (ok.length) { window.SBCart.clear(); ok.forEach(([id, q]) => { window.SBCart.add(id, q); added++; }); }   // the cart is only replaced when at least one item can be added
    msg.innerHTML = added ? `${added} ${added === 1 ? "item" : "items"} back in your cart.${missed ? " " + missed + " could not be added (no longer on the menu or sold out today)." : ""} <a href="cart.html">Go to your cart</a>` : `Those items are not available any more. <a href="menu.html">Have a look at the menu</a>`;
    msg.hidden = false; const cc = document.getElementById("clear-cart"); if (cc) cc.closest("p").remove();
  });
  const b = document.getElementById("clear-cart"); if (b) b.addEventListener("click", () => { window.SBCart.clear(); b.closest("p").remove(); });
});
