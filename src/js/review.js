/* review.js (v10.25): the public review form. A review is saved in the online database as "waiting" (table review_submissions, setup.sql section 12);
   it only reaches the website when an admin presses Approve. Anyone may add one, nobody can read them. Same spam traps as the order forms. */
SB.load().then(({ biz }) => {
  const f = document.getElementById("rv-form"), err = document.getElementById("rv-error"), done = document.getElementById("rv-done"), btn = document.getElementById("rv-send"); if (!f) return;
  const show = (m, el) => { err.textContent = m; err.hidden = !m; if (el) el.focus(); };
  f.addEventListener("input", () => { if (!err.hidden) show(""); });
  f.addEventListener("submit", async e => {
    e.preventDefault();
    const name = f.elements.name.value.trim(), text = f.elements.text.value.trim(), st = f.querySelector('input[name="stars"]:checked'), stars = st ? +st.value : null;
    if (name.length < 2) return show("Please add your name.", f.elements.name);
    if (text.length < 10) return show("Please write a little more (at least 10 letters).", f.elements.text);
    if (text.length > 600) return show("Please keep it under 600 letters.", f.elements.text);
    const c = (SB._biz || {}).supabase;
    if (!c || !c.url || !c.key || location.protocol === "file:") return show("Reviews can only be sent from the live website. Please try again there, or send your words to Becca on WhatsApp.");
    btn.disabled = true; btn.textContent = "Sending…";
    // A trapped form pretends to succeed (a bot learns nothing) but sends nothing.
    let ok = SB.spam.bot(f);
    if (!ok) {
      try {
        const ctl = new AbortController(), tm = setTimeout(() => ctl.abort(), 12000);
        const r = await fetch(c.url + "/rest/v1/review_submissions", { method: "POST", headers: { apikey: c.key, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify({ name: name.slice(0, 60), stars, text: text.slice(0, 600) }), signal: ctl.signal }); clearTimeout(tm);
        ok = r.ok; if (!ok) { btn.disabled = false; btn.textContent = "Send my review"; return show(r.status === 401 || r.status === 404 ? "Reviews are not switched on yet. Please try again later." : "Sorry, that did not go through. Please try again in a little while."); }
      } catch (x) { btn.disabled = false; btn.textContent = "Send my review"; return show("Sorry, we could not reach the website. Check your connection and try again."); }
    }
    f.hidden = true; done.hidden = false; done.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
