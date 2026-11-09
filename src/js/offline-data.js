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
    "backupWhatsapp": {
      "name": "Keanen",
      "phoneDisplay": "081 211 8414",
      "number": "27812118414"
    },
    "country": "ZA",
    "currency": "ZAR",
    "mode": "online-only",
    "_note": "Single source of truth for business details. Never hardcode these elsewhere. instagram / facebook are PLACEHOLDER handles (v10.5) until the owner gives the real ones; leave one empty to hide that link. supabase.url / supabase.key (v10.17) are PUBLIC by design (the publishable key); the data is protected by the locks in supabase/setup.sql. Never put a secret / service_role key here. backupWhatsapp (v10.26.3) is a second WhatsApp number shown as \"Can't reach Becca?\" on the Contact and thank-you pages; orders still go to the main number and are saved online for both admins. Leave the number empty to hide it.",
    "instagram": "sweetest.bakery",
    "facebook": "sweetest.bakery",
    "supabase": {
      "url": "https://tiynbahroiicptjaqqiy.supabase.co",
      "key": "sb_publishable_cyQfXKNbssrzbbgCintzSQ_V-7TU40m"
    }
  },
  "settings": {
    "theme": "classic",
    "tagline": "Cakes, cupcakes, cookies and bread, baked fresh to order by Becca.",
    "heroStyle": "logo",
    "greeting": "Welcome in, something sweet is baking.",
    "home": {
      "hero": true,
      "shop": true,
      "featured": true,
      "fresh": true,
      "meet": true,
      "steps": true,
      "cta": true
    },
    "meet": {
      "heading": "Meet Becca",
      "text": "Hi, I'm Becca, the baker behind The Sweetest Bakery. Everything here is handmade and baked fresh to order, so nothing sits on a shelf waiting for you.\n\nTell me what you're celebrating and I'll bake something sweet for it.",
      "draft": true
    },
    "featuredCount": 3,
    "featuredStyle": "glass",
    "recentCount": 3,
    "popularCount": 3,
    "popularAuto": true,
    "decorations": true,
    "autoTheme": {
      "enabled": true,
      "rules": [
        {
          "theme": "valentines",
          "type": "range",
          "from": "02-01",
          "to": "02-14",
          "on": true
        },
        {
          "theme": "easter",
          "type": "easter",
          "before": 9,
          "after": 1,
          "on": true
        },
        {
          "theme": "mothers",
          "type": "nthweekday",
          "month": 5,
          "n": 2,
          "weekday": 0,
          "before": 7,
          "after": 0,
          "on": true
        },
        {
          "theme": "fathers",
          "type": "nthweekday",
          "month": 6,
          "n": 3,
          "weekday": 0,
          "before": 7,
          "after": 0,
          "on": true
        },
        {
          "theme": "braai",
          "type": "range",
          "from": "09-17",
          "to": "09-24",
          "on": true
        },
        {
          "theme": "halloween",
          "type": "range",
          "from": "10-24",
          "to": "10-31",
          "on": true
        },
        {
          "theme": "christmas",
          "type": "range",
          "from": "12-01",
          "to": "12-26",
          "on": true
        },
        {
          "theme": "newyear",
          "type": "range",
          "from": "12-27",
          "to": "01-03",
          "on": true
        },
        {
          "theme": "womens",
          "type": "range",
          "from": "08-02",
          "to": "08-09",
          "on": true
        },
        {
          "theme": "blackfriday",
          "type": "nthweekday",
          "month": 11,
          "n": 4,
          "weekday": 4,
          "before": 1,
          "after": 4,
          "on": true
        },
        {
          "theme": "diwali",
          "type": "range",
          "from": "11-03",
          "to": "11-09",
          "on": false,
          "moving": true
        },
        {
          "theme": "eid",
          "type": "range",
          "from": "03-06",
          "to": "03-10",
          "on": false,
          "moving": true
        }
      ]
    },
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
    "_note": "Published site settings. The admin page (src/admin.html) can export a new copy of this file. faq: [{q,a,draft}] (draft:true shows a 'Draft answer' tag until Becca confirms it). reviews: [{name,text,rating(1-5, optional),date(optional)}], real reviews only; the section stays hidden while the list is empty. meet: {heading,text,draft} is the Home \"Meet Becca\" section (draft:true shows a 'Draft text' tag; editing the text in admin clears it). Each autoTheme rule may carry optional greeting / special text for that season (blank = built-in wording).",
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
    "reviews": [],
    "calendar": {
      "enabled": true,
      "draft": true,
      "cartDays": 3,
      "customDays": 7,
      "dailyLimit": 6,
      "closedDays": [],
      "blocked": []
    },
    "delivery": {
      "enabled": true,
      "draft": true,
      "areas": [
        {
          "name": "Close to the bakery",
          "fee": 50
        },
        {
          "name": "Further out",
          "fee": 90
        }
      ],
      "freeOver": 0,
      "collectionNote": "Collection is free. Becca shares the pick-up details when she confirms."
    },
    "priceGuide": {
      "enabled": true,
      "draft": true,
      "note": "This is a guide only. Becca confirms the final price in her quote (designs, extra decoration and delivery can change it).",
      "sizes": [
        {
          "name": "Small (15 cm round)",
          "serves": 10,
          "price": 350
        },
        {
          "name": "Medium (20 cm round)",
          "serves": 16,
          "price": 550
        },
        {
          "name": "Large (25 cm round)",
          "serves": 25,
          "price": 800
        }
      ],
      "flavours": [
        {
          "name": "Vanilla",
          "extra": 0
        },
        {
          "name": "Chocolate",
          "extra": 0
        },
        {
          "name": "Red velvet",
          "extra": 40
        },
        {
          "name": "Carrot",
          "extra": 30
        }
      ]
    },
    "payment": {
      "enabled": true,
      "draft": true,
      "intro": "Please pay only after Becca has confirmed your total on WhatsApp.",
      "note": "Use the reference below so Becca can find your payment, then send her the proof of payment on WhatsApp.",
      "bank": {
        "on": true,
        "bank": "",
        "holder": "",
        "number": "",
        "type": "",
        "branch": ""
      },
      "snapscan": {
        "on": false,
        "link": ""
      },
      "capitec": {
        "on": false,
        "cell": ""
      }
    }
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
        "visible": true,
        "added": "2026-08-01"
      },
      {
        "id": "p2",
        "name": "Red Velvet Cake",
        "category": "cakes",
        "description": "Cream cheese frosting, soft crumb.",
        "price": 420,
        "emoji": "🎂",
        "featured": false,
        "visible": true,
        "added": "2026-08-20",
        "popular": true
      },
      {
        "id": "p3",
        "name": "Carrot Cake",
        "category": "cakes",
        "description": "Spiced, moist, walnut crunch.",
        "price": 380,
        "emoji": "🥕",
        "featured": false,
        "visible": true,
        "added": "2026-09-10",
        "popular": true
      },
      {
        "id": "p4",
        "name": "Vanilla Cupcakes (6)",
        "category": "treats",
        "description": "Light sponge with buttercream swirls.",
        "price": 180,
        "emoji": "🧁",
        "featured": true,
        "visible": true,
        "added": "2026-09-25",
        "popular": true
      },
      {
        "id": "p5",
        "name": "Choc Chip Cookies (6)",
        "category": "treats",
        "description": "Crisp edges, gooey middles.",
        "price": 90,
        "emoji": "🍪",
        "featured": false,
        "visible": true,
        "added": "2026-10-12"
      },
      {
        "id": "p6",
        "name": "Cinnamon Rolls (4)",
        "category": "treats",
        "description": "Warm, sticky, cream cheese glaze.",
        "price": 120,
        "emoji": "🥐",
        "featured": false,
        "visible": true,
        "added": "2026-10-28"
      },
      {
        "id": "p7",
        "name": "Sourdough Loaf",
        "category": "bread",
        "description": "Crusty outside, soft inside.",
        "price": 65,
        "emoji": "🍞",
        "featured": true,
        "visible": true,
        "added": "2026-09-01"
      },
      {
        "id": "p8",
        "name": "Seed Loaf",
        "category": "bread",
        "description": "Hearty and full of seeds.",
        "price": 60,
        "emoji": "🌾",
        "featured": false,
        "visible": true,
        "added": "2026-11-03"
      }
    ]
  }
};
