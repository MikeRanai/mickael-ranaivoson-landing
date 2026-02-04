'use client'

import { motion } from "framer-motion";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <div className={`relative py-8 ${className}`}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-center gap-4 max-w-7xl mx-auto px-6"
      >
        {/* Ligne gauche */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-white/10" />

        {/* Losange central avec glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#ffa800] blur-md opacity-40" />
          <div className="relative w-2 h-2 bg-[#ffa800] rotate-45" />
        </div>

        {/* Ligne droite */}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/10 to-white/10" />
      </motion.div>
    </div>
  );
}
