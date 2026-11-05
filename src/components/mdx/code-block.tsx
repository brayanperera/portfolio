"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState, type ComponentProps } from "react";

export function CodeBlock({ children, ...props }: ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(ref.current?.textContent ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group relative">
      <pre ref={ref} tabIndex={0} {...props}>
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-2 right-2 flex size-8 items-center justify-center rounded border border-border-strong bg-surface-2 text-muted hover:text-text"
      >
        {copied ? (
          <Check aria-hidden="true" className="size-4 text-accent" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
        )}
      </button>
    </div>
  );
}
