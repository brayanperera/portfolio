"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/content/types";

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true });
  // Starts at the real value, so the server HTML and no-JS visitors see the true number.
  const [value, setValue] = useState(stat.value);

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, stat.value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, stat.value]);

  return (
    <div className="border-l border-border-strong pl-4">
      <p ref={ref} className="font-mono text-2xl font-bold text-accent tabular-nums sm:text-3xl">
        {value}
        {stat.suffix}
      </p>
      <p className="mt-1 text-sm text-muted">{stat.label}</p>
    </div>
  );
}

export function StatCounters({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {stats.map((stat) => (
        <Counter key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
