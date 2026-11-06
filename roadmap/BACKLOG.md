# Backlog (completed work)
Append-only. Never delete. Newest at the bottom.

## v1: Foundation (done)
1. Repo structure + README with working rules, `config/business.json`, `docs/` (BRAND, ARCHITECTURE, REFERENCES stub, AI_HANDOFF)
2. Roadmap + backlog system created; v2 to v6 planned

Notes: The two reference repos were NOT reviewed in v1 (no internet access during build). Moved to v2.

## v2: Research + theme foundation (done, 2026-11-06)
1. Reference research: `docs/REFERENCES.md` filled in. Partly done: owner repo v1 + 5 other sources reviewed at surface level; owner repo v2 could not be fetched, licences unverified (see "Still to do" there).
2. Theme system: `src/themes/base.css` + 3 token themes (`theme-classic.css`, `theme-cocoa.css`, `theme-pastel.css`) and `src/theme-preview.html` (logo, heading, buttons incl. WhatsApp, card per theme).

Notes: Themes only change tokens (colours, fonts, radius, shadow, spacing), per ARCHITECTURE.md. Logo in the preview is still the original JPEG (cropped by CSS); proper transparent logo is v3. Leftover review of reference repo v2 + licence checks moved to the Ideas Parking Lot.

## v3: Site skeleton and navigation (done, 2026-11-06)
1. Logo cleanup: `assets/logo/logo-light.png` (full logo, transparent, for light backgrounds), `logo-dark.png` (light ink, for dark backgrounds), `logo-mark.png` (arch + rabbit, used in the nav). Cropped out the dark frame and the name/phone lines (those live in `config/business.json`). Original kept as `logo-original.jpeg`. Still a raster trace of a JPEG: ask Becca for the original vector/PNG when possible.
2. Home page + sticky nav: `src/index.html` (hero, category tiles, featured placeholders, how to order, WhatsApp CTA), `src/css/site.css`, `src/js/site.js` (renders the shared header/footer from one NAV list, mobile menu, WhatsApp links from `config/business.json`). Mobile-first; hamburger below 1000px.

Notes: Added "Coming soon" placeholder pages for every nav item (cakes, cupcakes, cookies, bread, custom-orders, about, contact) so no link 404s; v4 and v6 replace them. Default theme is `classic` via `data-theme` on `<body>` (switcher is v5). `site.js` fetches `../config/business.json`, so serve the repo root (`python3 -m http.server`, open `/src/`); opened straight from disk the WhatsApp buttons fall back to the Contact page. Featured items are fake samples until v4.

## v4: Menu hub, decluttered home, admin (done, 2026-11-06)
Owner request (`Changes for next version.md`):
1. One **Menu** page (`src/menu.html`) with section filter buttons (All / Cakes / Small Treats / Bread) replaces the separate category pages and the long nav. Old `cakes.html`, `cupcakes.html`, `cookies.html`, `bread.html` now redirect to `menu.html?c=...`. Cleaner cards (name, one-line description, price, Order button). Products live in `src/data/products.json` (SAMPLE items and prices).
2. Home page cut down to hero + featured + one WhatsApp banner. Menu tiles and "How to order" removed from home (How to order now on Contact). Nav is Home, Menu, Custom Orders, About, Contact.
3. Admin (`src/admin.html`, footer "Staff login"): login + sign-up (sign-ups need approval), pending orders tracker with statuses, menu item editor, theme tester with live preview, home/menu layout options, add/remove admins, change own password/username, export files. Root admin `admin` / `admin1` (username fixed, password changeable; banner nags until changed).

Notes: still a static site, so admin data (accounts, orders, edits) is saved in the browser (localStorage) and is NOT real security or shared between devices. "Publish" tab exports `site-settings.json` / `products.json` to drop into the repo to make changes live. Real accounts/orders across devices need a backend (see Ideas Parking Lot). Floating WhatsApp button moved to v5.

## v5: Menu dropdown + hover style (done, 2026-11-06)
Owner request (`Changes for next version.md`, items 1 and 2):
1. Header menu is now a **dropdown at all times**: the Menu/Close button shows on every screen size and opens a panel under it (full width on phones, 290px panel on larger screens). Closes on Escape or a click elsewhere. Code: `src/js/site.js`, `src/css/site.css`.
2. **Hover style:** hovering (or keyboard-focusing) a menu item fills it with the theme's button colours and underlines it. Uses theme tokens only, so Classic is black/white, Cocoa is chocolate/cream, Pastel is pink. The current page keeps the accent colour until hovered.

