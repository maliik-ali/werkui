import { cn } from "@/lib/utils";
import type { RegistryComponent } from "@/lib/components-registry";

/** Non-interactive thumbnail of a component demo. Wide demos are rendered at desktop width and scaled down. */
export function CardPreview({ component: c, className }: { component: RegistryComponent; className?: string }) {
  const wide = c.category === "Sections" || c.category === "Layout" || c.category === "Dashboard";
  return (
    <div
      inert
      aria-hidden
      className={cn("pointer-events-none relative h-48 overflow-hidden bg-muted/30", className)}
    >
      {wide ? (
        <div
          className={cn(
            "absolute left-1/2 w-[960px] -translate-x-1/2 scale-[0.36]",
            c.category === "Layout" ? "top-1/2 origin-center -translate-y-1/2" : "top-3 origin-top",
          )}
        >
          <c.Demo />
        </div>
      ) : (
        <div className="grid h-full place-items-center">
          <c.Demo />
        </div>
      )}
    </div>
  );
}
