import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { Backdrop } from "@/components/Backdrop";
import { ButtonLink } from "@/components/Button";
import { TemplateCard } from "@/components/TemplateCard";
import { getProducts, getSeller, getSellers } from "@/lib/data";
import { KIND_LABEL, type ProductKind } from "@/lib/types";

export async function generateStaticParams() {
  return (await getSellers()).map((s) => ({ handle: s.handle }));
}

export async function generateMetadata({ params }: PageProps<"/creators/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const s = await getSeller(handle);
  return s ? { title: `${s.displayName} on WerkUI`, description: s.bio.slice(0, 160), alternates: { canonical: `/creators/${s.handle}` } } : { title: "Not found" };
}

const KINDS: ProductKind[] = ["ui_kit", "template", "course", "consultation", "book"];

async function Profile({ params }: Pick<PageProps<"/creators/[handle]">, "params">) {
  const { handle } = await params;
  const seller = await getSeller(handle);
  if (!seller) notFound();
  const products = (await getProducts()).filter((p) => p.sellerHandle === seller.handle);
  const groups = KINDS.map((k) => [k, products.filter((p) => p.kind === k)] as const).filter(([, list]) => list.length);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line">
        <Backdrop grid={false} className="opacity-70" />
        <div className="container-x relative flex flex-col gap-6 py-16 md:flex-row md:items-center md:py-20">
          <span aria-hidden="true" className="grid size-24 shrink-0 place-items-center rounded-full text-4xl font-semibold text-on-accent" style={{ background: `linear-gradient(135deg, hsl(${seller.hue} 90% 70%), var(--color-accent))` }}>
            {seller.displayName[0]}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="flex items-center gap-3 text-4xl font-semibold md:text-5xl">
              {seller.displayName}
              {seller.isVerified && <BadgeCheck aria-label="Verified creator" className="text-cyan" size={28} />}
            </h1>
            <p className="mt-2 text-lg text-violet-soft">{seller.headline}</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{seller.bio}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:flex-col">
            {seller.websiteUrl && (
              <ButtonLink href={`${seller.websiteUrl}?ref=werkui`} variant="secondary">
                {seller.websiteUrl.replace("https://", "")} <ArrowUpRight aria-hidden="true" size={16} />
              </ButtonLink>
            )}
            <ButtonLink href={`/hire?path=${seller.handle === "rayvens" ? "rayvens" : "malikali"}#enquiry`}>Hire {seller.displayName.split(" ")[0]}</ButtonLink>
          </div>
        </div>
      </section>

      <div className="container-x py-14">
        {groups.length === 0 && (
          <div className="card px-6 py-16 text-center">
            <p className="text-xl font-semibold">No products listed yet</p>
            <p className="mt-2 text-muted-foreground">{seller.displayName} offers services through WerkUI. Use the button above to get in touch.</p>
          </div>
        )}
        {groups.map(([kind, list]) => (
          <section key={kind} className="mb-16">
            <h2 className="mb-6 flex items-baseline gap-3 text-2xl font-semibold">
              {KIND_LABEL[kind]} <span className="text-base font-normal text-muted-foreground">{list.length}</span>
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <li key={p.slug}>
                  <TemplateCard product={p} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

export default function CreatorPage(props: PageProps<"/creators/[handle]">) {
  return (
    <Suspense fallback={<div className="container-x py-16"><div className="card h-80 animate-pulse" aria-hidden="true" /></div>}>
      <Profile params={props.params} />
    </Suspense>
  );
}
