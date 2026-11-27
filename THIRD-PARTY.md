# Third-party software

WerkUI is MIT-licensed. It is built on the open-source projects below. Versions are the ones installed when this file was written; `package-lock.json` is the source of truth.

## What a WerkUI component adds to your project

Components are copied into your code with the shadcn CLI. They depend on very little:

| Needed by | What | License |
|---|---|---|
| Every component | `react`, Tailwind CSS v4 | MIT |
| Every component | `cn()` from `@/lib/utils` (created by `shadcn init`) | MIT |
| Bento Grid, Announcement Banner | `lucide-react` icons | ISC |
| Hero Section | `motion` | MIT |

The CSS animations (shimmer, marquee, gradient) are plain keyframes shipped inside each registry item. There is no WerkUI runtime package to install.

## Dependencies of this repository (docs site and tooling)

| Package | Version | License | Used for |
|---|---|---|---|
| next | 16.4.6 | MIT | Website framework |
| react, react-dom | 19.3.0 | MIT | UI library |
| tailwindcss, @tailwindcss/turbopack | 4.3.3 | MIT | Styling |
| motion | 14.14.0 | MIT | Animation |
| shadcn | 4.23.1 | MIT | Registry build CLI (`shadcn build`) |
| cn | 0.5.2 | MIT | Class-name merging (shadcn's `cn` package) |
| @base-ui/react | 1.9.0 | MIT | Unstyled primitives behind shadcn's Tabs |
| class-variance-authority | 0.7.1 | Apache-2.0 | Component variants |
| lucide-react | 1.82.0 | ISC | Icons |
| next-themes | 0.4.6 | MIT | Light and dark theme switching |
| shiki | 4.6.0 | MIT | Syntax highlighting on docs pages |
| tw-animate-css | 1.4.0 | MIT | Animation utilities used by shadcn styles |
| typescript | 5.9.3 | Apache-2.0 | Type checking |
| eslint, eslint-config-next | 9.39.5, 16.4.6 | MIT | Linting |

Fonts: Geist and Geist Mono (SIL Open Font License 1.1), loaded through `next/font`.

## Independence

WerkUI is an independent project. It is not affiliated with or endorsed by shadcn/ui, Vercel, Tailwind Labs, Motion or Magic UI. "Works with the shadcn CLI" describes compatibility only.

## Checking licenses yourself

```bash
npx license-checker --production --summary
```
