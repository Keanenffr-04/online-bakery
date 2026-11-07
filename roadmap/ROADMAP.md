# Roadmap: what is done, what is next, what is waiting

**Current version:** v10.11 &nbsp;|&nbsp; **Next up:** v10.12 (manage menu sections + remember my details on this device) &nbsp;|&nbsp; Rule: **max 2 to 3 things per version.**

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
| **v10.12** | **NEXT** | **Manage menu sections** (add / rename / reorder / hide) + **remember my details on this device** (name, phone, notes pre-filled on Cart and Custom Order, so repeat customers don't retype) | Older plan; the "remember me" part of owner list 10 item 1 that needs no backend |
| v10.13 | BACKEND | **Hosted backend foundation (Supabase)**: real accounts, **sign in with Google / Apple / email**, "remember me" across devices, admin works across devices (no manual Publish), forgot-password by real email or SMS, orders saved online, automatic backup | Owner list 10 item 1 and list 6 item 7. One big item, gets a version to itself |
| v10.14 | BACKEND | **"My account" page** (profile, saved details, past orders, order again, edit and delete my account) for customers and admins + **Privacy (POPIA) and Terms pages** | Owner list 10 item 2. Privacy page MUST ship with accounts (we store personal information) |
| v10.15 | BACKEND | **Order tools**: statuses (New, Confirmed, Ready, Collected / Delivered, Cancelled), thank-you page, printable order slip, weekly / monthly numbers + CSV, change log; **"Most popular" ranked automatically from real orders** | Needs v10.13 |
| v10.16 | PLANNED | **Visitor theme switcher** + more occasion themes (New Year, Women's Day, Black Friday, Diwali, Eid ...) + pick the favourite everyday theme with Becca | Older plan |
| When photos exist | WAITING | **Real product photos** instead of emoji (set in admin; emoji stays as fallback) | Owner decides when; tip: same light and background for every photo |
| LAST (v11) | WAITING | **Get it online**: hosting (GitHub Pages or Netlify), favicon, SEO + page titles, share image for WhatsApp / Facebook, custom domain, launch checklist | Only when the owner says "I'm happy with everything" |

### 1b. What Claude recommends doing next (answer to owner list 11 item 1)
In this order, and why:
1. **Small wins first (no backend needed): v10.10 and v10.12.** "Sold out today" and menu-section control are things Becca uses every week, and remembering a customer's details on their own device removes the retyping the owner asked about, without waiting for logins.
2. **Then decide the backend (before v10.13).** It is the biggest unlock: Google / Apple / email sign-in, the account page with past orders, orders saved online, the admin working across devices with no manual Publish, and real forgot-password emails. It needs two decisions from the owner (section 3): Supabase or Firebase, and whether to pay for Apple sign-in.
3. **Fill in the real content in parallel** (section 3): FAQ answers, reviews, Instagram / Facebook handles, real prices, dietary tags, photos. The site cannot launch without them, and none needs code.
4. **Launch LAST**, once the owner says she is happy with everything.
Why not the backend right now: every admin change still needs a manual Publish until it exists, so the backend deserves a clean, uninterrupted version of its own, and it needs the owner's account decisions first.

### 1c. The next five versions at a glance (v10.12 to v10.16)
| Version | Plain-English summary |
|---|---|
| v10.12 | Becca can add, rename, reorder and hide menu sections herself. Repeat customers do not retype their name and phone (kept on their own device). |
| v10.13 | The online "back room" (Supabase, free plan): real sign-in with Google or email, the admin works on every device with no manual Publish, orders are saved online. Needs your OK first (section 3). |
| v10.14 | "My account" page (details, past orders, order again, delete my account) for customers and admins, plus the Privacy (POPIA) and Terms pages. |
| v10.15 | Order tools: statuses, thank-you page, printable slip, weekly / monthly numbers, and "Most popular" worked out from real orders. |
| v10.16 | Visitors can switch the theme themselves, plus more occasion themes (New Year, Women's Day, Black Friday, Diwali, Eid ...). |
Anything from the top-10 list below that you want sooner replaces something in this table, and the rest slides back (max 2 to 3 per version).

### 1d. Supabase or Firebase? (answer to owner list 12 item 1)
**Recommendation: Supabase**, free plan for now. Checked against the providers' 2026 pricing pages:
- **Free, no card needed.** 2 projects, 500 MB database, 50,000 monthly sign-ins, unlimited API requests. A bakery's orders and menu are tiny; this is plenty for a long time.
- **Fits our data.** Orders, items, customers and accounts are tables that link to each other, which is what Supabase's database (Postgres) is built for. Sign-in with Google and email is included free.
- **Firebase is also free to start (Spark plan), but** the things we will want (running our own server code, e.g. emailing customers, and file storage for photos) need its pay-as-you-go plan with a card on file, and SMS sign-in is charged per text. Not a disaster, just earlier and less predictable.
- **One catch with Supabase's free plan:** a free project pauses after a week with no activity (the data is kept, but the site stops until someone un-pauses it). A bakery getting orders will not sit idle, and a tiny scheduled ping prevents it. When you launch with real customers and are earning, the Pro plan (about US$25 per month) removes the pause and adds daily backups. That is the "pay later" step.
- Sign in with **Apple** is separate from both: it needs an Apple Developer account (about US$99 per year), so we ship Google + email first.
Decision for you before v10.13: say "go with Supabase" and create a free account at supabase.com (we will walk you through it).

### 1e. Top 10 things we suggest adding (answer to owner list 12 item 2)
Ordered by how much they help a one-person bakery. None is scheduled yet; pick any and we will slot it in.
1. **Order calendar with lead times and a daily limit** (e.g. "no more than 6 cakes per day", blocked dates, "3 days notice") so Becca never double-books.
2. **Delivery or collection choice with fees by area** (needs your real delivery areas and prices).
3. **Deposits or online payment** (Yoco / PayFast / Ozow), mainly for custom cakes: a deposit secures the date.
4. **Order status updates by WhatsApp** ("Your order is ready for collection") using ready-made message buttons.
5. **"Our work" gallery** (an Instagram-style grid) so customers see real cakes. Needs your photos.
6. **Cake price guide / quote helper** (size, servings, flavours in, estimated price out) so fewer back-and-forth messages.
7. **Gift vouchers** (a code Becca issues; easy at Christmas, Valentine's, Mother's Day).
8. **Loyalty reward or referral** (e.g. every 10th order a free cupcake box; needs accounts, so after v10.13).
9. **Google Business Profile + search tidy-up (SEO) + WhatsApp / Facebook share image** so local people find the bakery. Mostly setup, little code; belongs with the launch version.
10. **Opt-in specials broadcast list** (customers who agree to hear about specials; POPIA-friendly; after accounts exist).
Also nice but smaller: "Order again" button, birthday reminders, a "New" badge on recent items.

## 2. Every request from the owner, and where it stands
Newest list first. (The version numbers of the BACKEND items moved up by one when v10.12 was added; older notes in `BACKLOG.md` that say v10.12 / v10.13 / v10.14 mean v10.13 / v10.14 / v10.15.) "List" is the order the owner's change lists arrived in.

| List | # | Request (short) | Status | Where |
|---|---|---|---|---|
| 12 | 1 | Supabase or Firebase? (free for now, pay later) | DONE (answered in section 1d: Supabase) | v10.11 |
| 12 | 2 | Top 10 things to add | DONE (answered in section 1e) | v10.11 |
| 12 | 3 | Themes dropdown: all themes in one, special ones marked | DONE | v10.11 |
| 12 | 4 | Admin neater: it was confusing and all over the place | DONE | v10.11 |
| 12 | 5 | "Tell me what you will do in the next 5 versions" | DONE (section 1c) | v10.11 |
| 11 | 1 | "What would you do next?" | DONE (answered in section 1b; first pick built) | v10.10 |
| 11 | 2 | Automatic seasons: all dates in one section with a dropdown to pick the season to change | DONE | v10.10 |
| 10 | 1 | Sign in so it remembers people (admins and customers); Google, Apple, etc. | BACKEND (a device-only "remember my details" part comes earlier in v10.12) | v10.13 |
| 10 | 2 | Full account page: whole account, past orders, customise, all info | BACKEND | v10.14 |
| 10 | 3 | Preview of the moving effects when changing theme or ticking the box | DONE | v10.8 |
| 10 | 4 | Theme changes automatically for every season | DONE | v10.9 |
| 10 | 5 | Neat roadmap + backlog with a table of contents | DONE | v10.8 (this file) |
| 10 | 6 | Emojis not moving when the theme changes: fix | DONE | v10.8 |
| 9 | 1 | Father's Day + moving decorations on occasion themes only | DONE | v10.7 (made to always move in v10.8) |
| 8 | 1 | Forgot password with a code | DONE (admin accounts) | v10.6; real email / SMS in v10.13 |
| 8 | 2 | Phone country-code dropdown, default +27 | DONE | v10.6 |
| 8 | 3 | Themes for Christmas, Valentine's, Braai Day, every occasion | DONE | v10.6 (+ Father's Day v10.7); more in v10.16 |
| 7 | 1 | Rewrite or confirm the 6 FAQ answers | WAITING | owner sends the info (section 3) |
| 7 | 2 | Add real reviews | WAITING | owner sends the info (section 3) |
| 6 | 1 | Get it online | PLANNED | LAST (v11) |
| 6 | 2 | Real product photos | WAITING | when photos exist |
| 6 | 3 | Cart that sends one WhatsApp message | DONE | v10.2 |
| 6 | 4 | Custom Order form | DONE | v10.2 |
| 6 | 5 | FAQ and reviews | DONE (needs owner's answers) | v10.3 |
| 6 | 6 | Allergen / dietary tags with filters | DONE (owner must tag products) | v10.4 |
| 6 | 7 | Admin that works across devices | BACKEND | v10.13 |
| 5 | 1 | Instagram + Facebook in the footer | DONE (needs real handles) | v10.5 |
| 5 | 2 | Glass-style best-seller cards + choose how many | DONE | v10.5 |
| 5 | 3 | Most recent + most popular section | DONE (popular = owner ticks it for now; automatic ranking in v10.15) | v10.9 |

The owner re-sent the list 10 file once more with the same six items and no new requests (so nothing new was added); items 3, 4, 5, 6 are now all DONE, items 1 and 2 wait for the backend.

Older lists (1 to 5) are all finished; see `ROADMAP_ARCHIVE.md` and `BACKLOG.md`.

## 3. Waiting on the owner
Nothing below can be built or guessed by us. Send it whenever you have it.

| Need | Used for | Where it goes |
|---|---|---|
| Real answers for the 6 FAQ questions (notice needed, allergens, delivery area and fees, payment, change / cancel) | FAQ page; drops the "Draft answer" tag | `config/site-settings.json` (`faq`; remove `"draft": true` per item) |
| Real customer reviews (name, text, optional rating and date) | "What people say" on Home and FAQ | `config/site-settings.json` (`reviews`) |
| Real Instagram and Facebook handles (or full links) | Footer "Follow us" links (placeholder `sweetest.bakery`) | `config/business.json` (`instagram`, `facebook`) |
| Which products are vegan, gluten-free, nut-free, dairy-free (only what is definitely true) | Dietary tags and filters on the Menu | Admin > Menu items > Edit |
| Real prices and product list (today they are SAMPLE prices) | Menu, cart totals | Admin > Menu items |
| Product photos | Replace emoji | when ready (see plan, "When photos exist") |
| Decision on "Sign in with Apple" | It needs an Apple Developer account (paid, about US$99 per year). Google sign-in and email sign-in are free. If you skip Apple, we ship Google + email first | before v10.13 |
| Say "go with Supabase" (our recommendation, section 1d) and create a free Supabase account; we walk you through it | v10.13 | before v10.13 |

## 4. Needs the backend
A static website (what we have now) cannot keep an account for someone on all their devices, send real emails or SMS, or let you sign in with Google or Apple. Everything below waits for v10.13, which adds a hosted backend (login, database, email). Until then: carts, details and admin changes live on one device only.
- Sign in with Google / Apple / email, and being remembered on every device (v10.13)
- Customer and admin "My account" page with past orders (v10.14)
- Real forgot-password link or SMS code instead of the admin handing over a code (v10.13)
- Admin changes going live instantly for everyone, no manual Publish (v10.13)
- Orders saved online, order statuses, printable slips, reports (v10.15)
- Small interim idea that does NOT need the backend: remember the customer's name, phone and last order details on their own device so they don't retype (can be done any time; tell us if you want it sooner)

## 5. Ideas parking lot
Not scheduled. Tell us which to pull into a version. The ranked **top 10** is in section 1e; the older ideas are below.
- Gallery / "Our work" page with an Instagram-style grid
- Order lead-time / availability calendar (needs the owner's real lead times)
- Online card payments (Yoco / PayFast / Ozow), only if wanted after launch
- Privacy-friendly analytics
- Specials with start and end dates; clickable specials; seasonal specials banner per occasion
- Owner-chosen decoration emoji per theme in admin
- A "New" badge on items added in the last 2 weeks
- "Sold out" for a chosen date range or "until further notice" (today it is one day at a time, switching itself off at midnight)
- Seasonal greeting / specials text that changes with the season theme
- Let the owner edit the Easter / Mother's Day / Father's Day windows (today only the fixed-date seasons have editable dates; those three are worked out from the calendar)
- Reserve space for the two strips so the page does not jump on first load
- Customer accounts only if repeat-order history is wanted (it is now, see v10.14)
- Finish the reference review of `online_bakery_marketplace_v2` and verify licences
- Notes from the Keagan reference repos (what we borrowed, what we skip) are in `ROADMAP_ARCHIVE.md`

## 6. Working rules
1. 2 to 3 things per version, no more. Anything else goes into the plan above or the ideas list.
2. Roadmap and backlog are append-only in spirit: nothing is thrown away. Old text that is no longer current moves to `ROADMAP_ARCHIVE.md`; it is never deleted.
3. When a version is finished: add it to `BACKLOG.md` (summary table + full entry), update the status here, bump `VERSION`.
4. Read `docs/AI_HANDOFF.md` before starting a version. Deliver the whole repo (with `.git`) as `online-bakery-vN.zip`.
