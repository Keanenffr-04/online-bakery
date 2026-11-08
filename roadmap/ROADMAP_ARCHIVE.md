# Roadmap archive (old notes, kept word for word)
This is the full old roadmap exactly as it was up to v10.7. **Nothing here was deleted.** It is history: where it disagrees with `ROADMAP.md`, `ROADMAP.md` wins.
The tidy, current plan is in [`ROADMAP.md`](ROADMAP.md); finished work is in [`BACKLOG.md`](BACKLOG.md).

---

# Roadmap
Append-only. Never delete. Items may move to a later version (leave a note). Finished items go to `BACKLOG.md` with the version number.
Rule: **max 1 or 2 things per version.**

**Next up: v10.8**  (v10.7 done, see BACKLOG.md; v10.6 done, see BACKLOG.md; v10.5 done, see BACKLOG.md; v10.4 done, see BACKLOG.md; v10.3 done, see BACKLOG.md; v10.2 done, see BACKLOG.md; numbering is v10.1, v10.2, ... The current plan is the "MASTER PLAN" at the bottom of this file; older notes above are kept for history and are superseded by it.)

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
| v10.4 | **DONE**: **Allergen/dietary tags + filters** on the Menu (vegan, gluten-free, nut-free; tags editable in admin) + **search box** on the Menu | Owner list 6, item 6; Keagan search |
| v10.5 | **DONE**: **Instagram + Facebook** footer section (placeholder handle `sweetest.bakery`, real info from owner) + **glass-style best-seller cards** with admin choice of how many | Older v10.2 and v10.3 slots |
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

- v10.4 (DONE, see BACKLOG.md): dietary tags + filters + menu search. **Owner to-do:** tell me (or tick in admin, Menu items > Edit) which products are vegan, gluten-free, nut-free or dairy-free. Until something is ticked, no tag filters or allergy note show on the site. Ideas for later: add more tags (egg-free, halaal) in `SB.TAGS` in `store.js`.


- v10.5 (DONE, see BACKLOG.md): Instagram + Facebook footer links + glass-style best-seller cards. **Owner to-do:** give me the real Instagram and Facebook handles (or full links) to replace the placeholder `sweetest.bakery` in `config/business.json`; leave one empty to hide it. Next: **v10.6** = most recent + most popular section on Home + admin extras (Sold out today, manage menu sections).

---
## Owner change list 7 (from `Changes for next version.md`, added with v10.5)
Both items are waiting on the owner's info, so they are NOT built yet (owner: "I'll do this once I have all the info"):
1. Rewrite or confirm the six FAQ answers (notice needed, allergens, delivery area and fees, payment). Drop a draft tag by removing `"draft": true` for that item in `config/site-settings.json`.
2. Send real reviews (name, text, optional rating and date), added in the same file.
Nothing to build until the owner sends the wording; when they do, edit `config/site-settings.json` and regenerate `src/js/offline-data.js`.

