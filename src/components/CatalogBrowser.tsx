"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Search } from "lucide-react";
import { PLATFORM_LABEL, type Platform, type Product } from "@/lib/types";
import { Button as UiButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { TemplateCard } from "./TemplateCard";

const PLATFORMS: Platform[] = ["figma", "framer", "webflow"];
function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <UiButton type="button" aria-pressed={on} variant={on ? "default" : "outline"} onClick={onClick} className="rounded-md hover:translate-y-0 hover:shadow-none">
      {children}
    </UiButton>
  );
}

export function CatalogBrowser({ products, lockPrice }: { products: Product[]; lockPrice?: "free" }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const platform = sp.get("platform") ?? "";
  const category = sp.get("category") ?? "";
  const price = lockPrice ?? sp.get("price") ?? "";
  const q = sp.get("q") ?? "";
  const sort = sp.get("sort") ?? "new";

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  };

  const categories = useMemo(() => [...new Map(products.map((p) => [p.categorySlug, p.category])).entries()], [products]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (!platform || p.variants.some((v) => v.platform === platform)) &&
        (!category || p.categorySlug === category) &&
        (!price || (price === "free" ? p.priceCents === 0 : p.priceCents !== 0)) &&
        (!needle || `${p.name} ${p.tagline} ${p.category}`.toLowerCase().includes(needle)),
    );
    const cost = (p: Product) => p.priceCents ?? Number.MAX_SAFE_INTEGER;
    if (sort === "price-asc") list.sort((a, b) => cost(a) - cost(b));
    else if (sort === "price-desc") list.sort((a, b) => (b.priceCents ?? -1) - (a.priceCents ?? -1));
    else list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    return list;
  }, [products, platform, category, price, q, sort]);

  const active = Boolean(platform || category || (!lockPrice && price) || q);

  return (
    <div>
      <Card className="mb-8 gap-4 rounded-[20px] p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Label htmlFor="catalog-q" className="sr-only">Search templates</Label>
            <Search aria-hidden="true" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input id="catalog-q" type="search" value={q} onChange={(e) => set("q", e.target.value)} placeholder="Search dashboards, landing pages, style guides…" className="h-12 rounded-md bg-card pl-11 pr-4 text-base md:text-base" />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="catalog-sort" className="font-normal text-muted-foreground">Sort</Label>
            <NativeSelect id="catalog-sort" value={sort} onChange={(e) => set("sort", e.target.value === "new" ? "" : e.target.value)} className="h-12 rounded-md bg-card py-0">
              <NativeSelectOption value="new">Newest</NativeSelectOption>
              <NativeSelectOption value="price-asc">Price: low to high</NativeSelectOption>
              <NativeSelectOption value="price-desc">Price: high to low</NativeSelectOption>
            </NativeSelect>
          </div>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Platform">
          <Chip on={!platform} onClick={() => set("platform", "")}>All platforms</Chip>
          {PLATFORMS.map((p) => (
            <Chip key={p} on={platform === p} onClick={() => set("platform", platform === p ? "" : p)}>{PLATFORM_LABEL[p]}</Chip>
          ))}
          <span aria-hidden="true" className="mx-1 hidden w-px self-stretch bg-line sm:block" />
          {categories.map(([slug, name]) => (
            <Chip key={slug} on={category === slug} onClick={() => set("category", category === slug ? "" : slug)}>{name}</Chip>
          ))}
          {!lockPrice && (
            <>
              <span aria-hidden="true" className="mx-1 hidden w-px self-stretch bg-line sm:block" />
              <Chip on={price === "free"} onClick={() => set("price", price === "free" ? "" : "free")}>Free</Chip>
              <Chip on={price === "paid"} onClick={() => set("price", price === "paid" ? "" : "paid")}>Premium</Chip>
            </>
          )}
        </div>
      </Card>

      <p className="mb-5 text-sm text-muted-foreground" role="status" aria-live="polite">
        {shown.length} {shown.length === 1 ? "product" : "products"}
        {active && (
          <>
            {" · "}
            <button type="button" className="cursor-pointer underline underline-offset-4 hover:text-fg" onClick={() => router.replace(pathname, { scroll: false })}>
              Clear filters
            </button>
          </>
        )}
      </p>

      {shown.length ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug}>
              <TemplateCard product={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="card grid place-items-center gap-3 px-6 py-16 text-center">
          <p className="text-xl font-semibold">Nothing here yet</p>
          <p className="max-w-md text-muted-foreground">
            {platform && !category && !q
              ? `${PLATFORM_LABEL[platform as Platform] ?? "These"} templates are in the works.`
              : "No product matches those filters."}{" "}
            Tell us what you need and we'll build it next.
          </p>
          <Link href="/support?topic=request" className="mt-2 font-medium text-link underline underline-offset-4">
            Request a template
          </Link>
        </div>
      )}
    </div>
  );
}
