import Link from "next/link";
import { priceLabel } from "@/lib/format";
import type { Product } from "@/lib/types";
import { Cover } from "./Cover";
import { PlatformBadge } from "./PlatformBadge";

export function TemplateCard({ product }: { product: Product }) {
  const free = product.priceCents === 0;
  return (
    <article className="card spot group relative flex h-full flex-col p-2 transition-transform duration-300 ease-out-soft hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-[14px]">
        <Cover product={product} />
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-on-accent">New</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight">
            <Link href={`/templates/${product.slug}`} className="after:absolute after:inset-0 after:rounded-[20px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent">
              {product.name}
            </Link>
          </h3>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-sm font-semibold ${free ? "bg-success/15 text-success" : product.priceCents === null ? "bg-raised text-muted" : "bg-raised text-fg"}`}>
            {priceLabel(product)}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted">{product.tagline}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          {product.variants.map((v) => (
            <PlatformBadge key={v.platform} platform={v.platform} />
          ))}
          <span className="text-xs text-muted">{product.category}</span>
        </div>
      </div>
    </article>
  );
}
