import { Marquee } from "@/registry/werkui/marquee";

const logos = ["Acme", "Globex", "Initech", "Umbrella", "Hooli", "Stark", "Wayne", "Wonka"];

export default function MarqueeDemo() {
  return (
    <div className="relative w-full overflow-hidden">
      <Marquee pauseOnHover className="[--duration:25s]">
        {logos.map((name) => (
          <div key={name} className="grid h-12 w-36 place-items-center rounded-lg border bg-card text-sm font-medium text-muted-foreground">
            {name}
          </div>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-background" />
    </div>
  );
}
