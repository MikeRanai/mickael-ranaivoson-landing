'use client'

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from "framer-motion";

// Liste des technologies avec leurs couleurs au survol et sources d'images
const logos = [
  {
    name: "Next.js",
    color: "hover:text-white",
    src: "/images/Next.js_wordmark.svg",
    isImage: true,
    className: "invert" // Next.js logo is usually black, so invert for dark mode
  },
  {
    name: "React",
    color: "hover:text-[#61DAFB]",
    src: "/images/React_Logo_SVG.svg",
    isImage: true
  },
  {
    name: "TypeScript",
    color: "hover:text-[#3178C6]",
    src: "/images/Typescript.svg",
    isImage: true
  },
  {
    name: "Symfony",
    color: "hover:text-white",
    src: "/images/Symfony2.svg",
    isImage: true,
    className: "invert" // Symfony logo is usually black text
  },
  {
    name: "PostgreSQL",
    color: "hover:text-[#336791]",
    src: "/images/Postgresql_elephant.svg",
    isImage: true
  },
  {
    name: "Tailwind",
    color: "hover:text-[#38BDF8]",
    src: "/images/Tailwind_CSS_logo_with_dark_text.svg",
    isImage: true,
    className: "invert" // Invert to make dark text visible on dark bg
  },
  {
    name: "Prisma",
    color: "hover:text-white",
    src: "/images/prisma-2.svg",
    isImage: true,
    className: "invert"
  },
  {
    name: "Cloudflare",
    color: "hover:text-[#F38020]",
    src: "/images/Cloudflare_Logo.svg",
    isImage: true,
    // Cloudflare logo usually has black text, so invert for dark mode.
    // If the icon color shifts (orange -> blue), it's a tradeoff for text visibility without a specific dark-mode logo.
    className: "invert" 
  },
  {
    name: "Claude AI",
    color: "hover:text-[#D97757]",
    src: "/images/Claude_AI_logo.svg",
    isImage: true
  },
  {
    name: "Resend",
    color: "hover:text-white",
    src: "/images/resend-wordmark-black.svg",
    isImage: true,
    className: "invert" // Resend black wordmark needs inversion
  }
];

export function TechStack() {
  return (
    <section className="py-12 bg-slate-950 border-y border-white/5 relative overflow-hidden">
        {/* Titre discret */}
        <div className="text-center mb-8">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
                Une Stack Technique Robuste & Sécurisée
            </p>
        </div>

        {/* Le Marquee Infini */}
        <div className="flex overflow-hidden relative">
            {/* Dégradés latéraux pour fondre les bords */}
            <div className="absolute left-0 top-0 h-full w-24 bg-linear-to-r from-slate-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 h-full w-24 bg-linear-to-l from-slate-950 to-transparent z-10" />

            {/* Le conteneur animé */}
            <motion.div 
                className="flex gap-16 items-center whitespace-nowrap px-8"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                    duration: 35,
                    repeat: Infinity, 
                    ease: "linear" 
                }}
            >
                {/* On répète la liste pour l'effet infini */}
                {[...logos, ...logos].map((logo, index) => (
                    <div 
                        key={index} 
                        className={`group flex items-center gap-3 text-slate-600 transition-colors duration-300 cursor-default ${logo.color}`}
                    >
                        {logo.isImage ? (
                            <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-110">
                                <Image 
                                    src={logo.src!} 
                                    alt={logo.name}
                                    fill
                                    className={`object-contain ${logo.className || ''}`}
                                />
                            </div>
                        ) : (
                            <svg 
                                viewBox="0 0 24 24" 
                                className="w-8 h-8 fill-current transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                            >
                                {logo.path}
                            </svg>
                        )}
                        <span className="text-lg font-bold font-bebas tracking-tight hidden md:inline-block">
                            {logo.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    </section>
  );
}
