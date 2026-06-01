import { auth } from "@/auth";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export default async function AccountPage() {
  const session = await auth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Mon compte</h1>
        <p className="text-sm text-slate-400 mt-1">
          Connecté en tant que{" "}
          <span className="text-slate-200">{session?.user?.email}</span>
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 md:p-8">
        <h2 className="text-lg font-semibold text-white mb-1">Mot de passe</h2>
        <p className="text-sm text-slate-400 mb-6">
          Définissez un mot de passe que vous retiendrez. Le lien de connexion par
          email reste disponible en cas d&apos;oubli.
        </p>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
