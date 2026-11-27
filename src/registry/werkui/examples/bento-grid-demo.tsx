import { BarChart3, Globe, Layers, Zap } from "lucide-react";
import { BentoCard, BentoGrid } from "@/registry/werkui/bento-grid";

const glow = <div className="absolute -right-10 -top-10 size-48 rounded-full bg-primary/15 blur-3xl" />;

export default function BentoGridDemo() {
  return (
    <BentoGrid>
      <BentoCard className="md:col-span-2" name="Built for speed" description="Server components and zero layout shift out of the box." icon={<Zap />} href="#" background={glow} />
      <BentoCard name="Global by default" description="Edge-ready and fast everywhere." icon={<Globe />} href="#" background={glow} />
      <BentoCard name="Composable" description="Small parts that fit together." icon={<Layers />} href="#" background={glow} />
      <BentoCard className="md:col-span-2" name="Know what converts" description="Wire up analytics to every section." icon={<BarChart3 />} href="#" background={glow} />
    </BentoGrid>
  );
}
