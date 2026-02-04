'use client'

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Coffee, Heart, Lightbulb } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

export function About() {
  return (
    <section id="apropos" className="py-24 bg-slate-950 relative overflow-hidden">

      {/* Fond décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full translate-x-1/2" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="mb-16">
          <SectionHeader
            label="À propos"
            title="L'humain"
            highlight="derrière l'écran."
            highlightColor="gold"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto lg:mx-0 group">
              {/* Effet Glow arrière-plan */}
              <div className="absolute -inset-1 bg-linear-to-tr from-amber-500/20 via-violet-500/20 to-blue-500/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-75 transition duration-1000" />

              {/* Bordure décorative décalée */}
              <div className="absolute inset-0 rounded-[2rem] border border-white/5 bg-white/5 rotate-6 scale-[0.95] translate-x-2 translate-y-2 -z-10 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-100" />

              {/* Conteneur Image Principal */}
              <div className="relative aspect-square rounded-[2rem] bg-slate-800 border border-white/10 overflow-hidden shadow-2xl">
                <Image
                  src="/images/mickael-photo.jpg"
                  alt="Mickaël Ranaivoson"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay subtil */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 via-transparent to-transparent opacity-60" />
              </div>

              {/* Badge localisation - Style Glassmorphism */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-6 backdrop-blur-md bg-slate-900/80 border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-slate-900/95 transition-colors"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500 blur-sm opacity-50 animate-pulse" />
                  <MapPin className="relative w-5 h-5 text-[#ffa800]" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-none">La Réunion</p>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider font-medium mt-1">Disponible</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Je suis Mickaël, et je déteste voir des gens galérer.
              </h3>
            </div>

            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Vous savez ce qui me frustre ? Voir un gérant d'association passer ses dimanches
                à recopier des adhésions sur Excel. Ou un artisan perdre des clients parce que
                son site ne s'affiche pas sur mobile.
              </p>
              <p>
                <span className="text-white font-medium">Ce n'est pas un problème de technologie.
                C'est un problème humain.</span> Des heures perdues, du stress, des opportunités
                manquées. La tech devrait simplifier la vie, pas la compliquer.
              </p>
              <p>
                Alors je crée des outils qui règlent des vrais problèmes. Pas des usines à gaz
                bourrées de fonctionnalités inutiles. Des solutions simples, qui font le job,
                et qui vous redonnent du temps pour ce qui compte vraiment.
              </p>
            </div>

            {/* Valeurs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Accessible</p>
                  <p className="text-slate-500 text-xs">On se parle simplement</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Impliqué</p>
                  <p className="text-slate-500 text-xs">Votre réussite, c'est la mienne</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Pragmatique</p>
                  <p className="text-slate-500 text-xs">Du concret, pas du bla-bla</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default About;
