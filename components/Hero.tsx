'use client'

import { motion } from "framer-motion"
import { HERO_CONTENT, SITE_CONFIG } from "@/lib/data" // On importe tes textes
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Github, Linkedin, Facebook } from "lucide-react"

export function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-[#153d6e] text-white px-6 py-8 md:py-16">
      
      {/* Fond animé subtil (Optionnel, effet de glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
        
        {/* Badge "Nouvelle Version" */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-medium text-blue-100"
        >
          <span>{HERO_CONTENT.badge}</span>
        </motion.div>

        {/* Gros Titre + Slogan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white via-blue-100 to-gray-400">
            {HERO_CONTENT.title}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-[#ffa800]">
            {SITE_CONFIG.subtitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {HERO_CONTENT.slogan}
          </p>
        </motion.div>

        {/* Boutons d'action (Mobile First = Stack vertical, Desktop = Ligne) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        >
          <Button 
            asChild 
            size="lg" 
            className="w-full sm:w-auto bg-[#ffa800] hover:bg-[#ffb92e] text-[#153d6e] font-bold rounded-full text-lg h-12 px-8"
          >
            <Link href={`mailto:${SITE_CONFIG.email}`}>
              {HERO_CONTENT.cta_primary} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto border-white/20 text-black hover:bg-white/10 rounded-full text-lg h-12 px-8 backdrop-blur-sm"
          >
            <Link href="#portfolio" className="text-white">
              {HERO_CONTENT.cta_secondary}
            </Link>
          </Button>
        </motion.div>

        {/* Liens Sociaux */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.5, delay: 0.4 }}
           className="flex gap-6 justify-center pt-8 opacity-70"
        >
          <Link href={SITE_CONFIG.socials.github} target="_blank" className="hover:text-[#ffa800] transition-colors">
            <Github className="h-6 w-6" />
          </Link>
          <Link href={SITE_CONFIG.socials.linkedin} target="_blank" className="hover:text-[#ffa800] transition-colors">
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link href={SITE_CONFIG.socials.facebook} target="_blank" className="hover:text-[#ffa800] transition-colors">
            <Facebook className="h-6 w-6" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}