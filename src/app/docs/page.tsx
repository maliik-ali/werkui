import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { components } from "@/lib/components-registry";

export const metadata: Metadata = {
  title: "Introduction",
  description: "What WerkUI is and how to use it.",
};

const points = [
  ["Copy and paste", "Components are copied into your project with the shadcn CLI. There is no WerkUI package to depend on."],
  ["Made for landing pages", "Heroes, bento grids, pricing, testimonials and the small details that make marketing pages feel finished."],
  ["Animated and accessible", "Motion that respects reduced-motion settings, visible focus states and semantic markup."],
  ["Yours to change", "Colours come from your theme tokens, so a component matches your brand and works in light and dark."],
];

export default function DocsIntroPage() {
  return (
    <div className="max-w-3xl py-10">
      <p className="text-sm text-muted-foreground">Docs / Getting Started</p>
      <h1 className="mt-2 text-4xl font-medium tracking-tight">Introduction</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        WerkUI is a collection of animated React components for SaaS and agency landing pages. Built with Tailwind CSS and Motion, free and open source.
      </p>

      <h2 className="mt-12 text-2xl font-medium tracking-tight">How it works</h2>
      <p className="mt-3 text-muted-foreground">
        Pick a component, run one command, and the source lands in your <code className="rounded bg-muted px-1.5 py-0.5 text-xs">components</code> folder. It is your code from that moment: change the markup, the colours and the motion however you like.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {points.map(([title, text]) => (
          <li key={title} className="rounded-xl border bg-card p-5">
            <p className="font-medium">{title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/docs/installation" className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Installation <ArrowRight className="size-4" />
        </Link>
        <Link href="/docs/components" className="inline-flex h-10 items-center rounded-[10px] border px-5 text-sm font-medium transition-colors hover:bg-accent">
          Browse {components.length} components
        </Link>
      </div>
    </div>
  );
}
