"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth.actions";
import { Loader2, LogIn } from "lucide-react";

export default function LoginForm() {
  const [error, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10
            text-white placeholder:text-slate-500
            focus:outline-none focus:border-[#ffa800] focus:ring-1 focus:ring-[#ffa800]"
          placeholder="vous@exemple.fr"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="password">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={6}
          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10
            text-white placeholder:text-slate-500
            focus:outline-none focus:border-[#ffa800] focus:ring-1 focus:ring-[#ffa800]"
        />
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5
          rounded-lg bg-[#ffa800] text-slate-950 font-semibold
          hover:bg-[#ffb92e] transition-colors disabled:opacity-50"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <LogIn className="w-4 h-4" />
        )}
        {isPending ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
