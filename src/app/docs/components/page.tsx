import type { Metadata } from "next";
import Link from "next/link";
import { components } from "@/lib/components-registry";

export const metadata: Metadata = {
  title: "Components",
  description: "Every WerkUI component for SaaS and agency landing pages.",
};

export default function ComponentsIndexPage() {
  const sorted = [...components].sort((a, b) => a.title.localeCompare(b.title));
  return (
    <div className="py-10">
      <p className="text-sm text-muted-foreground">Docs / Components</p>
      <h1 className="mt-2 text-4xl font-medium tracking-tight">Components</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Here you can find all the components available in the library. Each one is free, copy-paste and yours to edit.
      </p>
      <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
        {sorted.map((c) => (
          <li key={c.slug}>
            <Link href={`/docs/components/${c.slug}`} className="group block">
              <span className="flex items-center gap-2 text-lg font-medium transition-colors group-hover:text-primary">
                {c.title}
                {c.isNew && <span className="text-[11px] font-medium text-primary">New</span>}
              </span>
              <span className="mt-0.5 line-clamp-2 block text-sm text-muted-foreground">{c.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
