# Handoff: read this first
You are continuing the build of **The Sweetest Bakery** website (repo: online-bakery).

1. Read `README.md`, `docs/BRAND.md`, `docs/ARCHITECTURE.md`.
2. Open `roadmap/ROADMAP.md`. Do **only the version marked NEXT** in its plan table (2 to 3 things). The roadmap has a table of contents and a status tracker; update both when you finish.
3. When done: add a full entry to `roadmap/BACKLOG.md` **and** a row in its contents table; mark the items DONE in `roadmap/ROADMAP.md` (plan table + owner-request tracker) and move the NEXT marker; bump `VERSION`.
4. **Never delete** anything in roadmap or backlog. Only append. If something slips, push it to a later version and note why.
5. New ideas from the owner: add to the roadmap where they fit best.
6. Keep it sleek, modern, simple. Sections over clutter. Don't over-build, the owner has limited Claude usage.
7. Business details come from `config/business.json` only.
8. Deliver the finished version as a **.zip of the whole repo (with `.git`) with your work already committed**, named `online-bakery-vN.zip`. Do not hand over a loose patch for the owner to apply (see README rule 6).
9. **Keep the offline copy in sync.** If you change `config/business.json`, `config/site-settings.json` or `src/data/products.json`, regenerate `src/js/offline-data.js` (it is a `window.SB_OFFLINE = {business, settings, products}` copy used only when the site is opened from disk via `preview.html`). From the repo root: `python3 -c "import json;r=lambda p:json.load(open(p));print('window.SB_OFFLINE = '+json.dumps({'business':r('config/business.json'),'settings':r('config/site-settings.json'),'products':r('src/data/products.json')},indent=2,ensure_ascii=False)+';')"` and keep the header comment at the top of that file.
10. **Test before you hand over.** Open `preview.html` over `file://` in a headless browser, click through every link, and make sure nothing is dead, empty or erroring (v7 did this).
11. **Follow the plan table in `roadmap/ROADMAP.md`**; it supersedes version numbers in the old notes (kept in `roadmap/ROADMAP_ARCHIVE.md`). New owner requests: add them to the tracker (section 2) and to a version in the plan, max 2 to 3 per version; anything needing logins / email / accounts goes under BACKEND. Photos and launch/hosting are deliberately LAST and only when the owner says so.
12. The cart (`js/cart.js`) and forms are WhatsApp-only by design until the backend version. Product cards use `data-add`, not a WhatsApp link. Test the cart, the Custom Order message text and the header at 320px (cart icon + menu button must share the row).

