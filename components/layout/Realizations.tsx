'use client'

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Rocket, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Realizations() {
  return (
    <section id="realisations" className="py-32 bg-slate-950 relative overflow-hidden">
      
      {/* Fond décoratif (Glow subtil) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-150 bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Titre Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Réalisations <br/>
              <span className="text-slate-500">marquantes.</span>
            </h2>
            <p className="text-lg text-slate-400">
              Des projets conçus pour performer. Pas juste pour faire joli.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex border-white/10 hover:bg-white/5 text-white gap-2">
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

                    {/* Stats Clés */}
                    <div className="grid grid-cols-2 gap-6 mb-8 border-t border-white/5 pt-6">
                        <div>
                            <p className="text-2xl font-bold text-white mb-1">100%</p>
                            <p className="text-sm text-slate-500">Digitalisé</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white mb-1">Automatisé</p>
                            <p className="text-sm text-slate-500">Transactions & Rapports financiers</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
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
                    <p className="text-slate-400 text-sm mb-4 flex-1">
                        Transformation d'un site vieillissant en machine à leads. Performance technique maximale et SEO local.
                    </p>
                    <Link href="https://hcouest.fr" className="inline-flex items-center text-white font-medium hover:text-blue-400 transition-colors">
                        Voir le site <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                 </div>
            </div>

            {/* PROJET 3 (Placeholder ou autre) */}
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
                    <p className="text-slate-400 text-sm mb-4 flex-1">
                        Création d'une application interne pour optimiser la gestion du service après-vente d'une entreprise informatique.
                    </p>
                    <Link href="#contact" className="inline-flex items-center text-white font-medium hover:text-emerald-500 transition-colors">
                        Voir le site <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                 </div>
            </div>

        </div>

      </div>
    </section>
  );
}