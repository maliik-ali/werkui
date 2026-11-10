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
| Database | Supabase project "content" (shared with malik-ali.com). WerkUI tables are all prefixed `wk_`; schema in `replica/schema.sql` |
| Recon, architecture, feature matrix | `replica/` |
| Checkout hand-off | `src/app/go/[slug]/route.ts` (redirects to the Stripe payment link stored on the product or plan) |
| Partner feed for malikali.de / rayvens.com | `GET /api/products` (link back with `?ref=malikali` or `?ref=rayvens`) |

## UI components

Built on shadcn/ui (new-york style, Radix). Source lives in `src/components/ui/` and is themed through the WerkUI tokens in `src/app/globals.css` (`--color-primary` = ink, `--color-secondary` = accent blue, and so on). The shadcn registry is configured in `components.json`, so `npx shadcn@latest add <component>` works for new ones.

## Adding a product

Add an entry to `src/data/seed.ts` (or, now that Supabase is connected, a row in `wk_products` + `wk_product_variants` in the Supabase table editor; the site picks it up within a few minutes): name, price in cents (`0` = free, `null` = coming soon), `paymentUrl` (Stripe payment link), `previewUrl`, and for free products `freeAccessUrl`.

## Adding a page from Figma

Design it in the WerkUI Figma file using the `color/*`, `radius/*` and `space/*` variables. They share names with the CSS variables in `src/styles/tokens.css`, so generated code maps straight onto the existing utilities (`bg-surface`, `text-muted`, `border-line`, `bg-accent`).
