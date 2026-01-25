"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MessageSquare } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  Variants,
} from "framer-motion";

// ===========================================
// Navigation Data
// ===========================================
const navLinks = [
  { href: "/#solutions", label: "Ce que je fais" },
  { href: "/#realisations", label: "Mes projets" },
  { href: "/#apropos", label: "Qui suis-je" },
  { href: "/#tarifs", label: "Tarifs" },
];

// ===========================================
// Custom Hook: useSmartHeader
// ===========================================
function useSmartHeader() {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isAtTop = latest < 10;
    const isScrollingDown = latest > lastScrollY && latest > 100;
    const isScrollingUp = latest < lastScrollY;

    // Update scrolled state for glassmorphism
    setIsScrolled(!isAtTop);

    // Update hidden state for smart hide
    if (isScrollingDown) {
      setIsHidden(true);
    } else if (isScrollingUp) {
      setIsHidden(false);
    }

    setLastScrollY(latest);
  });

  return { isHidden, isScrolled };
}

// ===========================================
// Sub-components
// ===========================================

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <Image
        src="/images/mr-logo-blanc.svg"
        alt="Mickael Ranaivoson Logo"
        width={60}
        height={60}
        className="w-12 h-12 sm:w-15 sm:h-15 transition-transform duration-300 group-hover:scale-105"
        priority
      />
      <div className="flex flex-col">
        <span 
          className="text-base sm:text-lg font-bold tracking-tight leading-tight whitespace-nowrap font-sans bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #ffffff 0%, #ffa800 50%, #ffb92e 100%)",
          }}
        >
          MICKAEL RANAIVOSON
        </span>
        {/* <span className="text-xs sm:text-sm font-medium text-primary transition-colors duration-300 group-hover:text-[#ffb92e]">
          Digital Solutions
        </span> */}
      </div>
    </Link>
  );
}

function StatusBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full
        bg-emerald-500/10 border border-emerald-500/20 ${className}`}
    >
      {/* Pulsing dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="text-xs font-medium text-emerald-400 whitespace-nowrap">
        Dispo pour projets
      </span>
    </div>
  );
}

function CTAButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/#contact"
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
        bg-[#ffa800] text-slate-950 font-bold text-sm
        hover:bg-[#ffb92e] transition-all duration-300
        shadow-[0_0_20px_-5px_rgba(255,168,0,0.3)]
        hover:shadow-[0_0_30px_-5px_rgba(255,168,0,0.5)]
        ${className}`}
    >
      <MessageSquare className="w-4 h-4 fill-current" />
      <span>On en parle ?</span>
    </Link>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="relative text-slate-300 font-medium transition-all duration-300
        hover:text-primary
        after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0
        after:bg-primary after:transition-all after:duration-300
        hover:after:w-full
        hover:drop-shadow-[0_0_8px_rgba(255,168,0,0.5)]"
    >
      {label}
    </Link>
  );
}

// ===========================================
// Mobile Menu Component
// ===========================================
function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: { opacity: 0, x: -20 },
  };

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants: Variants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
      x: "100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />

          {/* Side Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 z-50 h-full w-[80%] max-w-sm md:hidden
              bg-slate-950/95 backdrop-blur-xl border-l border-white/10"
          >
            {/* Close Button */}
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col px-8 space-y-2"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-4 text-2xl font-semibold text-slate-200
                      hover:text-primary transition-colors duration-300
                      border-b border-white/5"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Status Badge in Mobile */}
              <motion.div variants={itemVariants} className="pt-6">
                <StatusBadge />
              </motion.div>

              {/* CTA Button in Mobile */}
              <motion.div variants={itemVariants} className="pt-4">
                <Link
                  href="/#contact"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl
                    bg-[#ffa800] text-slate-950 font-bold text-lg
                    hover:bg-[#ffb92e] transition-all duration-300
                    shadow-[0_0_25px_-5px_rgba(255,168,0,0.4)]"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  On en parle ?
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ===========================================
// Main Header Component
// ===========================================
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isHidden, isScrolled } = useSmartHeader();

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300
          ${
            isScrolled
              ? "bg-slate-950/70 backdrop-blur-md border-b border-white/5"
              : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </nav>

            {/* Action Area */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Status Badge - Desktop */}
              <StatusBadge className="hidden md:flex" />

              {/* Hamburger Menu - Mobile/Tablet */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
                aria-label="Ouvrir le menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

export default Header;
