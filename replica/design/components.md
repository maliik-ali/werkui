# WerkUI components

Tokens: `tokens.json` (contrast: 21 pairs, 0 AA failures). Icons: Lucide (ISC). Font: Geist (OFL). All copy and artwork original.

```
Button            src/components/Button.tsx
  variants  primary (accent), secondary (surface + border), ghost
  sizes     sm 36px, md 44px, lg 52px
  states    default, hover (lift + glow), active (scale .98), focus-visible (2px accent ring), disabled, loading (label changes, stays readable)
  a11y      real <button>/<a>; external links get rel=noopener

TemplateCard      TemplateCard.tsx
  variants  paid, free (green price), coming soon, new badge
  states    default, hover (lift, pointer-follow border glow, cover peek), focus (whole card ring via stretched link)
  a11y      one link per card, heading is the link text

Cover             Cover.tsx      code-drawn placeholder (dashboard | landing | doc | mobile) tinted by coverHue; replaced by coverUrl
PlatformBadge     figma, framer, webflow, wordpress, bootstrap, mui; text label always present (colour dot is decorative)
CatalogBrowser    search, sort, platform / category / price chips (aria-pressed), result count (aria-live), empty state with request link; state lives in the URL
PlanCards         yearly / lifetime radiogroup; featured card; "Early access" when no price is set
Faq               native <details>, 64px rows
LeadForm          labelled fields, radio path picker, inline status (aria-live), honeypot, server-side validation, success state
NewsletterForm    labelled email + button, inline status
Nav               sticky, blur; desktop links; mobile <details> sheet; skip link
Footer            3 link columns + newsletter
Backdrop          aurora blobs + moving perspective grid + grain, CSS only; frozen under prefers-reduced-motion
PageHero          eyebrow, h1, lead over Backdrop
SectionHead       eyebrow, h2, lead, optional action
Reveal            `.reveal` class, IntersectionObserver in Effects.tsx; visible without JS
```

Breakpoints: 640 / 768 / 1024 / 1280. Container 1200px. Touch targets 44px+.
