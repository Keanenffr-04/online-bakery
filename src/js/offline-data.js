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
    "_note": "Single source of truth for business details. Never hardcode these elsewhere. instagram / facebook are PLACEHOLDER handles (v10.5) until the owner gives the real ones; leave one empty to hide that link.",
    "instagram": "sweetest.bakery",
    "facebook": "sweetest.bakery"
  },
  "settings": {
    "theme": "classic",
    "tagline": "Cakes, cupcakes, cookies and bread, baked fresh to order by Becca.",
    "heroStyle": "logo",
    "greeting": "Welcome in, something sweet is baking.",
    "home": {
      "hero": true,
      "featured": true,
      "cta": true
    },
    "featuredCount": 3,
    "featuredStyle": "glass",
    "menuLayout": "grid",
    "specials": {
      "enabled": true,
      "items": [
        "Today's specials: ask Becca on WhatsApp",
        "Custom cakes for every occasion, order online"
      ]
    },
    "orders": {
      "enabled": true,
      "items": [
        "How to order: message Becca on WhatsApp",
        "Tell us what you'd like, the date you need it and any notes"
      ]
    },
    "_note": "Published site settings. The admin page (src/admin.html) can export a new copy of this file. faq: [{q,a,draft}] (draft:true shows a 'Draft answer' tag until Becca confirms it). reviews: [{name,text,rating(1-5, optional),date(optional)}], real reviews only; the section stays hidden while the list is empty.",
    "faq": [
      {
        "q": "How do I order?",
        "a": "Add items from the menu to your cart and send the order to us on WhatsApp, or use the Custom Order form for birthdays, weddings and events. Becca replies to confirm the details.",
        "draft": true
      },
      {
        "q": "How much notice do you need?",
        "a": "Tell us the date you need your order when you message us and Becca will confirm whether she can fit it in. For big or custom cakes, ask as early as you can.",
        "draft": true
      },
      {
        "q": "Do you cater for allergies and dietary needs?",
        "a": "Please tell us about any allergies or dietary needs when you order, and Becca will tell you what goes into each bake and what she can or can't do. If an allergy is serious, ask before you order.",
        "draft": true
      },
      {
        "q": "Do you deliver, or is it collection only?",
        "a": "You can say whether you'd like collection or delivery in your cart or on the Custom Order form. Becca confirms what is possible for your area, and any delivery fee, on WhatsApp.",
        "draft": true
      },
      {
        "q": "How do I pay?",
        "a": "Becca confirms the total and how to pay when she confirms your order on WhatsApp. You don't pay anything on the website.",
        "draft": true
      },
      {
        "q": "Can I change or cancel my order?",
        "a": "Message Becca on WhatsApp as soon as you can and she will let you know what is possible.",
        "draft": true
      }
    ],
    "reviews": []
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
