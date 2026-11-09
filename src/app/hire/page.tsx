import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { LeadForm } from "@/components/Forms";
import { PageHero } from "@/components/PageHero";
import { SectionHead } from "@/components/Section";

export const metadata: Metadata = {
  title: "Hire experts",
  description: "Get a WerkUI template customised or a product designed from scratch. Hire the Rayvens team or senior designer Malik Ali.",
  alternates: { canonical: "/hire" },
};

const paths = [
  {
    key: "rayvens",
    eyebrow: "A team",
    name: "Rayvens",
    url: "https://rayvens.com",
    text: "Design and development studio. Choose this when you need the whole thing delivered: design, build, CMS, integrations and launch.",
    points: ["Template to launched website", "Framer and Webflow development", "Product design with a full team", "Ongoing design and dev support"],
  },
  {
    key: "malikali",
    eyebrow: "One senior designer",
    name: "Malik Ali",
    url: "https://malikali.de",
    text: "The designer behind WerkUI's kits. Choose this for focused, hands-on design work with one experienced person.",
    points: ["Redesign of an existing product", "Template customisation in Figma", "Design systems and UI libraries", "UX review and direction"],
  },
] as const;

const process = [
  ["Send the brief", "Tell us which template and what needs to change, or describe the product you have in mind."],
  ["Get a plan and quote", "You get a scoped proposal with a fixed price and timeline before any work starts."],
  ["Review and launch", "Work is shared as it progresses. You approve, we hand over files or publish."],
];

async function Enquiry({ searchParams }: Pick<PageProps<"/hire">, "searchParams">) {
  const sp = await searchParams;
  const path = sp.path === "rayvens" || sp.path === "malikali" ? sp.path : "unsure";
  const product = typeof sp.product === "string" ? sp.product.slice(0, 80) : undefined;
  return <LeadForm defaultPath={path} productSlug={product} topic={product ? `I'd like help customising "${product}".\n\n` : undefined} />;
}

export default function HirePage({ searchParams }: PageProps<"/hire">) {
  return (
    <>
      <PageHero eyebrow="Hire experts" title="Want it done for you?" lead="The people who design and build WerkUI templates can customise one for you, or create your product from scratch.">
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#enquiry" size="lg">Start a project</ButtonLink>
          <ButtonLink href="/templates" size="lg" variant="secondary">Browse templates first</ButtonLink>
        </div>
      </PageHero>

      <section className="container-x py-16 md:py-24">
        <SectionHead eyebrow="Two ways to work" title="A studio or a single designer" lead="Same quality bar. Pick by the size of the job." />
        <div className="grid gap-5 md:grid-cols-2">
          {paths.map((p, i) => (
            <article key={p.key} className="reveal card spot flex flex-col p-8" style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
              <p className="eyebrow">{p.eyebrow}</p>
              <h3 className="mt-3 text-3xl font-semibold">{p.name}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
              <ul className="my-7 space-y-3">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <Check aria-hidden="true" size={18} className="mt-1 shrink-0 text-accent" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3">
                <ButtonLink href={`/hire?path=${p.key}#enquiry`}>Request a quote</ButtonLink>
                <ButtonLink href={`${p.url}?ref=werkui`} variant="secondary">
                  Visit {p.url.replace("https://", "")} <ArrowUpRight aria-hidden="true" size={16} />
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-x py-16">
        <SectionHead eyebrow="Process" title="How a project runs" />
        <ol className="grid gap-5 md:grid-cols-3">
          {process.map(([t, d], i) => (
            <li key={t} className="reveal card p-7" style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-semibold">{t}</h3>
              <p className="mt-2 leading-relaxed text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="enquiry" className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow mb-3">Enquiry</p>
          <h2 className="text-3xl font-semibold md:text-[40px]">Tell us about the project</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">Not sure which option fits? Choose “Not sure yet” and we'll point you the right way.</p>
        </div>
        <Suspense fallback={<div className="card h-[520px] animate-pulse" aria-hidden="true" />}>
          <Enquiry searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}
