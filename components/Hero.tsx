"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

// ===========================================
// Animation Variants
// ===========================================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const blobVariants: Variants = {
  animate: {
    scale: [1, 1.15, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const blobVariants2: Variants = {
  animate: {
    scale: [1.1, 1, 1.1],
    opacity: [0.4, 0.3, 0.4],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const blobVariants3: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.2, 0.4, 0.2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ===========================================
// Sub-components
// ===========================================

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Blob 1: Top-left Indigo */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[60px] md:blur-[120px] will-change-transform"
      />

      {/* Blob 2: Bottom-right Blue */}
      <motion.div
        variants={blobVariants2}
        animate="animate"
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[60px] md:blur-[120px] will-change-transform"
      />

      {/* Blob 3: Center/Top Gold (Brand Color) */}
      <motion.div
        variants={blobVariants3}
        animate="animate"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-[#ffa800]/10 blur-[60px] md:blur-[120px] will-change-transform"
      />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#020617_70%)]" />
    </div>
  );
}

function Badge() {
  return (
    <motion.div
      variants={itemVariants}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full
        border border-[#ffa800]/30 bg-[#ffa800]/5 backdrop-blur-sm"
    >
      <span className="text-lg">✨</span>
      <span className="text-xs sm:text-sm font-medium text-[#ffa800]">
        Éligible Kap Numérik - Jusqu&apos;à 3200€ d&apos;aides
      </span>
    </motion.div>
  );
}

function Title() {
  return (
    <motion.h1
      variants={itemVariants}
      className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
    >
      Je libère les entrepreneurs
      <br className="hidden sm:block" />
      <span className="sm:hidden"> </span>de leur{" "}
      <span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #ffffff 0%, #ffa800 50%, #ffb92e 100%)",
        }}
      >
        paperasse digitale
      </span>
      .
    </motion.h1>
  );
}

function Subtitle() {
  return (
    <motion.p
      variants={itemVariants}
      className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
    >
      Fini les tableurs Excel qui plantent, les relances clients oubliées, les nuits blanches sur la compta.
      <span className="hidden sm:inline">
        {" "}
        Je crée des outils simples qui travaillent pour vous.
      </span>
    </motion.p>
  );
}

function CTAButtons() {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
    >
      {/* Primary CTA */}
      <Link
        href="#contact"
        className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full
          bg-[#ffa800] text-slate-950 font-bold text-sm sm:text-base
          hover:bg-[#ffb92e] transition-all duration-300
          shadow-[0_0_30px_-5px_rgba(255,168,0,0.4)]
          hover:shadow-[0_0_40px_-5px_rgba(255,168,0,0.6)]
          hover:scale-105"
      >
        Parlons de votre projet
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>

      {/* Secondary CTA */}
      <Link
        href="#realisations"
        className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full
          border border-white/10 bg-white/5 backdrop-blur-sm
          text-white font-medium text-sm sm:text-base
          hover:bg-white/10 hover:border-white/20 transition-all duration-300"
      >
        <Play className="w-4 h-4" />
        Voir ce que j'ai fait
      </Link>
    </motion.div>
  );
}

function SocialProof() {
  return (
    <motion.div
      variants={itemVariants}
      className="pt-12 sm:pt-16 flex flex-col items-center gap-4"
    >
      <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider font-medium">
        Structures accompagnées à La Réunion
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 sm:gap-8 opacity-50 px-4">
        <span className="text-slate-400 font-semibold text-sm sm:text-base">
          Associations
        </span>
        <span className="w-1 h-1 rounded-full bg-slate-600" />
        <span className="text-slate-400 font-semibold text-sm sm:text-base">
          Clubs sportifs
        </span>
        <span className="w-1 h-1 rounded-full bg-slate-600" />
        <span className="text-slate-400 font-semibold text-sm sm:text-base">
          TPE/PME
        </span>
        <span className="w-1 h-1 rounded-full bg-slate-600" />
        <span className="text-slate-400 font-semibold text-sm sm:text-base">
          Indépendants
        </span>
      </div>
    </motion.div>
  );
}

// ===========================================
// Main Hero Component
// ===========================================
export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex justify-center bg-slate-950 overflow-hidden">
      {/* Aurora Background Effect */}
      <AuroraBackground />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-2 sm:pt-24 sm:pb-20 text-center"
      >
        {/* Badge */}
        <div className="mb-6 sm:mb-8">
          <Badge />
        </div>

        {/* Title */}
        <div className="mb-6">
          <Title />
        </div>

        {/* Subtitle */}
        <div className="mb-8 sm:mb-10">
          <Subtitle />
        </div>

        {/* CTA Buttons */}
        <CTAButtons />

        {/* Social Proof */}
        <SocialProof />
      </motion.div>

      {/* Bottom Gradient Fade (optional, for smooth transition to next section) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}

export default Hero;
