import { ChevronDown } from "lucide-react";
import { BarChartCard } from "@/registry/werkui/bar-chart-card";

const data = [
  { label: "Jan", above: 120, below: 71 },
  { label: "Feb", above: 215, below: 91 },
  { label: "Mar", above: 300, below: 125 },
  { label: "Apr", above: 150, below: 61 },
  { label: "May", above: 95, below: 45 },
  { label: "Jun", above: 260, below: 98 },
  { label: "Jul", above: 105, below: 48 },
  { label: "Aug", above: 130, below: 49 },
  { label: "Sep", above: 120, below: 48 },
  { label: "Oct", above: 225, below: 70 },
  { label: "Nov", above: 290, below: 89 },
  { label: "Dec", above: 190, below: 51 },
];

export default function BarChartCardDemo() {
  return (
    <BarChartCard
      className="w-full max-w-3xl"
      title="Revenue Report"
      aboveLabel="Expenses"
      belowLabel="Earning"
      data={data}
      action={
        <button
          type="button"
          className="inline-flex items-center gap-2.5 rounded-full px-4 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          Month
          <ChevronDown className="size-4" aria-hidden="true" />
        </button>
      }
    />
  );
}
