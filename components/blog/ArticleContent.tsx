import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import {
  formatDate,
  getReadingTime,
  getTagColor,
  getTagLabel,
  optimizeCloudinaryUrl,
  sanitizeContent,
} from "@/lib/blog-utils";

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  metaDescription?: string | null;
  tag: string;
  coverImage?: string | null;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export default function ArticleContent({
  post,
  shareUrl,
  children,
}: {
  post: Post;
  shareUrl: string;
  children?: React.ReactNode;
}) {
  const clean = sanitizeContent(post.content);
  const date = post.publishedAt ?? post.createdAt;
  const readingTime = getReadingTime(post.content);

  return (
    <article className="pb-24">
      <div className="relative w-full h-[40vh] min-h-[320px] max-h-[520px] overflow-hidden">
        {post.coverImage ? (
          <Image
            src={optimizeCloudinaryUrl(post.coverImage, 1600)}
            alt={post.title}
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
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#ffa800] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>

          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(
                post.tag
              )}`}
            >
              {getTagLabel(post.tag)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(date)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} min de lecture
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div
            className="prose prose-lg prose-invert max-w-none
              prose-headings:text-white prose-headings:tracking-tight
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

          {children}
        </div>
      </div>
    </article>
  );
}
