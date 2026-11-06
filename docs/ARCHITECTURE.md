# Architecture (decisions, change only with a note in the backlog)

## Stack: plain static site (HTML + CSS + vanilla JS)
Why: easy to host free (GitHub Pages / Netlify / Cloudflare Pages), no build tools to break, easy for a non-dev to edit.
Revisit only if a version needs it (e.g. payments, admin panel).

## Planned site sections (top nav, always visible)
1. **Home**: hero, featured items, how to order
2. **Cakes**
3. **Cupcakes & Treats**
4. **Cookies & Pastries**
5. **Bread**
6. **Custom Orders**: birthdays, weddings, events
7. **About**: Becca's story
8. **Contact / Order**: WhatsApp-first

(Category names are placeholders until Becca confirms her real menu.)

## Themes
Themes are CSS variable files in `src/themes/` (e.g. `theme-classic.css`). A theme only changes tokens (colours, fonts, radius, spacing), never layout, so every theme works everywhere. A small switcher stores the choice in the visitor's browser.

## Data
- Business details: `config/business.json`
- Products: `src/data/products.json` (name, category, description, price, image, tags). Becca edits this file to change the menu.

## WhatsApp
- Floating WhatsApp button on every page: `https://wa.me/27833413166?text=<prefilled message>`
- Product cards have an "Order on WhatsApp" button that prefills the product name.

## Non-goals for now
Payments, user accounts, delivery tracking, real database.

## v4 update: data + admin (static, browser-only)
- Site data load order: published files (`config/site-settings.json`, `src/data/products.json`) then this browser's admin changes (`localStorage`: `sb_settings`, `sb_products`). Code: `src/js/store.js`.
- Admin (`src/admin.html` + `js/admin.js`): accounts/orders in `localStorage` (`sb_admins`, `sb_orders`), SHA-256 salted password hashes. Convenience lock only, not secure. Replace with a real backend before relying on it.
- Menu is one page (`menu.html`) filtered by category; categories are defined in `products.json`.
- Theme is applied to `<html data-theme>` by `js/boot.js` (before paint) and `store.js`.

## v7 update: header + local preview
- Header: plain links (Home, Custom Orders, About, Contact) plus ONE dropdown, **Menu**, whose panel lists the food sections (Full menu + each category from `products.json`, so it always matches the Menu page filters). WhatsApp button sits in the header bar, not in the nav. Phones: logo + WhatsApp on row 1, links on row 2; from 860px it is one row. Code: `NAV` in `src/js/site.js`, styles in `src/css/site.css`.
- Local preview: `preview.html` (repo root) links to every page. Browsers block `fetch()` of local files, so when `location.protocol === "file:"` `store.js` reads `src/js/offline-data.js` (a copy of the three data files) instead. Hosted sites are unaffected and keep reading the real JSON. `site.js` now gets business details through `SB.load()` so there is one loading path.

## v8 update: hero styles + layout settings
- Two heroes live in `src/index.html`: `data-section="hero"` (logo) and `data-section="hero-bakes"` (baked-goods pattern + greeting). `pages.js` keeps the one chosen by `heroStyle` (`logo` default, or `bakes`) and removes the other; the Hero checkbox removes both. The pattern is an inline SVG `<pattern>` (cookies, cupcakes, donuts) styled with theme tokens via `.bk*` classes in `site.css`, so every theme recolours it.
- New settings in `site-settings.json` / `store.js` defaults: `heroStyle`, `greeting` (headline of the baked-goods hero; the small line above it is "Good morning/afternoon/evening" from the visitor's clock). `tagline` is shared by both heroes (`data-tagline`).
- Admin "Theme & layout": changing Menu layout jumps the live preview to the Menu page; hero/greeting/home changes jump it to Home, so a change is always visible.
- Publish tab downloads three files (settings, products, `offline-data.js`) so the local preview cannot go stale.

## v10.2 update: cart + custom order form (still static, still WhatsApp-first)
- **Cart:** `src/js/cart.js` exposes `window.SBCart` (get, add, set, remove, clear, count, lines, message). It stores `{items:[{id,q}], meta:{name,dateISO,method,notes}}` in `localStorage["sb_cart"]` (per browser, no accounts, max 99 per item). It is loaded on every public page between `store.js` and `site.js`; `site.js` draws the header cart link (`.cart-link` + `.cart-badge`) and `SBCart.sync()` keeps the badge right (also across tabs via the `storage` event). Product cards from `SB.card()` carry `data-add="<product id>"`; one delegated click handler adds to the cart.
- **Cart page:** `src/cart.html` + `src/js/cart-page.js` join cart rows with live product data (`SB.load()`), drop products that no longer exist or are hidden, and build the one `wa.me/<number>?text=...` link from `config/business.json`.
- **Custom Order form:** `src/custom-orders.html` + `src/js/custom-order.js` validate, then `window.open` the same kind of `wa.me` link. No data is stored or sent anywhere else.
- **Later (v10.7+):** once there is a hosted backend, the same message data can also be saved as an order in the admin; `SBCart.lines()` / `SBCart.message()` are the seam for that.

