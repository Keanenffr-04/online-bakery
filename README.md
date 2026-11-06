# online-bakery 🐇🍰
Website for **The Sweetest Bakery** (Becca Smith). Sleek, modern, easy to use.

**Current version:** see `VERSION` (v4 = Menu page with filters + decluttered home + admin page (`/src/admin.html`, default `admin` / `admin1`); serve the repo root with `python3 -m http.server` and open `/src/index.html`)

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
├── preview.bat/.ps1  one-click local preview (free port, opens browser)
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
7. **Preview:** double-click `preview.bat` (runs `preview.ps1`). It picks a free port, serves the site and opens it in the browser. Ctrl+C to stop.
