'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, FileText, BadgeCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { TopoBackground } from "@/components/ui/topo-background";
import { trackEvent, EVENTS } from "@/lib/analytics";

export function Hero() {
  const reduce = useReducedMotion();

  // Entrée douce sur les éléments secondaires uniquement.
  // Le <h1> (élément LCP) n'est volontairement PAS animé : démarrer à
  // opacity:0 retarderait sa peinture et dégraderait le score PageSpeed.
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay },
        };

  return (
    <section className="relative min-h-screen flex items-center pt-16 sm:pt-20 overflow-hidden bg-slate-950">
      {/* Fond : motif topographique (identité Réunion) + halos statiques */}
      <TopoBackground />

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Eyebrow identité — repris du style de label du design system */}
        <motion.div
          {...rise(0)}
          className="flex items-center justify-center gap-3 mb-5 sm:mb-7"
        >
          <span className="h-px w-8 bg-[#ffa800]/50" />
          <span className="text-[#ffa800] font-mono text-xs uppercase tracking-[0.2em] font-medium">
            Développeur freelance · La Réunion 974
          </span>
          <span className="h-px w-8 bg-[#ffa800]/50" />
        </motion.div>

        {/* TITRE — élément LCP, peint immédiatement (pas d'animation d'entrée) */}
        <h1 className="font-oswald text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-bold tracking-normal text-white mb-4 sm:mb-6 leading-[1.05]">
          Arrêtez de perdre vos <br className="hidden md:block" />
          <span className="text-[#ffa800]">soirées sur la paperasse.</span>
        </h1>

        {/* SOUS-TITRE */}
        <motion.p
          {...rise(0.1)}
          className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Je crée des outils sur-mesure qui automatisent votre <strong className="text-slate-200 font-semibold">gestion</strong>, vos <strong className="text-slate-200 font-semibold">ventes</strong> et votre <strong className="text-slate-200 font-semibold">administratif</strong>
          {" "}— pour les TPE, artisans et associations de La Réunion.
        </motion.p>

        {/* BOUTONS D'ACTION */}
        <motion.div
          {...rise(0.2)}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-4"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-[#ffa800] text-slate-950 hover:bg-[#ffb92e] text-lg px-8 font-bold h-14 rounded-xl shadow-[0_0_24px_-6px_rgba(255,168,0,0.45)] transition-all hover:scale-[1.03]"
            asChild
          >
            <Link
              href="/liberer-mon-potentiel"
              onClick={() => trackEvent(EVENTS.ctaClick, { cta: "liberer-mon-potentiel", location: "hero" })}
            >
              Libérer mon potentiel <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            /* Mobile : simple lien texte — un second bouton pleine hauteur
               poussait le bandeau de réassurance sous la ligne de flottaison.
               À partir de sm, il redevient le bouton outline d'origine. */
            className="border-0 sm:border sm:border-white/15 bg-transparent h-auto sm:h-14 px-0 sm:px-8 text-base sm:text-lg underline sm:no-underline underline-offset-4 text-slate-300 sm:text-white hover:bg-transparent sm:hover:bg-white/5 hover:text-white sm:hover:border-white/25 rounded-none sm:rounded-xl"
            asChild
          >
            <Link
              href="#realisations"
              onClick={() => trackEvent(EVENTS.ctaClick, { cta: "voir-les-resultats", location: "hero" })}
            >
              Voir les résultats
            </Link>
          </Button>
        </motion.div>

        {/* BANDEAU DE CONFIANCE — réassurance factuelle sous les CTA */}
        <motion.ul
          {...rise(0.3)}
          className="mt-7 sm:mt-10 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-xs sm:text-sm text-slate-400"
        >
          <li className="inline-flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#ffa800]" aria-hidden />
            Basé à Saint-Paul (974)
          </li>
          <li className="hidden sm:block w-px h-4 bg-white/10" aria-hidden />
          <li className="inline-flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#ffa800]" aria-hidden />
            Devis gratuit
          </li>
          <li className="hidden sm:block w-px h-4 bg-white/10" aria-hidden />
          <li className="inline-flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-[#ffa800]" aria-hidden />
            {/* Le dispositif est suspendu (cf. lib/kap-numerik.ts) : on ne
                promet plus de montant en héro. */}
            Accompagnement aides régionales
            {/* Mobile : tronqué pour tenir sur une ligne, le sens reste entier */}
            <span className="hidden sm:inline">&nbsp;(Kap Numérik)</span>
          </li>
        </motion.ul>
      </div>
    </section>
  );
}

export default Hero;
