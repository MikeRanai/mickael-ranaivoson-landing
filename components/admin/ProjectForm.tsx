"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, Save, Plus, X } from "lucide-react";
import { createProject, updateProject } from "@/actions/project.actions";
import { slugify } from "@/lib/blog-utils";
import ImageUpload from "./ImageUpload";
import RichTextEditor from "./RichTextEditor";

const ACCENT_OPTIONS = [
  { value: "gold", label: "Or (#ffa800)" },
  { value: "blue", label: "Bleu" },
  { value: "rose", label: "Rose" },
  { value: "emerald", label: "Émeraude" },
] as const;

// Gabarit pré-rempli en création — guide la structure d'une étude de cas
// sans imposer de champs. L'admin remplace simplement le texte.
const CASE_STUDY_TEMPLATE =
  "<h2>Le défi</h2><p>Quel problème concret le client rencontrait-il ?</p>" +
  "<h2>La solution</h2><p>Ce que j'ai conçu et construit, et comment.</p>" +
  "<h2>Les résultats</h2><p>Les bénéfices mesurés (complète aussi les chiffres clés).</p>";

const projectSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire").max(120),
  tag: z.string().min(1, "Le tag est obligatoire (ex: Vitrine Premium)").max(60),
  description: z.string().min(10, "Décris le projet en au moins 10 caractères").max(600),
  imageUrl: z
    .string()
    .refine((v) => v.startsWith("/") || /^https?:\/\//.test(v), {
      message: "Chemin /images/… ou URL http(s) attendu",
    })
    .nullable()
    .or(z.literal("")),
  url: z.string().url().nullable().or(z.literal("")),
  ctaLabel: z.string().max(40).nullable().or(z.literal("")),
  accentColor: z.enum(["gold", "blue", "rose", "emerald"]),
  featured: z.boolean(),
  bulletsText: z.string().max(1000),
  kpis: z
    .array(
      z.object({
        value: z.string().max(20),
        label: z.string().max(80),
      })
    )
    .max(4, "4 KPIs maximum"),
  displayOrder: z.number().int().min(0).max(999),
  published: z.boolean(),
  // --- Étude de cas ---
  slug: z
    .string()
    .max(120)
    .regex(/^[a-z0-9-]*$/, "Minuscules, chiffres et tirets uniquement")
    .or(z.literal("")),
  content: z.string().max(50000),
  role: z.string().max(120).or(z.literal("")),
  year: z
    .number()
    .int()
    .min(2000)
    .max(2100)
    .nullable()
    .or(z.nan().transform(() => null)),
  sector: z.string().max(120).or(z.literal("")),
  techStackText: z.string().max(1000),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export type ExistingProject = {
  id: string;
  title: string;
  tag: string;
  description: string;
  imageUrl: string | null;
  url: string | null;
  ctaLabel: string | null;
  accentColor: string;
  featured: boolean;
  bullets: string[];
  kpis: { value: string; label: string }[] | null;
  displayOrder: number;
  published: boolean;
  slug: string | null;
  content: string | null;
  role: string | null;
  year: number | null;
  sector: string | null;
  techStack: string[];
};

