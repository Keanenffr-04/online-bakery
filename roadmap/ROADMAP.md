# 🗺️ Roadmap: what's next and what we need from you

**Where we are:** v10.26.11 &nbsp;|&nbsp; **Next up:** v10.26.12 (areas grouped by region), then v10.26.13 (cosier WhatsApp message) &nbsp;|&nbsp; **Rule:** 2 things per version.

*This page is written for Becca. No website or coding knowledge needed. Words you might not know are explained in the "Words explained" list in the [README](../README.md). Finished work is in [`BACKLOG.md`](BACKLOG.md).*

## In one minute
- ✅ **The shop works.** Menu, cart, custom orders, WhatsApp, customer accounts, the admin, themes, order calendar and delivery fees are all built.
- ✅ **New in v10.23:** a **Live check** button in the admin that tests the real online database for you (it even sends and removes a test order), **spam protection** on orders and sign-up that real customers never notice, and a **keep-alive** so the free database never pauses. You need to run the newest `setup.sql` once (section 2c).
- ✅ **New in v10.24:** a **bake sheet** in Orders ("what to make for Saturday", added up across every order, allergies in red, printable) and a **new-order alert** (a chime and a pop-up while the admin is open). Updating the database (section 2c) is optional here: it only makes the alert instant instead of within 30 seconds.
- ✅ **New in v10.25:** a **review page** (customers write a short review, you press Approve before it shows, and the thank-you WhatsApp message carries the link) and **inspiration photos** on Custom Orders (stored privately, you press View photo next to the order). You need to run the newest `setup.sql` once (section 2c).
- ✅ **New in v10.26:** a **"How to pay" box** on the thank-you page (your EFT details, SnapScan button and Capitec Pay number with Copy buttons). It stays hidden until you type your real details in Admin > Theme & layout > How to pay. No database update needed.
- ✅ **New in v10.26.1:** the **admin is tidied** (your list 22). A new **Ordering & payment** tab holds the order calendar and delivery, the cake price guide and How to pay; **Theme & layout** only has the look of the site. No database update needed.
- ✅ **New in v10.26.2:** the Live check's photo-storage warning is fixed (list 23). The check was too jumpy (a locked storage also answers with an empty list), so it now tries a real test picture the way a stranger would and removes it again. The database also gets an extra lock so only admins can ever see an inspiration photo. **Run the newest `setup.sql` once** (section 2c), then run the Live check again.
- ✅ **New in v10.26.3:** your **backup WhatsApp number** (Keanen, 081 211 8414). It shows as "Can't reach Becca?" on the Contact page and on the thank-you page (with the order typed out). Orders still go to Becca's number and are saved online for both admins. A step-by-step **how to order** guide is in section 5g.
- ✅ **New in v10.26.4:** (your list 25, part 1 of 3) the **cart empties by itself** once the order is sent, and **"Order the same again" is gone** (from the thank-you page and from My account). The thank-you page's **Open WhatsApp** button now brings the order text with it, so nothing is lost if WhatsApp did not open. No database update needed.
- ✅ **New in v10.26.5:** (your list 26) a **dark mode for every theme** (all 15). It switches on **by itself when you open the website on your own computer** (double-click `preview.html`, or any file / `localhost` copy), so late-night work is easy on the eyes. **The real website is never dark and visitors get no switch.** No database update needed.
- ✅ **New in v10.26.6:** (your list 25, item 3, **part 1 of 3**) when a customer picks **Delivery** they now **type their delivery address** (Cart and Custom Order). It is required for delivery, goes into the WhatsApp message, is saved with the order, shows on the thank-you page, and shows next to the order in the admin and on the printed slip. No database update needed.
- ✅ **New in v10.26.7:** (your list 25, item 3, **part 2 of 3**) a **free map** under the delivery address box (Cart and Custom Order). The customer presses **Show on map** or clicks out of the box and sees the spot on an OpenStreetMap map (no account, no key, no cost), so a mistyped address is easy to spot. It is only a check and never stops an order. No database update needed.
- ✅ **New in v10.26.8:** (your list 27, item 2, **step 1 of 3**) the delivery **map now shows by itself** under the address box a moment after the customer stops typing, with no button. A small **Try again** button only appears if the free map service did not answer. No database update needed.
- ✅ **New in v10.26.9:** (your list 27, item 1, **step 2 of 3**) the delivery-area list now holds **118 areas of Gauteng** (Johannesburg, Sandton, Centurion, Pretoria, Boksburg, Krugersdorp, Vereeniging and so on) instead of "Close to the bakery / Further out". **The fees are samples** (R 80 Johannesburg and Tshwane, R 90 East Rand, R 110 West Rand, R 130 Vaal) until you set yours. It reaches the live website by itself while you have not edited the delivery numbers; if you already did, the admin has an **Add the missing Gauteng areas** button. No database update needed.
- ✅ **New in v10.26.10:** (your list 29) a **"View site as a customer"** tile next to Theme preview in the local preview: it opens the site exactly as a visitor sees it (light, none of your own unsaved changes) with a small **Customer view / Back to preview** pill. And the **delivery courier research** for the bakery in Centurion: what each company charges, which we suggest, and the fee bands we propose (guide **5h**). No database update needed.
- ✅ **New in v10.26.11:** (your list 29, item 2, **step 2 of 2**) **delivery fees worked out from the bakery** (Gerhardsville, western Centurion) for all **118 areas**, from the bands in guide 5h: R90 up to 10 km, R130 to 20 km, R180 to 35 km, R240 to 50 km, R310 to 70 km, R420 to 100 km, and beyond 100 km the same R420 plus R6 for every extra km (so Vereeniging is about R550, Vanderbijlpark about R600). Examples: Centurion R130, Pretoria CBD R180, Sandton R240, Johannesburg CBD R310. **These are estimates, not courier quotes**; they still show the draft warning until you check them and Save. They reach the live site by themselves while you have not edited the delivery box. Also a **root `index.html`** so any host opens the site from the web address alone, and a ready **phone zip** with a plain guide to show the site on a phone (**5i**). No database update needed.
- ⏭️ **Next:** v10.26.12 (the areas **grouped by region** with one fee per region), then v10.26.13 (a **cosier WhatsApp message**), then v10.26.14 (every order reaching **both** your WhatsApps; needs a decision from you, see the plan). Proof of payment and the installable app slid back to v10.26.15 and v10.26.16. *Your list 27 was split in 3 because it was too big to build safely in one go.* *We split the old v10.26.6 in 3 because it was too big to build safely in one go.*
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
Your change lists always go **first**, so the versions below may slide back by one when you send a list. **The order below is the one you agreed in v10.22:** safe and real first (v10.23), then things that save you time, then trust, then money, then launch. Done: **v10.22** (price guide; its "Order again" part was removed in v10.26.4 at your request), **v10.23** (Live check + spam protection + keep-alive), **v10.24** (bake sheet + new-order alert) and **v10.25** (review link + inspiration photo upload). Photos and going online are deliberately **last**. Everything already built is listed in [`BACKLOG.md`](BACKLOG.md) (start with "What the website can do today").

