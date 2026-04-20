import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { logoutAction } from "@/actions/auth.actions";
import { ArrowLeft, FileText, LogOut, MessageSquareQuote } from "lucide-react";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <aside className="hidden md:flex w-64 flex-col border-r border-white/10 bg-slate-900/40 sticky top-0 h-screen">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="text-sm text-slate-400 hover:text-[#ffa800] inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour au site
          </Link>
          <div className="mt-4">
            <h2 className="text-white font-bold">Dashboard</h2>
            <p className="text-xs text-slate-500 truncate">{session.user.email}</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/dashboard/blog"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <FileText className="w-4 h-4" />
            Articles
          </Link>
          <Link
            href="/dashboard/testimonials"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <MessageSquareQuote className="w-4 h-4" />
            Témoignages
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="md:hidden sticky top-0 z-10 bg-slate-950/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard/blog" className="text-white font-bold">Dashboard</Link>
          <form action={logoutAction}>
            <button type="submit" className="text-sm text-slate-400 hover:text-red-400 inline-flex items-center gap-1.5">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </form>
        </div>
        <div className="p-6 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
