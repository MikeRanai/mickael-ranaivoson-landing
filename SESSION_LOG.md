# Session Log & Development Guidelines

This document summarizes the development session and establishes key rules for future implementations to ensure consistency and quality.

## Session Summary (Jul 17, 2026)

Suite de la roadmap conversion (M1) : vérifications post-redeploy + backlinks footer sur les sites clients livrés.

### 1. Vérif post-redeploy `ad6dcf2` — incohérence détectée sur la carte HCO
La page étude de cas `/realisations/hockey-club-de-louest` affiche bien les claims vérifiés (90+ mobile / 100 desktop, 100/100 a11y-BP-SEO, 1ʳᵉ page « hockey réunion », 12 inscriptions). **Mais la carte HCO de la home affiche encore « Score PageSpeed 95+ (mobile) »** — le claim invalidé le 16/07. Cause : le SQL du 16/07 a mis à jour `kpis` + `content`, or la carte non-featured affiche `bullets` (les `kpis` ne s'affichent que sur la carte featured + la page étude de cas). Correctif écrit dans `scripts/sql/2026-07-17-hco-bullets.sql` — à exécuter via `!` (pattern habituel), puis redeploy (home statique).

### 2. Backlinks footer « Site réalisé par Mickaël Ranaivoson » — 4/5 sites faits, vérifiés en prod
- **hco-website** (commit `b888f1e`) : lien dans la bottom bar → étude de cas `/realisations/hockey-club-de-louest`. ✅ prod.
- **culture-afro** (commits `2259484` + `d899876`) : **piège** — le crédit de la home n'est pas dans `Footer.tsx` mais dans un bloc footer inline de `src/app/(public)/page.tsx` (composant `FooterEditorial`). Le 1ᵉʳ commit ne changeait rien en prod ; diagnostiqué en comparant le HTML servi au code local. ✅ prod.
- **fd-sav-2026** (commit `d07b735`) : lien dans `site-footer.tsx` → home. ✅ prod (fd-sav-2026.vercel.app — pas de domaine custom, valeur SEO moindre).
- **LRH = dossier local `siteweb/`** (commit `0262fcd`) : remote `git@github-lrh:siteweblrh/siteweb.git` (compte GitHub séparé `siteweblrh`, alias SSH `github-lrh`), domaine `lrh.re`. Lien uppercase dans la barre du bas de `components/lrh/sections/Footer.tsx`.
- **Piège évité** : CA, FD et LRH pointent vers la home, pas vers leurs études de cas — leurs slugs existent en base mais sans `content`, donc `/realisations/[slug]` répond 404 (`notFound()` si `!project.content`). Upgrader en deep links quand les études de cas seront rédigées.
- **Reste NoutAsso** : projet Vercel `nout-asso` (noutasso.fr) existe dans la team, mais la codebase est introuvable en local (le dossier `nout-asso/` = assets seulement) et sur les 3 comptes GitHub (MikeRanai, mr-digital-solutions-974, mickaelranaivoson-tech). Demander à Mickaël où vit ce code. (`money-az/` = gestion-finances → gereaou.noutasso.fr, produit, pas le site vitrine.)

## Session Summary (Jul 16, 2026)

Audit SEO/conversion complet de la landing, puis exécution du « trio semaine 1 » de la roadmap conversion. Constat central de l'audit : le socle technique est bon ; ce qui bloque, c'est le positionnement (site orienté TPE/artisans 974 vs cible élargie PME/SaaS/tourisme), la preuve (0 témoignage, 1 étude de cas sans chiffres) et la mesure (aucun événement de conversion).

### 1. CTA pricing débloqué + wording Kap Numérik « standby » (commit `1a08667`)
La carte « Gain de temps » (offre star) avait pour CTA principal *« M'alerter à la réouverture »* du Kap Numérik — un cul-de-sac tant que le dispositif est suspendu. Le CTA principal devient **« Obtenir mon estimation gratuite »** (`?type=devis#contact`) ; l'alerte Kap passe en lien secondaire sous le bouton. Tous les textes qui promettaient une réouverture datée (« réouverture 2026 », « rouvre prochainement ») sont passés à un wording honnête « dès la réouverture » / « en pause » (Hero badge, Pricing, formulaire éligibilité du Contact).

### 2. Tracking de conversion Vercel Analytics (commit `f79ec04`)
- `lib/analytics.ts` : helper client `trackEvent()` + constantes `EVENTS` (noms figés : `cta_click`, `contact_submit`, `kap_lead_submit`, `newsletter_signup`).
- `components/ui/tracked-link.tsx` : `<Link>` client qui track au clic — nécessaire pour instrumenter les Server Components (Pricing, Realizations). **Piège RSC** : un Server Component ne peut pas importer les constantes du module client → il passe le nom d'événement en littéral.
- Instrumenté : 2 CTA Hero, 4 CTA Pricing, liens études de cas/projets de Realizations (+ « toutes les réalisations »), succès des 3 formulaires (contact avec `formType`, lead Kap avec `activityType`, newsletter).
- À vérifier côté dashboard Vercel : les custom events doivent apparaître dans l'onglet Web Analytics (quota d'événements limité sur plan Hobby).

