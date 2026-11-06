# online-bakery 🐇🍰
Website for **The Sweetest Bakery** (Becca Smith). Sleek, modern, easy to use.

**Current version:** see `VERSION` (v7 = double-click `preview.html` to browse the whole site + only "Menu" is a dropdown; v6 = clicked menu link colour + buttons invert on hover; v5 = header menu is always a dropdown with a hover highlight; v4 = Menu page with filters + decluttered home + admin page (`/src/admin.html`, default `admin` / `admin1`); to preview, double-click `preview.html`)

## Goals
- Sleek and modern, but dead simple to use
- Clear **sections** so nobody struggles to find things (Cakes, Cupcakes, Cookies, Bread, Custom Orders, About, Contact)
- Several **themes** to choose from (switchable, pick a favourite)
- Online only for now; customers can **WhatsApp us from any page**

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
1. 1 or 2 things per version. No more.
2. Roadmap and backlog are **append-only**. Never delete. Versions may be pushed forward.
3. Finished work moves to the backlog tagged with its version number.
4. New ideas go in the roadmap "Ideas Parking Lot" (or a specific version if it fits).
5. Read `docs/AI_HANDOFF.md` before starting any version.
6. **Always deliver a `.zip` of the whole repo (including `.git`) with the patch already applied and committed.** The owner should never have to run `git am` themselves. Name it `online-bakery-vN.zip` (N = version).
7. **Preview:** double-click `preview.html`. It opens in the browser with a link to every page, and all links and data work straight from disk. (It replaced `preview.bat`/`preview.ps1` in v7.)
8. **Offline copy of the data:** `src/js/offline-data.js` mirrors `config/business.json`, `config/site-settings.json` and `src/data/products.json` so the preview works from disk. Whenever one of those three files changes, regenerate it (see `docs/AI_HANDOFF.md`).
