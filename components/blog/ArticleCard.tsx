import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import {
  formatDate,
  generateExcerpt,
  getReadingTime,
  getTagColor,
  getTagLabel,
  optimizeCloudinaryUrl,
} from "@/lib/blog-utils";

export type ArticleCardPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  tag: string;
  coverImage?: string | null;
  publishedAt?: Date | null;
  createdAt?: Date;
};

export default function ArticleCard({ post }: { post: ArticleCardPost }) {
  const excerpt = post.excerpt ?? generateExcerpt(post.content, 150);
  const readingTime = getReadingTime(post.content);
  const date = post.publishedAt ?? post.createdAt;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl
        bg-slate-900/70 border border-white/10 card-hover-glow
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffa800]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-800">
        {post.coverImage ? (
          <Image
            src={optimizeCloudinaryUrl(post.coverImage, 800)}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-[#ffa800]/10 flex items-center justify-center">
            <span className="text-5xl font-bold text-[#ffa800]/20">MR</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getTagColor(
              post.tag
            )}`}
          >
            {getTagLabel(post.tag)}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6 gap-3">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          {date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(date)}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {readingTime} min
          </span>
        </div>

        <h3 className="text-xl font-bold text-white leading-tight line-clamp-2 group-hover:text-[#ffa800] transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-slate-400 line-clamp-3 flex-1">{excerpt}</p>

        <div className="flex items-center gap-2 text-sm font-medium text-[#ffa800] mt-2">
          <span>Lire l&apos;article</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
