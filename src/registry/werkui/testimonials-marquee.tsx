import * as React from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

export interface Testimonial {
  name: string;
  /** Handle or company, shown under the name. */
  handle?: string;
  quote: string;
  /** Image URL. Initials are shown when omitted. */
  avatar?: string;
}

export interface TestimonialsMarqueeProps extends React.ComponentProps<"div"> {
  testimonials: Testimonial[];
  /** Number of scrolling rows. Rows alternate direction. */
  rows?: number;
  /** Time for one loop, e.g. "40s". */
  duration?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ name, handle, quote, avatar }: Testimonial) {
  return (
    <figure className="w-72 shrink-0 rounded-xl border bg-card p-4">
      <figcaption className="flex items-center gap-3">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="" loading="lazy" className="size-9 rounded-full object-cover" />
        ) : (
          <span className="grid size-9 place-items-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
            {initials(name)}
          </span>
        )}
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-medium">{name}</p>
          {handle && <p className="truncate text-xs text-muted-foreground">{handle}</p>}
        </div>
      </figcaption>
      <blockquote className="mt-3 text-sm text-muted-foreground">{quote}</blockquote>
    </figure>
  );
}

export function TestimonialsMarquee({
  testimonials,
  rows = 2,
  duration = "40s",
  className,
  style,
  ...props
}: TestimonialsMarqueeProps) {
  const lanes = Array.from({ length: rows }, (_, row) => testimonials.filter((_, i) => i % rows === row));

  return (
    <div
      className={cn("relative flex w-full flex-col overflow-hidden", className)}
      style={{ "--duration": duration, ...style } as React.CSSProperties}
      {...props}
    >
      {lanes.map((lane, row) => (
        <Marquee key={row} reverse={row % 2 === 1} pauseOnHover>
          {lane.map((t) => (
            <TestimonialCard key={t.name + t.quote} {...t} />
          ))}
        </Marquee>
      ))}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-background" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-background" />
    </div>
  );
}
