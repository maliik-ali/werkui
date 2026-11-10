"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Story = {
  id: string;
  kind: "quote" | "product";
  headline: string;
  /** A real client quote (kind "quote") or a product description (kind "product"). Never invent quotes. */
  body: string;
  tags: string[];
  image: string;
  imageAlt: string;
  href?: string;
};

const DURATION = 7000;
const MQ = "(prefers-reduced-motion: reduce)";
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia(MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function Stories({ stories }: { stories: Story[] }) {
  const n = stories.length;
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const touch = useRef<number | null>(null);

  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia(MQ).matches, () => true);
  const autoplay = !reduced && n > 1;

  const go = useCallback(
    (to: number) => {
      setDir(to >= i ? 1 : -1);
      setI(((to % n) + n) % n);
    },
    [i, n],
  );

  useEffect(() => {
    if (!autoplay || paused) return;
    const t = setTimeout(() => go(i + 1), DURATION);
    return () => clearTimeout(t);
  }, [autoplay, paused, i, go]);

  if (!n) return null;
  const s = stories[i];
  const at = (offset: number) => stories[(((i + offset) % n) + n) % n];

  const tile = (offset: number, size: "sm" | "lg") => {
    if (n < Math.abs(offset) * 2 + 1) return null;
    const t = at(offset);
    return (
      <button
        key={offset}
        type="button"
        onClick={() => go(i + offset)}
        aria-label={`Show story: ${t.headline}`}
        className={`group hidden shrink-0 cursor-pointer rounded-[28px] bg-card p-3 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(7,26,49,0.3)] focus-visible:outline-2 focus-visible:outline-white lg:block ${size === "lg" ? "h-72 w-24" : "h-44 w-16"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={t.id} src={t.image} alt="" loading="lazy" className="story-tile h-full w-full rounded-[18px] object-cover transition-transform duration-500 group-hover:scale-105" />
      </button>
    );
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1);
        if (e.key === "ArrowLeft") go(i - 1);
      }}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
        touch.current = null;
      }}
    >
      <div className="flex items-center justify-center gap-4">
        {tile(-2, "sm")}
        {tile(-1, "lg")}
        <div className="w-full max-w-3xl overflow-hidden rounded-[32px] bg-card text-foreground shadow-[0_30px_80px_rgba(7,26,49,0.25)]">
          <figure key={s.id} aria-live="polite" className={`grid gap-6 p-4 md:grid-cols-2 md:p-5 ${dir === 1 ? "story-in-right" : "story-in-left"}`}>
            <div className="flex min-h-[380px] flex-col justify-between gap-8 p-4 md:p-5">
              <p className="text-3xl font-medium leading-[1.1] tracking-tight md:text-[34px]">{s.headline}</p>
              <div>
                {s.kind === "quote" ? (
                  <blockquote className="font-serif text-xl leading-snug md:text-2xl">“{s.body}”</blockquote>
                ) : (
                  <p className="leading-relaxed text-muted-foreground">{s.body}</p>
                )}
                <figcaption className="mt-5 flex flex-wrap items-center gap-1.5 text-sm">
                  {s.tags.map((t, k) => (
                    <span key={t} className={`rounded-md bg-muted px-2.5 py-1 ${k === 0 ? "font-medium" : "text-muted-foreground"}`}>
                      {t}
                    </span>
                  ))}
                </figcaption>
                {s.href && (
                  <Link href={s.href} className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium text-link underline underline-offset-4">
                    View product <ArrowRight aria-hidden="true" size={16} />
                  </Link>
                )}
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image} alt={s.imageAlt} className="h-64 w-full rounded-[22px] object-cover object-left-top md:h-full md:min-h-[420px]" />
          </figure>
        </div>
        {tile(1, "lg")}
        {tile(2, "sm")}
      </div>

      {n > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button type="button" variant="outline" size="icon" aria-label="Previous story" onClick={() => go(i - 1)} className="rounded-full border-white/40 bg-white/15 text-white hover:border-white hover:bg-white/25">
            <ArrowLeft aria-hidden="true" />
          </Button>
          <div className="flex items-center" role="tablist" aria-label="Choose a story">
            {stories.map((x, k) => (
              <button key={x.id} type="button" role="tab" aria-selected={k === i} aria-label={`Story ${k + 1} of ${n}: ${x.headline}`} onClick={() => go(k)} className="grid h-11 cursor-pointer place-items-center px-1">
                <span className={`relative block h-2 overflow-hidden rounded-full bg-white/45 transition-[width] duration-500 ${k === i ? "w-16" : "w-2"}`}>
                  {k === i && (
                    <span
                      key={`${i}-${autoplay}`}
                      className="story-progress absolute inset-y-0 left-0 rounded-full bg-accent"
                      style={{ animationDuration: `${DURATION}ms`, animationPlayState: paused ? "paused" : "running", width: autoplay ? undefined : "100%", animationName: autoplay ? undefined : "none" }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <Button type="button" variant="outline" size="icon" aria-label="Next story" onClick={() => go(i + 1)} className="rounded-full border-white/40 bg-white/15 text-white hover:border-white hover:bg-white/25">
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
}
