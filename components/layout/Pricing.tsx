import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import Link from "next/link";
import { KapNumerikLeadMagnet } from "./KapNumerikLeadMagnet";

export function Pricing() {
  return (
    <section
      id="tarifs"
      className="py-24 bg-slate-950 relative overflow-hidden"
      aria-labelledby="tarifs-title"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* En-tête */}
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-16">
          <SectionHeader
            label="Tarifs"
            title="Un investissement,"
            highlight="pas une dépense."
            highlightColor="gold"
            subtitle="Combien vous coûtent vos heures perdues sur Excel chaque mois ? Probablement plus que mes tarifs."
          />
        </div>

        {/* Lead magnet Kap Numérik — placé AVANT les tarifs pour capter l'intention "aide" */}
        <KapNumerikLeadMagnet />

        {/* Grille des Offres — prix HT francs, sans simulation Kap (plus de toggle) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* OFFRE 1 : VITRINE */}
          <div className="relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 flex flex-col hover:bg-slate-900/60 transition-colors">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Présence en ligne</h3>
              <p className="text-slate-400 text-sm h-10">Pour que vos clients vous trouvent et vous fassent confiance.</p>
            </div>
            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">1 600€</span>
                <span className="text-sm text-slate-400">HT</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">À partir de — projet livré clé en main</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-5 h-5 text-slate-500 shrink-0" /> Un site pro qui inspire confiance
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-5 h-5 text-slate-500 shrink-0" /> Votre adresse web personnalisée (1 an)
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-5 h-5 text-slate-500 shrink-0" /> Visible sur Google dès le lancement
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-5 h-5 text-slate-500 shrink-0" /> Compatible aide Kap Numérik à la réouverture
              </li>
            </ul>
            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white" asChild>
              <Link href="?type=devis#contact">On en discute</Link>
            </Button>
          </div>

          {/* OFFRE 2 : GROWTH (La star) */}
          <div className="relative p-8 rounded-3xl bg-slate-900/80 border border-[#ffa800]/50 flex flex-col shadow-[0_0_40px_-10px_rgba(255,168,0,0.15)] transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ffa800] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Le plus demandé
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Gain de temps</h3>
              <p className="text-slate-400 text-sm h-10">Automatisez ce qui vous prend des heures. Récupérez vos soirées.</p>
            </div>
            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-[#ffa800]">3 200€</span>
                <span className="text-sm text-slate-400">HT</span>
              </div>
              <p className="text-xs text-[#ffa800]/80 mt-1">
                À partir de — éligible aide Kap Numérik (réouverture 2026)
              </p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-white font-medium">
                <Check className="w-5 h-5 text-[#ffa800] shrink-0" /> Pré-dossier Kap Numérik offert
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-5 h-5 text-[#ffa800] shrink-0" /> Vendez et encaissez en ligne
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-5 h-5 text-[#ffa800] shrink-0" /> Suivez votre activité en un coup d&apos;oeil
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-5 h-5 text-[#ffa800] shrink-0" /> Fini les relances manuelles
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-5 h-5 text-[#ffa800] shrink-0" /> Je vous forme à tout utiliser (2h)
              </li>
            </ul>
            <Button className="w-full bg-[#ffa800] text-black hover:bg-[#ffb92e] font-bold shadow-lg shadow-[#ffa800]/20" asChild>
              <Link href="#kap-numerik-veille">M&apos;alerter à la réouverture</Link>
            </Button>
          </div>

          {/* OFFRE 3 : SUR MESURE */}
          <div className="relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 flex flex-col hover:bg-slate-900/60 transition-colors">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Sur-mesure</h3>
              <p className="text-slate-400 text-sm h-10">Votre problème est unique ? Ma solution aussi.</p>
            </div>
            <div className="mb-8 flex items-baseline gap-1 h-22 pt-6">
              <span className="text-3xl font-bold text-white">Sur Devis</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-5 h-5 text-slate-500 shrink-0" /> Un outil 100% adapté à votre métier
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-5 h-5 text-slate-500 shrink-0" /> L&apos;IA qui travaille pour vous
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-5 h-5 text-slate-500 shrink-0" /> Connexion avec vos outils existants
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <Check className="w-5 h-5 text-slate-500 shrink-0" /> Je reste disponible après livraison
              </li>
            </ul>
            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white" asChild>
              <Link href="?type=projet#contact">Expliquez-moi votre besoin</Link>
            </Button>
          </div>

        </div>

        {/* Note de bas de page rassurante */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            <span className="text-[#ffa800]">*</span> L&apos;aide régionale Kap Numérik (version 2024–2027) est en cours de finalisation par la Région Réunion.
            Le pré-dossier offert vous garantit d&apos;être prêt dès la réouverture.{" "}
            <Link href="/aides-digitales-reunion" className="text-[#ffa800] hover:underline">
              En savoir plus →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
