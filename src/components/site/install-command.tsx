import { CopyButton } from "./copy-button";

export function InstallCommand({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card py-2 pl-4 pr-2 font-mono text-sm">
      <span className="select-none text-muted-foreground">$</span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap">{command}</code>
      <CopyButton value={command} label="Copy install command" />
    </div>
  );
}
