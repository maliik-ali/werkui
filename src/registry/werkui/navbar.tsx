"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarProps extends Omit<React.ComponentProps<"header">, "children"> {
  /** Logo or brand, usually a link to the home page. */
  logo: React.ReactNode;
  links: NavbarLink[];
  /** Buttons shown on the right, e.g. "Sign in" and a call to action. */
  actions?: React.ReactNode;
}

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function Navbar({ logo, links, actions, className, onKeyDown, ...props }: NavbarProps) {
  // True once the page has scrolled, so the bar can gain a blurred background.
  const scrolled = React.useSyncExternalStore(
    subscribe,
    () => window.scrollY > 8,
    () => false,
  );
  const [open, setOpen] = React.useState(false);
  const menuId = React.useId();

  return (
    <header
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
        onKeyDown?.(e);
      }}
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors",
        scrolled || open ? "border-border bg-background/80 backdrop-blur" : "border-transparent",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-6">
        <div className="shrink-0">{logo}</div>
        <nav aria-label="Main" className="hidden items-center gap-6 text-sm md:flex">
          {links.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        {actions && <div className="ml-auto hidden items-center gap-2 md:flex">{actions}</div>}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      <div id={menuId} hidden={!open} className="border-t px-6 pb-4 pt-2 md:hidden">
        <nav aria-label="Mobile" className="flex flex-col">
          {links.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        {actions && <div className="mt-3 flex flex-col gap-2 [&>*]:w-full">{actions}</div>}
      </div>
    </header>
  );
}
