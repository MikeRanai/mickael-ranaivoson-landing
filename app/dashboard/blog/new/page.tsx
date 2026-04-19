import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
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
        <h1 className="text-2xl md:text-3xl font-bold text-white">Nouvel article</h1>
      </div>

      <PostForm />
    </div>
  );
}
