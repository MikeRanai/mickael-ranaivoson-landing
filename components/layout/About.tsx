'use client'

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Coffee, Heart, Lightbulb } from "lucide-react";

export function About() {
  return (
    <section id="apropos" className="py-24 bg-slate-900/50 relative overflow-hidden">

      {/* Fond décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full translate-x-1/2" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              <div className="w-full h-full rounded-3xl bg-slate-800 border border-white/10 overflow-hidden">
                <Image
                  src="/images/mickael-photo.jpg"
                  alt="Mickaël Ranaivoson"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Badge localisation */}
              <div className="absolute -bottom-4 -right-4 bg-slate-900 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-2 shadow-xl">
                <MapPin className="w-4 h-4 text-[#ffa800]" />
                <span className="text-white text-sm font-medium">La Réunion</span>
              </div>
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
              <span className="text-[#ffa800] font-medium text-sm uppercase tracking-wider">
                L'humain derrière l'écran
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                Je suis Mickaël, et je déteste voir des gens galérer.
              </h2>
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
