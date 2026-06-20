"use client";

import { useTransition } from "react";
import { deleteSubscriber } from "@/actions/subscriber.actions";
import { Download, Loader2, Trash2 } from "lucide-react";

type SubscriberRow = {
  id: string;
  email: string;
  createdAt: Date;
};

export default function SubscribersTable({
  subscribers,
}: {
  subscribers: SubscriberRow[];
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string, email: string) => {
    if (!confirm(`Supprimer définitivement « ${email} » de la liste ?`)) return;
    startTransition(async () => {
      await deleteSubscriber(id);
    });
  };

  const handleExport = () => {
    const header = "email,inscrit_le\n";
    const rows = subscribers
      .map((s) => `${s.email},${new Date(s.createdAt).toISOString()}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `abonnes-newsletter-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (subscribers.length === 0) {
    return (
      <div className="text-center py-20 rounded-2xl bg-slate-900/50 border border-white/5">
        <p className="text-slate-400">Aucun abonné pour l&apos;instant.</p>
        <p className="text-xs text-slate-500 mt-2">
          Le formulaire d&apos;inscription apparaît en bas de chaque article du blog.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-slate-900/60 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Download className="w-4 h-4" />
          Exporter CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Inscrit le</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {subscribers.map((s) => (
              <tr key={s.id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-medium text-white">{s.email}</td>
                <td className="px-4 py-3 text-slate-400">
                  {new Date(s.createdAt).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => handleDelete(s.id, s.email)}
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
    </div>
  );
}
