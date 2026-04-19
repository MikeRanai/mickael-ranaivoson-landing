import { getPublishedPosts } from "@/actions/blog-public.actions";
import BlogGrid from "@/components/blog/BlogGrid";
import { SectionHeader } from "@/components/ui/section-header";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conseils, retours d'expérience et actualités sur le développement web, Next.js, le SaaS et le Kap Numérik à La Réunion.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Mickael Ranaivoson",
    description:
      "Conseils, retours d'expérience et actualités sur le développement web, Next.js, le SaaS et le Kap Numérik à La Réunion.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Le Blog"
          title="Pensées, tutoriels et"
          highlight="retours terrain"
          subtitle="Des articles courts et concrets sur le web moderne, Next.js, le SaaS et la transformation digitale à La Réunion."
        />

        <div className="mt-16">
          {posts.length === 0 ? (
            <div className="text-center py-20 rounded-2xl bg-slate-900/50 border border-white/5 max-w-2xl mx-auto">
              <p className="text-slate-400">
                Les premiers articles arrivent très bientôt. Revenez vite !
              </p>
            </div>
          ) : (
            <BlogGrid posts={posts} />
          )}
        </div>
      </div>
    </main>
  );
}
