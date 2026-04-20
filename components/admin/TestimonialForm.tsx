"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import {
  createTestimonial,
  updateTestimonial,
} from "@/actions/testimonial.actions";
import ImageUpload from "./ImageUpload";

const testimonialSchema = z.object({
  authorName: z.string().min(1, "Le nom est obligatoire").max(100),
  authorRole: z
    .string()
    .min(1, "Le rôle est obligatoire (ex: Président - HCO)")
    .max(150),
  location: z.string().max(100).nullable().or(z.literal("")),
  quote: z
    .string()
    .min(10, "Le témoignage doit faire au moins 10 caractères")
    .max(800),
  metric: z.string().max(40).nullable().or(z.literal("")),
  metricLabel: z.string().max(80).nullable().or(z.literal("")),
  photoUrl: z.string().url().nullable().or(z.literal("")),
  googleReviewUrl: z.string().url().nullable().or(z.literal("")),
  displayOrder: z.number().int().min(0).max(999),
  published: z.boolean(),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

type ExistingTestimonial = TestimonialFormValues & { id: string };

export default function TestimonialForm({
  testimonial,
}: {
  testimonial?: ExistingTestimonial;
}) {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: testimonial ?? {
      authorName: "",
      authorRole: "",
      location: "",
      quote: "",
      metric: "",
      metricLabel: "",
      photoUrl: null,
      googleReviewUrl: "",
      displayOrder: 0,
      published: false,
    },
  });

  const onSubmit = async (data: TestimonialFormValues) => {
    setError(null);
    try {
      const payload = {
        ...data,
        location: data.location || null,
        metric: data.metric || null,
        metricLabel: data.metricLabel || null,
        photoUrl: data.photoUrl || null,
        googleReviewUrl: data.googleReviewUrl || null,
      };
      if (testimonial) await updateTestimonial(testimonial.id, payload);
      else await createTestimonial(payload);
    } catch (e) {
      if (e instanceof Error && !e.message.includes("NEXT_REDIRECT")) {
        setError(e.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <div className="lg:col-span-2 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Nom de l'auteur" error={errors.authorName?.message}>
            <input
              {...register("authorName")}
              type="text"
              placeholder="Jean-Marc Hoarau"
              className={inputClass}
            />
          </Field>

          <Field
            label="Rôle / Structure"
            error={errors.authorRole?.message}
            hint="Ex: Président — HCO"
          >
            <input
              {...register("authorRole")}
              type="text"
              placeholder="Président — Hockey Club de l'Ouest"
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Localisation" error={errors.location?.message}>
          <input
            {...register("location")}
            type="text"
            placeholder="Saint-Paul, La Réunion"
            className={inputClass}
          />
        </Field>

        <Field
          label="Témoignage"
          error={errors.quote?.message}
          hint="Texte du verbatim — sans guillemets (ils sont ajoutés automatiquement)"
        >
          <textarea
            {...register("quote")}
            rows={6}
            placeholder="Mickaël nous a transformé notre site vieillissant en machine à leads..."
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            label="Métrique chiffrée"
            error={errors.metric?.message}
            hint="Affichée en grand. Ex: +5h/semaine"
          >
            <input
              {...register("metric")}
              type="text"
              placeholder="+180% trafic"
              className={inputClass}
            />
          </Field>

          <Field
            label="Légende de la métrique"
            error={errors.metricLabel?.message}
            hint="Sous le chiffre, plus petit"
          >
            <input
              {...register("metricLabel")}
              type="text"
              placeholder="trafic organique en 6 mois"
              className={inputClass}
            />
          </Field>
        </div>

        <Field
          label="Lien avis Google"
          error={errors.googleReviewUrl?.message}
          hint="Optionnel — affiche un badge « Avis vérifié »"
        >
          <input
            {...register("googleReviewUrl")}
            type="url"
            placeholder="https://g.co/kgs/..."
            className={inputClass}
          />
        </Field>
      </div>

      <aside className="space-y-5">
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
            Publication
          </h3>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("published")}
              className="w-4 h-4 rounded accent-[#ffa800]"
            />
            <span className="text-sm text-slate-200">Publier sur le site</span>
          </label>

          <Field
            label="Ordre d'affichage"
            error={errors.displayOrder?.message}
            hint="Plus petit = affiché en premier"
          >
            <input
              {...register("displayOrder", { valueAsNumber: true })}
              type="number"
              min={0}
              className={inputClass}
            />
          </Field>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5
              rounded-lg bg-[#ffa800] text-slate-950 font-semibold
              hover:bg-[#ffb92e] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {testimonial ? "Mettre à jour" : "Créer le témoignage"}
          </button>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
            Photo / Logo
          </h3>
          <Controller
            control={control}
            name="photoUrl"
            render={({ field }) => (
              <ImageUpload value={field.value ?? null} onChange={field.onChange} />
            )}
          />
        </div>
      </aside>
    </form>
  );
}

const inputClass =
  "w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-white/10 " +
  "text-white placeholder:text-slate-500 " +
  "focus:outline-none focus:border-[#ffa800] focus:ring-1 focus:ring-[#ffa800]";

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-200">{label}</label>
        {hint && <span className="text-xs text-slate-500">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
