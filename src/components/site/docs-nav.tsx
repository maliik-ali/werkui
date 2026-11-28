"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type DocsNavSection = {
  title: string;
  items: { title: string; href: string; isNew?: boolean }[];
};

export function DocsNav({ sections }: { sections: DocsNavSection[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6 text-sm">
      {sections.map((section) => (
        <div key={section.title}>
          <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">{section.title}</p>
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
                      active ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.title}
                    {item.isNew && (
                      <span className="text-[11px] font-medium text-primary">New</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
