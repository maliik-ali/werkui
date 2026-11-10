import { ArrowRight, Blocks, Eye, Layers, RefreshCw, Rocket, Wand2 } from "lucide-react";
import Link from "next/link";
import { Backdrop } from "@/components/Backdrop";
import { ButtonLink } from "@/components/Button";
import { Cover } from "@/components/Cover";
import { PlanCards } from "@/components/PlanCards";
import { Faq, SectionHead } from "@/components/Section";
import { TemplateCard } from "@/components/TemplateCard";
import { getPlans, getProducts } from "@/lib/data";

const steps = [
  { icon: Eye, title: "Pick and preview", text: "Browse the catalog and open the live preview before you spend anything." },
  { icon: Wand2, title: "Make it yours", text: "Duplicate the file, swap colours, type and content. Everything is built from components." },
  { icon: Rocket, title: "Ship", text: "Hand off to developers or publish from Framer or Webflow. Days, not months." },
];

const reasons = [
  { icon: Layers, title: "Real design systems", text: "Variables, components and named layers, so a change in one place updates everywhere." },
  { icon: Blocks, title: "Three platforms", text: "Figma files today. Framer and Webflow versions of each template as they are released." },
  { icon: RefreshCw, title: "Updates included", text: "Buy once and keep getting improvements to the product you bought." },
];