| Version | Status | What you will get | What we need from you |
|---|---|---|---|
| ~~v10.26.6~~ | ✅ Done | **Delivery address box** (step 1 of 3 of the old v10.26.6): Delivery asks for a street address on the Cart and Custom Order; it goes into the WhatsApp message and the saved order, and shows in the admin and on the slip. | Nothing |
| ~~v10.26.7~~ | ✅ Done | **Delivery map** (step 2 of 3): under the address box the customer sees their address on a **free map** (OpenStreetMap, no account or key), so a mistyped address is easy to spot. Cart + Custom Order; your list 25, item 3. | Nothing |
| ~~v10.26.8~~ | ✅ Done | **Map shows by itself** (list 27, item 2, step 1 of 3): no button; the free map appears under the address box a moment after the customer stops typing. | Nothing |
| ~~v10.26.9~~ | ✅ Done | **All the Gauteng delivery areas** (list 27, item 1, step 2 of 3): the delivery-area list holds the areas of Gauteng (Johannesburg, Sandton, Centurion, Pretoria and so on) with sample fees, instead of "Close to the bakery / Further out". Reaches the live site too, and you edit the fees in the admin. | Your real fee per area (samples until you set them) |
| ~~v10.26.10~~ | ✅ Done | **"View site as a customer" tile** in the local preview (list 29, item 1) + **delivery courier research and proposed fee bands** (list 29, item 2, step 1 of 2: guide 5h). | A yes or a change to the fee bands in 5h; two or three real quotes from Picup or Uber Connect when you can |
| ~~v10.26.11~~ | ✅ Done | **Delivery fees worked out from the bakery** (list 29, item 2, step 2 of 2): every one of the 118 areas gets a fee from its driving distance to Gerhardsville, using the bands in guide 5h (replacing the sample R80 to R130), still editable in the admin. | Your yes to the bands (or your changes) |
| **v10.26.12** | ⏭️ Next | **Areas grouped by region** (list 27, item 1, step 3 of 3): the area list is grouped (Johannesburg, Tshwane, Ekurhuleni, West Rand, Sedibeng), and in the admin you can set one fee for a whole region at once. | Your fee per region |
| v10.26.13 | 📅 Planned | **Cosier, friendlier WhatsApp message** (old step 3 of 3 of list 25): a warmer greeting and sign-off for the Cart and Custom Order messages, keeping every line Becca needs (your list 25, item 7). | Your own words for the message if you want them (otherwise we write it warm and short) |
| v10.26.14 | 📅 Planned | **Every order reaches both of your WhatsApps** (list 25, item 6). A website cannot message two chats by itself: the tap-to-send link opens one chat. Real automatic sending to two numbers needs the **WhatsApp Business Platform** (a Meta business account, a number registered for it, and a small cost per message) plus a small server step in Supabase. We will first set up what is free and close to it, and ask you which way you want to go. | A decision from you: free workaround or Meta WhatsApp Business account |
| v10.26.15 | 📅 Planned | **Upload proof of payment** on the thank-you page (stored privately, you open it next to the order) + a **"paid" tick** per order (idea 27, part 2). Needs the newest `setup.sql`. | Nothing new |
| v10.26.16 | 📅 Planned | **Install on the home screen like an app**, and the menu and cart keep working when the internet is flaky or during load shedding (idea 47). | Nothing new |
| v10.27 | 📅 Planned | **Shop status banner** ("on holiday until 3 Jan", pauses orders) + the **old "Publish" wording fixed** in the admin (4 and 45). | Nothing new |
| v10.28 | 📅 Planned | **Gift vouchers** (you give a code, the customer types it in the cart, it comes off the total) + a **loyalty reward** (for example every 10th order a free cupcake box). | Your voucher and loyalty rules |
| v10.29 | 📅 Planned | **Deposits / online payment** (Yoco, PayFast or Ozow). A deposit secures the date. On its own because it handles real money. | A payment account that you open |
| v10.30 | 📅 Planned | **Specials list:** customers who tick "yes, send me specials" (POPIA-friendly, with an easy unsubscribe) + **Home page, round 3**. | Nothing new |
| When photos exist | ⏳ Waiting | **Real product photos** instead of emoji + an **"Our work" gallery** | Your photos (tip: same light and background for every photo) |
| After launch | 📅 Planned | **The rest of your 60 ideas** (section 4c), two at a time, in the order you choose. Ideas will also be added as real customers show us what they need. | Your numbers |
| Last (v11) | ⏳ Waiting | **Put the website online:** hosting, small browser icon, search-engine tidy-up, Google Business Profile, share picture for WhatsApp / Facebook, your own web address, launch checklist | You saying "I'm happy with everything" |

---

