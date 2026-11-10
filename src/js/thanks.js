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
/* v10.26.15: "Upload your proof of payment". Shown under How to pay (so only once Becca's payment details are in), for an order that has an id, on the live site only.
   The file goes to a private place only the bakery's admins can open (see supabase/setup.sql section 14); it is made smaller on the phone first (a PDF is sent as it is, max 2 MB). */
function proofBox(o, pi) {
  if (!pi || !o.id || location.protocol === "file:" || !((SB._biz || {}).supabase || {}).url) return "";
  return `<div class="thanks__box thanks__proof"><h2>Already paid? Upload your proof</h2><p>Add a screenshot, a photo or a PDF of your payment and Becca will see it next to your order. It is optional, and you can still send it on WhatsApp instead.</p>
    <p><input type="file" id="proof-file" accept="image/*,application/pdf" aria-label="Choose your proof of payment"></p>
    <p><button class="btn btn--sm" type="button" id="proof-send">Send proof of payment</button></p><p class="thanks__msg" id="proof-msg" role="status" aria-live="polite" hidden></p></div>`;
}
document.addEventListener("click", async e => {
  const b = e.target.closest && e.target.closest("#proof-send"); if (!b) return;
  const f = document.getElementById("proof-file"), m = document.getElementById("proof-msg"), o = SB.lastOrder(), say = t => { m.textContent = t; m.hidden = false; };
  if (!f.files || !f.files[0]) return say("Please choose a file first.");
  b.disabled = true; b.textContent = "Sending…";
  const r = await SB.proof.upload(f.files[0], o && o.id);
  b.disabled = false; b.textContent = "Send proof of payment";
  if (r.ok) { f.value = ""; say("Thank you! Your proof of payment was sent. Becca will see it next to your order. You can send another file if you need to."); } else say(r.why);
});
/* v10.26.3 / v10.26.14: the second WhatsApp number (backupWhatsapp in config/business.json, here Keanen). It started as "Can't reach Becca?"; since v10.26.14 it is a "Send a copy to <name> too" box that carries the WHOLE order message, so both of you have the full order without any paid service.
   A website cannot message two chats at once, so this is one extra tap by the customer. Orders are also saved online for both admins. Only shown when backupWhatsapp is set. */
function backupBtn(biz, o) {
  const owner = (biz.owner || "Becca").split(" ")[0], b = (biz || {}).backupWhatsapp || {}, who = String(b.name || "").trim() || "us";
  const msg = o.wa ? `Hi ${who}! \u{1F60A} This is a copy of the order I just sent to ${owner}, so you have it too:\n\n${o.wa}`
    : ["Hi! I sent an order on The Sweetest Bakery website to " + owner + " and wanted you to have a copy too.", o.name ? "Name: " + o.name : "", o.date ? "Needed for: " + o.date : "", "", ...(o.items || []).map(i => "- " + i), o.total ? "Total: R " + Math.round(o.total) : "", o.method && o.method !== "Not sure yet" ? o.method : "", o.address ? "Delivery address: " + o.address : ""].filter((x, i, a) => x !== "" || (a[i - 1] !== "" && i < a.length - 1)).join("\n");
  const w = SB.backupWa(biz, msg);
  return w ? `<div class="thanks__box thanks__copy"><h2>Send a copy to ${SB.esc(w.name)} too</h2><p>${SB.esc(owner)} will reply as soon as she can. If you also send a copy to ${SB.esc(w.name)}, a second person sees your order straight away and nothing gets missed. It is one more tap, and it is optional.</p><p><a class="btn btn--whatsapp" target="_blank" rel="noopener" href="${SB.esc(w.link)}">Send a copy to ${SB.esc(w.name)}</a></p></div>` : "";
}
SB.load().then(({ biz, settings }) => {
  const root = document.getElementById("thanks-root"), o = SB.lastOrder(), esc = SB.esc;
  if (!o) { root.innerHTML = `<h1>Thank you!</h1><p>If you have just sent an order, Becca will reply on WhatsApp to confirm it.</p><p><a class="btn" href="menu.html">Back to the menu</a></p>`; return; }
  const when = o.date ? ` for <strong>${esc(o.date)}</strong>` : "";
  root.innerHTML = `<h1>Thank you${o.name ? ", " + esc(o.name.split(" ")[0]) : ""}! &#127856;</h1>
    <p>Your ${o.source === "custom" ? "custom cake request" : "order"} is saved${when}. <strong>It is not confirmed yet:</strong> Becca replies on WhatsApp to confirm it and the price. If WhatsApp did not open, or you did not press send there, use the button below (it brings your order text with it).</p>
    <div class="thanks__box"><h2>What you sent</h2><ul>${(o.items || []).map(i => `<li>${esc(i)}</li>`).join("")}</ul>${o.total ? `<p><strong>Total: R ${esc(Math.round(o.total))}</strong></p>` : ""}${o.method && o.method !== "Not sure yet" ? `<p class="muted">${esc(o.method)}</p>` : ""}${o.address ? `<p class="muted">Deliver to: ${esc(o.address)}</p>` : ""}</div>
    ${backupBtn(biz, o)}
    ${payBox(SB.payInfo(settings.payment), o, esc)}
    ${proofBox(o, SB.payInfo(settings.payment))}
    <p class="thanks__actions">${biz.whatsappLink ? `<a class="btn btn--whatsapp" target="_blank" rel="noopener" href="${esc(biz.whatsappLink + (o.wa ? "?text=" + encodeURIComponent(o.wa) : ""))}">Open WhatsApp</a>` : ""}<a class="btn btn--ghost" href="menu.html">Back to the menu</a><a class="btn btn--ghost" href="account.html">My account</a></p>
    ${o.source === "custom" ? `<p><a class="btn btn--ghost" href="custom-orders.html">Make another custom request</a></p>` : ""}`;
});
