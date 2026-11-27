# WerkUI

Copy-paste React components for SaaS and agency landing pages. Built with Tailwind CSS v4, Motion and shadcn/ui. Free and open source (MIT).

Website: https://www.werkui.com

## Use a component

WerkUI is distributed through the shadcn registry. In a project that already uses shadcn/ui:

```bash
npx shadcn@latest add https://www.werkui.com/r/shimmer-button.json
```

The source is copied into your project, so you own it and can edit anything.

## Components

| Component | Slug |
|---|---|
| Navbar | `navbar` |
| Pricing Cards | `pricing-cards` |
| Testimonials Marquee | `testimonials-marquee` |
| Hero Section | `hero-section` |
| Bento Grid | `bento-grid` |
| Marquee | `marquee` |
| Shimmer Button | `shimmer-button` |
| Announcement Banner | `announcement-banner` |
| Gradient Text | `gradient-text` |

## Develop this repo

```bash
npm install
npm run dev          # docs site at http://localhost:3000
npm run registry:build   # regenerates public/r/*.json from registry.json
npm run lint && npm run typecheck && npm run build   # what CI runs
```

### How it fits together

- `src/registry/werkui/` holds each component, with a demo in `examples/`.
- `registry.json` lists the installable items. Run `npm run registry:build` after changing a component or its entry.
- `src/lib/components-registry.ts` drives the docs pages (title, props, demo).
- `src/app/` is the website: landing page and a docs area (`/docs`, `/docs/installation`, `/docs/components`, `/docs/components/[slug]`).

### Add a component

1. Create `src/registry/werkui/<name>.tsx` and `examples/<name>-demo.tsx`.
2. Add an entry to `registry.json` (include `dependencies` and any `css` keyframes).
3. Add it to `src/lib/components-registry.ts`.
4. Run `npm run registry:build`, `npm run lint` and `npm run build`.

## Dependencies and licenses

WerkUI is MIT. It builds on open-source projects, and the goal is to stay easy to move off any one of them.

- **Users get very little.** A component needs React, Tailwind v4, the `cn()` helper that `shadcn init` creates, and sometimes `lucide-react` or `motion`. There is no WerkUI runtime package.
- **The registry is ours.** The JSON files are hosted at `werkui.com/r/`, not on shadcn's servers. Every component can also be installed by copying its file from this repo.
- **Versions are pinned.** `package-lock.json` is committed, and Dependabot opens a weekly pull request that must pass CI before an upgrade lands.
- **Keep it small.** Adding a dependency to a component needs a reason. Prefer plain CSS and the tokens in `globals.css`.

The full list with versions and licenses is in [THIRD-PARTY.md](./THIRD-PARTY.md). WerkUI is not affiliated with shadcn/ui, Vercel, Tailwind Labs or Magic UI.

## Continuous integration

`.github/workflows/ci.yml` runs on every push to `main` and every pull request: lint, type check, a check that `public/r` is up to date with `registry.json`, and a production build.

## License

MIT. See [LICENSE](./LICENSE).
