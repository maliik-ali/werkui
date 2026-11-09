"use client";
import { useEffect } from "react";

/** One tiny client island: scroll reveals, pointer-follow glow, and ?ref= capture. */
export function Effects() {
  useEffect(() => {
    const ref = new URLSearchParams(location.search).get("ref");
    if (ref && /^[a-z0-9_-]{1,40}$/i.test(ref)) {
      document.cookie = `wk_ref=${ref.toLowerCase()}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const scan = () => document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(".spot") as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("pointermove", onMove);
    };
  }, []);
  return null;
}
