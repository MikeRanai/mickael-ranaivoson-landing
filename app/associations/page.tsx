"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  ChevronDown,
  Facebook,
  Quote,
  Search,
  Smartphone,
  Trophy,
  Users,
  UserPlus,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { TopoBackground } from "@/components/ui/topo-background";
import { EVENTS, trackEvent } from "@/lib/analytics";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const painPoints = [
  {
    icon: Search,
    titre: "On ne vous trouve pas",
    description:
      "Un parent tape « club de hockey La Réunion » ou « handball Saint-Paul » sur son téléphone. Si vous n'apparaissez pas, vous n'existez pas — et c'est un adhérent qui va ailleurs.",
  },
  {
    icon: Facebook,
    titre: "Une page Facebook n'est pas un site",
    description:
      "Vos horaires d'entraînement publiés en mars sont introuvables en septembre : ils ont disparu dans le fil. Et Google, lui, indexe très mal ce qui se passe à l'intérieur d'un réseau social.",
  },
  {
    icon: Users,
    titre: "Tout repose sur deux bénévoles",
    description:
      "Les inscriptions par mail, les relances de cotisations à la main, les infos éparpillées entre WhatsApp, Facebook et un tableur. Ça tient tant que la personne est là.",
  },
];

const features = [
  {
    icon: CalendarClock,
    titre: "Horaires et lieux d'entraînement",
    description:
      "Affichés clairement, par catégorie d'âge, à jour. C'est la première chose que cherche un parent — et la plus difficile à trouver aujourd'hui.",
  },
  {
    icon: Search,
    titre: "Visible sur Google",
    description:
      "Être trouvé sur les recherches de votre discipline et de votre commune, plutôt que d'espérer que le bouche-à-oreille suffise.",
  },
  {
    icon: UserPlus,
    titre: "Demandes d'inscription",
    description:
      "Un formulaire simple qui arrive dans votre boîte mail, au lieu d'un numéro de téléphone que personne ne compose.",
  },
  {
    icon: Trophy,
    titre: "Actualités, résultats, classements",
    description:
      "Vos matchs, vos résultats et la vie du club, sur une page qui vous appartient et que vous mettez à jour vous-même.",
  },
  {
    icon: Smartphone,
    titre: "Rapide sur mobile",
    description:
      "Vos visiteurs cherchent depuis un téléphone, souvent en déplacement et en réseau moyen. Les sites que je livre sont mesurés là-dessus.",
  },
  {
    icon: Wand2,
    titre: "Autonome après la livraison",
    description:
      "Une interface d'administration pensée pour des bénévoles, pas pour des développeurs. Vous ne me rappelez pas pour changer un horaire.",
  },
];

// Références réelles, toutes publiées et vérifiables sur le site.
const references = [
  {
    nom: "Hockey Club de l'Ouest",
    detail: "Club sportif · Saint-Paul",
    slug: "hockey-club-de-louest",
  },
  {
    nom: "Ligue Réunionnaise de Hockey",
    detail: "Ligue sportive · La Réunion",
    slug: "ligue-reunionnaise-de-hockey",
  },
  {
    nom: "Association Culture Afro",
    detail: "Association culturelle · La Réunion",
    slug: "association-culture-afro",
  },
];

