import Link from "next/link";
import { Logo } from "./Logo";
import { NewsletterForm } from "./Forms";

const cols = [
  {
    title: "Products",
    links: [
      ["All templates", "/templates"],
      ["Figma", "/templates?platform=figma"],
      ["Framer", "/templates?platform=framer"],
      ["Webflow", "/templates?platform=webflow"],
      ["Free", "/free"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Pricing", "/pricing"],
      ["Hire experts", "/hire"],
      ["Malik Ali", "/creators/malik-ali"],
      ["Rayvens", "/creators/rayvens"],
      ["Support", "/support"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["License", "/license"],
      ["Terms", "/terms"],
      ["Privacy", "/privacy"],
      ["Refunds", "/refunds"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="ink-panel on-ink">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm">
          <Logo className="[&_span]:text-on-ink" />
          <p className="mt-4 leading-relaxed text-muted-foreground">
            UI kits and website templates for Figma, Framer and Webflow. Designed by Malik Ali, built by Rayvens.
          </p>
          <div className="mt-6">
            <NewsletterForm source="footer" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="mb-4 text-sm font-medium text-accent-soft">{c.title}</h2>
              <ul className="space-y-1">
                {c.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="inline-block py-1.5 text-sm text-on-ink/80 transition-colors hover:text-on-ink">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>© 2026 WerkUI. A Rayvens product.</p>
        <p>
          <a className="hover:text-on-ink" href="https://rayvens.com" target="_blank" rel="noopener noreferrer">rayvens.com</a>
          <span aria-hidden="true"> · </span>
          <a className="hover:text-on-ink" href="https://malikali.de" target="_blank" rel="noopener noreferrer">malikali.de</a>
        </p>
      </div>
    </footer>
  );
}
