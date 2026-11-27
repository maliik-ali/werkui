import * as React from "react";
import { cn } from "@/lib/utils";

const RADIUS = 23;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ProgressRing({ value, label }: { value: number; label: string }) {
  const progress = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      className="relative size-[55px] shrink-0"
    >
      <svg viewBox="0 0 55 55" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="27.5" cy="27.5" r={RADIUS} fill="none" strokeWidth="9" className="stroke-chart-2" />
        <circle
          cx="27.5"
          cy="27.5"
          r={RADIUS}
          fill="none"
          strokeWidth="9"
          strokeDasharray={`${(progress / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          className="stroke-primary transition-[stroke-dasharray] duration-700 motion-reduce:transition-none"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-normal text-primary">
        {Math.round(progress)}%
      </span>
    </div>
  );
}

export type StatCardProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Short name of the metric, e.g. "Customers". */
  label: string;
  /** The headline number. */
  value: React.ReactNode;
  /** Small line under the value, e.g. "Last 90 Days". */
  caption?: React.ReactNode;
  /** 0 to 100. When set, a progress ring is shown on the right. */
  progress?: number;
};

/** One metric: label, big value, caption and an optional progress ring. */
export function StatCard({ label, value, caption, progress, className, ...props }: StatCardProps) {
  return (
    <div className={cn("flex items-center gap-5", className)} {...props}>
      <div className="flex flex-col justify-center gap-1">
        <p className="text-base font-medium text-card-foreground">{label}</p>
        <p className="text-[1.6rem] leading-none font-bold text-primary tabular-nums">{value}</p>
        {caption ? <p className="text-[0.79rem] text-muted-foreground">{caption}</p> : null}
      </div>
      {progress !== undefined ? <ProgressRing value={progress} label={label} /> : null}
    </div>
  );
}

/** A card surface that lays several stat cards out in a row with even spacing. */
export function StatCardGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-10 gap-y-6 rounded-xl border bg-card px-7 py-4 text-card-foreground shadow-sm",
        className,
      )}
      {...props}
    />
  );
}
