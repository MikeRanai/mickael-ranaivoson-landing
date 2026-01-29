"use client";

import { motion } from "framer-motion";
import {
  Clock,
  CalendarX,
  HeadsetIcon,
  TrendingDown,
  Sunrise,
  Smartphone,
  BarChart3,
  Users,
  MessageCircle,
  Wrench,
  Rocket,
  Heart,
  ArrowRight,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Contact } from "@/components/layout/Contact";

const douleurs = [
  {
    icon: Clock,
    titre: "Vos soirées disparaissent",
    description:
      "Vous finissez tard parce qu'il y a toujours des tâches administratives à rattraper. Recopier, vérifier, relancer...",
  },
  {
    icon: CalendarX,
    titre: "Vos week-ends y passent aussi",
    description:
      "Le dimanche devient jour de paperasse. Vous rattrapez ce que vous n'avez pas eu le temps de faire en semaine.",
  },
  {
    icon: HeadsetIcon,
    titre: "Vous courez après tout le monde",
    description:
      "Relancer les paiements, rappeler les rendez-vous, répondre aux mêmes questions... Encore et encore.",
  },
  {
    icon: TrendingDown,
    titre: "Vous passez à côté d'opportunités",
    description:
      "Pendant que vous gérez l'administratif, des clients potentiels vont voir ailleurs. Vous n'avez pas le temps de développer.",
  },
];

const transformations = [
  {
    icon: Sunrise,
    titre: "Vos soirées vous appartiennent",
    description: "L'administratif tourne tout seul. Vous fermez boutique et vous rentrez chez vous l'esprit libre.",
  },
  {
    icon: Smartphone,
    titre: "Tout est accessible d'un coup d'œil",
    description: "Depuis votre téléphone, vous voyez ce qui se passe. Pas besoin d'être au bureau pour savoir où vous en êtes.",
  },
  {
    icon: BarChart3,
    titre: "Votre activité grandit sans vous épuiser",
    description: "Les tâches répétitives sont automatisées. Vous pouvez enfin vous concentrer sur ce qui fait vraiment avancer votre business.",
  },
  {
    icon: Users,
    titre: "Vos clients sont mieux servis",
    description: "Réponses plus rapides, moins d'oublis, une image plus professionnelle. Ils sentent la différence.",
  },
];

const etapes = [
  {
    numero: "01",
    icon: MessageCircle,
    titre: "On discute",
    description: "Vous m'expliquez ce qui vous prend du temps, ce qui vous fatigue, ce qui vous bloque. Gratuit, sans engagement, juste une conversation.",
  },
  {
    numero: "02",
    icon: Wrench,
    titre: "Je propose une solution",
    description: "Pas un devis de 15 pages. Une solution claire, adaptée à votre situation, avec un prix fixe. Vous savez exactement où vous allez.",
  },
  {
    numero: "03",
    icon: Rocket,
    titre: "Je construis, vous validez",
    description: "Je m'occupe de tout. Vous n'avez rien à installer, rien à configurer. Vous testez, vous me dites si ça correspond à vos besoins.",
  },
  {
    numero: "04",
    icon: Heart,
    titre: "Vous respirez",
    description: "Votre outil est en place. Je vous montre comment l'utiliser et je reste disponible si vous avez des questions.",
  },
];

export default function LibererMonPotentielPage() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-300">

      {/* ========== HERO ========== */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-0 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/15 blur-3xl rounded-full translate-x-1/2" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <span className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-sm font-medium px-4 py-2 rounded-full border border-amber-500/20">
              <MapPin className="w-4 h-4" />
              Basé à La Réunion
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Et si vous arrêtiez de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                tout porter seul ?
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Vous avez créé votre activité pour vivre de votre passion.
              Pas pour passer vos soirées à jongler entre les fichiers et les relances.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full
                  bg-[#ffa800] text-slate-950 font-bold text-base
                  hover:bg-amber-400 transition-all duration-300
                  shadow-[0_0_25px_-5px_rgba(255,168,0,0.4)]"
              >
                Discutons de votre situation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#realisations"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full
                  border border-white/10 text-white font-medium
                  hover:bg-white/5 transition-all duration-300"
              >
                Voir des exemples concrets
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== SECTION DOULEURS ========== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ça vous parle ?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Si vous vous reconnaissez dans une de ces situations, vous n'êtes pas seul.
              Et surtout, il y a des solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {douleurs.map((item, index) => (
              <motion.div
                key={item.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-red-500/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.titre}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION TRANSFORMATION ========== */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Maintenant, imaginez...
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Ce n'est pas de la magie. C'est juste ce qui se passe quand les bons outils
              travaillent pour vous.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {transformations.map((item, index) => (
              <motion.div
                key={item.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-emerald-500/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.titre}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION PARCOURS ========== */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comment ça se passe ?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Pas de process compliqué. Pas de jargon technique.
              On avance ensemble, étape par étape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {etapes.map((etape, index) => (
              <motion.div
                key={etape.numero}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 rounded-2xl bg-slate-900/50 border border-white/5"
              >
                <span className="absolute -top-4 left-6 text-5xl font-black text-slate-800">
                  {etape.numero}
                </span>
                <div className="relative z-10 pt-4">
                  <etape.icon className="w-8 h-8 text-amber-500 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{etape.titre}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{etape.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION CONFIANCE ========== */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Pourquoi me faire{" "}
                <span className="text-amber-500">confiance ?</span>
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Je suis développeur, basé à La Réunion. Je ne suis pas une agence avec
                des commerciaux et des process à rallonge. Quand vous m'appelez, c'est
                moi qui réponds. Quand vous avez un problème, c'est moi qui le règle.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">Un interlocuteur unique</span>
                    <p className="text-slate-500 text-sm">Pas de ping-pong entre services. Je suis votre contact du début à la fin.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">Des solutions qui durent</span>
                    <p className="text-slate-500 text-sm">Je construis des outils solides, pas des rustines temporaires.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium">Formation incluse</span>
                    <p className="text-slate-500 text-sm">Je ne vous livre pas un outil et je disparais. Je vous montre comment l'utiliser.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative max-w-sm mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/20 via-transparent to-blue-500/20 rounded-[2rem] blur-xl opacity-50" />
                <div className="relative aspect-square rounded-[2rem] bg-slate-800 border border-white/10 overflow-hidden">
                  <Image
                    src="/images/mickael-photo.jpg"
                    alt="Mickaël Ranaivoson"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 backdrop-blur-md bg-slate-900/80 border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500 blur-sm opacity-50 animate-pulse" />
                    <MapPin className="relative w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-none">La Réunion</p>
                    <p className="text-slate-500 text-[10px] uppercase tracking-wider font-medium mt-1">Disponible</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SECTION CONTACT (Formulaire existant) ========== */}
      <Suspense fallback={null}>
        <Contact />
      </Suspense>

      {/* ========== NOTE KAP NUMERIK (Discrète) ========== */}
      <section className="py-12 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            <span className="text-amber-500">Bon à savoir :</span> Certaines entreprises réunionnaises
            peuvent bénéficier d'aides régionales pour leur transformation digitale.
            Si vous pensez être concerné, on peut en discuter lors de notre échange.
          </p>
        </div>
      </section>

    </div>
  );
}
