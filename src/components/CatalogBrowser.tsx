"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Search } from "lucide-react";
import { PLATFORM_LABEL, type Platform, type Product } from "@/lib/types";
import { TemplateCard } from "./TemplateCard";

const PLATFORMS: Platform[] = ["figma", "framer", "webflow"];
const chip = (on: boolean) =>
  `inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors cursor-pointer ${on ? "border-accent bg-accent text-on-accent" : "border-line bg-surface text-muted hover:border-line-input hover:text-fg"}`;

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
      <div className="card mb-8 grid gap-4 p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <label htmlFor="catalog-q" className="sr-only">Search templates</label>
            <Search aria-hidden="true" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="catalog-q"
              type="search"
              value={q}
              onChange={(e) => set("q", e.target.value)}
              placeholder="Search dashboards, landing pages, style guides…"
              className="h-12 w-full rounded-full border border-line-input bg-bg pl-11 pr-4 text-base placeholder:text-muted/70 focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="catalog-sort" className="text-sm text-muted">Sort</label>
            <select id="catalog-sort" value={sort} onChange={(e) => set("sort", e.target.value === "new" ? "" : e.target.value)} className="h-12 rounded-full border border-line-input bg-bg px-4 text-sm">
              <option value="new">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Platform">
          <button type="button" aria-pressed={!platform} className={chip(!platform)} onClick={() => set("platform", "")}>All platforms</button>
          {PLATFORMS.map((p) => (
            <button key={p} type="button" aria-pressed={platform === p} className={chip(platform === p)} onClick={() => set("platform", platform === p ? "" : p)}>
              {PLATFORM_LABEL[p]}
            </button>
          ))}
          <span aria-hidden="true" className="mx-1 hidden w-px self-stretch bg-line sm:block" />
          {categories.map(([slug, name]) => (
            <button key={slug} type="button" aria-pressed={category === slug} className={chip(category === slug)} onClick={() => set("category", category === slug ? "" : slug)}>
              {name}
            </button>
          ))}
          {!lockPrice && (
            <>
              <span aria-hidden="true" className="mx-1 hidden w-px self-stretch bg-line sm:block" />
              <button type="button" aria-pressed={price === "free"} className={chip(price === "free")} onClick={() => set("price", price === "free" ? "" : "free")}>Free</button>
              <button type="button" aria-pressed={price === "paid"} className={chip(price === "paid")} onClick={() => set("price", price === "paid" ? "" : "paid")}>Premium</button>
            </>
          )}
        </div>
      </div>

      <p className="mb-5 text-sm text-muted" role="status" aria-live="polite">
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
          <p className="max-w-md text-muted">
            {platform && !category && !q
              ? `${PLATFORM_LABEL[platform as Platform] ?? "These"} templates are in the works.`
              : "No product matches those filters."}{" "}
            Tell us what you need and we'll build it next.
          </p>
          <Link href="/support?topic=request" className="mt-2 font-medium text-accent underline underline-offset-4">
            Request a template
          </Link>
        </div>
      )}
    </div>
  );
}
