import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function BentoGrid({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("grid w-full auto-rows-[18rem] grid-cols-1 gap-4 md:grid-cols-3", className)} {...props}>
      {children}
    </div>
  );
}

export interface BentoCardProps extends React.ComponentProps<"div"> {
  name: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  cta?: string;
  /** Decorative element rendered behind the text, e.g. a chart or illustration. */
  background?: React.ReactNode;
}

export function BentoCard({
  name,
  description,
  icon,
  href,
  cta = "Learn more",
  background,
  className,
  ...props
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-2xl border bg-card",
        className,
      )}
      {...props}
    >
      <div aria-hidden className="absolute inset-0">{background}</div>
      <div className="relative z-10 flex flex-col gap-1 p-6 transition-transform duration-300 md:group-hover:-translate-y-6">
        {icon && <div className="mb-2 text-primary [&_svg]:size-9">{icon}</div>}
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      </div>
      {href && (
        <a
          href={href}
          className="absolute bottom-0 z-10 flex w-full items-center gap-1 p-6 pt-0 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 max-md:opacity-100"
        >
          {cta} <ArrowRight className="size-4" />
        </a>
      )}
    </div>
  );
}
