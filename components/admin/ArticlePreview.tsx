"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Calendar, Clock, X } from "lucide-react";
import {
  formatDate,
  generateExcerpt,
  getReadingTime,
  getTagColor,
  getTagLabel,
  optimizeCloudinaryUrl,
  sanitizeContent,
} from "@/lib/blog-utils";

type PreviewData = {
  title: string;
  content: string;
  excerpt?: string | null;
  tag: string;
  coverImage?: string | null;
};

export default function ArticlePreview({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: PreviewData;
}) {
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const clean = sanitizeContent(data.content || "");
  const readingTime = getReadingTime(data.content || "");
  const date = new Date();
  const excerpt =
    data.excerpt && data.excerpt.trim().length > 0
      ? data.excerpt
      : generateExcerpt(data.content || "", 200);

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Aperçu de l'article"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-950/95 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#ffa800]/15 text-[#ffb92e] border border-[#ffa800]/30">
            APERÇU
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Rendu tel qu'il apparaîtra sur le blog
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer l'aperçu"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm
            text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
          Fermer
        </button>
      </div>

      <article className="pb-24 bg-slate-950">
        <div className="relative w-full h-[40vh] min-h-[320px] max-h-[520px] overflow-hidden">
          {data.coverImage ? (
            <Image
              src={optimizeCloudinaryUrl(data.coverImage, 1600)}
              alt={data.title || "Aperçu"}
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
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(
                  data.tag
                )}`}
              >
                {getTagLabel(data.tag)}
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
              {data.title || "Titre de l'article"}
            </h1>

            {excerpt && (
              <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                {excerpt}
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
          </div>
        </div>
      </article>
    </div>
  );
}
