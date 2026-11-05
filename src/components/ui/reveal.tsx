"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

/** Scroll reveal, once only. `index` staggers siblings. */
export function Reveal({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.35, ease: "easeOut", delay: Math.min(index, 6) * 0.05 }}
    >
      {children}
    </m.div>
  );
}
