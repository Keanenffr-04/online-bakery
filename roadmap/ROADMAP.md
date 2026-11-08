# Roadmap: what is done, what is next, what is waiting

**Current version:** v10.17.4 &nbsp;|&nbsp; **Next up:** v10.18 (My account page + Privacy and Terms pages; run `supabase/setup.sql` first if you have not) &nbsp;|&nbsp; Rule: **max 2 to 3 things per version.**

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
| **v10.18** | **NEXT** | **"My account" page** (profile, saved details, past orders, order again, edit and delete my account) + **Privacy (POPIA) and Terms pages** + **a custom email sender (SMTP) so customers can receive confirm / reset emails** (needs a free Brevo or Resend account) | Owner list 10 item 2. Privacy page MUST ship with accounts |
| v10.19 | BACKEND | **Order tools**: statuses, thank-you page, printable slip, weekly / monthly numbers + CSV, change log; **"Most popular" ranked automatically from real orders** | Needs v10.17 |
| v10.20 | PLANNED | **More occasion themes** (New Year, Women's Day, Black Friday, Diwali, Eid ...). **Visitors never switch themes** (owner list 13 item 1): only Becca and the automatic seasons decide + **Top 10 #4: WhatsApp order-status buttons** ("ready for collection") | Needs v10.19 for the buttons |
| v10.21 | PLANNED | **Top 10 #1: order calendar** (lead times, daily limit, blocked dates) + **#2: delivery or collection with fees by area** | Needs your real lead times, areas and prices |
| v10.22 | PLANNED | **Top 10 #6: cake price guide / quote helper** + **"Order again" button** | Needs real prices; order again needs v10.18 |
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
| v10.19 | Order tools: statuses, thank-you page, printable slip, weekly / monthly numbers, and "Most popular" worked out from real orders. |
After that: v10.20 to v10.25 are the more occasion themes and your approved top-10 list (see the plan table). Visitors never change the theme themselves.

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

## 2. Every request from the owner, and where it stands
Newest list first. (Version numbers of the BACKEND items have moved later several times because owner lists are done first; v10.14 was taken by owner list 14, so every later number slid by one. Older notes in `BACKLOG.md` that mention v10.11 to v10.15 for backend work use older numbers; the plan table above is always the truth.) "List" is the order the owner's change lists arrived in.

| List | # | Request (short) | Status | Where |
|---|---|---|---|---|
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
| 10 | 1 | Sign in so it remembers people (admins and customers); Google, Apple, etc. | PARTLY DONE: admins sign in for real (v10.17); customer accounts come with "My account" | v10.17, v10.18 |
| 10 | 2 | Full account page: whole account, past orders, customise, all info | BACKEND | v10.18 |
| 10 | 3 | Preview of the moving effects when changing theme or ticking the box | DONE | v10.8 |
| 10 | 4 | Theme changes automatically for every season | DONE | v10.9 |
| 10 | 5 | Neat roadmap + backlog with a table of contents | DONE | v10.8 (this file) |
| 10 | 6 | Emojis not moving when the theme changes: fix | DONE | v10.8 |
| 9 | 1 | Father's Day + moving decorations on occasion themes only | DONE | v10.7 (made to always move in v10.8) |
| 8 | 1 | Forgot password with a code | DONE (admin accounts) | v10.6; real email / SMS in v10.17 |
| 8 | 2 | Phone country-code dropdown, default +27 | DONE | v10.6 |
| 8 | 3 | Themes for Christmas, Valentine's, Braai Day, every occasion | DONE | v10.6 (+ Father's Day v10.7); more in v10.20 |
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
| 5 | 3 | Most recent + most popular section | DONE (popular = owner ticks it for now; automatic ranking in v10.19) | v10.9 |

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
| For the top-10 items: real lead times and daily limit, delivery areas and fees, which payment provider (Yoco / PayFast / Ozow), voucher and loyalty rules | v10.21 to v10.24 | when we reach each one |

## 4. Needs the backend
(v10.17 added the backend: sign-in, database, locks. What is left below is built on top of it.)
A static website (what we have now) cannot keep an account for someone on all their devices, send real emails or SMS, or let you sign in with Google or Apple. Everything below waits for v10.17, which adds a hosted backend (login, database, email). Until then: carts, details and admin changes live on one device only.
- Sign in with Google / Apple / email, and being remembered on every device (v10.17)
- Customer and admin "My account" page with past orders (v10.18)
- Real forgot-password link or SMS code instead of the admin handing over a code (v10.17)
- Admin changes going live instantly for everyone, no manual Publish (v10.17)
- Orders saved online, order statuses, printable slips, reports (v10.19)
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
