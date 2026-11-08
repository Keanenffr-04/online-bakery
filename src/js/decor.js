/* decor.js (v10.7, reworked v10.8): small moving decorations for the SPECIAL-OCCASION themes only (Christmas, Valentine's, Easter,
   Halloween, Braai Day, Mother's Day, Father's Day). Classic, Cocoa and Pastel never get any.
   One fixed, click-through layer covers the whole screen: a few big faint shapes (the "background") plus smaller, clearer ones
   that fall, rise or wander around. Only CSS transforms are animated, so it is light.
   v10.8: they ALWAYS move (they used to freeze when the visitor's device had "reduce motion" on, which looked like a bug).
   Instead a small Pause/Play button (bottom-left) lets any visitor stop them; the choice is remembered on that device.
   The owner switches them off for everyone in Admin > Theme & layout (settings.decorations). The admin also uses SBDecor to
   draw its little live preview box.
   To change a theme's decorations edit SETS: [emoji, how it moves, how many].  Moves: fall | rise | wander. */
(function () {
  const SETS = {
    christmas:  [["\u2744\uFE0F", "fall", 9], ["\u2B50", "wander", 3], ["\uD83C\uDF84", "wander", 2], ["\uD83C\uDF81", "wander", 2], ["\u2744\uFE0F", "wander", 2]],
    valentines: [["\u2764\uFE0F", "rise", 7], ["\uD83D\uDC95", "rise", 4], ["\uD83C\uDF39", "wander", 2], ["\uD83D\uDC8C", "wander", 2]],
    easter:     [["\uD83E\uDD5A", "wander", 4], ["\uD83D\uDC23", "wander", 2], ["\uD83E\uDD8B", "wander", 3], ["\uD83C\uDF37", "fall", 3], ["\uD83D\uDC30", "wander", 1]],
    halloween:  [["\uD83C\uDF83", "wander", 3], ["\uD83E\uDD87", "wander", 5], ["\uD83D\uDC7B", "wander", 3], ["\uD83C\uDF6C", "fall", 3]],
    braai:      [["\uD83D\uDD25", "rise", 4], ["\u2728", "rise", 6], ["\uD83E\uDD69", "wander", 2], ["\uD83C\uDF3D", "wander", 2], ["\uD83C\uDF56", "wander", 1]],
    mothers:    [["\uD83C\uDF38", "fall", 8], ["\uD83D\uDC90", "wander", 2], ["\uD83E\uDD8B", "wander", 2], ["\uD83D\uDC9C", "rise", 3]],
    fathers:    [["\uD83D\uDC54", "wander", 3], ["\uD83C\uDFC6", "wander", 2], ["\uD83D\uDD27", "wander", 2], ["\u26BD", "wander", 2], ["\uD83C\uDFA3", "wander", 2], ["\u2B50", "rise", 3]],
    newyear:    [["\uD83C\uDF89", "wander", 3], ["\uD83E\uDD42", "wander", 2], ["\u2728", "rise", 6], ["\uD83C\uDF86", "wander", 2], ["\u2B50", "fall", 4]],
    womens:     [["\uD83C\uDF37", "fall", 6], ["\uD83D\uDC9C", "rise", 4], ["\u2728", "rise", 4], ["\uD83E\uDD8B", "wander", 3]],
    blackfriday:[["\uD83D\uDECD\uFE0F", "wander", 3], ["\uD83C\uDFF7\uFE0F", "wander", 3], ["\uD83D\uDDA4", "rise", 4], ["\uD83C\uDF81", "wander", 2], ["\u2B50", "fall", 3]],
    diwali:     [["\uD83E\uDE94", "wander", 4], ["\u2728", "rise", 7], ["\uD83C\uDF86", "wander", 2], ["\uD83C\uDF3C", "fall", 4]],
    eid:        [["\uD83C\uDF19", "wander", 3], ["\u2B50", "rise", 5], ["\u2728", "rise", 5], ["\uD83C\uDFEE", "wander", 2]]
  };
  const r = (a, b) => a + Math.random() * (b - a), p = n => Math.round(n * 10) / 10;

  // One decoration. All positions are plain numbers; the CSS multiplies them by --uw / --uh (1% of the width / height of the screen,
  // or of the little preview box), so the same code works full-page and inside the admin preview.
  const item = (e, mode, size, o, t) => {
    const v = { x: p(r(2, 96)), y: p(r(2, 92)), s: p(size) + "px", o: p(o * 100) / 100, t: p(t) + "s", d: "-" + p(r(0, t)) + "s", sw: p(r(-9, 9)), rot: Math.round(r(-300, 300)) + "deg" };
    for (let i = 1; i <= 3; i++) { v["dx" + i] = Math.round(r(-22, 22)); v["dy" + i] = Math.round(r(-22, 22)); }
    return `<span class="deco__i deco__i--${mode}" style="${Object.entries(v).map(([k, x]) => `--${k}:${x}`).join(";")}">${e}</span>`;
  };
  // opts.phone = fewer items; opts.scale = size multiplier (the admin preview box uses a small one).
  const html = (theme, opts = {}) => {
    const set = SETS[theme]; if (!set) return "";
    const cut = opts.phone ? 0.55 : 1, k = opts.scale || 1, out = [];
    for (let i = 0; i < (opts.phone ? 2 : 3); i++) out.push(item(set[0][0], "wander", r(95, 150) * k, r(0.07, 0.11), r(55, 85)));   // faint, slow "background" shapes
    set.forEach(([e, mode, n]) => { for (let i = 0; i < Math.max(1, Math.round(n * cut)); i++) out.push(item(e, mode, r(15, 32) * k, r(0.5, 0.8), r(mode === "wander" ? 26 : 14, mode === "wander" ? 52 : 30))); });
    return out.join("");
  };
  window.SBDecor = { SETS, has: t => !!SETS[t], html };

  // Pause / Play button: anyone can stop the movement (kinder for people who find motion distracting). Remembered on this device.
  const PAUSE_KEY = "sb_deco_paused";
  const getPaused = () => { try { return localStorage.getItem(PAUSE_KEY) === "1"; } catch (e) { return false; } };
  const ICON = { pause: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>', play: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8 5.5v13l11-6.5z"/></svg>' };

  if (document.body && document.body.hasAttribute("data-no-deco")) return;   // admin page: it only uses SBDecor.html for its preview box
  window.SB && SB.load().then(({ settings: s, themeNow }) => {
    const theme = themeNow || s.theme;
    if (!SETS[theme] || s.decorations === false || document.querySelector(".deco")) return;
    const layer = document.createElement("div");
    layer.className = "deco"; layer.setAttribute("aria-hidden", "true");
    layer.innerHTML = html(theme, { phone: matchMedia("(max-width:859px)").matches });
    document.body.append(layer);
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "deco-toggle";
    const apply = paused => {
      layer.classList.toggle("deco--paused", paused);
      btn.setAttribute("aria-pressed", String(!paused)); btn.setAttribute("aria-label", paused ? "Play the moving decorations" : "Pause the moving decorations");
      btn.title = paused ? "Play decorations" : "Pause decorations"; btn.innerHTML = paused ? ICON.play : ICON.pause;
    };
    apply(getPaused());
    btn.addEventListener("click", () => { const now = !layer.classList.contains("deco--paused"); try { localStorage.setItem(PAUSE_KEY, now ? "1" : "0"); } catch (e) { /* ignore */ } apply(now); });
    document.body.append(btn);
  });
})();