Notes: the WhatsApp button inside the dropdown keeps its own green hover. Items 3 to 7 of the owner list are scheduled in the roadmap (v6 onward). The old v5 (floating WhatsApp + theme switcher) moved to after them.

## v6: Clicked menu colour + inverting buttons (done, 2026-11-06)
Owner request (`Changes for next version.md`, items 3 and 4):
3. **Clicked menu text** turns the theme's link colour while pressed, and the page you are on keeps that link colour in the dropdown. New theme token `--link` (Classic blue, Cocoa caramel, Pastel raspberry) in `src/themes/theme-*.css`; used in `src/css/site.css`.
4. **Buttons invert on hover:** filled buttons (See the menu, Order buttons) go white with coloured text; WhatsApp buttons go white with green text and green outline; outline ("ghost") buttons fill in. New theme token `--btn-invert-text` keeps the text readable on each theme. Code: `src/themes/base.css`. Applies to every `.btn` site-wide (including the one inside the dropdown) so buttons behave the same everywhere.

Notes: Hover tested on all three themes. Items 5 to 7 are still scheduled (v7 to v9).

## v7: Preview as a web page + Menu-only dropdown (done, 2026-11-06)
Owner request (`Changes for next version.md`, new list items 1 and 2):
1. **`preview.html` replaces `preview.bat`/`preview.ps1`.** Double-click it: it lists every page (Home, Menu with its sections, Custom Orders, About, Contact, Staff admin, Theme preview) and all links work. To make pages work when opened from disk (previously the Menu page was empty, "Fresh from the oven" vanished and WhatsApp buttons fell back to Contact) the data loader falls back to `src/js/offline-data.js` on `file://`. Also fixed two dead `#` buttons in `theme-preview.html` and added a "Back to the website" link there. Tested by crawling all 11 pages/URLs from `preview.html` over `file://` and over a web server: no dead links, no failed requests, no JS errors.
2. **Only "Menu" is a dropdown.** Home, Custom Orders, About and Contact are plain links in the header again; the old all-in-one dropdown and Menu/Close button are gone. "Menu" opens a panel with Full menu, Cakes, Small Treats, Bread (read from the product data). Opens on click/tap or keyboard, closes on Escape, outside click or tabbing away. v5 hover fill + underline and v6 link colour are kept (Menu shows the link colour when you are on the Menu page, and the current section is marked in the panel). WhatsApp us moved out of the nav into the header bar. Works on all 3 themes; checked at 320 to 1280px wide.

Notes: `preview.bat`/`.ps1` are removed from the repo but remain in git history (v6 and earlier) if ever wanted back. `offline-data.js` is a copy of the three data files and must be regenerated when they change (rule 8 in README, step 9 in AI_HANDOFF). The admin "Publish" export only produces the JSON files, so after dropping those into the repo the offline copy needs regenerating for the local preview to match (the hosted site is not affected). At exactly 320px wide (very old phones) the header links wrap to two rows; everything still works.

## v8: Baked-goods hero + menu List layout fix (done, 2026-11-06)
Owner request (`Changes for next version_1.md`, items 1 and 2):
1. **Second hero with a baked-goods background and a greeting.** New option **Hero style** in admin (Theme & layout): *Logo (rabbit)* (default, unchanged) or *Baked goods + greeting*. The new hero has a soft pattern of cookies, cupcakes and donuts (drawn in SVG, recoloured by each theme) behind a centred panel: "Good morning / afternoon / evening", a greeting headline the admin types in (new **Greeting** box, default "Welcome in, something sweet is baking."), the hero text, and the See the menu / WhatsApp buttons. Works on phones and all 3 themes. The Hero checkbox still hides whichever hero is selected.
2. **Menu layout "List" fixed.** Two causes found: (a) the admin preview opened on Home, where Menu layout shows no change, so it looked like it stayed grid; the preview now jumps to the Menu page when you change the layout (and to Home for hero changes). (b) A v7 side effect: after dropping a new `site-settings.json` into the project, the local `preview.html` still read its old `offline-data.js` copy (grid). The Publish tab now also downloads a matching `offline-data.js`. List rows are also tidier now (capped width instead of stretching the full page).

Tests: admin flow (hero style, greeting, hero checkbox, layout jump, save, real pages, Publish downloads) on file:// and http; v7 link crawl + dropdown checks re-run, all passing.

Notes: no photos yet, the pattern is drawn shapes (real photos stay in the Ideas Parking Lot). I could not reproduce List failing when the setting was applied normally on the Menu page, so if it still stays grid for you, tell me where you were looking (admin preview, saved site, or a published copy). Items 5 to 7 of the owner list are still scheduled.

