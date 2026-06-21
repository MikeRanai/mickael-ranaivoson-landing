import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { getPublishedCaseStudies } from "@/actions/project.actions";
import { optimizeCloudinaryUrl } from "@/lib/blog-utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Réalisations & études de cas",
  description:
    "Études de cas de projets web, SaaS et automatisations métier livrés à La Réunion : contexte, solution et résultats mesurés pour des TPE, artisans et associations.",
  alternates: { canonical: "/realisations" },
  openGraph: {
    title: "Réalisations & études de cas | Mickaël Ranaivoson",
    description:
      "Projets web, SaaS et automatisations livrés à La Réunion — contexte, solution, résultats.",
    url: "/realisations",
    type: "website",
  },
};

export default async function RealisationsPage() {
  const studies = await getPublishedCaseStudies();

  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Portfolio"
          title="Réalisations &"
          highlight="études de cas."
          subtitle="Des projets conçus pour performer. Pour chacun : le problème, ce que j'ai construit, et les résultats."
        />

        <div className="mt-16">
          {studies.length === 0 ? (
            <p className="text-center text-slate-500">
              Les études de cas arrivent bientôt.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {studies.map((p) => (
                <Link
                  key={p.id}
                  href={`/realisations/${p.slug}`}
                  className="group relative rounded-3xl overflow-hidden bg-slate-900/50 border border-white/5 hover:border-[#ffa800]/30 transition-all duration-500 flex flex-col"
                >
                  <div className="relative h-48 w-full bg-slate-800 overflow-hidden flex items-center justify-center">
                    {p.imageUrl ? (
                      <>
                        <Image
                          src={optimizeCloudinaryUrl(p.imageUrl, 1200)}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
                      </>
                    ) : (
                      <>
                        <div className="text-slate-600 font-mono text-lg">
                          Projet confidentiel
                        </div>
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                      </>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-[#ffa800] font-mono text-xs uppercase tracking-widest mb-3">
                      {p.tag}
                    </span>
                    <h2 className="text-xl font-bold text-white mb-3">{p.title}</h2>
                    <p className="text-slate-400 text-sm mb-4 flex-1">
                      {p.description}
                    </p>
                    <span className="inline-flex items-center text-white font-medium group-hover:text-[#ffa800] transition-colors">
                      Lire l&apos;étude de cas{" "}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
