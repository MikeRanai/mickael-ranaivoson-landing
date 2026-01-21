"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Smartphone,
  ShoppingBag,
  TrendingUp,
  ArrowRight,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

// ===========================================
// Animation Variants
// ===========================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const floatVariants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

// ===========================================
// Sub-components
// ===========================================

function SectionBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-125 h-125 rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-100 h-100 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-[#ffa800]/5 blur-[150px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}

function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-4 max-w-3xl mx-auto mb-16"
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ffa800]/30 bg-[#ffa800]/5 backdrop-blur-sm mb-4">
        <Sparkles className="w-4 h-4 text-[#ffa800]" />
        <span className="text-xs sm:text-sm font-medium text-[#ffa800]">
          Solutions Premium
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
        Des Solutions,{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #ffa800 0%, #ffb92e 50%, #fcd34d 100%)",
          }}
        >
          Pas Juste du Code
        </span>
      </h2>

      <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
        Une approche stratégique pour développer votre activité. Je construis
        des outils qui vous font gagner du temps et de l&apos;argent.
      </p>
    </motion.div>
  );
}

function StatBadge({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/5 border border-white/10">
      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-[#ffa800]/20 flex items-center justify-center">
        <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#ffa800]" />
      </div>
      <div>
        <div className="text-xs sm:text-sm font-bold text-white">{value}</div>
        <div className="text-[10px] sm:text-xs text-slate-500">{label}</div>
      </div>
    </div>
  );
}

// ===========================================
// Bento Cards
// ===========================================

function MainFeatureCard() {
  return (
    <motion.div
      variants={itemVariants}
      className="md:col-span-2 md:row-span-2 relative group"
    >
      {/* Card with gold border glow on hover */}
      <div
        className="relative h-full min-h-137.5 sm:min-h-150 md:min-h-155 overflow-hidden rounded-2xl sm:rounded-3xl
        bg-linear-to-br from-slate-900 via-slate-900 to-slate-800
        border border-[#ffa800]/20
        transition-all duration-500
        group-hover:border-[#ffa800]/50
        group-hover:shadow-[0_0_40px_-10px_rgba(255,168,0,0.3)]"
      >
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-linear-to-br from-[#ffa800]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex flex-col">
          {/* Header - Always visible */}
          <div className="mb-4 md:mb-6 md:max-w-[60%]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffa800] text-slate-950 text-xs font-bold mb-3 md:mb-4">
              <Zap className="w-3 h-3" />
              Expertise Phare
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight">
              Applications Métiers &{" "}
              <span className="text-[#ffa800]">Automatisation IA</span>
            </h3>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Ne perdez plus de temps sur Excel. Je développe des SaaS et
              tableaux de bord sur-mesure pour piloter votre activité en temps réel.
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
            <StatBadge icon={Clock} value="-70%" label="Temps admin" />
            <StatBadge icon={Shield} value="100%" label="Sécurisé" />
          </div>

          {/* Dashboard Preview - Positioned at bottom right, overlapping edge */}
          <div className="relative flex-1 mt-auto">
            <motion.div
              variants={floatVariants}
              animate="animate"
              className="absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 md:-bottom-8 md:-right-8 w-[95%] sm:w-[90%] md:w-[75%]"
            >
              {/* Safari Window Frame */}
              <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950">
                {/* Browser Header */}
                <div className="h-7 sm:h-8 md:h-9 flex items-center px-3 md:px-4 bg-slate-800/80 border-b border-white/5">
                  <div className="flex space-x-1.5 sm:space-x-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="ml-3 md:ml-4 flex-1 max-w-40 md:max-w-xs h-5 bg-slate-900/50 rounded-md flex items-center justify-center px-3">
                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-mono truncate">
                      app.noutasso.re
                    </span>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="relative aspect-16/10 bg-slate-900">
                  <Image
                    src="/images/desktop-dashboard-nout-asso.png"
                    alt="Dashboard NoutAsso - Application de gestion"
                    fill
                    className="object-cover object-top-left"
                    sizes="(max-width: 640px) 95vw, (max-width: 768px) 90vw, 55vw"
                  />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>

              {/* Floating glow behind */}
              <div className="absolute -inset-4 bg-[#ffa800]/10 blur-2xl rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MobileFeatureCard() {
  return (
    <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2 relative group">
      <div
        className="relative h-full min-h-112.5 sm:min-h-125 md:min-h-155 overflow-hidden rounded-2xl sm:rounded-3xl
        bg-linear-to-b from-slate-900 to-slate-950
        border border-[#ffa800]/20
        transition-all duration-500
        group-hover:border-[#ffa800]/50
        group-hover:shadow-[0_0_40px_-10px_rgba(255,168,0,0.3)]"
      >
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,168,0,0.1)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-4 md:mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#ffa800]/20 mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
              <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 text-[#ffa800]" />
            </div>

            <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-white mb-2">
              100% Mobile First
            </h3>

            <p className="text-slate-400 text-sm">
              Vos outils dans votre poche. Accessibilité totale, partout.
            </p>
          </div>

          {/* Phone Mockup */}
          <div className="relative flex-1 flex items-end justify-center pb-4">
            <motion.div
              variants={floatVariants}
              animate="animate"
              className="relative"
            >
              {/* Phone Frame */}
              <div className="relative w-44 sm:w-52 md:w-56 aspect-9/19 bg-slate-900 rounded-[2.5rem] sm:rounded-[3rem] border-4 sm:border-[5px] border-slate-800 shadow-2xl overflow-hidden">
                {/* Dynamic Island */}
                <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 md:w-24 h-5 sm:h-6 md:h-7 bg-black rounded-full z-20" />

                {/* Screen */}
                <div className="relative w-full h-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden">
                  <Image
                    src="/images/mobile-dashboard-nout-asso.png"
                    alt="Application Mobile NoutAsso"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 224px"
                  />
                  {/* Screen shine */}
                  <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent opacity-30" />
                </div>

                {/* Side buttons */}
                <div className="absolute -right-1.5 top-24 sm:top-28 w-1 h-12 sm:h-14 bg-slate-700 rounded-r-lg" />
                <div className="absolute -left-1.5 top-20 sm:top-24 w-1 h-8 sm:h-10 bg-slate-700 rounded-l-lg" />
                <div className="absolute -left-1.5 top-32 sm:top-36 w-1 h-12 sm:h-14 bg-slate-700 rounded-l-lg" />
              </div>

              {/* Glow effect behind phone */}
              <div className="absolute -inset-8 sm:-inset-10 bg-[#ffa800]/20 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

        className="relative h-full min-h-55 sm:min-h-60 overflow-hidden rounded-2xl sm:rounded-3xl
        bg-linear-to-br from-slate-900 to-slate-950
        border border-[#ffa800]/20
        transition-all duration-500
        group-hover:border-[#ffa800]/50
        group-hover:shadow-[0_0_30px_-10px_rgba(255,168,0,0.3)]
        p-6 sm:p-8"
      >
        {/* Icon */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-[#ffa800]/20 to-orange-500/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 text-[#ffa800]" />
        </div>

        {/* Content */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
          Sites qui Convertissent
        </h3>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
          Design persuasif et performance SEO pour transformer vos visiteurs en clients fidèles.
        </p>

        {/* Metric */}
        <div className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl font-bold text-[#ffa800]">+150%</span>
          <span className="text-xs sm:text-sm text-slate-500">taux de conversion</span>
        </div>

        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-[#ffa800]/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

function SEOCard() {
  return (
    <motion.div variants={itemVariants} className="md:col-span-2 relative group">
      <div
        className="relative h-full min-h-55 sm:min-h-60 overflow-hidden rounded-2xl sm:rounded-3xl
        bg-linear-to-br from-slate-900 to-slate-950
        border border-[#ffa800]/20
        transition-all duration-500
        group-hover:border-[#ffa800]/50
        group-hover:shadow-[0_0_30px_-10px_rgba(255,168,0,0.3)]
        p-6 sm:p-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 h-full">
          {/* Icon */}
          <div className="w-16 h-16 sm:w-18 md:w-20 sm:h-18 md:h-20 rounded-2xl sm:rounded-full bg-linear-to-br from-blue-500/20 to-indigo-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <TrendingUp className="w-8 h-8 sm:w-9 md:w-10 sm:h-9 md:h-10 text-blue-400" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
              Stratégie & Visibilité SEO
            </h3>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Un code propre et optimisé pour Google. Positionnez-vous devant vos concurrents grâce à une structure technique irréprochable.
            </p>
          </div>

          {/* CTA */}
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full
              border border-[#ffa800]/30 bg-[#ffa800]/10
              text-[#ffa800] font-semibold text-sm sm:text-base
              hover:bg-[#ffa800] hover:text-slate-950
              transition-all duration-300 group/btn shrink-0 w-full sm:w-auto"
          >
            En savoir plus
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-1/2 w-40 sm:w-56 h-40 sm:h-56 bg-blue-500/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

// ===========================================
// Main Component
// ===========================================
export function Solutions() {
  return (
    <section
      id="solutions"
      className="relative py-24 sm:py-32 px-4 sm:px-6 w-full bg-slate-950 text-white overflow-hidden"
    >
      {/* Background */}
      <SectionBackground />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader />

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {/* Main Feature - Large Card */}
          <MainFeatureCard />

          {/* Mobile Feature - Tall Card */}
          <MobileFeatureCard />

          {/* Conversion Card - Small */}
          <ConversionCard />

          {/* SEO Card - Wide */}
          <SEOCard />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full
              bg-[#ffa800] text-slate-950 font-bold text-sm sm:text-base
              hover:bg-[#ffb92e] transition-all duration-300
              shadow-[0_0_30px_-5px_rgba(255,168,0,0.4)]
              hover:shadow-[0_0_40px_-5px_rgba(255,168,0,0.6)]
              hover:scale-105 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto"
          >
            Démarrer mon projet
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Solutions;
