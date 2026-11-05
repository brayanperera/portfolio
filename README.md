# brayanperera.cyou

Personal portfolio of Brayan Perera. Next.js App Router, TypeScript, Tailwind CSS v4, MDX and Resend, deployed on Vercel. See `CLAUDE.md` for positioning, design rules and quality bars.

## Local development

Requires Node.js 24 and pnpm.

```bash
pnpm install
```

```bash
pnpm dev
```

The site runs at http://localhost:3000. Draft blog posts are visible in dev only.

Before calling a change done:

```bash
pnpm lint && pnpm build
```

## Environment variables

Copy `.env.example` to `.env.local`. All three are server-only. Without them the site works, but the contact form returns "not available".

| Variable             | Purpose                                                         |
| -------------------- | --------------------------------------------------------------- |
| `RESEND_API_KEY`     | Resend API key                                                  |
| `CONTACT_TO_EMAIL`   | Inbox that receives enquiries                                   |
| `CONTACT_FROM_EMAIL` | Verified sender, e.g. `Brayan Perera <hello@brayanperera.cyou>` |

## Editing content

All personal data lives in `src/content/`. The site, CV PDF, JSON-LD and OG images all read from it, so a change there updates everything. Unconfirmed values are `null` and the UI hides them. Search for `TODO(brayan)` to find them.

**Add a role:** add an entry at the correct position (newest first) in `src/content/experience.ts`. Roles with the same `group` that sit next to each other render as one progression. The CV shows the first four in full and condenses the rest.

**Add a career project:** add an entry to `careerProjects` in `src/content/projects.ts`. Set `featured: true` to show it on the home page and CV. For a long-form body, add `src/content/projects/<slug>.mdx`.

**Add or update a product:** edit `products` in `src/content/projects.ts`. Status is one of `running`, `beta`, `building`, `archived`. For a screenshot, save it as `public/products/<slug>.webp` and set `screenshot: "/products/<slug>.webp"`.

**Add an architecture diagram:** add a spec to `diagrams` in `src/components/mdx/diagram.tsx` and use `<Diagram name="your-spec" />` in MDX.

**Add a blog post:** create `src/content/posts/<slug>.mdx`:

```mdx
---
title: "Post title"
description: "One sentence."
date: "2026-11-05"
tags: ["aws", "terraform"]
draft: false
---

## First heading
```

Code blocks accept a filename and highlighted lines, as in ` ```ts title="main.ts" {2} `. MDX can use `<Callout title="note">…</Callout>` and standard Markdown images. MDX expressions are disabled, so use `{/* comments */}` only for notes.

**Change the accent colour:** edit `--accent-rgb` and `--success` in `src/app/globals.css`, then `ACCENT` in `src/lib/og.tsx` and the colour in `src/lib/monogram.tsx`, which render outside the browser and cannot read CSS variables.

## Deploying

### 1. Push to GitHub and import into Vercel

1. Merge this work to `main` and push it to the `origin` remote.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the detected Next.js preset and pnpm. No build settings need changing.

### 2. Set environment variables

In **Project → Settings → Environment Variables**, add `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`. Tick **Production** and **Preview** for each, then redeploy so they apply.

### 3. Add the domain

In **Project → Settings → Domains**, add `brayanperera.cyou` and `www.brayanperera.cyou`. Set `www` to redirect to the apex with a 308.

At your DNS provider:

| Type  | Name  | Value                                                   |
| ----- | ----- | ------------------------------------------------------- |
| A     | `@`   | The IP Vercel shows, usually `76.76.21.21`              |
| CNAME | `www` | The target Vercel shows, usually `cname.vercel-dns.com` |

Use the exact values shown in the Vercel domain panel if they differ. Remove any older A, AAAA or CNAME records on those names. Vercel issues HTTPS certificates once DNS resolves.

The site sends HSTS with `includeSubDomains`, so every subdomain of `brayanperera.cyou` must serve HTTPS. If that is a problem, remove `includeSubDomains` in `next.config.ts` before going live.

### 4. Verify the Resend sending domain

1. In Resend, go to **Domains → Add Domain** and enter `brayanperera.cyou`. A subdomain such as `mail.brayanperera.cyou` also works and keeps sender reputation separate.
2. Add the records Resend displays at your DNS provider: the DKIM TXT record, plus the MX and SPF TXT records for the sending subdomain. Copy them exactly, since values differ per account.
3. Click **Verify** and wait for the status to show **Verified**.
4. Create an API key with **Sending access** only, and use it as `RESEND_API_KEY`.
5. Set `CONTACT_FROM_EMAIL` to an address on the verified domain.
6. Send a test through the live form and confirm both the enquiry and the acknowledgement arrive.

### 5. Enable analytics

In the Vercel project, open **Analytics** and **Speed Insights** and enable each one. The components are already in the root layout and the CSP allows them. Outside Vercel their scripts return 404, which is expected and logs console errors locally.

## Notes

- **Contact rate limit:** in-memory per serverless instance, so it only slows casual abuse. Upstash Redis or Vercel KV could replace it in `src/lib/rate-limit.ts`.
- **TypeScript is pinned to v6** because `typescript-eslint` does not yet support v7.
- **Keep zod out of client code.** Its eval probe trips the Content-Security-Policy. Shared values belong in `src/lib/contact-types.ts`.
- **CSP uses `'unsafe-inline'` for scripts** because statically generated pages cannot carry per-request nonces.
- **Fonts** in `src/assets/fonts` (Inter, JetBrains Mono, both SIL OFL) are Latin subsets for the CV and OG images. They have no `→` glyph, so those renderers replace it with "to".
