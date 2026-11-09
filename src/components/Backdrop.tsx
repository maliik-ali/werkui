/** Original animated background: drifting aurora glows, a moving perspective grid and film grain. Pure CSS. */
export function Backdrop({ grid = true, className = "" }: { grid?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="aurora">
        <i />
        <i />
        <i />
      </div>
      {grid && <div className="grid-floor" />}
      <div className="noise" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
