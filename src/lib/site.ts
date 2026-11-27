export const site = {
  name: "WerkUI",
  tagline: "Landing page components for SaaS and agency sites",
  description:
    "Copy-paste React components and templates for SaaS and agency landing pages. Built with Tailwind CSS and Motion, installed with the shadcn CLI.",
  url: "https://www.werkui.com",
  github: "https://github.com/maliik-ali/werkui",
  githubRepo: "maliik-ali/werkui",
};

export const installCommand = (slug: string) =>
  `npx shadcn@latest add ${site.url}/r/${slug}.json`;
