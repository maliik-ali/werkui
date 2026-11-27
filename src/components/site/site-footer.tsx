import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground">
        <p>
          Built by{" "}
          <a href="https://malikali.webflow.io" className="underline underline-offset-4 hover:text-foreground">Malik Ali</a>
          . Open source under the MIT license.
        </p>
        <a href={site.github} className="hover:text-foreground">GitHub</a>
      </div>
    </footer>
  );
}
