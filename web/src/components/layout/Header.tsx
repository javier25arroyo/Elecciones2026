"use client";

import * as React from "react";
import Link from "next/link";
import { FlagRounded as FlagRoundedIcon, GitHub as GitHubIcon } from "@mui/icons-material";

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
      className="fixed top-0 left-0 right-0"
      style={{
        height: 70,
        background: isScrolled ? "rgba(15, 23, 42, 0.9)" : "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: isScrolled ? "var(--shadow-md)" : "var(--shadow-sm)",
        zIndex: 99999,
        transition: "all var(--transition-normal)",
        borderBottom: "4px solid transparent",
        borderImage: costaRicaGradient,
        borderImageSlice: 1,
      }}
    >
      <div className="container h-full flex items-center justify-between page-load-slide-up">
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
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem" }}>
          {/* GitHub Link - Desktop only */}
          <a
            href="https://github.com/javier25arroyo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver GitHub"
            style={{
              display: "var(--nav-desktop-display, none)",
              color: "white",
              transition: "all 0.2s ease",
              padding: "8px",
              borderRadius: "8px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#60a5fa";
              e.currentTarget.style.background = "rgba(96, 165, 250, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "white";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <GitHubIcon sx={{ fontSize: 24 }} />
          </a>
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
            background: "#0f172a",
            padding: "var(--spacing-xl)",
            zIndex: 99998,
            overflowY: "auto",
          }}
        >
        <nav className="flex flex-col gap-md" style={{ maxWidth: 500, margin: "0 auto" }}>
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1.125rem",
                fontWeight: 600,
                padding: "1rem 1.25rem",
                borderRadius: "12px",
                background: "#1e293b",
                border: "1px solid #334155",
                transition: "all 0.2s ease",
                animation: `slideInUpShort 0.4s ease forwards ${index * 0.05}s`,
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#334155";
                e.currentTarget.style.transform = "translateX(8px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#1e293b";
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
               padding: "1rem 1.25rem",
               fontSize: "1.125rem",
               fontWeight: 600,
               textAlign: "center",
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
