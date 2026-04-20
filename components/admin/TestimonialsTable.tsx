"use client";

import Link from "next/link";
import { useTransition } from "react";
import {
  deleteTestimonial,
  toggleTestimonialPublished,
} from "@/actions/testimonial.actions";
import { ExternalLink, Loader2, Pencil, Trash2 } from "lucide-react";

type TestimonialRow = {
  id: string;
  authorName: string;
  authorRole: string;
  location: string | null;
  metric: string | null;
  published: boolean;
  displayOrder: number;
  googleReviewUrl: string | null;
  createdAt: Date;
};

export default function TestimonialsTable({
  testimonials,
}: {
  testimonials: TestimonialRow[];
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Supprimer définitivement le témoignage de « ${name} » ?`)) return;
    startTransition(async () => {
      await deleteTestimonial(id);
    });
  };

  const handleToggle = (id: string) => {
    startTransition(async () => {
      await toggleTestimonialPublished(id);
    });
  };

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-20 rounded-2xl bg-slate-900/50 border border-white/5">
        <p className="text-slate-400 mb-4">Aucun témoignage pour l&apos;instant.</p>
        <Link
          href="/dashboard/testimonials/new"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-[#ffa800] text-slate-950 text-sm font-semibold hover:bg-[#ffb92e]"
        >
          Ajouter le premier
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/60">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-slate-400">
            <th className="px-4 py-3 font-medium">Auteur</th>
            <th className="px-4 py-3 font-medium">Métrique</th>
            <th className="px-4 py-3 font-medium">Ordre</th>
            <th className="px-4 py-3 font-medium">Statut</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {testimonials.map((t) => (
            <tr key={t.id} className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-3">
                <div className="font-medium text-white">{t.authorName}</div>
                <div className="text-xs text-slate-500">
                  {t.authorRole}
                  {t.location ? ` · ${t.location}` : ""}
                </div>
              </td>
              <td className="px-4 py-3">
                {t.metric ? (
                  <span className="font-bold text-[#ffa800]">{t.metric}</span>
                ) : (
                  <span className="text-slate-600">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-slate-400 font-mono">{t.displayOrder}</td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => handleToggle(t.id)}
                  disabled={isPending}
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors disabled:opacity-50 ${
                    t.published
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25"
                      : "bg-slate-500/15 text-slate-300 border border-slate-500/30 hover:bg-slate-500/25"
                  }`}
                >
                  {t.published ? "Publié" : "Brouillon"}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  {t.googleReviewUrl && (
                    <a
                      href={t.googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Voir l'avis Google"
                      className="p-2 rounded-md text-slate-400 hover:text-[#ffa800] hover:bg-white/5"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <Link
                    href={`/dashboard/testimonials/${t.id}`}
                    title="Modifier"
                    className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(t.id, t.authorName)}
                    disabled={isPending}
                    title="Supprimer"
                    className="p-2 rounded-md text-slate-400 hover:text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
