/* thanks.js (v10.19.1): the page after an order is sent. Shows what was just sent (kept only in this browser tab, never read from the database). */
SB.load().then(({ biz }) => {
  const root = document.getElementById("thanks-root"), o = SB.lastOrder(), esc = SB.esc;
  if (!o) { root.innerHTML = `<h1>Thank you!</h1><p>If you have just sent an order, Becca will reply on WhatsApp to confirm it.</p><p><a class="btn" href="menu.html">Back to the menu</a></p>`; return; }
  const when = o.date ? ` for <strong>${esc(o.date)}</strong>` : "";
  root.innerHTML = `<h1>Thank you${o.name ? ", " + esc(o.name.split(" ")[0]) : ""}! &#127856;</h1>
    <p>Your ${o.source === "custom" ? "custom cake request" : "order"} is saved${when}. <strong>It is not confirmed yet:</strong> Becca replies on WhatsApp to confirm it and the price. If WhatsApp did not open, or you did not press send there, use the button below.</p>
    <div class="thanks__box"><h2>What you sent</h2><ul>${(o.items || []).map(i => `<li>${esc(i)}</li>`).join("")}</ul>${o.total ? `<p><strong>Total: R ${esc(Math.round(o.total))}</strong></p>` : ""}${o.method && o.method !== "Not sure yet" ? `<p class="muted">${esc(o.method)}</p>` : ""}</div>
    <p class="thanks__actions">${biz.whatsappLink ? `<a class="btn btn--whatsapp" target="_blank" rel="noopener" href="${esc(biz.whatsappLink)}">Open WhatsApp</a>` : ""}<a class="btn btn--ghost" href="menu.html">Back to the menu</a><a class="btn btn--ghost" href="account.html">My account</a></p>
    ${o.source === "cart" && window.SBCart && window.SBCart.count && window.SBCart.count() ? `<p><button class="btn btn--ghost" id="clear-cart" type="button">Empty my cart</button> <span class="muted">Your cart still holds these items.</span></p>` : ""}`;
  const b = document.getElementById("clear-cart"); if (b) b.addEventListener("click", () => { window.SBCart.clear(); b.closest("p").remove(); });
});
