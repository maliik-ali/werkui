# Recon map: template marketplaces (web) -> WerkUI

Scope: the storefront loop of three template shops (browse -> template detail -> preview -> buy or unlock all-access -> get the file), plus the "hire experts" services page. Clean-room: functionality and UX patterns only, no code, copy, images or brand of the originals.
For: WerkUI (werkui.com), Malik Ali's own store for Figma / Framer / Webflow UI kits and templates, later a multi-seller marketplace for design products (templates, courses, consultations, books).
Date: 2026-11-09

## Sources

| # | source | URL | notes |
| --- | --- | --- | --- |
| 1 | RedDevs home | https://reddevs.com/ | hero, process, filters (category / platform / color), services, comparison table, bundle offer, testimonials, FAQ, blog, newsletter |
| 2 | RedDevs catalog | https://reddevs.com/templates | 3 dropdown filters, "Load more", all cards free |
| 3 | RedDevs hire experts | https://reddevs.com/hire-experts | 3 plan cards (fixed price x2 + quote), benefit cards, book-a-call CTA |
| 4 | BRIX Templates home | https://brixtemplates.com/ | marquee hero, search + filter panel (category, color, type), price on card, Buy now + Preview on card, pagination, empty state with "submit your idea", agency cross-sell |
| 5 | Pentaclay home | https://pentaclay.com/ | per-platform grids, New/Trending tabs, free section, pricing toggle, testimonials, comparison, FAQ, quiz popup, sign in |
| 6 | Pentaclay pricing | https://pentaclay.com/pricing | 3 plans: one platform / other platform / all access, yearly vs lifetime toggle |
| 7 | Pentaclay template detail | https://pentaclay.com/framer/templates/sonicfast | breadcrumb, Preview + Buy, gallery, summary table, pages included, features, FAQ, all-access upsell, related |
| 8 | Malik's current store | https://malikali.webflow.io/resources | 9 resources, card = tag, name, blurb, two stats, price |
| 9 | Malik's current detail page | https://malikali.webflow.io/resources/shopzy | video, gallery, problem / solution / built-for, Preview in Figma, $29 |
| 10 | Malik's Figma Community profile | https://www.figma.com/@malik_ali | not machine-readable (robots); catalog must be confirmed by Malik |

Not read: any account area, checkout internals, JS bundles or network calls.

## Core loop

A visitor finds a template that fits their project, checks the live preview, pays once (or unlocks everything with a plan), and immediately gets the file link.

## Screens

| ID | screen | route | purpose | key components | states |
| --- | --- | --- | --- | --- | --- |
| S01 | Home | `/` | pitch + route into catalog | animated hero, platform tabs, template grids, how-it-works, pricing teaser, services teaser, testimonials, FAQ, newsletter | filled, mobile |
| S02 | Catalog | `/templates` | browse everything | search, filters (platform, category, price free/paid, type), sort, card grid, load more | filled, loading, empty ("no templates found" + request one), mobile filter drawer |
| S03 | Platform / category landing | `/templates?platform=framer`, `/figma`, `/framer`, `/webflow`, `/free` | SEO + shortcuts | same as S02 with preset filter | filled, empty |
| S04 | Template detail | `/templates/[slug]` | convince and sell | breadcrumb, title, price, Preview + Buy, gallery, summary table, pages/screens included, features, built-for, license, FAQ, all-access upsell, seller card, related | filled, free variant, owned variant, not found |
| S05 | Live preview frame | `/preview/[slug]` | see the template with a buy bar on top | top bar (back, device toggle, buy), iframe | loading, blocked-embed fallback (open in new tab) |
| S06 | Pricing | `/pricing` | sell all-access | billing toggle (yearly / lifetime), 3 plan cards, comparison, FAQ | filled |
| S07 | Hire experts | `/hire` | route service work | two paths (team -> Rayvens, senior designer -> Malik Ali), service plans, process, enquiry form | filled, form error, form sent |
| S08 | Checkout hand-off | Stripe hosted | pay | Stripe Checkout | success, cancelled |
| S09 | Order success | `/checkout/success` | deliver the file | access links per platform, receipt note, account prompt | paid, pending, invalid session |
| S10 | Sign in / sign up | `/sign-in` | account | email magic link, Google | default, sent, error |
| S11 | Library | `/account` | re-download purchases, plan status | purchased list, plan card, billing portal link | empty, filled, signed out |
| S12 | Seller profile | `/creators/[handle]` | future marketplace seam | avatar, bio, links, tabs (templates, courses, consultations, books) | filled, empty tab |
| S13 | Free resources | `/free` | lead magnet | grid, email gate optional | filled |
| S14 | Support / contact | `/support` | help | form, FAQ | default, sent, error |
| S15 | Legal | `/terms`, `/privacy`, `/license`, `/refunds` | trust | prose | filled |
| S16 | 404 | any | recover | links back | - |

## Flows

