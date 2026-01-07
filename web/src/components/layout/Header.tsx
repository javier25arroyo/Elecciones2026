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
        background: isScrolled ? "rgba(15, 23, 42, 0.9)" : "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: isScrolled ? "var(--shadow-md)" : "var(--shadow-sm)",
        zIndex: "var(--z-sticky)",
        transition: "all var(--transition-normal)",
        borderBottom: "4px solid transparent",
        borderImage: costaRicaGradient,
        borderImageSlice: 1,
      }}
    >
      <div className="container h-full flex items-center justify-between">
        {/* Logo - Izquierda */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
          <Link
            href="/"
            className="flex items-center gap-sm"
            style={{ textDecoration: "none" }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <FlagRoundedIcon sx={{ fontSize: 26, color: "#60a5fa" }} aria-hidden="true" />
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                  color: "white",
                  textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                Elecciones
              </span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Centro */}
        <nav 
          className="items-center"
          style={{ 
            display: "var(--nav-desktop-display, none)",
            gap: "clamp(1rem, 3vw, 2.5rem)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{
                whiteSpace: "nowrap",
                padding: "8px 12px",
              }}
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#quiz" 
            className="btn btn-primary btn-sm"
            style={{
              marginLeft: "8px",
            }}
          >
            Hacer Quiz
          </a>
        </nav>

        {/* Espacio derecho para balance + Mobile Menu Button */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            style={{
              padding: "var(--spacing-sm)",
              display: "var(--nav-mobile-display, flex)",
              flexDirection: "column",
              gap: 4,
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
          <span
            style={{
              display: "block",
              width: 24,
              height: 2,
              background: "white",
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
              background: "white",
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
              background: "white",
              borderRadius: 1,
              transition: "transform var(--transition-normal)",
              transform: isMenuOpen
                ? "rotate(-45deg) translateY(-6px)"
                : "none",
            }}
          />
        </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 70,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.75) 30%, rgba(15, 23, 42, 0.5) 50%, rgba(15, 23, 42, 0.75) 70%, rgba(15, 23, 42, 0.95) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "var(--spacing-lg)",
            zIndex: 99,
          }}
        >
        <nav className="flex flex-col gap-lg">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1.25rem",
                fontWeight: 600,
                padding: "var(--spacing-lg)",
                borderRadius: "var(--radius-lg)",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.2s ease",
                animation: `slideInUpShort 0.4s ease forwards ${index * 0.05}s`,
                opacity: 0, // Inicia invisible para la animación
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateX(8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#quiz"
            className="btn btn-primary mt-md"
            onClick={() => setIsMenuOpen(false)}
            style={{
               animation: `slideInUpShort 0.4s ease forwards ${navLinks.length * 0.05}s`,
               opacity: 0,
               boxShadow: "0 4px 20px rgba(206, 17, 38, 0.4)",
            }}
          >
            Hacer Quiz
          </a>
        </nav>
        </div>
      )}
    </header>
  );
}
