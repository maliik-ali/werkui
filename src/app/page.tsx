import { ArrowRight, Asterisk, Blocks, Layers, LayoutPanelLeft, LogIn, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Backdrop } from "@/components/Backdrop";
import { ButtonLink } from "@/components/Button";
import { Cover } from "@/components/Cover";
import { PlanCards } from "@/components/PlanCards";
import { Faq, SectionHead } from "@/components/Section";
import { HowItWorks } from "@/components/HowItWorks";
import { Stories, type Story } from "@/components/Stories";
import { TemplateCard } from "@/components/TemplateCard";
import { getPlans, getProducts } from "@/lib/data";

/** The one real client quote, from malikali.de. Add more here as they come in; never invent one. */
const clientStory: Story = {
  id: "andreas",
  kind: "quote",
  headline: "Hired twice. Still the favourite designer.",
  body: "I am surprised by his speed: I have no idea how someone can come up with so many good ideas in such a short amount of time.",
  tags: ["Andreas", "Founder, Mathebibel · client of Malik Ali"],
  image: "https://cdn.prod.website-files.com/663c3bbe86810f1ed24353d9/665181243f14d4ff3f5d0527_2.webp",
  imageAlt: "A dashboard screen from the Shopzy UI kit",
};

const platforms = [
  { label: "Webflow", short: "Wf", cls: "bg-accent text-on-accent" },
  { label: "Framer", short: "Fr", cls: "bg-ink text-on-ink" },
  { label: "Figma", short: "Fg", cls: "bg-surface text-fg" },
];

