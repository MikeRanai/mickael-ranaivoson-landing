'use client'

import Link from "next/link";
import Image from "next/image";
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
          <Image
            src="/images/mr-logo-blanc.svg"
            alt="Mickael Ranaivoson Logo"
            width={60}
            height={60}
            className="w-12 h-12 sm:w-15 sm:h-15 transition-transform duration-300 group-hover:scale-105"
            priority
          />
         <span 
            className="text-base sm:text-lg font-bold tracking-tight leading-tight whitespace-nowrap font-sans bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #ffffff 0%, #ffa800 50%, #ffb92e 100%)",
            }}
        >
            MICKAEL RANAIVOSON
        </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Je crée des outils qui vous font gagner du temps et de l'argent.
              Basé à La Réunion, disponible pour vos projets.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:text-[#ffa800] hover:bg-[#ffa800]/10" asChild>
                <Link href="https://github.com/MikeRanai/" target="_blank" aria-label="Voir mon profil GitHub"><Github className="w-5 h-5" /></Link>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-[#ffa800] hover:bg-[#ffa800]/10" asChild>
                <Link href="https://www.linkedin.com/in/mickael-ranaivoson/" target="_blank" aria-label="Voir mon profil LinkedIn"><Linkedin className="w-5 h-5" /></Link>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-[#ffa800] hover:bg-[#ffa800]/10" asChild>
                <Link href="https://www.malt.fr/profile/mickaelranaivoson" target="_blank" aria-label="Voir mon profil Malt">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.94 17.737a1.764 1.764 0 0 1-2.41.647l-4.08-2.356a.353.353 0 0 1 0-.611l4.08-2.356a1.764 1.764 0 0 1 2.41.647 1.764 1.764 0 0 1 0 1.764l-.001.001a1.764 1.764 0 0 1 .001 2.264zm-2.41-5.381L10.45 9.999a.353.353 0 0 1 0-.611l4.08-2.356a1.764 1.764 0 0 1 2.41.647 1.764 1.764 0 0 1-.647 2.41l-.001.001a1.764 1.764 0 0 1 .647 2.41 1.764 1.764 0 0 1-2.41.647l.001-.791zM7.06 6.263a1.764 1.764 0 0 1 2.41-.647l4.08 2.356a.353.353 0 0 1 0 .611L9.47 10.94a1.764 1.764 0 0 1-2.41-.647 1.764 1.764 0 0 1 0-1.764 1.764 1.764 0 0 1 0-2.266z"/>
                  </svg>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-[#ffa800] hover:bg-[#ffa800]/10" asChild>
                <Link href="mailto:ranaimike@gmail.com" aria-label="Envoyer un email"><Mail className="w-5 h-5" /></Link>
              </Button>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="#solutions" className="text-slate-400 hover:text-[#ffa800] transition-colors">Ce que je fais</Link></li>
              <li><Link href="#realisations" className="text-slate-400 hover:text-[#ffa800] transition-colors">Mes projets</Link></li>
              <li><Link href="#apropos" className="text-slate-400 hover:text-[#ffa800] transition-colors">Qui suis-je</Link></li>
              <li><Link href="#tarifs" className="text-slate-400 hover:text-[#ffa800] transition-colors">Tarifs</Link></li>
              <li><Link href="#contact" className="text-slate-400 hover:text-[#ffa800] transition-colors">Contact</Link></li>
              <li><Link href="/aides-digitales-reunion" className="text-slate-400 hover:text-[#ffa800] transition-colors">Aides &amp; Financements</Link></li>
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
              <li className="flex items-center gap-3 text-slate-400">
                 <span className="w-4 h-4 flex items-center justify-center text-[#ffa800] font-bold text-xs">📞</span>
                 <a href="tel:+262692342373" className="hover:text-white transition-colors">+262 692 34 23 73</a>
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