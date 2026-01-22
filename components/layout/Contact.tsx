'use client'

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  Building2,
  CheckCircle2,
  Loader2,
  Sparkles,
  FileText,
  TrendingUp,
  HelpCircle
} from "lucide-react";

// Types de formulaire avec leurs configurations
const formTypes = {
  projet: {
    title: "Racontez-moi votre projet",
    subtitle: "Qu'est-ce qui vous prend la tête au quotidien ? On trouve une solution ensemble.",
    icon: Sparkles,
    color: "amber",
    fields: ["name", "email", "phone", "company", "message"],
    messagePlaceholder: "Qu'est-ce qui vous fait perdre du temps ? Qu'est-ce que vous aimeriez automatiser ?",
    submitText: "Envoyer",
  },
  devis: {
    title: "Besoin d'une estimation ?",
    subtitle: "Expliquez-moi votre besoin, je vous réponds avec un chiffrage clair sous 48h.",
    icon: FileText,
    color: "blue",
    fields: ["name", "email", "phone", "company", "budget", "message"],
    messagePlaceholder: "De quoi avez-vous besoin ? Un site ? Un outil de gestion ? Une boutique en ligne ?",
    submitText: "Recevoir mon estimation",
  },
  eligibilite: {
    title: "Vous êtes éligible à l'aide Kap Numérik ?",
    subtitle: "Je vérifie gratuitement si vous pouvez récupérer jusqu'à 3200€ sur votre projet.",
    icon: HelpCircle,
    color: "emerald",
    fields: ["name", "email", "phone", "company", "siret", "message"],
    messagePlaceholder: "Quelle est l'activité de votre entreprise ? Quel projet avez-vous en tête ?",
    submitText: "Vérifier mon éligibilité",
  },
  audit: {
    title: "Votre site est-il performant ?",
    subtitle: "Je regarde gratuitement ce qui cloche et comment l'améliorer.",
    icon: TrendingUp,
    color: "purple",
    fields: ["name", "email", "phone", "website", "message"],
    messagePlaceholder: "Quelle est l'adresse de votre site ? Qu'est-ce qui ne va pas selon vous ?",
    submitText: "Analyser mon site",
  },
};

type FormType = keyof typeof formTypes;

const colorClasses: Record<string, { bg: string; border: string; text: string; button: string }> = {
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-500",
    button: "bg-amber-500 hover:bg-amber-400"
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-500",
    button: "bg-blue-500 hover:bg-blue-400"
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-500",
    button: "bg-emerald-500 hover:bg-emerald-400"
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-500",
    button: "bg-purple-500 hover:bg-purple-400"
  },
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  siret: string;
  website: string;
  budget: string;
  message: string;
  formType: FormType;
}

