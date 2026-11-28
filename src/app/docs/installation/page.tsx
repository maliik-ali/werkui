import type { Metadata } from "next";
import { InstallCommand } from "@/components/site/install-command";
import { installCommand } from "@/lib/site";

export const metadata: Metadata = { title: "Installation", description: "Set up WerkUI in a Next.js, Vite or Remix project." };

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="relative pl-12">
      <span className="absolute left-0 top-0 grid size-8 place-items-center rounded-lg bg-accent text-sm font-medium text-accent-foreground">{n}</span>
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="mt-2 space-y-3 text-muted-foreground">{children}</div>
    </li>
  );
}

export default function InstallationPage() {
  return (
    <div className="max-w-3xl py-10">
      <p className="text-sm text-muted-foreground">Docs / Getting Started</p>
      <h1 className="mt-2 text-4xl font-medium tracking-tight">Installation</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        WerkUI components are copied into your project with the shadcn CLI. You own the code.
      </p>
      <ol className="mt-10 space-y-10">
        <Step n={1} title="Start a project with Tailwind and shadcn/ui">
          <p>Use any React framework with Tailwind CSS v4, then initialise shadcn/ui if you have not already.</p>
          <InstallCommand command="npx shadcn@latest init" />
        </Step>
        <Step n={2} title="Add a component">
          <p>Pick one from the components page. Its page shows the exact command, for example:</p>
          <InstallCommand command={installCommand("shimmer-button")} />
          <p>The file is added under <code className="rounded bg-muted px-1.5 py-0.5 text-xs">components/ui</code>, along with any npm packages and CSS animations it needs.</p>
        </Step>
        <Step n={3} title="Use it">
          <p>Import it like any other local component and change whatever you like.</p>
        </Step>
      </ol>
    </div>
  );
}
