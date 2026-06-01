import { Metadata } from "next";
import LoginForm from "./LoginForm";
import MagicLinkRequest from "./MagicLinkRequest";

export const metadata: Metadata = {
  title: "Connexion",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-950">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Connexion admin</h1>
            <p className="mt-2 text-sm text-slate-400">
              Espace réservé à l&apos;administrateur du blog.
            </p>
          </div>

          {error === "link" && (
            <p className="mb-5 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              Ce lien de connexion est invalide ou expiré. Demandez-en un nouveau.
            </p>
          )}

          <LoginForm />
          <MagicLinkRequest />
        </div>
      </div>
    </div>
  );
}
