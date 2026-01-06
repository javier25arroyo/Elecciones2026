"use client";

import * as React from "react";
import Link from "next/link";
import { FlagRounded as FlagRoundedIcon } from "@mui/icons-material";

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const costaRicaGradient = "linear-gradient(90deg, #002B7F 0%, #002B7F 20%, #FFFFFF 20%, #FFFFFF 35%, #CE1126 35%, #CE1126 65%, #FFFFFF 65%, #FFFFFF 80%, #002B7F 80%, #002B7F 100%)";

  return (
    <header
      className="fixed top-0 left-0 right-0 page-load-slide-up"
      style={{
        height: 70,
        background: isScrolled ? "rgba(255, 255, 255, 0.95)" : "white",
        backdropFilter: isScrolled ? "blur(10px)" : undefined,
        boxShadow: isScrolled ? "var(--shadow-sm)" : undefined,
        zIndex: "var(--z-sticky)",
        transition: "all var(--transition-normal)",
        borderBottom: "4px solid transparent",
        borderImage: costaRicaGradient,
        borderImageSlice: 1,
      }}
    >
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-sm"
          style={{ textDecoration: "none" }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <FlagRoundedIcon sx={{ fontSize: 26, color: "var(--color-primary)" }} aria-hidden="true" />
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Elecciones 2026
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hide-mobile flex items-center gap-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
          <a href="#quiz" className="btn btn-primary btn-sm">
            Hacer Quiz
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="hide-desktop btn-ghost"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          style={{
            padding: "var(--spacing-sm)",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span
            style={{
              display: "block",
              width: 24,
              height: 2,
              background: "var(--color-text-primary)",
              borderRadius: 1,
              transition: "transform var(--transition-normal)",
              transform: isMenuOpen
                ? "rotate(45deg) translateY(6px)"
                : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 24,
              height: 2,
              background: "var(--color-text-primary)",
              borderRadius: 1,
              opacity: isMenuOpen ? 0 : 1,
              transition: "opacity var(--transition-fast)",
            }}
          />
          <span
            style={{
              display: "block",
              width: 24,
              height: 2,
              background: "var(--color-text-primary)",
              borderRadius: 1,
              transition: "transform var(--transition-normal)",
              transform: isMenuOpen
                ? "rotate(-45deg) translateY(-6px)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="hide-desktop"
        style={{
          position: "fixed",
          top: 70,
          left: 0,
          right: 0,
          bottom: 0,
          background: "white",
          transform: isMenuOpen ? "translateY(0)" : "translateY(-100%)",
          opacity: isMenuOpen ? 1 : 0,
          transition: "all var(--transition-slow)",
          pointerEvents: isMenuOpen ? "auto" : "none",
          padding: "var(--spacing-lg)",
        }}
      >
        <nav className="flex flex-col gap-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: "var(--color-text-primary)",
                textDecoration: "none",
                fontSize: "1.25rem",
                fontWeight: 600,
                padding: "var(--spacing-md) 0",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#quiz"
            className="btn btn-primary mt-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Hacer Quiz
          </a>
        </nav>
      </div>
    </header>
  );
}
