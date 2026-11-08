# 🗺️ Roadmap: what's next and what we need from you

**Where we are:** v10.21.1 &nbsp;|&nbsp; **Next up:** v10.22 (cake price guide + "Order again" on the thank-you page) &nbsp;|&nbsp; **Rule:** 2 to 3 things per version.

*This page is written for Becca. No website or coding knowledge needed. Words you might not know are explained in the "Words explained" list in the [README](../README.md). Finished work is in [`BACKLOG.md`](BACKLOG.md).*

## In one minute
- ✅ **The shop works.** Menu, cart, custom orders, WhatsApp, customer accounts, the admin, themes, order calendar and delivery fees are all built.
- ⏭️ **Next:** the cake price guide (v10.22). It needs your real cake sizes and prices.
- ⏳ **Waiting on you:** real prices, FAQ answers, reviews, your story, Instagram / Facebook names and photos. The full checklist is in section 2.
- 🚀 **Last step:** putting the website online, only when you say "I'm happy with everything".

**What the symbols mean:** ✅ done &middot; ⏭️ next &middot; 📅 planned (has a version number) &middot; ⏳ waiting for something from you

## Contents
1. [What is still to build (the plan)](#plan)
2. [What we need from you (your checklist)](#need)
3. [Every request you have made, and where it stands](#requests)
4. [Ideas for later (not scheduled)](#ideas)
5. [Guides in plain English](#guides)
6. [How we work together (the rules)](#rules)

---

<a id="plan"></a>
## 1. What is still to build (the plan)
Your change lists always go **first**, so the versions below may slide back by one when you send a list. Photos and going online are deliberately **last**. Everything already built is listed in [`BACKLOG.md`](BACKLOG.md) (start with "What the website can do today").

| Version | Status | What you will get | What we need from you |
|---|---|---|---|
| **v10.22** | ⏭️ Next | **Cake price guide:** a customer picks size, servings and flavour and sees an estimated price, so there are fewer messages back and forth. Plus **"Order again"** on the thank-you page (My account already has it). | Your real cake sizes, servings and prices |
| v10.23 | 📅 Planned | **Gift vouchers** (you give a code, the customer types it in the cart, it comes off the total) + a **loyalty reward** (for example every 10th order a free cupcake box) | Your voucher and loyalty rules |
| v10.24 | 📅 Planned | **Deposits / online payment** (Yoco, PayFast or Ozow). A deposit secures the date. This one is on its own because it handles real money. | A payment account that you open |
| v10.25 | 📅 Planned | **Specials list:** customers who tick "yes, send me specials" (POPIA-friendly, with an easy unsubscribe) + **Home page, round 3** | Nothing new |
| When photos exist | ⏳ Waiting | **Real product photos** instead of emoji + an **"Our work" gallery** | Your photos (tip: same light and background for every photo) |
| Last (v11) | ⏳ Waiting | **Put the website online:** hosting, small browser icon, search-engine tidy-up, Google Business Profile, share picture for WhatsApp / Facebook, your own web address, launch checklist | You saying "I'm happy with everything" |

---

<a id="need"></a>
## 2. What we need from you (your checklist)
Nothing here can be built or guessed by us. Send things whenever you have them (in your next change list is fine).

### 2a. Your to-do list
- [ ] **Update the online database** with the newest `supabase/setup.sql` (steps in 2c). Latest change: v10.21.
- [ ] **Replace the placeholder numbers** in Admin > Theme & layout > **Order calendar & delivery**: days of notice, orders per day, days off, delivery areas and fees. Today they are samples.
- [ ] **Real prices and product list.** Today the menu prices are samples (Admin > Menu items).
- [ ] **FAQ answers, reviews, your "Meet Becca" story, Instagram and Facebook names** (details in 2b).
- [ ] **Read the Privacy and Terms pages** and fix anything that is not true for your bakery. They are drafts.
- [ ] **Which items are vegan, gluten-free, nut-free, dairy-free** (only what is definitely true).
- [ ] **Email sender for customers** (guide 5c). Easiest once you own a web address.
- [ ] **A payment account** before v10.24.
- [ ] **Photos** when you have them.
- [ ] **Tell us when you are happy** and we will put the website online.

### 2b. Details only you can give us
| What we need | Where it shows up | How to give it to us |
|---|---|---|
| Real answers to the 6 FAQ questions (notice needed, allergens, delivery area and fees, payment, changing or cancelling an order) | FAQ page (the "Draft answer" tag goes away) | Send them in your next change list |
| Real customer reviews (name, what they said, optional stars and date) | "What people say" on Home and FAQ | Send them in your next change list |
| A few sentences about you | Home page "Meet Becca" (today a placeholder marked Draft) | Type it in Admin > Theme & layout > Home page > Your story |
| Your real Instagram and Facebook names (or full links) | "Follow us" links in the footer (today the sample name `sweetest.bakery`) | Send them in your next change list |
| Which products are vegan, gluten-free, nut-free, dairy-free | Tags and filters on the Menu | Admin > Menu items > Edit |
| Your own wording for Christmas, Valentine's and other seasons (optional) | Greeting and top strip during that season | Admin > Theme & layout > Automatic seasons |
| Real prices and product list | Menu and cart totals | Admin > Menu items |
| Real notice days, daily limit, delivery areas and fees | Order calendar and delivery | Admin > Theme & layout > Order calendar & delivery |
| Product photos | Replace the emoji | When you are ready |
| Voucher and loyalty rules, payment provider | v10.23 and v10.24 | When we reach those versions |
| *Decided:* Sign in with Apple is **skipped for now** (it costs about US$99 a year). Google and email sign-in are free and built. | | |

### 2c. Update the online database (do this when a version says so)
The newest `supabase/setup.sql` always contains everything, so you can run it at any time. **Nothing is deleted when you run it.**
1. Open your project at **supabase.com** and sign in.
2. In the left menu click **SQL Editor**, then **New query**.
3. Open the file `supabase/setup.sql` from the project folder in Notepad. Select all, copy, paste into the query box.
4. Click **Run**.
If you skip this, the site keeps working, but the newest extras (for example the daily order limit from v10.21) stay switched off.

### 2d. First-time setup (once only, already done if the admin works for you)
1. Run `supabase/setup.sql` (steps above).
2. **Authentication > URL configuration:** set the Site URL to the website address once it is online.
3. *Optional, for "Continue with Google":* Authentication > Sign In / Providers > Google, switch it on and paste the Google client id and secret.
4. **Create your admin login without email:** Authentication > Users > **Add user** > Create new user. Type your admin email and a password and tick **Auto Confirm User**. Then sign in on the admin page. (Supabase's free email sender only emails the project team, about 2 an hour, so confirmation emails often never arrive.)

---

<a id="requests"></a>
## 3. Every request you have made, and where it stands
Newest first. "List" is the number of your change list. BACKEND means "needed the online database first" (now built).

Newest list first. (Version numbers of the BACKEND items have moved later several times because owner lists are done first; v10.14 was taken by owner list 14, so every later number slid by one. Older notes in `BACKLOG.md` that mention v10.11 to v10.15 for backend work use older numbers; the plan table above is always the truth.) "List" is the order the owner's change lists arrived in.

| List | # | Request (short) | Status | Where |
|---|---|---|---|---|
| - | - | (Change list: tidy the roadmap and backlog so Becca can read them; add what is useful to the README. Two changes, ideas for later collected in section 4b) | DONE | v10.21.1 |
| - | - | (Owner said "follow the roadmap" and asked for the next 5 versions, so the version marked NEXT was built with placeholder numbers: order calendar + delivery fees; next five listed in the plan, section 1) | DONE | v10.21 |
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
| 16 | 2 | "Go through the explanation of the Supabase thing" | DONE (plain-English walkthrough, now guide 5d) | v10.16 |
| 15 | 1 | (Change-list file was empty.) "Start the next version" + "tell me what you will do in the next 5 versions" | DONE (v10.15 built; next 5 were listed then: v10.16 to v10.20) | v10.15 |
| 14 | 1 | How many versions are left in the roadmap / backlog? | DONE (answered then; that count is out of date, see the plan in section 1 and the archive) | v10.14 |
| 14 | 2 | "Remember me" on the admin sign-in (tick box below the sign-in) | DONE | v10.14 |
| 13 | 1 | No visitor theme switching (only Becca and the seasons choose); keep adding more themes | DONE (plan changed) | v10.12 rule; more themes v10.20 |
| 13 | 2 | Use Supabase | DONE (decision recorded; owner creates the free account) | v10.17 |
| 13 | 3 | Only admins can see the admin panel, not customers | DONE (v10.12 no public link; v10.17 real server-side lock) | v10.17 |
| 13 | 4 | Add all 10 suggested things to the roadmap | DONE | v10.20 to v10.25, photos, launch |
| 13 | 5 | Start customising the home page, away from admin things | DONE (round 1 v10.12; round 2 v10.13: Meet Becca, season-aware greeting and strip) | v10.12, v10.13 |
| 12 | 1 | Supabase or Firebase? (free for now, pay later) | DONE (answered: Supabase; the comparison is kept in `ROADMAP_ARCHIVE.md`) | v10.11 |
| 12 | 2 | Top 10 things to add | DONE (answered, now guide 5b) | v10.11 |
| 12 | 3 | Themes dropdown: all themes in one, special ones marked | DONE | v10.11 |
| 12 | 4 | Admin neater: it was confusing and all over the place | DONE | v10.11 |
| 12 | 5 | "Tell me what you will do in the next 5 versions" | DONE (kept in `ROADMAP_ARCHIVE.md`) | v10.11 |
| 11 | 1 | "What would you do next?" | DONE (answered then, kept in `ROADMAP_ARCHIVE.md`; first pick built) | v10.10 |
| 11 | 2 | Automatic seasons: all dates in one section with a dropdown to pick the season to change | DONE | v10.10 |
| 10 | 1 | Sign in so it remembers people (admins and customers); Google, Apple, etc. | DONE for admins (v10.17) and customers (v10.18, email + Google; Apple skipped, it costs about US$99 a year; confirm / reset emails reach customers only after the email sender is set up, guide 5c) | v10.17, v10.18 |
| 10 | 2 | Full account page: whole account, past orders, customise, all info | DONE (My account page; no list sent for this version, so the NEXT item was built) | v10.18 |
| 10 | 3 | Preview of the moving effects when changing theme or ticking the box | DONE | v10.8 |
| 10 | 4 | Theme changes automatically for every season | DONE | v10.9 |
| 10 | 5 | Neat roadmap + backlog with a table of contents | DONE | v10.8 (this file) |
| 10 | 6 | Emojis not moving when the theme changes: fix | DONE | v10.8 |
| 9 | 1 | Father's Day + moving decorations on occasion themes only | DONE | v10.7 (made to always move in v10.8) |
| 8 | 1 | Forgot password with a code | DONE (admin accounts) | v10.6; real email / SMS in v10.17 |
| 8 | 2 | Phone country-code dropdown, default +27 | DONE | v10.6 |
| 8 | 3 | Themes for Christmas, Valentine's, Braai Day, every occasion | DONE | v10.6 (+ Father's Day v10.7); more in v10.20 (DONE) |
| 7 | 1 | Rewrite or confirm the 6 FAQ answers | WAITING | owner sends the info (section 2) |
| 7 | 2 | Add real reviews | WAITING | owner sends the info (section 2) |
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

---

<a id="ideas"></a>
## 4. Ideas for later (not scheduled)
Tell us which of these to pull into a version. The ranked top 10 is in guide 5d.

### 4a. From your earlier lists
Not scheduled. Tell us which to pull into a version. The ranked **top 10** is in guide 5b; the older ideas are below.
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

### 4b. Collected from finished versions (gathered here in v10.21.1)
Every version leaves a few "good idea, but not now" notes. They used to be spread through the backlog; here they are in one place. The tag shows which version they came from.

**Orders and customers**
- Different notice days per product or section (v10.21)
- A calendar grid view of orders in admin (v10.21)
- Separate daily limits for cakes and small treats (v10.21)
- Delivery fee by distance or postcode; a delivery time slot (v10.21)
- Block a run of dates at once, such as a holiday week (v10.21)
- An email to Becca when a day fills up (v10.21)
- A "my addresses" list for customers who get deliveries (v10.18)
- Save name and phone in the customer account so they follow to a new phone (needs the Privacy page to say so) (v10.18)
- Admin view of which orders belong to which account (v10.18)
- Show the customer an order number (v10.19.1)
- Weekly numbers by email; a "this week" bar chart; choose the 90-day window for Most popular; item names with prices on the slip (v10.19)
- Log entries for printing a slip; filter the change log per order (v10.19.1)

**Messages**
- Editable WhatsApp message wording per order status (v10.20)
- One tap to "mark ready and open WhatsApp" (v10.20)
- Remember that a customer was already messaged (v10.20)

**Look and feel**
- More themes: Youth Day, Valentine's week variants, Ramadan, school holidays (v10.20)
- Diwali and Eid dates worked out automatically (they move each year) (v10.20)
- A different hero picture and logo per theme (v10.20)
- Best sellers in the same slim style as New and popular; a "Just added / Most popular" tab switcher; description on hover; a "Top 3 this month" ribbon (v10.17.3)
- Alternate the cream and white section backgrounds automatically after sections are shuffled (v10.17.4)
- Drag to reorder the Menu sections and the footer the same way; a "Reset to the usual order" button; show or hide a Home section per season (v10.17.4)

**Accounts and safety**
- A keep-alive ping so the free online project never pauses (v10.17)
- Spam protection on sign-up and on the public order form (v10.17, v10.18)
- Sign-in by emailed 6-digit code, once real email works (v10.17.1, v10.18)
- Sign in with Apple (paid developer account) (v10.18)
- A switch that hides the account link and page if ever needed (v10.18)
- Bigger account pictures; a picture crop tool; an admin "display name" separate from the username (v10.17.2)
- An in-admin button to create a new admin with a password (needs hosting first) (v10.17.1)
- Fill in the real data region and information officer on the Privacy page once confirmed (v10.18)

**Found while tidying (v10.21.1), to fix in a later version**
- The Save bar in Admin > Theme & layout still says "Save to this device. Then use Publish". Since v10.17 pressing Save goes live straight away, so that wording is out of date.
- The Menu sections / Menu items help text in admin still says changes reach customers "after you Publish". Same reason, same fix.

**Helping Becca (new in v10.21.1)**
- A one-page printable cheat sheet for the day-to-day admin jobs
- Screenshots in the README next to each admin job
- A short "What's new" note in admin after each version

---

<a id="guides"></a>
## 5. Guides in plain English

### 5a. Home page: what we recommend, and what is done
Goal: the customer-facing site gets the attention now, the admin only when it blocks something. Ranked by how much each helps a first-time visitor decide to order:
1. **DONE v10.12 "Shop by treat" tiles** right under the hero: one tile per menu section plus Custom cake. A visitor sees what Becca makes in two seconds and is one tap from the right part of the menu. It follows the menu sections automatically.
2. **DONE v10.12 "How ordering works"** (Choose, Send, Confirm): removes the "how do I even order?" question before it is asked.
3. **DONE v10.13 "Meet Becca"**: a short, warm story section (who bakes, why, baked to order). People buy from people. Needs a few sentences from Becca, a placeholder goes in first.
4. **DONE v10.13 Season-aware greeting and specials**: at Christmas the greeting and the specials strip talk about Christmas, then switch back by themselves.
5. **With photos**: a real hero photo and photos on the cards (biggest visual upgrade; waits for the owner's photos).
6. **After launch**: Instagram grid / "Our work" gallery, and reviews once real ones exist.
Each new home section can be switched on or off in Admin > Theme & layout > Home page, so nothing is forced.

### 5b. The top 10 things we suggested (all approved)
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

### 5c. Email sender for customers (you set it up, no code)
**Why.** Supabase's free built-in email sender only delivers to the project team's own addresses (about 2 an hour). Customers who create an account need a confirm email, and "forgot password" needs a reset email, so both fail for them until the project has its **own email sender (SMTP)**. Until then the My account page says so honestly, and **Continue with Google** (once switched on) and the WhatsApp route still work.
**What you do (about 20 minutes, then tell us how it went).**
1. Open a free account with an email service. **Brevo** or **Resend** are the usual free choices for a small shop (a few hundred emails a day is plenty). Check their current free limits when you sign up.
2. Verify a **sender**. For emails that reliably reach inboxes (not spam) services want you to verify a **domain** you own (for example `thesweetestbakery.co.za`), which is normally bought with the launch (v11). A free Gmail address is often rejected or lands in spam, so email for customers will likely only work well **after the domain exists**. If you want it sooner, buying the domain first is the answer.
3. Create the SMTP login in the service (host, port, username, password / API key). **Never send us the password**; you paste it straight into Supabase.
4. In Supabase: **Authentication > Emails > SMTP Settings**: switch on custom SMTP and paste the details, set the sender name to "The Sweetest Bakery". Then **Authentication > URL configuration**: set the Site URL to the live address (add `http://localhost:8000` too if testing locally) so the confirm and reset links come back to the site.
5. Test: create a customer account with a normal email address and see the confirm email arrive.
**Meanwhile:** the sign-up and reset messages on the My account page tell the customer plainly if no email arrives, and Google sign-in is the no-email way in (switch it on in Supabase > Authentication > Sign In / Providers > Google, see section 2d).

### 5d. Supabase explained, step by step
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

---

<a id="rules"></a>
## 6. How we work together (the rules)
1. **2 to 3 things per version**, no more. Anything else goes into the plan above or the ideas list.
2. **Nothing is thrown away.** Old text that is no longer current moves to [`ROADMAP_ARCHIVE.md`](ROADMAP_ARCHIVE.md). Finished work goes into [`BACKLOG.md`](BACKLOG.md).
3. **When a version is finished** it is added to the backlog, the status here is updated and `VERSION` goes up.
4. **Every version arrives as one `.zip`** of the whole project, named like `online-bakery-v10.21.1.zip`. You never have to apply anything by hand.
5. **Visitors never choose the theme.** Only Becca (everyday theme) and the automatic seasons decide.
6. **The admin is for admins only.** It is never linked from a public page, there is no public sign-up, and new admins are added by an existing admin. The real lock is in the online database.