## v9: Best sellers heading + specials strip (done, 2026-11-06)
Owner request (`Changes for next version.md`, items 1 and 2; items 3 and 4 pushed to the roadmap as v10):
1. **Heading changed.** The Home section "Fresh from the oven" is now **"Our best sellers"** (`src/index.html`; the preview.html blurb updated too). It still shows the products ticked "Show on home page" in admin.
2. **Specials strip at the very top of every page.** A thin scrolling ticker above the header, modelled on the offer strip on lovedbychrist.co.za (messages repeat and glide across, ticker stops while you hover). It uses the theme's button colours, so it is black on Classic, chocolate on Cocoa and pink on Pastel. The header stays sticky under it; the strip itself scrolls away with the page. Appears on every public page (Home, Menu and each section, Custom Orders, About, Contact), not on the admin login.
   - **Admin:** Theme & layout now has a **Specials strip** box: an on/off tick and a text box, one special per line (up to 6). The preview on the right updates as you type. Save to this device, then publish like every other setting.
   - **Data:** new `specials: { enabled, items[] }` in `config/site-settings.json` (and so in `src/js/offline-data.js`, regenerated). Default text is neutral placeholder wording ("Today's specials: ask Becca on WhatsApp" / "Custom cakes for every occasion, order online"), **no made-up prices or discounts**. Becca should replace it with the real specials.
   - **Code:** `src/js/site.js` (builds the strip), `src/css/site.css` (end of file), `src/js/store.js` (defaults + merge), `src/js/admin.js`.
   - **Accessibility:** with "reduce motion" turned on in the visitor's device, the ticker does not move and the messages sit centred and wrap instead; the duplicate copy used for the loop is hidden from screen readers.

Tests (headless browser, file://): strip is the first thing on all 9 public pages at 320, 390 and 1280px wide, loop group always wider than the screen, no sideways scroll, header sticks at the top when scrolling, all 3 themes checked, reduced-motion checked, admin on/off + typing updates the preview, and Save shows on real pages. No JS errors.

Notes: the very first paint has no strip and it appears a moment later, once the settings have loaded (it pushes the page down about 34px). A fix (reserving the space) can come later if it bothers anyone.

## v10: Orders strip at the bottom + floating WhatsApp button (done, 2026-11-06)
Owner request (`Changes for next version.md`, items 3 and 4, pushed from v9):
3. **Orders strip at the very bottom of every page.** Same scrolling ticker as the v9 specials strip, placed under the footer. Admin: Theme & layout has a new **Orders strip** box (on/off + one message per line, up to 6) with live preview. Default wording is neutral ("How to order: message Becca on WhatsApp" / "Tell us what you'd like, the date you need it and any notes"), no made-up lead times. New `orders: { enabled, items[] }` in `config/site-settings.json` (and the regenerated `offline-data.js`). Code: `src/js/site.js` (one shared strip builder for top and bottom), `src/css/site.css`, `src/js/store.js`, `src/js/admin.js`.
4. **One floating WhatsApp button; other WhatsApp buttons removed.** A round green WhatsApp button sits bottom-right on every public page (safe-area aware, grows slightly on hover, keyboard focusable, opens WhatsApp with the usual prefilled message; it falls back to the Contact page if the number is missing). Removed: header "WhatsApp us", both Home hero buttons, Home banner "Order on WhatsApp" (now a "How to order" link to Contact; text says to tap the green button), About and Custom Orders buttons (now "Contact us" links), and the footer number is plain text instead of a link. **Kept:** the WhatsApp button inside the Contact page, as asked. The reference site proverbsjewelery.co.za blocks automated access, so the button follows the common floating-button pattern (round, bottom-right, official WhatsApp glyph from Simple Icons, CC0) rather than copying that site exactly. Tell me if you want it bigger, on the left, or with a label.

Decision made without the owner: the small **Order** button on each product card was KEPT (not WhatsApp-branded, and it sends the product name to Becca). Easy to remove if not wanted (`SB.card` in `src/js/store.js`).

Tests (headless browser, file://): all 9 public pages at 320, 390 and 1280px wide: top strip first, bottom strip last, floating button present with a wa.me link and 16px from the corner, WhatsApp-green buttons only on Contact, no header button, no sideways scroll; 3 themes viewed; reduced motion; admin on/off + typing updates the preview and saves to real pages. No JS errors.

Notes: at the very bottom of a page the floating button sits over the end of the orders strip (the footer has extra bottom padding so it never covers footer text). `src/theme-preview.html` (a developer page) still shows a WhatsApp button as a style sample.
