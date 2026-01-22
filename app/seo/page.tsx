"use client";

import { motion, Variants } from "framer-motion";
import {
  Zap,
  Gauge,
  Code2,
  Smartphone,
  Search,
  FileCode,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Clock,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

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

const services = [
  {
    icon: Gauge,
    title: "Audit Core Web Vitals",
    description: "Analyse complète des performances : LCP, FID, CLS. J'identifie les goulots d'étranglement et optimise le temps de chargement.",
    color: "amber",
  },
  {
    icon: Code2,
    title: "HTML Sémantique",
    description: "Structure du code optimisée pour les moteurs de recherche. Balises H1-H6, attributs ARIA, et hiérarchie logique du contenu.",
    color: "blue",
  },
  {
    icon: FileCode,
    title: "Données Structurées",
    description: "Implémentation Schema.org pour les rich snippets Google : FAQ, produits, avis, événements, fil d'Ariane.",
    color: "emerald",
  },
  {
    icon: Smartphone,
    title: "Mobile-First",
    description: "Optimisation responsive et performances mobiles. Google indexe en priorité la version mobile de votre site.",
    color: "purple",
  },
  {
    icon: Search,
    title: "Configuration Technique",
    description: "Sitemap XML, robots.txt, balises canoniques, redirections 301. Tout ce qu'il faut pour être bien indexé.",
    color: "rose",
  },
  {
    icon: Zap,
    title: "Optimisation Images",
    description: "Formats modernes (WebP, AVIF), lazy loading, dimensions optimisées. Des images légères sans perte de qualité.",
    color: "orange",
  },
];

const benefits = [
  "Meilleur classement Google",
  "Temps de chargement < 2s",
  "Expérience utilisateur optimale",
  "Taux de rebond réduit",
  "Plus de conversions",
  "Audit détaillé fourni",
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-500" },
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-500" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-500" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-500" },
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-500" },
  orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-500" },
};

export default function SEOPage() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full -translate-x-1/2" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 text-sm font-medium px-4 py-2 rounded-full border border-blue-500/20">
              <TrendingUp className="w-4 h-4" />
              SEO Technique
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Un Site Rapide,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400">
                Bien Référencé
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              Je suis développeur, pas juste consultant SEO. J'optimise le code source
              de votre site pour des performances maximales sur Google.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/#contact?type=audit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                  bg-amber-500 text-slate-950 font-bold text-base
                  hover:bg-amber-400 transition-all duration-300
                  shadow-[0_0_25px_-5px_rgba(255,168,0,0.4)]"
              >
                Demander un audit gratuit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                  border border-white/10 text-white font-medium
                  hover:bg-white/5 transition-all duration-300"
              >
                Retour à l'accueil
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-500">93%</div>
              <div className="text-sm text-slate-400 mt-1">Score Lighthouse moyen</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-400">&lt;2s</div>
              <div className="text-sm text-slate-400 mt-1">Temps de chargement</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-400">+150%</div>
              <div className="text-sm text-slate-400 mt-1">Trafic organique</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-400">Top 10</div>
              <div className="text-sm text-slate-400 mt-1">Positions Google</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ce que j'optimise
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Le SEO technique, c'est la fondation invisible qui fait toute la différence.
              Voici les leviers sur lesquels j'interviens.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => {
              const colors = colorClasses[service.color];
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group p-6 rounded-2xl bg-slate-900/50 border border-white/5
                    hover:border-white/10 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border
                    flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mon Processus
            </h2>
            <p className="text-slate-400">
              Une approche méthodique pour des résultats mesurables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Search,
                title: "Audit Complet",
                description: "Analyse technique de votre site : performances, indexation, erreurs, opportunités.",
              },
              {
                step: "02",
                icon: Code2,
                title: "Optimisation",
                description: "Implémentation des corrections et optimisations directement dans le code.",
              },
              {
                step: "03",
                icon: TrendingUp,
                title: "Suivi",
                description: "Rapport de progression et mesure de l'impact sur votre positionnement.",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-6 rounded-2xl bg-slate-900/50 border border-white/5"
              >
                <span className="absolute -top-4 left-6 text-5xl font-black text-slate-800">
                  {item.step}
                </span>
                <div className="relative z-10 pt-4">
                  <item.icon className="w-8 h-8 text-amber-500 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Pourquoi choisir un{" "}
                <span className="text-amber-500">développeur</span> pour le SEO ?
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                La plupart des consultants SEO font des recommandations. Moi, je les
                implémente directement dans le code. Pas de document Word de 50 pages
                que personne ne lit. Des actions concrètes, des résultats mesurables.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-slate-900 rounded-2xl border border-white/5 p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span className="text-slate-400">Délai moyen d'intervention</span>
                  <span className="ml-auto text-white font-bold">48-72h</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center gap-3 text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span className="text-slate-400">Garantie satisfaction</span>
                  <span className="ml-auto text-white font-bold">30 jours</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center gap-3 text-sm">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="text-slate-400">Suivi inclus</span>
                  <span className="ml-auto text-white font-bold">3 mois</span>
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-blue-500/10 rounded-3xl blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-white/10 p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Prêt à booster votre visibilité ?
            </h2>
            <p className="text-slate-400 mb-8">
              Je vous offre un audit SEO technique gratuit de votre site.
              Sans engagement, juste un premier diagnostic pour voir où vous en êtes.
            </p>
            <Link
              href="/#contact?type=audit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
                bg-amber-500 text-slate-950 font-bold text-lg
                hover:bg-amber-400 transition-all duration-300
                shadow-[0_0_30px_-5px_rgba(255,168,0,0.5)]"
            >
              Demander mon audit gratuit
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
