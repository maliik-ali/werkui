import * as React from "react";
import { cn } from "@/lib/utils";

export type BarChartDatum = {
  /** X-axis label, e.g. "Jan". */
  label: string;
  /** Value drawn above the zero line. */
  above: number;
  /** Value drawn below the zero line, as a positive number. */
  below: number;
};

export type BarChartCardProps = Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode;
  /** Slot on the right of the title, for example a period select. */
  action?: React.ReactNode;
  data: BarChartDatum[];
  /** Legend and tooltip name of the series above the zero line. */
  aboveLabel: string;
  /** Legend and tooltip name of the series below the zero line. */
  belowLabel: string;
  /** Distance between grid lines and Y-axis labels. */
  step?: number;
  /** Format Y-axis labels. */
  formatTick?: (value: number) => string;
};

const defaultFormat = (v: number) => (v > 0 ? `+${v}` : `${v}`);

/** A card with a diverging bar chart: one series above zero, one below. Pure CSS, no chart library. */
export function BarChartCard({
  title,
  action,
  data,
  aboveLabel,
  belowLabel,
  step = 100,
  formatTick = defaultFormat,
  className,
  ...props
}: BarChartCardProps) {
  const top = Math.max(step, Math.ceil(Math.max(0, ...data.map((d) => d.above)) / step) * step);
  const bottom = Math.max(step, Math.ceil(Math.max(0, ...data.map((d) => d.below)) / step) * step);
  const range = top + bottom;
  const pct = (value: number) => ((top - value) / range) * 100;

  const ticks: number[] = [];
  for (let v = top; v >= -bottom; v -= step) ticks.push(v);

  return (
    <div className={cn("min-w-0 rounded-xl border bg-card p-4 text-card-foreground shadow-sm", className)} {...props}>
      <div className="flex min-h-8 items-center justify-between gap-3">
        <h3 className="text-base font-medium">{title}</h3>
        {action}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2 text-sm">
        <li className="flex items-center gap-2.5">
          <span className="size-3.5 rounded-[3px] bg-chart-2" aria-hidden="true" />
          {belowLabel}
        </li>
        <li className="flex items-center gap-2.5">
          <span className="size-3.5 rounded-[3px] bg-chart-1" aria-hidden="true" />
          {aboveLabel}
        </li>
      </ul>

      <div className="mt-10 overflow-x-auto pb-1">
      <div className="flex min-w-[26rem] gap-4 sm:gap-6">
        <div className="relative h-[245px] w-10 shrink-0 text-sm text-muted-foreground" aria-hidden="true">
          {ticks.map((v) => (
            <span
              key={v}
              className="absolute right-0 -translate-y-1/2 leading-none tabular-nums"
              style={{ top: `${pct(v)}%` }}
            >
              {v === 0 ? "0" : formatTick(v)}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <div className="relative h-[245px]">
            {ticks.map((v) => (
              <div
                key={v}
                className="absolute inset-x-0 border-t border-dashed border-border"
                style={{ top: `${pct(v)}%` }}
                aria-hidden="true"
              />
            ))}
            <div className="absolute inset-0 flex">
              {data.map((d) => {
                const total = d.above + d.below;
                return (
                  <div
                    key={d.label}
                    role="img"
                    aria-label={`${d.label}: ${aboveLabel} ${d.above}, ${belowLabel} ${d.below}`}
                    title={`${d.label}: ${aboveLabel} ${d.above}, ${belowLabel} ${d.below}`}
                    className="group relative flex-1"
                  >
                    {total > 0 ? (
                      <div
                        className="absolute left-1/2 flex w-3 -translate-x-1/2 flex-col overflow-hidden rounded-full transition-opacity group-hover:opacity-80"
                        style={{ top: `${pct(d.above)}%`, height: `${(total / range) * 100}%` }}
                      >
                        <div className="bg-chart-1" style={{ flexGrow: d.above }} />
                        <div className="bg-chart-2" style={{ flexGrow: d.below }} />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex text-sm text-muted-foreground" aria-hidden="true">
            {data.map((d) => (
              <span key={d.label} className="flex-1 text-center">
                {d.label}
              </span>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
