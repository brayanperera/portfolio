import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { CursorGlow } from "@/components/layout/cursor-glow";
import { MotionProvider } from "@/components/layout/motion-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { profile } from "@/content";
import { getAllPosts } from "@/lib/posts";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: profile.name,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const palette = {
    posts: getAllPosts().map(({ slug, title }) => ({ slug, title })),
    email: profile.email,
    socials: profile.socials,
  };

  return (
    <html lang="en" className={`${geist.variable} ${jetbrains.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded bg-accent px-4 py-2 font-mono text-sm text-accent-contrast focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <noscript>
          {/* Without JS, nothing should stay hidden waiting for an animation. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.term-pending{visibility:visible!important}`}</style>
        </noscript>
        <div aria-hidden="true" className="bg-dots" />
        <CursorGlow />
        <MotionProvider>
          <SiteHeader palette={palette} />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
