import Link from "next/link";
import { priceLabel } from "@/lib/format";
import type { Product } from "@/lib/types";
import { Cover } from "./Cover";
import { PlatformBadge } from "./PlatformBadge";

export function TemplateCard({ product }: { product: Product }) {
  const free = product.priceCents === 0;
  return (
    <article className="group relative flex h-full flex-col rounded-[20px] border border-line bg-surface p-3 transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card">
      <div className="relative overflow-hidden rounded-[12px] border border-line bg-raised">
        <Cover product={product} />
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-on-accent">New</span>
        )}
      </div>
      <div className="flex flex-1 items-end justify-between gap-3 px-2 pb-1 pt-4">
        <div className="min-w-0">
          <h3 className="text-lg font-medium leading-tight">
            <Link href={`/templates/${product.slug}`} className="after:absolute after:inset-0 after:rounded-[20px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-fg">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1.5 truncate text-sm text-muted">
            <span className={free ? "font-medium text-link" : product.priceCents === null ? "" : "font-medium text-fg"}>{priceLabel(product)}</span>
            <span aria-hidden="true"> - </span>
            {product.category}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          {product.variants.map((v) => (
            <PlatformBadge key={v.platform} platform={v.platform} />
          ))}
        </div>
      </div>
    </article>
  );
}
