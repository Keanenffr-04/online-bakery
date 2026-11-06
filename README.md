# online-bakery 🐇🍰
Website for **The Sweetest Bakery** (Becca Smith). Sleek, modern, easy to use.

**Current version:** see `VERSION` (v10.5 = Instagram + Facebook links in the footer (placeholder handle `sweetest.bakery`, set in `config/business.json`) + glass-style best-seller cards with admin choice of how many and Glass/Plain style; v10.4 = dietary tags + filters and search on the Menu (no items tagged yet); v10.3 = FAQ page (draft answers) + reviews section (empty until real reviews are added); v10.2 = cart that sends one WhatsApp message (Add buttons, header cart icon, Cart page) + the Custom Order form; v10.1 = both strips stay pinned while scrolling + three-line menu on phones, links in the header on desktop; v10 = orders strip at the bottom of every page + one floating WhatsApp button (other WhatsApp buttons removed, Contact keeps its own); v9 = "Our best sellers" heading + scrolling specials strip at the top of every page (text and on/off in admin); v8 = second hero (baked goods + greeting, chosen in admin) + menu List layout fixed; v7 = double-click `preview.html` to browse the whole site + only "Menu" is a dropdown; v6 = clicked menu link colour + buttons invert on hover; v5 = header menu is always a dropdown with a hover highlight; v4 = Menu page with filters + decluttered home + admin page (`/src/admin.html`, default `admin` / `admin1`); to preview, double-click `preview.html`)

## Goals
- Sleek and modern, but dead simple to use
- Clear **sections** so nobody struggles to find things (Menu, Custom Orders, FAQ, Cart, About, Contact)
- Several **themes** to choose from (switchable, pick a favourite)
- Online only for now; customers can **WhatsApp us from any page** (one floating button), or fill a **cart** or the **Custom Order form** that sends one WhatsApp message

## Structure
```
online-bakery/
├── README.md
├── VERSION
├── roadmap/        ROADMAP.md (what's next) + BACKLOG.md (what's done). Never delete, only add.
├── docs/           BRAND.md, ARCHITECTURE.md, AI_HANDOFF.md, REFERENCES.md
├── preview.html    double-click to browse every page locally (no install, no server)
├── config/         business.json (name, WhatsApp, etc.)
├── assets/logo/    logo files
└── src/            index.html + placeholder pages, css/, js/, themes/, theme-preview.html
```

## Working rules (important)
1. 1 or 2 things per version. No more. **Versions after v10 are numbered v10.1, v10.2, v10.3 ... (owner's choice, v10.1).** The zip is named `online-bakery-v10.1.zip` etc.
2. Roadmap and backlog are **append-only**. Never delete. Versions may be pushed forward.
3. Finished work moves to the backlog tagged with its version number.
4. New ideas go in the roadmap "Ideas Parking Lot" (or a specific version if it fits).
5. Read `docs/AI_HANDOFF.md` before starting any version.
6. **Always deliver a `.zip` of the whole repo (including `.git`) with the patch already applied and committed.** The owner should never have to run `git am` themselves. Name it `online-bakery-vN.zip` (N = version).
7. **Preview:** double-click `preview.html`. It opens in the browser with a link to every page, and all links and data work straight from disk. (It replaced `preview.bat`/`preview.ps1` in v7.)
8. **Offline copy of the data:** `src/js/offline-data.js` mirrors `config/business.json`, `config/site-settings.json` and `src/data/products.json` so the preview works from disk. Whenever one of those three files changes, regenerate it (see `docs/AI_HANDOFF.md`). The admin **Publish** tab now downloads it too, so replace all three files together.
