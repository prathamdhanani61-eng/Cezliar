# CEZLIAR

The CEZLIAR website — alcohol-free attars, solid perfumes, dhoop and home & water care. Built with the Next.js App Router and Tailwind CSS. There is no checkout: every product links out to Amazon and Flipkart.

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
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp chat links, the contact form and the gift finder. Digits only, with country code, e.g. `919876543210`. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Shown on the contact page; the contact form opens an email when no WhatsApp number is set. |
| `NEXT_PUBLIC_CONTACT_PHONE` | Shown on the contact page. |
| `NEXT_PUBLIC_CONTACT_HOURS` | Shown on the contact page, e.g. `Mon–Sat, 10 am – 7 pm IST`. |
| `NEXT_PUBLIC_CONTACT_ADDRESS` | Shown on the contact page. Defaults to `Surat, Gujarat, India`. |
| `NEXT_PUBLIC_AMAZON_STORE_URL` | "CEZLIAR on Amazon" links. Defaults to an Amazon search for CEZLIAR. |
| `NEXT_PUBLIC_FLIPKART_STORE_URL` | "CEZLIAR on Flipkart" links. Defaults to a Flipkart search for CEZLIAR. |
| `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION` | Form URL from your email provider (Mailchimp, FormSubmit, …). When set, the footer shows an email sign-up form; otherwise it shows a "Follow on Instagram" button. |

The wishlist is stored in each visitor's browser (no accounts needed).
