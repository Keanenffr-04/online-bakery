/* custom-order.js (v10.2): the Custom Order form. Checks the required fields and opens WhatsApp
   with the whole request already typed in. Business number comes from config/business.json via SB.load(). */
SB.load().then(async ({ biz, settings }) => {
  const f = document.getElementById("co-form"), err = document.getElementById("co-error"); if (!f) return;
  // v10.13: details remembered on this device (name, phone, collection/delivery, allergies) are filled in; the tick box sits above the button.
  const me = SB.me.get(), mine = me.remember !== false ? me : {};
  document.getElementById("co-phone-wrap").innerHTML = SB.phoneField("co-phone", { label: "Your phone number", value: mine.phone || "" });
  if (mine.name) f.elements.name.value = mine.name;
  if (mine.method && [...f.elements.method.options].some(o => o.value === mine.method || o.text === mine.method)) f.elements.method.value = mine.method;
  if (mine.diet) f.elements.diet.value = mine.diet;
  const sendBtn = document.getElementById("co-send"); sendBtn.insertAdjacentHTML("beforebegin", SB.me.box("co-remember"));
  f.addEventListener("click", e => { if (e.target.closest("[data-forget]")) { SB.me.forget(); f.elements.name.value = ""; f.elements.diet.value = ""; document.getElementById("co-phone").value = ""; f.elements.method.value = "Not sure yet"; e.target.closest("[data-forget]").hidden = true; } });
  const cal = settings.calendar, dl = settings.delivery, booked = await SB.bookedDates();   // v10.21: order calendar + delivery fees
  const date = f.elements.date, calOn = cal.enabled !== false, days = calOn ? Math.max(0, +cal.customDays || 0) : 0;
  date.min = (() => { const d = new Date(SB.today() + "T12:00"); d.setDate(d.getDate() + days); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); })();
  const dnote = document.getElementById("co-date-note"); if (calOn && days) { dnote.textContent = "Custom orders need " + days + (days === 1 ? " day" : " days") + " notice."; dnote.hidden = false; }
  const dmsg = () => { const m = SB.dateMsg(date.value, "custom", cal, booked), el = document.getElementById("co-date-msg"); el.textContent = m; el.hidden = !m; return m; };
  date.addEventListener("change", dmsg);
  // Delivery area: only shown for Delivery, and only when Becca has set up areas.
  const areaOn = dl.enabled !== false && (dl.areas || []).length > 0, areaSel = f.elements.area, areaWrap = document.getElementById("co-area-wrap");
  if (areaOn) areaSel.innerHTML = `<option value="">Choose your area&hellip;</option>` + dl.areas.map(a => `<option value="${SB.esc(a.name)}">${SB.esc(a.name)} (from R ${Math.round(+a.fee || 0)})</option>`).join("");
  const areaDraw = () => { const on = areaOn && f.elements.method.value === "Delivery"; areaWrap.hidden = !on; document.getElementById("co-area-note").textContent = on ? "Becca confirms the final delivery fee with your quote." : ""; };
  const addrWrap = document.getElementById("co-addr-wrap"), addrDraw = () => { addrWrap.hidden = f.elements.method.value !== "Delivery"; };   // v10.26.6: any Delivery needs an address
  f.elements.method.addEventListener("change", () => { areaDraw(); addrDraw(); }); areaDraw(); addrDraw();
  // v10.22: cake price guide. Pick a size and flavour, see an estimate, press "Use this in my request" to fill the form. Sample prices show a Draft tag.
  const pg = settings.priceGuide || {}, gBox = document.getElementById("co-guide"); let used = null;
  if (pg.enabled !== false && (pg.sizes || []).length) {
    const sizes = pg.sizes, fl = pg.flavours || [], money = n => "R " + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    gBox.innerHTML = `<div class="card__body"><h2 id="co-guide-h">Cake price guide ${pg.draft ? `<span class="faq__draft">Sample prices, to be confirmed by Becca</span>` : ""}</h2>
      <p class="muted">Not sure what to ask for? Choose a size and flavour to see a rough price.</p>
      <div class="form__row"><div><label for="g-size">Size</label><select id="g-size">${sizes.map((z, i) => `<option value="${i}">${SB.esc(z.name)}, serves about ${Math.round(+z.serves || 1)}</option>`).join("")}</select></div>
      ${fl.length ? `<div><label for="g-flav">Flavour</label><select id="g-flav">${fl.map((x, i) => `<option value="${i}">${SB.esc(x.name)}${+x.extra ? " (+" + money(Math.round(+x.extra)) + ")" : ""}</option>`).join("")}</select></div>` : ""}</div>
      <p class="guide__price" id="g-out" role="status" aria-live="polite"></p>
      <p class="muted small">${SB.esc(pg.note || "")}</p>
      <button class="btn btn--ghost" type="button" id="g-use">Use this in my request</button> <span class="muted small" id="g-done" role="status" hidden>Added to the form below.</span></div>`;
    gBox.hidden = false;
    const pick = () => SB.guidePrice(pg, +document.getElementById("g-size").value, fl.length ? +document.getElementById("g-flav").value : -1);
    const draw = () => { const g = pick(); document.getElementById("g-out").innerHTML = g ? `Estimated price: <strong>${money(g.price)}</strong> <span class="muted">(${SB.esc(g.size)}${g.flavour ? ", " + SB.esc(g.flavour) : ""})</span>` : ""; document.getElementById("g-done").hidden = true; used = null; };
    gBox.addEventListener("change", draw); draw();
    document.getElementById("g-use").addEventListener("click", () => {
      const g = pick(); if (!g) return; used = g;
      f.elements.what.value = "Cake"; f.elements.servings.value = g.serves; if (g.flavour) f.elements.flavours.value = g.flavour;
      document.getElementById("g-done").hidden = false; show(""); f.scrollIntoView({ behavior: "smooth", block: "start" }); f.elements.name.focus({ preventScroll: true });
    });
  }
  const nice = iso => new Date(iso + "T12:00").toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const show = (msg, el) => { err.textContent = msg; err.hidden = !msg; if (el) el.focus(); };

  f.addEventListener("input", () => { if (!err.hidden) show(""); });
  window.addEventListener("pageshow", e => { if (e.persisted) { sendBtn.disabled = false; sendBtn.textContent = "Send on WhatsApp"; } });   // v10.25: back button after sending
  f.addEventListener("submit", async e => {
    e.preventDefault();
    const v = n => f.elements[n].value.trim();
    const need = [["name", "your name"], ["occasion", "the occasion"], ["date", "the date you need it"], ["servings", "how many servings"]];
    for (const [n, label] of need) if (!v(n)) return show(`Please add ${label}.`, f.elements[n]);
    if (v("date") < SB.today()) return show("Please choose a date from today onwards.", date);
    { const m = dmsg(); if (m) return show(m, date); }   // v10.21: notice, closed days, blocked dates, daily limit
    const area = areaOn && v("method") === "Delivery" ? v("area") : ""; if (areaOn && v("method") === "Delivery" && !area) return show("Please choose your delivery area.", areaSel);
    const addr = v("method") === "Delivery" ? SB.addr.clean(v("addr")) : ""; if (v("method") === "Delivery" && !SB.addr.ok(addr)) return show(SB.addr.MSG, f.elements.addr);   // v10.26.6
    const s = Number(v("servings")); if (!(s >= 1 && s <= 1000)) return show("Servings should be a number between 1 and 1000.", f.elements.servings);

    const ph = SB.phoneRead("co-phone"); if (ph.error) return show(ph.error, document.getElementById("co-phone"));
    const owner = (biz.owner || "").split(" ")[0] || "there", L = [];
    L.push(`Hi ${owner}! I'd like to ask about a custom order from ${biz.name || "The Sweetest Bakery"}:`, "");
    L.push(`Name: ${v("name")}`, ...(ph.display ? [`Phone: ${ph.display}`] : []), `Occasion: ${v("occasion")}`, `Date needed: ${nice(v("date"))}`, `What: ${v("what")}`, `Servings: ${s}`);
    if (v("method") !== "Not sure yet") L.push(`Collection or delivery: ${v("method")}`);
    const fee = area ? SB.deliveryFee(dl, area, 0) : null; if (area) L.push(`Delivery area: ${area}${fee ? " (fee from R " + Math.round(fee.fee) + ")" : ""}`);
    if (addr) L.push(`Delivery address: ${addr}`);   // v10.26.6
    if (v("flavours")) L.push(`Flavours: ${v("flavours")}`);
    if (used) L.push(`Price guide estimate: R ${used.price} (${used.size}${used.flavour ? ", " + used.flavour : ""}). This is only a guide, please confirm.`);   // v10.22
    if (v("diet")) L.push(`Allergies or dietary needs: ${v("diet")}`);
    if (v("notes")) L.push(`Notes: ${v("notes")}`);
    const pf = f.elements.photo && f.elements.photo.files[0]; if (pf) L.push("Inspiration photo: I have one and will send it here too.");   // v10.25
    L.push("", "Please let me know if you can do it and what it would cost. Thank you!");
    show("");
    SB.me.commit("co-remember", { name: v("name"), phone: document.getElementById("co-phone").value.trim(), method: v("method"), diet: v("diet") });
    const fg = f.querySelector("[data-forget]"); if (fg) fg.hidden = !SB.me.has();
    if (!biz.whatsappLink) { location.href = "contact.html"; return; }
    const orderRow = { source: "custom", name: v("name").slice(0, 120), phone: ph.digits || "", items: ("Custom order: " + v("what") + " (" + v("occasion") + ", " + s + " servings)").slice(0, 3000), date: v("date"), details: { method: v("method"), ...(area || addr ? { delivery: { ...(area ? { area, fee: fee ? fee.fee : 0 } : {}), ...(addr ? { address: addr } : {}) } } : {}), flavours: v("flavours"), diet: v("diet"), notes: v("notes"), ...(used ? { guide: { size: used.size, flavour: used.flavour, estimate: used.price } } : {}) } };   // v10.17, guide v10.22
    window.open(biz.whatsappLink + "?text=" + encodeURIComponent(L.join("\n")), "_blank", "noopener");   // first, inside the tap, so the browser allows it
    // v10.25: shrink + upload the photo (if any), then save the order with its file name. Waits at most 9 s; a failed photo never blocks anything.
    sendBtn.disabled = true; sendBtn.textContent = pf ? "Saving your photo…" : "Sending…";
    const work = (async () => { let photo = null; if (pf && !SB.spam.bot()) photo = await SB.photo.upload(await SB.photo.shrink(pf)); return SB.saveOrder(photo ? { ...orderRow, details: { ...orderRow.details, photo } } : orderRow); })();
    SB.lastOrder({ source: "custom", name: v("name"), items: [v("what") + " (" + v("occasion") + ", " + s + " servings)", ...(used ? ["Price guide estimate: R " + used.price + " (" + used.size + (used.flavour ? ", " + used.flavour : "") + "), to be confirmed"] : [])], date: v("date"), total: null, method: area ? "Delivery to " + area : v("method"), address: addr });   // v10.19.1, address v10.26.6
    await Promise.all([Promise.race([work, new Promise(r => setTimeout(r, 9000))]), new Promise(r => setTimeout(r, 900))]);
    location.href = "thanks.html";
  });
});
