import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/site/code-block";
import { ComponentViewer } from "@/components/site/component-viewer";
import { InstallCommand } from "@/components/site/install-command";
import { InstallTabs } from "@/components/site/install-tabs";
import { Toc } from "@/components/site/toc";
import { components, getComponent } from "@/lib/components-registry";
import { highlight } from "@/lib/highlight";
import { getRegistryItem, installTarget, registryCss } from "@/lib/registry-css";
import { installCommand } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = getComponent(slug);
  return c ? { title: c.title, description: c.description } : {};
}

const registryDir = (...parts: string[]) => path.join(process.cwd(), "src", "registry", "werkui", ...parts);

const inline = "rounded bg-muted px-1.5 py-0.5 text-xs";

export default function ComponentPage({ params }: Params) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] py-10" aria-busy="true" />}>
      <ComponentDetail params={params} />
    </Suspense>
  );
}

async function ComponentDetail({ params }: Params) {
  const { slug } = await params;
  const c = getComponent(slug);
  if (!c) notFound();

  const [source, demoSource] = await Promise.all([
    readFile(registryDir(path.basename(c.file)), "utf8"),
    readFile(registryDir("examples", `${c.slug}-demo.tsx`), "utf8"),
  ]);
  const codeHtml = await highlight(source);

  const index = components.findIndex((x) => x.slug === c.slug);
  const prev = components[(index - 1 + components.length) % components.length];
  const next = components[(index + 1) % components.length];

  const css = registryCss(c.slug);
  const deps = [...new Set(getRegistryItem(c.slug)?.dependencies ?? [])];
  const needs = c.uses?.map((s) => getComponent(s)).filter((x) => x !== undefined) ?? [];
  const target = installTarget(c.slug);

  const toc = [
    { id: "installation", label: "Installation" },
    { id: "usage", label: "Usage" },
    { id: "props", label: "Props" },
  ];

  let step = 0;
  const n = () => ++step;

  return (
    <div className="grid gap-10 py-10 xl:grid-cols-[minmax(0,1fr)_13rem]">
      <article className="min-w-0 max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            <Link href="/docs" className="hover:text-foreground">Docs</Link> /{" "}
            <Link href="/docs/components" className="hover:text-foreground">Components</Link> /{" "}
            <span className="text-foreground">{c.title}</span>
          </p>
          <div className="flex gap-1.5">
            <Link href={`/docs/components/${prev.slug}`} aria-label={`Previous: ${prev.title}`} className="grid size-8 place-items-center rounded-md border text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="size-4" />
            </Link>
            <Link href={`/docs/components/${next.slug}`} aria-label={`Next: ${next.title}`} className="grid size-8 place-items-center rounded-md border text-muted-foreground transition-colors hover:text-foreground">
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <h1 className="mt-4 text-4xl font-medium tracking-tight">{c.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{c.description}</p>

        <div className="mt-8">
          <ComponentViewer preview={<c.Demo />} codeHtml={codeHtml} source={source} />
        </div>

        <h2 id="installation" className="mt-14 scroll-mt-20 text-2xl font-medium tracking-tight">Installation</h2>
        <div className="mt-4">
          <InstallTabs
            cli={<InstallCommand command={installCommand(c.slug)} />}
            manual={
              <ol className="mt-2 space-y-8">
                {deps.length > 0 && (
                  <li>
                    <p className="font-medium">{n()}. Install the dependencies</p>
                    <div className="mt-3"><InstallCommand command={`npm install ${deps.join(" ")}`} /></div>
                  </li>
                )}
                {needs.length > 0 && (
                  <li>
                    <p className="font-medium">{n()}. Add the components it builds on</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {needs.map((x) => (
                        <Link key={x.slug} href={`/docs/components/${x.slug}`} className="text-primary underline underline-offset-4">{x.title}</Link>
                      ))}{" "}
                      must be installed at <code className={inline}>components/ui/</code>.
                    </p>
                  </li>
                )}
                <li>
                  <p className="font-medium">{n()}. Copy this code into <code className={inline}>{target}</code></p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    It uses <code className={inline}>cn</code> from <code className={inline}>@/lib/utils</code>, which <code className={inline}>shadcn init</code> creates.
                  </p>
                  <div className="mt-3"><CodeBlock code={source} /></div>
                </li>
                {css && (
                  <li>
                    <p className="font-medium">{n()}. Add the animation to your <code className={inline}>globals.css</code></p>
                    <div className="mt-3"><CodeBlock code={css} lang="css" /></div>
                  </li>
                )}
                <li>
                  <p className="font-medium">{n()}. Update the import paths to match your project</p>
                </li>
              </ol>
            }
          />
        </div>

        <h2 id="usage" className="mt-14 scroll-mt-20 text-2xl font-medium tracking-tight">Usage</h2>
        <div className="mt-4"><CodeBlock code={demoSource} /></div>

        <h2 id="props" className="mt-14 scroll-mt-20 text-2xl font-medium tracking-tight">Props</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr><th className="px-4 py-2 font-medium">Prop</th><th className="px-4 py-2 font-medium">Type</th><th className="px-4 py-2 font-medium">Default</th><th className="px-4 py-2 font-medium">Description</th></tr>
            </thead>
            <tbody>
              {c.props.map((p) => (
                <tr key={p.name} className="border-t align-top">
                  <td className="px-4 py-2 font-mono text-xs">{p.name}</td>
                  <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{p.type}</td>
                  <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{p.default ?? "-"}</td>
                  <td className="px-4 py-2 text-muted-foreground">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">All components also accept the standard props of their root element.</p>

        <div className="mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2">
          <Link href={`/docs/components/${prev.slug}`} className="rounded-xl border p-4 transition-colors hover:bg-accent">
            <span className="text-xs text-muted-foreground">Previous</span>
            <span className="mt-0.5 block font-medium">{prev.title}</span>
          </Link>
          <Link href={`/docs/components/${next.slug}`} className="rounded-xl border p-4 text-right transition-colors hover:bg-accent">
            <span className="text-xs text-muted-foreground">Next</span>
            <span className="mt-0.5 block font-medium">{next.title}</span>
          </Link>
        </div>
      </article>

      <aside className="sticky top-20 hidden h-fit xl:block">
        <Toc items={toc} />
      </aside>
    </div>
  );
}
