# Backlog (completed work)
Append-only. Never delete. Newest at the bottom. What is still to do is in [`ROADMAP.md`](ROADMAP.md).

## Contents: everything finished, one line per version
| Version | What was done | Date |
|---|---|---|
| [v1](#v1) | Foundation | 2026-11-06 |
| [v2](#v2) | Research + theme foundation | 2026-11-06 |
| [v3](#v3) | Site skeleton + navigation | 2026-11-06 |
| [v4](#v4) | Menu hub, decluttered home, admin | 2026-11-06 |
| [v5](#v5) | Menu dropdown + hover style | 2026-11-06 |
| [v6](#v6) | Clicked menu colour + inverting buttons | 2026-11-06 |
| [v7](#v7) | Preview as a web page + Menu-only dropdown | 2026-11-06 |
| [v8](#v8) | Baked-goods hero + menu List layout | 2026-11-06 |
| [v9](#v9) | Best sellers heading + specials strip | 2026-11-06 |
| [v10](#v10) | Orders strip at the bottom + floating WhatsApp button | 2026-11-06 |
| [v10.1](#v10-1) | Pinned strips + mobile menu | 2026-11-06 |
| [v10.2](#v10-2) | Cart + Custom Order form | 2026-11-06 |
| [v10.3](#v10-3) | FAQ + reviews | 2026-11-06 |
| [v10.4](#v10-4) | Dietary tags + filters, menu search | 2026-11-06 |
| [v10.5](#v10-5) | Instagram + Facebook footer, glass best-seller cards | 2026-11-07 |
| [v10.6](#v10-6) | Forgot password, phone country codes, occasion themes | 2026-11-07 |
| [v10.7](#v10-7) | Father's Day theme + moving occasion decorations | 2026-11-07 |
| [v10.8](#v10-8) | Decorations always move + Pause button, live preview in admin, tidy roadmap | 2026-11-07 |
| [v10.9](#v10-9) | Automatic seasonal themes + "New and popular" section on Home | 2026-11-07 |

Full details for each version follow, oldest first.

<a id="v1"></a>
## v1: Foundation (done)
1. Repo structure + README with working rules, `config/business.json`, `docs/` (BRAND, ARCHITECTURE, REFERENCES stub, AI_HANDOFF)
2. Roadmap + backlog system created; v2 to v6 planned

Notes: The two reference repos were NOT reviewed in v1 (no internet access during build). Moved to v2.

<a id="v2"></a>
## v2: Research + theme foundation (done, 2026-11-06)
1. Reference research: `docs/REFERENCES.md` filled in. Partly done: owner repo v1 + 5 other sources reviewed at surface level; owner repo v2 could not be fetched, licences unverified (see "Still to do" there).
2. Theme system: `src/themes/base.css` + 3 token themes (`theme-classic.css`, `theme-cocoa.css`, `theme-pastel.css`) and `src/theme-preview.html` (logo, heading, buttons incl. WhatsApp, card per theme).

Notes: Themes only change tokens (colours, fonts, radius, shadow, spacing), per ARCHITECTURE.md. Logo in the preview is still the original JPEG (cropped by CSS); proper transparent logo is v3. Leftover review of reference repo v2 + licence checks moved to the Ideas Parking Lot.

<a id="v3"></a>
## v3: Site skeleton and navigation (done, 2026-11-06)
1. Logo cleanup: `assets/logo/logo-light.png` (full logo, transparent, for light backgrounds), `logo-dark.png` (light ink, for dark backgrounds), `logo-mark.png` (arch + rabbit, used in the nav). Cropped out the dark frame and the name/phone lines (those live in `config/business.json`). Original kept as `logo-original.jpeg`. Still a raster trace of a JPEG: ask Becca for the original vector/PNG when possible.
2. Home page + sticky nav: `src/index.html` (hero, category tiles, featured placeholders, how to order, WhatsApp CTA), `src/css/site.css`, `src/js/site.js` (renders the shared header/footer from one NAV list, mobile menu, WhatsApp links from `config/business.json`). Mobile-first; hamburger below 1000px.

Notes: Added "Coming soon" placeholder pages for every nav item (cakes, cupcakes, cookies, bread, custom-orders, about, contact) so no link 404s; v4 and v6 replace them. Default theme is `classic` via `data-theme` on `<body>` (switcher is v5). `site.js` fetches `../config/business.json`, so serve the repo root (`python3 -m http.server`, open `/src/`); opened straight from disk the WhatsApp buttons fall back to the Contact page. Featured items are fake samples until v4.

<a id="v4"></a>
## v4: Menu hub, decluttered home, admin (done, 2026-11-06)
Owner request (`Changes for next version.md`):
1. One **Menu** page (`src/menu.html`) with section filter buttons (All / Cakes / Small Treats / Bread) replaces the separate category pages and the long nav. Old `cakes.html`, `cupcakes.html`, `cookies.html`, `bread.html` now redirect to `menu.html?c=...`. Cleaner cards (name, one-line description, price, Order button). Products live in `src/data/products.json` (SAMPLE items and prices).
2. Home page cut down to hero + featured + one WhatsApp banner. Menu tiles and "How to order" removed from home (How to order now on Contact). Nav is Home, Menu, Custom Orders, About, Contact.
3. Admin (`src/admin.html`, footer "Staff login"): login + sign-up (sign-ups need approval), pending orders tracker with statuses, menu item editor, theme tester with live preview, home/menu layout options, add/remove admins, change own password/username, export files. Root admin `admin` / `admin1` (username fixed, password changeable; banner nags until changed).

Notes: still a static site, so admin data (accounts, orders, edits) is saved in the browser (localStorage) and is NOT real security or shared between devices. "Publish" tab exports `site-settings.json` / `products.json` to drop into the repo to make changes live. Real accounts/orders across devices need a backend (see Ideas Parking Lot). Floating WhatsApp button moved to v5.

<a id="v5"></a>
## v5: Menu dropdown + hover style (done, 2026-11-06)
Owner request (`Changes for next version.md`, items 1 and 2):
1. Header menu is now a **dropdown at all times**: the Menu/Close button shows on every screen size and opens a panel under it (full width on phones, 290px panel on larger screens). Closes on Escape or a click elsewhere. Code: `src/js/site.js`, `src/css/site.css`.
2. **Hover style:** hovering (or keyboard-focusing) a menu item fills it with the theme's button colours and underlines it. Uses theme tokens only, so Classic is black/white, Cocoa is chocolate/cream, Pastel is pink. The current page keeps the accent colour until hovered.

Notes: the WhatsApp button inside the dropdown keeps its own green hover. Items 3 to 7 of the owner list are scheduled in the roadmap (v6 onward). The old v5 (floating WhatsApp + theme switcher) moved to after them.

<a id="v6"></a>
## v6: Clicked menu colour + inverting buttons (done, 2026-11-06)
Owner request (`Changes for next version.md`, items 3 and 4):
3. **Clicked menu text** turns the theme's link colour while pressed, and the page you are on keeps that link colour in the dropdown. New theme token `--link` (Classic blue, Cocoa caramel, Pastel raspberry) in `src/themes/theme-*.css`; used in `src/css/site.css`.
4. **Buttons invert on hover:** filled buttons (See the menu, Order buttons) go white with coloured text; WhatsApp buttons go white with green text and green outline; outline ("ghost") buttons fill in. New theme token `--btn-invert-text` keeps the text readable on each theme. Code: `src/themes/base.css`. Applies to every `.btn` site-wide (including the one inside the dropdown) so buttons behave the same everywhere.

Notes: Hover tested on all three themes. Items 5 to 7 are still scheduled (v7 to v9).

<a id="v7"></a>
## v7: Preview as a web page + Menu-only dropdown (done, 2026-11-06)
Owner request (`Changes for next version.md`, new list items 1 and 2):
1. **`preview.html` replaces `preview.bat`/`preview.ps1`.** Double-click it: it lists every page (Home, Menu with its sections, Custom Orders, About, Contact, Staff admin, Theme preview) and all links work. To make pages work when opened from disk (previously the Menu page was empty, "Fresh from the oven" vanished and WhatsApp buttons fell back to Contact) the data loader falls back to `src/js/offline-data.js` on `file://`. Also fixed two dead `#` buttons in `theme-preview.html` and added a "Back to the website" link there. Tested by crawling all 11 pages/URLs from `preview.html` over `file://` and over a web server: no dead links, no failed requests, no JS errors.
2. **Only "Menu" is a dropdown.** Home, Custom Orders, About and Contact are plain links in the header again; the old all-in-one dropdown and Menu/Close button are gone. "Menu" opens a panel with Full menu, Cakes, Small Treats, Bread (read from the product data). Opens on click/tap or keyboard, closes on Escape, outside click or tabbing away. v5 hover fill + underline and v6 link colour are kept (Menu shows the link colour when you are on the Menu page, and the current section is marked in the panel). WhatsApp us moved out of the nav into the header bar. Works on all 3 themes; checked at 320 to 1280px wide.

Notes: `preview.bat`/`.ps1` are removed from the repo but remain in git history (v6 and earlier) if ever wanted back. `offline-data.js` is a copy of the three data files and must be regenerated when they change (rule 8 in README, step 9 in AI_HANDOFF). The admin "Publish" export only produces the JSON files, so after dropping those into the repo the offline copy needs regenerating for the local preview to match (the hosted site is not affected). At exactly 320px wide (very old phones) the header links wrap to two rows; everything still works.

<a id="v8"></a>
## v8: Baked-goods hero + menu List layout fix (done, 2026-11-06)
Owner request (`Changes for next version_1.md`, items 1 and 2):
1. **Second hero with a baked-goods background and a greeting.** New option **Hero style** in admin (Theme & layout): *Logo (rabbit)* (default, unchanged) or *Baked goods + greeting*. The new hero has a soft pattern of cookies, cupcakes and donuts (drawn in SVG, recoloured by each theme) behind a centred panel: "Good morning / afternoon / evening", a greeting headline the admin types in (new **Greeting** box, default "Welcome in, something sweet is baking."), the hero text, and the See the menu / WhatsApp buttons. Works on phones and all 3 themes. The Hero checkbox still hides whichever hero is selected.
2. **Menu layout "List" fixed.** Two causes found: (a) the admin preview opened on Home, where Menu layout shows no change, so it looked like it stayed grid; the preview now jumps to the Menu page when you change the layout (and to Home for hero changes). (b) A v7 side effect: after dropping a new `site-settings.json` into the project, the local `preview.html` still read its old `offline-data.js` copy (grid). The Publish tab now also downloads a matching `offline-data.js`. List rows are also tidier now (capped width instead of stretching the full page).

Tests: admin flow (hero style, greeting, hero checkbox, layout jump, save, real pages, Publish downloads) on file:// and http; v7 link crawl + dropdown checks re-run, all passing.

Notes: no photos yet, the pattern is drawn shapes (real photos stay in the Ideas Parking Lot). I could not reproduce List failing when the setting was applied normally on the Menu page, so if it still stays grid for you, tell me where you were looking (admin preview, saved site, or a published copy). Items 5 to 7 of the owner list are still scheduled.

<a id="v9"></a>
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

<a id="v10"></a>
## v10: Orders strip at the bottom + floating WhatsApp button (done, 2026-11-06)
Owner request (`Changes for next version.md`, items 3 and 4, pushed from v9):
3. **Orders strip at the very bottom of every page.** Same scrolling ticker as the v9 specials strip, placed under the footer. Admin: Theme & layout has a new **Orders strip** box (on/off + one message per line, up to 6) with live preview. Default wording is neutral ("How to order: message Becca on WhatsApp" / "Tell us what you'd like, the date you need it and any notes"), no made-up lead times. New `orders: { enabled, items[] }` in `config/site-settings.json` (and the regenerated `offline-data.js`). Code: `src/js/site.js` (one shared strip builder for top and bottom), `src/css/site.css`, `src/js/store.js`, `src/js/admin.js`.
4. **One floating WhatsApp button; other WhatsApp buttons removed.** A round green WhatsApp button sits bottom-right on every public page (safe-area aware, grows slightly on hover, keyboard focusable, opens WhatsApp with the usual prefilled message; it falls back to the Contact page if the number is missing). Removed: header "WhatsApp us", both Home hero buttons, Home banner "Order on WhatsApp" (now a "How to order" link to Contact; text says to tap the green button), About and Custom Orders buttons (now "Contact us" links), and the footer number is plain text instead of a link. **Kept:** the WhatsApp button inside the Contact page, as asked. The reference site proverbsjewelery.co.za blocks automated access, so the button follows the common floating-button pattern (round, bottom-right, official WhatsApp glyph from Simple Icons, CC0) rather than copying that site exactly. Tell me if you want it bigger, on the left, or with a label.

Decision made without the owner: the small **Order** button on each product card was KEPT (not WhatsApp-branded, and it sends the product name to Becca). Easy to remove if not wanted (`SB.card` in `src/js/store.js`).

Tests (headless browser, file://): all 9 public pages at 320, 390 and 1280px wide: top strip first, bottom strip last, floating button present with a wa.me link and 16px from the corner, WhatsApp-green buttons only on Contact, no header button, no sideways scroll; 3 themes viewed; reduced motion; admin on/off + typing updates the preview and saves to real pages. No JS errors.

Notes: at the very bottom of a page the floating button sits over the end of the orders strip (the footer has extra bottom padding so it never covers footer text). `src/theme-preview.html` (a developer page) still shows a WhatsApp button as a style sample.

<a id="v10-1"></a>
## v10.1: Pinned strips + mobile menu (done, 2026-11-06)
Owner request (`Changes for next version_1.md`, items 1 to 3; item 4 was a question, answered in the roadmap):
1. **Strips stay put while scrolling.** The specials strip is pinned at the very top (the header now sticks directly under it) and the orders strip is pinned to the bottom of the screen, on every page and every device. The page gets bottom padding so the footer is never hidden behind it, and the floating WhatsApp button now sits just above the orders strip (it no longer overlaps it). If a strip is switched off in admin, the layout closes up automatically. Strip heights are measured by `site.js` and shared with the CSS as `--specials-h` and `--orders-h`.
2. **Mobile version and desktop version, same codebase.** Under 860px wide (phones and small tablets) the header shows the logo and a **three-line menu button**; tapping it drops down every link (Home, Menu with Full menu / Cakes / Small Treats / Bread already expanded, Custom Orders, About, Contact). The button turns into an X; it closes on X, Escape, tapping outside, or choosing a page. From 860px up (laptops, desktops, landscape tablets) it is the familiar header with every link as a clickable button and Menu as a dropdown. One set of files, no separate mobile site, so edits apply to both. Code: `src/js/site.js`, `src/css/site.css` (the nav block at the top).
3. **Version numbering** is now v10.1, v10.2, ... (README rule 1 and the roadmap updated; zip is `online-bakery-v10.1.zip`).

Tests (headless browser, file://): 9 pages at 320, 390, 768, 859 (mobile layout) and 860, 1280 (desktop layout): burger/links show correctly, no sideways scroll; mobile menu lists the right links and sections, collapses, closes on Escape / outside tap, and navigates; desktop dropdown opens and closes; strips and header stay at the exact same place after scrolling to 400px, to the page end and back (mobile and desktop, 3 pages); footer clear of the bottom strip; reduced-motion strip heights; both strips switched off; admin live preview still shows both strips. No JS errors.

Notes: the 860px switch point is the one number to change if Becca wants tablets to count as desktop or mobile (`860px` in `site.css`, `859px` in `site.js`, keep them matched). The strips and the menu button are not in the admin login page.

<a id="v10-2"></a>
## v10.2: Cart + Custom Order form (done, 2026-11-06)
Owner request (`Changes for next version.md`, items 3 and 4; items 1 and 2 parked LAST in the roadmap, items 5 to 7 scheduled; Keagan repos reviewed to build the master plan, see ROADMAP.md):
3. **Simple cart that sends one WhatsApp message.** Every product card now has an **Add** button (it replaced the old single-item "Order" button, which answers the open question from v10). A **cart icon with a count badge** sits in the header on every page (phones: next to the three-line menu; desktop: at the end of the links). The new **Cart page** (`src/cart.html`) lists the items with quantity buttons (minus / plus), remove, line totals and a total, plus optional name, date needed, collection or delivery, and notes. **Send order on WhatsApp** opens WhatsApp to Becca's number with the whole order already typed in (items, quantities, prices, total, details). The cart is remembered on that device (localStorage `sb_cart`), survives reloads, follows changes made in another tab, and quietly drops any item that was later hidden or removed from the menu (with a note). Nothing is sent until the customer presses send in WhatsApp. Code: `src/js/cart.js` (core, badge, Add buttons), `src/js/cart-page.js`, `SB.card` in `src/js/store.js`, header link in `src/js/site.js`, styles at the end of `src/css/site.css`.
4. **Custom Order form** (`src/custom-orders.html`, replaces the placeholder). Fields: name, occasion, date needed, collection or delivery, what (cake, cupcakes, ...), servings, flavours, allergies or dietary needs, design/notes. Name, occasion, date and servings are required (clear error message, past dates refused). **Send on WhatsApp** opens WhatsApp with the whole request typed in. Code: `src/js/custom-order.js`.

Also: menu intro and Contact "How to order" wording updated for the cart; `preview.html` has a Cart tile; a small-phone (320px) header tweak so logo + cart + menu button share one row; `VERSION` 0.10.2.

Tests (headless browser, file:// and http): add on Menu and Home, badge counts, Added feedback, quantity and total maths (R 965, R 1 415), message text decoded and checked (including `&` and the date), details survive reload, remove, hidden item dropped, empty state; Custom Order validation (name, occasion, date, past date) and the exact wa.me message; all 6 pages at 320, 390, 768, 859, 860 and 1280px wide: no sideways scroll, cart icon on screen and never over the logo or menu button; 3 themes viewed; no JS or request errors.

Notes: prices are still the SAMPLE prices in `products.json`, so the totals are only as real as those. The message says "Please confirm availability and the final price", and no lead times or delivery areas are claimed (owner to supply them for the FAQ in v10.3). The old per-card WhatsApp "Order" link is gone; the floating button and the Contact button are still the only other WhatsApp buttons. A custom order is not added to the cart: it is its own message. `offline-data.js` did not need regenerating (no data files changed).

<a id="v10-3"></a>
## v10.3: FAQ + reviews (done, 2026-11-06)
Owner list 6, item 5 (next in the master plan):
1. **FAQ page** (`src/faq.html`, new "FAQ" link in the header and footer). Six questions as a simple open/close list: how to order, how much notice, allergies and dietary needs, delivery or collection, how to pay, changing or cancelling. **All six answers are neutral DRAFTS** (no lead times, areas, fees, prices or payment methods were invented) and each shows a small "Draft answer, to be confirmed by Becca" tag until the owner confirms it (remove `"draft": true` for that item in `config/site-settings.json`).
2. **Reviews section** ("What people say", on the FAQ page and on Home). It only shows real reviews: the list ships **empty**, so Home hides the section and the FAQ page shows "Reviews will appear here" with a link to Contact. Review format: `{name, text, rating 1-5 (optional), date (optional)}`; text is escaped, stars have a screen-reader label.
Data lives in `config/site-settings.json` (`faq`, `reviews`), so the admin Publish export and `offline-data.js` already carry it (regenerated). Code: `src/js/pages.js`, `src/faq.html`, `src/index.html`, styles at the end of `src/css/site.css`, defaults in `src/js/store.js`.

Tests (headless browser, file://): 6 items, drafts flagged, accordion opens, empty reviews hidden/explained, a test review rendered with HTML escaped on Home and FAQ; 7 pages at 320 to 1280px wide (no sideways scroll; from 860px the header with 6 links + cart stays one row, no overlap); crawl of all 22 URLs from `preview.html`: no dead links, broken images or errors.

Notes: FAQ and reviews are not editable in the admin yet (v10.7, with the backend); edit the JSON for now. Allergen wording is deliberately cautious; the allergen tags and filters are v10.4.

<a id="v10-4"></a>
## v10.4: Dietary tags + filters, menu search (done, 2026-11-06)
Owner list 6, item 6 (+ Keagan's product search idea):
1. **Dietary tags.** Four tags (Vegan, Gluten-free, Nut-free, Dairy-free; list in `SB.TAGS`, `src/js/store.js`). A product's tags are `tags: ["vegan", ...]` in `products.json`. Tags show as small badges on product cards (Menu and Home). **No product has been tagged**: I did not guess anything about allergens, so the shipped menu has no tags yet.
2. **Filters on the Menu.** Tag buttons appear under the section buttons, but only for tags at least one visible product actually has. Picking several tags keeps only items that have ALL of them (e.g. Vegan + Nut-free). They combine with the section buttons and the search. A short line "Tags are a guide only. Please tell us about any allergies when you order." shows only when tag filters exist. No claims are made about the kitchen.
3. **Search box** on the Menu: matches name and description, every word must match, works together with sections and tags; "Nothing matches that" with a **Clear filters** button.
4. **Admin:** Menu items > Add/Edit has "Dietary tags" tick boxes (labelled "only tick what is definitely true"); ticked tags show in the item list. Saves like every other menu change (Save to this device, then Publish).
Code: `src/js/pages.js` (menu block rewritten), `src/js/store.js`, `src/menu.html`, `src/js/admin.js`, styles at the end of `src/css/site.css` and `admin.css`.

Tests (headless browser, file://): no tags = no filters/note; search (single, multi-word, within a section, no match, clear); with test tags: only used tags offered (Dairy-free hidden), badges, single and combined (AND) filters, impossible combination message; admin login, tick, save, list, re-edit shows ticks, saved JSON has clean `tags` (no `tag_*` leftovers) and the public menu picks them up; 4 widths no sideways scroll; crawl of 22 URLs from `preview.html`: no dead links or errors.

Notes: `products.json` and `offline-data.js` did not change. Tags are per device until published (same as all admin changes).


<a id="v10-5"></a>
## v10.5: Instagram + Facebook footer, glass best-seller cards (done, 2026-11-07)
Owner list 6 / master plan v10.5 (two things):
1. **Instagram + Facebook** in a new "Follow us" footer column on every page, with small coloured logos (inline SVG, no external files). Handles live in `config/business.json` (`instagram`, `facebook`), currently the PLACEHOLDER `sweetest.bakery`. A handle, an `@handle` or a full `https://` link all work; an empty value hides that link, and both empty hides the column. Opens in a new tab. Code: `src/js/site.js` (footer + `ICONS`), `src/css/site.css`.
2. **Glass-style best-seller cards** (Home "Our best sellers"): frosted, translucent cards over soft theme-coloured blobs, a gentle zoom (1.04) on hover or keyboard focus, no zoom for reduced-motion. Admin > Theme & layout: "Best sellers shown" now offers 1 to 6 (was 2, 3, 4, 6) and a new "Best-seller card style" (Glass or Plain). Which products appear is still the "Show on home page" tick on each menu item. Setting: `featuredStyle` ("glass" default, or "plain") in `config/site-settings.json`. Code: `src/js/pages.js`, `src/js/store.js`, `src/js/admin.js`, styles at the end of `src/css/site.css`. `offline-data.js` regenerated.

Tests (headless browser, file://): 8 pages x 6 widths (320, 390, 768, 859, 860, 1280): no sideways scroll, both links in the footer, no JS errors; all 3 themes viewed (glass, hover zoom, footer); Plain style and count 2 on the live page; admin select 1 to 6 + style, live preview follows, saves, exported site-settings.json carries `featuredStyle`; Add button and cart badge still work on glass cards; social link variants (both empty, `@handle` only, full URL only); every `preview.html` link resolves.

Notes: the page background itself is unchanged; only the best-sellers section gets the blobs. Browsers without `backdrop-filter` get a more solid card instead of frosted. FAQ and reviews are untouched (owner list 7 in ROADMAP.md, waiting on the owner's answers).

<a id="v10-6"></a>
## v10.6: Forgot password, phone country codes, occasion themes (done, 2026-11-07)
Owner list 8 (all three items):
1. **Forgot password** (admin login/sign-up screen, the only accounts that exist). "Forgot your password?" asks for the username and creates a one-time **6-digit code** valid for **15 minutes** (blocked after **5 wrong tries**). Because a static site cannot send email or SMS, the code appears for any logged-in admin under **Admins > Password reset requests**, and the admin gives it to the person (WhatsApp, call, in person) after making sure it is really them. The person then enters username + code + new password. The same message shows whether or not the username exists (no username guessing), pending sign-ups can't use it, a used code is deleted and an admin can cancel a request. Code: `src/js/admin.js` (`requestReset`, `useReset`, `recoverView`), `src/css/admin.css`.
2. **Country-code dropdown on phone numbers**, default **South Africa +27** (27 countries listed, last choice remembered on that device). Used in: Admin > Orders > Add an order (phone, optional); **Cart** and **Custom Order** forms (new optional "Your phone number", added to the WhatsApp message as `Phone: +27 83 341 3166`). Typing `083...`, `+27 83...` or `27 83...` all give the same number; `+` or `00` in front means "already international"; clearly wrong numbers show a message. Admin stores digits only (e.g. `27833413166`) so the order's WhatsApp button keeps working. Code: `SB.COUNTRIES`, `SB.phoneField`, `SB.phoneRead` in `src/js/store.js`.
3. **Six special-occasion themes** in a new file `src/themes/theme-seasonal.css`: Christmas, Valentine's Day, Easter, Halloween, Braai Day (Heritage Day), Mother's Day. Same tokens as the other themes (layout never changes); all light-background so the logo stays readable; every text/button colour pair checked for contrast (4.5:1 or better). Admin > Theme & layout shows them under "Special occasions"; added to `theme-preview.html`. Registered in `SB.OCCASION_THEMES` (`store.js`); the CSS link was added to every page.

Tests (headless browser, file://): forgot flow end to end (request, same message for unknown user, wrong code counts down, admin sees the code, right code changes the password, old password rejected, new one logs in, code consumed, 5-try lockout, expired code); phone: SA local / +27 / 27 formats, UK, US, Namibia typed with + while another country is selected, too-short rejected (admin, cart, custom order), optional blank adds no line, saved admin orders and their WhatsApp links, cart phone survives reload; all 9 themes load and apply; 5 pages x 4 widths (320 to 1280) no sideways scroll; no JS errors. `site-settings.json`, `business.json` and `products.json` did not change, so `offline-data.js` did not need regenerating.

Notes: the reset code lives in this browser like all admin data, so it is a convenience lock, not real security (same as the rest of the admin until v10.8). If the only admin (root) forgets the password and nobody else is an admin, clear this site's browser data to get the default `admin` / `admin1` back, or add a second admin as a spare. The theme is still one site-wide choice made in the admin (visitor-side switching and date-based auto-switching are in the roadmap ideas).

<a id="v10-7"></a>
## v10.7: Father's Day theme + moving occasion decorations (done, 2026-11-07)
Owner list 9, item 1:
1. **Father's Day theme** (navy and steel blue), added to `src/themes/theme-seasonal.css`, `SB.OCCASION_THEMES` and `theme-preview.html`; colours checked for contrast (4.5:1 or better). Admin > Theme & layout > Special occasions now lists 7.
2. **Moving decorations on the 7 special-occasion themes only** (Christmas snow, stars, trees, gifts; Valentine's hearts, roses, letters; Easter eggs, chicks, butterflies, tulips, bunny; Halloween bats, pumpkins, ghosts, sweets; Braai Day flames, sparks, steak, corn; Mother's Day blossoms, flowers, butterflies, hearts; Father's Day ties, trophies, tools, footballs, fishing rods). Classic, Cocoa and Pastel get none.
   - One fixed, click-through layer covers the whole screen on every public page (not the admin): a few big, very faint, slow shapes as the "background" plus smaller, clearer ones that **fall, rise or wander** across the page. Sits under the header, both strips and the WhatsApp button, so nothing is covered or blocked.
   - Light on the browser (only transform and opacity are animated); fewer items on phones (12 vs about 18); still (no motion) for visitors with "reduce motion" on; hidden when printing.
   - **Admin > Theme & layout > "Moving decorations"** tick box (setting `decorations` in `config/site-settings.json`, default on); the live preview follows. `offline-data.js` regenerated.
   - To change what a theme shows, edit `SETS` at the top of `src/js/decor.js` (emoji, how it moves, how many). Code: `src/js/decor.js`, styles at the end of `src/css/site.css`, script tag on every public page that loads `site.js`.

Tests (headless browser, file://): all 7 occasion themes get 16 to 21 decorations and every one moves; Classic, Cocoa and Pastel get 0; switched off = 0; reduce-motion = still, no animation; Christmas and Father's Day on 7 pages at 320, 390, 768 and 1280px wide: no sideways scroll; the Add button still works under the layer; layer is click-through and under the header; admin button list, preview follows the theme and the tick box, saved settings carry `decorations`; no JS errors.

Notes: decorations are emoji, so they look slightly different on Apple, Windows, Android. Some may drift over text for a moment; they are small and semi-transparent, and the owner can switch them off with one tick.

<a id="v10-8"></a>
## v10.8: Decorations always move, live preview in admin, tidy roadmap and backlog (done, 2026-11-07)
Owner list 10, items 3, 5 and 6 (the other three items are in `ROADMAP.md`: 4 = v10.9, 1 and 2 need the backend = v10.11 and v10.12):
1. **Fix: the decorations did not move for the owner.** Most likely cause: v10.7 deliberately froze them when the device has "reduce motion" / "show animations" switched off (common on Windows laptops and some phones), which looks exactly like "not moving". Now they **always move**, all over the screen (tested: every occasion theme, with and without reduce-motion, roaming across the whole width and height). To stay kind to people who find motion distracting, a small **Pause / Play button** (bottom-left, remembered on that device) lets any visitor stop them. The engine was also reworked (`src/js/decor.js`, end of `src/css/site.css`) so positions are plain numbers times `--uw` / `--uh`, which lets the same code run full-page and inside a small box.
2. **Live preview of the effects in the admin** (Theme & layout, under the "Moving decorations" tick box): a box in the chosen theme's colours that shows the real moving decorations. It redraws **instantly** when a theme is clicked or the box is ticked or unticked, and says in words why it is empty (no decorations on this theme, or decorations switched off). The Home / Menu page preview is still there too. Code: `drawDemo()` in `src/js/admin.js`, `SBDecor` in `decor.js`, styles at the end of `src/css/admin.css`. The admin page itself never shows the full-screen layer (`<body data-no-deco>`).
3. **Neat roadmap and backlog.** `roadmap/ROADMAP.md` is now short and organised: a status line, a table of contents, the version-by-version plan, a tracker of every owner request with its status (DONE / NEXT / PLANNED / WAITING / BACKEND), what we are waiting on from the owner, what needs the backend, ideas, and the rules. The full old roadmap was moved **unchanged** to `roadmap/ROADMAP_ARCHIVE.md` (nothing deleted). `roadmap/BACKLOG.md` got a contents table at the top (one line per version, clickable). `README.md` and `docs/AI_HANDOFF.md` point to the new layout.

Tests (headless browser, file://): all 7 occasion themes, with and without reduce-motion: every one moves and spreads across the whole screen; Pause freezes, Play resumes, choice survives a reload; Classic and "decorations off" get no layer and no button; no sideways scroll at 320, 390, 768, 1280px on 5 pages; admin preview: Classic shows the "no decorations" message, Christmas / Halloween show their own emoji, unticking empties it with the right message, re-ticking brings it back, Cocoa shows the message again; all items stay inside the box; admin page has no full-screen layer; no JS errors.

Notes: if the owner still sees no movement, tell us the device and browser; the Pause button state (pause icon = playing) is the first thing to check. Honest trade-off: moving decorations ignore the device's reduce-motion setting by design (the owner asked for them to move); the Pause button is the safety valve.

<a id="v10-9"></a>
## v10.9: Automatic seasonal themes + "New and popular" on Home (done, 2026-11-07)
Owner list 10 item 4 (automatic seasons) and the older "most recent + most popular" plan item:
1. **Automatic seasonal themes.** The site now changes theme by itself by date, and goes back to the owner's everyday theme when no season is on. Default seasons (South African calendar, all editable or switchable off): Valentine's Day 1 to 14 Feb; Easter from 9 days before Easter Sunday to Easter Monday; Mother's Day the week up to the 2nd Sunday of May; Father's Day the week up to the 3rd Sunday of June; Braai Day 17 to 24 Sep; Halloween 24 to 31 Oct; Christmas 1 to 26 Dec. Easter, Mother's Day and Father's Day are worked out from the calendar every year (no yearly editing). The first matching season wins. The decorations (and their Pause button) follow the season theme automatically.
   - **Admin > Theme & layout > Automatic seasons:** master on/off; per-season on/off tick; editable day/month dates (typed as `1/12`, `01.12` or `01/12`; wrong dates such as 31/02 are refused and marked); a **Preview** button on every season (shows that theme in the preview and the little decoration box without changing anything that is saved); a "**Try a date**" box ("on 9 May 2027 the site shows Mother's Day"); and a plain sentence saying what the site shows today.
   - **The seasons never overwrite the owner's choice.** The theme buttons set the *everyday* theme. `settings.theme` is never changed by a season (the live theme is a separate value, `themeNow`, returned by `SB.load()`), so Save and Publish keep the owner's own theme. The admin preview always shows exactly the chosen theme, whatever time of year it is.
   - Rules live in `config/site-settings.json` (`autoTheme`), engine in `src/js/store.js` (`SB.seasonTheme`, `SB.seasonText`, `SEASON_RULES`), UI in `src/js/admin.js` (`seasonsBox`, `drawSeasonStatus`), `decor.js` reads `themeNow`. Dates use the visitor's own calendar day.
2. **"New and popular" section on Home** (under Our best sellers): **Just added** = the newest visible items (by the date each item was added; new items added in the admin get today's date automatically) and **Most popular** = items the owner ticks "Show in Most popular" in the item form. An item never appears twice inside this section; empty rows hide, and an empty section hides. Same glass/plain card style as the best sellers. Admin: tick box "New and popular" under Home page; how many to show for each row (1 to 6); a "popular" tag in the item list. Settings: `recentCount`, `popularCount`, `home.fresh`; item fields `added` (YYYY-MM-DD) and `popular`. The 8 sample items got sample dates and 3 sample "popular" ticks. Code: `src/index.html`, `src/js/pages.js`, end of `src/css/site.css`.

Tests (headless browser, date faked): the public site shows the right theme on 9 dates (incl. a date with no season, and Easter / Mother's / Father's Day computed for 2027), the owner's own theme outside seasons, a season theme over the owner's theme inside, auto off and a single season off both fall back; Menu, Cart and FAQ follow too; decorations appear only in seasons. Date maths checked against the real calendar (Easter 28 Mar 2027, Mother's Day 9 May 2027, Father's Day 20 Jun 2027). Admin: status text, try a date, editing and refusing dates, ticks, master switch, Preview does not change the saved theme, clicking a theme clears the preview, saved and exported site-settings.json keep the everyday theme (also when exported without opening the Theme tab) and carry `autoTheme`. New and popular: default rows and items, counts 2/1, Plain style, hidden by the Home tick, no popular items, nothing to show, hidden item skipped, admin selects drive the live preview, a new item gets today's date and shows first in Just added. No sideways scroll at 320, 390, 768, 1280; no JS errors.

Notes: "Most popular" is the owner's pick for now. Real ranking needs real order data across devices, which arrives with the backend and order tools (v10.13). Seasons show for everyone who opens the site on those dates, so the owner can switch a season off with one tick if she does not want it. Items added before v10.9 have sample "added" dates; edit or re-add items in the admin to change them. `offline-data.js` regenerated.
