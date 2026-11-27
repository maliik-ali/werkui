import * as React from "react";
import { cn } from "@/lib/utils";

export function GradientText({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline animate-gradient bg-[linear-gradient(90deg,var(--chart-1),var(--chart-4),var(--chart-3),var(--chart-2),var(--chart-1))] bg-[length:300%_100%] bg-clip-text text-transparent motion-reduce:animate-none",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
