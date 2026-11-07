/* decor.js (v10.7): small moving decorations for the SPECIAL-OCCASION themes only (Christmas, Valentine's, Easter, Halloween,
   Braai Day, Mother's Day, Father's Day). The classic, cocoa and pastel themes never get any.
   One fixed, click-through layer covers the whole screen: a few big faint shapes (the "background") plus smaller, clearer ones
   that fall, rise or wander around. Only CSS transforms are animated, so it is light. With "reduce motion" switched on in the
   visitor's device they stay still. The owner can switch them off in Admin > Theme & layout (settings.decorations).
   To change a theme's decorations edit SETS below: [emoji, how it moves, how many].  Moves: fall | rise | wander. */
(function () {
  const SETS = {
    christmas:  [["\u2744\uFE0F", "fall", 9], ["\u2B50", "wander", 3], ["\uD83C\uDF84", "wander", 2], ["\uD83C\uDF81", "wander", 2], ["\u2744\uFE0F", "wander", 2]],
    valentines: [["\u2764\uFE0F", "rise", 7], ["\uD83D\uDC95", "rise", 4], ["\uD83C\uDF39", "wander", 2], ["\uD83D\uDC8C", "wander", 2]],
    easter:     [["\uD83E\uDD5A", "wander", 4], ["\uD83D\uDC23", "wander", 2], ["\uD83E\uDD8B", "wander", 3], ["\uD83C\uDF37", "fall", 3], ["\uD83D\uDC30", "wander", 1]],
    halloween:  [["\uD83C\uDF83", "wander", 3], ["\uD83E\uDD87", "wander", 5], ["\uD83D\uDC7B", "wander", 3], ["\uD83C\uDF6C", "fall", 3]],
    braai:      [["\uD83D\uDD25", "rise", 4], ["\u2728", "rise", 6], ["\uD83E\uDD69", "wander", 2], ["\uD83C\uDF3D", "wander", 2], ["\uD83C\uDF56", "wander", 1]],
    mothers:    [["\uD83C\uDF38", "fall", 8], ["\uD83D\uDC90", "wander", 2], ["\uD83E\uDD8B", "wander", 2], ["\uD83D\uDC9C", "rise", 3]],
    fathers:    [["\uD83D\uDC54", "wander", 3], ["\uD83C\uDFC6", "wander", 2], ["\uD83D\uDD27", "wander", 2], ["\u26BD", "wander", 2], ["\uD83C\uDFA3", "wander", 2], ["\u2B50", "rise", 3]]
  };
  const r = (a, b) => a + Math.random() * (b - a), p = n => Math.round(n * 10) / 10;

  const build = (set, phone) => {
    const cut = phone ? 0.55 : 1, out = [];
    // The "background": a few big, very faint, slow copies of the theme's main emoji.
    for (let i = 0; i < (phone ? 2 : 3); i++) out.push(item(set[0][0], "wander", r(95, 150), r(0.07, 0.11), r(55, 85)));
    set.forEach(([e, mode, n]) => { for (let i = 0; i < Math.max(1, Math.round(n * cut)); i++) out.push(item(e, mode, r(15, 32), r(0.5, 0.8), r(mode === "wander" ? 26 : 14, mode === "wander" ? 52 : 30))); });
    return out.join("");
  };
  // One decoration. --x/--yv = where it starts, --t = seconds per loop, --d = negative delay so the page is already "busy" on load.
  const item = (e, mode, size, o, t) => {
    const v = { x: p(r(2, 96)) + "%", yv: p(r(2, 92)) + "vh", s: p(size) + "px", o: p(o * 100) / 100, t: p(t) + "s", d: "-" + p(r(0, t)) + "s", sw: p(r(-9, 9)) + "vw", rot: Math.round(r(-300, 300)) + "deg" };
    for (let i = 1; i <= 3; i++) { v["dx" + i] = Math.round(r(-22, 22)) + "vw"; v["dy" + i] = Math.round(r(-22, 22)) + "vh"; }
    return `<span class="deco__i deco__i--${mode}" style="${Object.entries(v).map(([k, x]) => `--${k}:${x}`).join(";")}">${e}</span>`;
  };

  window.SB && SB.load().then(({ settings: s }) => {
    const set = SETS[s.theme];
    if (!set || s.decorations === false || document.querySelector(".deco")) return;
    const layer = document.createElement("div");
    layer.className = "deco"; layer.setAttribute("aria-hidden", "true");
    layer.innerHTML = build(set, matchMedia("(max-width:859px)").matches);
    document.body.append(layer);
  });
})();
