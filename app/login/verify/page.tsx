import { Metadata } from "next";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { verifyMagicLinkAction } from "@/actions/auth.actions";

export const metadata: Metadata = {
  title: "Connexion par lien",
  robots: { index: false, follow: false },
};

export default async function VerifyLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-950">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8 border border-white/10 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Connexion au dashboard</h1>

          {token ? (
            <>
              <p className="text-sm text-slate-400 mb-8">
                Cliquez ci-dessous pour finaliser votre connexion.
              </p>
              {/* Bouton (POST) : un simple aperçu/scan du lien ne consomme pas le jeton */}
              <form action={verifyMagicLinkAction}>
                <input type="hidden" name="token" value={token} />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5
                    rounded-lg bg-[#ffa800] text-slate-950 font-semibold
                    hover:bg-[#ffb92e] transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Me connecter
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="text-sm text-red-400 mb-8">
                Lien invalide : aucun jeton fourni.
              </p>
              <Link
                href="/login"
                className="text-sm text-slate-400 hover:text-[#ffa800] transition-colors"
              >
                Retour à la connexion
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
