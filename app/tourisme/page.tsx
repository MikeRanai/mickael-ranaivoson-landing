"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BedDouble,
  CalendarCheck,
  ChevronDown,
  CreditCard,
  Gauge,
  Landmark,
  MapPin,
  MessageSquareHeart,
  Percent,
  Search,
  ShieldAlert,
  Star,
  UserX,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { TopoBackground } from "@/components/ui/topo-background";
import { EVENTS, trackEvent } from "@/lib/analytics";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

// Prix de référence : offre "Présence en ligne" du pricing (1 600 € HT).
// Utilisé par le calculateur pour le délai d'amortissement.
const SITE_PRICE = 1600;

const painPoints = [
  {
    icon: Percent,
    titre: "15 à 25 % sur chaque séjour",
    description:
      "Commission standard, programme « préféré », remises Genius… La note réelle grimpe vite, saison après saison, sans jamais s'arrêter.",
  },
  {
    icon: UserX,
    titre: "Le client n'est pas le vôtre",
    description:
      "La plateforme garde le contact. Impossible de recontacter un voyageur satisfait pour lui proposer de revenir en direct l'année suivante.",
  },
  {
    icon: ShieldAlert,
    titre: "Une dépendance totale",
    description:
      "Un compte suspendu, un algorithme qui change, une hausse de commission : votre activité dépend de décisions que vous ne contrôlez pas.",
  },
];

const features = [
  {
    icon: CalendarCheck,
    titre: "Demandes de réservation",
    description: "Calendrier de disponibilités et formulaire de demande, directement sur votre site.",
  },
  {
    icon: CreditCard,
    titre: "Acompte en ligne",
    description: "Encaissez un acompte à la réservation pour sécuriser vos séjours (en option).",
  },
  {
    icon: Search,
    titre: "SEO local",
    description:
      "Être trouvé sur « gîte Cilaos » ou « chambre d'hôtes Saint-Leu » plutôt que d'acheter ce trafic aux plateformes.",
  },
  {
    icon: MapPin,
    titre: "Fiche Google Business",
    description: "Optimisée et reliée au site : avis, photos, itinéraire — le réflexe n°1 des voyageurs.",
  },
  {
    icon: Gauge,
    titre: "Rapide sur mobile",
    description:
      "Vos visiteurs cherchent depuis un téléphone, parfois en 3G en déplacement. Score PageSpeed 90+ vérifiable sur mes sites livrés.",
  },
  {
    icon: MessageSquareHeart,
    titre: "Vos avis, chez vous",
    description: "Les retours de vos hôtes affichés sur votre site, pas seulement sur la plateforme.",
  },
];

const faqs = [
  {
    question: "Combien Booking prélève-t-il vraiment ?",
    answer:
      "La commission standard en France est de 15 à 17 % du montant du séjour. S'y ajoutent souvent le programme Établissement Préféré (+3 à 5 %) et les remises Genius financées par l'hébergeur. Au total, beaucoup d'hébergeurs reversent entre 18 et 25 % de leur chiffre d'affaires aux plateformes.",
  },
  {
    question: "Dois-je quitter Booking ou Airbnb ?",
    answer:
      "Non, et ce n'est pas le but. Les plateformes restent un excellent canal pour être découvert par de nouveaux voyageurs. La stratégie gagnante : les clients qui reviennent, ceux qui vous trouvent sur Google et ceux recommandés par le bouche-à-oreille réservent en direct — sans commission.",
  },
  {
    question: "Combien coûte un site de réservation directe ?",
    answer:
      "À partir de 1 600 € HT pour un site vitrine avec calendrier et demande de réservation. Avec paiement d'acompte en ligne et automatisations (confirmations, rappels), comptez à partir de 3 200 € HT. C'est un coût unique — pas un pourcentage prélevé à vie sur chaque séjour.",
  },
  {
    question: "Puis-je recevoir des réservations sans paiement en ligne ?",
    answer:
      "Oui. Beaucoup de gîtes fonctionnent très bien avec un formulaire de demande et un calendrier de disponibilités : vous confirmez par email ou téléphone, l'acompte se règle par virement. Le paiement en ligne peut s'ajouter plus tard.",
  },
  {
    question: "Mon gîte est-il éligible à une aide régionale ?",
    answer:
      "Les TPE réunionnaises, dont les hébergements touristiques, sont éligibles au dispositif Kap Numérik quand il est actif. Deux précisions importantes : le dépôt de nouvelles demandes est actuellement suspendu, la Région ayant mis le dispositif à jour sans annoncer de date de réouverture ; et le plafond de 3 200 € est un maximum cumulé, la création d'un site vitrine étant plafonnée à 1 200 €. Vous pouvez vous inscrire sur la liste d'alerte pour être prévenu dès le lancement de la nouvelle version.",
  },
  {
    question: "En combien de temps le site est-il en ligne ?",
    answer:
      "Comptez 3 à 5 semaines entre notre premier échange et la mise en ligne, selon la disponibilité de vos contenus (photos, descriptifs). Les photos sont décisives pour un hébergement : je vous conseille sur ce point dès le départ.",
  },
];