export function Contact() {
  const searchParams = useSearchParams();
  const [activeType, setActiveType] = useState<FormType>("projet");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    siret: "",
    website: "",
    budget: "",
    message: "",
    formType: "projet",
  });

  // Détecter le type via query param
  useEffect(() => {
    const type = searchParams.get("type") as FormType;
    if (type && formTypes[type]) {
      setActiveType(type);
      setFormData(prev => ({ ...prev, formType: type }));
    }
  }, [searchParams]);

  const config = formTypes[activeType];
  const colors = colorClasses[config.color];
  const Icon = config.icon;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleTypeChange = (type: FormType) => {
    setActiveType(type);
    setFormData(prev => ({ ...prev, formType: type }));
    setIsSuccess(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi");
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        siret: "",
        website: "",
        budget: "",
        message: "",
        formType: activeType,
      });
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer ou me contacter directement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: string) => {
    const baseInputClasses = `w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10
      text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30
      focus:ring-2 focus:ring-white/10 transition-all`;

    switch (field) {
      case "name":
        return (
          <div key={field} className="space-y-2">
            <label className="text-sm text-slate-400 flex items-center gap-2">
              <User className="w-4 h-4" /> Nom complet *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Jean Dupont"
              className={baseInputClasses}
            />
          </div>
        );
      case "email":
        return (
          <div key={field} className="space-y-2">
            <label className="text-sm text-slate-400 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="jean@entreprise.re"
              className={baseInputClasses}
            />
          </div>
        );
      case "phone":
        return (
          <div key={field} className="space-y-2">
            <label className="text-sm text-slate-400 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0692 XX XX XX"
              className={baseInputClasses}
            />
          </div>
        );
      case "company":
        return (
          <div key={field} className="space-y-2">
            <label className="text-sm text-slate-400 flex items-center gap-2">
              <Building2 className="w-4 h-4" /> Entreprise
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nom de votre entreprise"
              className={baseInputClasses}
            />
          </div>
        );
      case "siret":
        return (
          <div key={field} className="space-y-2">
            <label className="text-sm text-slate-400 flex items-center gap-2">
              <Building2 className="w-4 h-4" /> SIRET *
            </label>
            <input
              type="text"
              name="siret"
              value={formData.siret}
              onChange={handleChange}
              required
              placeholder="123 456 789 00012"
              className={baseInputClasses}
            />
          </div>
        );
      case "website":
        return (
          <div key={field} className="space-y-2">
            <label className="text-sm text-slate-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> URL du site *
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
              placeholder="https://monsite.re"
              className={baseInputClasses}
            />
          </div>
        );
      case "budget":
        return (
          <div key={field} className="space-y-2">
            <label className="text-sm text-slate-400 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Budget estimé
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={baseInputClasses}
            >
              <option value="">Sélectionnez une fourchette</option>
              <option value="< 2000€">&lt; 2 000€</option>
              <option value="2000-4000€">2 000€ - 4 000€</option>
              <option value="4000-8000€">4 000€ - 8 000€</option>
              <option value="> 8000€">&gt; 8 000€</option>
            </select>
          </div>
        );
      case "message":
        return (
          <div key={field} className="space-y-2 md:col-span-2">
            <label className="text-sm text-slate-400 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> Votre message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder={config.messagePlaceholder}
              className={`${baseInputClasses} resize-none`}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            On en <span className="text-[#ffa800]">discute ?</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Pas de formulaire à rallonge. Dites-moi ce qui vous bloque, je vous réponds sous 24h.
          </p>
        </div>

        {/* Type Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(Object.keys(formTypes) as FormType[]).map((type) => {
            const typeConfig = formTypes[type];
            const TypeIcon = typeConfig.icon;
            const isActive = activeType === type;
            return (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${isActive
                    ? `${colorClasses[typeConfig.color].bg} ${colorClasses[typeConfig.color].border} ${colorClasses[typeConfig.color].text} border`
                    : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-transparent"
                  }`}
              >
                <TypeIcon className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {type === "projet" && "Projet"}
                  {type === "devis" && "Devis"}
                  {type === "eligibilite" && "Éligibilité"}
                  {type === "audit" && "Audit SEO"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Form Card */}
        <motion.div
          layout
          className={`bg-slate-900/50 backdrop-blur-sm rounded-3xl border ${colors.border} p-6 md:p-10`}
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12"
              >
                <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <CheckCircle2 className={`w-8 h-8 ${colors.text}`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
                <p className="text-slate-400 mb-6">
                  Je vous recontacte très rapidement. À bientôt !
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-sm text-slate-500 hover:text-white transition-colors"
                >
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Form Header */}
                <div className="flex items-start gap-4 mb-8">
                  <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{config.title}</h3>
                    <p className="text-slate-400 text-sm">{config.subtitle}</p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {config.fields.map(renderField)}
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl
                      ${colors.button} text-slate-950 font-bold text-base
                      transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                      shadow-lg`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {config.submitText}
                      </>
                    )}
                  </button>
                </form>

                {/* Trust indicators */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap justify-center gap-6 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Réponse sous 24h
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Devis gratuit
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Sans engagement
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
