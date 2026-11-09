# online-bakery 🐇🍰
Website for **The Sweetest Bakery** (Becca Smith). Sleek, modern, easy to use.

**Current version:** v10.26.10. The latest three versions:
- **v10.26.10:** (your list 29) a **"View site as a customer"** tile next to Theme preview on the local preview page: it opens the website exactly as a visitor sees it (light, none of your own unsaved changes), with a small **Customer view / Back to preview** pill. Also the **delivery courier research** for the bakery (which companies, what they charge, which we suggest, and the fee bands we propose: `roadmap/ROADMAP.md` guide **5h**). The fees go on the website in v10.26.11 once you say yes to the bands. Nothing to update in the database.
- **v10.26.9:** (your list 27, item 1, step 2 of 3) the **delivery-area list now holds all the areas of Gauteng** (118 of them: Johannesburg, Sandton, Centurion, Pretoria, Boksburg, Krugersdorp, Vereeniging and so on) instead of "Close to the bakery / Further out". **The fees are samples** (R 80 Johannesburg and Tshwane, R 90 East Rand, R 110 West Rand, R 130 Vaal) until you set yours in Admin > Ordering & payment > Order calendar & delivery. Nothing to update in the database. Grouping the list by region comes in v10.26.10.
- **v10.26.8:** (your list 27, item 2, step 1 of 3) the **delivery map now shows by itself** under the address box a moment after the customer stops typing. There is no button to press any more (a small **Try again** button only appears if the free map service did not answer). Changing the delivery area refreshes it. The Gauteng areas (v10.26.9 and v10.26.10) come next. Nothing to update in the database.
- **v10.26.7:** (your list 25, item 3, step 2 of 3) under the **delivery address** box the customer can press **Show on map** (or just click out of the box) and see the spot on a **free OpenStreetMap map**, so a typo is easy to spot. It is only a check: an order is never blocked by it. Cart and Custom Order. The map later became automatic (v10.26.8). Nothing to update in the database.
- **v10.26.6:** (your list 25, item 3, step 1 of 3) when a customer picks **Delivery** they now **type their delivery address** on the Cart and Custom Order. It goes into the WhatsApp message and the saved order, and shows next to the order in the admin and on the printed slip. The map (v10.26.7) was added next. Nothing to update in the database.
- **v10.26.5:** (your list 26) a **dark mode for every theme**. It turns on by itself when you open the website on your own computer (double-click `preview.html`), so working late is easier on the eyes. The real website is always light and visitors get no switch. Nothing to update in the database.
- **v10.26.4:** (your list 25, part 1 of 3) the **cart empties by itself** after an order is sent, and **"Order the same again" is removed** (thank-you page and My account). The thank-you page's **Open WhatsApp** button now carries the order text. Nothing to update in the database.
- *(older)* **v10.26.3:** a **backup WhatsApp number** (Keanen) on the Contact and thank-you pages, plus a step-by-step **how to order** guide in the roadmap (section 5g). Nothing to update in the database.
- *(older)* **v10.26.2:** a **fix for the photo storage warning** in the Live check. The check is now accurate (it tries a test picture the way a stranger would, then removes it), and the database gets an extra lock so nobody but an admin can ever see an inspiration photo. **Run the newest `setup.sql` once**, then run the Live check again.
- *(older)* **v10.26.1:** the **admin is tidied**: a new tab, **Ordering & payment**, holds the order calendar and delivery, the cake price guide and How to pay. **Theme & layout** now only has looks (theme, seasons, Home page, strips, Menu page). Nothing to update in the database.
- **v10.26:** a **"How to pay" box** on the thank-you page (your bank details, SnapScan and Capitec Pay, with Copy buttons). Type your details in Admin > Ordering & payment > **How to pay**; customers see nothing until you do. No database update needed.
- **v10.25:** a **review page** (customers write a short review; you press **Approve** in the admin before it shows) and **inspiration photos** on Custom Orders (stored privately; **View photo** next to the order). Run the newest `setup.sql` once.
- *(older)* **v10.24:** a **bake sheet** in the admin (what to make for a day, added up from every order, printable) and a **new-order alert** (a chime and a pop-up while the admin is open). Run the newest `setup.sql` once (optional, makes the alert instant).
- *(older)* **v10.23:** a **Live check** button in the admin that tests the real online database, **spam protection** on orders and sign-up, and a **keep-alive** so the free database never pauses. Run the newest `setup.sql` once.

