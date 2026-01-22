'use client'

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      
      {/* Fond Glow discret */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-125 h-75 bg-[#ffa800]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Colonne 1 : Brand */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              {/* Logo ou Initiale */}
              <div className="w-10 h-10 bg-[#ffa800]/10 rounded-xl flex items-center justify-center border border-[#ffa800]/20 text-[#ffa800] font-bold text-lg">
                MR
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Mickaël Ranaivoson
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Expert en développement web et solutions digitales à La Réunion.
              Je transforme vos idées en outils performants, sécurisés et rentables.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:text-[#ffa800] hover:bg-[#ffa800]/10" asChild>
                <Link href="https://github.com/ton-github" target="_blank"><Github className="w-5 h-5" /></Link>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-[#ffa800] hover:bg-[#ffa800]/10" asChild>
                <Link href="https://linkedin.com/in/ton-linkedin" target="_blank"><Linkedin className="w-5 h-5" /></Link>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-[#ffa800] hover:bg-[#ffa800]/10" asChild>
                <Link href="mailto:contact@ton-email.re"><Mail className="w-5 h-5" /></Link>
              </Button>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="#solutions" className="text-slate-400 hover:text-[#ffa800] transition-colors">Solutions</Link></li>
              <li><Link href="#realisations" className="text-slate-400 hover:text-[#ffa800] transition-colors">Réalisations</Link></li>
              <li><Link href="#tarifs" className="text-slate-400 hover:text-[#ffa800] transition-colors">Tarifs & Aides</Link></li>
              <li><Link href="#contact" className="text-slate-400 hover:text-[#ffa800] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Informations</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-4 h-4 text-[#ffa800]" />
                <span>Saint-Paul, La Réunion</span>
              </li>
              <li className="text-slate-400 text-sm">
                SIRET : 902 063 197 00021
              </li>
              <li className="text-slate-400 text-sm">
                Entrepreneur Individuel
              </li>
            </ul>
          </div>
        </div>

        {/* Barre Copyright & Légal */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Mickaël Ranaivoson. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/legal" className="text-slate-500 hover:text-white transition-colors">
              Mentions Légales
            </Link>
            <Link href="/legal" className="text-slate-500 hover:text-white transition-colors">
              CGV & CGU
            </Link>
            <Link href="/legal" className="text-slate-500 hover:text-white transition-colors">
              Confidentialité (RGPD)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}