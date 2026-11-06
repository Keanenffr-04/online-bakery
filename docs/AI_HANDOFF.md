# Handoff: read this first
You are continuing the build of **The Sweetest Bakery** website (repo: online-bakery).

1. Read `README.md`, `docs/BRAND.md`, `docs/ARCHITECTURE.md`.
2. Open `roadmap/ROADMAP.md`. Do **only the next version** listed there (1 or 2 things).
3. When done: move those items to `roadmap/BACKLOG.md` with the version number and date; bump `VERSION`; update the roadmap's "Next up" pointer.
4. **Never delete** anything in roadmap or backlog. Only append. If something slips, push it to a later version and note why.
5. New ideas from the owner: add to the roadmap where they fit best.
6. Keep it sleek, modern, simple. Sections over clutter. Don't over-build, the owner has limited Claude usage.
7. Business details come from `config/business.json` only.
8. Deliver the finished version as a **.zip of the whole repo (with `.git`) with your work already committed**, named `online-bakery-vN.zip`. Do not hand over a loose patch for the owner to apply (see README rule 6).
9. **Keep the offline copy in sync.** If you change `config/business.json`, `config/site-settings.json` or `src/data/products.json`, regenerate `src/js/offline-data.js` (it is a `window.SB_OFFLINE = {business, settings, products}` copy used only when the site is opened from disk via `preview.html`). From the repo root: `python3 -c "import json;r=lambda p:json.load(open(p));print('window.SB_OFFLINE = '+json.dumps({'business':r('config/business.json'),'settings':r('config/site-settings.json'),'products':r('src/data/products.json')},indent=2,ensure_ascii=False)+';')"` and keep the header comment at the top of that file.
10. **Test before you hand over.** Open `preview.html` over `file://` in a headless browser, click through every link, and make sure nothing is dead, empty or erroring (v7 did this).
