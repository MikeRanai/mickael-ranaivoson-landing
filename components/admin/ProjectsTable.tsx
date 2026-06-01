"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteProject, toggleProjectPublished } from "@/actions/project.actions";
import { ExternalLink, Loader2, Pencil, Star, Trash2 } from "lucide-react";

type ProjectRow = {
  id: string;
  title: string;
  tag: string;
  url: string | null;
  featured: boolean;
  published: boolean;
  displayOrder: number;
};

export default function ProjectsTable({ projects }: { projects: ProjectRow[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Supprimer définitivement le projet « ${title} » ?`)) return;
    startTransition(async () => {
      await deleteProject(id);
    });
  };

  const handleToggle = (id: string) => {
    startTransition(async () => {
      await toggleProjectPublished(id);
    });
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 rounded-2xl bg-slate-900/50 border border-white/5">
        <p className="text-slate-400 mb-4">Aucun projet pour l&apos;instant.</p>
        <Link
          href="/dashboard/projects/new"
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
            <th className="px-4 py-3 font-medium">Projet</th>
            <th className="px-4 py-3 font-medium">Tag</th>
            <th className="px-4 py-3 font-medium">Ordre</th>
            <th className="px-4 py-3 font-medium">Statut</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-3">
                <div className="font-medium text-white flex items-center gap-2">
                  {p.featured && (
                    <Star
                      className="w-3.5 h-3.5 text-[#ffa800] fill-[#ffa800]"
                      aria-label="Mis en avant"
                    />
                  )}
                  {p.title}
                </div>
              </td>
              <td className="px-4 py-3 text-slate-400">{p.tag}</td>
              <td className="px-4 py-3 text-slate-400 font-mono">{p.displayOrder}</td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => handleToggle(p.id)}
                  disabled={isPending}
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors disabled:opacity-50 ${
                    p.published
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25"
                      : "bg-slate-500/15 text-slate-300 border border-slate-500/30 hover:bg-slate-500/25"
                  }`}
                >
                  {p.published ? "Publié" : "Brouillon"}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Voir le site"
                      className="p-2 rounded-md text-slate-400 hover:text-[#ffa800] hover:bg-white/5"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <Link
                    href={`/dashboard/projects/${p.id}`}
                    title="Modifier"
                    className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id, p.title)}
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