Every version, in plain English, is in [`roadmap/BACKLOG.md`](roadmap/BACKLOG.md).

---

## 👋 Start here (for Becca)
You do not need to know anything about websites or code to use this page. Everything is explained in plain words, and the **Words explained** list near the bottom covers any word you have not met.

### The three pages that matter
| Page | What it tells you |
|---|---|
| **This README** | How to use everything, and what to do if something looks wrong |
| [`roadmap/ROADMAP.md`](roadmap/ROADMAP.md) | **What is coming next**, and **what we need from you** (your checklist is in section 2) |
| [`roadmap/BACKLOG.md`](roadmap/BACKLOG.md) | **Everything that is already built**, starting with "What the website can do today" |

### See the website on your computer
Open the project folder and **double-click `preview.html`**. It opens in your browser with a link to every page. The **View site as a customer** tile (under Behind the scenes) shows the site the way a visitor sees it; press **Back to preview** in the little pill to return. You do not need to install anything. (Signing in and saving orders need an internet connection.)

### Open the admin
The admin is where you change things. It is **not linked from the public website on purpose**, so customers never see it.
1. Double-click `preview.html` and click the **Staff admin** tile (or open `src/admin.html`).
2. Sign in with your email and password. Only the emails on the admin list can get in.
3. Pick a tab: **Orders**, **Menu items**, **Ordering & payment**, **Theme & layout**, **Admins**, **My account**, **Backup & files**.

When you press **Save**, the change is live for everyone straight away. *(Some words on the admin screens still mention "Publish" or "save to this device". Ignore them; it is already live. This is on the to-fix list.)*

### Your day-to-day jobs
| I want to... | Go to... |
|---|---|
| See new orders | Admin > **Orders**. New ones are marked **pending** |
| Confirm an order and tell the customer | Orders > press **Confirm**, then the green **WhatsApp** button. The message is typed for you and you can change it before sending |
| Say an order is ready or finished | Press **Mark ready**, later **Mark done** (each has its own WhatsApp message) |
| Print a slip for the bench or the box | Orders > **Print slip** |
| See how busy the next two weeks are | Orders > **Upcoming dates** |
| See what to bake for a day, and print it | Orders > **Bake sheet** > pick the day > **Print bake sheet** (allergies show in red) |
| Hear about new orders | Keep the admin open. A chime and a pop-up arrive with each website order. Switch it on or off in Orders > **New-order alert** (per device) |
| See how many orders this week or month | The **Numbers** box at the top of Orders (it can download a spreadsheet) |
| Mark something as sold out for today | Admin > **Menu items** > **Sold out today** (it switches itself back on at midnight) |
| Add a cake, change a price or hide an item | Admin > **Menu items** (use **Menu sections** to add or reorder the groups) |
| Close a day, set notice days, a daily limit or delivery fees (one per area; **Add the missing Gauteng areas** adds any you removed) | Admin > **Ordering & payment** > **Order calendar & delivery** |
| Add my bank / SnapScan / Capitec Pay details for customers | Admin > **Ordering & payment** > **How to pay** |
| Change cake sizes, flavours or prices in the price guide | Admin > **Ordering & payment** > **Cake price guide** |
| Change the look, the season dates or the Home page order | Admin > **Theme & layout** |
| Change the scrolling words at the top or bottom | Admin > Theme & layout > **Top and bottom strips** |
| Check that everything online still works | Admin > **Backup & files** > **Run the live check** (it sends a test order and removes it again) |
| Keep a safe copy of everything | Admin > **Backup & files** > download a backup |

### Getting the next version built
1. Write what you want in a file called **`Changes for next version.md`** (Notepad is fine, a numbered list works well).
2. Send it together with the **newest zip** and say **"start next v/patch"**. If you send no list, the next item on the roadmap is built.
3. **Two changes per version.** Anything extra is saved on the ideas list (roadmap section 4) so nothing is lost.
4. You get back a new zip named like `online-bakery-v10.22.zip`. **Keep every zip.** The newest one is always the whole website with everything in it.
5. A **version** such as v10.22 is a bigger step. A **patch** such as v10.21.1 is a small fix on top of it.