// ---------------------------------------------------------------------------
// Calculateur de commissions
// ---------------------------------------------------------------------------
const COMMISSION_PRESETS = [
  { label: "15 %", value: 15, detail: "standard" },
  { label: "18 %", value: 18, detail: "+ préféré" },
  { label: "22 %", value: 22, detail: "+ Genius" },
  { label: "25 %", value: 25, detail: "toutes options" },
];

function formatEuros(n: number) {
  return `${Math.round(n).toLocaleString("fr-FR")} €`;
}

function CommissionCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(2500);
  const [commission, setCommission] = useState(18);
  const [directShare, setDirectShare] = useState(30);

  const yearlyCommissions = monthlyRevenue * 12 * (commission / 100);
  const yearlySavings = yearlyCommissions * (directShare / 100);
  const monthlySavings = yearlySavings / 12;
  const paybackMonths = monthlySavings > 0 ? SITE_PRICE / monthlySavings : Infinity;

  return (
    <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-6 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Entrées */}
        <div className="space-y-8">
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <label htmlFor="ca-mensuel" className="text-sm font-medium text-white">
                Chiffre d&apos;affaires mensuel via les plateformes
              </label>
              <span className="text-[#ffa800] font-bold text-lg tabular-nums">
                {formatEuros(monthlyRevenue)}
              </span>
            </div>
            <input
              id="ca-mensuel"
              type="range"
              min={500}
              max={10000}
              step={100}
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className="w-full accent-[#ffa800]"
            />
            <p className="text-xs text-slate-500 mt-2">
              Moyenne lissée sur l&apos;année (haute et basse saison confondues).
            </p>
          </div>

          <div>
            <span className="block text-sm font-medium text-white mb-3">
              Taux de commission
            </span>
            <div className="grid grid-cols-4 gap-2" role="group" aria-label="Taux de commission">
              {COMMISSION_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setCommission(preset.value)}
                  aria-pressed={commission === preset.value}
                  className={`rounded-xl border px-2 py-3 text-center transition-colors ${
                    commission === preset.value
                      ? "border-[#ffa800]/60 bg-[#ffa800]/10 text-[#ffa800]"
                      : "border-white/10 text-slate-400 hover:bg-white/5"
                  }`}
                >
                  <span className="block font-bold text-sm">{preset.label}</span>
                  <span className="block text-[10px] uppercase tracking-wide opacity-70">
                    {preset.detail}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-3">
              <label htmlFor="part-direct" className="text-sm font-medium text-white">
                Part des séjours basculée en réservation directe
              </label>
              <span className="text-[#ffa800] font-bold text-lg tabular-nums">{directShare} %</span>
            </div>
            <input
              id="part-direct"
              type="range"
              min={10}
              max={100}
              step={5}
              value={directShare}
              onChange={(e) => setDirectShare(Number(e.target.value))}
              className="w-full accent-[#ffa800]"
            />
            <p className="text-xs text-slate-500 mt-2">
              Hypothèse prudente : commencez par vos clients fidèles et le bouche-à-oreille.
            </p>
          </div>
        </div>

        {/* Résultats */}
        <div className="flex flex-col justify-center gap-6 rounded-2xl bg-slate-950/60 border border-white/5 p-6 md:p-8">
          <div>
            <p className="text-sm text-slate-400 mb-1">
              Commissions reversées chaque année
            </p>
            <p className="text-4xl md:text-5xl font-bold text-white tabular-nums">
              {formatEuros(yearlyCommissions)}
            </p>
          </div>
          <div className="h-px bg-white/10" />
          <div>
            <p className="text-sm text-slate-400 mb-1">
              Économie annuelle avec {directShare} % de réservations en direct
            </p>
            <p className="text-4xl md:text-5xl font-bold text-[#ffa800] tabular-nums">
              {formatEuros(yearlySavings)}
            </p>
          </div>
          <div className="h-px bg-white/10" />
          <div>
            <p className="text-sm text-slate-400">
              Un site à {formatEuros(SITE_PRICE)} HT serait amorti en{" "}
              <strong className="text-white">
                {paybackMonths <= 1
                  ? "moins d'un mois"
                  : paybackMonths > 36
                    ? "plus de 3 ans"
                    : `${Math.ceil(paybackMonths)} mois`}
              </strong>
              {paybackMonths <= 36 && " — puis chaque séjour direct est à 0 % de commission."}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-500 text-center">
        Estimation indicative, hors coûts d&apos;hébergement web (~10 €/mois) et hors variation
        de remplissage. Les taux proposés reflètent les commissions pratiquées en France
        (standard, programmes de visibilité, remises financées par l&apos;hébergeur).
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FAQ Accordion Item
// ---------------------------------------------------------------------------
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/5 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-white font-medium text-sm md:text-base">{question}</span>
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
        <p className="px-5 pb-5 text-slate-400 text-sm leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function TourismePage() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-300">
      {/* Schema.org FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />

      {/* ================================================================= */}
      {/* Hero */}
      {/* ================================================================= */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <TopoBackground variant="a" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <span className="inline-flex items-center gap-2 bg-[#ffa800]/10 text-[#ffa800] text-sm font-medium px-4 py-2 rounded-full border border-[#ffa800]/20">
              <BedDouble className="w-4 h-4" />
              Gîtes, chambres d&apos;hôtes &amp; locations saisonnières
            </span>

            <h1 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
              Chaque séjour réservé sur Booking{" "}
              <span className="text-[#ffa800]">vous coûte jusqu&apos;à 25 %</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              Les plateformes sont utiles pour être découvert. Mais vos clients fidèles,
              eux, peuvent réserver <strong className="text-white">en direct, sans commission</strong> —
              sur un site qui vous appartient.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="#calculateur"
                onClick={() =>
                  trackEvent(EVENTS.ctaClick, { cta: "tourisme-calculateur", location: "tourisme-hero" })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                  bg-[#ffa800] text-slate-950 font-bold text-base
                  hover:bg-[#ffb92e] transition-all duration-300
                  shadow-[0_0_25px_-5px_rgba(255,168,0,0.4)]"
              >
                Calculer ce que ça me coûte
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/?type=devis#contact"
                onClick={() =>
                  trackEvent(EVENTS.ctaClick, { cta: "tourisme-devis", location: "tourisme-hero" })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                  border border-white/10 text-white font-medium
                  hover:bg-white/5 transition-all duration-300"
              >
                Obtenir mon estimation gratuite
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Les 3 problèmes de la dépendance aux plateformes */}
      {/* ================================================================= */}
      <section className="relative py-20 px-6 overflow-hidden">
        <TopoBackground variant="b" lines={false} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <SectionHeader
              label="Le vrai prix des plateformes"
              title="Pratique pour démarrer,"
              highlight="coûteux pour durer."
              subtitle="Trois problèmes que tous les hébergeurs finissent par rencontrer."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((point) => (
              <motion.div
                key={point.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-slate-900/60 border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ffa800]/10 border border-[#ffa800]/20 flex items-center justify-center mb-4">
                  <point.icon className="w-5 h-5 text-[#ffa800]" />
                </div>
                <h3 className="text-white font-bold mb-2">{point.titre}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Calculateur */}
      {/* ================================================================= */}
      <section id="calculateur" className="relative py-20 px-6 overflow-hidden scroll-mt-24">
        <TopoBackground variant="c" lines={false} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-12">
            <SectionHeader
              label="Calculateur"
              title="Combien vous coûtent"
              highlight="les commissions ?"
              subtitle="Trois curseurs, aucun email demandé. Faites le calcul pour votre hébergement."
            />
          </div>

          <CommissionCalculator />

          <div className="mt-8 text-center">
            <Link
              href="/?type=devis#contact"
              onClick={() =>
                trackEvent(EVENTS.ctaClick, { cta: "tourisme-devis", location: "tourisme-calculateur" })
              }
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
                bg-[#ffa800] text-slate-950 font-bold text-base
                hover:bg-[#ffb92e] transition-all duration-300
                shadow-[0_0_30px_-5px_rgba(255,168,0,0.4)]"
            >
              Discuter de mon projet
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Ce que comprend le site */}
      {/* ================================================================= */}
      <section className="relative py-20 px-6 overflow-hidden">
        <TopoBackground variant="d" lines={false} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <SectionHeader
              label="Ce que vous obtenez"
              title="Un site pensé pour"
              highlight="remplir votre calendrier."
              subtitle="Pas un site brochure : un outil de réservation directe, adapté aux hébergements de La Réunion."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <motion.div
                key={f.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group p-5 rounded-2xl bg-slate-900/50 border border-white/5
                  hover:border-[#ffa800]/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ffa800]/10 border border-[#ffa800]/20 flex items-center justify-center mb-3">
                  <f.icon className="w-5 h-5 text-[#ffa800]" />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{f.titre}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Bandeau preuve — sobre et vérifiable */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-slate-400 text-center">
            <span className="inline-flex items-center gap-2">
              <Star className="w-4 h-4 text-[#ffa800]" />
              Score PageSpeed 90+ mobile sur mes sites livrés —{" "}
              <Link
                href="/realisations/hockey-club-de-louest"
                className="text-[#ffa800] hover:underline underline-offset-2"
              >
                voir une étude de cas chiffrée
              </Link>
            </span>
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">
            Premier site d&apos;hébergement touristique en cours de réalisation (gîte à Mafate) —
            étude de cas à venir.
          </p>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Tarifs */}
      {/* ================================================================= */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Wallet className="w-5 h-5 text-[#ffa800]" />
                <span className="text-3xl md:text-4xl font-bold text-white">1 600 €</span>
              </div>
              <div className="text-sm text-slate-400">
                À partir de, HT — site + calendrier + demandes de réservation
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Percent className="w-5 h-5 text-[#ffa800]" />
                <span className="text-3xl md:text-4xl font-bold text-[#ffa800]">0 %</span>
              </div>
              <div className="text-sm text-slate-400">
                de commission sur les réservations passées par votre site
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Landmark className="w-5 h-5 text-[#ffa800]" />
                <span className="text-3xl md:text-4xl font-bold text-white">1 200 €</span>
              </div>
              <div className="text-sm text-slate-400">
                d&apos;aide Kap Numérik sur un site vitrine, dès la nouvelle version —{" "}
                <Link href="/aides-digitales-reunion" className="text-[#ffa800] hover:underline">
                  en savoir plus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FAQ */}
      {/* ================================================================= */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <SectionHeader
              label="FAQ"
              title="Questions fréquentes"
              subtitle="Commissions, budget, délais : les réponses franches."
            />
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* CTA final */}
      {/* ================================================================= */}
      <section className="relative py-20 px-6 overflow-hidden">
        <TopoBackground variant="a" lines={false} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-[#ffa800]/20 p-8 md:p-12"
          >
            <h2 className="font-oswald text-2xl md:text-3xl font-bold text-white mb-4">
              Reprenez la main sur vos réservations
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Parlez-moi de votre hébergement : je vous dis honnêtement ce qu&apos;un site de
              réservation directe peut vous rapporter — et si ça ne vaut pas le coup dans
              votre cas, je vous le dis aussi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/?type=devis#contact"
                onClick={() =>
                  trackEvent(EVENTS.ctaClick, { cta: "tourisme-devis", location: "tourisme-cta-final" })
                }
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
                  bg-[#ffa800] text-slate-950 font-bold text-base
                  hover:bg-[#ffb92e] transition-all duration-300
                  shadow-[0_0_30px_-5px_rgba(255,168,0,0.4)]"
              >
                Obtenir mon estimation gratuite
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/realisations/hockey-club-de-louest"
                onClick={() =>
                  trackEvent(EVENTS.ctaClick, { cta: "tourisme-etude-de-cas", location: "tourisme-cta-final" })
                }
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
                  border border-white/10 text-white font-medium
                  hover:bg-white/5 transition-all duration-300"
              >
                Voir une étude de cas
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
