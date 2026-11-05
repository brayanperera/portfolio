# Claude Code prompt pack — brayanperera.cyou

**How to use**
1. Create an empty folder and run `git init`. Put `CLAUDE.md` (provided) in the repo root.
2. Open Claude Code in that folder and run the prompts **in order**, one per session or turn.
3. Review the diff and commit after each prompt. Fill any `TODO(brayan):` items before Prompt 10.

---

## Prompt 01 — Scaffold & design tokens

```
Read CLAUDE.md first and follow it strictly.

Scaffold the project:
- Next.js (latest stable, App Router, TypeScript strict, src/ dir), pnpm, Tailwind v4, ESLint + Prettier.
- Install: motion, lucide-react, zod, resend, @vercel/analytics, @vercel/speed-insights, gray-matter, next-mdx-remote (or @next/mdx), rehype-pretty-code, shiki, @react-pdf/renderer, clsx, tailwind-merge.
- Set up next/font: JetBrains Mono + Geist Sans (fallback Inter).
- Create design tokens as CSS variables in globals.css (bg, surface, surface-2, border, text, text-muted, accent, accent-muted, success, warning). Dark only for now, but structure tokens so a light theme could be added later.
- Build primitives in src/components/ui: Container, Section (with mono eyebrow like "// 02 — experience"), Button (primary/ghost/link), Badge/StatusPill (running | beta | building | archived), Card with hairline border + hover glow, Kbd, TerminalWindow (title bar with 3 dots + mono body).
- Add a global background: subtle dot grid + radial glow that follows the cursor on desktop (pointer: fine), static on mobile, disabled on prefers-reduced-motion.
- Add a /styleguide page (noindex) showing all primitives.
- Add .env.example with RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.

Finish with pnpm lint && pnpm build passing.
```

## Prompt 02 — Content layer (single source of truth)

