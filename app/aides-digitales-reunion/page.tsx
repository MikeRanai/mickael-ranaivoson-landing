"use client";

import { motion, Variants } from "framer-motion";
import {
  Euro,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Globe,
  ShoppingCart,
  Smartphone,
  Target,
  Palette,
  Users,
  ShieldCheck,
  ArrowRight,
  ClipboardCheck,
  FileText,
  BadgeEuro,
  Info,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Animations
// ---------------------------------------------------------------------------
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const prestations = [
  {
    icon: Globe,
    label: "Site vitrine",
    detail: "Création ou refonte",
    plafond: "1 200 €",
  },
  {
    icon: ShoppingCart,
    label: "Site e-commerce",
    detail: "Boutique en ligne",
    plafond: "2 000 €",
  },
  {
    icon: Smartphone,
    label: "Application mobile",
    detail: "iOS / Android",
    plafond: "2 000 €",
  },
  {
    icon: Target,
    label: "Stratégie digitale",
    detail: "Conseil & accompagnement",
    plafond: "500 €",
  },
  {
    icon: Palette,
    label: "Création de contenus",
    detail: "Web design, logo, photos",
    plafond: "2 000 €",
  },
  {
    icon: Users,
    label: "Community management",
    detail: "Réseaux sociaux",
    plafond: "1 000 €",
  },
  {
    icon: ShieldCheck,
    label: "Sécurité / RGPD",
    detail: "Protection & conformité",
    plafond: "1 000 €",
  },
];

const eligibles = [
  "TPE de moins de 20 salariés domiciliées à La Réunion",
  "Associations de moins de 10 salariés (La Réunion)",
  "Professions libérales non réglementées (CA < 500 000 €)",
];

const exclusions = [
  "Entreprises du secteur numérique",
  "Secteurs agriculture et pêche",
  "CA > 500 000 € (0-9 sal.) ou > 1 000 000 € (10-19 sal.)",
];

const etapes = [
  {
    numero: "01",
    icon: ClipboardCheck,
    titre: "Vérifier votre éligibilité",
    description:
      "On regarde ensemble si votre structure correspond aux critères du dispositif (taille, secteur, chiffre d'affaires).",
  },
  {
    numero: "02",
    icon: Target,
    titre: "Définir votre projet digital",
    description:
      "On identifie la prestation la plus adaptée à votre besoin : site web, e-commerce, appli, stratégie digitale...",
  },
  {
    numero: "03",
    icon: FileText,
    titre: "Monter le dossier",
    description:
      "Je vous accompagne dans la constitution du dossier de demande d'aide auprès de la Région Réunion.",
  },
  {
    numero: "04",
    icon: BadgeEuro,
    titre: "Obtenir le remboursement",
    description:
      "Après validation et réalisation de la prestation, la Région vous rembourse jusqu'à 80% des dépenses engagées.",
  },
];

const faqs = [
  {
    question: "Qu'est-ce que le Kap Numérik exactement ?",
    answer:
      "Le Kap Numérik est un dispositif d'aide de la Région Réunion qui rembourse jusqu'à 80% des dépenses liées à la transformation digitale des TPE (site web, e-commerce, appli mobile, etc.), dans la limite de 3 200 € par entreprise.",
  },
  {
    question: "Le dispositif est-il encore actif en ce moment ?",
    answer:
      "Le dispositif Kap Numérik initial couvrait la période 2021-2023. Nous sommes actuellement en attente d'une confirmation officielle de la Région Réunion concernant son renouvellement. C'est pourquoi nous vous proposons de vous inscrire sur notre liste d'attente pour être prévenu dès la réouverture.",
  },
  {
    question: "Combien vais-je payer de ma poche pour un site web ?",
    answer:
      "Tout dépend de votre effectif. Pour une TPE de 0 à 9 salariés, l'aide couvre 80% du montant HT. Par exemple, pour un site vitrine à 1 500 € HT, l'aide serait de 1 200 € et votre reste à charge de seulement 300 €.",
  },
  {
    question: "Puis-je cumuler plusieurs prestations ?",
    answer:
      "Oui, vous pouvez combiner plusieurs prestations (site web + contenus + community management par exemple), mais le montant total de l'aide est plafonné à 3 200 € maximum.",
  },
  {
    question: "Mon entreprise est dans le numérique, suis-je éligible ?",
    answer:
      "Malheureusement non. Les entreprises des secteurs du numérique, de l'agriculture et de la pêche sont exclues du dispositif Kap Numérik.",
  },
  {
    question: "Quel est le rôle de votre agence dans ce processus ?",
    answer:
      "Je réalise la prestation digitale (création de site, e-commerce, etc.) ET je vous accompagne gratuitement dans le montage de votre dossier Kap Numérik. Vous n'avez qu'un seul interlocuteur pour tout le processus.",
  },
];

// ---------------------------------------------------------------------------
// FAQ Accordion Item
// ---------------------------------------------------------------------------
function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/5 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-white font-medium text-sm md:text-base">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-slate-400 text-sm leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AidesDigitalesPage() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-300">
      {/* ================================================================= */}
      {/* Schema.org FAQ JSON-LD */}
      {/* ================================================================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* ================================================================= */}
      {/* Hero */}
      {/* ================================================================= */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-600/15 blur-3xl rounded-full translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full -translate-x-1/2" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-sm font-medium px-4 py-2 rounded-full border border-emerald-500/20">
              <Euro className="w-4 h-4" />
              Aides &amp; Financements
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Financez votre projet digital{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                à La Réunion
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              Le dispositif <strong className="text-white">Kap Numérik</strong>{" "}
              de la Région Réunion permet aux TPE de se faire rembourser
              jusqu&apos;à <strong className="text-emerald-400">3 200 €</strong>{" "}
              sur leurs dépenses de transformation digitale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="#eligibilite"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                  bg-emerald-500 text-slate-950 font-bold text-base
                  hover:bg-emerald-400 transition-all duration-300
                  shadow-[0_0_25px_-5px_rgba(16,185,129,0.4)]"
              >
                Vérifier mon éligibilité
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#tarifs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                  border border-white/10 text-white font-medium
                  hover:bg-white/5 transition-all duration-300"
              >
                Voir les tarifs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Alert Banner — Dispositif en attente */}
      {/* ================================================================= */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-4 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20"
          >
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm mb-1">
                Dispositif en attente de renouvellement
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Le Kap Numérik couvrait initialement la période 2021-2023.
                Nous attendons la confirmation officielle de la Région Réunion
                pour le renouvellement de cette aide. Inscrivez-vous sur notre
                liste d&apos;attente pour être prévenu en priorité dès sa
                réactivation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Montant & Prise en charge */}
      {/* ================================================================= */}
      <section className="py-12 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-400">
                3 200 €
              </div>
              <div className="text-sm text-slate-400 mt-1">
                Remboursement maximum
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-400">
                80%
              </div>
              <div className="text-sm text-slate-400 mt-1">
                Prise en charge (0-9 salariés)
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-teal-400">
                50%
              </div>
              <div className="text-sm text-slate-400 mt-1">
                Prise en charge (10-19 salariés)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Éligibilité */}
      {/* ================================================================= */}
      <section id="eligibilite" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Qui peut en bénéficier ?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Le Kap Numérik cible les petites structures réunionnaises qui
              souhaitent amorcer ou accélérer leur transformation digitale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Éligibles */}
            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Structures éligibles
              </h3>
              <ul className="space-y-3">
                {eligibles.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
              <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Structures exclues
              </h3>
              <ul className="space-y-3">
                {exclusions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Prestations couvertes */}
      {/* ================================================================= */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prestations couvertes
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Le dispositif finance une large gamme de prestations digitales,
              chacune avec son propre plafond de subvention.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {prestations.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.label}
                  variants={itemVariants}
                  className="group p-5 rounded-2xl bg-slate-900/50 border border-white/5
                    hover:border-emerald-500/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1">
                    {p.label}
                  </h3>
                  <p className="text-slate-500 text-xs mb-3">{p.detail}</p>
                  <span className="inline-block px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded border border-emerald-500/20">
                    Jusqu&apos;à {p.plafond}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="mt-8 flex items-start gap-3 max-w-2xl mx-auto">
            <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-slate-500 text-xs">
              Le montant total cumulé de l&apos;aide est plafonné à 3 200 €,
              quel que soit le nombre de prestations combinées.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Comment ça marche */}
      {/* ================================================================= */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-slate-400">
              Un processus simple en 4 étapes. Je m&apos;occupe du dossier pour
              vous.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {etapes.map((etape) => (
              <motion.div
                key={etape.numero}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-6 rounded-2xl bg-slate-900/50 border border-white/5"
              >
                <span className="absolute -top-4 left-6 text-5xl font-black text-slate-800">
                  {etape.numero}
                </span>
                <div className="relative z-10 pt-4">
                  <etape.icon className="w-8 h-8 text-emerald-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    {etape.titre}
                  </h3>
                  <p className="text-slate-400 text-sm">{etape.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FAQ */}
      {/* ================================================================= */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Questions fréquentes
            </h2>
            <p className="text-slate-400">
              Tout ce que vous devez savoir sur le Kap Numérik.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* CTA — Liste d'attente */}
      {/* ================================================================= */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-emerald-500/20 p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Soyez prêt dès la réouverture
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Inscrivez-vous pour être prévenu en priorité dès que la Région
              Réunion confirmera le renouvellement du Kap Numérik. Je
              préparerai votre dossier en amont pour un dépôt immédiat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/?type=eligibilite#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
                  bg-emerald-500 text-slate-950 font-bold text-base
                  hover:bg-emerald-400 transition-all duration-300
                  shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)]"
              >
                Rejoindre la liste d&apos;attente
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#tarifs"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
                  border border-white/10 text-white font-medium
                  hover:bg-white/5 transition-all duration-300"
              >
                Voir les tarifs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