const faq = [
  { q: "What do I get when I buy?", a: "A link to duplicate the file into your own Figma, Framer or Webflow account, shown right after payment and included in your receipt." },
  { q: "Can I use a template for client work?", a: <>Yes. One purchase covers unlimited projects for you and your clients. You can't resell or redistribute the files themselves. See the <Link className="text-link underline underline-offset-4" href="/license">license</Link>.</> },
  { q: "Are the free products really free?", a: "Yes. Free products open straight in Figma Community with no account on WerkUI needed." },
  { q: "Can someone customise it for me?", a: <>Yes. Rayvens takes on full builds with a team, and Malik Ali is available as a single senior designer. <Link className="text-link underline underline-offset-4" href="/hire">See the options</Link>.</> },
  { q: "Do you offer refunds?", a: <>Digital files can't be returned, so sales are final unless the file is broken or not as described. Details on the <Link className="text-link underline underline-offset-4" href="/refunds">refunds page</Link>.</> },
];

export default async function Home() {
  const [products, plans] = await Promise.all([getProducts(), getPlans()]);
  const featured = products.filter((p) => p.isFeatured).slice(0, 3);
  const free = products.filter((p) => p.priceCents === 0).slice(0, 3);
  const loop = [...products, ...products];

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Backdrop />
        <div className="container-x relative pb-10 pt-20 text-center md:pt-28">
          <p className="reveal eyebrow mx-auto mb-6">
            Figma · Framer · Webflow
          </p>
          <h1 className="reveal mx-auto max-w-4xl text-[44px] font-semibold leading-[1.02] sm:text-6xl md:text-7xl" style={{ "--d": "80ms" } as React.CSSProperties}>
            <span className="text-gradient">Start from</span> finished.
            <br />
            Ship this week.
          </h1>
          <p className="reveal mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl" style={{ "--d": "160ms" } as React.CSSProperties}>
            UI kits, dashboards and website templates built by a senior product designer. Preview them live, buy once, and
            make them yours.
          </p>
          <div className="reveal mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ "--d": "240ms" } as React.CSSProperties}>
            <ButtonLink href="/templates" size="lg">
              Browse templates <ArrowRight aria-hidden="true" size={18} />
            </ButtonLink>
            <ButtonLink href="/free" size="lg" variant="secondary">
              Get the free ones
            </ButtonLink>
          </div>
        </div>
        <div className="container-x relative pb-16">
        <div className="marquee-wrap ink-panel on-ink reveal relative overflow-hidden rounded-[28px] py-6 shadow-[0_30px_80px_rgba(16,16,16,0.25)]" style={{ "--d": "320ms" } as React.CSSProperties}>
          <ul className="marquee" aria-label="Featured products">
            {loop.map((p, i) => (
              <li key={`${p.slug}-${i}`} aria-hidden={i >= products.length} className="w-[300px] shrink-0 md:w-[380px]">
                <Link href={`/templates/${p.slug}`} tabIndex={i >= products.length ? -1 : 0} className="group block rounded-[20px] border border-white/10 bg-white/5 p-2 transition-colors hover:border-white/30">
                  <div className="overflow-hidden rounded-[14px]">
                    <Cover product={p} />
                  </div>
                  <span className="block px-2 pb-1 pt-3 text-left text-sm font-medium text-on-ink">{p.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <SectionHead
          eyebrow="Featured"
          title="The kits people start with"
          lead="Dashboards and websites you can ship as they are, or pull apart for parts."
          action={<ButtonLink href="/templates" variant="ghost">See all templates</ButtonLink>}
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <li key={p.slug} className="reveal" style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
              <TemplateCard product={p} />
            </li>
          ))}
        </ul>
      </section>

      <section className="container-x py-16 md:py-24">
        <SectionHead eyebrow="How it works" title="From blank file to live product in three moves" />
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="reveal card p-7" style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
              <div className="mb-6 flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent text-on-accent">
                  <s.icon aria-hidden="true" size={22} />
                </span>
                <span className="font-mono text-sm text-muted">0{i + 1}</span>
              </div>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-x py-16 md:py-24">
        <SectionHead
          eyebrow="Free"
          title="Try the quality before you pay"
          lead="Full files, not teasers. Open them in Figma Community and duplicate."
          action={<ButtonLink href="/free" variant="ghost">All free products</ButtonLink>}
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {free.map((p, i) => (
            <li key={p.slug} className="reveal" style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
              <TemplateCard product={p} />
            </li>
          ))}
        </ul>
      </section>

      <section className="container-x py-16 md:py-24">
        <SectionHead eyebrow="Why WerkUI" title="Built the way a product team would build it" />
        <ul className="grid gap-5 md:grid-cols-3">
          {reasons.map((r, i) => (
            <li key={r.title} className="reveal card p-7" style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
              <r.icon aria-hidden="true" size={24} className="text-fg" />
              <h3 className="mt-5 text-xl font-semibold">{r.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="pricing" className="relative isolate overflow-hidden py-16 md:py-24">
        <Backdrop grid={false} className="opacity-60" />
        <div className="container-x relative">
          <div className="reveal mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow mb-3">All access</p>
            <h2 className="text-3xl font-semibold leading-[1.1] md:text-[40px]">One pass, every template</h2>
            <p className="mt-4 text-lg text-muted">Buy single products any time, or unlock the whole library and everything released after it.</p>
          </div>
          <PlanCards plans={plans} />
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <SectionHead eyebrow="Done for you" title="Need it customised? Hire the people who made it." />
        <div className="grid gap-5 md:grid-cols-2">
          <article className="reveal card spot p-8">
            <p className="eyebrow">For teams and full builds</p>
            <h3 className="mt-3 text-2xl font-semibold">Rayvens</h3>
            <p className="mt-3 leading-relaxed text-muted">A design and development studio that takes a template to a launched site or product: custom pages, CMS, integrations and development.</p>
            <ButtonLink href="/hire?path=rayvens#enquiry" className="mt-7">Work with the team <ArrowRight aria-hidden="true" size={16} /></ButtonLink>
          </article>
          <article className="reveal card spot p-8" style={{ "--d": "90ms" } as React.CSSProperties}>
            <p className="eyebrow">For one senior designer</p>
            <h3 className="mt-3 text-2xl font-semibold">Malik Ali</h3>
            <p className="mt-3 leading-relaxed text-muted">The designer behind these kits, with 10+ years in product UX/UI. Best for redesigns, design systems and focused template customisation.</p>
            <ButtonLink href="/hire?path=malikali#enquiry" className="mt-7">Work with Malik <ArrowRight aria-hidden="true" size={16} /></ButtonLink>
          </article>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHead eyebrow="FAQ" title="Questions, answered" lead="Anything else? The support page reaches a human." />
          <div className="reveal">
            <Faq items={faq} />
          </div>
        </div>
      </section>

      <section className="container-x pb-8">
        <div className="reveal relative isolate overflow-hidden rounded-[28px] border border-line px-6 py-16 text-center md:py-24">
          <Backdrop className="opacity-80" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-4xl font-semibold leading-[1.05] md:text-6xl">Stop redrawing the same screens.</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted">Pick a starting point and spend your time on the parts that make your product different.</p>
            <ButtonLink href="/templates" size="lg" className="mt-9">Browse templates <ArrowRight aria-hidden="true" size={18} /></ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