---
## Owner change list 8 (from `Changes for next version_1.md`, added with v10.6)
Owner list comes first, so it took the v10.6 slot and **everything in the master plan slides one version**: v10.7 = most recent + most popular section + admin extras (Sold out today, manage menu sections); v10.8 = admin that works across devices (backend); v10.9 = order tools; v10.10 = Privacy (POPIA) + Terms pages + visitor theme switcher. Photos and launch stay LAST.
1. Forgot password for people who create accounts (link/verification code so nobody uses someone else's account).
2. Country-code dropdown on phone numbers, default South Africa +27.
3. More themes for special occasions (Christmas, Valentine's Day, Braai Day, and so on).
- v10.6 (DONE, see BACKLOG.md): all three, in a form that works on a static site.
- **Still to do with the backend (v10.8):** the forgot-password step becomes a real emailed link or SMS code (today an admin hands the code to the person), and the same applies if customers ever get accounts (today only admin accounts exist).
- **Ideas for later:** automatic theme by date (e.g. Christmas theme switches on 1 Dec, off 27 Dec; Valentine's 1 to 15 Feb; Braai Day around 24 Sept) so Becca doesn't have to remember; more occasion themes (New Year, Father's Day, Women's Day, Black Friday, Diwali, Eid); seasonal greeting/specials text per theme.

---
## Owner change list 9 (from `Changes for next version_6ebecf.md`, added with v10.7)
1. Add Father's Day, and on every special-occasion theme add small decorations around the whole page and the background, moving around. Special-occasion themes only.
- v10.7 (DONE, see BACKLOG.md). Owner list first again, so the master plan slides one more: **v10.8** = most recent + most popular section + admin extras (Sold out today, manage menu sections); **v10.9** = admin that works across devices (backend, also real email/SMS for forgot password); **v10.10** = order tools; **v10.11** = Privacy (POPIA) + Terms + visitor theme switcher. Photos and launch stay LAST.
- Ideas for later: switch the occasion theme on and off by date automatically (Father's Day = third Sunday of June, Mother's Day = second Sunday of May, Braai Day = 24 Sept); owner-chosen decoration emoji per theme in admin; matching specials text per occasion.

---

# Moved here in v10.21.1: the whole roadmap exactly as it stood at v10.21
The roadmap was rewritten in plain English in v10.21.1. This is the previous version, **word for word, nothing removed** (it includes sections that are now out of date, such as the "versions left" count and the Firebase comparison). Where it disagrees with `ROADMAP.md`, `ROADMAP.md` wins.

# Roadmap: what is done, what is next, what is waiting

**Current version:** v10.21 &nbsp;|&nbsp; **Next up:** v10.22 (cake price guide / quote helper + "Order again" on the thank-you page; needs your real cake prices) &nbsp;|&nbsp; Rule: **max 2 to 3 things per version.**

Finished work lives in [`BACKLOG.md`](BACKLOG.md). The old, long roadmap notes are kept untouched in [`ROADMAP_ARCHIVE.md`](ROADMAP_ARCHIVE.md).

## Table of contents
1. [Up next: the plan, version by version](#1-up-next-the-plan-version-by-version)
2. [Every request from the owner, and where it stands](#2-every-request-from-the-owner-and-where-it-stands)
3. [Waiting on the owner (things only you can give us)](#3-waiting-on-the-owner)
4. [Needs the backend (cannot be done on the static site)](#4-needs-the-backend)
5. [Ideas parking lot (not scheduled)](#5-ideas-parking-lot)
6. [Working rules](#6-working-rules)

Status key: **DONE** built and tested &middot; **NEXT** the next version &middot; **PLANNED** has a version number &middot; **WAITING** needs something from the owner &middot; **BACKEND** needs the hosted backend first

---

## 1. Up next: the plan, version by version
Owner's list always comes first; older scheduled items slide back. Photos and launch are deliberately LAST.

| Version | Status | What we do (max 2 to 3 things) | Why / notes |
|---|---|---|---|
| v10.8 | DONE | Fix: decorations always move + Pause/Play button; live preview of the decorations in admin; this tidy roadmap and backlog | Owner list 10, items 3, 5, 6 |
| v10.9 | DONE | **Automatic seasonal themes** (theme switches by date; dates editable in admin; Preview + "try a date") + **"New and popular" section** on Home (Just added + Most popular) | Owner list 10 item 4; older plan |
| v10.10 | DONE | **"Sold out today"** toggle per product (greys the item out, switches itself off at midnight) + **Automatic seasons dropdown** (all seasons in one section, pick one to change) | Owner list 11; the next-step pick from Claude's recommendation (section 1b) |
| v10.11 | DONE | **Theme dropdown** (all themes in one dropdown, special ones marked) + **tidier admin** (tab bar, collapsible sections, neat item rows, sticky Save bar and preview) + answers: Supabase vs Firebase, top 10 ideas | Owner list 12 items 1 to 4 |
| v10.12 | DONE | **Home page, first round**: "Shop by treat" tiles + "How ordering works" steps (each can be switched off in admin) + **admin hidden from customers** (no public link, no public sign-up) | Owner list 13 items 3 (first part) and 5 |
| v10.13 | DONE | **Home page, round 2**: a short "Meet Becca" section + greeting and specials text that follow the season; **remember my details on this device** (name, phone, notes pre-filled on Cart and Custom Order) | Owner list 13 item 5 (customer side first); the device-only part of list 10 item 1 |
| v10.14 | DONE | **Admin "Remember me"** (tick box under Log in: stay signed in on this device for 30 days, username remembered) + the **"how many versions are left?" answer** (section 1g) | Owner list 14 items 1 and 2 |
| v10.15 | DONE | **Manage menu sections** (add / rename / reorder / hide / delete; the Shop-by-treat tiles and header menu follow) + a **"New" badge** on recently added items (length set in admin) | Older plan; owner list 15 was empty |
| v10.16 | DONE | **Menu items list is now a dropdown** under Menu sections (Admin > Menu) + **Supabase walkthrough** (plain-English explanation, section 1h) | Owner list 16 items 1 and 2; took the v10.16 slot, so every later version slid back by one |
| v10.17 | DONE | **Supabase foundation**: real sign-in (email + Google, real reset emails), **admin locked on the server** (admins by email: Becca + Keanen), **menu and settings live online (no Publish)**, **orders saved online** + backup download | Owner list 17; list 13 items 2 and 3, list 10 item 1, list 6 item 7 |
| v10.18 | DONE | **"My account" page** (sign in, profile, saved details, past orders, order again, change password, delete my account) + **Privacy (POPIA) and Terms pages** (drafts) + **email-sender walkthrough** (section 1i; the sender itself is set up by the owner in Brevo / Resend + Supabase, no code) | Owner list 10 item 2. Privacy page shipped with accounts |
| v10.19 | DONE | **Order tools, part 1**: colour-coded statuses with a one-tap next step (Confirm, Mark ready, Mark done) + a **printable order slip** + **"Numbers"** (this week / this month / last month / all time, with a CSV) + **"Most popular" ranked automatically from real orders** (SQL section 7) | Needs v10.17 (done). The thank-you page and the change log did not fit the 3-things rule and moved to v10.19.1 |
| v10.19.1 | DONE | **Patch: order thank-you page** (shows what was just sent, honest "not confirmed yet", Open WhatsApp, Empty my cart) + **change log** (who changed what on orders, SQL section 8) | Pushed from v10.19 |
| v10.20 | DONE | **More occasion themes** (New Year, Women's Day, Black Friday, Diwali, Eid; Visitors still never switch themes) + **WhatsApp order-status buttons** (confirmed / ready / thank you / cancelled messages filled in for Becca to send) | Top 10 #4. Diwali and Eid dates move each year, so their automatic seasons start switched off |
| v10.21 | DONE | **Top 10 #1: order calendar** (notice days, closed weekdays, blocked dates, orders-per-day limit, "Upcoming dates" box in Orders) + **#2: delivery or collection with fees by area** (fee added to the Cart total, area on Custom Orders) | Built with **placeholder numbers** (3 / 7 days notice, 6 orders a day, two sample areas) that Becca replaces in admin; SQL section 9 |
| **v10.22** | **NEXT** | **Top 10 #6: cake price guide / quote helper** + **"Order again" button** | Needs real prices; order again needs v10.18 |
| v10.23 | PLANNED | **Top 10 #7: gift vouchers** + **#8: loyalty reward / referral** | Needs accounts (v10.17) and your rules |
| v10.24 | PLANNED | **Top 10 #3: deposits / online payment** (Yoco / PayFast / Ozow) on its own, because it handles real money | Needs a payment account opened by the owner |
| v10.25 | PLANNED | **Top 10 #10: opt-in specials broadcast list** (POPIA-friendly) + home page round 3 | Needs accounts + Privacy page |
| When photos exist | WAITING | **Real product photos** instead of emoji (set in admin; emoji stays as fallback) + **Top 10 #5: "Our work" gallery** | Owner decides when; tip: same light and background for every photo |
| LAST (v11) | WAITING | **Get it online**: hosting (GitHub Pages or Netlify), favicon, SEO + page titles, **Top 10 #9: Google Business Profile + local search tidy-up**, share image for WhatsApp / Facebook, custom domain, launch checklist | Only when the owner says "I'm happy with everything" |

### 1b. What Claude recommends doing next (answer to owner list 11 item 1)
In this order, and why:
1. **Small wins first (no backend needed): v10.10 and v10.15.** "Sold out today" and menu-section control are things Becca uses every week, and remembering a customer's details on their own device removes the retyping the owner asked about, without waiting for logins.
2. **Then decide the backend (before v10.17).** It is the biggest unlock: Google / Apple / email sign-in, the account page with past orders, orders saved online, the admin working across devices with no manual Publish, and real forgot-password emails. It needs two decisions from the owner (section 3): Supabase or Firebase, and whether to pay for Apple sign-in.
3. **Fill in the real content in parallel** (section 3): FAQ answers, reviews, Instagram / Facebook handles, real prices, dietary tags, photos. The site cannot launch without them, and none needs code.
4. **Launch LAST**, once the owner says she is happy with everything.
Why not the backend right now: every admin change still needs a manual Publish until it exists, so the backend deserves a clean, uninterrupted version of its own, and it needs the owner's account decisions first.

### 1c. The next versions at a glance (v10.13 to v10.19)
| Version | Plain-English summary |
|---|---|
| v10.13 (done) | More home page: a short "Meet Becca" story section, and the greeting and specials text change with the season. Repeat customers do not retype their name and phone (kept on their own device). |
| v10.14 (done) | Admin "Remember me" tick box under the Log in button, and the count of versions left (section 1g). |
| v10.15 (done) | Becca can add, rename, reorder, hide and delete menu sections herself (the home tiles and header menu follow), plus a "New" badge on recent items. |
| v10.16 (done) | In Admin > Menu the list of items folds into a dropdown under "Menu sections", and the plain-English Supabase explanation is written down (section 1h). |
| v10.17 | The online "back room" (Supabase, free plan): real sign-in, the admin panel locked so **only admins can get in**, the admin works on every device with no manual Publish, orders saved online. Needs you to create the free account (section 3). |
| v10.18 | "My account" page (details, past orders, order again, delete my account) plus the Privacy (POPIA) and Terms pages. |
| v10.19 (done) | Order tools: one-tap statuses, a printable slip, weekly / monthly numbers, and "Most popular" worked out from real orders. (Thank-you page and change log: v10.19.1.) |
After that: v10.20 to v10.25 are the more occasion themes and your approved top-10 list (see the plan table). Visitors never change the theme themselves.

### 1j. The next five, at a glance (answer to "what will you add in the next 5 v/patches?", after v10.21)
| Version | Plain-English summary | Needs from you |
|---|---|---|
| v10.22 | **Cake price guide / quote helper** (pick size, servings and flavour on Custom Orders and see an estimated price, so fewer back-and-forth messages) + **Order again on the thank-you page** (My account already has it) | Your real cake sizes, servings and prices |
| v10.23 | **Gift vouchers** (Becca issues a code, the customer enters it in the Cart, it comes off the total) + **loyalty reward** (e.g. every 10th order a free cupcake box, tracked per signed-in customer) | Your voucher and loyalty rules |
| v10.24 | **Deposits / online payment** (Yoco, PayFast or Ozow) on its own, because it handles real money: a deposit secures the date | A payment account opened by you |
| v10.25 | **Opt-in specials list** (customers who tick "yes, send me specials"; POPIA-friendly, one-tap unsubscribe, Becca copies the list to WhatsApp broadcast) + **Home page round 3** | Nothing new; uses accounts + Privacy page |
| When photos exist | **Real product photos** instead of emoji + **"Our work" gallery** | Your photos (same light and background for every photo) |
After that only the launch version (v11: hosting, favicon, search tidy-up, Google Business Profile, share image, custom domain) is left. Anything you send in a change list goes first and pushes these back by one.

### 1d. Supabase or Firebase? (answer to owner list 12 item 1)
**Recommendation: Supabase**, free plan for now. Checked against the providers' 2026 pricing pages:
- **Free, no card needed.** 2 projects, 500 MB database, 50,000 monthly sign-ins, unlimited API requests. A bakery's orders and menu are tiny; this is plenty for a long time.
- **Fits our data.** Orders, items, customers and accounts are tables that link to each other, which is what Supabase's database (Postgres) is built for. Sign-in with Google and email is included free.
- **Firebase is also free to start (Spark plan), but** the things we will want (running our own server code, e.g. emailing customers, and file storage for photos) need its pay-as-you-go plan with a card on file, and SMS sign-in is charged per text. Not a disaster, just earlier and less predictable.
- **One catch with Supabase's free plan:** a free project pauses after a week with no activity (the data is kept, but the site stops until someone un-pauses it). A bakery getting orders will not sit idle, and a tiny scheduled ping prevents it. When you launch with real customers and are earning, the Pro plan (about US$25 per month) removes the pause and adds daily backups. That is the "pay later" step.
- Sign in with **Apple** is separate from both: it needs an Apple Developer account (about US$99 per year), so we ship Google + email first.
**Decided (owner list 13): Supabase.** Your one job before v10.17: create a free account at supabase.com (we will walk you through it).

### 1e. Top 10 things we suggest adding (answer to owner list 12 item 2)
**All ten were approved by the owner (list 13 item 4) and are now in the plan table:** #4 v10.20, #1 and #2 v10.21, #6 v10.22, #7 and #8 v10.23, #3 v10.24, #10 v10.25, #5 when photos exist, #9 with the launch (v11).
Ordered by how much they help a one-person bakery. None is scheduled yet; pick any and we will slot it in.
1. **Order calendar with lead times and a daily limit** (e.g. "no more than 6 cakes per day", blocked dates, "3 days notice") so Becca never double-books.
2. **Delivery or collection choice with fees by area** (needs your real delivery areas and prices).
3. **Deposits or online payment** (Yoco / PayFast / Ozow), mainly for custom cakes: a deposit secures the date.
4. **Order status updates by WhatsApp** ("Your order is ready for collection") using ready-made message buttons.
5. **"Our work" gallery** (an Instagram-style grid) so customers see real cakes. Needs your photos.
6. **Cake price guide / quote helper** (size, servings, flavours in, estimated price out) so fewer back-and-forth messages.
7. **Gift vouchers** (a code Becca issues; easy at Christmas, Valentine's, Mother's Day).
8. **Loyalty reward or referral** (e.g. every 10th order a free cupcake box; needs accounts, so after v10.17).
9. **Google Business Profile + search tidy-up (SEO) + WhatsApp / Facebook share image** so local people find the bakery. Mostly setup, little code; belongs with the launch version.
10. **Opt-in specials broadcast list** (customers who agree to hear about specials; POPIA-friendly; after accounts exist).
Also nice but smaller: "Order again" button, birthday reminders, a "New" badge on recent items.

### 1f. Home page: what we recommend, and what v10.12 did (answer to owner list 13 item 5)
Goal: the customer-facing site gets the attention now, the admin only when it blocks something. Ranked by how much each helps a first-time visitor decide to order:
1. **DONE v10.12 "Shop by treat" tiles** right under the hero: one tile per menu section plus Custom cake. A visitor sees what Becca makes in two seconds and is one tap from the right part of the menu. It follows the menu sections automatically.
2. **DONE v10.12 "How ordering works"** (Choose, Send, Confirm): removes the "how do I even order?" question before it is asked.
3. **DONE v10.13 "Meet Becca"**: a short, warm story section (who bakes, why, baked to order). People buy from people. Needs a few sentences from Becca, a placeholder goes in first.
4. **DONE v10.13 Season-aware greeting and specials**: at Christmas the greeting and the specials strip talk about Christmas, then switch back by themselves.
5. **With photos**: a real hero photo and photos on the cards (biggest visual upgrade; waits for the owner's photos).
6. **After launch**: Instagram grid / "Our work" gallery, and reviews once real ones exist.
Each new home section can be switched on or off in Admin > Theme & layout > Home page, so nothing is forced.

### 1g. How many versions are left? (answer to owner list 14 item 1)
Counted from the plan table above, after v10.14:
- **10 numbered versions** were still planned after v10.14 (v10.15 is now done, so 9 remain): v10.15 (menu sections, DONE), v10.16 (Supabase backend), v10.17 (My account + Privacy and Terms), v10.18 (order tools), v10.19 (more occasion themes + WhatsApp status buttons), v10.20 (order calendar + delivery), v10.21 (price guide + Order again), v10.22 (vouchers + loyalty), v10.23 (deposits / online payment), v10.24 (broadcast list + home page round 3).
- **2 more steps that wait for you rather than for us:** real product photos (when you have them) and the launch version, v11 (hosting, search tidy-up, domain).
- **So 12 steps in total, 10 of them numbered.** The backend (v10.17) is the biggest; the rest are small to medium.
- **After v10.16** (owner list 16 took a slot, so Supabase moved to v10.17): **9 numbered versions** remain (v10.17 to v10.25) + the 2 steps that wait for you (photos, launch v11) = **11 steps**.
- Done so far: v1 to v10.16 (see `BACKLOG.md`; it lists only finished work, so nothing in it is still to do).
- The number grows by about one for every new list you send, because your list always goes first and the older items slide back. Anything you add that is not in the plan sits in the ideas parking lot (section 5) until it is given a version.

### 1h. Supabase explained, step by step (answer to owner list 16 item 2)
**What it is, in one sentence.** Supabase is an online "back room" for the website: a safe place on the internet where the site can keep things that must be remembered for everyone (accounts, orders, the menu) and checks who is allowed to see or change them.

**Why the site needs one.** Today the website is "static": every page is a plain file, and anything Becca or a customer does is only remembered inside that one browser. That is why admin changes need a manual **Publish**, why the admin does not work across devices, why a customer's order history cannot exist, and why "forgot password" cannot send a real email. A back room fixes all of those at once.

**What Supabase gives us (all in the free plan).**
- **Sign-in.** Google and email sign-in, password reset by real email, "stay signed in" that works on every device. (Apple sign-in is separate and costs about US$99 a year; we skip it unless you want it.)
- **A database.** Tidy tables for orders, order items, customers, menu items and sections. Becca edits the menu once and it is live for everyone instantly.
- **Locks.** Rules written into the database itself: a customer can only ever see their own account and orders, and **only admins** can open the admin panel or change the menu. This is the real lock that the current admin page does not have.
- **Files** (later, for product photos).

**What changes for customers.** Almost nothing at first. The site looks and works the same; they can optionally sign in to save their details and see past orders. Ordering still ends in a WhatsApp message to Becca.

**What it costs (checked against 2026 pricing pages).** The **Free plan is US$0**, with no card needed. It includes 500 MB of database (a bakery's orders are tiny), 50,000 monthly sign-ins, 2 projects and unlimited API requests; file storage and bandwidth are small but plenty to start (sources quote about 5 to 10 GB of bandwidth, we confirm the exact figure when you sign up). Two honest catches: (1) a free project **pauses after about a week with no activity** (data is kept, someone just clicks "restore"; real orders keep it awake, and we can add a tiny scheduled ping); (2) the free plan has **no automatic backups**, so v10.17 adds a "Download a backup" button in the admin. When the bakery is earning, the **Pro plan is about US$25 a month** and removes the pause and adds backups. That is the "pay later" step, and nothing has to be rebuilt to take it.

**What YOU do (about 10 minutes, before v10.17).**
1. Go to supabase.com and click **Start your project**.
2. Sign up with your own email or Google (use an email only you control; it will own the project).
3. Create an **organization** (name it "The Sweetest Bakery") and pick the **Free** plan.
4. Create a **project** called "online-bakery". Choose a **strong database password** and save it in a password manager (we never need it in the website). Pick the **region closest to South Africa** that the list offers.
5. Wait about two minutes while it sets up, then send us two things from **Project Settings > API**: the **Project URL** and the **anon / publishable key**. These two are designed to be public (they sit in the website's code); the data stays safe because of the locks above. **Never send the "service role" / secret key or your database password.**
6. Tell us which email addresses are admins (yours and Becca's).

**What WE do in v10.17.** Create the tables and the locks; connect the site; replace the current admin login with real sign-in (so the old `admin` / `admin1` goes away); make the admin read and write the database (so no more Publish for menu changes); save orders online; add the backup-download button; test every page again. The Privacy (POPIA) page follows in v10.18 and must ship before customers can create accounts.

**Safety and privacy (POPIA).** We store as little as possible (name, phone, email, orders), never card details (payments come later, through Yoco / PayFast, which handle the card themselves), and customers can delete their account (v10.18). We will tell you the region the data sits in so the Privacy page can say so truthfully.

**What could go wrong, and the answer.** Project paused: click restore (or upgrade). Free limits reached: upgrade to Pro. Supabase changes its plans: the data can be exported at any time, so you are never locked in. You lose the admin email: we add a second admin first.

### 1i. Email sender for customers (the third part of v10.18; no code, you set it up)
**Why.** Supabase's free built-in email sender only delivers to the project team's own addresses (about 2 an hour). Customers who create an account need a confirm email, and "forgot password" needs a reset email, so both fail for them until the project has its **own email sender (SMTP)**. Until then the My account page says so honestly, and **Continue with Google** (once switched on) and the WhatsApp route still work.
**What you do (about 20 minutes, then tell us how it went).**
1. Open a free account with an email service. **Brevo** or **Resend** are the usual free choices for a small shop (a few hundred emails a day is plenty). Check their current free limits when you sign up.
2. Verify a **sender**. For emails that reliably reach inboxes (not spam) services want you to verify a **domain** you own (for example `thesweetestbakery.co.za`), which is normally bought with the launch (v11). A free Gmail address is often rejected or lands in spam, so email for customers will likely only work well **after the domain exists**. If you want it sooner, buying the domain first is the answer.
3. Create the SMTP login in the service (host, port, username, password / API key). **Never send us the password**; you paste it straight into Supabase.
4. In Supabase: **Authentication > Emails > SMTP Settings**: switch on custom SMTP and paste the details, set the sender name to "The Sweetest Bakery". Then **Authentication > URL configuration**: set the Site URL to the live address (add `http://localhost:8000` too if testing locally) so the confirm and reset links come back to the site.
5. Test: create a customer account with a normal email address and see the confirm email arrive.
**Meanwhile:** the sign-up and reset messages on the My account page tell the customer plainly if no email arrives, and Google sign-in is the no-email way in (switch it on in Supabase > Authentication > Sign In / Providers > Google, see section 3).

## 2. Every request from the owner, and where it stands
Newest list first. (Version numbers of the BACKEND items have moved later several times because owner lists are done first; v10.14 was taken by owner list 14, so every later number slid by one. Older notes in `BACKLOG.md` that mention v10.11 to v10.15 for backend work use older numbers; the plan table above is always the truth.) "List" is the order the owner's change lists arrived in.

| List | # | Request (short) | Status | Where |
|---|---|---|---|---|
| - | - | (Owner said "follow the roadmap" and asked for the next 5 versions, so the version marked NEXT was built with placeholder numbers: order calendar + delivery fees; next 5 listed in section 1j) | DONE | v10.21 |
| - | - | (No change list came with "start next v/patch", so the version marked NEXT was built: five more occasion themes + WhatsApp order-status buttons) | DONE | v10.20 |
| - | - | (No change list came with "start next v/patch", so the version marked NEXT was built: thank-you page + change log) | DONE | v10.19.1 |
| - | - | (No change list came with "start the next v/patch", so the version marked NEXT was built: statuses + printable slip, Numbers, automatic "Most popular"; thank-you page + change log pushed to v10.19.1 to keep to 3 things) | DONE | v10.19 |
| - | - | (No change list came with "start next v/patch", so the version marked NEXT was built: My account + Privacy and Terms + email-sender walkthrough) | DONE | v10.18 |
| 21 | 1 | In Admin > Theme & layout, hold and drag to put the Home page sections where I want them | DONE (grip handle + up / down arrows; Home follows the order) | v10.17.4 |
| 21 | 2 | Only 2 changes per patch, the rest to the backlog | DONE (only 1 request came; ideas listed in the v10.17.4 backlog entry) | v10.17.4 |
| 20 | 1 | The "New and popular" section on Home is cluttered: make the layout better | DONE (two slim columns, compact rows, one "See the full menu" link) | v10.17.3 |
| 20 | 2 | Only 2 changes per patch, the rest to the backlog | DONE (only 1 request came, nothing extra added; ideas listed in the v10.17.3 backlog entry) | v10.17.3 |
| 17 | 1 | Use the Supabase project + publishable key; add Becca and Keanen as admins in this patch | DONE (emails in `supabase/setup.sql`; keys in `config/business.json`) | v10.17 |
| 19 | 1 | A username and an account picture, chosen on first sign-in, shown after "Hi," | DONE (admins; customer accounts later with My account, v10.18) | v10.17.2 |
| 19 | 2 | Only 2 changes per patch, the rest to the backlog | DONE | v10.17.2 |
| 18 | 1 | The email code / confirm email does not work, so the admin cannot be entered: fix | DONE (no-email login via the Supabase dashboard + honest messages; real email needs a custom SMTP sender, see v10.18 note) | v10.17.1 |
| 18 | 2 | Only 2 changes per patch, the rest to the backlog | DONE | v10.17.1 |
| 17 | 2 | Only 3 changes per version, everything else to the backlog | DONE (rule kept; leftovers listed in the v10.17 backlog entry) | v10.17 |
| 16 | 1 | Make the items list in Admin > Menu a dropdown too, under Menu sections | DONE | v10.16 |
| 16 | 2 | "Go through the explanation of the Supabase thing" | DONE (plain-English walkthrough, section 1h) | v10.16 |
| 15 | 1 | (Change-list file was empty.) "Start the next version" + "tell me what you will do in the next 5 versions" | DONE (v10.15 built; next 5 listed in section 1c: v10.16 to v10.20) | v10.15 |
| 14 | 1 | How many versions are left in the roadmap / backlog? | DONE (answered in section 1g) | v10.14 |
| 14 | 2 | "Remember me" on the admin sign-in (tick box below the sign-in) | DONE | v10.14 |
| 13 | 1 | No visitor theme switching (only Becca and the seasons choose); keep adding more themes | DONE (plan changed) | v10.12 rule; more themes v10.20 |
| 13 | 2 | Use Supabase | DONE (decision recorded; owner creates the free account) | v10.17 |
| 13 | 3 | Only admins can see the admin panel, not customers | DONE (v10.12 no public link; v10.17 real server-side lock) | v10.17 |
| 13 | 4 | Add all 10 suggested things to the roadmap | DONE | v10.20 to v10.25, photos, launch |
| 13 | 5 | Start customising the home page, away from admin things | DONE (round 1 v10.12; round 2 v10.13: Meet Becca, season-aware greeting and strip) | v10.12, v10.13 |
| 12 | 1 | Supabase or Firebase? (free for now, pay later) | DONE (answered in section 1d: Supabase) | v10.11 |
| 12 | 2 | Top 10 things to add | DONE (answered in section 1e) | v10.11 |
| 12 | 3 | Themes dropdown: all themes in one, special ones marked | DONE | v10.11 |
| 12 | 4 | Admin neater: it was confusing and all over the place | DONE | v10.11 |
| 12 | 5 | "Tell me what you will do in the next 5 versions" | DONE (section 1c) | v10.11 |
| 11 | 1 | "What would you do next?" | DONE (answered in section 1b; first pick built) | v10.10 |
| 11 | 2 | Automatic seasons: all dates in one section with a dropdown to pick the season to change | DONE | v10.10 |
| 10 | 1 | Sign in so it remembers people (admins and customers); Google, Apple, etc. | DONE for admins (v10.17) and customers (v10.18, email + Google; Apple skipped, it costs about US$99 a year; confirm / reset emails reach customers only after the email sender is set up, section 1i) | v10.17, v10.18 |
| 10 | 2 | Full account page: whole account, past orders, customise, all info | DONE (My account page; no list sent for this version, so the NEXT item was built) | v10.18 |
| 10 | 3 | Preview of the moving effects when changing theme or ticking the box | DONE | v10.8 |
| 10 | 4 | Theme changes automatically for every season | DONE | v10.9 |
| 10 | 5 | Neat roadmap + backlog with a table of contents | DONE | v10.8 (this file) |
| 10 | 6 | Emojis not moving when the theme changes: fix | DONE | v10.8 |
| 9 | 1 | Father's Day + moving decorations on occasion themes only | DONE | v10.7 (made to always move in v10.8) |
| 8 | 1 | Forgot password with a code | DONE (admin accounts) | v10.6; real email / SMS in v10.17 |
| 8 | 2 | Phone country-code dropdown, default +27 | DONE | v10.6 |
| 8 | 3 | Themes for Christmas, Valentine's, Braai Day, every occasion | DONE | v10.6 (+ Father's Day v10.7); more in v10.20 (DONE) |
| 7 | 1 | Rewrite or confirm the 6 FAQ answers | WAITING | owner sends the info (section 3) |
| 7 | 2 | Add real reviews | WAITING | owner sends the info (section 3) |
| 6 | 1 | Get it online | PLANNED | LAST (v11) |
| 6 | 2 | Real product photos | WAITING | when photos exist |
| 6 | 3 | Cart that sends one WhatsApp message | DONE | v10.2 |
| 6 | 4 | Custom Order form | DONE | v10.2 |
| 6 | 5 | FAQ and reviews | DONE (needs owner's answers) | v10.3 |
| 6 | 6 | Allergen / dietary tags with filters | DONE (owner must tag products) | v10.4 |
| 6 | 7 | Admin that works across devices | DONE | v10.17 |
| 5 | 1 | Instagram + Facebook in the footer | DONE (needs real handles) | v10.5 |
| 5 | 2 | Glass-style best-seller cards + choose how many | DONE | v10.5 |
| 5 | 3 | Most recent + most popular section | DONE (v10.9: owner ticks it; v10.19: now ranked automatically from real orders, ticked items fill the gaps) | v10.9 |

The owner re-sent the list 10 file once more with the same six items and no new requests (so nothing new was added); items 3, 4, 5, 6 are now all DONE, items 1 and 2 wait for the backend.

Older lists (1 to 5) are all finished; see `ROADMAP_ARCHIVE.md` and `BACKLOG.md`.

## 3. Waiting on the owner
Nothing below can be built or guessed by us. Send it whenever you have it.

| Need | Used for | Where it goes |
|---|---|---|
| Real answers for the 6 FAQ questions (notice needed, allergens, delivery area and fees, payment, change / cancel) | FAQ page; drops the "Draft answer" tag | `config/site-settings.json` (`faq`; remove `"draft": true` per item) |
| Real customer reviews (name, text, optional rating and date) | "What people say" on Home and FAQ | `config/site-settings.json` (`reviews`) |
| The text for "Meet Becca" (a few sentences about you; today a placeholder with a Draft tag) | Home "Meet Becca" section | Admin > Theme & layout > Home page > Your story |
| Real Instagram and Facebook handles (or full links) | Footer "Follow us" links (placeholder `sweetest.bakery`) | `config/business.json` (`instagram`, `facebook`) |
| Which products are vegan, gluten-free, nut-free, dairy-free (only what is definitely true) | Dietary tags and filters on the Menu | Admin > Menu items > Edit |
| (Optional) your own Christmas / Valentine's / ... greeting and top-strip lines | Season wording (built-in text is used until you write yours) | Admin > Automatic seasons |
| Real prices and product list (today they are SAMPLE prices) | Menu, cart totals | Admin > Menu items |
| Product photos | Replace emoji | when ready (see plan, "When photos exist") |
| Decision on "Sign in with Apple" | It needs an Apple Developer account (paid, about US$99 per year). Google sign-in and email sign-in are free. If you skip Apple, we ship Google + email first | before v10.17 |
| **v10.17 first run (about 10 minutes, in the Supabase dashboard):** (1) SQL Editor > New query > paste `supabase/setup.sql` > Run. (2) Authentication > URL configuration: set Site URL to the site address once it is hosted (add `http://localhost:8000` too if testing locally). (3) Optional, for Google sign-in: Authentication > Sign In / Providers > Google, switch on and paste a Google Cloud OAuth client id + secret. (4) **Create your admin login without email:** Authentication > Users > Add user > Create new user, type your admin email + a password, tick **Auto Confirm User**; then log in on `admin.html` with them (Supabase's free email sender only emails your own team and about 2 an hour, so confirm / reset emails often never arrive). Email + password works without step 3. | v10.17 working live | now |
| **v10.18 first run:** (1) Supabase > SQL Editor > run `supabase/setup.sql` again (new section 6: customer accounts, your past orders, delete my account). (2) Read the Privacy and Terms pages and fix anything that is not true for the bakery (they are marked Draft): the **region** your Supabase data sits in (Project Settings > General), whether Becca is the information officer, notice and cancellation wording. (3) Email sender for customers: section 1i. | Customer accounts working for real | now |
| **v10.19 first run:** Supabase > SQL Editor > paste the **whole** new `supabase/setup.sql` over the old text (or into a new query) > Run (new section 7: the "Most popular" ranking). Nothing is deleted. Until you do, Most popular quietly keeps using the items you tick. | Automatic "Most popular" working for real | now |
| **v10.19.1 first run:** Supabase > SQL Editor > paste the whole new `supabase/setup.sql` > Run (new section 8: the order change log). Until then the log box says "needs setup" and everything else works. | Change log working | now |
| **v10.21 first run:** (1) Supabase > SQL Editor > paste the whole new `supabase/setup.sql` > Run (new section 9: the daily-limit count; until then dates are still checked for notice, closed days and blocked dates, only the daily limit is skipped). (2) **Admin > Theme & layout > Order calendar & delivery:** replace the placeholder numbers (notice days, orders per day, closed weekdays, delivery areas and fees, free-delivery amount, collection message) and Save. | Order calendar + delivery fees working for real | now |
| For the top-10 items: real cake prices (v10.22), which payment provider (Yoco / PayFast / Ozow), voucher and loyalty rules | v10.21 to v10.24 | when we reach each one |

## 4. Needs the backend
(v10.17 added the backend: sign-in, database, locks. What is left below is built on top of it.)
A static website (what we have now) cannot keep an account for someone on all their devices, send real emails or SMS, or let you sign in with Google or Apple. Everything below waits for v10.17, which adds a hosted backend (login, database, email). Until then: carts, details and admin changes live on one device only.
- Sign in with Google / Apple / email, and being remembered on every device (v10.17)
- Customer and admin "My account" page with past orders (v10.18)
- Real forgot-password link or SMS code instead of the admin handing over a code (v10.17)
- Admin changes going live instantly for everyone, no manual Publish (v10.17)
- Orders saved online, order statuses, printable slips, reports (DONE v10.19 and v10.19.1)
- Small interim idea that does NOT need the backend: remember the customer's name, phone and last order details on their own device so they don't retype (DONE v10.13, this device only)

## 5. Ideas parking lot
Not scheduled. Tell us which to pull into a version. The ranked **top 10** is in section 1e; the older ideas are below.
- Gallery / "Our work" page with an Instagram-style grid
- Order lead-time / availability calendar (needs the owner's real lead times)
- Online card payments (Yoco / PayFast / Ozow), only if wanted after launch
- Privacy-friendly analytics
- Specials with start and end dates; clickable specials; seasonal specials banner per occasion
- Owner-chosen decoration emoji per theme in admin
- A "New" badge on items added in the last 2 weeks (DONE v10.15)
- "Sold out" for a chosen date range or "until further notice" (today it is one day at a time, switching itself off at midnight)
- Seasonal greeting / specials text that changes with the season theme (DONE v10.13)
- Let the owner edit the Easter / Mother's Day / Father's Day windows (today only the fixed-date seasons have editable dates; those three are worked out from the calendar)
- Reserve space for the two strips so the page does not jump on first load
- Customer accounts only if repeat-order history is wanted (it is now, see v10.18)
- Finish the reference review of `online_bakery_marketplace_v2` and verify licences
- Notes from the Keagan reference repos (what we borrowed, what we skip) are in `ROADMAP_ARCHIVE.md`

## 6. Working rules
1. 2 to 3 things per version, no more. Anything else goes into the plan above or the ideas list.
2. Roadmap and backlog are append-only in spirit: nothing is thrown away. Old text that is no longer current moves to `ROADMAP_ARCHIVE.md`; it is never deleted.
3. When a version is finished: add it to `BACKLOG.md` (summary table + full entry), update the status here, bump `VERSION`.
4. Read `docs/AI_HANDOFF.md` before starting a version. Deliver the whole repo (with `.git`) as `online-bakery-vN.zip`.
5. **Visitors never choose the theme** (owner, list 13): only Becca (everyday theme) and the automatic seasons decide. More themes are fine, a visitor-side switcher is not.
6. **The admin is for admins only**: never link to `admin.html` from a public page; no public sign-up. New admins are added by an existing admin. Real protection (server-side) arrives with Supabase.

---

# Moved here in v10.21.1: the old "Current version" line from the README
It had grown into one very long line. It is kept here word for word; the same history, in plain English, is now in the table in `BACKLOG.md`.

**Current version:** see `VERSION` (v10.21 = order calendar (notice days, closed weekdays, blocked dates, orders-per-day limit; customers cannot send a date that breaks the rules) + delivery or collection with fees by area added to the Cart total and shown on Custom Orders; all numbers are **placeholders** Becca sets in Admin > Theme & layout > Order calendar & delivery (run `supabase/setup.sql` again, section 9); v10.20 = five more occasion themes (New Year, Women's Day, Black Friday, Diwali, Eid) + WhatsApp order-status messages on every order in Admin > Orders; v10.19.1 = patch: a thank-you page after an order is sent + an order change log in Admin > Orders (run `supabase/setup.sql` again, section 8); v10.19 = order tools: colour-coded statuses with a one-tap next step + a printable order slip + weekly / monthly Numbers (with CSV) in Admin > Orders, and the Home "Most popular" ranked from real orders (run `supabase/setup.sql` again, section 7); v10.18 = customer accounts: a My account page (sign in with email or Google, username + picture, past orders, Order again, details saved on this device, change password, delete my account) + Privacy (POPIA) and Terms pages (drafts for Becca to confirm) + a note on the Cart / Custom Order forms that the order is saved (run `supabase/setup.sql` again, section 6); v10.17.4 = patch: drag the Home page sections into any order in Admin > Theme & layout > Home page (grip handle + up / down arrows, saved as `homeOrder`); v10.17.3 = patch: Home "New and popular" tidied (two slim columns, compact rows, one link); v10.17.2 = patch: admin profile, a username + round account picture chosen on first sign-in (run `supabase/setup.sql` again); v10.17.1 = patch: admin login that works without email + honest error messages; v10.17 = Supabase foundation: real admin sign-in (email + Google), admin locked on the server to the emails in `supabase/setup.sql`, menu + settings saved online (no more Publish), orders from the Cart / Custom Order saved online, backup download; v10.16 = admin Menu items list is a dropdown under Menu sections + Supabase walkthrough in the roadmap (section 1h); v10.15 = admin can add / rename / reorder / hide / delete menu sections (Menu page, header menu and Home tiles follow) + a "New" badge on items added in the last 2 weeks (length set in admin); v10.14 = admin "Remember me" tick box under the Log in button (stay signed in on this device for 30 days); v10.13 = "Meet Becca" section on Home + greeting and top strip that follow the season + "remember my details on this device" on the Cart and Custom Order form; v10.12 = home page "Shop by treat" tiles + "How ordering works" steps, admin link removed from the public site, no public admin sign-up; v10.11 = themes in one dropdown (special ones marked) + tidier admin (tab bar, collapsible sections, neat item rows); v10.10 = "Sold out today" toggle + Automatic seasons dropdown (pick a season to change); v10.9 = automatic seasonal themes (by date, editable in admin) + "New and popular" section on Home; v10.8 = decorations always move + Pause button, live preview of the effects in admin, tidy roadmap/backlog with contents; v10.7 = Father's Day theme + small moving decorations on every special-occasion theme (admin can switch them off); v10.6 = forgot-password with a one-time code (admin login) + country-code dropdown on phone numbers (default +27) + 6 special-occasion themes (Christmas, Valentine's, Easter, Halloween, Braai Day, Mother's Day); v10.5 = Instagram + Facebook links in the footer (placeholder handle `sweetest.bakery`, set in `config/business.json`) + glass-style best-seller cards with admin choice of how many and Glass/Plain style; v10.4 = dietary tags + filters and search on the Menu (no items tagged yet); v10.3 = FAQ page (draft answers) + reviews section (empty until real reviews are added); v10.2 = cart that sends one WhatsApp message (Add buttons, header cart icon, Cart page) + the Custom Order form; v10.1 = both strips stay pinned while scrolling + three-line menu on phones, links in the header on desktop; v10 = orders strip at the bottom of every page + one floating WhatsApp button (other WhatsApp buttons removed, Contact keeps its own); v9 = "Our best sellers" heading + scrolling specials strip at the top of every page (text and on/off in admin); v8 = second hero (baked goods + greeting, chosen in admin) + menu List layout fixed; v7 = double-click `preview.html` to browse the whole site + only "Menu" is a dropdown; v6 = clicked menu link colour + buttons invert on hover; v5 = header menu is always a dropdown with a hover highlight; v4 = Menu page with filters + decluttered home + admin page (`/src/admin.html`, default `admin` / `admin1`); to preview, double-click `preview.html`)