### 3. Témoignages (hors code — action Mickaël)
Le module admin est prêt ; la section s'affiche dès 1 témoignage publié. Reste à collecter 3-4 retours clients (HCO, LRH, NoutAsso, FD Informatique) — message type fourni en session.

### 4. Étude de cas HCO chiffrée (même session, suite — SQL exécuté par Mickaël + commit `ad6dcf2`)
Méthode : mesures PageSpeed réelles sur hcouest.fr (via pagespeed.web.dev) + archive Wayback de sept. 2024 pour le « avant » (WordPress + thème Divi 4.27.1). Première mesure : **68 mobile** — l'ancien claim « 95+ mobile » était faux (LCP 6,6 s : logo animé = élément LCP retardé de ~1,9 s par l'hydratation + 252 Kio JS inutilisé). Mickaël a corrigé le site HCO → re-mesuré **92-99 mobile / 100 desktop**. Contenu + KPIs mis à jour en base (SQL via `!`, pattern habituel) : claim prudent « 90+ mobile (100 desktop) » (variance Lighthouse), 100/100 accessibilité/BP/SEO, 12 inscriptions en ligne 1ʳᵉ saison, 1ʳᵉ page Google « hockey réunion ». Leçons : ne jamais publier un score au-dessus du pire run observé ; inviter le lecteur à re-tester lui-même (preuve > affirmation) ; la home est statique → un changement DB seul exige un redeploy (d'où le commit vide `ad6dcf2`).



Visual identity overhaul (landed after the Jun 20 log was written) + a security header. Goal stated by the user on the hero: **"moins générique"** — kill the interchangeable blurred-blob SaaS look and root the design in La Réunion.

### 1. Content-Security-Policy (commit `9a30225`)
Added a CSP with a targeted allowlist in `next.config.ts` security headers (alongside the existing headers). Scoped to what the site actually loads — Cloudinary, Vercel analytics, Cloudflare Turnstile — rather than a blanket `unsafe-*`.

### 2. Topographic identity in the hero (commit `8211aba`)
Replaced the generic animated blurred blobs with a **topographic contour-line motif** evoking the cirques of La Réunion. New `components/ui/topo-background.tsx`: inline vector SVG (zero network request) + `radial-gradient` halos — **no `blur-[…]` GPU passes**, no animation (neutral for LCP and CPU/GPU budget). Purely decorative → `aria-hidden`.

### 3. Background unification (commits `58eb820`, `447a677`, `5df5072`)
- `TopoBackground` made reusable section-by-section via props (`glow`, `lines`). Showcase sections use `lines={false}` (halos only); the hero shows the contour lines.
- Titles moved to **Oswald** (condensed display font, loaded in `app/layout.tsx`, mapped `font-oswald` in `tailwind.config.ts`; weight 700 loaded explicitly to avoid faux-bold synthesis). Shared `components/ui/section-header.tsx` carries the gold eyebrow label + Oswald `<h2>`. **Bebas Neue** (`font-bebas`) stays as an accent font (TechStack marquee, Testimonials) — intentional, not a leftover.
- `5df5072`: finished the unification the earlier commit started — the 4 sections still on the old look (**Solutions** + **Contact** on `blur-3xl` blobs, **Pricing** + **TechBenefits** flat) all switched to `<TopoBackground lines={false} />`. Removes the last generic blurred blobs and is lighter on GPU.

### 4. Per-section halo variants (commit `6b7b985`)
With every section sharing the same halo positions, the result read as repetitive on scroll. `TopoBackground` now takes a `variant` (`a`/`b`/`c`/`d`) placing gold/blue on the 4 diagonals. Assigned in scroll order with no consecutive repeats: Hero `a`, Solutions `b`, Realizations `c`, Testimonials `d`, TechBenefits `a`, About `b`, LatestPosts `c`, Pricing `d`, Contact `a`, Footer `b`. The 8 `bg-[radial-gradient(…)]` strings are written out in full so the Tailwind JIT detects them (no dynamic class concatenation).

**Verdict on the header-less strips (audited, left as-is):** `ClientProof` and `TechStack` are thin trust bands (`border-y`, small uppercase labels) and `KapNumerikLeadMagnet` is a card embedded in Pricing with a *contained* glow — none should carry a full `SectionHeader`/`TopoBackground`. Forcing the treatment would flatten the visual hierarchy. Proportionality again: not every section is a "section."

## Session Summary (Jun 20, 2026)

Improvement pass driven by a "what's worth adding?" audit. Recurring theme again: **proportionality** — measure before building, fix what's broken, finish or delete dead code rather than pile on features.

### 1. Web analytics (commit `1640cef`)
Added `@vercel/analytics` + `@vercel/speed-insights` in `app/layout.tsx` (`<Analytics />` + `<SpeedInsights />`). There was **no analytics at all** before — every other decision was flying blind. Must be enabled once per project in the Vercel dashboard (Analytics + Speed Insights tabs) for the data to show.

### 2. CSS import type declaration (commit `17bf1c8`)
Added `types/css.d.ts` (`declare module "*.css";`) to silence the editor's TS2882 on `import "./globals.css"`. Pre-existing latent issue, surfaced only because the analytics imports shifted the line. No build impact (Next/Turbopack handle CSS).

### 3. JSON-LD audit — already present, fixed two real bugs (commit `f247d9a`)
The structured data was **already there and thorough** (`LocalBusiness` + `Person` + `WebSite` `@graph` on home, `BlogPosting` on articles) — did not re-add it. But found two bugs while reading:
- `LocalBusiness.logo` pointed to `/images/logo.png` which **does not exist** (404). → `mr-logo.svg`.
- Article `publisher.logo` used `mr-logo-blanc.svg` (near-white `#fbfdff`, **invisible** on Google's light backgrounds). → `mr-logo.svg` (dark blue `#133e70`, square viewBox).
- Added a `BreadcrumbList` to articles (Accueil › Blog › titre) for breadcrumb rich results. Converted the article JSON-LD to a `@graph`.

### 4. Newsletter capture — finished the orphaned Subscriber model (commit `8ab7a51`)
`Subscriber` had **zero code references** — dead model. Chose to finish the loop (vs delete) since the blog + nodemailer infra was already there. Built the minimal capture, cloned from the existing admin-section shape:
- `actions/subscriber.actions.ts` — public `subscribeToNewsletter` (zod email + honeypot `company_url` + idempotent dedupe on the unique constraint, treats `P2002` as success for anti-enumeration) + admin `getSubscribers`/`deleteSubscriber`.
- `components/blog/NewsletterSignup.tsx` — calls the server action directly (no API route), rendered at the bottom of every article.
- `app/dashboard/subscribers/page.tsx` + `components/admin/SubscribersTable.tsx` (list, delete, **client-side CSV export**) + "Abonnés" sidebar link.

**Design decisions (kept):** no Turnstile on this form — only the honeypot. Newsletter signup has near-zero abuse value (inserts an email) and a Cloudflare widget would add friction to a one-click signup; the high-stakes forms (Contact, Kap) keep both layers. And **no automated sending** — the admin owns the list and exports CSV to email on their own terms, no recurring-send commitment baked into the code.

## Session Summary (Jun 1, 2026)

Extended the dashboard to make more of the landing administrable, ran a conversion pass on the funnel, hardened auth recovery, and added bot protection to the public forms. Recurring theme: **proportionality** — build CRUD only where content changes often + has a regular structure; leave bespoke/rarely-changing sections in code.

### 1. Portfolio administrable (commit `17defa2`)
New `Project` Prisma model (`featured`, `accentColor`, `bullets String[]`, `kpis Json`, `displayOrder`, `published`…), pushed to Neon via `prisma db push`. Cloned the Testimonial CRUD shape end-to-end: `actions/project.actions.ts` (requireAdmin CRUD + public `getPublishedProjects`), `ProjectForm` (with a `useFieldArray` for KPIs, bullets one-per-line, Cloudinary `ImageUpload`) + `ProjectsTable`, dashboard pages, and a "Projets" sidebar link. `Realizations.tsx` was rewritten from hardcoded JSX into an async server component reading the DB — **faithfully reproducing the bespoke design** (featured card + KPI grid, accent-colored grid cards, "Projet confidentiel" placeholder when no image). Accent colors use a static class lookup map (Tailwind can't JIT dynamic class names). `scripts/seed-projects.mjs` seeded the 4 historical projects so nothing was lost.

**Design decision (kept for future):** Solutions (bento), Pricing, and About stay hardcoded. They're bespoke, layout-is-content, and change rarely — a generic CMS would wreck them for no real gain. Only the illustrations in Solutions are static files; swapping them = replace file + redeploy.

### 2. Conversion pass — hero + early social proof (commits `39ef2b9`, `6ca0afe`, `656e585`)
- **Hero** (`Hero.tsx`): swapped the headline to a pain-led, on-brand line — "Arrêtez de perdre vos soirées sur la paperasse." — with a tightened subtitle naming the audience (TPE, artisans, associations 974), plus a discreet trust strip under the CTAs (Saint-Paul 974 · Devis gratuit · Éligible Kap Numérik). Note: the live hero copy lives **inline in `Hero.tsx`**, not in `lib/data.ts`. The stale `HERO_CONTENT` constant there was dead code (nothing imported it) and was removed.
- **ClientProof** (`components/layout/ClientProof.tsx`): a "Ils m'ont fait confiance" strip placed right after the hero (before the tech marquee), reading published projects from the DB — business-audience proof vs the dev-oriented `TechStack`. Returns `null` under 2 clients.
- **Audit finding (content, not code):** 0 testimonials in DB → the single biggest credibility gap. Tooling is ready; the admin just needs to publish 1-3. Also flagged that the NoutAsso KPIs were originally annotated as placeholders — must be verified as real.

### 3. Auth recovery — magic link + change password (commits `8bf00df`, `94677a1`)
Root-cause fix for "I forget my password sometimes" without removing the password. Added a `magic-token` Credentials provider in `auth.ts` and a `LoginToken` model (SHA-256-hashed token, 15-min TTL, single-use). `/login` gained a sober "Mot de passe oublié ?" disclosure → emails a one-time link (anti-enumeration generic message, max 5/5min). `/login/verify` uses a **confirm button** so an email scanner's GET prefetch can't burn the single-use token. Email reuses the existing nodemailer/Gmail transport. Added `/dashboard/account` (`changePasswordAction`) — **no current password required** (the authenticated session is the gate), so the admin can set a memorable password right after a magic-link login.

### 4. Anti-bot on public forms (commits `20661bb`, `006b645`)
Two layers on Contact + Kap Numérik (login left clean by design):
- **Honeypot** (free, zero-friction): hidden `company_url` field; if filled, the API returns a fake success without processing.
- **Cloudflare Turnstile** (Cloudflare already in the stack): `TurnstileWidget` (explicit render, dark theme, auto-refresh) + `lib/turnstile.ts > verifyTurnstile()` server-side after the honeypot. Degrades gracefully when `TURNSTILE_SECRET_KEY` is unset. Noted the in-memory rate-limit is weak on serverless (per-instance, ephemeral) — a real limiter would need Upstash/Redis (deferred).

**Lesson:** Neon cold-start (~8 s wake) made `next build` fail 3× with rotating Prisma errors across different pages — environmental, not code. Warm the DB then rebuild (or Redeploy on Vercel). Documented in `CLAUDE.md` Gotchas.

## Session Summary (Apr 28, 2026)

Diagnosed two reported issues — Facebook OG cover not displaying and missing favicon in Google search results — and fixed both, plus tightened the home OG metadata.

### 1. Facebook OG cover — blog post specific (commit `6b2bc52`)
Initial audit on the home page found everything technically conforming (correct og:image, dimensions, type, absolute URL via `metadataBase`, image served 200 OK at 1200×630, 181 KB). When the user pointed at the actual URL being shared — a blog post — two real bugs surfaced:

- **No description tags emitted at all.** `app/blog/[slug]/page.tsx` was building the description as `post.metaDescription ?? post.excerpt ?? generateExcerpt(post.content, 160)`. Nullish coalescing keeps empty strings, and TipTap-saved posts often have `metaDescription = ""` rather than null — so description fell through as `""` and Next.js omitted `<meta name="description">`, `og:description`, and `twitter:description` entirely. Meta's scraper frequently refuses to render an image preview when `og:description` is missing. Fix: switch `??` to `||` (also done on the JSON-LD description on the same file).
- **OG image bloated to ~980 KB / 2.7 s download.** `opengraph-image.tsx` was running the Cloudinary cover through `@vercel/og`'s `ImageResponse`, which decodes and re-encodes as unoptimized PNG. With FB's scrape budget around 5–7 s for HTML + image, this was dancing on the edge. Replaced the cover branch with a fetch+stream of the same image through Cloudinary's pipeline (`f_jpg,q_auto:good,w_1200,h_630,c_fill,g_auto`) — drops to ~106 KB JPEG served in <300 ms. `contentType` is now `image/jpeg`. Fallback gradient `ImageResponse` (for posts with no cover) stays.

Confirmed working in the Sharing Debugger after the fix landed. **Lesson learned**: a stale Debugger result was misleading at first — the user's pasted URL had been silently truncated to `…-2026-l/`, scraping a 404 page that inherited the home OG. Always check the "URL recherchée" field in the Debugger output matches what was meant to be tested.

### 2. Home OG defensive hardening (commit `7b08d0b`)
Added `og:image:alt`, `og:image:secure_url`, and `twitter:image:alt` to `app/layout.tsx`. Discovered while implementing that **defining `openGraph.images` in metadata does NOT override Next.js' file-based detection of `app/opengraph-image.png` for og:* tags** (it does for twitter:*, asymmetrically). To take back control of the og:image declaration, moved `app/opengraph-image.png` → `public/opengraph-image.png`. The public URL `/opengraph-image.png` is unchanged; only the auto-detection is disabled. The home OG image now carries the alt text and explicit `secure_url` as intended.

### 3. Google favicon (commit `366720f`)
Two real bugs uncovered by inspecting the production HTML:
- **`app/apple-icon.svg` was 404'ing in production.** Next.js App Router's icon convention only auto-detects `apple-icon.{jpg,jpeg,png}` — the `.svg` variant is silently ignored, so no `<link rel="apple-touch-icon">` was emitted at all.
- **Only an SVG favicon was exposed.** Google does technically support SVG favicons but indexes them poorly, especially when the source has a complex path on a large viewBox (here `viewBox="0 0 8334 8334"` with the MR + Réunion path) — rasterization to 16×16 in the SERP comes out illegible and Google often skips it.

**Fix**:
- Added `app/icon.png` (512×512) alongside the existing `icon.svg` so Next.js emits both `<link rel="icon" type="image/png" sizes="512x512">` and the SVG variant. Google's indexer now has a clean raster to pick from.
- Replaced `app/apple-icon.svg` with `app/apple-icon.png` (180×180) so the apple-touch-icon route resolves correctly.
- Added `scripts/generate-icons.mjs` to regenerate both PNGs from `app/icon.svg` via `sharp` (uses `density: 96, limitInputPixels: false` because the SVG's 8334×8334 viewBox blows past sharp's default pixel limit otherwise).

Build output now includes `/icon.png`, `/icon.svg`, `/apple-icon.png` as static routes; `/apple-icon.svg` is gone.

## Session Summary (Apr 19, 2026)

This session focused on integrating a fully administrable blog module into the landing page, based on `blog-module-template.md`.

### 1. Database & Authentication
- **Prisma Schema**: Added `Post` and `User` models alongside the existing `Subscriber`. The `Post` model includes title, slug, content (sanitized HTML), excerpt, metaDescription, tag, coverImage, published flag, and timestamps with indexes on `[published, publishedAt]` and `slug`.
- **NextAuth v5**: Implemented credentials-based authentication with bcrypt-hashed passwords, JWT sessions (8h max age), and a route handler at `/api/auth/[...nextauth]`.
- **Route Protection**: Used `proxy.ts` (Next 16 convention, replaces deprecated `middleware.ts`) to gate `/dashboard/*` behind auth, redirecting unauthenticated users to `/login`.
- **Admin Seeding Script**: Added `scripts/create-admin.mjs` (`npm run create-admin`) to create/upsert the single admin user with bcrypt hashing (rounds: 12).

### 2. Public Blog
- **Routes**: Created `/blog` (list with client-side search + tag filters) and `/blog/[slug]` (article page with sanitized HTML, JSON-LD `BlogPosting`, share buttons, related posts).
- **Components**: `BlogGrid`, `ArticleCard`, `ArticleContent`, `ShareButtons` — all matching the existing Deep Slate & Gold design system (`#ffa800`, `slate-950`, glassmorphism).
- **SEO**: Per-article `generateMetadata` (canonical, OG, Twitter), dynamic `opengraph-image.tsx` (1200×630 with gradient + post title), and JSON-LD with author/publisher schema.
- **Discovery**: RSS feed at `/feed.xml` (last 30 published posts, escaped XML), sitemap dynamically includes all published posts, and a "Blog" link added to the Header navigation (desktop + mobile menu).

### 3. Admin Dashboard
- **Layout**: Sidebar layout at `/dashboard/*` with auth guard (server-side check + redirect), logout via Server Action, hidden public Header/Footer (added pathname check in both components).
- **CRUD**: `/dashboard/blog` (table with publish toggle and delete), `/dashboard/blog/new` (creation), `/dashboard/blog/[id]` (edition).
- **Form**: `PostForm` uses React Hook Form + Zod validation, auto-slugify from title, character counters for excerpt/metaDescription, separate cards for Publication / Cover Image / SEO.
- **Rich Text Editor**: Full TipTap v3 implementation (`RichTextEditor.tsx`) with toolbar: bold/italic/underline/strike, H2/H3, lists/quote/code/HR, text alignment, links, images (Cloudinary upload widget when configured, else URL prompt), YouTube embeds, undo/redo, character & word count.
- **Image Upload**: `ImageUpload` component using `next-cloudinary` (`CldUploadWidget`) with graceful fallback to a URL input when Cloudinary env vars are missing.

### 4. Security
- **XSS Protection**: `sanitizeContent()` strips `<script>`, `<style>`, inline event handlers, and `javascript:`/non-image `data:` URIs before any `dangerouslySetInnerHTML`.
- **Authorization**: Every mutation in `actions/blog.actions.ts` calls `requireAdmin()` before touching the DB.
- **Slug Validation**: Zod schema enforces `^[a-z0-9-]+$` to prevent path injection.
- **Robots**: `/login` and `/dashboard/*` flagged `noindex, nofollow`.

### 5. Dependencies Added
- **Auth**: `next-auth@beta`, `bcryptjs`, `@types/bcryptjs`
- **Forms**: `react-hook-form`, `@hookform/resolvers`, `zod`
- **Editor**: `@tiptap/react`, `@tiptap/pm`, `@tiptap/starter-kit`, `@tiptap/extension-image`, `@tiptap/extension-link`, `@tiptap/extension-underline`, `@tiptap/extension-text-align`, `@tiptap/extension-youtube`, `@tiptap/extension-character-count`
- **Upload**: `next-cloudinary`
- **Typography**: `@tailwindcss/typography` (added as `@plugin` in `globals.css` for the prose article rendering)

### 6. Required Env Vars
- `AUTH_SECRET` (generated via `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`)
- `NEXTAUTH_URL` (`http://localhost:3000` in dev, full domain in prod)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` (optional — falls back to URL input)

### 7. Type-Safety Notes
- Zod v4 `.default()` on schemas creates input/output type mismatch with React Hook Form's resolver. Resolution: removed `.default()` calls from the Post schema and rely on RHF's `defaultValues` instead.
- TipTap v3 + Next 16 requires `immediatelyRender: false` on `useEditor` to avoid SSR hydration issues.

## Session Summary (Jan 25, 2026)

This session focused on fixing critical SEO issues (Open Graph metadata) and correcting navigation behaviors across the site.

### 1. Navigation & Routing Fixes
- **Absolute Path Navigation**: Fixed a navigation issue where the menu links (e.g., `#solutions`) in the `Header` component were relative, causing them to fail when clicked from non-root pages like `/seo`.
    - **Resolution**: Updated all navigation links in `Header.tsx` (desktop nav, mobile menu, CTA buttons) to use absolute paths with anchors (e.g., `/#solutions`), ensuring they always redirect correctly to the main page's sections.

### 2. SEO & Social Sharing (Open Graph)
- **Metadata Base URL**: Set `metadataBase` in `app/layout.tsx` to `https://www.mickaelranaivoson.fr` to resolve issues with relative image URLs in Open Graph tags.
- **Enhanced Description**: Expanded the site meta description to ~200 characters, incorporating high-value keywords like "Développeur Web Réunion", "Next.js", "SaaS", and "Kap Numérik" for better indexing and click-through rates.
- **Next.js File-Based Metadata**: Removed manual `openGraph: { images: [...] }` configuration in favor of Next.js's native file-based Metadata API.
    - *Action*: The user was instructed to place `opengraph-image.png` in the `app/` directory for automatic generation.

## Session Summary (Jan 23, 2026)

This session focused on adapting the content for better inclusivity, redesigning the personal brand image, and aligning the pricing strategy with the Reunion Island local market and the Kap Numérik grant.

### 1. Inclusivity & Terminology
- **Terminology Update**: Replaced "Entrepreneurs" with **"Structures"** in the Hero section's social proof. "Structures" better represents the diversity of clients, including Associations, Sports Clubs, and TPE/PME.
- **Client Base Expansion**: Added **"Indépendants"** to the list of accompanied entities to fully cover the freelancer/solo-entrepreneur market.
- **Responsive List**: Updated the social proof list with `flex-wrap` and adjusted spacing to ensure it looks clean and stays centered on mobile devices.

### 2. Profile Image & Personal Branding
- **Redesigned About Section Photo**: Transformed the static profile picture into a multi-layered, interactive component.
    - **Background Glow**: Added a subtle, animating `bg-linear-to-tr` gradient glow (Amber/Violet/Blue) behind the photo.
    - **Decorative Layering**: Implemented an offset, semi-transparent border that rotates and scales up on hover, creating depth.
    - **Interactive Image**: The main image now features a smooth scale-up effect (`group-hover:scale-110`) and a subtle dark gradient overlay.
    - **Glassmorphism Badge**: Rebuilt the location badge with a `backdrop-blur-md` background, pulsing amber light effect on the Map icon, and added a "DISPONIBLE" status indicator for better professional conversion.

### 3. Pricing Strategy (Local Market Alignment)
- **Price Adjustment**: Lowered the price points to be more competitive and psychologically effective for the local market in La Réunion.
    - **Vitrine Package**: Reduced from 2200€ HT to **1600€ HT**. (Client cost after 80% aid: ~320€).
    - **Gain de temps Package**: Reduced from 3800€ HT to **3200€ HT**, perfectly matching the maximum Kap Numérik grant ceiling. (Client cost after aid: ~640€).
- **Aid Simulation Labels**: Simplified the labels for aid deduction (e.g., "Aide Kap Numérik déduite") to be more accurate and less confusing regarding the 3200€ maximum cap.

### 4. Technical Improvements & Standards
- **Tailwind CSS Canonical Classes**: Updated gradient classes from the legacy `bg-gradient-to-*` to the canonical `bg-linear-to-*` syntax in the `About` component to align with modern Tailwind standards and resolve linter suggestions.
- **Git Workflow**: Staged, committed, and pushed all changes with detailed descriptive messages.

## Session Summary (Jan 22, 2026)

This session focused on refining the visual polish of the Header and Hero sections, implementing a robust Tech Stack display, adding a Pricing section, creating a Footer, and improving the "Realizations" section design.

### 1. Visual & Typography Updates
- **Font Change**: Implemented `Bebas Neue` for the brand name "MICKAEL RANAIVOSON" in the Header to give it a distinct, bold look. Later reverted to `Inter` (font-sans) for better coherence with the overall design, ensuring correct responsive sizing (`text-base` mobile, `text-lg` desktop) and `whitespace-nowrap`.
- **Text Gradient**: Applied a `bg-clip-text` gold gradient to the brand name in the Header, matching the "Automatisation IA" style in the Hero section for a consistent premium feel.
- **Iconography**: Updated the "Contact" CTA button to use a more modern `Smartphone` icon (filled) with black text for better contrast and style.
- **Brand Assets**: Updated the favicon and Apple touch icon to a circular design with a dark background (`#020617`) using the white logo, improving visibility on browser tabs.

### 2. Header & Navigation Refinement
- **Status Alert**: Configured the "Dispo pour projets" badge to be visible on Desktop but hidden on the mobile header bar (kept present in the mobile menu).
- **CTA Button Placement**: Removed the "Réserver un appel" button from the main header bar (both desktop and mobile) to declutter the interface, keeping it exclusively in the Mobile Menu.
- **TypeScript Fixes**: Resolved strict type errors regarding Framer Motion `variants` in `components/Hero.tsx` and `components/layout/Header.tsx` by explicitly typing variant objects and using `Variants` type.

### 3. Hero Section Tuning
- **Spacing**: Significantly reduced the top and bottom padding of the Hero section to minimize empty space and create a more compact, immediate visual impact on load.
    - Top padding reduced from `pt-32` to `pt-16`.
    - Bottom padding optimized for mobile (`pb-2`) while maintaining balance on desktop (`pb-20`).

### 4. Tech Stack Component
- **New Feature**: Implemented `components/layout/TechStack.tsx`, an infinite scrolling marquee showcasing the project's technology stack.
- **Implementation Details**:
    - Used `framer-motion` for the infinite scroll animation.
    - Replaced initial inline SVGs with high-quality SVG files (`next/image`) for all logos (Next.js, React, TypeScript, Symfony, PostgreSQL, Tailwind, Prisma, Cloudflare, Claude AI, Resend).
    - Applied CSS filters (`invert`) to dark logos (Next.js, Symfony, Prisma, Resend, Tailwind, Cloudflare) to ensure visibility on the dark section background.
    - Integrated the component into `app/page.tsx` between the Hero and Solutions sections.

### 5. Pricing Section
- **New Feature**: Implemented `components/layout/Pricing.tsx` to display three tiered service packages (Starter, Pro, Custom/IA).
- **Styling**: Used glassmorphism effects (`bg-slate-900/40`, `backdrop-blur`) and borders to seamlessly integrate with the dark theme.
- **Integration**: Added the section to `app/page.tsx` following the Solutions section.

### 6. Footer Implementation
- **New Component**: Created `components/layout/Footer.tsx` with a 4-column responsive layout including brand info, navigation links, contact details, and legal links.
- **Refinement**: Renamed from `Footertsx` to `Footer.tsx` and fixed Tailwind class warnings (`w-[500px]` -> `w-125`, `h-[300px]` -> `h-75`).
- **Integration**: Added to `app/layout.tsx` to appear globally on all pages.

### 7. Realizations Section Refinement
- **Tailwind Standardization**: Replaced arbitrary values in `components/layout/Realizations.tsx` with canonical classes (e.g., `w-[1000px]` -> `w-250`, `h-[600px]` -> `h-150`) and updated gradient syntax to `bg-linear-to-*`.
- **Card Design Optimization**: 
    - Updated the Noutasso project card image to use `noutasso.png` with `object-contain` for a cleaner, full-view display.
    - Compacted the card layout by reducing padding (`p-12` -> `p-10`), font sizes (Title `text-5xl` -> `text-4xl`), and image container height (`h-100` -> `h-64` on mobile).
    - Applied similar sizing reductions to secondary project cards for visual consistency and a more professional look.

### 8. Contact & Navigation Fixes
- **Link Correction**: Fixed broken links in `Pricing.tsx` and `Hero.tsx`.
    - Changed incorrect fragment/query order (`#contact?type=...`) to correct format (`?type=...#contact`) in Pricing buttons to ensure proper state initialization in the contact form.
    - Simplified the "Parlons de votre projet" CTA in the Hero section to link directly to `#contact`, relying on the default state of the form.

## Session Summary (Jan 21, 2026)

This session focused on scaffolding the initial landing page, creating core components, and iteratively refining the layout and responsiveness based on feedback.

### 1. Initial Scaffolding
- Generated `app/page.tsx` as the main entry point.
- Created `components/Hero.tsx` for the hero section.
- Implemented a "Services" section with a responsive bento grid layout directly in `app/page.tsx`.

### 2. Component & System Implementation
- **UI Components**:
  - Added `components/ui/button.tsx` to align with the project's `shadcn/ui` structure.
  - Created `components/Navbar.tsx`, a fully responsive navigation bar with a mobile-first design (burger menu).
  - Added `components/theme-provider.tsx` to handle light/dark mode.
- **Data Management**:
  - Created `lib/data.ts` to centralize site-wide configuration (`SITE_CONFIG`) and page content (`HERO_CONTENT`), making future text changes easier.
- **Layout Integration**:
  - Integrated the `Navbar` into the root `app/layout.tsx` to ensure it appears on all pages.

### 3. Iterative Refinement & Bug Fixing
- **Dependency Management**: Installed necessary packages (`lucide-react`, `framer-motion`, `@radix-ui/react-slot`, etc.) as required.
- **Header & Logo Adjustments**:
  - Initially implemented a fixed-height header (`h-20`).
  - Iteratively adjusted the logo size (from `50px` to `150px` then down to `90px`) based on visual feedback.
  - Made the header height dynamic (`h-auto` with `py-4`) to properly contain the logo.
- **Layout Inconsistency Resolution**:
  - **The core issue of this session**: A mismatch between a dynamic header height and a hardcoded `padding-top` on the main content.
  - **Solution**: The `pt-20` on `<main>` was updated to `pt-[182px]` and finally to `pt-[122px]` to precisely match the header's height after each size change. The mobile menu's `top-20` was also updated to `top-[122px]` for the same reason. This highlights the need to avoid hardcoded layout values.
- **Responsive Padding**:
  - Adjusted vertical padding on the `Hero` section to be smaller on mobile (`py-8`) and larger on desktop (`md:py-16`) for better vertical centering.
  - Added horizontal padding (`px-6`) to the mobile menu to prevent text from touching the screen edges.
- **Styling Fixes**:
  - Corrected the "Voir le portfolio" button text color to be visible against the dark background.
  - Addressed `tailwindcss-intellisense` suggestions for canonical class names.

---

## Future Implementation Rules

To maintain a high-quality, robust, and maintainable codebase, all future development **must** adhere to the following rules.

### 1. CRITICAL: Zero Horizontal Scroll
- The layout must **never** produce horizontal scrolling on any screen size, especially mobile.
- The root layout must maintain `overflow-x-hidden`.
- Container widths should be fluid (e.g., `w-full`, `max-w-screen-xl`). **Avoid fixed-pixel widths** (e.g., `w-[500px]`) for primary layout containers.

### 2. Mobile-First Responsive Design
- All components and layouts must be built for mobile first.
- Use Tailwind's responsive breakpoints (`sm:`, `md:`, `lg:`) to scale up for larger screens. Do not design for desktop and then try to shrink it down.

### 3. Avoid Hardcoded Layout Values
- As demonstrated by the `pt-20` vs `pt-[122px]` issue, hardcoding pixel values for spacing that depends on other elements' dimensions is brittle.
- **If a component's size is dynamic (e.g., Navbar height), any dependent layout spacing (e.g., main content's top padding) must be updated in sync.**
- Prefer using relative units, CSS custom properties (variables), or JavaScript-based calculations for such scenarios if they become more complex.

### 4. Centralized Configuration
- Continue using `lib/data.ts` for site-wide text, links, and configuration. Do not hardcode repeated strings or data directly in components.

### 5. Accessibility (A11y) First
- **Accessible Names**: All interactive elements (buttons, links) **must** have an accessible name.
    - If a button contains only an icon, use `aria-label="Description of action"`.
    - If a link contains only an image/icon, use `aria-label="Where this link goes"`.
- **State Indication**: Use `aria-pressed`, `aria-expanded`, or `aria-selected` for toggle buttons and interactive components to communicate state to screen readers.
- **Form Labels**: Ensure all form inputs have associated labels or `aria-label` attributes.

### 6. Performance Optimization
- **Image Optimization**:
    - Always specify `sizes` prop for `next/image` to allow the browser to select the correct image size.
    - Use `priority` for Above-the-Fold (LCP) images.
    - Avoid `fill` without `sizes` unless the image is truly full-screen.
- **Animation Performance**:
    - For complex animations (blobs, gradients, large moving elements), use `will-change-transform` to promote layers.
    - Reduce animation complexity (e.g., blur radius) on mobile devices using responsive utility classes (e.g., `blur-[60px] md:blur-[120px]`).
- **Missing Assets**: Ensure all referenced assets exist to prevent 404 errors which block the main thread.

### 7. Technical SEO Standards
- **Metadata**: Ensure `metadataBase` is dynamic (`process.env.VERCEL_URL`) to support social previews on all environments.
- **Sitemap & Robots**: Maintain `sitemap.ts` and `robots.ts` to guide crawlers.
- **Semantic HTML**: Use proper heading hierarchy (`h1` -> `h2` -> `h3`), `<nav>`, `<main>`, `<footer>` tags to help search engines understand the page structure.
