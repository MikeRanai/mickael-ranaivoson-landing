"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  ChevronDown,
  Facebook,
  Megaphone,
  Quote,
  Search,
  Smartphone,
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
      "Quelqu'un cherche « association randonnée Saint-Denis », « atelier créatif pour enfants » ou « club de handball Saint-Paul » depuis son téléphone. Si vous n'apparaissez pas, vous n'existez pas — et c'est un adhérent qui va ailleurs.",
  },
  {
    icon: Facebook,
    titre: "Une page Facebook n'est pas un site",
    description:
      "L'information publiée en mars est introuvable en septembre : elle a disparu dans le fil. Et Google indexe très mal ce qui se passe à l'intérieur d'un réseau social.",
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
    titre: "Vos informations pratiques, à jour",
    description:
      "Horaires de permanence, dates d'ateliers, créneaux d'entraînement, lieux : ce que les gens cherchent en premier, affiché clairement plutôt qu'à demander par téléphone.",
  },
  {
    icon: Search,
    titre: "Visible sur Google",
    description:
      "Être trouvé sur les recherches liées à votre activité et à votre commune, plutôt que d'espérer que le bouche-à-oreille suffise.",
  },
  {
    icon: UserPlus,
    titre: "Adhésions et demandes de contact",
    description:
      "Un formulaire simple qui arrive dans votre boîte mail — inscription, bénévolat, partenariat — au lieu d'un numéro que personne ne compose.",
  },
  {
    icon: Megaphone,
    titre: "La vie de l'association",
    description:
      "Événements, comptes rendus, galeries, résultats sportifs si vous êtes un club : sur une page qui vous appartient et que vous mettez à jour vous-même.",
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
      "Une interface d'administration pensée pour des bénévoles, pas pour des développeurs. Vous ne me rappelez pas pour changer une date.",
  },
];

// Références réelles, toutes publiées et vérifiables sur le site.
const references = [
  {
    nom: "NoutAsso",
    detail: "Plateforme de gestion associative · La Réunion",
    slug: "noutasso",
  },
  {
    nom: "Association Culture Afro",
    detail: "Association culturelle · La Réunion",
    slug: "association-culture-afro",
  },
  {
    nom: "Hockey Club de l'Ouest",
    detail: "Club sportif · Saint-Paul",
    slug: "hockey-club-de-louest",
  },
  {
    nom: "Ligue Réunionnaise de Hockey",
    detail: "Fédération sportive · La Réunion",
    slug: "ligue-reunionnaise-de-hockey",
  },
];

const faqs = [
  {
    question: "Nous ne sommes pas un club sportif. Est-ce que ça vaut aussi pour nous ?",
    answer:
      "Oui. Culturelle, environnementale, sociale, de loisirs, sportive : le besoin de fond est le même — être trouvée, expliquer ce qu'on fait, recevoir des adhésions sans y passer ses soirées. Seul le contenu change : là où un club affiche ses créneaux d'entraînement, une association d'ateliers affiche son calendrier, et une association d'action sociale ses permanences et ses appels à bénévoles. Je construis la structure autour de votre fonctionnement réel, pas l'inverse.",
  },
  {
    question: "On a déjà une page Facebook. Pourquoi un site en plus ?",
    answer:
      "Facebook est très bien pour animer une communauté déjà acquise. Mais il est mauvais pour être découvert : quelqu'un qui cherche votre activité sur Google tombe rarement sur une publication Facebook, et vos informations pratiques se perdent dans le fil au bout de quelques semaines. Le site répond à la question « qui sont-ils et comment je les rejoins ? » ; Facebook entretient le lien avec ceux qui vous connaissent déjà. Les deux se complètent.",
  },
  {
    question: "Combien coûte un site pour une association ?",
    answer:
      "À partir de 1 600 € HT pour un site vitrine complet : présentation de l'association et de ses actions, page dédiée à vos activités avec dates et lieux, actualités, formulaire de contact et d'adhésion, référencement local. À partir de 3 200 € HT si vous avez besoin de fonctionnalités de gestion (espace adhérents, agenda, automatisations, résultats et classements pour un club). C'est un coût unique, pas un abonnement.",
  },
  {
    question: "Qui met à jour le site après la livraison ?",
    answer:
      "Vous. C'est un point sur lequel je ne transige pas : une association ne doit pas dépendre d'un prestataire pour annoncer un événement ou changer une date. Chaque site est livré avec une interface d'administration simple, et je forme la ou les personnes du bureau qui s'en occuperont.",
  },
  {
    question: "Notre association a-t-elle droit à une aide pour financer ça ?",
    answer:
      "Sur le principe oui : les associations de moins de 10 salariés domiciliées à La Réunion font explicitement partie des bénéficiaires du Kap Numérik, le dispositif régional cofinancé par l'Europe. Mais soyons clairs sur le calendrier : le dépôt de nouvelles demandes est actuellement suspendu, la Région ayant mis le dispositif à jour sans annoncer de date de réouverture. Ne construisez donc pas votre budget dessus aujourd'hui. À titre indicatif, quand le dispositif est actif, une création de site vitrine est remboursée à 80 % dans la limite de 1 200 € — le plafond de 3 200 € souvent cité correspond à plusieurs prestations cumulées. Je peux vous inscrire sur la liste d'alerte et préparer votre dossier en amont.",
  },
  {
    question: "En combien de temps le site est-il en ligne ?",
    answer:
      "Comptez 3 à 5 semaines entre le premier échange et la mise en ligne. Le facteur limitant n'est presque jamais le développement : c'est le temps qu'il vous faut pour rassembler vos contenus (photos, textes, dates et horaires à jour). Je vous envoie une liste claire de ce dont j'ai besoin dès le départ.",
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
              <Users className="w-4 h-4" />
              Associations &amp; clubs · La Réunion
            </span>

            <h1 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
              Votre association existe.{" "}
              <span className="text-[#ffa800]">Encore faut-il qu&apos;on la trouve.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              Culturelle, sportive, environnementale ou sociale : chaque semaine, des
              gens cherchent sur Google exactement ce que vous proposez. S&apos;ils ne
              tombent pas sur vous,{" "}
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
                Parler de notre association
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

            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              C&apos;est ici un club sportif, mais le mécanisme ne lui appartient pas :
              une page claire, trouvable sur Google, qui répond aux questions qu&apos;on
              vous pose au téléphone. Un atelier, une école de musique ou une association
              d&apos;entraide obtiennent le même effet avec un contenu différent.
            </p>

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
              title="Le problème n'est pas votre association,"
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
              subtitle="Pas une vitrine d'entreprise repeinte aux couleurs de l'association."
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
              title="Des associations d'ici,"
              highlight="de tous horizons."
              subtitle="Culturelle, sportive, plateforme mutualisée : chaque projet est documenté, avec ce qui a été fait et ce que ça a changé."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            Parlons de votre association{" "}
            <span className="text-[#ffa800]">avant votre prochaine saison.</span>
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
