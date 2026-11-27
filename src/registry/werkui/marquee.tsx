import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.ComponentProps<"div"> {
  /** Run the animation in the opposite direction. */
  reverse?: boolean;
  /** Pause while the pointer is over the marquee. */
  pauseOnHover?: boolean;
  /** Scroll vertically instead of horizontally. */
  vertical?: boolean;
  /** How many times the content is repeated to fill the track. */
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)] motion-reduce:animate-none",
            vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