### Things only you can do
The full checklist is in [`roadmap/ROADMAP.md`, section 2](roadmap/ROADMAP.md#need). The short version:
- Update the online database when a version says so (about 2 minutes, steps are in the roadmap).
- Replace the sample numbers: notice days, orders per day, delivery areas and fees, prices, and the cake sizes and prices in the price guide.
- Send real FAQ answers, reviews, your story and your Instagram and Facebook names.
- Read the Privacy and Terms pages and fix anything that is not true for your bakery.
- Send photos when you have them, and tell us when you are happy so we can put it online.

### If something looks wrong
| What you see | What to try |
|---|---|
| Admin says **"The online database is not answering"** | Open supabase.com and check the project is not paused (click **Restore** if it is). If it was never set up, run `supabase/setup.sql` (roadmap section 2c). |
| You cannot sign in to the admin, or no email arrives | Emails from the free sender often never arrive. Create the login directly: Supabase > Authentication > Users > **Add user**, tick **Auto Confirm User** (roadmap section 2d). The email must be on the admin list. |
| The delivery map says "not answering" or "could not find that" | The map shows by itself after the customer stops typing. It is a free service and only a check; **Try again** appears when it did not answer. The customer can still send the order and you check the address with them on WhatsApp. |
| A customer cannot reach me on WhatsApp | The Contact page and thank-you page show **"Can't reach Becca? WhatsApp Keanen"**. The number lives in `config/business.json` (`backupWhatsapp`). |
| A customer says their confirm or reset email never came | Customers need your own email sender first (roadmap guide 5c). **Continue with Google** and WhatsApp still work. |
| I saved a change but customers do not see it | Make sure you pressed **Save** in that section, then reload the page. |
| A customer cannot pick the date they want | That is the **order calendar**: not enough notice, a day off, a blocked date or a full day. Change the rules in Ordering & payment > Order calendar & delivery. |
| WhatsApp did not open after an order | Your browser may have blocked the pop-up. The thank-you page has an **Open WhatsApp** button. The order is saved either way. |
| An item I marked "Sold out today" is back | That is on purpose: it switches itself off at midnight. |
| The moving decorations are too much | Admin > Theme & layout > Theme: untick **Moving decorations**. Customers can also press the Pause button. |
| The live check says **"Strangers CAN look inside the photo storage"** | Run the newest `setup.sql` (roadmap section 2c), then run the live check again. If it still says so, send us a screenshot and switch the photo upload off by not using it until we fix it. |
| The live check shows a yellow or red line | The line says what to do. Most often it is "run the newest `setup.sql`" (roadmap section 2c). Red means stop and send us a screenshot. |
| I did not hear the new-order chime | Browsers only allow sound after you have touched the page once, so tap anywhere after reloading. Then press Orders > New-order alert > **Test the chime** and check the volume. The pop-up always shows. The alert cannot reach a closed phone yet (that comes with the install-as-an-app step). |
| Orders from one customer or phone are not saved online | The spam guard allows 6 an hour per phone number. The WhatsApp message always works, so the order still reaches you. |
| Anything else | Tell us in your next change list, with the page name and what you expected. |

### Words explained
| Word | What it means |
|---|---|
| **Admin** | The private page where you change the menu, orders and look. Customers cannot open it. |
| **Roadmap** | The plan: what is coming next and what we need from you. |
| **Backlog** | The list of everything already built. (It is also where "good ideas for later" are kept.) |
| **Version / patch** | A version (v10.22) is a bigger step. A patch (v10.21.1) is a small fix on top of a version. |
| **Zip** | One file that holds the whole website. You send us the latest one and we send back a new one. |
| **Theme** | A look: colours, fonts and decorations. Everyday themes are calm. Special-occasion themes (Christmas and so on) have small moving decorations. |
| **Automatic seasons** | The website switching to an occasion theme by itself on dates you can edit, then back again. |
| **Supabase** | The online "back room" where the website keeps orders, accounts, the menu and your settings, and checks who is allowed in. It is free for now. |
| **Database** | The tidy tables of information (orders, menu items, accounts) kept in Supabase. |
| **`setup.sql`** | A small file of instructions you paste into Supabase once in a while. It never deletes anything. |
| **Publish** | An old step from before v10.17. You do not need it any more: Save is already live. |
| **Placeholder / Draft** | A sample that should be replaced with your real details (for example the sample delivery fees). |
| **Live check** | The admin button that tries the real online database and tells you in plain words what is fine and what to fix. |
| **Spam guard** | Quiet rules that stop robots flooding the order form. Real customers never notice them. |
| **Keep-alive** | A tiny scheduled job that touches the free database every few days so it never pauses. |
| **Price guide** | The box on the Custom Orders page where a customer picks a cake size and flavour and sees a rough price. The prices are yours to set in the admin. |
| **Bake sheet** | A list in Orders of what to make for a day, added up from all the orders still to bake. It can be printed. |
| **New-order alert** | A chime and a pop-up in the admin when a website order arrives. It works while the admin page is open. |
| **Order calendar** | The rules about which dates customers may choose: notice days, days off, blocked dates and a daily limit. |
| **Email sender (SMTP)** | A service that sends the confirm and reset emails to customers. We set it up with your own web address. |
| **POPIA** | South Africa's law about protecting people's personal information. The Privacy page follows it. |
| **Hosting / domain / launch** | Hosting is the computer that shows the website to the world. A domain is the web address (like `yourbakery.co.za`). Launch is the day it goes live. |
| **Repo / git** | The project folder and its saved history. You never need to touch the hidden `.git` folder. |

---

## What the website is for (goals)
- Sleek and modern, but dead simple to use
- Clear **sections** so nobody struggles to find things (Menu, Custom Orders, FAQ, Cart, About, Contact)
- Several **themes** to choose from (switchable, pick a favourite)
- Online only for now; customers can **WhatsApp us from any page** (one floating button), or fill a **cart** or the **Custom Order form** that sends one WhatsApp message

## What is in the project folder (structure)
```
online-bakery/
├── README.md
├── VERSION
├── roadmap/        ROADMAP.md (tidy plan + status tracker) + BACKLOG.md (what's done, with contents) + ROADMAP_ARCHIVE.md (old notes). Never delete.
├── docs/           BRAND.md, ARCHITECTURE.md, AI_HANDOFF.md, REFERENCES.md
├── preview.html    double-click to browse every page locally (no install, no server)
├── config/         business.json (name, WhatsApp, public Supabase url + key, etc.)
├── .github/        workflows/keep-alive.yml (keeps the free database awake)
├── tools/          make-dark.py (rebuilds the dark colours for every theme; run it after adding a theme)
├── supabase/       setup.sql (paste into the Supabase SQL Editor when a version says so: tables, admin emails, locks; safe to run again)
├── assets/logo/    logo files
└── src/            index.html + placeholder pages, css/, js/, themes/, theme-preview.html
```

## For whoever builds the site: working rules (important)
*Becca: you can skip this part. It is the instruction sheet for Claude or a developer.*

1. 2 things per version. No more. **Versions after v10 are numbered v10.1, v10.2, v10.3 ... (owner's choice, v10.1).** The zip is named `online-bakery-v10.1.zip` etc.
2. Roadmap and backlog are **append-only**. Never delete. Versions may be pushed forward.
3. Finished work moves to the backlog tagged with its version number.
4. New ideas go in the roadmap "Ideas for later" list, section 4 (or a specific version if it fits).
5. Read `docs/AI_HANDOFF.md` before starting any version.
6. **Always deliver a `.zip` of the whole repo (including `.git`) with the patch already applied and committed.** The owner should never have to run `git am` themselves. Name it `online-bakery-vN.zip` (N = version).
7. **Preview:** double-click `preview.html`. It opens in the browser with a link to every page, and all links and data work straight from disk. (It replaced `preview.bat`/`preview.ps1` in v7.)
8. **Offline copy of the data:** `src/js/offline-data.js` mirrors `config/business.json`, `config/site-settings.json` and `src/data/products.json` so the preview works from disk. Whenever one of those three files changes, regenerate it (see `docs/AI_HANDOFF.md`). The admin **Publish** tab now downloads it too, so replace all three files together.