const faqs = [
  {
    question: "On a déjà une page Facebook. Pourquoi un site en plus ?",
    answer:
      "Facebook est très bien pour animer une communauté déjà acquise. Mais il est mauvais pour être découvert : un parent qui cherche « club de hockey La Réunion » sur Google tombe rarement sur une publication Facebook, et vos horaires d'entraînement se perdent dans le fil au bout de quelques semaines. Le site répond à la question « qui sont-ils et comment je m'inscris ? » ; Facebook entretient le lien avec ceux qui vous connaissent déjà. Les deux se complètent.",
  },
  {
    question: "Combien coûte un site pour une association ?",
    answer:
      "À partir de 1 600 € HT pour un site vitrine complet : présentation du club, page école avec horaires et catégories, actualités, formulaire de contact et d'inscription, référencement local. À partir de 3 200 € HT si vous avez besoin de fonctionnalités de gestion (espace adhérents, résultats et classements automatisés, automatisations). C'est un coût unique, pas un abonnement.",
  },
  {
    question: "Qui met à jour le site après la livraison ?",
    answer:
      "Vous. C'est un point sur lequel je ne transige pas : une association ne doit pas dépendre d'un prestataire pour changer un horaire d'entraînement ou publier un résultat. Chaque site est livré avec une interface d'administration simple, et je forme la ou les personnes du bureau qui s'en occuperont.",
  },
  {
    question: "Notre association a-t-elle droit à une aide pour financer ça ?",
    answer:
      "Soyons clairs : le dispositif régional Kap Numérik est actuellement arrêté et n'a pas été renouvelé à ce jour. Il ne faut donc pas compter dessus pour financer un projet maintenant. S'il rouvre, il vise les TPE réunionnaises et l'éligibilité d'une association dépend notamment de son activité économique et de son immatriculation — je regarderai votre cas avec vous à ce moment-là. En attendant, le budget se construit sans aide, et je préfère vous le dire avant le devis plutôt qu'après.",
  },
  {
    question: "En combien de temps le site est-il en ligne ?",
    answer:
      "Comptez 3 à 5 semaines entre le premier échange et la mise en ligne. Le facteur limitant n'est presque jamais le développement : c'est le temps qu'il vous faut pour rassembler vos contenus (photos, textes, horaires à jour). Je vous envoie une liste claire de ce dont j'ai besoin dès le départ.",
  },
  {
    question: "Peut-on gérer les adhésions et encaisser les cotisations en ligne ?",
    answer:
      "L'encaissement de cotisations pour le compte d'une association est un sujet encadré par la réglementation, et je préfère être direct : ce n'est pas une case à cocher. Selon les cas, on s'appuie sur une plateforme déjà agréée pour la partie paiement, ou on commence par un site qui présente et collecte les demandes, l'adhésion se réglant comme aujourd'hui. On en parle en fonction de votre fonctionnement réel.",
  },
];

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
export default function AssociationsPage() {
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
      {/* pt réduit sur mobile : fait passer les deux CTA au-dessus de la ligne
          de flottaison en 360x640 (mesuré). */}
      <section className="relative pt-24 sm:pt-32 pb-20 px-6 overflow-hidden">
        <TopoBackground variant="a" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <span className="inline-flex items-center gap-2 bg-[#ffa800]/10 text-[#ffa800] text-sm font-medium px-4 py-2 rounded-full border border-[#ffa800]/20">
              <Trophy className="w-4 h-4" />
              Associations &amp; clubs sportifs · La Réunion
            </span>

            <h1 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
              Votre club existe.{" "}
              <span className="text-[#ffa800]">Encore faut-il qu&apos;on le trouve.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              Chaque semaine, des parents cherchent une activité pour leurs enfants sur
              Google. S&apos;ils ne tombent pas sur vous,{" "}
              <strong className="text-white">ils tombent sur quelqu&apos;un d&apos;autre</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/?type=devis#contact"
                onClick={() =>
                  trackEvent(EVENTS.ctaClick, {
                    cta: "associations-devis",
                    location: "associations-hero",
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                  bg-[#ffa800] text-slate-950 font-bold text-base
                  hover:bg-[#ffb92e] transition-all duration-300
                  shadow-[0_0_25px_-5px_rgba(255,168,0,0.4)]"
              >
                Parler de notre club
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#resultat"
                onClick={() =>
                  trackEvent(EVENTS.ctaClick, {
                    cta: "associations-preuve",
                    location: "associations-hero",
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                  border border-white/10 text-white font-medium
                  hover:bg-white/5 transition-all duration-300"
              >
                Voir un cas concret
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Le résultat concret — preuve avant tout le reste */}
      {/* ================================================================= */}
      <section id="resultat" className="relative py-20 px-6 overflow-hidden">
        <TopoBackground variant="d" lines={false} />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-white/10"
          >
            <Quote className="w-8 h-8 text-[#ffa800]/40 mb-4" aria-hidden />

            <div className="mb-6 flex flex-col items-start gap-1">
              <span className="text-4xl font-bold text-[#ffa800] font-bebas tracking-wide">
                2
              </span>
              <span className="text-xs uppercase tracking-wider text-slate-500">
                demandes d&apos;inscription reçues via le site
              </span>
            </div>

            <blockquote className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">
              « Le hockey reste un sport méconnu ici, mais depuis la mise en ligne, des
              parents nous ont déjà appelés pour inscrire leurs enfants après nous avoir
              trouvés sur Google. La page de l&apos;école de hockey, avec les jours et
              horaires d&apos;entraînement affichés clairement, fait le travail à notre
              place. »
            </blockquote>

            <footer className="border-t border-white/5 pt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">Fabien Paulo</p>
                <p className="text-slate-500 text-xs">
                  Président · Hockey Club de l&apos;Ouest · Saint-Paul
                </p>
              </div>
              <Link
                href="/realisations/hockey-club-de-louest"
                onClick={() =>
                  trackEvent(EVENTS.ctaClick, {
                    cta: "associations-etude-hco",
                    location: "associations-resultat",
                  })
                }
                className="inline-flex items-center gap-1 text-sm text-[#ffa800] hover:text-[#ffb92e] transition-colors shrink-0"
              >
                Lire l&apos;étude de cas
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </footer>
          </motion.article>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Les 3 problèmes */}
      {/* ================================================================= */}
      <section className="relative py-20 px-6 overflow-hidden">
        <TopoBackground variant="b" lines={false} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <SectionHeader
              label="Ce qui bloque"
              title="Le problème n'est pas votre club,"
              highlight="c'est sa visibilité."
              subtitle="Trois constats que je retrouve dans presque toutes les associations réunionnaises."
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
      {/* Ce que contient le site */}
      {/* ================================================================= */}
      <section className="relative py-20 px-6 overflow-hidden">
        <TopoBackground variant="c" lines={false} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <SectionHeader
              label="Ce que vous obtenez"
              title="Un site pensé pour"
              highlight="une association."
              highlightColor="gold"
              subtitle="Pas une vitrine d'entreprise repeinte aux couleurs du club."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <motion.div
                key={feature.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-slate-900/60 border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ffa800]/10 border border-[#ffa800]/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-[#ffa800]" />
                </div>
                <h3 className="text-white font-bold mb-2">{feature.titre}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Références */}
      {/* ================================================================= */}
      <section className="relative py-20 px-6 overflow-hidden">
        <TopoBackground variant="a" lines={false} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-12">
            <SectionHeader
              label="Déjà accompagnés"
              title="Des clubs et associations"
              highlight="d'ici."
              subtitle="Chaque projet est documenté, avec ce qui a été fait et ce que ça a changé."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {references.map((ref) => (
              <Link
                key={ref.slug}
                href={`/realisations/${ref.slug}`}
                onClick={() =>
                  trackEvent(EVENTS.ctaClick, {
                    cta: `associations-ref-${ref.slug}`,
                    location: "associations-references",
                  })
                }
                className="group p-6 rounded-2xl bg-slate-900/60 border border-white/10
                  hover:border-[#ffa800]/30 transition-colors flex flex-col gap-2"
              >
                <h3 className="text-white font-bold group-hover:text-[#ffa800] transition-colors">
                  {ref.nom}
                </h3>
                <p className="text-slate-500 text-sm">{ref.detail}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm text-[#ffa800]">
                  Étude de cas
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FAQ */}
      {/* ================================================================= */}
      <section className="relative py-20 px-6 overflow-hidden">
        <TopoBackground variant="b" lines={false} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="mb-12">
            <SectionHeader
              label="Questions fréquentes"
              title="Ce que les bureaux"
              highlight="demandent toujours."
            />
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* CTA final */}
      {/* ================================================================= */}
      <section className="relative py-24 px-6 overflow-hidden">
        <TopoBackground variant="d" />
        <div className="max-w-3xl mx-auto relative z-10 text-center space-y-6">
          <h2 className="font-oswald text-3xl md:text-4xl font-bold text-white leading-tight">
            Parlons de votre club{" "}
            <span className="text-[#ffa800]">avant la prochaine saison.</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Un échange de trente minutes, sans engagement, pour savoir si un site
            changerait vraiment quelque chose pour vous. Si la réponse est non, je vous
            le dirai.
          </p>
          <div className="pt-2">
            <Link
              href="/?type=devis#contact"
              onClick={() =>
                trackEvent(EVENTS.ctaClick, {
                  cta: "associations-devis",
                  location: "associations-cta-final",
                })
              }
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl
                bg-[#ffa800] text-slate-950 font-bold text-base
                hover:bg-[#ffb92e] transition-all duration-300
                shadow-[0_0_25px_-5px_rgba(255,168,0,0.4)]"
            >
              Demander un échange
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
