import {
  getPostBySlug,
  getPublishedPosts,
  getRelatedPosts,
} from "@/actions/blog-public.actions";
import ArticleContent from "@/components/blog/ArticleContent";
import ArticleCard from "@/components/blog/ArticleCard";
import ShareButtons from "@/components/blog/ShareButtons";
import { generateExcerpt } from "@/lib/blog-utils";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 60;

const BASE_URL = "https://www.mickaelranaivoson.fr";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article introuvable" };

  const description =
    post.metaDescription ?? post.excerpt ?? generateExcerpt(post.content, 160);

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.slug, post.tag, 3);
  const url = `${BASE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription ?? post.excerpt ?? generateExcerpt(post.content, 160),
    datePublished: post.publishedAt?.toISOString() ?? post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    image: post.coverImage ?? `${BASE_URL}/opengraph-image.png`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: "Mickaël Ranaivoson",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Mickaël Ranaivoson",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/mr-logo-blanc.svg`,
      },
    },
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ArticleContent post={post} shareUrl={url}>
        <ShareButtons url={url} title={post.title} />
      </ArticleContent>

      {related.length > 0 && (
        <section className="border-t border-white/5 bg-slate-950 py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              À lire aussi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ArticleCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
