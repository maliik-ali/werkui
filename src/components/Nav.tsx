import Link from "next/link";
import { Menu } from "lucide-react";
import { ButtonLink } from "./Button";
import { Logo } from "./Logo";

const links = [
  { href: "/templates", label: "Templates" },
  { href: "/free", label: "Free" },
  { href: "/pricing", label: "Pricing" },
  { href: "/hire", label: "Hire experts" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/70 backdrop-blur-xl">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent">
        Skip to content
      </a>
      <div className="container-x flex h-[68px] items-center justify-between gap-6">
        <Link href="/" aria-label="WerkUI home" className="rounded-lg">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:bg-raised hover:text-fg">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <ButtonLink href="/templates" size="sm">
            Browse templates
          </ButtonLink>
        </div>
        <details className="group relative md:hidden">
          <summary aria-label="Open menu" className="grid size-11 place-items-center rounded-full border border-line text-fg">
            <Menu size={20} aria-hidden="true" />
          </summary>
          <nav aria-label="Mobile" className="card absolute right-0 top-14 flex w-64 flex-col gap-1 p-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-xl px-4 py-3 text-base text-fg hover:bg-raised">
                {l.label}
              </Link>
            ))}
            <ButtonLink href="/templates" className="mt-2">
              Browse templates
            </ButtonLink>
          </nav>
        </details>
      </div>
    </header>
  );
}
