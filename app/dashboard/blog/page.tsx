import Link from "next/link";
import { getAdminPosts } from "@/actions/blog.actions";
import PostsTable from "@/components/admin/PostsTable";
import { Plus } from "lucide-react";

export default async function AdminBlogPage() {
  const posts = await getAdminPosts();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Articles</h1>
          <p className="text-sm text-slate-400 mt-1">
            {posts.length} article{posts.length > 1 ? "s" : ""} —{" "}
            {posts.filter((p) => p.published).length} publié
            {posts.filter((p) => p.published).length > 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#ffa800] text-slate-950 font-semibold hover:bg-[#ffb92e] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouvel article
        </Link>
      </div>

      <PostsTable posts={posts} />
    </div>
  );
}
