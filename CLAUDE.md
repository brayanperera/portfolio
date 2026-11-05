# CLAUDE.md — brayanperera.cyou

Personal portfolio for **Brayan Perera**: Systems Architect / SRE (13+ yrs) and founder of **Aakasa Digital**.
Domain: `brayanperera.cyou` · Host: **Vercel** · Repo owner: Brayan.

## Positioning (read before writing any copy)
Hybrid story: **"Architect who ships products."**
1. Primary: senior cloud/systems architect and SRE. 13+ years in telecom, healthcare and banking. Covers AWS/EKS, Kubernetes, Terraform, OpenStack/NFV and Linux.
2. Proof: founder of Aakasa Digital, building and running his own SaaS products end-to-end with AI-assisted development (Claude Code).
Tone: confident, technical, concise. No buzzword soup, no fake metrics. Use real numbers only from `content/`.

## Stack (do not swap without asking)
- Next.js (latest stable, App Router, React Server Components) + TypeScript (strict)
- Tailwind CSS v4 + CSS variables for design tokens
- Framer Motion (`motion`) for animation. Respect `prefers-reduced-motion`.
- MDX blog via `@next/mdx` or `next-mdx-remote` + `gray-matter`. Syntax highlighting with `shiki` (rehype-pretty-code).
- Contact form: Next.js Route Handler / Server Action → **Resend**. Validate with `zod`. Honeypot field plus simple rate limit.
- CV PDF: generated from the same `content/` data with `@react-pdf/renderer` at `/cv.pdf` (route handler, statically cached).
- Analytics: `@vercel/analytics` + `@vercel/speed-insights`
- Icons: `lucide-react`. Fonts via `next/font`: **JetBrains Mono** (accents/code) + **Inter** or **Geist Sans** (body).
- Package manager: `pnpm`. Lint: ESLint + Prettier.

## Single source of truth
All personal data lives in typed files under `content/`. Components never hard-code profile facts.
- `content/profile.ts` — name, title, location, bio, socials, email
- `content/experience.ts` — roles (company, title, period, bullets, tech[])
- `content/projects.ts` — career projects + Aakasa products (status, links, stack, highlights)
- `content/skills.ts` — grouped skills with years where known
- `content/certifications.ts`, `content/education.ts`
- `content/posts/*.mdx` — blog
The site, the CV PDF, JSON-LD and OG images all read from these files.

## Design system — "dark terminal / infra"
- Base: near-black background (`#0a0b0d`), slate surfaces, 1px hairline borders (`white/8%`).
- Accent: one signal color (terminal green `#3ddc84` or cyan `#22d3ee`), defined as a token and easy to change.
- Subtle background: dotted/grid pattern with a faint radial glow that follows the cursor (desktop only).
- Mono for labels, eyebrows, stats, nav, and `$ commands`. Sans for body.
- Motifs: terminal prompt typing effect in the hero, status pills (`● running`, `● beta`), `kubectl get`-style tables for skills/certs, log-line timeline for experience.
- Motion: subtle and fast (150–400ms), stagger on scroll reveal, no scroll-jacking.
- Accessibility: WCAG AA contrast, focus rings visible, full keyboard nav, semantic landmarks.
- Responsive: mobile-first, 16px gutters, no horizontal scroll at 360px.

## Quality bars
- Lighthouse ≥ 95 on all four categories (mobile).
- Static generation for every page except `/api/*`.
- SEO: metadata API, canonical URLs, `sitemap.ts`, `robots.ts`, dynamic OG images (`next/og`), JSON-LD `Person` + `BlogPosting`.
- No secrets in code. Env: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Document them in `.env.example`.

## Working rules
- Make small, reviewable commits per prompt/phase.
- Run `pnpm lint && pnpm build` before declaring a phase done.
- If content is missing, use a clearly marked `TODO(brayan):` placeholder. Never invent facts, clients, metrics or testimonials.
