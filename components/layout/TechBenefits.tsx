'use client'

import { motion } from "framer-motion";
import { Gauge, ShieldCheck, BugOff } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const pillars = [
  {
    icon: Gauge,
    techLabel: "Next.js",
    benefitTitle: "Vos clients ne fuient pas",
    benefit:
      "Vos pages s'affichent en moins d'une seconde, même sur le réseau capricieux du fond du cirque. Un site lent, c'est 50% de visiteurs qui partent avant d'avoir vu votre offre.",
  },
  {
    icon: ShieldCheck,
    techLabel: "Prisma + PostgreSQL",
    benefitTitle: "Vos données dorment tranquilles",
    benefit:
      "Adhérents, clients, transactions — tout est chiffré, sauvegardé et hébergé dans des datacenters européens (RGPD). Vous ne perdez rien, jamais.",
  },
  {
    icon: BugOff,
    techLabel: "TypeScript",
    benefitTitle: "Zéro bug au moment d'encaisser",
    benefit:
      "Le code est vérifié avant même d'être en ligne. Pas de mauvaise surprise un samedi midi quand un client veut payer.",
  },
];

export function TechBenefits() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          label="Sous le capot"
          title="Une stack pro,"
          highlight="des bénéfices concrets."
          highlightColor="muted"
          subtitle="Vous n'avez pas à comprendre la technique. Vous récoltez juste les résultats."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {pillars.map(({ icon: Icon, techLabel, benefitTitle, benefit }, i) => (
            <motion.div
              key={techLabel}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-[#ffa800]/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#ffa800]/10 border border-[#ffa800]/20 flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 text-[#ffa800]" aria-hidden />
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
                {techLabel}
              </p>
              <h3 className="text-xl font-bold text-white mb-3">{benefitTitle}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
