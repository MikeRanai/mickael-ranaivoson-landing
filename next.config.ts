import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content-Security-Policy — défense en profondeur.
// Allowlist limitée aux services réellement chargés :
//   - Cloudinary (next-cloudinary CldUploadWidget + images res.cloudinary.com)
//   - Cloudflare Turnstile (script + iframe + siteverify)
//   - Vercel Analytics / Speed Insights (va.vercel-scripts.com + beacons same-origin)
//   - YouTube embeds insérés via TipTap (mode nocookie)
// `unsafe-inline` (script/style) est nécessaire faute d'infra à nonce
// (Next n'est pas instrumenté pour ça) ; `unsafe-eval` est limité au dev (HMR).
const cspDirectives = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com https://*.cloudinary.com https://va.vercel-scripts.com`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: https://*.cloudinary.com`,
  `font-src 'self'`,
  `connect-src 'self' https://challenges.cloudflare.com https://*.cloudinary.com https://va.vercel-scripts.com`,
  `frame-src 'self' https://challenges.cloudflare.com https://*.cloudinary.com https://www.youtube-nocookie.com https://www.youtube.com`,
  `worker-src 'self' blob:`,
  `frame-ancestors 'self'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `object-src 'none'`,
  `upgrade-insecure-requests`,
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspDirectives,
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
