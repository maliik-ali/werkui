import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PlanCards } from "@/components/PlanCards";
import { Faq } from "@/components/Section";
import { getPlans } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Buy single templates or unlock the full WerkUI library with a pass. Yearly or lifetime.",
  alternates: { canonical: "/pricing" },
};

const rows: [string, boolean, boolean][] = [
  ["Every product in the pass, today", false, true],
  ["New releases included", false, true],
  ["Unlimited personal and client projects", true, true],
  ["Updates to what you bought", true, true],
  ["Priority support", false, true],
];

export default async function PricingPage() {
  const plans = await getPlans();
  return (
    <>
      <PageHero eyebrow="Pricing" title="Buy one, or unlock them all" lead="Every product can be bought on its own. A pass gets you the whole library and what ships next." />
      <div className="container-x py-14">
        <PlanCards plans={plans} />

        <section className="mt-24">
          <h2 className="mb-8 text-2xl font-semibold md:text-3xl">Single product or a pass?</h2>
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-line text-muted">
                  <th scope="col" className="p-5 font-medium">What you get</th>
                  <th scope="col" className="p-5 font-medium">Single product</th>
                  <th scope="col" className="p-5 font-medium text-accent">Pass</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map(([label, single, pass]) => (
                  <tr key={label}>
                    <th scope="row" className="p-5 font-normal">{label}</th>
                    {[single, pass].map((v, i) => (
                      <td key={i} className="p-5">
                        {v ? <Check aria-label="Included" size={20} className="text-accent" /> : <Minus aria-label="Not included" size={20} className="text-muted" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-24 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-2xl font-semibold md:text-3xl">Pricing questions</h2>
          <Faq
            items={[
              { q: "What's the difference between yearly and lifetime?", a: "Yearly gives you access to the library, including new releases, for 12 months. Lifetime is a single payment with no renewal. Files you duplicated stay yours either way." },
              { q: "Can I use pass products for clients?", a: <>Yes, on unlimited projects. The <Link href="/license" className="text-accent underline underline-offset-4">license</Link> has the details.</> },
              { q: "Do I need a pass to buy one template?", a: "No. Every product has its own buy button and price." },
              { q: "I need changes made for me. Is that in the pass?", a: <>Customisation is a separate service. See <Link href="/hire" className="text-accent underline underline-offset-4">Hire experts</Link>.</> },
            ]}
          />
        </section>
      </div>
    </>
  );
}
