/* thanks.js (v10.19.1): the page after an order is sent. Shows what was just sent (kept only in this browser tab, never read from the database). */
/* v10.26: "How to pay" box (EFT / SnapScan / Capitec Pay). Only shown once Becca has typed her real details (SB.payInfo returns null while they are the empty placeholder). Never sent anywhere: it only reads settings. */
function payBox(pi, o, esc) {
  if (!pi) return "";
  const ref = (o.name || "").trim() || "your name", row = (k, v, copy) => `<tr><th scope="row">${k}</th><td>${esc(v)}${copy ? ` <button class="btn btn--sm btn--ghost" type="button" data-copy="${esc(v)}">Copy</button>` : ""}</td></tr>`;
  const rows = pi.bank ? row("Bank", pi.bank.bank) + row("Account name", pi.bank.holder) + row("Account number", pi.bank.number, true) + (pi.bank.type ? row("Account type", pi.bank.type) : "") + (pi.bank.branch ? row("Branch code", pi.bank.branch) : "") : "";
  return `<div class="thanks__box thanks__pay"><h2>How to pay</h2>${pi.intro ? `<p><strong>${esc(pi.intro)}</strong></p>` : ""}
    ${rows ? `<p class="adm-sub">EFT</p><table class="thanks__tbl">${rows}</table>` : ""}
    ${pi.snap ? `<p><a class="btn btn--ghost" target="_blank" rel="noopener" href="${esc(pi.snap.link)}">Pay with SnapScan</a></p>` : ""}
    ${pi.cap ? `<p><strong>Capitec Pay:</strong> ${esc(pi.cap.cell)} <button class="btn btn--sm btn--ghost" type="button" data-copy="${esc(pi.cap.cell)}">Copy</button></p>` : ""}
    <p>Payment reference: <strong>${esc(ref)}</strong> <button class="btn btn--sm btn--ghost" type="button" data-copy="${esc(ref)}">Copy</button></p>
    ${pi.note ? `<p class="muted">${esc(pi.note)}</p>` : ""}<p class="thanks__msg" id="copy-msg" role="status" hidden></p></div>`;
}
document.addEventListener("click", e => {   // v10.26: Copy buttons in the How to pay box
  const b = e.target.closest && e.target.closest("[data-copy]"); if (!b) return;
  const t = b.getAttribute("data-copy"), say = ok => { const m = document.getElementById("copy-msg"); if (m) { m.textContent = ok ? "Copied: " + t : "Could not copy. Please type it in."; m.hidden = false; } };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(() => say(true), () => say(false)); else say(false);
});
/* v10.26.3: "Can't reach Becca?" button: the same order, typed out for the backup WhatsApp number. Only shown when backupWhatsapp is set in config/business.json. */
function backupBtn(biz, o) {
  const msg = ["Hi! I sent an order on The Sweetest Bakery website but could not reach " + ((biz.owner || "Becca").split(" ")[0]) + " on WhatsApp.", o.name ? "Name: " + o.name : "", o.date ? "Needed for: " + o.date : "", "", ...(o.items || []).map(i => "- " + i), o.total ? "Total: R " + Math.round(o.total) : "", o.method && o.method !== "Not sure yet" ? o.method : ""].filter((x, i, a) => x !== "" || (a[i - 1] !== "" && i < a.length - 1)).join("\n"), w = SB.backupWa(biz, msg);
  return w ? `<a class="btn btn--ghost" target="_blank" rel="noopener" href="${SB.esc(w.link)}">Can't reach ${SB.esc((biz.owner || "Becca").split(" ")[0])}? WhatsApp ${SB.esc(w.name)}</a>` : "";
}
SB.load().then(({ biz, settings }) => {
  const root = document.getElementById("thanks-root"), o = SB.lastOrder(), esc = SB.esc;
  if (!o) { root.innerHTML = `<h1>Thank you!</h1><p>If you have just sent an order, Becca will reply on WhatsApp to confirm it.</p><p><a class="btn" href="menu.html">Back to the menu</a></p>`; return; }
  const when = o.date ? ` for <strong>${esc(o.date)}</strong>` : "";
  root.innerHTML = `<h1>Thank you${o.name ? ", " + esc(o.name.split(" ")[0]) : ""}! &#127856;</h1>
    <p>Your ${o.source === "custom" ? "custom cake request" : "order"} is saved${when}. <strong>It is not confirmed yet:</strong> Becca replies on WhatsApp to confirm it and the price. If WhatsApp did not open, or you did not press send there, use the button below (it brings your order text with it).</p>
    <div class="thanks__box"><h2>What you sent</h2><ul>${(o.items || []).map(i => `<li>${esc(i)}</li>`).join("")}</ul>${o.total ? `<p><strong>Total: R ${esc(Math.round(o.total))}</strong></p>` : ""}${o.method && o.method !== "Not sure yet" ? `<p class="muted">${esc(o.method)}</p>` : ""}</div>
    ${payBox(SB.payInfo(settings.payment), o, esc)}
    <p class="thanks__actions">${biz.whatsappLink ? `<a class="btn btn--whatsapp" target="_blank" rel="noopener" href="${esc(biz.whatsappLink + (o.wa ? "?text=" + encodeURIComponent(o.wa) : ""))}">Open WhatsApp</a>` : ""}${backupBtn(biz, o)}<a class="btn btn--ghost" href="menu.html">Back to the menu</a><a class="btn btn--ghost" href="account.html">My account</a></p>
    ${o.source === "custom" ? `<p><a class="btn btn--ghost" href="custom-orders.html">Make another custom request</a></p>` : ""}`;
});
