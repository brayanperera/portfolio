import { cn } from "@/lib/utils";

export type Status = "running" | "beta" | "building" | "archived";

const styles: Record<Status, string> = {
  running: "text-success",
  beta: "text-info",
  building: "text-warning",
  archived: "text-muted",
};

export function StatusPill({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border-strong px-2.5 py-0.5 font-mono text-xs",
        styles[status],
        className,
      )}
    >
      <span aria-hidden="true">●</span>
      <span>{status}</span>
    </span>
  );
}

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-border bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