function Cursor({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`cursor-nudge absolute size-6 fill-ink ${className}`}>
      <path d="M3 2l18 8-8 2.5L10.5 21z" />
    </svg>
  );
}

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
  // Slides after the client quote are product spotlights (facts from the catalog, not reviews).
  const stories: Story[] = [
    clientStory,
    ...products
      .filter((p) => p.coverUrl)
      .slice(0, 5)
      .map((p) => ({
        id: p.slug,
        kind: "product" as const,
        headline: `${p.name}: ${p.tagline}`,
        body: p.description,
        tags: [p.category, p.priceCents === 0 ? "Free" : p.priceCents === null ? "Coming soon" : `$${p.priceCents / 100}`],
        image: p.images[1] ?? p.coverUrl!,
        imageAlt: `A screen from ${p.name}`,
        href: `/templates/${p.slug}`,
      })),
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Backdrop />
        <div className="container-x relative pb-12 pt-20 text-center md:pt-28">
          <h1 className="mx-auto max-w-5xl text-[44px] font-normal leading-[1.08] sm:text-6xl md:text-[88px]">
            <span className="inline-flex flex-wrap items-center justify-center gap-x-5">
              <span>
                {["Built", "to", "launch"].map((w, i) => (
                  <span key={w} className="word" style={{ "--i": i } as React.CSSProperties}>
                    {w}
                    {i < 2 && "\u00a0"}
                  </span>
                ))}
              </span>
              <span className="inline-flex -space-x-3 align-middle" role="img" aria-label="Works with Webflow, Framer and Figma">
                {platforms.map((p, i) => (
                  <span key={p.label} title={p.label} style={{ "--i": i } as React.CSSProperties} className={`pop grid size-12 place-items-center rounded-full border-2 border-surface text-sm font-semibold tracking-normal shadow-card md:size-[72px] md:text-xl ${p.cls}`}>
                    {p.short}
                  </span>
                ))}
              </span>
            </span>
            <br />
            <span className="relative inline-block">
              <Cursor className="-left-9 top-1 hidden -scale-x-100 md:block" />
              <span className="word" style={{ "--i": 3 } as React.CSSProperties}>
                <span className="selected draw"><i /><i />Designed</span>
              </span>{" "}
              <span className="word" style={{ "--i": 4 } as React.CSSProperties}>to&nbsp;</span>
              <span className="word" style={{ "--i": 5 } as React.CSSProperties}>sell</span>
            </span>
          </h1>
          <p className="rise mx-auto mt-8 max-w-xl leading-relaxed text-muted-foreground md:text-lg" style={{ "--d": "900ms" } as React.CSSProperties}>
            UI kits, dashboards and website templates by a senior product designer. Preview the real file, buy once,
            and make it yours.
          </p>
          <div className="rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ "--d": "1050ms" } as React.CSSProperties}>
            <ButtonLink href="/templates" size="lg">
              Browse templates <LayoutPanelLeft aria-hidden="true" size={18} />
            </ButtonLink>
            <ButtonLink href="/hire" size="lg" variant="secondary">
              Custom service <LogIn aria-hidden="true" size={18} />
            </ButtonLink>
          </div>
        </div>
        <div className="container-x relative pb-16">
        <div className="marquee-wrap ink-panel on-ink rise relative overflow-hidden rounded-[28px] py-6 shadow-[0_30px_80px_rgba(7,26,49,0.25)]" style={{ "--d": "1250ms" } as React.CSSProperties}>
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

      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="reveal mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-4xl leading-[1.05] md:text-6xl">Built for people who would rather ship than redraw</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">Four steps from an empty file to a product with your name on it.</p>
            <ButtonLink href="/templates" size="lg" className="mt-8">Start browsing</ButtonLink>
          </div>
          <div className="reveal">
            <HowItWorks />
          </div>
        </div>
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
              <p className="mt-2 leading-relaxed text-muted-foreground">{r.text}</p>
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
            <p className="mt-4 text-lg text-muted-foreground">Buy single products any time, or unlock the whole library and everything released after it.</p>
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
            <p className="mt-3 leading-relaxed text-muted-foreground">A design and development studio that takes a template to a launched site or product: custom pages, CMS, integrations and development.</p>
            <ButtonLink href="/hire?path=rayvens#enquiry" className="mt-7">Work with the team <ArrowRight aria-hidden="true" size={16} /></ButtonLink>
          </article>
          <article className="reveal card spot p-8" style={{ "--d": "90ms" } as React.CSSProperties}>
            <p className="eyebrow">For one senior designer</p>
            <h3 className="mt-3 text-2xl font-semibold">Malik Ali</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">The designer behind these kits, with 10+ years in product UX/UI. Best for redesigns, design systems and focused template customisation.</p>
            <ButtonLink href="/hire?path=malikali#enquiry" className="mt-7">Work with Malik <ArrowRight aria-hidden="true" size={16} /></ButtonLink>
          </article>
        </div>
      </section>

      <section className="stories-bg on-ink py-20 text-on-ink md:py-28">
        <div className="container-x">
          <div className="reveal mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em]">Stories</p>
            <h2 className="text-4xl leading-[1.05] md:text-6xl">Real work. Real words.</h2>
          </div>
          <div className="reveal">
            <Stories stories={stories} />
          </div>
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

      <section className="relative isolate overflow-hidden border-y border-line bg-raised">
        <div className="wall" aria-hidden="true">
          {[...products, ...products].slice(0, 16).map((p, i) => (p.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={p.coverUrl} alt="" loading="lazy" />
          ) : null))}
        </div>
        <div className="container-x relative py-28 text-center md:py-40">
          <Asterisk aria-hidden="true" size={72} strokeWidth={3} className="mx-auto mb-6" />
          <h2 className="reveal text-5xl font-normal leading-[1.08] md:text-[84px]">
            Stop redrawing
            <br />
            <span className="relative inline-block">
              Start <span className="selected draw"><i /><i />shipping</span>
              <Cursor className="-bottom-5 -right-7 hidden md:block" />
            </span>
          </h2>
          <p className="reveal mx-auto mt-8 max-w-md text-muted-foreground">
            By Malik Ali: Top Rated Plus on Upwork, Toptal top 3% designer, 132+ products designed.
          </p>
          <ButtonLink href="/templates" size="lg" className="mt-8">
            Browse templates <LayoutPanelLeft aria-hidden="true" size={18} />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
