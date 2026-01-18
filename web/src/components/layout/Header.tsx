"use client";

import * as React from "react";
import Link from "next/link";
import { Flag, Menu, X, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#candidatos", label: "Candidatos" },
  { href: "#timeline", label: "Cronograma" },
  { href: "#educacion", label: "¿Cómo votar?" },
  { href: "#quiz", label: "Quiz" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const sentinel = document.getElementById("scroll-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the sentinel is NOT intersecting (scrolled past), we are scrolled
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Cierre automático en resize a desktop para evitar estados inconsistentes
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-900/80 shadow-2xl backdrop-blur-xl py-2"
          : "bg-slate-900/40 backdrop-blur-sm py-4"
      }`}
    >
      {/* Barra tricolor inferior estilo CR */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-costa-rica transition-opacity duration-500 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between h-14">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none shrink-0"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="relative p-2.5 bg-white/10 rounded-xl group-hover:bg-white/20 transition-all duration-300 ring-1 ring-white/20 group-hover:ring-white/40 shadow-inner">
            <Flag className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-white tracking-tighter uppercase sm:text-2xl">
            Elecciones <span className="text-blue-400">2026</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors relative group py-2"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300 ease-out" />
            </Link>
          ))}
        </nav>

        {/* GitHub Link - Desktop */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <a
            href="https://github.com/javier25arroyo" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
            aria-label="GitHub Repository"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 shrink-0"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden shadow-xl"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors font-medium flex items-center justify-between group active:bg-slate-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
              
              <div className="h-px bg-slate-800 my-2 mx-2" />
              
              <motion.div
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: navLinks.length * 0.05 }}
              >
                  <a
                    href="https://github.com/javier25arroyo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors font-medium flex items-center gap-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="p-1 bg-slate-800 rounded-md">
                        <Github className="w-4 h-4" />
                    </div>
                    <span>Ver Proyecto en GitHub</span>
                  </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
