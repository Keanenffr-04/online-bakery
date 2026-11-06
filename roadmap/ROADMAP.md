# Roadmap
Append-only. Never delete. Items may move to a later version (leave a note). Finished items go to `BACKLOG.md` with the version number.
Rule: **max 1 or 2 things per version.**

**Next up: v10.4**  (v10.3 done, see BACKLOG.md; v10.2 done, see BACKLOG.md; numbering is v10.1, v10.2, ... The current plan is the "MASTER PLAN" at the bottom of this file; older notes above are kept for history and are superseded by it.)

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

---
## Owner change list 5 (from `Changes for next version_1.md`, added with v10.1)
- **Renumbering (owner request):** after v10 the versions are v10.1, v10.2, and so on. The old names slide: **v10.2** = Instagram + Facebook footer section (was v11); **v10.3** = glass-style best-seller cards + admin choice of how many (was v12); **v10.4** = most recent + most popular section (was v13). Then theme switcher, custom orders + launch prep. Older notes above that say v11/v12/v13 mean these.
- v10.1 (DONE, see BACKLOG.md): 1. both strips stay pinned while scrolling (top strip above the header, orders strip at the bottom of the screen). 2. One codebase, two layouts: three-line dropdown menu on phones/tablets, links as clickable buttons in the header on desktop.
- Item 4 of the list was a question ("what else would you add?"); the answer is in the Ideas Parking Lot below ("Claude's suggestions").

## Claude's suggestions (added with v10.1; owner to pick what goes into a version)
1. **Launch prep** (biggest gap): put the site online (GitHub Pages or Netlify), favicon, page titles/SEO, an Open Graph image so links look nice when shared on WhatsApp/Facebook, and a custom domain guide.
2. **Real product photos** instead of emoji (a small image per product, set in admin). Biggest visual upgrade for a bakery.
3. **Simple cart that sends one WhatsApp message** with the whole order (tap Add on several items, one message to Becca).
4. **Custom Order form** (occasion, date, servings, flavours, notes) that builds the WhatsApp message. The page is still a placeholder.
5. **FAQ + reviews** (lead time, allergens, delivery or collection area, "how do I pay"), which also answers the questions Becca gets repeatedly.
6. **Allergen/dietary tags + filters** on menu items (vegan, gluten-free, nut-free).
7. **Admin that works across devices** (real backend), because today saved changes live in one browser and need the manual Publish step. Worth doing before Becca relies on it daily.
8. Small polish: reserve space for the strips so the page does not jump on first load; make a special clickable; start/end dates on specials.


---
## Owner change list 6 (from `Changes for next version.md`, added with v10.2)
Owner's list, kept as written:
1. Get it online (hosting on GitHub Pages or Netlify, favicon, SEO, a share image for WhatsApp and Facebook links, a domain). **Owner wants this LAST, once happy with everything.**
2. Real product photos instead of emoji. **Owner does this when real photos exist.**
3. A simple cart that sends one WhatsApp message with the whole order.
4. The Custom Order form (occasion, date, servings, flavours), still a placeholder page.
5. FAQ and reviews covering lead times, allergens, delivery or collection, and payment.
6. Allergen tags with filters on the menu (vegan, gluten-free, nut-free).
7. An admin that works across devices. Today Becca's changes live in one browser and need the manual Publish step. Fix before she relies on it daily.

