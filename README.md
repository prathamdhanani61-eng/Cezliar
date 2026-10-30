# CEZLIAR

The CEZLIAR website — alcohol-free attars, solid perfumes, dhoop and home & water care. Built with the Next.js App Router and Tailwind CSS, with GSAP + Lenis smooth scrolling and Motion animations.

There is no checkout. Customers order four ways:

- **Amazon** and **Flipkart** — every product links to its listing.
- **WhatsApp** — every product has an "Order on WhatsApp" button with a pre-filled message, sent to **+91 98798 25994**.
- **Instagram** — "Order on Instagram" copies the same order message and opens a DM to @cezliar, so the customer only has to paste it.

Gift orders (the gift finder, including its custom budget, and "Sending this as a gift?" on product pages) can go to either WhatsApp or Instagram.

## Messages by email

Newsletter sign-ups from the footer are emailed to **cezliarenterprise61@gmail.com** through [FormSubmit](https://formsubmit.co) — no account or server needed. The first time someone submits the form on the live site, FormSubmit sends an **Activate Form** email to that inbox: click it once and every sign-up after that arrives as an email. If a message can't be sent, the visitor is offered a link that opens their own email app addressed to the same inbox. The footer and category pages also link straight to that email address.

To use a different inbox, set `NEXT_PUBLIC_CONTACT_EMAIL`. To use another form service (Formspree, Getform, …), set `NEXT_PUBLIC_FORM_ENDPOINT` to its JSON endpoint.

The old `/contact` page has been removed; `/contact` permanently redirects to the homepage (see `next.config.mjs`).

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the site.

## Production

```bash
npm run build
npm run start
```

`npm run dev` and `npm run build` first run `scripts/optimize-images.mjs`, which writes web-sized WebP copies of every product photo to `public/images/optimized/` (not committed). New photos are picked up automatically; if the script can't run, the site uses the original photos.

## Editing content

| What | Where |
| --- | --- |
| Products (names, prices, photos, marketplace links, FAQs) | `src/data/products.json` |
| Collection pages (titles, descriptions, banner art) | `src/data/categories.js` |
| Homepage (hero slides, featured and bestseller picks, reviews shown) | `src/data/home.js` |
| Customer reviews | `src/data/testimonials.json` |
| Gift finder (moods and the products each one suggests) | `src/data/giftFinder.js` |
| Menu links | `src/data/site.js` |

Product fields used by the design:

- `shortName` — the name shown on cards and as the product page heading.
- `tagline` — the small line under the name, e.g. `Attar · 6 ml roll-on`.
- `notes` (optional) — scent notes, e.g. `Warm · Woody · Classic`.
- `moodImage` (optional) — a lifestyle photo; when every product in a collection has one, the collection page shows large photo cards.

A product whose photo file is missing shows a "Photo coming soon" tile. A marketplace link that is empty or a placeholder (such as `https://www.amazon.in/cezliar`) falls back to a CEZLIAR search on that marketplace — replace it with the real listing URL when you have it.

Optimised banner and lifestyle images live in `public/images/site/`.

## Settings

Copy `.env.example` to `.env.local` (or set these in your hosting dashboard). Anything left empty uses the default below.

| Variable | Used for |
| --- | --- |
| `SITE_URL` | Canonical domain for metadata, structured data, robots and the sitemap. Defaults to `https://www.cezliar.in`. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Number that receives WhatsApp orders and gift orders. Digits only, with country code. Defaults to `919879825994`. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Inbox that receives newsletter sign-ups and "email us" messages. Defaults to `cezliarenterprise61@gmail.com`. |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Optional form-to-email endpoint. Defaults to FormSubmit for the email above. |
| `NEXT_PUBLIC_AMAZON_STORE_URL` | "CEZLIAR on Amazon" links. Defaults to an Amazon search for CEZLIAR. |
| `NEXT_PUBLIC_FLIPKART_STORE_URL` | "CEZLIAR on Flipkart" links. Defaults to a Flipkart search for CEZLIAR. |

The wishlist is stored in each visitor's browser (no accounts needed).

## Animations

- **Smooth scrolling** uses [Lenis](https://github.com/darkroomengineering/lenis) driven by GSAP's ticker, loaded after the page is idle (`src/components/motion/SmoothScroll.jsx`).
- **Scroll effects** use GSAP ScrollTrigger. Add `data-reveal` to fade an element in, `data-reveal-stagger` to reveal its children one by one, or `data-parallax="6"` to an image for a gentle parallax.
- **Interface motion** (hero slides, product filtering, menus, FAQs, gallery) uses [Motion](https://motion.dev).
- Visitors who turn on "reduce motion" get a still page: smooth scrolling and reveals are off, and Motion skips movement.

The homepage hero changes collection every 6.5 seconds (`HERO_ROTATE_MS` in `src/data/home.js`) and shows every product as thumbnails. It has a pause button and pauses while the browser tab is hidden.
