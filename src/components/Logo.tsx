export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold tracking-tight ${className}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <rect x="1" y="1" width="24" height="24" rx="7" fill="var(--color-accent)" />
        <path d="M6.5 8.5l3 9 3.5-7 3.5 7 3-9" fill="none" stroke="var(--color-on-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[17px] text-fg">
        Werk<span className="text-muted">UI</span>
      </span>
    </span>
  );
}
