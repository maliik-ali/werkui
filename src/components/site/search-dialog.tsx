"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type SearchItem = { title: string; description: string; href: string };

export function SearchDialog({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        dialogRef.current?.showModal();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const q = query.trim().toLowerCase();
  const results = q
    ? items.filter((i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
    : items;

  const go = (href: string) => {
    dialogRef.current?.close();
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="flex h-9 items-center gap-2 rounded-full border bg-card px-3 text-sm text-muted-foreground transition-colors hover:text-foreground sm:w-56"
      >
        <Search className="size-4" aria-hidden />
        <span className="hidden flex-1 text-left sm:block">Search docs...</span>
        <kbd className="hidden rounded border px-1.5 text-[10px] sm:block">⌘K</kbd>
        <span className="sr-only sm:hidden">Search docs</span>
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Search documentation"
        onClose={() => setQuery("")}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto mt-[12vh] w-[min(32rem,calc(100vw-2rem))] rounded-xl border bg-popover p-0 text-popover-foreground shadow-2xl backdrop:bg-black/50"
      >
        <div className="flex items-center gap-2 border-b px-4">
          <Search className="size-4 text-muted-foreground" aria-hidden />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results[0]) go(results[0].href);
            }}
            placeholder="Search components..."
            aria-label="Search"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted-foreground">No results.</li>}
          {results.map((item) => (
            <li key={item.href}>
              <button
                type="button"
                onClick={() => go(item.href)}
                className="w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
              >
                <span className="block text-sm font-medium">{item.title}</span>
                <span className="line-clamp-1 block text-xs text-muted-foreground">{item.description}</span>
              </button>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
