# online-bakery 🐇🍰
Website for **The Sweetest Bakery** (Becca Smith). Sleek, modern, easy to use.

**Current version:** v10.21.1. The latest three versions:
- **v10.21.1** (patch): a plain-English roadmap, backlog and this README.
- **v10.21:** order calendar (notice days, days off, blocked dates, daily limit) and delivery or collection fees by area. The numbers are samples until you set yours.
- **v10.20:** five more occasion themes and ready-made WhatsApp messages for each order status.

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
Open the project folder and **double-click `preview.html`**. It opens in your browser with a link to every page. You do not need to install anything. (Signing in and saving orders need an internet connection.)

### Open the admin
The admin is where you change things. It is **not linked from the public website on purpose**, so customers never see it.
1. Double-click `preview.html` and click the **Staff admin** tile (or open `src/admin.html`).
2. Sign in with your email and password. Only the emails on the admin list can get in.
3. Pick a tab: **Orders**, **Menu items**, **Theme & layout**, **Admins**, **My account**, **Backup & files**.

When you press **Save**, the change is live for everyone straight away. *(Some words on the admin screens still mention "Publish" or "save to this device". Ignore them; it is already live. This is on the to-fix list.)*

### Your day-to-day jobs
| I want to... | Go to... |
|---|---|
| See new orders | Admin > **Orders**. New ones are marked **pending** |
| Confirm an order and tell the customer | Orders > press **Confirm**, then the green **WhatsApp** button. The message is typed for you and you can change it before sending |
| Say an order is ready or finished | Press **Mark ready**, later **Mark done** (each has its own WhatsApp message) |
| Print a slip for the bench or the box | Orders > **Print slip** |
| See how busy the next two weeks are | Orders > **Upcoming dates** |
| See how many orders this week or month | The **Numbers** box at the top of Orders (it can download a spreadsheet) |
| Mark something as sold out for today | Admin > **Menu items** > **Sold out today** (it switches itself back on at midnight) |
| Add a cake, change a price or hide an item | Admin > **Menu items** (use **Menu sections** to add or reorder the groups) |
| Close a day, set notice days, a daily limit or delivery fees | Admin > **Theme & layout** > **Order calendar & delivery** |
| Change the look, the season dates or the Home page order | Admin > **Theme & layout** |
| Change the scrolling words at the top or bottom | Admin > Theme & layout > **Top and bottom strips** |
| Keep a safe copy of everything | Admin > **Backup & files** > download a backup |

### Getting the next version built
1. Write what you want in a file called **`Changes for next version.md`** (Notepad is fine, a numbered list works well).
2. Send it together with the **newest zip** and say **"start next v/patch"**. If you send no list, the next item on the roadmap is built.
3. **Two to three changes per version.** Anything extra is saved on the ideas list (roadmap section 4) so nothing is lost.
4. You get back a new zip named like `online-bakery-v10.22.zip`. **Keep every zip.** The newest one is always the whole website with everything in it.
5. A **version** such as v10.22 is a bigger step. A **patch** such as v10.21.1 is a small fix on top of it.

### Things only you can do
The full checklist is in [`roadmap/ROADMAP.md`, section 2](roadmap/ROADMAP.md#need). The short version:
- Update the online database when a version says so (about 2 minutes, steps are in the roadmap).
- Replace the sample numbers: notice days, orders per day, delivery areas and fees, prices.
- Send real FAQ answers, reviews, your story and your Instagram and Facebook names.
- Read the Privacy and Terms pages and fix anything that is not true for your bakery.
- Send photos when you have them, and tell us when you are happy so we can put it online.

### If something looks wrong
| What you see | What to try |
|---|---|
| Admin says **"The online database is not answering"** | Open supabase.com and check the project is not paused (click **Restore** if it is). If it was never set up, run `supabase/setup.sql` (roadmap section 2c). |
| You cannot sign in to the admin, or no email arrives | Emails from the free sender often never arrive. Create the login directly: Supabase > Authentication > Users > **Add user**, tick **Auto Confirm User** (roadmap section 2d). The email must be on the admin list. |
| A customer says their confirm or reset email never came | Customers need your own email sender first (roadmap guide 5c). **Continue with Google** and WhatsApp still work. |
| I saved a change but customers do not see it | Make sure you pressed **Save** in that section, then reload the page. |
| A customer cannot pick the date they want | That is the **order calendar**: not enough notice, a day off, a blocked date or a full day. Change the rules in Theme & layout > Order calendar & delivery. |
| WhatsApp did not open after an order | Your browser may have blocked the pop-up. The thank-you page has an **Open WhatsApp** button. The order is saved either way. |
| An item I marked "Sold out today" is back | That is on purpose: it switches itself off at midnight. |
| The moving decorations are too much | Admin > Theme & layout > Theme: untick **Moving decorations**. Customers can also press the Pause button. |
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
├── supabase/       setup.sql (paste into the Supabase SQL Editor when a version says so: tables, admin emails, locks; safe to run again)
├── assets/logo/    logo files
└── src/            index.html + placeholder pages, css/, js/, themes/, theme-preview.html
```

## For whoever builds the site: working rules (important)
*Becca: you can skip this part. It is the instruction sheet for Claude or a developer.*

1. 2 to 3 things per version. No more. **Versions after v10 are numbered v10.1, v10.2, v10.3 ... (owner's choice, v10.1).** The zip is named `online-bakery-v10.1.zip` etc.
2. Roadmap and backlog are **append-only**. Never delete. Versions may be pushed forward.
3. Finished work moves to the backlog tagged with its version number.
4. New ideas go in the roadmap "Ideas for later" list, section 4 (or a specific version if it fits).
5. Read `docs/AI_HANDOFF.md` before starting any version.
6. **Always deliver a `.zip` of the whole repo (including `.git`) with the patch already applied and committed.** The owner should never have to run `git am` themselves. Name it `online-bakery-vN.zip` (N = version).
7. **Preview:** double-click `preview.html`. It opens in the browser with a link to every page, and all links and data work straight from disk. (It replaced `preview.bat`/`preview.ps1` in v7.)
8. **Offline copy of the data:** `src/js/offline-data.js` mirrors `config/business.json`, `config/site-settings.json` and `src/data/products.json` so the preview works from disk. Whenever one of those three files changes, regenerate it (see `docs/AI_HANDOFF.md`). The admin **Publish** tab now downloads it too, so replace all three files together.
