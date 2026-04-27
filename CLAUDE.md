# Claude — Project Context

Concise, durable knowledge for working in this repo. Chronological session notes live in `SESSION_LOG.md` — read it for *what was done when*; read this for *how this project actually works*.

## What this is

Next.js 16 landing site + admin-managed blog for Mickaël Ranaivoson (freelance dev, La Réunion). Single-admin CMS, French UI, dark "Deep Slate & Gold" design system (`#ffa800` on `slate-950`).

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
  dashboard/            admin (blog, testimonials) — gated
  api/                  auth, contact, kap-lead
  globals.css           Tailwind + design tokens + tiptap table styles
actions/
  blog.actions.ts       admin mutations (use server, requireAdmin)
  blog-public.actions.ts  public reads (NO noStore, see Gotchas)
components/
  admin/                RichTextEditor, PostForm, ImageUpload, ArticlePreview, …
  blog/                 ArticleContent, ArticleCard, ShareButtons, BlogGrid
  layout/               Footer, Header (both hide on /dashboard, /login)
lib/
  data.ts               SITE_CONFIG.socials = source of truth for social links
  blog-utils.ts         slugify, sanitizeContent, optimizeCloudinaryUrl, POST_TAGS
  prisma.ts
prisma/
  schema.prisma         Post, User, Testimonial, Subscriber
auth.ts, auth.config.ts NextAuth config (gates only /dashboard)
next.config.ts          security headers + images.remotePatterns (Cloudinary)
```

No `middleware.ts` at root — NextAuth's auth handler is the only middleware (shows as `ƒ Proxy (Middleware)` in build output).

## Conventions

- **Language**: All user-facing strings in French. Code/identifiers in English.
- **Design tokens**: gold `#ffa800` / `#ffb92e`, dark `slate-950` / `slate-900`. Buttons use `text-slate-950` on gold. Glass surfaces: `bg-slate-900/60 border border-white/10`.
- **Server actions**: every admin mutation calls `requireAdmin()` first, then `revalidatePath('/blog', '/blog/<slug>', '/', '/sitemap.xml', '/feed.xml', '/dashboard/blog')` via `revalidateAll(slug)`.
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

## Auth model

Single admin user, seeded via `npm run create-admin`. Credentials in `.env.local` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`). NextAuth `authorized` callback (`auth.config.ts`) only blocks `/dashboard/**`; everything else is public. Sign-in at `/login`, sign-out via Server Action in dashboard layout.

## Env vars

Required:
- `DATABASE_URL` (Neon connection string)
- `AUTH_SECRET`
- `NEXTAUTH_URL` (full domain in prod)

Optional but expected:
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` (without these, `ImageUpload` falls back to a URL input)
- `RESEND_API_KEY` / SMTP for `/api/contact` and `/api/kap-lead`

## Working with this repo

- Always run `npx next build` after non-trivial changes — catches type errors and SSR issues that `next dev` misses.
- After editing `next.config.ts`, the dev server needs a restart (Next does not hot-reload it).
- Windows shell is bash via Git Bash; PowerShell is also available. Paths can be Windows-style in Bash: forward slashes work.
- Commit messages follow `type(scope): summary` (e.g., `feat(blog):`, `fix(build):`). Never amend pushed commits — create new ones.
