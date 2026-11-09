import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { PageHero } from "@/components/PageHero";
import { getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Templates and UI kits",
  description: "Browse every WerkUI product: dashboards, websites, design systems and UX templates for Figma, Framer and Webflow.",
  alternates: { canonical: "/templates" },
};

export function CatalogSkeleton() {
  return (
    <ul aria-hidden="true" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <li key={i} className="card h-[380px] animate-pulse" />
      ))}
    </ul>
  );
}

export default async function TemplatesPage() {
  const products = await getProducts();
  return (
    <>
      <PageHero eyebrow="Catalog" title="Templates and UI kits" lead="Filter by platform, category or price. Every product has a live preview." />
      <div className="container-x py-12">
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogBrowser products={products} />
        </Suspense>
      </div>
    </>
  );
}
