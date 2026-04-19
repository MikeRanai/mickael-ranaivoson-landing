export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function sanitizeContent(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/\s+on\w+="[^"]*"/g, "")
    .replace(/\s+on\w+='[^']*'/g, "")
    .replace(/javascript:/gi, "")
    .replace(/data:(?!image\/)/gi, "");
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function generateExcerpt(content: string, maxLength = 200): string {
  const text = stripHtml(content);
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}

export function getReadingTime(content: string): number {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export const POST_TAGS = [
  { value: "general", label: "Général" },
  { value: "actualite", label: "Actualité" },
  { value: "tutorial", label: "Tutoriel" },
  { value: "case-study", label: "Étude de cas" },
  { value: "annonce", label: "Annonce" },
  { value: "kap-numerik", label: "Kap Numérik" },
] as const;

export type PostTag = (typeof POST_TAGS)[number]["value"];

export function getTagLabel(tag: string): string {
  return POST_TAGS.find((t) => t.value === tag)?.label ?? tag;
}

export function getTagColor(tag: string): string {
  const map: Record<string, string> = {
    general: "bg-slate-500/15 text-slate-300 border-slate-500/30",
    actualite: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    tutorial: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    "case-study": "bg-violet-500/15 text-violet-300 border-violet-500/30",
    annonce: "bg-[#ffa800]/15 text-[#ffb92e] border-[#ffa800]/30",
    "kap-numerik": "bg-rose-500/15 text-rose-300 border-rose-500/30",
  };
  return map[tag] ?? map.general;
}

export function optimizeCloudinaryUrl(url: string, width = 1200): string {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
