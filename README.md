# CEZLIAR

The CEZLIAR website — alcohol-free attars, solid perfumes, dhoop and home & water care. Built with the Next.js App Router and Tailwind CSS, with GSAP + Lenis smooth scrolling and Motion animations.

There is no checkout. Customers order four ways:

- **Amazon** and **Flipkart** — every product links to its listing.
- **WhatsApp** — every product has an "Order on WhatsApp" button with a pre-filled message. All gift orders (gift finder and "Sending this as a gift?") go to WhatsApp **+91 98798 25994**.
- **Instagram** — "Order on Instagram" opens a DM to @cezliar.

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

Copy `.env.example` to `.env.local` (or set these in your hosting dashboard). Anything left empty is hidden on the site.

| Variable | Used for |
| --- | --- |
| `SITE_URL` | Canonical domain for metadata, structured data, robots and the sitemap. Defaults to `https://www.cezliar.in`. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Number that receives WhatsApp orders, gift orders and contact-form messages. Digits only, with country code. Defaults to `919879825994`. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Shown on the contact page when set. |
| `NEXT_PUBLIC_CONTACT_PHONE` | Extra phone number for the contact page, if different from WhatsApp. |
| `NEXT_PUBLIC_CONTACT_HOURS` | Shown on the contact page, e.g. `Mon–Sat, 10 am – 7 pm IST`. |
| `NEXT_PUBLIC_CONTACT_ADDRESS` | Shown on the contact page. Defaults to `Surat, Gujarat, India`. |
| `NEXT_PUBLIC_AMAZON_STORE_URL` | "CEZLIAR on Amazon" links. Defaults to an Amazon search for CEZLIAR. |
| `NEXT_PUBLIC_FLIPKART_STORE_URL` | "CEZLIAR on Flipkart" links. Defaults to a Flipkart search for CEZLIAR. |
| `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION` | Form URL from your email provider (Mailchimp, FormSubmit, …). When set, the footer shows an email sign-up form; otherwise it shows Instagram and WhatsApp buttons. |

The wishlist is stored in each visitor's browser (no accounts needed).

## Animations

- **Smooth scrolling** uses [Lenis](https://github.com/darkroomengineering/lenis) driven by GSAP's ticker, loaded after the page is idle (`src/components/motion/SmoothScroll.jsx`).
- **Scroll effects** use GSAP ScrollTrigger. Add `data-reveal` to fade an element in, `data-reveal-stagger` to reveal its children one by one, or `data-parallax="6"` to an image for a gentle parallax.
- **Interface motion** (hero slides, product filtering, menus, FAQs, gallery) uses [Motion](https://motion.dev).
- Visitors who turn on "reduce motion" get a still page: smooth scrolling and reveals are off, and Motion skips movement.

The homepage hero changes collection every 6.5 seconds (`HERO_ROTATE_MS` in `src/data/home.js`) and shows every product as thumbnails. It has a pause button and pauses while the browser tab is hidden.
