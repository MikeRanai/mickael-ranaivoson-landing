import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminPost } from "@/actions/blog.actions";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getAdminPost(id);
  if (!post) notFound();

  const formValues = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt ?? "",
    metaDescription: post.metaDescription ?? "",
    tag: post.tag,
    coverImage: post.coverImage,
    published: post.published,
  };

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/dashboard/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#ffa800] mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux articles
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Modifier l&apos;article</h1>
      </div>

      <PostForm post={formValues} />
    </div>
  );
}
