"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImageIcon, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/lib/blog-utils";

type UploadResult = { info?: { secure_url?: string } };

export default function ImageUpload({
  value,
  onChange,
}: {
  value?: string | null;
  onChange: (url: string | null) => void;
}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return (
      <div className="space-y-2">
        <input
          type="url"
          placeholder="URL de l'image de couverture"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value || null)}
          className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-white/10
            text-white placeholder:text-slate-500
            focus:outline-none focus:border-[#ffa800] focus:ring-1 focus:ring-[#ffa800]"
        />
        <p className="text-xs text-slate-500">
          Configurez <code className="text-[#ffb92e]">NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> et{" "}
          <code className="text-[#ffb92e]">NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</code> pour activer
          l&apos;upload.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10">
          <Image
            src={optimizeCloudinaryUrl(value, 1200)}
            alt="Aperçu"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5
              rounded-full bg-slate-950/80 backdrop-blur-sm border border-white/10
              text-xs text-white hover:bg-red-500/90 hover:border-red-500 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Retirer
          </button>
        </div>
      ) : (
        <div
          className="aspect-[16/9] rounded-xl border-2 border-dashed border-white/10
            flex flex-col items-center justify-center text-slate-500 bg-slate-900/40"
        >
          <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
          <p className="text-sm">Aucune image sélectionnée</p>
        </div>
      )}

      <CldUploadWidget
        uploadPreset={uploadPreset}
        options={{ maxFileSize: 5_000_000, resourceType: "image", sources: ["local", "url"] }}
        onSuccess={(result) => {
          const r = result as UploadResult;
          if (r.info?.secure_url) onChange(r.info.secure_url);
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5
              rounded-lg border border-white/10 bg-slate-900/70 text-slate-200
              hover:border-[#ffa800]/50 hover:text-[#ffa800] transition-colors"
          >
            <UploadCloud className="w-4 h-4" />
            {value ? "Remplacer l'image" : "Téléverser une image"}
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
