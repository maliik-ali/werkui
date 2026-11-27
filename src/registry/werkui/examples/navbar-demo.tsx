import { Navbar } from "@/registry/werkui/navbar";
import { Button } from "@/components/ui/button";

export default function NavbarDemo() {
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-background">
      <Navbar
        logo={<span className="text-lg font-semibold tracking-tight">Acme</span>}
        links={[
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Customers", href: "#customers" },
          { label: "Docs", href: "#docs" },
        ]}
        actions={
          <>
            <Button variant="ghost" size="sm">Sign in</Button>
            <Button size="sm" className="rounded-full">Get started</Button>
          </>
        }
      />
    </div>
  );
}
