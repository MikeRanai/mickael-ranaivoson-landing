import Image from "next/image";
import Link from "next/link";
import { Quote, ShieldCheck, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { getPublishedTestimonials } from "@/actions/testimonial.actions";

export async function Testimonials() {
  const testimonials = await getPublishedTestimonials();

  // 0 témoignage = on ne rend rien (évite la section vide qui crée le "trou noir")
  if (testimonials.length === 0) return null;

  // Schema.org Review markup pour le SEO
  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: testimonials.map((t, i) => ({
      "@type": "Review",
      position: i + 1,
      author: { "@type": "Person", name: t.authorName },
      reviewBody: t.quote,
      itemReviewed: {
        "@type": "LocalBusiness",
        "@id": "https://www.mickaelranaivoson.fr/#business",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    })),
  };

  // Layout adaptatif : 1 = featured pleine largeur, 2 = duo équilibré, 3+ = grille
  const isFeatured = testimonials.length === 1;
  const isDuo = testimonials.length === 2;

  return (
    <section
      id="temoignages"
      className="py-24 bg-slate-950 relative overflow-hidden"
      aria-labelledby="temoignages-title"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />

      {/* Glow ambré pour casser le visuel sombre entre Portfolio et About */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          label="Preuve sociale"
          title="Ils ont"
          highlight="retrouvé du temps."
          highlightColor="gold"
          subtitle="Pas de jargon, pas de promesse en l'air. Des résultats mesurés, signés."
        />

        <div
          className={`mt-16 ${
            isFeatured
              ? "max-w-3xl mx-auto"
              : isDuo
              ? "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          }`}
        >
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="relative p-8 rounded-3xl bg-slate-900/60 border border-white/5 hover:border-[#ffa800]/30 transition-colors flex flex-col"
            >
              <Quote
                className="w-8 h-8 text-[#ffa800]/40 mb-4"
                aria-hidden
              />

              {/* Métrique en haut — l'argument qui frappe d'abord */}
              {t.metric && (
                <div className="mb-6 inline-flex flex-col items-start gap-1">
                  <span className="text-3xl font-bold text-[#ffa800] font-bebas tracking-wide">
                    {t.metric}
                  </span>
                  {t.metricLabel && (
                    <span className="text-xs uppercase tracking-wider text-slate-500">
                      {t.metricLabel}
                    </span>
                  )}
                </div>
              )}

              <blockquote className="text-slate-300 text-base leading-relaxed flex-1 mb-6">
                « {t.quote} »
              </blockquote>

              <footer className="border-t border-white/5 pt-4 flex items-center gap-4">
                {t.photoUrl && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-800 shrink-0">
                    <Image
                      src={t.photoUrl}
                      alt={t.authorName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">{t.authorName}</p>
                  <p className="text-slate-500 text-xs truncate">
                    {t.authorRole}
                    {t.location ? ` · ${t.location}` : ""}
                  </p>
                </div>
                {t.googleReviewUrl && (
                  <Link
                    href={t.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Vérifier l'avis de ${t.authorName} sur Google`}
                    className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Avis Google</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                )}
              </footer>
            </article>
          ))}
        </div>

        {/* Slot d'invitation discret quand peu de témoignages — incite + comble visuellement */}
        {testimonials.length < 3 && (
          <div className="mt-8 text-center">
            <Link
              href="?type=projet#contact"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#ffa800] transition-colors"
            >
              Votre témoignage ici dans 3 mois ?
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
