import type { ReactNode } from "react";

export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-6 rounded-lg border border-accent/30 bg-accent-muted p-4 text-sm leading-relaxed [&>p]:my-0">
      {title ? <p className="mb-1 font-mono text-xs text-accent">{title}</p> : null}
      {children}
    </aside>
  );
}
