# Claude — Project Context

Concise, durable knowledge for working in this repo. Chronological session notes live in `SESSION_LOG.md` — read it for *what was done when*; read this for *how this project actually works*.

## What this is

Next.js 16 landing site + admin-managed content for Mickaël Ranaivoson (freelance dev, La Réunion). Single-admin CMS covering **blog, portfolio (projects), testimonials**, French UI, dark "Deep Slate & Gold" design system (`#ffa800` on `slate-950`). The landing sections `Realizations` (portfolio) and `Testimonials` are DB-driven and render nothing when empty; bespoke sections (`Solutions` bento, `Pricing`, `About`) stay hardcoded by design.

## Stack

- **Next.js 16** App Router, React 19, TypeScript, Turbopack build
- **DB**: Prisma 5 + NeonDB serverless (PostgreSQL)
- **Auth**: NextAuth v5 beta (credentials, JWT, 8h)
- **Editor**: TipTap v3 (`@tiptap/react/menus` for BubbleMenu)
- **Images**: Cloudinary via `next-cloudinary` (`CldUploadWidget`)
- **Styling**: Tailwind 4, `@tailwindcss/typography`, `framer-motion`, `lucide-react`
- **Forms**: react-hook-form + zod

## Commands

```bash
npm run dev           # next dev (port 3000)
npm run build         # prisma generate && next build
npm run lint          # eslint
npm run create-admin  # node scripts/create-admin.mjs
```

Build runs Prisma generate first because Vercel needs it (see commit `f4b3d5e`).

## Repo layout

```
app/
  blog/                 public blog (list, [slug], opengraph-image.tsx)
  dashboard/            admin (blog, projects, testimonials, account) — gated
  login/                sign-in + "magic-link request" disclosure; login/verify confirms a link
  api/                  auth, contact, kap-lead
  globals.css           Tailwind + design tokens + tiptap table styles
actions/
  blog.actions.ts       blog mutations (use server, requireAdmin)
  blog-public.actions.ts  public blog reads (NO noStore, see Gotchas)
  project.actions.ts    portfolio CRUD + getPublishedProjects (public read)
  testimonial.actions.ts testimonials CRUD + getPublishedTestimonials (public read)
  auth.actions.ts       login, logout, requestLoginLinkAction, verifyMagicLinkAction
  account.actions.ts    changePasswordAction (authenticated, no current pw required)
components/
  admin/                RichTextEditor, PostForm, ProjectForm, ProjectsTable, TestimonialForm, ChangePasswordForm, ImageUpload, …
  blog/                 ArticleContent, ArticleCard, ShareButtons, BlogGrid
  layout/               Realizations + ClientProof (DB-driven), Testimonials, Pricing, About, Contact, Footer/Header (hide on /dashboard, /login)
  ui/                   TurnstileWidget (explicit-render Cloudflare widget), …
lib/
  data.ts               SITE_CONFIG.socials = source of truth for social links
  blog-utils.ts         slugify, sanitizeContent, optimizeCloudinaryUrl, POST_TAGS
  auth-tokens.ts        magic-link token gen + SHA-256 hash (shared by auth.ts + actions)
  turnstile.ts          server-side Turnstile verification (graceful if key absent)
  prisma.ts
prisma/
  schema.prisma         Post, User, Testimonial, Subscriber, Project, LoginToken, KapNumerikLead
auth.ts, auth.config.ts NextAuth config (gates only /dashboard; "credentials" + "magic-token" providers)
next.config.ts          security headers + images.remotePatterns (Cloudinary)
```

No `middleware.ts` at root — NextAuth's auth handler is the only middleware (shows as `ƒ Proxy (Middleware)` in build output).

## Conventions

- **Language**: All user-facing strings in French. Code/identifiers in English.
- **Design tokens**: gold `#ffa800` / `#ffb92e`, dark `slate-950` / `slate-900`. Buttons use `text-slate-950` on gold. Glass surfaces: `bg-slate-900/60 border border-white/10`.
- **Server actions**: every admin mutation calls `requireAdmin()` first, then revalidates. Blog uses `revalidateAll(slug)` → `revalidatePath('/blog', '/blog/<slug>', '/', '/sitemap.xml', '/feed.xml', '/dashboard/blog')`. Portfolio (`project.actions.ts`) and testimonials (`testimonial.actions.ts`) mirror the pattern with their own `revalidateAll()` hitting `/` + their dashboard path (`/dashboard/projects`, `/dashboard/testimonials`).
- **New admin section pattern**: portfolio/testimonials/account were all cloned from the same shape — `actions/*.actions.ts` (requireAdmin CRUD + a public `getPublished*`), `components/admin/*Form.tsx` + `*Table.tsx`, `app/dashboard/<section>/{page,new,[id]}.tsx`, a sidebar link in `dashboard/layout.tsx`, and a DB-driven `layout/` component that returns `null` when empty. Reuse it for any new editable section.
- **Prose styles** are inline in `ArticleContent.tsx` (and mirrored in `ArticlePreview.tsx`). Table styles live in `globals.css` because they apply to both editor and public render.
- **Cover image** recommended: 1600 × 900 (16:9), JPG/WebP, < 500 KB. Body images square: 1200 × 1200.

## Gotchas (read before changing related code)

### Don't use `noStore()` in public read actions
The blog pages use ISR (`export const revalidate = 60` + `generateStaticParams`). Adding `unstable_noStore()` to actions called by these pages forces dynamic rendering and Next 16 throws `DYNAMIC_SERVER_USAGE` (HTTP 500) at request time. Cache freshness is already handled by ISR + `revalidatePath` in mutations. Fixed in commit `17c8829`.

