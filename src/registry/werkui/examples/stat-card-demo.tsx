import { StatCard, StatCardGroup } from "@/registry/werkui/stat-card";

export default function StatCardDemo() {
  return (
    <StatCardGroup className="w-full max-w-3xl">
      <StatCard label="Customers" value="320" caption="Last 90 Days" progress={75} />
      <StatCard label="Orders" value="500" caption="Last 90 Days" progress={65} />
      <StatCard label="Cancel" value="20" caption="Last 90 Days" progress={35} />
    </StatCardGroup>
  );
}
