import type { Product } from "@/lib/types";

/** Code-drawn cover used until a real thumbnail (coverUrl) is uploaded. Decorative. */
export function Cover({ product, className = "" }: { product: Pick<Product, "coverHue" | "coverUrl" | "layout" | "name">; className?: string }) {
  const h = product.coverHue;
  const tint = `hsl(${h} 90% 66%)`;
  const soft = `hsl(${h} 80% 66% / 0.22)`;
  const bar = "rounded-full bg-white/15";
  if (product.coverUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={product.coverUrl} alt="" loading="lazy" className={`aspect-[4/3] w-full rounded-[inherit] bg-raised object-cover object-top transition-transform duration-500 ease-out-soft group-hover:scale-[1.03] ${className}`} />
    );
  }
  return (
    <div
      aria-hidden="true"
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-[inherit] ${className}`}
      style={{ background: `radial-gradient(120% 90% at 20% 0%, hsl(${h} 85% 58% / 0.55), transparent 60%), radial-gradient(90% 80% at 100% 100%, hsl(${(h + 60) % 360} 90% 60% / 0.35), transparent 60%), #0c0c14` }}
    >
      <div className="absolute inset-x-[9%] top-[13%] bottom-[-6%] rounded-t-xl border border-white/10 bg-[#0b0b12]/90 shadow-2xl transition-transform duration-500 ease-out-soft group-hover:-translate-y-2">
        <div className="flex items-center gap-1.5 border-b border-white/8 px-3 py-2">
          <i className="size-1.5 rounded-full bg-white/25" />
          <i className="size-1.5 rounded-full bg-white/15" />
          <i className="size-1.5 rounded-full bg-white/15" />
          <span className={`ml-3 h-1.5 w-1/3 ${bar}`} />
        </div>
        {product.layout === "dashboard" && (
          <div className="flex h-full gap-2 p-2.5">
            <div className="flex w-[18%] flex-col gap-1.5">
              <span className="h-2 w-full rounded-full" style={{ background: tint }} />
              {[70, 85, 60, 75, 50].map((w, i) => (
                <span key={i} className={`h-1.5 ${bar}`} style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-md border border-white/8 p-1.5" style={{ background: i === 0 ? soft : "rgba(255,255,255,0.03)" }}>
                    <span className={`block h-1 w-1/2 ${bar}`} />
                    <span className="mt-1.5 block h-2 w-2/3 rounded-full bg-white/40" />
                  </div>
                ))}
              </div>
              <div className="flex h-[42%] items-end gap-1.5 rounded-md border border-white/8 bg-white/[0.03] p-2">
                {[35, 55, 42, 70, 52, 88, 64, 78, 46, 92].map((v, i) => (
                  <span key={i} className="flex-1 rounded-t-sm" style={{ height: `${v}%`, background: i % 3 === 2 ? tint : "rgba(255,255,255,0.16)" }} />
                ))}
              </div>
            </div>
          </div>
        )}
        {product.layout === "landing" && (
          <div className="flex flex-col items-center gap-2 px-4 pt-5">
            <span className="h-1.5 w-1/5 rounded-full" style={{ background: tint }} />
            <span className="h-3 w-3/4 rounded-full bg-white/45" />
            <span className="h-3 w-1/2 rounded-full bg-white/45" />
            <span className={`mt-1 h-1.5 w-2/3 ${bar}`} />
            <span className="mt-1.5 h-4 w-1/4 rounded-full" style={{ background: tint }} />
            <div className="mt-2 grid w-full grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-12 rounded-md border border-white/8" style={{ background: i === 1 ? soft : "rgba(255,255,255,0.04)" }} />
              ))}
            </div>
          </div>
        )}
        {product.layout === "doc" && (
          <div className="grid grid-cols-[1fr_1.4fr] gap-3 p-3">
            <div className="grid grid-cols-3 gap-1.5 content-start">
              {[0, 20, 40, 60, 80, 100].map((d, i) => (
                <span key={i} className="aspect-square rounded-md" style={{ background: `hsl(${(h + d) % 360} 85% ${68 - i * 5}%)` }} />
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <span className="h-4 w-2/3 rounded-full bg-white/50" />
              <span className="h-2.5 w-1/2 rounded-full bg-white/30" />
              {[90, 80, 86, 60].map((w, i) => (
                <span key={i} className={`h-1.5 ${bar}`} style={{ width: `${w}%` }} />
              ))}
              <div className="mt-1 flex gap-1.5">
                <span className="h-4 w-12 rounded-full" style={{ background: tint }} />
                <span className="h-4 w-12 rounded-full border border-white/25" />
              </div>
            </div>
          </div>
        )}
        {product.layout === "mobile" && <div className="mx-auto mt-3 h-full w-1/3 rounded-t-2xl border border-white/15" style={{ background: soft }} />}
      </div>
    </div>
  );
}
