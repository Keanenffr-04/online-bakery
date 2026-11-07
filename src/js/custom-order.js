/* custom-order.js (v10.2): the Custom Order form. Checks the required fields and opens WhatsApp
   with the whole request already typed in. Business number comes from config/business.json via SB.load(). */
SB.load().then(({ biz }) => {
  const f = document.getElementById("co-form"), err = document.getElementById("co-error"); if (!f) return;
  document.getElementById("co-phone-wrap").innerHTML = SB.phoneField("co-phone", { label: "Your phone number" });
  const date = f.elements.date; date.min = new Date().toISOString().slice(0, 10);
  const nice = iso => new Date(iso + "T12:00").toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const show = (msg, el) => { err.textContent = msg; err.hidden = !msg; if (el) el.focus(); };

  f.addEventListener("input", () => { if (!err.hidden) show(""); });
  f.addEventListener("submit", e => {
    e.preventDefault();
    const v = n => f.elements[n].value.trim();
    const need = [["name", "your name"], ["occasion", "the occasion"], ["date", "the date you need it"], ["servings", "how many servings"]];
    for (const [n, label] of need) if (!v(n)) return show(`Please add ${label}.`, f.elements[n]);
    if (v("date") < date.min) return show("Please choose a date from today onwards.", date);
    const s = Number(v("servings")); if (!(s >= 1 && s <= 1000)) return show("Servings should be a number between 1 and 1000.", f.elements.servings);

    const ph = SB.phoneRead("co-phone"); if (ph.error) return show(ph.error, document.getElementById("co-phone"));
    const owner = (biz.owner || "").split(" ")[0] || "there", L = [];
    L.push(`Hi ${owner}! I'd like to ask about a custom order from ${biz.name || "The Sweetest Bakery"}:`, "");
    L.push(`Name: ${v("name")}`, ...(ph.display ? [`Phone: ${ph.display}`] : []), `Occasion: ${v("occasion")}`, `Date needed: ${nice(v("date"))}`, `What: ${v("what")}`, `Servings: ${s}`);
    if (v("method") !== "Not sure yet") L.push(`Collection or delivery: ${v("method")}`);
    if (v("flavours")) L.push(`Flavours: ${v("flavours")}`);
    if (v("diet")) L.push(`Allergies or dietary needs: ${v("diet")}`);
    if (v("notes")) L.push(`Notes: ${v("notes")}`);
    L.push("", "Please let me know if you can do it and what it would cost. Thank you!");
    show("");
    if (!biz.whatsappLink) { location.href = "contact.html"; return; }
    window.open(biz.whatsappLink + "?text=" + encodeURIComponent(L.join("\n")), "_blank", "noopener");
  });
});
