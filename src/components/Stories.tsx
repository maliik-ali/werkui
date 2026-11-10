"use client";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

export type Story = { headline: string; quote: string; name: string; role: string; image: string; imageAlt: string };

/** Customer stories. Only real, attributable quotes go in `stories`; side tiles are product screens. */
export function Stories({ stories, tiles }: { stories: Story[]; tiles: string[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!api) return;
    const on = () => setI(api.selectedScrollSnap());
    api.on("select", on);
    return () => void api.off("select", on);
  }, [api]);
  if (!stories.length) return null;
  const tile = (src: string | undefined, cls: string) =>
    src ? (
      <div aria-hidden="true" className={`hidden shrink-0 rounded-[28px] bg-surface p-3 shadow-card lg:block ${cls}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" loading="lazy" className="h-full w-full rounded-[18px] object-cover" />
      </div>
    ) : null;
  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        {tile(tiles[0], "h-44 w-16")}
        {tile(tiles[1], "h-72 w-24")}
        <Carousel setApi={setApi} opts={{ loop: stories.length > 1 }} className="w-full max-w-3xl" aria-label="Client stories">
          <CarouselContent>
            {stories.map((s) => (
              <CarouselItem key={s.name}>
        <figure className="grid w-full gap-6 rounded-[32px] bg-surface p-4 text-fg shadow-[0_30px_80px_rgba(7,26,49,0.25)] md:grid-cols-2 md:p-5">
          <div className="flex flex-col justify-between gap-8 p-4 md:p-5">
            <p className="text-3xl font-medium leading-[1.1] tracking-tight md:text-[34px]">{s.headline}</p>
            <div>
              <blockquote className="font-serif text-xl leading-snug md:text-2xl">“{s.quote}”</blockquote>
              <figcaption className="mt-5 flex flex-col items-start gap-1.5 text-sm">
                <span className="rounded-md bg-raised px-2.5 py-1 font-medium">{s.name}</span>
                <span className="rounded-md bg-raised px-2.5 py-1 text-muted-foreground">{s.role}</span>
              </figcaption>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.image} alt={s.imageAlt} loading="lazy" className="h-64 w-full rounded-[22px] object-cover object-left-top md:h-full md:min-h-[420px]" />
        </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {tile(tiles[2], "h-72 w-24")}
        {tile(tiles[3], "h-44 w-16")}
      </div>
      {stories.length > 1 && (
        <div className="mt-10 flex justify-center gap-2" role="tablist" aria-label="Stories">
          {stories.map((x, n) => (
            <button key={x.name} type="button" role="tab" aria-selected={n === i} aria-label={`Story from ${x.name}`} onClick={() => api?.scrollTo(n)} className="grid size-11 cursor-pointer place-items-center">
              <span className={`block h-2 rounded-full transition-all ${n === i ? "w-10 bg-accent" : "w-2 bg-white/60"}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
