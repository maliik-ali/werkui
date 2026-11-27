import Link from "next/link";
import { cacheLife } from "next/cache";
import { Star } from "lucide-react";
import { components } from "@/lib/components-registry";
import { site } from "@/lib/site";
import { SearchDialog } from "./search-dialog";
import { ThemeToggle } from "./theme-toggle";

async function getStars(): Promise<number | null> {
  "use cache";
  cacheLife("hours");
  try {
    const res = await fetch(`https://api.github.com/repos/${site.githubRepo}`);
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

const nav = [
  { href: "/docs/components", label: "Components", className: "hidden sm:block" },
  { href: "/docs", label: "Docs", className: "" },
];

const searchItems = [
  { title: "Introduction", description: "What WerkUI is and how to use it", href: "/docs" },
  { title: "Installation", description: "Set up WerkUI in your project", href: "/docs/installation" },
  ...components.map((c) => ({ title: c.title, description: c.description, href: `/docs/components/${c.slug}` })),
];

export async function SiteHeader() {
  const stars = await getStars();
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:gap-6 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">W</span>
          WerkUI
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground sm:gap-5">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={`transition-colors hover:text-foreground ${n.className}`}>
              {n.label}
            </Link>
          ))}
          <span className="hidden items-center gap-1.5 sm:flex" title="Coming soon">
            Templates
            <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground">Soon</span>
          </span>
        </nav>
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <SearchDialog items={searchItems} />
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="flex h-9 items-center gap-1.5 rounded-full border px-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:px-3"
          >
            <Star className="size-3.5" />
            <span className="hidden sm:inline">{stars === null ? "GitHub" : stars.toLocaleString()}</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
