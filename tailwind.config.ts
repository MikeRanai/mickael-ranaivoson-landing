import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ============================================
         Deep Slate & Gold Color Palette
         ============================================ */
      colors: {
        // Semantic colors (mapped via CSS variables in globals.css)
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        // Direct color values for utility classes
        gold: {
          DEFAULT: "#ffa800",
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#ffb92e",
          500: "#ffa800",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },

      /* ============================================
         Typography
         ============================================ */
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
      },

      /* ============================================
         Border Radius
         ============================================ */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* ============================================
         Box Shadows - Gold Glow Effects
         ============================================ */
      boxShadow: {
        "glow-sm": "0 0 10px -3px rgba(255, 168, 0, 0.2)",
        glow: "0 0 20px -5px rgba(255, 168, 0, 0.3)",
        "glow-lg": "0 0 40px -10px rgba(255, 168, 0, 0.4)",
        "glow-xl": "0 0 60px -15px rgba(255, 168, 0, 0.5)",
        "inner-glow": "inset 0 0 20px -5px rgba(255, 168, 0, 0.2)",
      },

      /* ============================================
         Background Images - Gradients
         ============================================ */
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-gold":
          "linear-gradient(135deg, #ffa800 0%, #ffb92e 50%, #fcd34d 100%)",
        "gradient-dark":
          "linear-gradient(180deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
        "glow-radial":
          "radial-gradient(ellipse at center, rgba(255, 168, 0, 0.15) 0%, transparent 70%)",
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, rgba(255, 168, 0, 0.1) 0deg, transparent 60deg, transparent 300deg, rgba(255, 168, 0, 0.1) 360deg)",
      },

      /* ============================================
         Animation Keyframes
         ============================================ */
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px -5px rgba(255, 168, 0, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 30px -5px rgba(255, 168, 0, 0.5)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        glow: {
          "0%": {
            boxShadow:
              "0 0 5px rgba(255, 168, 0, 0.2), 0 0 10px rgba(255, 168, 0, 0.1)",
          },
          "100%": {
            boxShadow:
              "0 0 20px rgba(255, 168, 0, 0.4), 0 0 30px rgba(255, 168, 0, 0.2)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "spin-slow": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },

      /* ============================================
         Animations
         ============================================ */
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "spin-slow": "spin-slow 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
