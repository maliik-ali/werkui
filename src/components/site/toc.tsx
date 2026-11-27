export type TocItem = { id: string; label: string };

export function Toc({ items }: { items: TocItem[] }) {
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="font-medium">On this page</p>
      <ul className="mt-3 flex flex-col gap-2 border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="-ml-px block border-l border-transparent pl-4 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
