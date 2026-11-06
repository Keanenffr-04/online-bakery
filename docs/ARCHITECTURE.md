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
