'use client'

import { useState } from "react";
import { Check, HelpCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import Link from "next/link";

export function Pricing() {
  const [isKapNumerik, setIsKapNumerik] = useState(true);

  // Fonction pour calculer le prix affiché
  const calculatePrice = (originalPrice: number) => {
    if (!isKapNumerik) return originalPrice;
    // Kap Numérik couvre 80% des dépenses jusqu'à 3200€
    // Donc si le site coûte 2200€, l'aide est de 1760€ (2200 * 0.8) -> Reste à charge 440€
    // Si le site coûte 3800€, l'aide est plafonnée à 3200€ -> Reste à charge 600€
    
    // Simplification pour l'affichage marketing (ou calcul réel selon ta préférence)
    // Ici je simule le calcul réel approximatif de l'aide (souvent 80% du HT)
    const aide = Math.min(originalPrice * 0.8, 3200);
    return Math.floor(originalPrice - aide);
  };

  return (
    <section id="tarifs" className="py-24 bg-slate-950 relative overflow-hidden">
      
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

          {/* Toggle Kap Numérik */}
          <div className="flex flex-col items-center gap-3 mt-8">
            <div className="flex items-center gap-4 bg-slate-900/80 p-2 pr-6 rounded-full border border-white/10 backdrop-blur-sm">
                <button 
                    onClick={() => setIsKapNumerik(!isKapNumerik)}
                    aria-label={isKapNumerik ? "Désactiver la simulation Kap Numérik" : "Activer la simulation Kap Numérik"}
                    aria-pressed={isKapNumerik}
                    type="button"
                    className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#ffa800] focus:ring-offset-2 focus:ring-offset-slate-900 ${isKapNumerik ? 'bg-[#ffa800]' : 'bg-slate-700'}`}
                >
                    <div className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isKapNumerik ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
                <span className="text-sm font-medium text-white flex items-center gap-2">
                    ⚡ Simuler l'aide Régionale (Kap Numérik)
                    {/* Tooltip simple au survol */}
                    <div className="group relative">
                        <HelpCircle className="w-4 h-4 text-slate-500 cursor-help" />
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-slate-800 text-xs text-slate-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl">
                            Simule le remboursement jusqu'à 3200€ pour les entreprises éligibles à la Réunion.
                        </div>
                    </div>
                </span>
            </div>
            {isKapNumerik && (
                <motion.p 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-[#ffa800] font-medium"
                >
                    *Montants estimés après remboursement (Sous réserve d'éligibilité)
                </motion.p>
            )}
          </div>
        </div>

        {/* Grille des Offres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* OFFRE 1 : VITRINE */}
          <div className="relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 flex flex-col hover:bg-slate-900/60 transition-colors">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Présence en ligne</h3>
                <p className="text-slate-400 text-sm h-10">Pour que vos clients vous trouvent et vous fassent confiance.</p>
            </div>
            <div className="mb-8">
                {isKapNumerik ? (
                    <div className="space-y-1">
                        <span className="text-sm text-slate-500 line-through block">1 600€ HT</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-white">{calculatePrice(1600)}€</span>
                            <span className="text-sm text-slate-400">/ projet</span>
                        </div>
                         <span className="inline-block px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs rounded border border-emerald-500/20 mt-2">
                            Remboursé à ~80%
                        </span>
                    </div>
                ) : (
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white">1 600€</span>
                        <span className="text-sm text-slate-400">HT</span>
                    </div>
                )}
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
                <li className="flex items-start gap-3 text-sm text-slate-500">
                    <X className="w-5 h-5 shrink-0" /> Accompagnement aide régionale
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
                {isKapNumerik ? (
                    <div className="space-y-1">
                        <span className="text-sm text-slate-500 line-through block">3 200€ HT</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-bold text-[#ffa800]">{calculatePrice(3200)}€</span>
                            <span className="text-sm text-slate-400">/ projet</span>
                        </div>
                        <span className="inline-block px-2 py-0.5 bg-[#ffa800]/10 text-[#ffa800] text-xs rounded border border-[#ffa800]/20 mt-2">
                            Aide Kap Numérik déduite
                        </span>
                    </div>
                ) : (
                    <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold text-[#ffa800]">3 200€</span>
                        <span className="text-sm text-slate-400">HT</span>
                    </div>
                )}
            </div>
            <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-sm text-white font-medium">
                    <Check className="w-5 h-5 text-[#ffa800] shrink-0" /> Je monte votre dossier Kap Numérik
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-[#ffa800] shrink-0" /> Vendez et encaissez en ligne
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-[#ffa800] shrink-0" /> Suivez votre activité en un coup d'oeil
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-[#ffa800] shrink-0" /> Fini les relances manuelles
                </li>
                 <li className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-[#ffa800] shrink-0" /> Je vous forme à tout utiliser (2h)
                </li>
            </ul>
            <Button className="w-full bg-[#ffa800] text-black hover:bg-[#ffb92e] font-bold shadow-lg shadow-[#ffa800]/20" asChild>
                <Link href="?type=eligibilite#contact">Je suis éligible ?</Link>
            </Button>
          </div>

          {/* OFFRE 3 : SUR MESURE */}
          <div className="relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 flex flex-col hover:bg-slate-900/60 transition-colors">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Sur-mesure</h3>
                <p className="text-slate-400 text-sm h-10">Votre problème est unique ? Ma solution aussi.</p>
            </div>
            <div className="mb-8 flex items-baseline gap-1 h-22 pt-6"> {/* Hauteur fixe pour alignement */}
                <span className="text-3xl font-bold text-white">Sur Devis</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
                 <li className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-slate-500 shrink-0" /> Un outil 100% adapté à votre métier
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-slate-500 shrink-0" /> L'IA qui travaille pour vous
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
                <span className="text-[#ffa800]">*</span> Le dispositif Kap Numérik est une aide régionale soumise à éligibilité. 
                Je vous accompagne dans le montage du dossier, mais l'accord final dépend de la Région Réunion. 
                Le paiement se fait généralement en deux temps (acompte client puis remboursement).
            </p>
        </div>

      </div>
    </section>
  );
}