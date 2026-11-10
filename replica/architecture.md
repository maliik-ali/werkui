# Architecture: WerkUI

Reads `recon.md` and `features.csv`. Decisions from Malik (2026-11-09): new Supabase project, Stripe payment links at launch, catalog = the 9 resources from malikali.webflow.io, dark / glowing / motion-heavy look.

## Stack

| layer | choice | why |
| --- | --- | --- |
| web app | Next.js (App Router) + TypeScript | Vercel-native, server-rendered catalog pages for SEO, one codebase for site and API |
| styling | Tailwind CSS v4, tokens as CSS variables in `src/styles/tokens.css` | same token names as the Figma variables, so Figma -> code stays one-to-one |
| motion | CSS + one canvas component, `motion` for scroll reveals | original animated backgrounds, no licensed video; respects reduced motion |
| database | Postgres on Supabase, project "content" (shared with malik-ali.com), all WerkUI tables prefixed `wk_` | Malik already uses it; auth and storage are there when phase 2 needs them |
| data access | `@supabase/supabase-js` with the publishable key, server-side, cached (ISR 5 min) | catalog is public read; RLS does the gatekeeping |
| payments | Stripe payment links stored per product / plan | Malik's choice; no API keys in the app; Stripe's confirmation page hands over the file URL |
| email | none in v1 (Stripe sends receipts) | Resend in phase 2 |
| files | thumbnails in `public/` or Supabase Storage URLs | template files stay on Figma / Framer / Webflow |
| hosting | Vercel project `werkui`, repo `maliik-ali/werkui`, domain werkui.com | given |

One database, no microservices. The repo carries a seed copy of the catalog (`src/data/seed.ts`), used when Supabase env vars are missing, so previews and local builds never break.

## Schema

`replica/schema.sql`, applied as the first migration. 11 tables:

sellers, categories, products, product_variants, product_images, plans, service_leads, subscribers, checkout_clicks, and (phase 2, empty for now) orders, entitlements.

Access rules: row level security on every table. Anon reads published catalog rows only; anon may insert leads, subscribers and checkout clicks (length-checked); nothing else is writable from the site. Paid file links are never stored in a publicly readable column: for paid products Stripe delivers the file, for free products `free_access_url` is public on purpose.

## Routes

| method | path | what it does | who | flow |
| --- | --- | --- | --- | --- |
| GET | `/` | home | all | F01 |
| GET | `/templates` (`?platform=&category=&price=&q=&sort=`) | catalog, filters in the URL | all | F01, F03 |
| GET | `/templates/[slug]` | detail | all | F01, F02 |
| GET | `/preview/[slug]` | preview frame with buy bar | all | F02 |
| GET | `/go/[slug]` (`?plan=&billing=`) | logs the click with `ref`, redirects to the Stripe payment link, or to `/support` when no link is set yet | all | F01, F04, F07 |
| GET | `/pricing` | plans, yearly / lifetime toggle | all | F04 |
| GET | `/hire` | Rayvens vs Malik Ali paths, enquiry form | all | F06 |
| action | `submitLead` | validates, inserts `service_leads` | all | F06 |
| action | `subscribe` | inserts `subscribers` | all | - |
| GET | `/creators/[handle]` | seller profile with product-kind tabs | all | F08 |
| GET | `/free` | free products | all | F03 |
| GET | `/support`, `/license`, `/terms`, `/privacy`, `/refunds` | help and legal | all | - |
| GET | `/api/products` | public JSON feed (CORS open, read-only) so malikali.de and rayvens.com can list the same resources and link back with `?ref=` | all | F07 |
| GET | `/sitemap.xml`, `/robots.txt`, OG image | SEO | all | - |

`ref` handling: `?ref=malikali` or `?ref=rayvens` on any page is kept in a first-party cookie for 30 days and written to `checkout_clicks`.

Webhooks and jobs: none in v1. Phase 2 adds `POST /api/stripe/webhook` (idempotent on `orders.stripe_session_id`), sign-in, and `/account`.

## The parts that bite

- **No purchase record in v1.** With payment links and no API keys the site cannot know who paid. So no library and no sign-in at launch; Stripe's confirmation page and receipt carry the file link. The orders / entitlements tables are ready for when keys are added.
- **Leaked file links.** A Figma duplicate link can be shared by a buyer. Same as today; watermarking or per-buyer invites is a later decision.
- **Spam on the open insert tables.** Length checks in SQL, honeypot + server-side validation in the actions, unique email on subscribers.
- **Preview embedding.** Figma Community and some demo sites refuse iframes; the preview frame falls back to "open in new tab".
- **Missing payment links.** Until Malik pastes a link, `/go` sends buyers to `/support` with the product prefilled instead of a dead end.
- **GDPR.** Leads and subscribers hold personal data in the EU region; privacy page says so; deletion is a row delete.
- **Motion.** Canvas background is paused off-screen and replaced by a still gradient under `prefers-reduced-motion`.

## Build order

1. **Vertical slice:** S02 catalog -> S04 detail -> `/go` -> Stripe. Tables: sellers, categories, products, product_variants.
2. **Must-haves:** S01 home, S06 pricing, S07 hire + lead form, S15 legal, S16 404, SEO, responsive, a11y.
3. **Should-haves:** S05 preview frame, S12 seller profile, S13 free, S14 support, newsletter, ref attribution, JSON feed, search / sort.
4. **Phase 2 (needs Stripe keys):** S08-S11 checkout API, webhook, accounts, library; then seller onboarding with Stripe Connect; courses / consultations / books.