```
Create typed content files under src/content/ per CLAUDE.md, with TypeScript types in src/content/types.ts. Use exactly this data. Do not embellish. Keep TODO(brayan) markers.

PROFILE
- name: "Brayan Perera" (full: Raigamage Diluka Brayan Prasanth Perera)
- title: "Systems Architect · SRE · Founder, Aakasa Digital"
- location: "Kalutara, Sri Lanka" (works remotely with global clients)
- email: TODO(brayan) — confirm public contact email (brayan@aakasa.dev?)
- socials: LinkedIn https://www.linkedin.com/in/brayan-perera/ , Toptal https://www.toptal.com/developers/resume/raigamage-diluka-brayan-prasanth-perera , GitHub TODO(brayan), X/Twitter TODO(brayan)
- short bio: "Systems architect and site reliability engineer with 13+ years building highly available platforms for telecom, healthcare and banking — from OpenStack private clouds and NFV platforms to AWS EKS. Today I also build and run my own SaaS products under Aakasa Digital."
- availability: "Open to architecture, SRE and DevOps engagements" (toggleable boolean)

STATS (hero): 13+ years experience · 9 certifications · 30+ clinics migrated to AWS Fargate · TODO(brayan) products shipped

EXPERIENCE (newest first)
1. Founder — Aakasa Digital — TODO(brayan) start year – Present. Digital product studio building SaaS products end-to-end: product design, infrastructure and development, using Claude Code for AI-assisted delivery. Tech: Next.js, TypeScript, PostgreSQL/Prisma, Docker, Kubernetes, AWS EKS, Cloudflare, Resend.
2. Site Reliability Engineer — Teel Technologies — 2021 – TODO(brayan) Present? 
   - Built and managed CI/CD pipelines for eight SaaS product deployment projects.
   - Wrote Terraform modules provisioning three AWS environments, including two EKS clusters.
   - Built a backup & restore tool for on-premise application environments.
   - Integrated self-hosted runners for GitHub Actions.
   - Introduced new operational workflows and automation.
   Tech: AWS, EKS, Terraform, kOps, Helm, Argo CD, CodeBuild, Docker, Kubernetes, Bash, Python, PHP, MySQL
3. Systems Architect — Healthway Medical — 2021 – 2022
   - Migrated a clinic management system serving 30+ medical clinics in Singapore to AWS Fargate.
   - Introduced Infrastructure-as-Code practice to the IT department.
   - Automated edge device management via an RMM platform.
   Tech: AWS Fargate, ECS, RDS, VPC, EC2, Terraform, Ansible, GitHub Actions, Docker, Python
4. Systems Architect — hSenid Mobile Solutions — 2018 – 2021
   - Principal architect for an ETSI NFV VNF Manager (VNFM) platform for a telecom client: OpenStack integration, microservice API and workflow design.
   - Designed and built an Ansible collection that automated deployments across multiple projects.
   - Helped a healthcare company migrate to AWS Fargate with automated CI/CD.
   Tech: OpenStack, Ansible, Terraform, Python, Docker, Ceph, Prometheus, Grafana, MySQL, AWS
5. Associate Systems Architect — hSenid Mobile Solutions — 2017 – 2018
   - Upgraded an OpenStack private cloud (RHOSP 7 → 10) for a Singapore university institute.
   - Designed an OpenStack deployment with site-to-site instance migration for a Singapore telco.
   - Built a central deployment manager using Bash, Python and Ansible.
6. Tech Lead, Systems Implementation — hSenid Mobile Solutions — 2016 – 2017
   - Designed site-to-site failover Red Hat Enterprise Virtualization cluster on GlusterFS.
   - Built "Service Manager", a Bash/Python service failover tool for non-clustered Linux.
7. Senior Implementation Engineer — hSenid Software Singapore — 2012 – 2016
   - 3.5 years onsite systems engineer for a leading Singapore mobile operator (SMSC, USSDC, SMPP, Sigtran, HLR provisioning, Nokia Surepay IN).
8. Implementation Engineer — hSenid Mobile Solutions — 2008 – 2012
   - Deployed mobile recharge and messaging platforms for operators in multiple countries; 1.5 years onsite in Brunei; ran customer training in Sri Lanka and Brunei.

CAREER PROJECTS (case studies)
- VNF Manager (ETSI NFV MANO) — principal architect; built 2 of 8 microservices (VNF Package Parser, VIM Adapter via Terraform on OpenStack), a TOSCA VNF Package Creator tool, and the Ansible automation framework.
- Element Management System (ETSI NFV MANO) — architect, tech lead and principal developer of a Python Flask platform; built 5 of 12 microservices (lifecycle manager, service manager, patch framework, VNF indicator manager, local SSL CA issuer).
- Clinic Management System → AWS Fargate — Terraform (ELB, target groups, ECS task defs and services) + GitHub Actions to staging and prod.
- Compliance Management System — create, manage and apply CIS / PCI-DSS rules across many hosts. (Brayan's favourite build.)
- Service Management Script Framework — Bash/Python auto-recovery for non-clustered Linux; used across many hSenid customer environments.
- Centralized Patch Management Tool — Bash/Python/Ansible remote install, upgrade and config management; adopted in the hSenid NFV suite.

AAKASA DIGITAL PRODUCTS (names may change — products are being rebranded; keep names in one place)
- BillCraft AI — AI-powered invoicing SaaS. status: TODO(brayan). url: TODO
- SupportCraft AI — multi-tenant support ticketing with inbound email (Cloudflare Email Workers), threaded replies and a rich-text editor. status/url: TODO
- MeetingCraft — Calendly-style scheduling with Google Workspace calendar sync and subscriptions. status/url: TODO
- PDFCraft — PDF tools. status/url: TODO
- Aakasa Toolbox — suite of browser-based utility tools at https://tools.aakasa.dev (15-tool MVP). status: running
- FreeLLM API — self-hosted OpenAI-compatible unified LLM router at https://llm.aakasa.dev. status: running
Each product: name, tagline, status, url?, stack[], 2–3 highlights, screenshot path (public/products/<slug>.webp, placeholder until provided).

SKILLS (grouped; years where known)
- Cloud: AWS (EC2, ECS/Fargate, EKS, RDS, VPC, S3, EFS, ELB/ALB, CloudFormation, CloudWatch, CodeBuild), OCI, OpenStack, Azure
- Containers & orchestration: Kubernetes, Docker (4y), Helm, Argo CD, kOps, Docker Compose
- IaC & automation: Terraform (2y), Ansible (4y), GitHub Actions, GitLab CI/CD
- Languages: Bash (13y), Python (4y), SQL, PHP, TypeScript
- Data: MySQL (8y), PostgreSQL, Redis, Ceph, GlusterFS
- Observability: Prometheus, Grafana, Nagios
- Systems: Linux (13y), networking, SAN/RAID, HA clustering
- Product: Next.js, Prisma, Flask, REST/OpenAPI, microservices, Claude Code

CERTIFICATIONS
- Microsoft Certified: Azure Fundamentals — Dec 2021
- Oracle Autonomous Database Cloud 2019 Certified Specialist — Aug 2020
- OCI 2019 Certified Architect Professional — Jul 2020
- OCI 2019 Certified Cloud Operations Associate — Jul 2020
- OCI 2019 Certified Architect Associate — Jul 2020
- OCI Foundations 2020 Certified Associate — Jul 2020
- Red Hat Certified Engineer in Red Hat OpenStack — Aug 2017
- Red Hat Certified System Administrator in Red Hat OpenStack — Aug 2017
- Oracle Certified Professional, MySQL 5 Database Administrator — Mar 2014

EDUCATION
- B.Sc. Information and Communication Technology — University of Colombo School of Computing, 2005–2008

Also export helper selectors (e.g. getFeaturedProjects, yearsOfExperience computed from 2008).
```

