"use client";

import { useActionState } from "react";
import { changePasswordAction } from "@/actions/account.actions";
import { Loader2, Save, CheckCircle2 } from "lucide-react";

export default function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(changePasswordAction, undefined);

  return (
    <form action={formAction} className="space-y-5 max-w-md">
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-200" htmlFor="next">
          Nouveau mot de passe
        </label>
        <input
          id="next"
          name="next"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          placeholder="Au moins 8 caractères"
          className={inputClass}
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-200" htmlFor="confirm">
          Confirmer le mot de passe
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          placeholder="Ressaisissez le mot de passe"
          className={inputClass}
        />
      </div>

      {state && (
        <p
          className={`flex items-start gap-2 text-sm rounded-lg px-3 py-2.5 border ${
            state.ok
              ? "text-emerald-300 bg-emerald-500/10 border-emerald-500/20"
              : "text-red-400 bg-red-500/10 border-red-500/20"
          }`}
        >
          {state.ok && <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />}
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5
          rounded-lg bg-[#ffa800] text-slate-950 font-semibold
          hover:bg-[#ffb92e] transition-colors disabled:opacity-50"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        {isPending ? "Mise à jour..." : "Changer le mot de passe"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-white/10 " +
  "text-white placeholder:text-slate-500 " +
  "focus:outline-none focus:border-[#ffa800] focus:ring-1 focus:ring-[#ffa800]";
