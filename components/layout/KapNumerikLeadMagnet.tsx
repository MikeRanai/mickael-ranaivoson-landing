'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  User,
  Briefcase,
  Clock,
} from "lucide-react";

type ActivityType = "artisan" | "commercant" | "association" | "tpe" | "autre";

const activityOptions: { value: ActivityType; label: string }[] = [
  { value: "artisan", label: "Artisan" },
  { value: "commercant", label: "Commerçant" },
  { value: "association", label: "Association" },
  { value: "tpe", label: "TPE / Indépendant" },
  { value: "autre", label: "Autre" },
];

export function KapNumerikLeadMagnet() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [activityType, setActivityType] = useState<ActivityType>("tpe");
  const [consentRgpd, setConsentRgpd] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/kap-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          phone,
          activityType,
          consentRgpd,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Erreur lors de l'inscription");
      }
      setIsSuccess(true);
      setFirstName("");
      setEmail("");
      setPhone("");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Une erreur est survenue. Réessayez."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full pl-10 pr-3 py-3 rounded-xl bg-slate-950/60 border border-white/10 " +
    "text-white placeholder:text-slate-500 text-sm " +
    "focus:outline-none focus:border-[#ffa800] focus:ring-1 focus:ring-[#ffa800]";

  return (
    <div
      id="kap-numerik-veille"
      className="relative max-w-4xl mx-auto mb-16 rounded-3xl overflow-hidden border border-[#ffa800]/30 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900/50 shadow-[0_0_60px_-15px_rgba(255,168,0,0.25)]"
    >
      {/* Glow décoratif */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#ffa800]/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* COL GAUCHE — Pitch */}
        <div className="p-8 md:p-10 flex flex-col">
          <div className="inline-flex items-center gap-2 self-start bg-[#ffa800]/10 border border-[#ffa800]/30 text-[#ffa800] text-xs font-bold px-3 py-1.5 rounded-full mb-5">
            <Clock className="w-3.5 h-3.5" />
            Nouvelle version en approche
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
            Aide Kap Numérik —
            <br />
            <span className="text-[#ffa800]">Soyez le premier averti.</span>
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Le dispositif régional (version 2021–2023) est suspendu, en attente
            de la nouvelle mouture portée par la Région Réunion. Pas
            d&apos;inquiétude :{" "}
            <span className="text-white font-medium">
              je veille pour vous
            </span>{" "}
            et je prépare votre dossier en amont pour que vous soyez prêt dès le
            jour 1 de la réouverture.
          </p>

          <ul className="space-y-3 mt-auto">
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-base">📩</span>
              Une alerte email{" "}
              <span className="text-white font-semibold">
                dès l&apos;annonce officielle
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-base">📋</span>
              Un{" "}
              <span className="text-white font-semibold">
                pré-dossier offert
              </span>{" "}
              (analyse d&apos;éligibilité + devis indicatif)
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-base">🎯</span>
              Une{" "}
              <span className="text-white font-semibold">
                place prioritaire
              </span>{" "}
              dans mon planning de dépôt
            </li>
          </ul>
        </div>

        {/* COL DROITE — Formulaire */}
        <div className="p-8 md:p-10 bg-slate-950/40 backdrop-blur-sm border-t md:border-t-0 md:border-l border-white/5">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center py-8"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Vous êtes inscrit·e !
                </h4>
                <p className="text-slate-400 text-sm max-w-xs">
                  Je vous écris dès que j&apos;ai des nouvelles officielles.
                  Aucun spam, parole de Réunionnais.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
                aria-labelledby="kap-form-title"
              >
                <div id="kap-form-title" className="sr-only">
                  Formulaire d&apos;alerte Kap Numérik
                </div>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" aria-hidden />
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="Prénom *"
                    aria-label="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" aria-hidden />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email *"
                    aria-label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" aria-hidden />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Téléphone mobile *"
                    aria-label="Téléphone mobile"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" aria-hidden />
                  <select
                    name="activityType"
                    required
                    aria-label="Type d'activité"
                    value={activityType}
                    onChange={(e) =>
                      setActivityType(e.target.value as ActivityType)
                    }
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    {activityOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-400 leading-relaxed">
                  <input
                    type="checkbox"
                    checked={consentRgpd}
                    onChange={(e) => setConsentRgpd(e.target.checked)}
                    required
                    className="mt-0.5 w-4 h-4 rounded accent-[#ffa800] shrink-0"
                  />
                  <span>
                    J&apos;accepte de recevoir une alerte par email/SMS au sujet
                    du dispositif Kap Numérik. Désinscription en 1 clic.
                  </span>
                </label>

                {error && (
                  <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl
                    bg-[#ffa800] text-slate-950 font-bold text-sm
                    hover:bg-[#ffb92e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                    shadow-lg shadow-[#ffa800]/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4" />
                      M&apos;alerter dès la réouverture
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-slate-500">
                  Zéro spam · Désinscription en 1 clic · RGPD
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