## Prompt 03 — Layout, nav, footer

```
Build the app shell:
- Sticky top nav: mono logo "brayan@perera:~$" (blinking cursor) left, links right: About, Experience, Projects, Products, Blog, Contact, plus a "Download CV" ghost button linking /cv.pdf. Active section highlighting on the home page via IntersectionObserver.
- Mobile: full-screen sheet menu with focus trap and Esc to close.
- Command palette (Cmd/Ctrl+K): jump to sections and blog posts, copy email, open LinkedIn/Toptal, download CV. Keyboard accessible.
- Footer: status line like "● all systems operational" in accent, socials, © year, "Built with Next.js · deployed on Vercel".
- Skip-to-content link and proper landmarks.
- Add Vercel <Analytics/> and <SpeedInsights/> in the root layout.
```

## Prompt 04 — Home page sections

```
Build the home page (/) as a single scroll, all data from src/content:

1. HERO — left: eyebrow "// systems architect · sre · founder", name, one-line value prop ("I design resilient cloud platforms — and ship products on them."), short bio, CTAs [Hire me → #contact] [Download CV]. Right: a TerminalWindow that types out a short session:
   $ whoami → brayan perera — systems architect / sre
   $ uptime → 13+ years · telecom · healthcare · banking
   $ kubectl get products -n aakasa → small table of products with STATUS column
   Typing respects reduced motion (render instantly). Below: stat counters animated on view.
2. ABOUT — 2-column: narrative (career arc from telecom onsite engineer → architect → founder) + "Currently" card (what he's building now, availability pill).
3. EXPERIENCE — vertical log-style timeline: each role is a line like "[2021–2022] Systems Architect @ Healthway Medical". Expand/collapse for bullets + tech badges. Group the four hSenid roles visually as a progression.
4. CASE STUDIES — 3–4 featured career projects as cards: problem → what I did → stack. Each links to /projects/[slug].
5. PRODUCTS (Aakasa Digital) — grid of product cards with screenshot, status pill, tagline, stack, external link. Section intro: "Things I build and run myself."
6. SKILLS — grouped, rendered like `kubectl get skills` output (NAME | CATEGORY | YEARS) with category filter chips. Not a progress-bar chart.
7. CERTIFICATIONS — compact grid with issuer logos (simple text/monogram badges if logos are not available — no trademark images), year.
8. LATEST POSTS — 3 most recent MDX posts.
9. CONTACT — form (see Prompt 06) + direct email copy button + social links.

Scroll-reveal with motion, staggered, once only. Verify layout at 360px, 768px and 1440px.
```

## Prompt 05 — Project & product detail pages

```
Add /projects (index) and /projects/[slug] using generateStaticParams.
- Index: filter tabs All | Career | Products.
- Detail template: title, role, period, status, context/problem, approach, architecture (optional MDX body per project in src/content/projects/<slug>.mdx with a simple architecture diagram using Mermaid rendered at build time or an inline SVG), outcomes (only from content, no invented metrics), stack, links, prev/next navigation.
- Write initial MDX bodies for the VNF Manager, EMS, Fargate migration and Compliance Management System using ONLY facts from content; mark gaps TODO(brayan).
```

## Prompt 06 — Contact form (Resend)

