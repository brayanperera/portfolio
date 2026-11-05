import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("card-glow rounded-lg border border-border bg-surface p-5", className)}
      {...props}
    />
  );
}
