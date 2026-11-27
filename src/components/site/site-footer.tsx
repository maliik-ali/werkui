import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground">
        <p>
          Designed by{" "}
          <a href="https://malikali.de" className="underline underline-offset-4 hover:text-foreground">Malik</a>
          {" "}and code by{" "}
          <a href="https://rayvens.com" className="underline underline-offset-4 hover:text-foreground">Rayvens</a>
          . Open source under the MIT license.
        </p>
        <a href={site.github} className="hover:text-foreground">GitHub</a>
      </div>
    </footer>
  );
}
