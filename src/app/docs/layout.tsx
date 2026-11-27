import { DocsNav, type DocsNavSection } from "@/components/site/docs-nav";
import { components } from "@/lib/components-registry";

const sections: DocsNavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "All components", href: "/docs/components" },
      ...[...components]
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((c) => ({ title: c.title, href: `/docs/components/${c.slug}`, isNew: c.isNew })),
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[13rem_minmax(0,1fr)]">
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] overflow-y-auto py-10 pr-2 lg:block">
        <DocsNav sections={sections} />
      </aside>
      <div className="min-w-0">
        <details className="mt-6 rounded-lg border lg:hidden">
          <summary className="cursor-pointer px-4 py-2.5 text-sm font-medium">Menu</summary>
          <div className="border-t p-4">
            <DocsNav sections={sections} />
          </div>
        </details>
        {children}
      </div>
    </div>
  );
}
