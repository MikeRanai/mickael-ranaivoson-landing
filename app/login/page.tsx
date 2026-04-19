import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
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
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
