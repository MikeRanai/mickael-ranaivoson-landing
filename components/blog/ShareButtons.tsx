"use client";

import { useState } from "react";
import { Check, Copy, Facebook, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { SITE_CONFIG } from "@/lib/data";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const sharePlatforms = [
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

  const followPlatforms = [
    { name: "LinkedIn", icon: Linkedin, href: SITE_CONFIG.socials.linkedin },
    { name: "Facebook", icon: Facebook, href: SITE_CONFIG.socials.facebook },
    { name: "GitHub", icon: Github, href: SITE_CONFIG.socials.github },
    {
      name: "Malt",
      icon: MaltIcon,
      href: SITE_CONFIG.socials.malt,
    },
    { name: "Email", icon: Mail, href: "mailto:ranaimike@gmail.com" },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="mt-12 pt-8 border-t border-white/10 space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-slate-400 mr-2">Partager :</span>
        {sharePlatforms.map((p) => (
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

      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-slate-400 mr-2">Suivez-moi :</span>
        {followPlatforms.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target={p.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={`Me suivre sur ${p.name}`}
            className="w-10 h-10 rounded-full flex items-center justify-center
              bg-slate-900/70 border border-white/10 text-slate-300
              hover:border-[#ffa800]/40 hover:text-[#ffa800] transition-colors"
          >
            <p.icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  );
}

function MaltIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.94 17.737a1.764 1.764 0 0 1-2.41.647l-4.08-2.356a.353.353 0 0 1 0-.611l4.08-2.356a1.764 1.764 0 0 1 2.41.647 1.764 1.764 0 0 1 0 1.764l-.001.001a1.764 1.764 0 0 1 .001 2.264zm-2.41-5.381L10.45 9.999a.353.353 0 0 1 0-.611l4.08-2.356a1.764 1.764 0 0 1 2.41.647 1.764 1.764 0 0 1-.647 2.41l-.001.001a1.764 1.764 0 0 1 .647 2.41 1.764 1.764 0 0 1-2.41.647l.001-.791zM7.06 6.263a1.764 1.764 0 0 1 2.41-.647l4.08 2.356a.353.353 0 0 1 0 .611L9.47 10.94a1.764 1.764 0 0 1-2.41-.647 1.764 1.764 0 0 1 0-1.764 1.764 1.764 0 0 1 0-2.266z" />
    </svg>
  );
}
