import * as React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends React.ComponentProps<"button"> {
  /** Render as a link instead of a button. */
  href?: string;
  /** Colour of the light sweep. */
  shimmerColor?: string;
  /** Any CSS background for the button face. */
  background?: string;
  /** Duration of one sweep, e.g. "2.5s". */
  shimmerDuration?: string;
}

export function ShimmerButton({
  href,
  shimmerColor = "#ffffff",
  background = "var(--foreground)",
  shimmerDuration = "2.5s",
  className,
  style,
  children,
  ...props
}: ShimmerButtonProps) {
  // Renders an <a> when `href` is set. Cast keeps the button prop types.
  const Comp = (href ? "a" : "button") as "button";
  return (
    <Comp
      {...(href ? { href } : {})}
      style={
        {
          "--shimmer-color": shimmerColor,
          "--shimmer-bg": background,
          "--shimmer-duration": shimmerDuration,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "relative inline-flex h-11 cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap rounded-full px-6 text-sm font-medium text-background transition-transform [background:var(--shimmer-bg)] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent_35%,var(--shimmer-color)_50%,transparent_65%)] opacity-30 [animation-duration:var(--shimmer-duration)] motion-reduce:hidden"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Comp>
  );
}
