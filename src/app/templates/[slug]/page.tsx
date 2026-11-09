import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight, BadgeCheck, Check, ExternalLink } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { Cover } from "@/components/Cover";
import { PlatformBadge } from "@/components/PlatformBadge";
import { Faq } from "@/components/Section";
import { TemplateCard } from "@/components/TemplateCard";
import { getProduct, getProducts, getSeller } from "@/lib/data";
import { money, priceLabel, SITE_URL } from "@/lib/format";
import { KIND_LABEL, PLATFORM_LABEL } from "@/lib/types";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/templates/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return { title: "Not found" };
  return {
    title: `${p.name}: ${p.tagline}`,
    description: p.description.slice(0, 160),
    alternates: { canonical: `/templates/${p.slug}` },
  };
}

async function Detail({ params }: Pick<PageProps<"/templates/[slug]">, "params">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const [seller, all] = await Promise.all([getSeller(product.sellerHandle), getProducts()]);
  const related = all.filter((p) => p.slug !== product.slug && p.categorySlug === product.categorySlug).concat(all.filter((p) => p.slug !== product.slug && p.categorySlug !== product.categorySlug)).slice(0, 3);
  const free = product.priceCents === 0;
  const soon = product.priceCents === null;
  const preview = product.variants.find((v) => v.previewUrl)?.previewUrl;
  const cta = free ? "Get it free" : soon ? "Tell me when it's out" : `Buy for ${money(product.priceCents!, product.currency)}`;

  const summary: [string, string][] = [
    ["Type", KIND_LABEL[product.kind].replace(/s$/, "")],
    ["Platform", product.variants.map((v) => PLATFORM_LABEL[v.platform]).join(", ")],
    ["Category", product.category],
    ...(product.screensCount ? ([["Screens", `${product.screensCount}+`]] as [string, string][]) : []),
    ["License", "Unlimited projects"],
    ["Updates", "Included"],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: `${SITE_URL}/templates/${product.slug}`,
    brand: { "@type": "Brand", name: "WerkUI" },
    ...(product.priceCents !== null && {
      offers: { "@type": "Offer", price: (product.priceCents / 100).toFixed(2), priceCurrency: product.currency, availability: "https://schema.org/InStock" },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="container-x pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-fg">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/templates" className="hover:text-fg">Templates</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-fg">{product.name}</li>
          </ol>
        </nav>
      </div>

      <section className="container-x grid gap-10 py-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div className="min-w-0">
          <div className="card group overflow-hidden p-2">
            <div className="overflow-hidden rounded-[14px]">
              <Cover product={product} />
            </div>
          </div>
          <div className="mt-12 space-y-12">
            <div>
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{product.description}</p>
            </div>
            {product.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold">What's inside</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex gap-3 rounded-xl border border-line bg-surface p-4">
                      <Check aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-accent" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product.builtFor.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold">Built for</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {product.builtFor.map((b) => (
                    <li key={b} className="rounded-full border border-line bg-surface px-4 py-2 text-sm">{b}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h2 className="mb-5 text-2xl font-semibold">Good to know</h2>
              <Faq
                items={[
                  { q: "How do I get the file?", a: free ? "The button opens the file in Figma Community. Press “Open in Figma” to duplicate it into your drafts." : "Right after payment, Stripe shows a link to duplicate the file into your own account. The same link is in your receipt email." },
                  { q: "Can I use it for client projects?", a: <>Yes, on unlimited projects. You can't resell or share the source file. Full terms are on the <Link href="/license" className="text-accent underline underline-offset-4">license page</Link>.</> },
                  { q: "Can you customise it for me?", a: <>Yes. <Link href={`/hire?product=${product.slug}#enquiry`} className="text-accent underline underline-offset-4">Tell us what you need</Link> and we'll route it to Rayvens or Malik Ali.</> },
                ]}
              />
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6 md:p-7">
            <div className="flex flex-wrap items-center gap-2">
              {product.variants.map((v) => (
                <PlatformBadge key={v.platform} platform={v.platform} />
              ))}
              {product.isNew && <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-on-accent">New</span>}
            </div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">{product.name}</h1>
            <p className="mt-2 text-lg text-muted">{product.tagline}</p>
            <p className="mt-6 flex items-baseline gap-3">
              <span className={`text-4xl font-semibold tracking-tight ${free ? "text-success" : ""}`}>{priceLabel(product)}</span>
              {product.compareAtCents && <s className="text-muted">{money(product.compareAtCents, product.currency)}</s>}
              {!free && !soon && <span className="text-sm text-muted">one-time</span>}
            </p>
            <div className="mt-6 grid gap-3">
              <ButtonLink href={`/go/${product.slug}`} size="lg" className="w-full">
                {cta} <ArrowRight aria-hidden="true" size={18} />
              </ButtonLink>
              {preview && (
                <ButtonLink href={`/preview/${product.slug}`} size="lg" variant="secondary" className="w-full">
                  Live preview
                </ButtonLink>
              )}
            </div>
            {!free && (
              <p className="mt-4 text-center text-sm text-muted">
                Or unlock everything with <Link href="/pricing" className="text-accent underline underline-offset-4">All Access</Link>
              </p>
            )}
            <dl className="mt-6 divide-y divide-line border-t border-line text-sm">
              {summary.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          {seller && (
            <Link href={`/creators/${seller.handle}`} className="card spot mt-5 flex items-center gap-4 p-5 transition-colors hover:border-line-input">
              <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full text-lg font-semibold text-on-accent" style={{ background: `linear-gradient(135deg, hsl(${seller.hue} 90% 70%), var(--color-accent))` }}>
                {seller.displayName[0]}
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-semibold">
                  {seller.displayName}
                  {seller.isVerified && <BadgeCheck aria-label="Verified creator" size={16} className="text-cyan" />}
                </span>
                <span className="block truncate text-sm text-muted">{seller.headline}</span>
              </span>
              <ExternalLink aria-hidden="true" size={16} className="ml-auto text-muted" />
            </Link>
          )}
        </aside>
      </section>

      <section className="container-x py-16">
        <h2 className="mb-8 text-2xl font-semibold md:text-3xl">You might also like</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <li key={p.slug}>
              <TemplateCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default function ProductPage(props: PageProps<"/templates/[slug]">) {
  return (
    <Suspense fallback={<div className="container-x py-16"><div className="card h-[520px] animate-pulse" aria-hidden="true" /><p className="sr-only" role="status">Loading product</p></div>}>
      <Detail params={props.params} />
    </Suspense>
  );
}
