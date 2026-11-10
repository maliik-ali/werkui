import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { Cover } from "@/components/Cover";
import { getProduct, getProducts } from "@/lib/data";
import { priceLabel } from "@/lib/format";

export const metadata: Metadata = { title: "Live preview", robots: { index: false } };

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

/** Hosts that allow being framed. Figma Community and most others refuse, so they open in a new tab. */
const EMBEDDABLE = /\.(framer\.website|framer\.ai|framer\.app|webflow\.io)$/;

async function Preview({ params }: Pick<PageProps<"/preview/[slug]">, "params">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const url = product.variants.find((v) => v.previewUrl)?.previewUrl ?? null;
  let embeddable = false;
  try {
    embeddable = url ? EMBEDDABLE.test(new URL(url).hostname) : false;
  } catch {}
  const free = product.priceCents === 0;

  return (
    <div className="container-x py-6">
      <div className="card sticky top-[76px] z-10 flex flex-wrap items-center justify-between gap-3 p-3 pl-5">
        <Link href={`/templates/${product.slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg">
          <ArrowLeft aria-hidden="true" size={16} /> {product.name}
        </Link>
        <div className="flex items-center gap-2">
          {url && (
            <ButtonLink href={url} variant="ghost" size="sm">
              Open in new tab <ExternalLink aria-hidden="true" size={14} />
            </ButtonLink>
          )}
          <ButtonLink href={`/go/${product.slug}`} size="sm">
            {free ? "Get it free" : product.priceCents === null ? "Notify me" : `Buy · ${priceLabel(product)}`}
          </ButtonLink>
        </div>
      </div>
      {url && embeddable ? (
        <iframe src={url} title={`${product.name} live preview`} loading="lazy" className="mt-4 h-[78dvh] w-full rounded-[20px] border border-line bg-white" sandbox="allow-scripts allow-same-origin allow-popups" />
      ) : (
        <div className="card mt-4 grid place-items-center gap-5 px-6 py-14 text-center">
          <div className="group w-full max-w-xl overflow-hidden rounded-[14px]">
            <Cover product={product} />
          </div>
          <p className="max-w-md text-muted">
            {url ? "This preview opens on Figma, which can't be shown inside another site." : "A live preview for this product is on its way."}
          </p>
          {url && (
            <ButtonLink href={url} size="lg">
              Open the preview <ExternalLink aria-hidden="true" size={16} />
            </ButtonLink>
          )}
        </div>
      )}
    </div>
  );
}

export default function PreviewPage(props: PageProps<"/preview/[slug]">) {
  return (
    <Suspense fallback={<div className="container-x py-6"><div className="card h-[70dvh] animate-pulse" aria-hidden="true" /></div>}>
      <Preview params={props.params} />
    </Suspense>
  );
}