### Don't set `openGraph.images` in `generateMetadata` for blog posts
`app/blog/[slug]/opengraph-image.tsx` is the source of truth. Setting `openGraph.images` (or `twitter.images`) in `generateMetadata` *overrides* the file-based route and points scrapers to the raw Cloudinary URL with declared dimensions that may not match. Leave both fields out — Next.js auto-discovers the file. Fixed in commit `0a65fca`.

### Cloudinary must be in `next.config.ts > images.remotePatterns`
Otherwise `next/image` silently fails to render the cover. Already configured for `res.cloudinary.com/**`. If we add another image host, add it there.

### Cloudinary delivery optimization is opt-in via the URL
The upload preset stores the original. Optimization (`f_auto,q_auto,w_…`) only happens when the URL contains those transforms.
- Cover: handled by `optimizeCloudinaryUrl()` (called explicitly).
- Inline body images: handled inside `sanitizeContent()` which rewrites `<img>` srcs to inject `f_auto,q_auto,w_1200`.
- OG image route: rewrites the cover with `f_auto,q_auto,w_1200,h_630,c_fill,g_auto`.

### TipTap v3 specifics
- Use `import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table"` — named exports only.
- `BubbleMenu` and `FloatingMenu` come from `@tiptap/react/menus`, not `@tiptap/react`.
- `useEditor` requires `immediatelyRender: false` to avoid Next 16 hydration mismatch.

### `sanitizeContent` is the single sanitizer + rewriter
Anything rendered via `dangerouslySetInnerHTML` from the editor (public article, admin preview) goes through it. It strips `<script>`, `<style>`, inline event handlers, `javascript:` and non-image `data:` URIs, AND rewrites Cloudinary `<img>` URLs for delivery optimization.

### Vercel cache vs Facebook cache
- `x-vercel-cache: STALE` on a 200 response is normal during ISR revalidation, not an error.
- Facebook's Sharing Debugger caches scrape results aggressively. After a fix, may need 2-3 "Re-collecter" clicks, or test with a `?v=N` cache buster, or rely on LinkedIn Post Inspector to confirm OG works.

### Neon cold-start can fail `next build` (false alarm)
Neon serverless auto-suspends. The first query after idle takes ~8 s to wake the compute, and `next build` fans static generation across 11 workers that all hit the DB at once (`/`, `/blog`, `/blog/[slug]` read projects/posts) — several time out with `PrismaClientInitializationError` / `PrismaClientKnownRequestError`. This is **not a code bug**. Warm the DB first (any quick query) then rebuild, or on Vercel just **Redeploy**. The error page reported varies between retries — a tell-tale sign it's connectivity, not logic.

### Anti-bot is layered on the public forms (Contact + Kap Numérik)
Two layers, both must be kept when editing those forms/routes:
1. **Honeypot** — hidden `company_url` field (off-screen, `tabIndex -1`, `aria-hidden`). If filled, the API returns a *fake success* (no email / no DB write) so the bot doesn't retry. First check in `/api/contact` and `/api/kap-lead`.
2. **Cloudflare Turnstile** — `components/ui/TurnstileWidget` posts a `turnstileToken`; `lib/turnstile.ts > verifyTurnstile()` checks it server-side *after* the honeypot. **Degrades gracefully**: if `TURNSTILE_SECRET_KEY` is unset it returns `true` (lets traffic through), so local dev without keys still works. Login is intentionally left without Turnstile (single admin + password + magic link + rate-limit).

## Auth model

Single admin user, seeded via `npm run create-admin`. Credentials in `.env.local` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`). NextAuth `authorized` callback (`auth.config.ts`) only blocks `/dashboard/**`; everything else is public. Sign-in at `/login`, sign-out via Server Action in dashboard layout.

Two ways in, both via providers in `auth.ts`:
- **Password** (`credentials` provider) — the normal path.
- **Magic link** (`magic-token` provider) — recovery for forgotten passwords. `/login` has a "Mot de passe oublié ?" disclosure → `requestLoginLinkAction` emails a one-time link (token SHA-256-hashed in `LoginToken`, 15-min TTL, single-use, anti-enumeration, max 5/5min). The email lands on `/login/verify` with a **confirm button** (a GET preview/scan must not consume the single-use token). Sent through the existing nodemailer/Gmail transport (`SMTP_USER`/`SMTP_PASSWORD`).
- **Change password** at `/dashboard/account` (`changePasswordAction`) — deliberately does **not** require the current password, so the admin can set a memorable one right after logging in via magic link. The authenticated session is the gate.

## Env vars

Required:
- `DATABASE_URL` (Neon connection string)
- `AUTH_SECRET`
- `NEXTAUTH_URL` (full domain in prod)

Optional but expected:
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` (without these, `ImageUpload` falls back to a URL input)
- `SMTP_USER` / `SMTP_PASSWORD` (nodemailer/Gmail) — powers `/api/contact`, `/api/kap-lead` **and** the magic-link login email
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` (Cloudflare Turnstile on the public forms; if absent, verification is skipped — see Gotchas). Add to both Vercel and `.env.local`; Vercel vars are not available to `next dev`.

## Working with this repo

- Always run `npx next build` after non-trivial changes — catches type errors and SSR issues that `next dev` misses.
- After editing `next.config.ts`, the dev server needs a restart (Next does not hot-reload it).
- Windows shell is bash via Git Bash; PowerShell is also available. Paths can be Windows-style in Bash: forward slashes work.
- Commit messages follow `type(scope): summary` (e.g., `feat(blog):`, `fix(build):`). Never amend pushed commits — create new ones.
