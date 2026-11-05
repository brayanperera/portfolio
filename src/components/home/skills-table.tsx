"use client";

import { useState } from "react";
import { TerminalWindow } from "@/components/ui/terminal-window";
import type { SkillGroup } from "@/content/types";
import { cn } from "@/lib/utils";

const ALL = "All";

export function SkillsTable({ groups }: { groups: SkillGroup[] }) {
  const [category, setCategory] = useState(ALL);
  const chips = [ALL, ...groups.map((group) => group.category)];
  const visible = groups.filter((group) => category === ALL || group.category === category);
  const command =
    category === ALL
      ? "kubectl get skills"
      : `kubectl get skills -l category=${category.toLowerCase()}`;

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="mb-5 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            aria-pressed={chip === category}
            onClick={() => setCategory(chip)}
            className={cn(
              "min-h-9 rounded-full border px-3 font-mono text-xs transition-colors duration-150",
              chip === category
                ? "border-accent bg-accent-muted text-accent"
                : "border-border-strong text-muted hover:text-text",
            )}
          >
            {chip}
          </button>
        ))}
      </div>
      <TerminalWindow title={`$ ${command}`}>
        <table className="w-full border-collapse text-left text-xs sm:text-[13px]">
          <caption className="sr-only">Skills by category, with years where known</caption>
          <thead>
            <tr className="text-muted">
              <th scope="col" className="pr-4 pb-2 font-normal">
                NAME
              </th>
              <th scope="col" className="pr-4 pb-2 font-normal">
                CATEGORY
              </th>
              <th scope="col" className="pb-2 text-right font-normal">
                YEARS
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.flatMap((group) =>
              group.skills.map((skill) => (
                <tr key={skill.name} className="border-t border-border align-top">
                  <th scope="row" className="py-1.5 pr-4 font-normal">
                    {skill.name}
                    {skill.detail ? (
                      <span className="mt-0.5 block text-[11px] leading-snug text-muted">
                        {skill.detail}
                      </span>
                    ) : null}
                  </th>
                  <td className="py-1.5 pr-4 text-muted">{group.category}</td>
                  <td className="py-1.5 text-right text-muted">
                    {skill.years ? (
                      skill.years
                    ) : (
                      <>
                        <span aria-hidden="true">–</span>
                        <span className="sr-only">not stated</span>
                      </>
                    )}
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </TerminalWindow>
    </div>
  );
}
