# WerkUI

Marketplace for UI kits and templates (Figma, Framer, Webflow). Next.js App Router + Tailwind v4, deployed on Vercel at werkui.com.

## Run

```bash
npm install
npm run dev
```

## Where things are

| what | where |
| --- | --- |
| Design tokens (source of truth) | `replica/design/tokens.json` -> `src/styles/tokens.css` -> Figma variables in the WerkUI file |
| Catalog (until Supabase is connected) | `src/data/seed.ts` |
| Database schema | `replica/schema.sql` |
| Recon, architecture, feature matrix | `replica/` |
| Checkout hand-off | `src/app/go/[slug]/route.ts` (redirects to the Stripe payment link stored on the product or plan) |
| Partner feed for malikali.de / rayvens.com | `GET /api/products` (link back with `?ref=malikali` or `?ref=rayvens`) |

## Adding a product

Add an entry to `src/data/seed.ts` (or a row in `products` + `product_variants` once Supabase is connected): name, price in cents (`0` = free, `null` = coming soon), `paymentUrl` (Stripe payment link), `previewUrl`, and for free products `freeAccessUrl`.

## Adding a page from Figma

Design it in the WerkUI Figma file using the `color/*`, `radius/*` and `space/*` variables. They share names with the CSS variables in `src/styles/tokens.css`, so generated code maps straight onto the existing utilities (`bg-surface`, `text-muted`, `border-line`, `bg-accent`).