export default function ProjectForm({ project }: { project?: ExistingProject }) {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? {
          title: project.title,
          tag: project.tag,
          description: project.description,
          imageUrl: project.imageUrl,
          url: project.url ?? "",
          ctaLabel: project.ctaLabel ?? "",
          accentColor: (project.accentColor as ProjectFormValues["accentColor"]) ?? "gold",
          featured: project.featured,
          bulletsText: (project.bullets ?? []).join("\n"),
          kpis: project.kpis ?? [],
          displayOrder: project.displayOrder,
          published: project.published,
          slug: project.slug ?? "",
          content: project.content ?? "",
          role: project.role ?? "",
          year: project.year ?? null,
          sector: project.sector ?? "",
          techStackText: (project.techStack ?? []).join("\n"),
        }
      : {
          title: "",
          tag: "",
          description: "",
          imageUrl: null,
          url: "",
          ctaLabel: "",
          accentColor: "gold",
          featured: false,
          bulletsText: "",
          kpis: [],
          displayOrder: 0,
          published: false,
          slug: "",
          content: "",
          role: "",
          year: null,
          sector: "",
          techStackText: "",
        },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "kpis" });
  const slugValue = watch("slug");

  // Auto-slug depuis le titre tant que le slug n'a pas été saisi manuellement
  // (uniquement en création — on ne change pas l'URL d'un projet existant).
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!project && !slugValue) {
      setValue("slug", slugify(e.target.value));
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    setError(null);
    try {
      const splitLines = (s: string) =>
        s.split("\n").map((b) => b.trim()).filter(Boolean);

      const bullets = splitLines(data.bulletsText);
      const techStack = splitLines(data.techStackText);
      const kpis = data.kpis.filter((k) => k.value.trim() || k.label.trim());

      const payload = {
        title: data.title,
        tag: data.tag,
        description: data.description,
        imageUrl: data.imageUrl || null,
        url: data.url || null,
        ctaLabel: data.ctaLabel || null,
        accentColor: data.accentColor,
        featured: data.featured,
        bullets,
        kpis: kpis.length ? kpis : null,
        displayOrder: data.displayOrder,
        published: data.published,
        slug: data.slug || null,
        content: data.content || null,
        role: data.role || null,
        year: data.year ?? null,
        sector: data.sector || null,
        techStack,
      };

      if (project) await updateProject(project.id, payload);
      else await createProject(payload);
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
          <Field label="Titre du projet" error={errors.title?.message}>
            <input
              {...register("title", { onChange: onTitleChange })}
              type="text"
              placeholder="NoutAsso"
              className={inputClass}
            />
          </Field>

          <Field
            label="Tag / Catégorie"
            error={errors.tag?.message}
            hint="Ex: Vitrine Premium"
          >
            <input
              {...register("tag")}
              type="text"
              placeholder="SaaS & Automatisation"
              className={inputClass}
            />
          </Field>
        </div>

        <Field
          label="Slug (URL de l'étude de cas)"
          error={errors.slug?.message}
          hint={`/realisations/${slugValue || "…"}`}
        >
          <input
            {...register("slug")}
            type="text"
            placeholder="noutasso"
            className={inputClass}
          />
        </Field>

        <Field label="Description" error={errors.description?.message}>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="La plateforme de référence pour les associations réunionnaises…"
            className={inputClass}
          />
        </Field>

        <Field
          label="Points clés"
          error={errors.bulletsText?.message}
          hint="Un point par ligne (affichés avec ▸)"
        >
          <textarea
            {...register("bulletsText")}
            rows={4}
            placeholder={"Score PageSpeed 95+ (mobile)\n1ʳᵉ page Google sur les requêtes locales\nTunnel d'inscription en ligne fluide"}
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            label="Lien du projet"
            error={errors.url?.message}
            hint="Vide = CTA « En discuter »"
          >
            <input
              {...register("url")}
              type="url"
              placeholder="https://noutasso.fr"
              className={inputClass}
            />
          </Field>

          <Field
            label="Libellé du bouton"
            error={errors.ctaLabel?.message}
            hint="Optionnel — auto sinon"
          >
            <input
              {...register("ctaLabel")}
              type="text"
              placeholder="Voir le site"
              className={inputClass}
            />
          </Field>
        </div>

        {/* Chiffres clés — grande carte (si en avant) ET page étude de cas */}
        <div className="rounded-xl border border-[#ffa800]/20 bg-[#ffa800]/5 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Chiffres clés (KPIs)</h3>
                <p className="text-xs text-slate-400">
                  Grande carte + page étude de cas — 4 maximum
                </p>
              </div>
              {fields.length < 4 && (
                <button
                  type="button"
                  onClick={() => append({ value: "", label: "" })}
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-[#ffa800] text-slate-950 font-semibold hover:bg-[#ffb92e]"
                >
                  <Plus className="w-3.5 h-3.5" /> Ajouter
                </button>
              )}
            </div>

            {fields.length === 0 && (
              <p className="text-xs text-slate-500">Aucun KPI — clique « Ajouter ».</p>
            )}

            {fields.map((f, i) => (
              <div key={f.id} className="flex items-start gap-3">
                <input
                  {...register(`kpis.${i}.value`)}
                  type="text"
                  placeholder="−40%"
                  className={`${inputClass} flex-1`}
                />
                <input
                  {...register(`kpis.${i}.label`)}
                  type="text"
                  placeholder="de charge mentale au bureau"
                  className={`${inputClass} flex-[2]`}
                />
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="p-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 shrink-0"
                  title="Retirer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
        </div>

        {/* --- ÉTUDE DE CAS --- */}
        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5 space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-white">Étude de cas</h3>
            <p className="text-xs text-slate-400">
              Remplis le récit ci-dessous pour générer la page{" "}
              <code className="text-[#ffb92e]">/realisations/{slugValue || "…"}</code>.
              Tant qu&apos;il est vide, le projet reste une simple carte.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Field label="Rôle" error={errors.role?.message}>
              <input
                {...register("role")}
                type="text"
                placeholder="Conception & dev full-stack"
                className={inputClass}
              />
            </Field>
            <Field label="Année" error={errors.year?.message}>
              <input
                {...register("year", { setValueAs: (v) => (v === "" ? null : Number(v)) })}
                type="number"
                min={2000}
                max={2100}
                placeholder="2025"
                className={inputClass}
              />
            </Field>
            <Field label="Secteur" error={errors.sector?.message}>
              <input
                {...register("sector")}
                type="text"
                placeholder="Association sportive"
                className={inputClass}
              />
            </Field>
          </div>

          <Field
            label="Stack technique"
            error={errors.techStackText?.message}
            hint="Une techno par ligne (affichées en chips)"
          >
            <textarea
              {...register("techStackText")}
              rows={3}
              placeholder={"Next.js\nPostgreSQL\nTailwind"}
              className={inputClass}
            />
          </Field>

          <Field
            label="Récit (contexte → solution → résultats)"
            error={errors.content?.message}
          >
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <RichTextEditor
                  value={field.value || (project ? "" : CASE_STUDY_TEMPLATE)}
                  onChange={field.onChange}
                />
              )}
            />
          </Field>
        </div>
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

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("featured")}
              className="w-4 h-4 rounded accent-[#ffa800]"
            />
            <span className="text-sm text-slate-200">
              Mettre en avant (grande carte)
            </span>
          </label>

          <Field
            label="Couleur d'accent"
            error={errors.accentColor?.message}
          >
            <select {...register("accentColor")} className={inputClass}>
              {ACCENT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Ordre d'affichage"
            error={errors.displayOrder?.message}
            hint="Plus petit = en premier"
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
            {project ? "Mettre à jour" : "Créer le projet"}
          </button>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
            Image de couverture
          </h3>
          <p className="text-xs text-slate-500 -mt-2">
            Vide = carte « Projet confidentiel » (placeholder)
          </p>
          <Controller
            control={control}
            name="imageUrl"
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
