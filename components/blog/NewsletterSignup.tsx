"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { subscribeToNewsletter } from "@/actions/subscriber.actions";
import { trackEvent, EVENTS } from "@/lib/analytics";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Honeypot anti-bot : champ invisible que seuls les bots remplissent
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const result = await subscribeToNewsletter({
        email,
        company_url: honeypotRef.current?.value ?? "",
      });
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setIsSuccess(true);
      trackEvent(EVENTS.newsletterSignup);
      setEmail("");
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="not-prose my-12 rounded-2xl border border-[#ffa800]/30 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900/50 p-6 md:p-8 shadow-[0_0_50px_-20px_rgba(255,168,0,0.3)]">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-2"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">C&apos;est noté !</h3>
            <p className="text-slate-400 text-sm max-w-sm">
              Vous recevrez un email à chaque nouvel article. Zéro spam,
              désinscription en 1 clic.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col md:flex-row md:items-center gap-5"
          >
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-[#ffa800] text-xs font-bold mb-2">
                <Mail className="w-3.5 h-3.5" />
                Newsletter
              </div>
              <h3 className="text-xl font-bold text-white leading-tight">
                Pas envie de rater le prochain article ?
              </h3>
              <p className="text-slate-400 text-sm mt-1.5">
                Recevez les nouveaux articles directement dans votre boîte mail.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full md:w-auto md:min-w-[20rem] space-y-2">
              {/* Honeypot — hors écran, invisible et non focusable pour les humains */}
              <div className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="newsletter_company_url">Ne pas remplir ce champ</label>
                <input
                  ref={honeypotRef}
                  id="newsletter_company_url"
                  name="company_url"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" aria-hidden />
                  <input
                    type="email"
                    required
                    placeholder="Votre email"
                    aria-label="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#ffa800] focus:ring-1 focus:ring-[#ffa800]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#ffa800] text-slate-950 font-bold text-sm hover:bg-[#ffb92e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span className="hidden sm:inline">S&apos;inscrire</span>
                    </>
                  )}
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <p className="text-[11px] text-slate-500">
                Zéro spam · Désinscription en 1 clic
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
