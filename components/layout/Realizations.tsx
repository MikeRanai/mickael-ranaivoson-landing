import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { getPublishedProjects } from "@/actions/project.actions";

type Kpi = { value: string; label: string };

// Classes statiques (Tailwind ne sait pas générer du dynamique) — une entrée par accent.
const ACCENTS: Record<
  string,
  { border: string; text: string; hoverText: string }
> = {
  gold: {
    border: "hover:border-[#ffa800]/30",
    text: "text-[#ffa800]",
    hoverText: "hover:text-[#ffa800]",
  },
  blue: {
    border: "hover:border-blue-500/30",
    text: "text-blue-400",
    hoverText: "hover:text-blue-400",
  },
  rose: {
    border: "hover:border-rose-500/30",
    text: "text-rose-400",
    hoverText: "hover:text-rose-400",
  },
  emerald: {
    border: "hover:border-emerald-500/30",
    text: "text-emerald-500",
    hoverText: "hover:text-emerald-500",
  },
};

function accent(color: string) {
  return ACCENTS[color] ?? ACCENTS.gold;
}

function ctaHref(url: string | null) {
  return url || "?type=projet#contact";
}

function ctaLabelFor(url: string | null, ctaLabel: string | null) {
  return ctaLabel || (url ? "Voir le site" : "En discuter");
}

export async function Realizations() {
  const projects = await getPublishedProjects();

  // Aucun projet publié = on ne rend pas la section (évite le "trou noir" visuel)
  if (projects.length === 0) return null;

  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => p.id !== featured?.id);

  return (
    <section id="realisations" className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Fond décoratif (Glow subtil) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-150 bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Titre Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <SectionHeader
            label="Portfolio"
            title="Réalisations"
            highlight="marquantes."
            highlightColor="muted"
            subtitle="Des projets conçus pour performer. Pas juste pour faire joli."
            align="left"
          />
        </div>

        {/* --- CARTE MISE EN AVANT (featured) --- */}
        {featured && (
          <div
            className={`group relative w-full rounded-3xl overflow-hidden bg-slate-900/50 border border-white/5 ${accent(featured.accentColor).border} transition-all duration-500 mb-12`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Contenu Texte */}
              <div className="p-6 md:p-10 flex flex-col justify-center order-2 lg:order-1 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-3 h-3 rounded-full bg-[#ffa800] shadow-[0_0_10px_#ffa800]"></span>
                  <span className="text-[#ffa800] font-mono text-sm uppercase tracking-widest">
                    {featured.tag}
                  </span>
                </div>

                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {featured.title}
                </h3>

                <p className="text-slate-400 text-base mb-6 leading-relaxed max-w-md">
                  {featured.description}
                </p>

                {/* KPIs concrets */}
                {Array.isArray(featured.kpis) && featured.kpis.length > 0 && (
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-8 border-t border-white/5 pt-6">
                    {(featured.kpis as Kpi[]).map((kpi, i) => (
                      <div key={i}>
                        <p className="text-2xl font-bold text-[#ffa800] mb-1">
                          {kpi.value}
                        </p>
                        <p className="text-xs text-slate-500 leading-tight">
                          {kpi.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <Button
                    asChild
                    className="bg-white text-black hover:bg-slate-200 font-bold rounded-full px-8"
                  >
                    <Link
                      href={ctaHref(featured.url)}
                      target={featured.url ? "_blank" : undefined}
                    >
                      {ctaLabelFor(featured.url, featured.ctaLabel)}{" "}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Image "Full Bleed" */}
              <div className="relative h-64 lg:h-auto order-1 lg:order-2 overflow-hidden bg-slate-800">
                {featured.imageUrl ? (
                  <Image
                    src={featured.imageUrl}
                    alt={featured.title}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[url('/grid.svg')] opacity-20">
                    <span className="text-slate-600 font-mono text-lg">
                      Projet Confidentiel
                    </span>
                  </div>
                )}
                {/* Overlay Gradient pour fondre l'image */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent lg:bg-linear-to-l opacity-80" />
              </div>
            </div>
          </div>
        )}

        {/* --- GRID PROJETS SECONDAIRES --- */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((p) => {
              const a = accent(p.accentColor);
              return (
                <div
                  key={p.id}
                  className={`group relative rounded-3xl overflow-hidden bg-slate-900/50 border border-white/5 ${a.border} transition-all duration-500 flex flex-col`}
                >
                  <div className="relative h-48 w-full bg-slate-800 overflow-hidden flex items-center justify-center">
                    {p.imageUrl ? (
                      <>
                        <Image
                          src={p.imageUrl}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
                      </>
                    ) : (
                      <>
                        <div className="text-slate-600 font-mono text-lg">
                          Projet Confidentiel
                        </div>
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                      </>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <span className={`${a.text} font-mono text-xs uppercase tracking-widest`}>
                        {p.tag}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{p.title}</h4>
                    <p className="text-slate-400 text-sm mb-4">{p.description}</p>
                    {p.bullets.length > 0 && (
                      <ul className="space-y-1.5 text-xs text-slate-400 mb-4 flex-1">
                        {p.bullets.map((b, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className={a.text}>▸</span> {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href={ctaHref(p.url)}
                      target={p.url ? "_blank" : undefined}
                      className={`inline-flex items-center text-white font-medium ${a.hoverText} transition-colors`}
                    >
                      {ctaLabelFor(p.url, p.ctaLabel)}{" "}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
