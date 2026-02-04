'use client'

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
  highlightColor?: "gold" | "muted";
}

export function SectionHeader({
  label,
  title,
  highlight,
  subtitle,
  align = "center",
  highlightColor = "gold",
}: SectionHeaderProps) {
  const alignClasses = align === "center" ? "text-center mx-auto" : "text-left";
  const highlightClasses = highlightColor === "gold"
    ? "text-[#ffa800]"
    : "text-slate-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`max-w-3xl ${alignClasses} space-y-4`}
    >
      {/* Badge/Label */}
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-[#ffa800]/50" />
        <span className="text-[#ffa800] font-mono text-xs uppercase tracking-[0.2em] font-medium">
          {label}
        </span>
        <span className="h-px w-8 bg-[#ffa800]/50" />
      </div>

      {/* Titre principal */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
        {title}
        {highlight && (
          <>
            <br className="hidden md:block" />{" "}
            <span className={highlightClasses}>{highlight}</span>
          </>
        )}
      </h2>

      {/* Sous-titre */}
      {subtitle && (
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
