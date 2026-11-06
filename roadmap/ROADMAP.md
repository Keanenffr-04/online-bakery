# Roadmap
Append-only. Never delete. Items may move to a later version (leave a note). Finished items go to `BACKLOG.md` with the version number.
Rule: **max 1 or 2 things per version.**

**Next up: v7**  (v6 done, see BACKLOG.md)

---
## v2: Research + theme foundation (DONE, see BACKLOG.md)
Instruction to whoever builds this:
1. **Review the reference repos.** Open both `online_bakery_marketplace_v1` and `_v2`, then search GitHub for 4 to 6 more bakery/food-ordering sites. Fill in `docs/REFERENCES.md` (licence, stack, good/bad, ideas). Don't copy code you can't legally reuse.
2. **Build the theme system.** Create `src/themes/` with a base stylesheet plus 3 theme token files built from the brand notes (e.g. *Classic Black & White*, *Cocoa & Cream*, *Soft Pastel*). Make a one-page preview that shows each theme with the logo, a heading, a button and a card.

## v3: Site skeleton and navigation (DONE, see BACKLOG.md)
1. Crop/clean the logo (transparent PNG/SVG, light and dark versions).
2. Build the Home page and the sticky nav with all sections from ARCHITECTURE.md, mobile-first. Placeholder content is fine.

## v4: Menu sections + products + admin (DONE, see BACKLOG.md; item 2 of the original v4 plan, the floating WhatsApp button, moved to v5)
1. Create `src/data/products.json` and render each category page from it (cards with image, price, description).
2. Add a floating **WhatsApp button** on every page plus an "Order on WhatsApp" button per product (prefilled message).

## v5: Theme switcher
1. Floating WhatsApp button on every page (moved from v4).
2. Add the visitor-facing theme switcher (remembers the choice).
3. Polish each theme until the owner picks a favourite; keep the others available.

## v6: Custom orders + launch prep
1. Custom Order page: a simple form that builds a WhatsApp message (occasion, date, servings, flavours, notes).
2. Deploy (GitHub Pages or Netlify), add SEO basics, Open Graph image, favicon, and a custom domain guide.

---
## Owner change list (from `Changes for next version.md`, added with v5)
Done in v5: items 1 and 2 (see BACKLOG.md). The old v5 (floating WhatsApp + theme switcher) and old v6 (custom orders + launch) slide back; the owner's list comes first.
- v6 (DONE, see BACKLOG.md): 3. clicked/active menu text uses a proper link colour. 4. "See the menu" and "WhatsApp us" buttons invert colours on hover.
- v7 (suggested): 5. Instagram + Facebook section in the footer (placeholder handle `sweetest.bakery`, small coloured logos; real info coming from the owner).
- v8 (suggested): 6. "Fresh from the oven" product cards as individual glass-style (iOS 27 look) theme cards that zoom on hover; admin can choose how many products to showcase and swap them any time.
- v9 (suggested): 7. New section under "Fresh from the oven" for most recent + most popular items, same card style and same admin controls.
- Then: floating WhatsApp button + theme switcher (old v5), custom orders + launch prep (old v6).

---
## Ideas Parking Lot (unscheduled, move into a version when ready)
- Gallery / "Our work" page with Instagram-style grid
- Simple cart that sends the whole order via WhatsApp
- Customer reviews / testimonials
- FAQ (lead times, allergens, delivery area)
- Allergen and dietary tags + filters (vegan, gluten-free)
- Online payments (Yoco / PayFast) later
- Simple admin/edit page so Becca can update the menu without touching code
- Order lead-time / availability calendar
- Instagram + Facebook links and feed
- Delivery/collection area info
- Seasonal / holiday specials banner
- Analytics (privacy-friendly)
- Finish reference review: `online_bakery_marketplace_v2` + verify licences (moved from v2)
- Pick favourite theme with Becca (preview: `src/theme-preview.html`), feeds v5
- Real admin backend (Supabase/Firebase/Netlify Identity) so admin accounts, orders and edits work across devices and go live instantly (v4 admin is browser-only)
- Customer-side order form that lands in the admin Orders list (needs the backend above)
- Product photos instead of emoji
