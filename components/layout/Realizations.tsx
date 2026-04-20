'use client'

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

export function Realizations() {
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
          <Button variant="outline" className="hidden md:flex border-white/10 hover:bg-white/5 text-white gap-2 shrink-0">
            Voir tous les projets <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* --- PROJET 1 : NOUTASSO (Grande Carte) --- */}
        <div className="group relative w-full rounded-3xl overflow-hidden bg-slate-900/50 border border-white/5 hover:border-[#ffa800]/30 transition-all duration-500 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                
                {/* Contenu Texte */}
                <div className="p-6 md:p-10 flex flex-col justify-center order-2 lg:order-1 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-3 h-3 rounded-full bg-[#ffa800] shadow-[0_0_10px_#ffa800]"></span>
                        <span className="text-[#ffa800] font-mono text-sm uppercase tracking-widest">SaaS & Automatisation</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                        NoutAsso
                    </h3>
                    
                    <p className="text-slate-400 text-base mb-6 leading-relaxed max-w-md">
                        La plateforme de référence pour les associations réunionnaises. Gestion des adhésions, des transactions et documents financiers automatisés.
                    </p>

                    {/* KPIs concrets — placeholders réalistes à ajuster avec tes vrais chiffres */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-8 border-t border-white/5 pt-6">
                        <div>
                            <p className="text-2xl font-bold text-[#ffa800] mb-1">−40%</p>
                            <p className="text-xs text-slate-500 leading-tight">de charge mentale au bureau</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[#ffa800] mb-1">+25%</p>
                            <p className="text-xs text-slate-500 leading-tight">d'adhésions en ligne (vs papier)</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white mb-1">2h → 5min</p>
                            <p className="text-xs text-slate-500 leading-tight">génération du rapport financier</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white mb-1">100%</p>
                            <p className="text-xs text-slate-500 leading-tight">conforme attentes Préfecture</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button asChild className="bg-white text-black hover:bg-slate-200 font-bold rounded-full px-8">
                            <Link href="https://noutasso.fr" target="_blank">
                                Voir le site <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Image "Full Bleed" (Prend toute la place) */}
                <div className="relative h-64 lg:h-auto order-1 lg:order-2 overflow-hidden bg-slate-800">
                     <Image 
                        src="/images/noutasso.png" 
                        alt="NoutAsso Interface"
                        fill
                        className="object-contain transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    {/* Overlay Gradient pour fondre l'image */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent lg:bg-linear-to-l opacity-80" />
                </div>
            </div>
        </div>


        {/* --- GRID PROJETS SECONDAIRES --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* PROJET 2 */}
            <div className="group relative rounded-3xl overflow-hidden bg-slate-900/50 border border-white/5 hover:border-blue-500/30 transition-all duration-500 flex flex-col">
                 <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
                     {/* Mets une autre image ici */}
                     <Image 
                        src="/images/site-illustration-hco.png" 
                        alt="Site Vitrine"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                     <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
                 </div>
                 <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                        <span className="text-blue-400 font-mono text-xs uppercase tracking-widest">Vitrine Premium</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">Hockey Club de l'Ouest</h4>
                    <p className="text-slate-400 text-sm mb-4">
                        Transformation d'un site vieillissant en machine à leads. Performance technique maximale et SEO local.
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-400 mb-4 flex-1">
                        <li className="flex items-center gap-2"><span className="text-blue-400">▸</span> Score PageSpeed 95+ (mobile)</li>
                        <li className="flex items-center gap-2"><span className="text-blue-400">▸</span> 1ʳᵉ page Google sur les requêtes locales</li>
                        <li className="flex items-center gap-2"><span className="text-blue-400">▸</span> Tunnel d'inscription en ligne fluide</li>
                    </ul>
                    <Link href="https://hcouest.fr" target="_blank" className="inline-flex items-center text-white font-medium hover:text-blue-400 transition-colors">
                        Voir le site <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                 </div>
            </div>

            {/* PROJET 3 : Association Culture Afro */}
            <div className="group relative rounded-3xl overflow-hidden bg-slate-900/50 border border-white/5 hover:border-rose-500/30 transition-all duration-500 flex flex-col">
                 <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
                     <Image
                        src="/images/benevoles.webp"
                        alt="Association Culture Afro"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                     <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
                 </div>
                 <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                        <span className="text-rose-400 font-mono text-xs uppercase tracking-widest">Site Vitrine</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">Association Culture Afro</h4>
                    <p className="text-slate-400 text-sm mb-4">
                        Site vitrine pour une association réunionnaise passionnée qui accompagne les femmes à comprendre, entretenir et aimer leurs cheveux texturés.
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-400 mb-4 flex-1">
                        <li className="flex items-center gap-2"><span className="text-rose-400">▸</span> Identité visuelle alignée à la mission</li>
                        <li className="flex items-center gap-2"><span className="text-rose-400">▸</span> Page d'inscription aux ateliers en ligne</li>
                        <li className="flex items-center gap-2"><span className="text-rose-400">▸</span> SEO local : Réunion + thématique cheveux</li>
                    </ul>
                    <Link href="https://www.assocultureafro.fr/" target="_blank" className="inline-flex items-center text-white font-medium hover:text-rose-400 transition-colors">
                        Voir le site <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                 </div>
            </div>

            {/* PROJET 4 (Placeholder ou autre) */}
            <div className="group relative rounded-3xl overflow-hidden bg-slate-900/50 border border-white/5 hover:border-emerald-500/30 transition-all duration-500 flex flex-col">
                 <div className="relative h-48 w-full bg-slate-800 overflow-hidden flex items-center justify-center">
                     <div className="text-slate-600 font-mono text-lg">Projet Confidentiel</div>
                     {/* Abstract background */}
                     <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                 </div>
                 <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                         <span className="text-emerald-500 font-mono text-xs uppercase tracking-widest">Application web</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">FD Informatique</h4>
                    <p className="text-slate-400 text-sm mb-4">
                        Application interne pour optimiser la gestion du service après-vente d'une entreprise informatique.
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-400 mb-4 flex-1">
                        <li className="flex items-center gap-2"><span className="text-emerald-500">▸</span> Suivi temps réel des interventions SAV</li>
                        <li className="flex items-center gap-2"><span className="text-emerald-500">▸</span> Historique client centralisé</li>
                        <li className="flex items-center gap-2"><span className="text-emerald-500">▸</span> Réduction des oublis de relance</li>
                    </ul>
                    <Link href="?type=projet#contact" className="inline-flex items-center text-white font-medium hover:text-emerald-500 transition-colors">
                        En discuter <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                 </div>
            </div>

        </div>

      </div>
    </section>
  );
}