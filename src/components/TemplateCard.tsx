import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { priceLabel } from "@/lib/format";
import type { Product } from "@/lib/types";
import { Cover } from "./Cover";
import { PlatformBadge } from "./PlatformBadge";

export function TemplateCard({ product }: { product: Product }) {
  const free = product.priceCents === 0;
  return (
    <Card className="group relative h-full gap-0 rounded-[20px] p-3 shadow-none transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative overflow-hidden rounded-[12px] border bg-muted">
        <Cover product={product} />
        {product.isNew && <Badge variant="secondary" className="absolute left-3 top-3 rounded-full px-2.5 py-1 font-semibold">New</Badge>}
      </div>
      <CardContent className="flex flex-1 items-end justify-between gap-3 px-2 pb-1 pt-4">
        <div className="min-w-0">
          <h3 className="text-lg font-medium leading-tight">
            <Link href={`/templates/${product.slug}`} className="after:absolute after:inset-0 after:rounded-[20px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-fg">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1.5 truncate text-sm text-muted-foreground">
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
      </CardContent>
    </Card>
  );
}
