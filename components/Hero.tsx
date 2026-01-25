'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
      
      {/* --- FOND ANIMÉ (Aurora Effect) --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-700/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-[#ffa800]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {/* Badge "Dispo" ou "Kap Numérik" */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#ffa800]" />
          <span className="text-sm font-medium text-slate-300">
            Éligible Kap Numérik - Jusqu'à <span className="text-[#ffa800]">3200€ d'aides</span>
          </span>
        </motion.div>

        {/* TITRE IMPACTANT */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
        >
          Retrouvez du temps pour <br className="hidden md:block" />
          <span 
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #ffffff 0%, #ffa800 60%, #ffb92e 100%)"
            }}
          >
            ce qui compte vraiment
          </span>
          <span 
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #ffffff 0%, #ffa800 60%, #ffb92e 100%)"
            }}
          >.</span>
        </motion.h1>

        {/* SOUS-TITRE */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          La gestion, la vente, l'administratif... et si <strong>votre solution digitale</strong> s'en chargeait à votre place ? 
          Je crée les outils sur-mesure qui libèrent votre agenda et développent votre activité 24h/24.
        </motion.p>

        {/* BOUTONS D'ACTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button 
            size="lg" 
            className="bg-[#ffa800] text-black hover:bg-[#ffb92e] text-lg px-8 font-bold h-14 rounded-full shadow-[0_0_20px_rgba(255,168,0,0.3)] transition-all hover:scale-105" 
            asChild
          >
            <Link href="#contact">
              Libérer mon potentiel <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white/10 text-white hover:bg-white/5 text-lg px-8 h-14 rounded-full" 
            asChild
          >
            <Link href="#realisations">
              Voir les résultats
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;