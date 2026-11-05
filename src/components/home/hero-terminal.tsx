"use client";

import { useEffect, useState } from "react";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { cn } from "@/lib/utils";

export type TerminalLine = { kind: "command" | "output"; text: string };

const CHAR_MS = 28;
const OUTPUT_MS = 90;
const PAUSE_AFTER_COMMAND_MS = 200;

/**
 * Types a short shell session. Every line is always in the DOM, untyped text is only
 * hidden, so the window keeps its final size and the animation cannot shift layout.
 * Screen readers get the whole session at once.
 */
export function HeroTerminal({ lines, title }: { lines: TerminalLine[]; title: string }) {
  const [position, setPosition] = useState({ line: 0, char: 0 });

  useEffect(() => {
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setTimeout>;

    if (instant) {
      timer = setTimeout(() => setPosition({ line: lines.length, char: 0 }), 0);
      return () => clearTimeout(timer);
    }

    let line = 0;
    let char = 0;
    const tick = () => {
      const current = lines[line];
      if (!current) return;

      if (current.kind === "command" && char < current.text.length) {
        char += 1;
        setPosition({ line, char });
        timer = setTimeout(tick, CHAR_MS);
        return;
      }

      const wasCommand = current.kind === "command";
      line += 1;
      char = 0;
      setPosition({ line, char });
      timer = setTimeout(tick, wasCommand ? PAUSE_AFTER_COMMAND_MS : OUTPUT_MS);
    };

    timer = setTimeout(tick, 250);
    return () => clearTimeout(timer);
  }, [lines]);

  return (
    <TerminalWindow title={title}>
      <pre className="sr-only">
        {lines.map((line) => `${line.kind === "command" ? "$ " : ""}${line.text}`).join("\n")}
      </pre>
      <div aria-hidden="true" className="text-xs whitespace-pre-wrap sm:text-[13px]">
        {lines.map((line, index) => {
          const done = index < position.line;
          const typing = index === position.line;
          const shown = done ? line.text.length : typing ? position.char : 0;
          const isCommand = line.kind === "command";
          return (
            <div
              key={index}
              className={cn(
                "min-h-[1.6em]",
                isCommand ? (index > 0 ? "mt-2" : undefined) : "text-muted",
              )}
            >
              {isCommand ? (
                <span className={cn("text-accent", !done && !typing && "term-pending invisible")}>
                  ${" "}
                </span>
              ) : null}
              <span className={cn(!done && !typing && "term-pending invisible")}>
                {line.text.slice(0, shown)}
              </span>
              {typing && isCommand ? (
                <span className="cursor-blink inline-block h-3 w-1.5 translate-y-px bg-accent" />
              ) : null}
              <span className="term-pending invisible">{line.text.slice(shown)}</span>
            </div>
          );
        })}
      </div>
    </TerminalWindow>
  );
}
