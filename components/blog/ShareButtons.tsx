"use client";

import { useState } from "react";
import { Check, Copy, Facebook, Linkedin, Twitter } from "lucide-react";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    },
    {
      name: "X",
      icon: Twitter,
      href: `https://x.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="mt-12 pt-8 border-t border-white/10 flex items-center gap-3 flex-wrap">
      <span className="text-sm text-slate-400 mr-2">Partager :</span>
      {platforms.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Partager sur ${p.name}`}
          className="w-10 h-10 rounded-full flex items-center justify-center
            bg-slate-900/70 border border-white/10 text-slate-300
            hover:border-[#ffa800]/40 hover:text-[#ffa800] transition-colors"
        >
          <p.icon className="w-4 h-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copier le lien"
        className="w-10 h-10 rounded-full flex items-center justify-center
          bg-slate-900/70 border border-white/10 text-slate-300
          hover:border-[#ffa800]/40 hover:text-[#ffa800] transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}
