import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { PageHero } from "@/components/PageHero";
import { getProducts } from "@/lib/data";
import { CatalogSkeleton } from "../templates/page";

export const metadata: Metadata = {
  title: "Free UI kits and templates",
  description: "Free Figma UI kits, dashboards and templates from WerkUI. No account needed.",
  alternates: { canonical: "/free" },
};

export default async function FreePage() {
  const products = (await getProducts()).filter((p) => p.priceCents === 0);
  return (
    <>
      <PageHero eyebrow="Free" title="Free kits, full files" lead="Open in Figma Community and duplicate. No sign-up, no email wall." />
      <div className="container-x py-12">
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogBrowser products={products} lockPrice="free" />
        </Suspense>
      </div>
    </>
  );
}
