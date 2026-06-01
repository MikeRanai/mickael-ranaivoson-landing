"use client";

import { useActionState, useState } from "react";
import { requestLoginLinkAction } from "@/actions/auth.actions";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";

export default function MagicLinkRequest() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(requestLoginLinkAction, undefined);

  if (state?.ok) {
    return (
      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="flex items-start gap-2 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2.5">
          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 pt-6 border-t border-white/10">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-sm text-slate-400 hover:text-[#ffa800] transition-colors"
        >
          Mot de passe oublié ? Recevoir un lien de connexion
        </button>
      ) : (
        <form action={formAction} className="space-y-3">
          <label className="block text-sm font-medium text-slate-300" htmlFor="link-email">
            Recevoir un lien de connexion par email
          </label>
          <input
            id="link-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="vous@exemple.fr"
            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10
              text-white placeholder:text-slate-500
              focus:outline-none focus:border-[#ffa800] focus:ring-1 focus:ring-[#ffa800]"
          />

          {state && !state.ok && (
            <p className="text-sm text-red-400">{state.message}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5
              rounded-lg bg-white/5 border border-white/10 text-slate-100 font-medium
              hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Mail className="w-4 h-4" />
            )}
            {isPending ? "Envoi..." : "Envoyer le lien"}
          </button>
        </form>
      )}
    </div>
  );
}
