import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Calendar, Briefcase, Building2 } from "lucide-react";
import {
  getProjectBySlug,
  getPublishedCaseStudies,
  type ProjectKpi,
} from "@/actions/project.actions";
import {
  optimizeCloudinaryUrl,
  sanitizeContent,
  generateExcerpt,
} from "@/lib/blog-utils";

export const revalidate = 60;

const BASE_URL = "https://www.mickaelranaivoson.fr";

export async function generateStaticParams() {
  const studies = await getPublishedCaseStudies();
  return studies
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project || !project.content) return { title: "Réalisation introuvable" };

  const description = generateExcerpt(project.content, 160) || project.description;

  return {
    title: `${project.title} — Étude de cas`,
    description,
    alternates: { canonical: `/realisations/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — Étude de cas`,
      description,
      url: `/realisations/${project.slug}`,
      modifiedTime: project.updatedAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Étude de cas`,
      description,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  // Principe « pas de page creuse » : pas de contenu = pas d'étude de cas.
  if (!project || !project.content) notFound();

  const clean = sanitizeContent(project.content);
  const url = `${BASE_URL}/realisations/${project.slug}`;
  const kpis = (Array.isArray(project.kpis) ? project.kpis : []) as ProjectKpi[];
  const description = generateExcerpt(project.content, 160) || project.description;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: project.title,
        headline: project.title,
        description,
        image: project.imageUrl
          ? project.imageUrl.startsWith("http")
            ? project.imageUrl
            : `${BASE_URL}${project.imageUrl}`
          : `${BASE_URL}/realisations/${project.slug}/opengraph-image`,
        dateModified: project.updatedAt.toISOString(),
        datePublished: project.createdAt.toISOString(),
        url,
        keywords: project.techStack.join(", "),
        ...(project.year ? { dateCreated: String(project.year) } : {}),
        author: { "@type": "Person", name: "Mickaël Ranaivoson", url: BASE_URL },
        creator: { "@type": "Person", name: "Mickaël Ranaivoson", url: BASE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Réalisations",
            item: `${BASE_URL}/realisations`,
          },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pb-24">
        {/* Cover */}
        <div className="relative w-full h-[40vh] min-h-[320px] max-h-[520px] overflow-hidden">
          {project.imageUrl ? (
            <Image
              src={optimizeCloudinaryUrl(project.imageUrl, 1600)}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-[#ffa800]/10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 -mt-40 relative z-10">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/realisations"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#ffa800] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Toutes les réalisations
            </Link>

            {/* Méta : tag + secteur + année + rôle */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-[#ffa800]/15 text-[#ffb92e] border-[#ffa800]/30">
                {project.tag}
              </span>
              {project.sector && (
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Building2 className="w-3.5 h-3.5" />
                  {project.sector}
                </span>
              )}
              {project.year && (
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.year}
                </span>
              )}
              {project.role && (
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Briefcase className="w-3.5 h-3.5" />
                  {project.role}
                </span>
              )}
            </div>

            <h1 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-normal mb-6">
              {project.title}
            </h1>

            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
              {project.description}
            </p>

            {/* Bandeau KPIs */}
            {kpis.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 mb-10 rounded-2xl border border-white/10 bg-slate-900/50 p-6">
                {kpis.map((kpi, i) => (
                  <div key={i}>
                    <p className="text-2xl md:text-3xl font-bold text-[#ffa800] mb-1">
                      {kpi.value}
                    </p>
                    <p className="text-xs text-slate-500 leading-tight">
                      {kpi.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Stack technique */}
            {project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-slate-800/60 text-slate-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Corps narratif */}
            <div
              className="prose prose-lg prose-invert max-w-none
                prose-headings:text-white prose-headings:tracking-tight prose-headings:font-oswald
                prose-h2:mt-12 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-slate-300 prose-p:leading-relaxed
                prose-a:text-[#ffa800] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-code:text-[#ffb92e] prose-code:bg-slate-800/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10
                prose-blockquote:border-l-[#ffa800] prose-blockquote:text-slate-300 prose-blockquote:not-italic
                prose-img:rounded-xl prose-img:border prose-img:border-white/10
                prose-li:text-slate-300
                prose-hr:border-white/10"
              dangerouslySetInnerHTML={{ __html: clean }}
            />

            {/* Actions : site live + contact */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              {project.url && (
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ffa800] text-slate-950 font-bold hover:bg-[#ffb92e] transition-colors"
                >
                  Voir le site en ligne <ExternalLink className="w-4 h-4" />
                </Link>
              )}
              <Link
                href="/?type=projet#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white hover:bg-white/5 hover:border-white/25 transition-colors"
              >
                Discuter d&apos;un projet similaire
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
