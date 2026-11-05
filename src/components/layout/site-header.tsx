"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { buttonClass } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Kbd } from "@/components/ui/kbd";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CommandPalette, type PaletteData } from "./command-palette";

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const sections = navItems
      .map((item) => document.getElementById(item.section))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band across the upper middle of the viewport picks one section at a time.
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function SiteHeader({ palette }: { palette: PaletteData }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (menuOpen && !menu.open) menu.showModal();
    if (!menuOpen && menu.open) menu.close();
  }, [menuOpen]);

  const isActive = (section: string, href: string) =>
    isHome ? activeSection === section : href === "/blog" && pathname.startsWith("/blog");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-mono text-sm font-bold whitespace-nowrap">
          <span className="sr-only">Brayan Perera, home</span>
          <span aria-hidden="true">
            brayan@perera:<span className="text-accent">~$</span>
            <span className="cursor-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-accent" />
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.section, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "font-mono text-[13px] transition-colors duration-150 hover:text-text",
                  active ? "text-accent" : "text-muted",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
            aria-keyshortcuts="Control+K Meta+K"
            className={buttonClass("ghost", "w-11 px-0 lg:w-auto lg:px-3")}
          >
            <Search aria-hidden="true" className="size-4 lg:hidden" />
            <Kbd className="hidden lg:inline-flex">Ctrl K</Kbd>
          </button>
          <a href="/cv.pdf" className={buttonClass("ghost", "hidden sm:inline-flex")}>
            Download CV
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            className={buttonClass("ghost", "w-11 px-0 lg:hidden")}
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>
        </div>
      </Container>

      {/* Native modal dialog: traps focus, closes on Esc and restores focus by itself. */}
      <dialog
        ref={menuRef}
        aria-label="Menu"
        onClose={() => setMenuOpen(false)}
        className="fixed inset-0 h-dvh w-screen bg-bg p-0"
      >
        <Container className="flex h-16 items-center justify-between">
          <span className="font-mono text-sm text-muted">menu</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className={buttonClass("ghost", "w-11 px-0")}
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </Container>
        <Container>
          <nav aria-label="Mobile">
            <ul className="mt-4 flex flex-col">
              {navItems.map((item) => (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-14 items-center font-mono text-lg hover:text-accent"
                  >
                    <span aria-hidden="true" className="mr-2 text-accent">
                      $
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a href="/cv.pdf" className={buttonClass("primary", "mt-8 w-full")}>
            Download CV
          </a>
        </Container>
      </dialog>

      <CommandPalette data={palette} open={paletteOpen} onOpenChange={setPaletteOpen} />
    </header>
  );
}
