"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import ArticleCard, { type ArticleCardPost } from "./ArticleCard";
import { POST_TAGS } from "@/lib/blog-utils";

export default function BlogGrid({ posts }: { posts: ArticleCardPost[] }) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string>("all");

  const availableTags = useMemo(() => {
    const set = new Set(posts.map((p) => p.tag));
    return POST_TAGS.filter((t) => set.has(t.value));
  }, [posts]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      const matchTag = activeTag === "all" || p.tag === activeTag;
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.excerpt ?? "").toLowerCase().includes(q);
      return matchTag && matchSearch;
    });
  }, [posts, search, activeTag]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative md:max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="search"
            placeholder="Rechercher un article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-900/80 border border-white/10
              text-sm text-white placeholder:text-slate-500
              focus:outline-none focus:border-[#ffa800] focus:ring-1 focus:ring-[#ffa800]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <TagChip
            label="Tous"
            active={activeTag === "all"}
            onClick={() => setActiveTag("all")}
          />
          {availableTags.map((t) => (
            <TagChip
              key={t.value}
              label={t.label}
              active={activeTag === t.value}
              onClick={() => setActiveTag(t.value)}
            />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-slate-900/50 border border-white/5">
          <p className="text-slate-400">Aucun article ne correspond à votre recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ArticleCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function TagChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
        active
          ? "bg-[#ffa800] text-slate-950 border-[#ffa800]"
          : "bg-slate-900/60 text-slate-300 border-white/10 hover:border-[#ffa800]/40 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
