import Link from "next/link";
import { ArrowRight, Code2, Copy, Eye, Moon, Palette, Wand2 } from "lucide-react";
import { BentoCard, BentoGrid } from "@/registry/werkui/bento-grid";
import { HeroSection } from "@/registry/werkui/hero-section";
import { BarChartCard } from "@/registry/werkui/bar-chart-card";
import { ShimmerButton } from "@/registry/werkui/shimmer-button";
import { StatCard, StatCardGroup } from "@/registry/werkui/stat-card";
import { Marquee } from "@/registry/werkui/marquee";
import { CardPreview } from "@/components/site/card-preview";
import { InstallCommand } from "@/components/site/install-command";
import { components } from "@/lib/components-registry";
import { installCommand } from "@/lib/site";

const revenue = [
  { label: "Jan", above: 120, below: 71 },
  { label: "Feb", above: 215, below: 91 },
  { label: "Mar", above: 300, below: 125 },
  { label: "Apr", above: 150, below: 61 },
  { label: "May", above: 95, below: 45 },
  { label: "Jun", above: 260, below: 98 },
  { label: "Jul", above: 105, below: 48 },
  { label: "Aug", above: 130, below: 49 },
  { label: "Sep", above: 120, below: 48 },
  { label: "Oct", above: 225, below: 70 },
  { label: "Nov", above: 290, below: 89 },
  { label: "Dec", above: 190, below: 51 },
];

const stack = ["React", "Next.js", "Tailwind CSS", "Motion", "TypeScript", "shadcn CLI", "Vite", "Remix"];

const steps = [
  { icon: Copy, title: "Pick a component", text: "Browse sections and building blocks made for SaaS and agency landing pages." },
  { icon: Code2, title: "Add it with the CLI", text: "One command copies the source into your project. No package to depend on." },
  { icon: Palette, title: "Make it yours", text: "It is your code now. Change the markup, the tokens and the motion." },
];

const faqs = [
  ["Is WerkUI free?", "Yes. Every component here is free and MIT licensed, for personal and commercial projects. Paid templates may come later, built from these components."],
  ["Do I need shadcn/ui?", "You need the shadcn CLI to install with one command, and the cn helper it creates. You can also copy any file by hand. See the Manual tab on each component."],
  ["Does it work outside Next.js?", "The components are plain React with Tailwind CSS v4. They work in Next.js, Vite and Remix. A few use the use client directive, which other frameworks ignore."],
  ["Will it match my brand?", "Components use theme tokens such as primary, card and muted-foreground, so they pick up your colours and your dark mode automatically."],
];

export default function HomePage() {
  return (
    <>
      <div className="border-b">
        <HeroSection
          title="Page components you copy into your code"
          description="Heroes, pricing, testimonials and dashboard cards for SaaS and agency sites. React, Tailwind and the shadcn CLI. Free and MIT licensed."
          actions={
            <>
              <ShimmerButton href="/docs/components">Browse components <ArrowRight className="size-4" /></ShimmerButton>
              <Link href="/docs/installation" className="inline-flex h-11 items-center rounded-[10px] border bg-card px-5 text-sm font-medium transition-colors hover:bg-accent">
                Installation
              </Link>
            </>
          }
          media={
            <div className="mx-auto max-w-4xl text-left">
              <div className="mx-auto max-w-2xl"><InstallCommand command={installCommand("stat-card")} /></div>
              <div className="mt-10 overflow-hidden rounded-xl border bg-card shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <div className="flex flex-col gap-4 bg-muted/40 p-4 sm:p-6">
                  <StatCardGroup>
                    <StatCard label="Customers" value="320" caption="Last 90 days" progress={75} />
                    <StatCard label="Orders" value="500" caption="Last 90 days" progress={65} />
                    <StatCard label="Cancel" value="20" caption="Last 90 days" progress={35} className="hidden sm:flex" />
                  </StatCardGroup>
                  <BarChartCard title="Revenue report" aboveLabel="Expenses" belowLabel="Earning" data={revenue} />
                </div>
              </div>
            </div>
          }
        />
      </div>

      <section aria-label="Works with" className="border-b py-8">
        <p className="mb-4 text-center text-sm text-muted-foreground">Works with the tools you already use</p>
        <div className="relative">
          <Marquee pauseOnHover className="[--duration:30s]">
            {stack.map((name) => (
              <span key={name} className="px-4 py-2 font-mono text-sm text-muted-foreground">{name}</span>
            ))}
          </Marquee>
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Everything a landing page needs</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">A growing set of blocks. Each one has a live preview, the code and a one-line install.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {components.map((c) => (
            <div key={c.slug} className="group relative overflow-hidden rounded-xl border bg-card transition-colors hover:border-primary/50">
              <CardPreview component={c} />
              <div className="border-t p-4">
                <Link href={`/docs/components/${c.slug}`} className="font-medium after:absolute after:inset-0">{c.title}</Link>
                <p className="line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Link href="/docs/components" className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-primary">
          See all components <ArrowRight className="size-4" />
        </Link>
      </section>

      <section className="border-y bg-muted/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Why WerkUI</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">Small decisions that make pages feel finished.</p>
          <BentoGrid className="mt-10 auto-rows-[15rem]">
            <BentoCard className="md:col-span-2" icon={<Copy />} name="Copy, paste, own it" description="No package lock-in. The source lives in your project and you change what you like." />
            <BentoCard icon={<Wand2 />} name="Animated, not heavy" description="Most motion is plain CSS. Motion is only added where it earns its weight." />
            <BentoCard icon={<Moon />} name="Light and dark" description="Built on theme tokens, so every component follows your palette and mode." />
            <BentoCard className="md:col-span-2" icon={<Eye />} name="Accessible by default" description="Visible focus, keyboard-friendly menus and reduced-motion support are part of every component." />
          </BentoGrid>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">How it works</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title}>
              <span className="grid size-10 place-items-center rounded-[10px] bg-accent text-accent-foreground"><s.icon className="size-5" /></span>
              <h3 className="mt-4 font-medium">{i + 1}. {s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/40">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Questions</h2>
          <div className="mt-8 divide-y rounded-xl border bg-card">
            {faqs.map(([q, a]) => (
              <details key={q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                  {q}
                  <span aria-hidden className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-5xl">Build your next landing page in an afternoon</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Start with one component and keep going. It is free.</p>
        <div className="mt-8 flex justify-center">
          <ShimmerButton href="/docs/components">Browse components <ArrowRight className="size-4" /></ShimmerButton>
        </div>
      </section>
    </>
  );
}
