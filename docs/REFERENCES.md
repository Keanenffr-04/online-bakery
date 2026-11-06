# Reference Repos
Status: **PARTLY REVIEWED in v2** (surface review from search/GitHub pages only; no cloning, no internet in the build sandbox). Do not copy code without checking licences.

## Provided by the owner
| Repo | Licence | Stack | Good | Avoid / not for us | Ideas |
|---|---|---|---|---|---|
| keaganfrr-03/online_bakery_marketplace_v1 | none visible on the repo page | Django + MySQL, Stripe, Swagger API | Vendor/customer roles, seeded demo data, product media folder | Far too heavy for our static, WhatsApp-first site | Product fields (name, price, image), category structure |
| keaganfrr-03/online_bakery_marketplace_v2 | **NOT REVIEWED** (page could not be fetched) | unknown | n/a | n/a | Review in a later version when internet access is available |

## Found in v2 (all unverified licences: check before reusing anything)
| Repo / source | Stack | Good | Avoid | Ideas to steal (ideas only, not code) |
|---|---|---|---|---|
| andile593/59-cafe | React + Firebase | Product list/detail, cart, checkout flow | Needs accounts + backend; overkill | Cart UX for the "Simple cart via WhatsApp" idea |
| Devleena2003/E-Bakery-Website | Unknown (page content thin) | Simple bakery storefront | Unclear quality | Section layout reference |
| prasantmahato/Creamycreations | Unknown; has a LICENSE file (type not confirmed) | Simple online bakery shop | Unclear | Home page structure |
| KrithikaPoojary/Bakery-Hub | Marketplace w/ OTP email (Brevo SMTP) | Order tracking concept | Accounts/OTP not needed | Order status wording |
| Framer "Bakeri" template (design only, not a repo) | Framer | Menu showcase, signature collections, testimonials, FAQ | Paid/proprietary: look, don't copy | Home sections: featured items, testimonials, FAQ |
| Contra case study "Online Platform for Small Bakeries" (design only) | n/a | Users want customisation + an in-store feel | n/a | Supports our Custom Orders page and WhatsApp-first approach |

## Takeaways
1. Most bakery repos are full e-commerce (accounts, payments, databases). Our plain static + WhatsApp approach is deliberately lighter; keep it.
2. Recurring good ideas: category sections, featured items, testimonials, FAQ, customisation for cakes. All already on the roadmap or Ideas Parking Lot.
3. No code was copied from anywhere.

## Still to do
- Review `online_bakery_marketplace_v2` (needs fetch access).
- Verify licences of the repos above before borrowing anything.
