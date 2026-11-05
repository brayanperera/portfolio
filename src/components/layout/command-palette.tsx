"use client";

import { ArrowRight, Copy, Download, ExternalLink, FileText, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { paletteSections } from "@/lib/site";
import { cn } from "@/lib/utils";

export type PaletteData = {
  posts: { slug: string; title: string }[];
  email: string | null;
  socials: { label: string; url: string }[];
};

type Command = {
  id: string;
  group: string;
  label: string;
  icon: ReactNode;
  run: () => void;
};

const iconClass = "size-4 shrink-0 text-muted";

export function CommandPalette({
  data,
  open,
  onOpenChange,
}: {
  data: PaletteData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  // Ctrl/Cmd+K toggles from anywhere.
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const commands = useMemo<Command[]>(() => {
    const email = data.email;
    return [
      ...paletteSections.map((section) => ({
        id: `section-${section.section}`,
        group: "Jump to",
        label: section.label,
        icon: <ArrowRight aria-hidden="true" className={iconClass} />,
        run: () => router.push(section.href),
      })),
      ...data.posts.map((post) => ({
        id: `post-${post.slug}`,
        group: "Blog",
        label: post.title,
        icon: <FileText aria-hidden="true" className={iconClass} />,
        run: () => router.push(`/blog/${post.slug}`),
      })),
      ...(email
        ? [
            {
              id: "copy-email",
              group: "Actions",
              label: "Copy email",
              icon: <Copy aria-hidden="true" className={iconClass} />,
              run: () => void navigator.clipboard.writeText(email),
            },
          ]
        : []),
      {
        id: "download-cv",
        group: "Actions",
        label: "Download CV",
        icon: <Download aria-hidden="true" className={iconClass} />,
        // A file download, not a page, so it must bypass the client router.
        run: () => void window.open("/cv.pdf", "_self"),
      },
      ...data.socials.map((social) => ({
        id: `social-${social.label}`,
        group: "Actions",
        label: `Open ${social.label}`,
        icon: <ExternalLink aria-hidden="true" className={iconClass} />,
        run: () => void window.open(social.url, "_blank", "noopener,noreferrer"),
      })),
    ];
  }, [data, router]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle
      ? commands.filter((command) => command.label.toLowerCase().includes(needle))
      : commands;
  }, [commands, query]);

  const activeIndex = Math.min(selected, Math.max(results.length - 1, 0));
  const activeId = results[activeIndex] ? `palette-${results[activeIndex].id}` : undefined;

  useEffect(() => {
    if (activeId) document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  const close = () => onOpenChange(false);

  const runCommand = (command: Command | undefined) => {
    if (!command) return;
    close();
    command.run();
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected(results.length ? (activeIndex + 1) % results.length : 0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected(results.length ? (activeIndex - 1 + results.length) % results.length : 0);
    } else if (event.key === "Enter") {
      event.preventDefault();
      runCommand(results[activeIndex]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command palette"
      onClose={() => {
        close();
        setQuery("");
        setSelected(0);
      }}
      onClick={(event) => {
        // A click on the dialog element itself is a click on the backdrop.
        if (event.target === dialogRef.current) close();
      }}
      className="fixed top-[12vh] left-1/2 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-lg border border-border-strong bg-surface p-0"
    >
      <div className="flex items-center gap-2 border-b border-border px-4">
        <Search aria-hidden="true" className={iconClass} />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(0);
          }}
          onKeyDown={onInputKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-results"
          aria-activedescendant={activeId}
          aria-label="Type a command or search"
          placeholder="Type a command or search…"
          className="h-12 w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted"
        />
      </div>
      <ul
        id="palette-results"
        role="listbox"
        aria-label="Commands"
        className="max-h-[50vh] overflow-y-auto p-2"
      >
        {results.map((command, index) => (
          <li
            key={command.id}
            id={`palette-${command.id}`}
            role="option"
            aria-selected={index === activeIndex}
            onClick={() => runCommand(command)}
            onMouseMove={() => setSelected(index)}
            className={cn(
              "flex min-h-10 cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm",
              index === activeIndex && "bg-accent-muted",
            )}
          >
            {command.icon}
            <span className="min-w-0 flex-1 truncate">{command.label}</span>
            <span className="font-mono text-xs text-muted">{command.group}</span>
          </li>
        ))}
        {results.length === 0 ? (
          <li className="px-3 py-6 text-center font-mono text-sm text-muted">
            command not found: {query}
          </li>
        ) : null}
      </ul>
    </dialog>
  );
}
