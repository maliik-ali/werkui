import type { Metadata } from "next";
import { Suspense } from "react";
import { LeadForm } from "@/components/Forms";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Support", description: "Questions about a WerkUI product, an order or a template request.", alternates: { canonical: "/support" } };

async function Form({ searchParams }: Pick<PageProps<"/support">, "searchParams">) {
  const sp = await searchParams;
  const product = typeof sp.product === "string" ? sp.product.slice(0, 80) : undefined;
  const plan = typeof sp.plan === "string" ? sp.plan.slice(0, 80) : undefined;
  const topic = product
    ? `I'm interested in "${product}". Please let me know when I can buy it.\n\n`
    : plan
      ? `Please add me to the early list for the "${plan}" pass.\n\n`
      : sp.topic === "request"
        ? "I'm looking for a template for: "
        : undefined;
  return <LeadForm productSlug={product} topic={topic} />;
}

export default function SupportPage({ searchParams }: PageProps<"/support">) {
  return (
    <>
      <PageHero eyebrow="Support" title="How can we help?" lead="Order questions, template requests, or anything that isn't working as it should." />
      <div className="container-x max-w-3xl py-14">
        <Suspense fallback={<div className="card h-[520px] animate-pulse" aria-hidden="true" />}>
          <Form searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
