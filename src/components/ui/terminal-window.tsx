import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TerminalWindow({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("overflow-hidden rounded-lg border border-border-strong bg-surface", className)}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-3 py-2">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-danger/80" />
          <span className="size-2.5 rounded-full bg-warning/80" />
          <span className="size-2.5 rounded-full bg-success/80" />
        </span>
        <span className="truncate font-mono text-xs text-muted">{title}</span>
      </div>
      <div className="p-4 font-mono text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}