```
F01 Buy a single template
    S01 -> S02 -> S04 -> S08 -> S09
    happy path clicks: 4 (card, Buy, Pay, open file)
    edge: checkout cancelled, payment pending, already owned, link opened on another device

F02 Preview before buying
    S04 -> S05 -> S08
    edge: demo site refuses embedding -> open in new tab

F03 Get a free template
    S02 (filter free) -> S04 -> file link
    happy path clicks: 3
    edge: optional email capture

F04 Unlock all-access
    S06 -> S08 -> S09 -> S11
    edge: plan expired, switching yearly -> lifetime

F05 Re-download later
    S10 -> S11 -> file link
    edge: bought as guest with a different email

F06 Hire help
    S04 or S01 -> S07 -> form sent (or out to rayvens.com / malikali.de)

F07 Arrive from malikali.de or rayvens.com
    external card -> S04 (with ?ref=malikali|rayvens) -> F01
    edge: ref stored on the order for attribution

F08 Browse a seller (future)
    S04 seller card -> S12 -> S04
```

Number to beat: 4 clicks from home to file.

## Components

| component | variants | states | used on |
| --- | --- | --- | --- |
| Button | primary, secondary, ghost, link | default, hover, focus, disabled, loading | all |
| Template card | paid, free, new badge, owned | default, hover (preview peek), skeleton | S01-S04, S11-S13 |
| Platform badge | Figma, Framer, Webflow (+ WordPress, Bootstrap later) | - | cards, S04 |
| Price tag | paid, free, struck-through | - | cards, S04, S06 |
| Filter chips / select | single, multi | active, empty | S02 |
| Search input | - | empty, typing, no result | S02 |
| Tabs | platform, new/trending, profile tabs | active | S01, S12 |
| Plan card | standard, featured | - | S06, S01 |
| Billing toggle | yearly / lifetime | - | S06 |
| Gallery | grid + lightbox | - | S04 |
| Summary table | key/value | - | S04 |
| Accordion (FAQ) | - | open, closed | S01, S04, S06 |
| Comparison table | - | - | S01, S06 |
| Testimonial card | - | - | S01 |
| Seller card | compact, full | - | S04, S12 |
| Service path card | Rayvens (team), Malik Ali (senior designer) | - | S07, S01 |
| Form field | text, email, textarea, select | default, focus, error, disabled | S07, S10, S14 |
| Toast | success, error | - | forms |
| Nav | desktop, mobile sheet | scrolled | all |
| Footer | - | - | all |
| Animated background | hero, section accent | reduced-motion still | S01, S06 |

## Inferred data model

```
Profile     id, handle, display_name, bio, avatar_url, links, role (buyer | seller | admin)
            evidence: sign-in on source 5; seller profiles are a WerkUI requirement, not seen in the originals
            confidence: medium

Product     id, seller_id, slug, kind (template | ui_kit | course | consultation | book),
            name, tagline, description, category, price_cents, currency, is_free,
            status (draft | published), is_new, stats, features[], built_for[], pages[]
            evidence: cards and detail pages on sources 2, 4, 7, 9
            confidence: high

ProductVariant  product_id, platform (figma | framer | webflow | wordpress | bootstrap),
                preview_url, access_url (the clone / remix link, private)
            evidence: platform icons per card (source 5), Preview button targets (4, 7)
            confidence: high

ProductImage  product_id, url, alt, position            confidence: high
Category      slug, name                                  confidence: high
Plan          id, name, platforms[], interval (year | lifetime), price_cents, stripe_price_id
            evidence: source 6                            confidence: high
Order         id, user_id?, email, product_id | plan_id, amount, status, stripe_session_id, ref
            evidence: hosted checkout hand-off (4, 6, 7)  confidence: medium (their internals unseen)
Entitlement   user_id | email, product_id | plan_id, expires_at
            confidence: guess, needed for "library" and all-access
ServiceLead   name, email, path (rayvens | malikali), budget, message   confidence: high (S07)
Subscriber    email                                       confidence: high
```

Relationships: Profile 1-n Product, Product 1-n ProductVariant, Product 1-n ProductImage, Category 1-n Product, Order n-1 Product or Plan, Entitlement n-1 Profile.

## Feature matrix

See `features.csv`.

## Out of scope (cannot or should not be cloned)

- The originals' templates, thumbnails, copy, testimonials, client counts and awards.
- Their brand: names, logos, colours, illustrations.
- Webflow / Framer marketplace partner listings and "official partner" status.
- motionsites.ai background videos: a paid library with its own licence. WerkUI gets original code-drawn animated backgrounds in that spirit; licensed clips can be dropped in later by Malik.
- Open multi-seller onboarding, payouts (Stripe Connect), reviews: designed for in the schema, not built in v1.

## Size

Screens 16, flows 8, entities 10. Hard parts: payments + automatic delivery of private file links, entitlements for all-access, embeddable live preview. Size: M.
