import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import ArticleCard from "@/components/blog/ArticleCard";
import { getPublishedPosts } from "@/actions/blog-public.actions";

export async function LatestPosts() {
  const posts = await getPublishedPosts({ limit: 3 });

  if (posts.length === 0) return null;

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.mickaelranaivoson.fr/blog/${p.slug}`,
      name: p.title,
    })),
  };

  return (
    <section
      id="blog"
      className="py-24 bg-slate-950 relative overflow-hidden"
      aria-labelledby="blog-title"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Glow ambré discret pour casser la trame sombre */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeader
            label="Le Blog"
            title="Retours terrain &"
            highlight="conseils concrets."
            highlightColor="gold"
            subtitle="Articles courts sur le web moderne, Next.js, le SaaS et la transformation digitale à La Réunion."
            align="left"
          />
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full
              border border-white/10 bg-slate-900/60 text-white text-sm font-medium
              hover:border-[#ffa800]/40 hover:text-[#ffa800] transition-colors shrink-0"
          >
            Voir tous les articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <ArticleCard key={p.id} post={p} />
          ))}
        </div>

        {/* CTA mobile (le bouton desktop est dans l'en-tête) */}
        <div className="mt-10 flex md:hidden justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
              border border-white/10 bg-slate-900/60 text-white text-sm font-medium
              hover:border-[#ffa800]/40 hover:text-[#ffa800] transition-colors"
          >
            Voir tous les articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestPosts;
