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
