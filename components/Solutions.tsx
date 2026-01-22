'use client'

import { motion, Variants } from "framer-motion";
// L'import fonctionnera maintenant que le fichier Étape 1 est créé
import { TechScreenshot3D } from "./ui/tech-screenshot-3d";
import { ShoppingBag, TrendingUp, ArrowRight, Zap, Lock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Animation simple et fluide
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Solutions() {
  return (
    <section id="solutions" className="py-24 px-6 w-full bg-slate-950 text-white overflow-hidden relative">
      
      {/* Fond d'ambiance (Glows corrigés avec classes standards) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Titre */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Des Solutions, <span className="text-slate-500">Pas Juste du Code</span>
          </h2>
          <p className="text-lg text-slate-400">
            Une approche stratégique. Je construis des outils robustes qui transforment vos processus.
          </p>
        </div>

        {/* Grille Bento */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >

          {/* CARTE 1 : SaaS / App Métier (Grande carte) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 relative overflow-hidden rounded-3xl bg-slate-900 border border-white/5 p-8 flex flex-col group hover:border-amber-500/30 transition-colors"
          >
            <div className="relative z-10 mb-8 max-w-lg">
              <span className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-amber-500/20">
                <Zap className="w-3 h-3" /> Expertise Phare
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Applications Métiers & Automatisation</h3>
              <p className="text-slate-400 text-base leading-relaxed">
                Ne perdez plus de temps sur Excel. Des tableaux de bord sur-mesure pour piloter votre activité.
              </p>
              <div className="flex gap-4 mt-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Lock className="w-4 h-4 text-amber-500" /> Sécurisé</span>
                  <span className="flex items-center gap-1"><BarChart3 className="w-4 h-4 text-amber-500" /> Temps réel</span>
              </div>
            </div>

            {/* Zone Image centrée et propre */}
            <div className="mt-auto w-full flex justify-center items-center pt-6">
              <div className="w-full max-w-lg shadow-2xl">
                <TechScreenshot3D 
                    src="/images/desktop-dashboard-nout-asso.png" 
                    alt="Dashboard NoutAsso" 
                    type="desktop"
                />
              </div>
            </div>
          </motion.div>

          {/* CARTE 2 : Mobile First (Haute) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-1 md:row-span-2 relative overflow-hidden rounded-3xl bg-slate-900 border border-white/5 p-8 flex flex-col items-center text-center group hover:border-amber-500/30 transition-colors"
          >
            <div className="relative z-10 mb-8">
              <h3 className="text-xl font-bold mb-2 text-white">100% Mobile First</h3>
              <p className="text-slate-400 text-sm">
                Vos outils dans votre poche. Accessible partout.
              </p>
            </div>

            {/* Zone Mobile centrée */}
            <div className="flex-1 w-full flex justify-center items-center">
                <div className="w-full transform transition-transform duration-500 group-hover:scale-105">
                    <TechScreenshot3D 
                        src="/images/mobile-dashboard-nout-asso.png" 
                        alt="Application Mobile" 
                        type="mobile"
                    />
                </div>
            </div>
          </motion.div>

          {/* CARTE 3 : E-Commerce */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-1 min-h-60 relative overflow-hidden rounded-3xl bg-slate-900 border border-white/5 p-6 hover:bg-slate-800 transition-colors group hover:border-amber-500/30"
          >
            <div className="h-10 w-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 border border-amber-500/20">
              <ShoppingBag className="text-amber-500 h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Sites E-commerce</h3>
            <p className="text-slate-400 text-sm">
              Tunnels de vente optimisés pour la conversion.
            </p>
          </motion.div>

          {/* CARTE 4 : SEO */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-1 min-h-60 relative overflow-hidden rounded-3xl bg-slate-900 border border-white/5 p-6 hover:bg-slate-800 transition-colors group hover:border-amber-500/30"
          >
             <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 border border-blue-500/20">
              <TrendingUp className="text-blue-500 h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Visibilité SEO</h3>
            <p className="text-slate-400 text-sm mb-4">
              Positionnez-vous devant vos concurrents sur Google.
            </p>
            <Link href="#contact" className="text-amber-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                En savoir plus <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}