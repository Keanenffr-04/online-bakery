# Roadmap
Append-only. Never delete. Items may move to a later version (leave a note). Finished items go to `BACKLOG.md` with the version number.
Rule: **max 1 or 2 things per version.**

**Next up: v11**  (v10 done, see BACKLOG.md)

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

---
## Owner change list 2 (from `Changes for next version.md`, added with v7)
- v7 (DONE, see BACKLOG.md): 1. preview is now `preview.html` with every link working. 2. only "Menu" is a dropdown (food sections).
- The earlier suggested items slide one version because the owner's new list came first: **v8** = item 5 (Instagram + Facebook footer section); **v9** = item 6 (glass-style "Fresh from the oven" cards, admin picks how many); **v10** = item 7 (most recent + most popular section). Then floating WhatsApp button + theme switcher, then custom orders + launch prep. (Max 2 to 3 things per version, owner's call.)

---
## Owner change list 3 (from `Changes for next version_1.md`, added with v8)
- v8 (DONE, see BACKLOG.md): 1. second hero (baked goods + admin greeting). 2. Menu layout List fixed.
- The owner list's earlier items slide one more version because this list came first: **v9** = Instagram + Facebook footer section; **v10** = glass-style "Fresh from the oven" cards + admin choice of how many; **v11** = most recent + most popular section. Then floating WhatsApp button + theme switcher, then custom orders + launch prep.

---
## Owner change list 4 (from `Changes for next version.md`, added with v9)
Owner said: do 2 things, push the rest into the roadmap.
- v9 (DONE, see BACKLOG.md): 1. "Fresh from the oven" heading is now "Our best sellers". 2. Specials strip at the very top of every page (scrolling ticker, like lovedbychrist.co.za).
- **v10** (pushed from owner list 4): 3. Same style of strip **at the bottom** of every page, for orders (e.g. how to order / lead time / order on WhatsApp). Owner to supply the wording; suggest admin-editable like the specials strip (reuse the `.specials` styles and the admin box pattern from v9). 4. **Remove every WhatsApp button except the one in the Contact section, and add one floating WhatsApp button** on all pages, like proverbsjewelery.co.za. Buttons to remove: header "WhatsApp us", both hero buttons on Home, "Order on WhatsApp" in the Home banner, the "Ask us on WhatsApp" buttons on About and Custom Orders, the footer WhatsApp link, and the per-product "Order" buttons on cards (decide with the owner what customers click instead, e.g. Order opens the floating WhatsApp or the Contact page). Note: proverbsjewelery.co.za blocks automated access, so ask the owner for a screenshot or description of the button (position, size, colour, label) before building. Do items 3 and 4 together: the bottom orders strip is the natural replacement for the removed buttons.
- The earlier suggested items slide one more version because the owner's list comes first: **v11** = Instagram + Facebook footer section; **v12** = glass-style best-seller cards + admin choice of how many; **v13** = most recent + most popular section. Then theme switcher, custom orders + launch prep.
- Ideas for later (not scheduled): make the specials strip clickable (to the Menu or a WhatsApp message), and a start/end date per special so it switches off by itself.

- v10 (DONE, see BACKLOG.md): items 3 and 4 of owner list 4 (bottom orders strip; floating WhatsApp button + other WhatsApp buttons removed). Next: **v11** = Instagram + Facebook footer section, **v12** = glass-style best-seller cards, **v13** = most recent + most popular section, then theme switcher, custom orders + launch prep.
- Open question for the owner (v11 or later): the per-product **Order** buttons on menu cards were KEPT in v10 (they send the product name to WhatsApp). Remove them or keep them?