Owner also asked for the two zips (`online_bakery_marketplace_v1` and `_v2`, Keagan's Django marketplace) to be used as a **reference** when building this roadmap, placed "where you see fit", and **not all at once**.
- v10.2 (DONE, see BACKLOG.md): items 3 and 4 (cart + Custom Order form). The older v10.2 to v10.4 slots (Instagram/Facebook footer, glass cards, most recent + popular) slide back, see the master plan.

---
## What the Keagan reference repos taught us (reviewed in v10.2)
Both repos are the same Django + MySQL + Stripe marketplace (v2 is v1 with a styling refresh and a `.env`). Only **ideas** are borrowed, no code. We stay static + WhatsApp-first until the backend step (v10.7) and take only what a one-baker shop needs.

| Keagan feature | What it is there | Where it lands here |
|---|---|---|
| Cart (add, update quantity, remove, header badge; a later commit "fix the cart item badge counter") | Per-user cart rows in the database | **Done v10.2** as a browser cart + one WhatsApp message. Badge also follows other tabs. |
| Product fields: stock quantity, availability flag, low-stock threshold, inventory page | Vendor inventory screen | **v10.6**: "Sold out today" toggle per product in admin (no stock counting, Becca bakes to order) |
| Categories managed by an admin (add, edit, delete) | Admin CRUD | **v10.6**: admin can add, rename and reorder menu sections (today they are fixed in `products.json`) |
| Order statuses (pending, paid, cancelled), order list, order detail, edit/delete | Order model + admin screens | **v10.7**: orders land in the admin Orders list (needs the backend); wording kept to Becca's real flow: New, Confirmed, Ready, Collected/Delivered, Cancelled |
| Order confirmation page, printable invoice | Django templates | **v10.8**: "Thank you" page after sending + printable order slip/invoice for Becca |
| Sales dashboard, analytics, reports (download CSV, print) | Admin analytics + report downloads | **v10.8**: simple "this week / this month" numbers and a CSV download from the Orders list |
| Activity log (who changed what) | `ActivityLog` model | **v10.8**: small change log in admin (useful once Becca and a helper both edit) |
| Admin backup | Backup download | **v10.7**: automatic copy of menu + settings + orders (backend) plus a manual "Download backup" button |
| Product search | `/search/` page | **v10.5**: search box on the Menu page (small, pairs with the allergen filters) |
| Privacy policy + Terms pages | Static templates | **v10.9**: Privacy (POPIA, South Africa) + Terms/ordering policy pages, written from Becca's real rules |
| Stripe Checkout + webhook (card payments) | Online payments | **After launch, only if wanted**: SA options are Yoco / PayFast / Ozow. Not planned before launch (Becca takes payment by EFT/cash, owner to confirm) |
| Vendors, vendor IDs, customer accounts, multi-vendor marketplace | Marketplace roles | **Not wanted** (one bakery, no vendors). Customer accounts only if repeat-order history is ever asked for |
| Django admin, Swagger API, Postman collection, MySQL | Heavy stack | **Not wanted** (see ARCHITECTURE.md). Backend step uses a hosted service instead (Supabase or Firebase) |

Housekeeping flagged from the zip: `online_bakery_marketplace_v2` contains a `.env` (real-looking database and Stripe settings) and a 395 MB `.venv` inside the upload. Those should never be committed or shared; if the keys are real, rotate them. No licence file in either repo, so nothing was copied.

---
## MASTER PLAN (current order, added with v10.2)
Rule still holds: **max 1 or 2 things per version**. Owner's list comes first, then the older scheduled items, then Keagan-inspired items, then the two "owner decides when" items last. Nothing is deleted from the sections above; where an older note names a different version, this plan wins.

| Version | What | Source |
|---|---|---|
| v10.2 | **DONE**: cart that sends one WhatsApp message; Custom Order form | Owner list 6, items 3 + 4 |
| v10.3 | **DONE**: **FAQ page** (lead times, allergens, delivery or collection, payment) + **reviews/testimonials** section. Owner supplies the real answers and reviews; until then placeholders are clearly marked | Owner list 6, item 5 |
| **v10.4** | **Allergen/dietary tags + filters** on the Menu (vegan, gluten-free, nut-free; tags editable in admin) + **search box** on the Menu | Owner list 6, item 6; Keagan search |
| v10.5 | **Instagram + Facebook** footer section (placeholder handle `sweetest.bakery`, real info from owner) + **glass-style best-seller cards** with admin choice of how many | Older v10.2 and v10.3 slots |
| v10.6 | **Most recent + most popular** section on Home + **admin extras**: "Sold out today" toggle, manage menu sections | Older v10.4 slot; Keagan inventory + categories |
| v10.7 | **Admin that works across devices** (hosted backend: login, menu and settings saved online and live instantly, no manual Publish; orders captured; automatic backup). This is one big item, it gets a version to itself. Do it before Becca relies on the admin daily | Owner list 6, item 7; Keagan orders + backup |
| v10.8 | **Order tools** (needs v10.7): order statuses, thank-you page after sending, printable order slip, simple weekly/monthly numbers + CSV, change log | Keagan order, invoice, analytics, report, activity-log ideas |
| v10.9 | **Privacy (POPIA) + Terms** pages + theme switcher for visitors + pick the favourite theme with Becca | Keagan policy pages; older v5 item |
| **When photos exist** | **Real product photos instead of emoji** (a photo per product, set in admin; emoji stays as the fallback). Owner decides when; can slot in anywhere before launch. Tip: ask the owner for photos with the same light and background | Owner list 6, item 2 |
| **LAST (v11, owner's call)** | **Get it online**: hosting (GitHub Pages or Netlify), favicon, SEO + page titles, Open Graph share image for WhatsApp/Facebook, custom domain, a launch checklist. Only when the owner says "I'm happy with everything" | Owner list 6, item 1; Claude's suggestion 1 |
| After launch (ideas) | Online payments (Yoco/PayFast), privacy-friendly analytics, availability calendar, specials with start/end dates, clickable specials, gallery, reserve space for the strips so the page does not jump | Ideas Parking Lot |

Notes for whoever builds the next version:
- Keep the cart and Custom Order form WhatsApp-based until v10.7. After the backend exists, orders can ALSO be saved to the admin Orders list, while still opening WhatsApp.
- Allergen wording is safety-relevant: tags are only what Becca confirms, with a line such as "ask us about allergens, we bake in a kitchen that handles nuts" **only if true** (owner to confirm). Do not invent claims.
- Product photos and launch are deliberately last: do not start them without the owner saying so.

- v10.3 (DONE, see BACKLOG.md): FAQ page + reviews section. **Owner to-do:** confirm or rewrite the 6 draft FAQ answers (notice needed, allergens, delivery area/fees, payment) and send real reviews. Editing FAQ/reviews inside the admin comes with the backend (v10.7); until then they are edited in `config/site-settings.json`.
