"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { createPost, updatePost } from "@/actions/blog.actions";
import { POST_TAGS, slugify } from "@/lib/blog-utils";
import RichTextEditor from "./RichTextEditor";
import ImageUpload from "./ImageUpload";

const postSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire").max(200),
  slug: z
    .string()
    .min(1, "Le slug est obligatoire")
    .regex(/^[a-z0-9-]+$/, "Seulement lettres minuscules, chiffres et tirets"),
  content: z.string().min(1, "Le contenu est obligatoire"),
  excerpt: z.string().max(300).nullable(),
  metaDescription: z.string().max(160, "Max 160 caractères").nullable(),
  tag: z.string(),
  coverImage: z.string().url().nullable().or(z.literal("")),
  published: z.boolean(),
});

type PostFormValues = z.infer<typeof postSchema>;

type ExistingPost = PostFormValues & { id: string };

export default function PostForm({ post }: { post?: ExistingPost }) {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: post ?? {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      metaDescription: "",
      tag: "general",
      coverImage: null,
      published: false,
    },
  });

  const metaDesc = watch("metaDescription") ?? "";
  const excerpt = watch("excerpt") ?? "";
  const slug = watch("slug");

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!post) setValue("slug", slugify(e.target.value));
  };

  const onSubmit = async (data: PostFormValues) => {
    setError(null);
    try {
      const payload = { ...data, coverImage: data.coverImage || null };
      if (post) await updatePost(post.id, payload);
      else await createPost(payload);
    } catch (e) {
      if (e instanceof Error && !e.message.includes("NEXT_REDIRECT")) {
        setError(e.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-5">
        <Field label="Titre" error={errors.title?.message}>
          <input
            {...register("title", { onChange: onTitleChange })}
            type="text"
            placeholder="Mon super article"
            className={inputClass}
          />
        </Field>

        <Field
          label="Slug"
          error={errors.slug?.message}
          hint={`URL : /blog/${slug || "..."}`}
        >
          <input {...register("slug")} type="text" className={inputClass} />
        </Field>

        <Field label="Contenu" error={errors.content?.message}>
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <RichTextEditor value={field.value} onChange={field.onChange} />
            )}
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
            <span className="text-sm text-slate-200">Publier cet article</span>
          </label>

          <Field label="Catégorie">
            <select {...register("tag")} className={inputClass}>
              {POST_TAGS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5
              rounded-lg bg-[#ffa800] text-slate-950 font-semibold
              hover:bg-[#ffb92e] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {post ? "Mettre à jour" : "Créer l'article"}
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
          <Controller
            control={control}
            name="coverImage"
            render={({ field }) => (
              <ImageUpload value={field.value ?? null} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
            SEO
          </h3>

          <Field
            label="Description méta"
            error={errors.metaDescription?.message}
            hint={`${metaDesc.length}/160`}
          >
            <textarea
              {...register("metaDescription")}
              rows={3}
              placeholder="Affichée dans les résultats de recherche (max 160 caractères)"
              className={inputClass}
            />
          </Field>

          <Field
            label="Extrait"
            error={errors.excerpt?.message}
            hint={`${excerpt.length}/300 — laisser vide pour auto`}
          >
            <textarea
              {...register("excerpt")}
              rows={3}
              placeholder="Résumé affiché sur la carte d'article"
              className={inputClass}
            />
          </Field>
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
