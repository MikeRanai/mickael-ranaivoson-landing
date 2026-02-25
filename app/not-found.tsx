import Link from "next/link";

export const metadata = {
  title: "Page introuvable",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-7xl font-bold text-amber-500">404</h1>
        <h2 className="text-2xl font-bold text-white">Page introuvable</h2>
        <p className="text-slate-400">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl
              bg-amber-500 text-slate-950 font-bold
              hover:bg-amber-400 transition-all duration-300"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl
              border border-white/10 text-white font-medium
              hover:bg-white/5 transition-all duration-300"
          >
            Me contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