```
Implement the contact form:
- Fields: name, email, company (optional), engagement type (select: Architecture / SRE-DevOps / Product build / Other), message.
- Server Action or POST /api/contact Route Handler with zod validation, hidden honeypot, and a basic in-memory + IP-header rate limit (note in a comment that Upstash/Vercel KV could replace it).
- Send via Resend: to CONTACT_TO_EMAIL, from CONTACT_FROM_EMAIL, reply-to the sender. Use a clean React Email template.
- Send an auto-acknowledgement email to the sender.
- UI states: idle, submitting, success (terminal-style "✓ message delivered"), error, all with aria-live.
- Never expose the API key to the client. Add a README section on verifying the sending domain in Resend.
```

## Prompt 07 — Blog (MDX)

```
Add the blog:
- Posts in src/content/posts/*.mdx with frontmatter: title, description, date, tags[], draft, cover?.
- /blog index with tag filtering and reading time; /blog/[slug] with table of contents (sticky on desktop), code blocks via rehype-pretty-code + shiki (dark theme matching tokens, copy button, filename label), callout component, image component using next/image.
- /blog/tags/[tag] pages. RSS feed at /rss.xml. Drafts hidden in production.
- Create 2 starter posts as drafts with outlines only (no fabricated content):
  1. "Migrating a clinic management system to AWS Fargate with Terraform"
  2. "How I build SaaS products as a solo founder with Claude Code"
```

## Prompt 08 — CV PDF

```
Generate a downloadable CV at /cv.pdf using @react-pdf/renderer, built from the same src/content data.
- Clean, ATS-friendly single-column layout, A4, light background (print-friendly — not the dark site theme), embedded fonts.
- Sections: header (name, title, location, email, links), summary, experience (most recent 4 roles fully, older ones condensed), selected projects, skills, certifications, education.
- Serve from a route handler with Content-Disposition filename "Brayan-Perera-CV.pdf", statically generated/cached at build.
- Add a "Download CV" button wherever referenced. Verify text is selectable in the output.
```

## Prompt 09 — SEO, OG images, performance, a11y

```
Polish for launch:
- Metadata API on every route; metadataBase https://brayanperera.cyou; canonical URLs.
- Dynamic OG images with next/og for home, projects and posts (dark terminal style, name + title + accent).
- sitemap.ts, robots.ts, RSS link tag, favicon + apple-touch icon (monogram "BP" in mono on dark).
- JSON-LD: Person (sameAs LinkedIn, Toptal, GitHub), WebSite, BlogPosting.
- 404 page styled as "404: command not found" with suggested links.
- Run a Lighthouse audit (mobile) and fix issues until ≥95 in all categories. Check for CLS from fonts and the hero animation.
- Accessibility pass: keyboard-only walkthrough, focus order, contrast, reduced motion, alt text.
Report what you changed and the final scores.
```

## Prompt 10 — Deploy to Vercel + domain

```
Prepare for Vercel deployment:
- Add vercel.json only if needed (security headers: CSP allowing Vercel analytics, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy). Prefer headers() in next.config if cleaner.
- Write README.md: local dev, env vars, content editing guide (how to add a role, project, product, post), deploy steps.
- Give me step-by-step instructions (do not run them) for:
  1. pushing to GitHub and importing into Vercel,
  2. setting env vars (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL) for Production and Preview,
  3. adding brayanperera.cyou and www.brayanperera.cyou to the Vercel project (apex A record / www CNAME to Vercel, redirect www → apex), and what to set at my DNS provider,
  4. verifying the Resend sending domain (SPF/DKIM records),
  5. enabling Web Analytics and Speed Insights in the Vercel dashboard.
- Finally list every remaining TODO(brayan) in the codebase.
```

---

## Before you run Prompt 02 — fill these in
- **Current status at Teel Technologies** — still there, or ended when you went full-time on Aakasa? Also the Aakasa Digital start year.
- **Public email** for the site, plus GitHub / X handles.
- **Product names**: final names after the rebrand, live URLs, status, and screenshots for each.
- **Headshot or avatar**: optional. The design works with a "BP" monogram if you'd rather not use a photo.
- **Anything newer on LinkedIn** that Toptal doesn't have: roles, recommendations, or achievements.
- **Accent colour**: terminal green `#3ddc84` or cyan `#22d3ee`.
