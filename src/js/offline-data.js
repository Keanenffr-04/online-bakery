/* offline-data.js: a COPY of config/business.json, config/site-settings.json and src/data/products.json.
   Only used when the site is opened straight from disk (file://, e.g. preview.html), because browsers block
   fetch() of local files. The live/hosted site ignores this file and reads the real JSON files.
   KEEP IN SYNC: whenever one of those three files changes, regenerate this file (see docs/AI_HANDOFF.md). */
window.SB_OFFLINE = {
  "business": {
    "name": "The Sweetest Bakery",
    "owner": "Becca Smith",
    "phoneDisplay": "083 341 3166",
    "whatsappNumber": "27833413166",
    "whatsappLink": "https://wa.me/27833413166",
    "country": "ZA",
    "currency": "ZAR",
    "mode": "online-only",
    "_note": "Single source of truth for business details. Never hardcode these elsewhere."
  },
  "settings": {
    "theme": "classic",
    "tagline": "Cakes, cupcakes, cookies and bread, baked fresh to order by Becca.",
    "home": {
      "hero": true,
      "featured": true,
      "cta": true
    },
    "featuredCount": 3,
    "menuLayout": "grid",
    "_note": "Published site settings. The admin page (src/admin.html) can export a new copy of this file."
  },
  "products": {
    "_note": "SAMPLE menu and prices. Replace with Becca's real menu (or export from the admin page).",
    "categories": [
      {
        "id": "cakes",
        "name": "Cakes",
        "icon": "🍰"
      },
      {
        "id": "treats",
        "name": "Small Treats",
        "icon": "🧁"
      },
      {
        "id": "bread",
        "name": "Bread",
        "icon": "🍞"
      }
    ],
    "products": [
      {
        "id": "p1",
        "name": "Chocolate Ganache Cake",
        "category": "cakes",
        "description": "Rich, glossy and made to share.",
        "price": 450,
        "emoji": "🍰",
        "featured": true,
        "visible": true
      },
      {
        "id": "p2",
        "name": "Red Velvet Cake",
        "category": "cakes",
        "description": "Cream cheese frosting, soft crumb.",
        "price": 420,
        "emoji": "🎂",
        "featured": false,
        "visible": true
      },
      {
        "id": "p3",
        "name": "Carrot Cake",
        "category": "cakes",
        "description": "Spiced, moist, walnut crunch.",
        "price": 380,
        "emoji": "🥕",
        "featured": false,
        "visible": true
      },
      {
        "id": "p4",
        "name": "Vanilla Cupcakes (6)",
        "category": "treats",
        "description": "Light sponge with buttercream swirls.",
        "price": 180,
        "emoji": "🧁",
        "featured": true,
        "visible": true
      },
      {
        "id": "p5",
        "name": "Choc Chip Cookies (6)",
        "category": "treats",
        "description": "Crisp edges, gooey middles.",
        "price": 90,
        "emoji": "🍪",
        "featured": false,
        "visible": true
      },
      {
        "id": "p6",
        "name": "Cinnamon Rolls (4)",
        "category": "treats",
        "description": "Warm, sticky, cream cheese glaze.",
        "price": 120,
        "emoji": "🥐",
        "featured": false,
        "visible": true
      },
      {
        "id": "p7",
        "name": "Sourdough Loaf",
        "category": "bread",
        "description": "Crusty outside, soft inside.",
        "price": 65,
        "emoji": "🍞",
        "featured": true,
        "visible": true
      },
      {
        "id": "p8",
        "name": "Seed Loaf",
        "category": "bread",
        "description": "Hearty and full of seeds.",
        "price": 60,
        "emoji": "🌾",
        "featured": false,
        "visible": true
      }
    ]
  }
};
