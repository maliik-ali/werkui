import Link from "next/link";
import { Menu } from "lucide-react";
import { Button as UiButton } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ButtonLink } from "./Button";
import { Logo } from "./Logo";

const links = [
  { href: "/templates", label: "Templates" },
  { href: "/free", label: "Free" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-on-ink">
        Skip to content
      </a>
      <div className="container-x flex h-[68px] items-center justify-between gap-6">
        <Link href="/" aria-label="WerkUI home" className="rounded-lg">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-4 py-2 text-sm text-fg transition-colors hover:bg-raised">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <ButtonLink href="/hire" size="sm">
            Hire experts
          </ButtonLink>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <UiButton variant="outline" size="icon" aria-label="Open menu" className="md:hidden">
              <Menu aria-hidden="true" />
            </UiButton>
          </SheetTrigger>
          <SheetContent side="right" className="gap-2 p-6">
            <SheetHeader className="p-0">
              <SheetTitle className="text-left text-sm font-medium text-muted-foreground">Menu</SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {[...links, { href: "/hire", label: "Hire experts" }].map((l) => (
                <SheetClose asChild key={l.href}>
                  <Link href={l.href} className="rounded-md px-3 py-3 text-lg hover:bg-muted">
                    {l.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <SheetClose asChild>
              <ButtonLink href="/templates" className="mt-4">
                Browse templates
              </ButtonLink>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