<a id="need"></a>
## 2. What we need from you (your checklist)
Nothing here can be built or guessed by us. Send things whenever you have them (in your next change list is fine).

### 2a. Your to-do list
- [ ] **Update the online database** with the newest `supabase/setup.sql` (steps in 2c). Latest change: **v10.26.2** (it adds an extra lock on the photo storage; run it, then run the Live check again). Before that, **v10.25** (it switched on reviews and the private place for inspiration photos; without it the review page says "not switched on yet" and custom orders send without the photo). **v10.24** only made the new-order alert instant. If you have not run it since v10.22, run it now too: **v10.23** added the spam guard, which is only half on until you do.
- [ ] **Replace the placeholder numbers** in Admin > Ordering & payment > **Order calendar & delivery**: days of notice, orders per day, days off, delivery areas and fees. Today they are samples.
- [ ] **Real prices and product list.** Today the menu prices are samples (Admin > Menu items).
- [ ] **Real cake sizes, servings, flavours and prices** for the price guide (Admin > Ordering & payment > **Cake price guide**). Until you change them customers see a "Sample prices" tag.
- [ ] **FAQ answers, reviews, your "Meet Becca" story, Instagram and Facebook names** (details in 2b).
- [ ] **Read the Privacy and Terms pages** and fix anything that is not true for your bakery. They are drafts.
- [ ] **Which items are vegan, gluten-free, nut-free, dairy-free** (only what is definitely true).
- [ ] **Email sender for customers** (guide 5c). Easiest once you own a web address.
- [ ] **Run the Live check** (Admin > Backup & files) after updating the database, and do the short hand-test in guide 5e (about 20 minutes).
- [ ] **Switch on the keep-alive** (guide 5f, two minutes) so the free database never pauses.
- [ ] **Type your payment details** in Admin > Ordering & payment > **How to pay** (bank, account name and number, SnapScan link, Capitec Pay number). Until you do, customers see no payment box.
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
| Real cake sizes, servings, flavours and extra costs | Cake price guide on Custom Orders | Admin > Ordering & payment > Cake price guide |
| Real notice days, daily limit, delivery areas and fees | Order calendar and delivery | Admin > Ordering & payment > Order calendar & delivery |
| Product photos | Replace the emoji | When you are ready |
| Voucher and loyalty rules, payment provider | v10.28 and v10.29 | When we reach those versions |
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
| 26 | 1 | Add a dark mode for all the themes (I work late at night and it is too bright). Make the local preview dark by default; I do not want to be able to change it on the website | DONE (all 15 themes have a dark set; dark switches on by itself when the site is opened from your own computer; the real website stays light and has no switch) | v10.26.5 |
| 26 | 2 | Only 2 changes per version, the rest to the backlog | DONE (only 1 change came; ideas in 4b) | v10.26.5 |
| 28 | 1 | Delivery areas: do not remove the "Choose your area" list; instead of "near the bakery" add all the areas in Gauteng (Centurion, Johannesburg and so on) | IN PROGRESS (split: the 118 Gauteng areas with sample fees are DONE in v10.26.9; grouped by region with one fee per region is next in v10.26.12) | v10.26.9 / v10.26.12 |
| 29 | 1 | In the local preview, next to Theme preview, add a block "View site as a customer" | DONE (tile in preview.html; shows the site as a visitor sees it, with a pill to go back) | v10.26.10 |
| 29 | 2 | The bakery is in Gerhardsville, Centurion: work out all the delivery fees for the different options, suggest the best delivery company nearby and add the prices to the website (permission given to use the companies' info and websites) | DONE (split in 2: research, recommendation and bands in v10.26.10, guide 5h; the fees for all 118 areas on the website in v10.26.11, as estimates until you have real quotes) | v10.26.10 / v10.26.11 |
| 30 | 1 | "Tell me how to see the website from my phone, my girlfriend wants to see how it looks so far" | DONE (guide 5i + a ready phone zip you drag onto Netlify Drop for a link; the website is not online yet, that is v11) | v10.26.11 |
| 29 | - | Only 2 changes per version, the rest to the backlog | DONE (2 changes came; nothing extra to add) | v10.26.10 |
| 28 | 2 | The map shows up by itself under the address box, no button to click | DONE (after a short pause in typing; Try again button only if the map service did not answer) | v10.26.8 |
| 28 | - | Split the next task in 3 steps (standing request) and only 2 changes per version, the rest to the backlog | DONE (2 changes came, split into v10.26.8 / .9 / .10; nothing extra to add) | v10.26.8 |
| 27 | - | "Split the next task into 3 steps or 3 versions, because some things it tries to do in one go and it is a big task" | DONE (old v10.26.6 split into v10.26.6 address box, v10.26.7 map, v10.26.8 cosier message; the rest renumbered) | v10.26.6 |
| 25 | 1 | Add my WhatsApp number (Keanen Russon 081 211 8414) | DONE earlier (same as list 24 item 1) | v10.26.3 |
| 25 | 2 | A step-by-step guide on how to order with the latest version | DONE (section 5g, updated each version) | v10.26.3 / v10.26.4 |
| 25 | 3 | In the order summary, after picking Delivery and the area, show an actual map (Google Maps or any free thing) | DONE (split in 2: the delivery address box in v10.26.6; the free map preview in v10.26.7) | v10.26.6 / v10.26.7 |
| 25 | 4 | After they order, empty their cart | DONE (the cart empties itself 1 second after the order is sent; your name and number stay for next time) | v10.26.4 |
| 25 | 5 | Remove the whole "order the same again" thing | DONE (removed from the thank-you page and from My account) | v10.26.4 |
| 25 | 6 | Every order goes to my WhatsApp and my girlfriend's WhatsApp at the same time | PLANNED (needs a decision, see the plan) | v10.26.14 |
| 25 | 7 | Make the WhatsApp message cosier and friendlier | PLANNED | v10.26.13 |
| 25 | 8 | Later: a full online ordering shop like Takealot | IDEA (the cart, accounts and past orders exist; the missing parts are paying online (v10.29), stock counts and order tracking; listed in 4a) | v10.29 / after launch |
| 25 | - | Only 2 changes per version, the rest to the backlog | DONE (list 25 was split: v10.26.4; the map + message item was too big for one go, so it became 3 steps v10.26.6 / .7 / .8; both WhatsApps = v10.26.12 (renumbered again by list 27); dark mode, list 26, took v10.26.5 in between) | v10.26.4 |
| 24 | 1 | Add my WhatsApp number (Keanen Russon 081 211 8414) so messages can still reach me if they cannot reach Becca | DONE (Contact page + thank-you page; orders still go to Becca's number) | v10.26.3 |
| 24 | 2 | After adding it, a step-by-step guide on how to order with the latest version | DONE (section 5g, and in the reply) | v10.26.3 |
| 23 | 1 | The live check says strangers can look inside the photo storage; I do not want that, fix it | DONE (accurate check with a test picture + an extra database lock; run the newest setup.sql) | v10.26.2 |
| 23 | 2 | Only 2 changes per version, the rest to the backlog | DONE (only 1 change came; ideas in 4b) | v10.26.2 |
| 22 | 1 | In the admin, put everything under the right header (no cake stuff under Themes, and so on). Add to the roadmap | DONE (new Ordering & payment tab; the rest of the sorting is in 4b) | v10.26.1 |
| 22 | 2 | Only 2 changes per version, the rest to the backlog | DONE (only 1 change came; ideas in 4b) | v10.26.1 |
| - | - | (Owner said "start next v/patch" and asked to split v10.26 into 2 or 3 smaller versions, so it became v10.26 (How to pay box, built), v10.26.1 (proof of payment) and v10.26.2 (install as an app)) | DONE (part 1) | v10.26 |
| - | - | (Owner said "start next v/patch" and asked for the next 5 versions at 2 changes each, so the version marked NEXT was built: review link (idea 1) + inspiration photo upload (idea 13); next five in the plan, section 1) | DONE | v10.25 |
| - | - | (Owner said "start next v/patch" with no change list, so the version marked NEXT was built: the bake sheet (idea 36) and the new-order alert (idea 35)) | DONE | v10.24 |
| - | - | (Owner said "start next v/patch" with no change list, so the version marked NEXT was built: a Live check for the real database (idea 46), spam protection and a keep-alive (idea 48). The hand-test with Becca is guide 5e) | DONE | v10.23 |
| - | - | (Owner said "lets do it your way, start next v/patch": the first version of the agreed order was built, the cake price guide + "Order the same again" on the thank-you page. The new build order for all 60 ideas is in the plan, section 1) | DONE | v10.22 |
| - | - | (Change list: give me a list of everything we should still add to make the website better than the others, and I will say what I like. Only 2 changes per patch, the rest to the backlog. The list is in section 4c; nothing was built) | DONE | v10.21.2 |
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
Tell us which of these to pull into a version. The newest and biggest list is **4c** (60 numbered ideas, pick by number). The ranked top 10 is in guide 5b.

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

- **A full online shop like Takealot (list 25, item 8).** Today customers fill a cart and send it on WhatsApp, Becca confirms and they pay by hand. A Takealot-style flow adds: paying on the website (v10.29), live stock counts, an order-tracking page for the customer ("baking", "ready"), and email receipts (needs the email sender, 2a). We will do it in small steps after v10.29, only when you say so.

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

**Cake price guide and Order again (v10.22)**
- Price extras beyond size and flavour, such as a decoration level or tiers (v10.22)
- Show the price guide on the Home page or the FAQ as well (v10.22)
- A "Custom order again" that fills the form from your last request, for returning customers (v10.22)
- Count how many requests used the guide, in Numbers (v10.22)
- Different prices for cupcake and cookie boxes in the same guide (v10.22)

**Spam protection, Live check and keep-alive (v10.23)**
- A CAPTCHA on sign-up (Cloudflare Turnstile is free; needs a free account and two keys) (v10.23)
- An email or WhatsApp to Becca when the spam guard refuses a burst of orders (v10.23)
- A warning bar in the admin when the database setup is older than the website, so Becca never has to remember to run the Live check (v10.23)
- Keep a history of Live check results, and run it by itself once a week (v10.23)
- A Live check step that tests customer sign-up and delete-my-account with a throw-away address (v10.23)

**Bake sheet and new-order alert (v10.24)**
- Real push notifications that reach a closed phone (needs the installed app from v10.26 plus a push service) (v10.24)
- A different chime for custom orders; quiet hours for the chime (v10.24)
- Send the bake sheet by WhatsApp or email; a "tomorrow's bake sheet" that appears by itself (v10.24)
- Split the bake sheet into collection and delivery runs; choose which statuses count (v10.24)
- A shopping list worked out from the bake sheet (idea 37, needs your recipes) (v10.24)

**Reviews and inspiration photos (v10.25)**
- Several photos per order; show the photo on the printed slip and the bake sheet (v10.25)
- A "tidy unused photos" job for pictures whose order was never sent (v10.25)
- A "reply to this review" line under a review; ask for a Google review too (v10.25)
- A review reminder sent a few days after "Mark done" (needs WhatsApp / email sending first); a QR code for the review page (idea 59) (v10.25)

**Dark mode (v10.26.5)**
- Let the live website follow a customer's own phone dark setting, or an admin switch "Dark mode on the live site" (today it is deliberately off for visitors)
- Check the whole admin (all tabs) in dark; only the login screen was seen, the sandbox cannot sign in
- A proper cream logo file for dark pages instead of inverting the black one
- A dark look for the printable order slip and bake sheet (they stay white on purpose: paper)

**Backup WhatsApp number (v10.26.3)**
- Put the "Can't reach Becca?" line on the Cart and Custom Order pages too, and under the green floating WhatsApp button (v10.26.3)
- Include the payment details in the "confirmed" WhatsApp message Becca sends, so a customer who closed the thank-you page still gets them (v10.26.3)
- Mention Keanen on the Privacy page as a second person who can see WhatsApp messages and orders, once the owner confirms the wording (POPIA) (v10.26.3)
- Let the number be changed in the admin instead of in the project file; choose which number a day or time of week goes to (v10.26.3)

**Photo storage lock (v10.26.2)**
- Run the Live check by itself once a week and keep its history (v10.26.2)
- Delete leftover test pictures from the photo storage automatically (v10.26.2)
- Show the same "photos are private" tick for the proof-of-payment storage once it exists (v10.26.2)
- Keep customer photos for a set time (for example 12 months) and then remove them, with a line on the Privacy page (v10.26.2)

**Admin tidy-up (v10.26.1)**
- Move "Reviews to approve" out of Orders into its own spot (a Customers or Reviews area) (v10.26.1)
- Decide where "Menu page" (grid or list) belongs: Theme & layout or Menu items (v10.26.1)
- Same tidy-up for the Orders tab (it now holds numbers, dates, bake sheet, reviews and the alert) and a short "what is on each tab" line under each tab name (v10.26.1)
- Rename or reorder tabs if the new names do not feel right (v10.26.1)

**Helping Becca (new in v10.21.1)**
- A one-page printable cheat sheet for the day-to-day admin jobs
- Screenshots in the README next to each admin job
- A short "What's new" note in admin after each version

**From v10.26.6 (delivery address):**
- Remember the delivery address on the customer's own device (the way name and phone are remembered), with the matching line on the Privacy page
- Show the delivery address on the **bake sheet** / a **delivery run list** (today it is on the order, the slip and the thank-you page only)
- Check the address against the delivery areas (for example warn if the suburb is not on Becca's list)

**From v10.26.7 (delivery map):**
- Let the customer **drop a pin / drag the marker** to fix the spot (needs a map library, so it is bigger than a free picture)
- Save the map spot with the order so the admin can open it in one tap (Google Maps / Waze link in the slip)
- A **delivery-distance fee** worked out from the map instead of picking an area by hand

**From v10.26.11 (fees and phone preview):**
- **Recalibrate the fees from two or three real Picup / Uber Connect quotes** from the bakery (edit the bands in `tools/gauteng-fees.py` and run it with `--write`)
- **Check the 118 area centres on a map** (they are good to about 2 to 4 km; a wrong one can put an area in the wrong band)
- A **free-delivery threshold** (for example free delivery on orders over a set amount in the nearest bands) and a **small fee discount for collection-point pick-ups**
- A **cheaper "bakkie / bike" option for cupcakes** and a dearer one for tiered cakes
- **Put the website online properly** (v11): your own address, browser icon, Google Business Profile

**From v10.26.10 (couriers and customer view):**
- **Book the courier from the admin**: a button on a delivery order that opens the courier's booking page with the pickup and drop-off already filled in
- A **delivery run sheet** (all deliveries for a day, in route order) next to the bake sheet
- Live **courier quotes** instead of bands (needs a courier's business account and their API)
- "View site as a customer" could also open the **live** website (once there is one) and a **phone-sized** frame

**From v10.26.9 (Gauteng areas):**
- Real **distance-based fees** from the bakery to the address (needs the bakery's address and a routing service)
- Areas outside Gauteng (Mpumalanga, North West, Free State) or "ask Becca for a quote" as an area
- A **search box** in the admin area list (118 rows is long) and a way to hide areas Becca does not deliver to without deleting them

**From v10.26.8 (automatic map):**
- A **"Use my current location"** button on the address box (asks the phone for permission, fills the address)
- Switch the free map for Google Maps places search with suggestions as the customer types (needs a Google key and a cost per search)

### 4c. "Better than the other bakery sites": the full list (new in v10.21.2)
You asked for everything we think the website could still add. Nothing here is built yet. **Tell us the numbers you like** (for example "1, 11, 36") and we will slot them in, two per version. ⭐ = our top picks. 📅 = already on the plan above. ⏳ = we need something from you first. **S / M / L** = a small, medium or large amount of work.

**A. Get more orders (people find you and trust you)**
1. ✅ *built in v10.25* ⭐ **Review link.** When an order is done, the "thank you" WhatsApp message carries a link to a short review form. You approve each review before it shows. (Reviews are empty today and would otherwise be typed by hand.) *M*
2. **Real photos on every item and an "Our work" gallery.** 📅 ⏳ waits for your photos. *M*
3. **A page for each item:** big photo, full description, sizes, "serves 8 to 10", allergens and an Add button. *M*
4. **Shop status banner:** "Taking orders" or "On holiday until 3 January", with one tick that pauses ordering. *S*
5. **"Order by Thursday for a Saturday"** countdown on Home and the Cart, worked out from your order calendar. *S*
6. **Instagram grid on Home** (after launch). *M*
7. **Wedding and events page:** packages, a tasting-box option and an enquiry form. ⏳ needs your packages. *M*
8. **Office and bulk orders:** a simple form for treat boxes with a minimum quantity. *S*
9. **Google Business Profile, search tidy-up, share picture, your own web address.** 📅 v11. *M*
10. **A page for each area you deliver to,** so local searches find you (after launch). *S*

**B. Make ordering easier**
11. ⭐ **Cake price guide:** size, servings and flavour give an estimated price. ✅ built in v10.22 (sample prices until you set yours). *M*
12. **Cake builder, step by step:** size, flavour, filling, icing, message, with the price updating as you go. Builds on 11. *L*
13. ✅ *built in v10.25* ⭐ **Upload an inspiration photo with a custom order.** You see it in the admin next to the order. *M*
14. **Extras in the cart:** candles, a card, a topper, a message on the cake. *S*
15. **"This is a gift":** recipient's name, a gift-card message and delivery to a different address. *S*
16. **Party boxes and bundles** at a bundle price (for example a cake and 12 cupcakes). *M*
17. **Regular orders** such as "every Friday" for bread or lunchbox treats. You confirm each one. *M*
18. **Favourites heart** on items, kept on the phone or in the account. *S*
19. **"Tell me when it's back"** on sold-out items (one tap to WhatsApp you). *S*
20. **Limited drops:** an item that starts and ends on set dates with a stock number, such as 20 Easter eggs. *M*
21. **How many are left today** for an item ("only 3 left"), going beyond "Sold out today". *M*
22. **Different notice days per item** (cakes 3 days, cookies 1 day). *M*
23. **Delivery fee by distance or postcode,** a time slot and an address search. *L*
24. **"Order again" on the thank-you page.** ✅ built in v10.22. *S*
25. **Birthday and occasion reminders:** a customer saves a date, you get a list, and they can opt in to a nudge (POPIA-friendly). *M*

**C. Payments**
26. **Deposits and card payments** (Yoco, PayFast or Ozow). 📅 v10.29 ⏳ needs a payment account. *L*
27. ⭐ **EFT, SnapScan or Capitec Pay details on the thank-you page,** plus "upload your proof of payment", so you stop chasing people. *M*
28. **Quote link:** you send a custom-cake quote, the customer taps Accept and pays the deposit. Needs 26. *L*
29. **Gift vouchers and a loyalty reward.** 📅 v10.28. *M*
30. **Refer-a-friend reward.** Needs 29. *M*

**D. Keep customers informed**
31. **An order number on the thank-you page and a "track my order" link** that works without an account. *M*
32. **Automatic confirmation the moment an order is saved.** Email needs your email sender; automatic WhatsApp needs a paid WhatsApp Business service. ⏳ *L*
33. **Specials list** (customers who tick "send me specials", with an easy unsubscribe). 📅 v10.30. *M*
34. **Editable WhatsApp wording for each order status.** *S*

**E. Save Becca time (admin)**
35. ✅ *built in v10.24 (works while the admin is open; waking a closed phone needs the installed app, see 4b)* ⭐ **New-order alert:** a sound or phone notification when an order arrives, so the admin does not have to stay open. Works best together with 47. *M*
36. ✅ *built in v10.24* ⭐ **Bake sheet:** "what to make for Saturday", totalled across all orders (3 chocolate cakes, 24 cupcakes) and printable. *M*
37. **Shopping list** worked out from the bake sheet and your recipes. ⏳ needs your recipes. *L*
38. **Costing helper:** type in ingredient costs and get a suggested price and the profit on each item. ⏳ *L*
39. **Customer list with notes:** allergies, favourite flavours, birthdays, who orders again and again. *M*
40. **Calendar grid of orders,** and block a whole holiday week at once. *M*
41. **Quote and invoice PDF** with your logo. *M*
42. **One tap to "mark ready and open WhatsApp".** *S*
43. **Monthly report:** sales, best sellers, busiest weekdays and repeat customers. *M*
44. **"What's new" note in the admin,** a printable one-page cheat sheet and screenshots in the README. *S*
45. **Fix the old "Publish" and "Save to this device" wording in the admin** (already on the to-fix list). *S*

**F. Safe, fast and dependable**
46. ✅ *tool built in v10.23 (admin Live check); the hand-test with Becca is guide 5e)* ⭐ **A proper test against your real online database.** Everything so far was tested against a pretend database because our workshop has no internet. We would walk through it with you (about 20 minutes): place an order, change its status, sign up as a customer, delete an account, check "Most popular". Do this before launch. *S*
47. **Install on the home screen like an app,** and keep the menu and cart working when the internet is flaky or during load shedding. *M*
48. ✅ *built in v10.23 (a CAPTCHA is the optional extra, see 4b)* **Spam protection** on orders and sign-up, plus a keep-alive so the free online database never pauses. *M*
49. **Backup reminder** (or a weekly backup file) because the free plan has no automatic backups. *S*
50. **Screen-reader, keyboard and small-phone check.** *M*
51. **Afrikaans version** with a language switch. ⏳ needs translations. *L*
52. **Allergen details per item** (contains milk, eggs, gluten, nuts; a statement about your kitchen). Stronger than today's tags. ⏳ only what is definitely true. *M*
53. **Privacy-friendly visitor statistics** (which pages people look at and where they leave). *M*
54. **Photos that resize themselves** so the site stays fast once real photos exist. *M*

**G. Brand and content**
55. **A real About page with your story** (today it says "coming soon"). ⏳ *S*
56. **Care and storage page** ("keep in the fridge, eat within 3 days") with a QR code on a card in the box. *S*
57. **"How much cake do I need?"** servings guide. *S*
58. **Seasonal landing pages** that appear by themselves (a Mother's Day pre-order page in May). *M*
59. **A QR code** for flyers, boxes and your Instagram bio that opens the menu or the review form. *S*
60. **Tasting boxes:** a small sample box customers can order before a big cake. *S*

**Build order:** you agreed to our suggested order in v10.22. It is the plan table in section 1 (v10.23 onward). Items 46 and 48 come first, then 36 and 35, then 1 and 13, then 27 and 47, then 4 and 45, then vouchers, payments and the specials list, then launch.

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

### 5e. The real-world test, step by step (v10.23, about 20 minutes)
Everything since v10.17 was built in a workshop with no internet, so it was only tried against a pretend database. This is the test with the real one. Do it once now and once more just before you go online.
1. Run the newest `supabase/setup.sql` (section 2c).
2. Open the admin on a computer with internet, go to **Backup & files** and press **Run the live check**. Every line should show a green tick. A yellow warning says what to do; a red cross means stop and send us the screen. (The check sends a test order and removes it again, so your orders list stays clean.)
3. **Send a real order from your phone** on the Cart or Custom Order page. Check it appears in **Orders** (it is marked pending).
4. Press **Confirm**, then the green **WhatsApp** button, and check the message looks right. Then **Mark ready** and **Mark done**. Open the order's change log to see each step.
5. **Create a customer account** with a second email (or Continue with Google). Place an order while signed in and check it shows under **My account**. If the confirm email never arrives that is expected until the email sender is set up (guide 5c).
6. On the signed-in customer account, press **Delete my account** and type DELETE. Back in Orders, that order should now have no name or phone, but still be there.
7. Place two or three more small orders, wait a minute and reload the Home page: **Most popular** appears once at least 5 items have been ordered.
8. Delete the practice orders (Orders > Delete) and tell us what looked wrong, with the page name.

### 5f. Keep the free database awake (v10.23, two minutes)
Free Supabase projects pause after about 7 days with nobody using them. The project folder now holds a tiny scheduled job (`.github/workflows/keep-alive.yml`) that asks the database for one row every 3 days. It only works when the project is on GitHub, which yours already is.
1. Open the project's page on **github.com** and click **Actions**. If it asks, click **I understand my workflows, enable them**.
2. Click **Keep database awake** on the left, then **Run workflow** once to try it. A green tick means it works.
3. After that nothing else is needed. (GitHub switches scheduled jobs off after 60 days with no changes to the project; if that happens, press **Run workflow** again. Using the admin also counts as activity.)
4. If a run ever shows a red cross, the database is probably paused: open supabase.com and click **Restore**.

### 5g. How to order, step by step (v10.26.9)
**A cart order (menu items)**
1. Open the website and go to **Menu**. Tap **Add** on each item you want. The cart icon at the top shows how many.
2. Open the **Cart**. Change quantities with the + and - buttons, or remove things.
3. Fill in your **name** and **WhatsApp number** (the country code is +27 already), then pick **Collection** or **Delivery**. For delivery choose your **area** from the Gauteng list (the fee is added to the total) and **type your delivery address** (street and suburb); delivery orders cannot be sent without it. A **map appears by itself** a moment after you stop typing; if the spot looks wrong, add the suburb or a landmark.
4. Pick the **date** you need it. Dates that are too soon, a day off or already full cannot be chosen, and a message tells you the first free date. Add **notes** (allergies, a message on the cake) if you like.
5. Press **Send order on WhatsApp**. WhatsApp opens with the whole order typed out. **Press send in WhatsApp**: the order only reaches Becca when you do. (The **cart empties itself** a second after you press the button, so your next order starts clean.)
6. The website takes you to the **thank-you page**. It shows what you sent, and a **How to pay** box once Becca has typed her payment details in the admin. Nothing is paid yet.
7. **Becca replies on WhatsApp** to confirm the order and the final total. Only pay after that. Pay by EFT, SnapScan or Capitec Pay, using your name as the reference, and send her the proof of payment on WhatsApp.
8. **WhatsApp did not open, or you did not press send?** On the thank-you page press **Open WhatsApp**: it brings your order text with it. **Can't reach Becca?** On the thank-you page (and the Contact page) press **Can't reach Becca? WhatsApp Keanen**. The message is typed for you. Your order is also saved online, so Becca and Keanen can both see it in the admin.

**A custom cake**
1. Go to **Custom Orders**. Describe the cake, pick the occasion and how many people it must serve.
2. *Optional:* use the **price guide** (size and flavour give a rough price) and add an **inspiration photo**.
3. Fill in your name, WhatsApp number, date and collection or delivery (for delivery, also your area and **delivery address**), then press **Send on WhatsApp** and press send in WhatsApp.
4. Becca replies with what she can do and the price. Confirming and paying work like a cart order (steps 6 to 8).

**What Becca does in the admin:** Orders > the new order is **pending** > **Confirm** > the green **WhatsApp** button (the message is typed for her) > later **Mark ready** and **Mark done**. Both Becca and Keanen can use the admin.

**Today's limits (so nothing surprises you):** payment is by hand (EFT, SnapScan or Capitec Pay), there is no upload-your-proof button yet (planned v10.26.15), and the prices, notice days and delivery fees are samples until Becca replaces them (checklist 2a).

### 5h. Delivery couriers and fees: what we found (v10.26.10, November 2026)
*You asked us to work out delivery fees from the bakery (Gerhardsville, western side of Centurion) and to suggest the best delivery company. This is the research. **The fees themselves go on the website in v10.26.11.** Your street address is deliberately not written in these files; it only stays in your head and ours.*

**What we could confirm (and what we could not).** Most courier apps only show a price when you type in an address, so there is no public price list to copy. Here is everything that could be checked:

| Company | What it is | What we found | Good for cakes? |
|---|---|---|---|
| **UrgentGo** (urgentgocourier.co.za) | Same-day courier with a Centurion page, based in Roodepoort | **Same-day from R89 (motorbike, up to 15 km) and from R130 (car or bakkie, up to 15 km).** Centurion to Pretoria from R110, Midrand R110, Johannesburg R135, Sandton R140. Weekend +25%, a fuel surcharge on quotes, quotes held for 30 days. Phone 010 023 4832. The page is inconsistent in places (R75 and R89 for the same thing) and says nothing about fragile or fresh food. | Only with a car, and ask them first. Their hub is far from Centurion. |
| **Uber Connect** (Uber app, "Connect") | Book a driver to carry a parcel | **R10 booking fee + R5.45 per km, minimum R25** (launch article, undated and probably out of date; the 2020 Uber Direct driver rate was R10 + R4.08 per km). The launch cities listed were Johannesburg, Cape Town, Durban and Port Elizabeth, **Pretoria was not listed**, so check it works from your address. | Yes if you choose the car option. Cheapest on paper. |
| **Bolt Send** | Parcel delivery by Bolt | Launched January 2024 for **Johannesburg's northern suburbs only**. Parcels up to 60 x 40 x 40 cm and R1 500, **no insurance**, priced like a Bolt ride. | No: not in Centurion, and no cover if a cake is damaged. |
| **Picup** | Well-known on-demand courier network in Gauteng | **No current public price list could be found**, so we could not verify prices or Centurion coverage in this session. Prices show when you book on their app or website. | Probably yes with a car; needs a live quote. |
| **Lalamove, Droppa, Quivver** | Other on-demand / bakkie services | The searches only returned other countries' pages or nothing useful, so nothing was verified. | Unknown. |

**Our suggestion (honest version).** We cannot honestly crown one company from published prices alone. What we recommend:
1. **Use a car, not a motorbike, for every cake** (a cake must stay flat; a bike box tips). Cupcake boxes can go by bike if the box is secure.
2. **Primary: Picup, with a car.** It is the best-known Gauteng on-demand network and the one most bakers use, but **before you rely on it, get a live quote from Gerhardsville to two or three real addresses** (for example Centurion CBD, Pretoria East and Sandton) and tell us the prices; we then replace our estimates with yours.
3. **Backup: Uber Connect (car option).** It is the only one with a published per-km formula, which makes it the best yardstick, and a driver is usually minutes away. Check in the app that it works from your address.
4. **Keep UrgentGo's phone number** for large or weekend jobs: they give a written quote that holds for 30 days.
5. Whoever you use, **tell the driver it is a cake**, take a photo of the box leaving, and add a line to your Terms that the customer must be home to receive it.

**The fee method we will use in v10.26.11** (so you can say yes or change it first). The customer pays roughly what the courier charges, worked out from the **driving distance** from the bakery to the area and put in simple bands, rounded to R10. These are **our estimates, anchored on the car price above (about R130 for 15 km, which also matches the Uber formula), not live quotes**:

| Distance by road from the bakery | Fee on the website (estimate) |
|---|---|
| up to 10 km | R90 |
| 10 to 20 km | R130 |
| 20 to 35 km | R180 |
| 35 to 50 km | R240 |
| 50 to 70 km | R310 |
| 70 to 100 km | R420 |
| over 100 km | R420 plus R6 for every extra km (about R550 to Vereeniging, R600 to Vanderbijlpark). *Changed in v10.26.11 from "ask Becca": you asked for all of Gauteng, and a flat fee would lose you money.* |

*Distances will be worked out from each area's centre (the map's coordinates) times a road factor, so they can be a few kilometres out; the bands are wide on purpose. You can always change any area's fee in the admin. Free delivery above a certain order total can be switched on in the same box ("Free delivery on orders from R").*

**What we need from you:** a yes or a change to the bands above, and (when you can) two or three real quotes from Picup or Uber Connect from your address, so the numbers come from a live price.

**Sources:** [UrgentGo courier prices](https://urgentgocourier.co.za/courier-prices) and [Centurion page](https://urgentgocourier.co.za/courier-centurion); [IOL on Uber Connect pricing](https://www.iol.co.za/business-report/companies/ubers-new-package-delivery-service-costs-a-minimum-of-r25-d2a10b13-fdef-4467-8cb8-e2748c3353e5); [Uber Direct Moto post (2020 rates)](https://www.uber.com/en-ZA/blog/uber-direct-moto-in-south-africa/); [TechCentral on Bolt Send (29 Jan 2024)](https://techcentral.co.za/bolt-same-day-parcel-deliveries-joburg/238687); [MyProperty on Gerhardsville](https://www.myproperty.co.za/en-za/property/gauteng/centurion/gerhardsville).

### 5i. See the website on your phone, before it is online (v10.26.11)
*Your website is not on the internet yet (that is the "put it online" version, v11), so a phone cannot just open it. The easy way to show it to your girlfriend today is a free "drop" host: you drag one file onto a web page and it gives you a link.*

**What you need:** a computer, and the file **`online-bakery-phone-preview.zip`** that came with this version (it holds only the website, not the admin or the notes). About 5 minutes.
1. On your computer open **app.netlify.com/drop** (search "Netlify Drop" if you prefer).
2. **Drag the zip file onto the page.** No account is needed to start. Wait about half a minute.
3. It shows a link that ends in **`.netlify.app`**. Open it on your computer to check, then **send the link to your phone** (WhatsApp it to yourself) and to your girlfriend. It looks the way customers will see it: light colours, no dark mode.
4. **Keep it from disappearing:** a site you have not "claimed" is deleted after a while (Netlify does not say how long). When it offers **Claim this site**, sign up free with your email. You can then drag a **newer zip onto the same site** later and the link stays the same.
5. Another free host that works the same way is **cloudflare.com/drop**.

**Good to know**
- The link is long and random, but anyone who has it can open it. Send it only to people you trust.
- Browsing, the menu, the map and the delivery fees all work. **Do not press "Send order to Becca on WhatsApp"** unless you mean it: that message goes to the real number.
- The admin is not in this zip on purpose; you still use it on your own computer.
- When we change the website, ask for a new phone zip (every version can come with one) and drag it onto the same site.
- Your own web address (`yourbakery.co.za`), the browser icon and the search-engine setup come with the launch version (v11).

---

<a id="rules"></a>
## 6. How we work together (the rules)
1. **2 things per version**, no more. Anything else goes into the plan above or the ideas list.
2. **Nothing is thrown away.** Old text that is no longer current moves to [`ROADMAP_ARCHIVE.md`](ROADMAP_ARCHIVE.md). Finished work goes into [`BACKLOG.md`](BACKLOG.md).
3. **When a version is finished** it is added to the backlog, the status here is updated and `VERSION` goes up.
4. **Every version arrives as one `.zip`** of the whole project, named like `online-bakery-v10.21.1.zip`. You never have to apply anything by hand.
5. **Visitors never choose the theme.** Only Becca (everyday theme) and the automatic seasons decide.
6. **The admin is for admins only.** It is never linked from a public page, there is no public sign-up, and new admins are added by an existing admin. The real lock is in the online database.
