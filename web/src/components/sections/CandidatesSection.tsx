"use client";

import * as React from "react";
import Image from "next/image";
import type { Party } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { useScrollReveal } from "@/lib/useScrollReveal";
import PeopleIcon from "@mui/icons-material/PeopleOutlineOutlined";
import CircleIcon from "@mui/icons-material/CircleOutlined";
import LeafIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import WorkIcon from "@mui/icons-material/WorkOutlineOutlined";
import SchoolIcon from "@mui/icons-material/SchoolOutlined";
import ShieldIcon from "@mui/icons-material/ShieldOutlined";
import HealthIcon from "@mui/icons-material/LocalHospitalOutlined";
import BoltIcon from "@mui/icons-material/BoltOutlined";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";

interface CandidatesSectionProps {
  parties: Party[];
}

export function CandidatesSection({ parties }: CandidatesSectionProps) {
  const [filter, setFilter] = React.useState<string>("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredParties = React.useMemo(() => {
    return parties.filter((party) => {
      const matchesSearch =
        party.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        party.presidential_candidate?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      if (filter === "all") return matchesSearch;

      const ideology = party.ideology?.toLowerCase() || "";
      if (filter === "izquierda")
        return matchesSearch && ideology.includes("izquierda");
      if (filter === "derecha")
        return matchesSearch && ideology.includes("derecha");
      if (filter === "centro")
        return matchesSearch && ideology.includes("centro");

      return matchesSearch;
    });
  }, [parties, filter, searchTerm]);

  return (
    <section
      id="candidatos"
      className="py-3xl bg-app-light"
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-2xl">
          <Badge variant="primary" className="mb-md" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>
            14+ Candidaturas
          </Badge>
          <h2 style={{ color: "white" }}>Conocé a los candidatos 2026</h2>
          <p style={{ maxWidth: 600, margin: "0 auto", color: "rgba(255,255,255,0.8)" }}>
            Explorá los perfiles de cada candidato, sus propuestas y valores.
            Tocá una tarjeta para ver más detalles.
          </p>
        </div>

        {/* Filters - Mobile friendly */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-between gap-md mb-xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            padding: "var(--spacing-md)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Search */}
          <div className="w-full sm:w-auto" style={{ flex: "1 1 auto", minWidth: 0 }}>
            <input
              type="search"
              placeholder="Buscar candidato o partido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input w-full"
              style={{ 
                borderRadius: "var(--radius-full)",
                paddingLeft: "var(--spacing-lg)",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
              }}
              aria-label="Buscar candidatos"
            />
          </div>

          {/* Filter buttons - Pills style */}
          <div className="flex flex-wrap gap-sm">
            {[
              { value: "all", label: "Todos", icon: <PeopleIcon sx={{ fontSize: "1rem" }} /> },
              { value: "izquierda", label: "Izquierda", icon: <CircleIcon sx={{ fontSize: "1rem", color: "var(--color-secondary)" }} /> },
              { value: "centro", label: "Centro", icon: <CircleIcon sx={{ fontSize: "1rem", color: "var(--color-warning)" }} /> },
              { value: "derecha", label: "Derecha", icon: <CircleIcon sx={{ fontSize: "1rem", color: "var(--color-primary-light)" }} /> },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className="btn btn-sm"
                style={{
                  background: filter === option.value 
                    ? "var(--color-primary)" 
                    : "rgba(255,255,255,0.1)",
                  color: filter === option.value 
                    ? "white" 
                    : "rgba(255,255,255,0.8)",
                  borderRadius: "var(--radius-full)",
                  padding: "8px 16px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  border: filter === option.value ? "none" : "1px solid rgba(255,255,255,0.2)",
                  transition: "all 0.2s ease",
                }}
                aria-pressed={filter === option.value}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid - Responsive: 1 col móvil, 2 col tablet, 3 col desktop */}
        <div
          className="grid gap-lg"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            alignItems: "stretch",
          }}
        >
          {filteredParties.map((party, index) => (
            <CandidateCard
              key={party.name}
              party={party}
              index={index}
            />
          ))}
        </div>

        {filteredParties.length === 0 && (
          <div className="text-center py-3xl">
            <p style={{ color: "rgba(255,255,255,0.7)" }}>
              No se encontraron candidatos con ese criterio.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

interface CandidateCardProps {
  party: Party;
  index: number;
}

function CandidateCard({ party, index }: CandidateCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const ref = useScrollReveal<HTMLElement>();
  const candidate = party.presidential_candidate;
  const logoUrl = party.logo_urls?.[0] || party.logo_url;

  // Get initials for fallback
  const getInitials = (name: string) => {
    const parts = name.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? "?";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
    return (first + last).toUpperCase();
  };

  const candidateName = candidate?.name || "Por definir";
  const accentColor = party.accent_color || "var(--color-primary)";

  // Generar tags basados en valores/ideología
  const getTags = () => {
    const tags: { icon: React.ReactNode; label: string; color: string }[] = [];
    const values = (party.values || []).join(" ").toLowerCase();
    const ideology = (party.ideology || "").toLowerCase();

    if (values.includes("ambiente") || values.includes("ecolog") || values.includes("sostenib")) {
      tags.push({ icon: <LeafIcon sx={{ fontSize: "1rem" }} />, label: "Ambiente", color: "var(--color-success)" });
    }
    if (values.includes("empleo") || values.includes("trabajo") || values.includes("económic")) {
      tags.push({ icon: <WorkIcon sx={{ fontSize: "1rem" }} />, label: "Empleo", color: "var(--color-accent)" });
    }
    if (values.includes("educación") || values.includes("educacion")) {
      tags.push({ icon: <SchoolIcon sx={{ fontSize: "1rem" }} />, label: "Educación", color: "var(--color-primary)" });
    }
    if (values.includes("seguridad") || values.includes("justicia")) {
      tags.push({ icon: <ShieldIcon sx={{ fontSize: "1rem" }} />, label: "Seguridad", color: "var(--color-secondary)" });
    }
    if (values.includes("salud") || values.includes("bienestar")) {
      tags.push({ icon: <HealthIcon sx={{ fontSize: "1rem" }} />, label: "Salud", color: "var(--color-secondary-light)" });
    }
    if (ideology.includes("liberal") || values.includes("libertad")) {
      tags.push({ icon: <BoltIcon sx={{ fontSize: "1rem" }} />, label: "Libertad", color: "var(--color-warning)" });
    }
    
    return tags.slice(0, 3); // Máximo 3 tags
  };

  const tags = getTags();

  return (
    <article
      ref={ref}
      className={`card scroll-reveal scroll-reveal-delay-${Math.min(index % 6 + 1, 5)}`}
      style={{
        borderTop: `4px solid ${accentColor}`,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: isExpanded ? "auto" : "500px",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "var(--shadow-md)",
        transition: "all var(--transition-slow)",
        position: "relative",
        overflow: "hidden",
      }}
      onClick={() => setIsExpanded(!isExpanded)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setIsExpanded(!isExpanded)}
      aria-expanded={isExpanded}
    >
      <div 
        className="flex flex-col items-center text-center" 
        style={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Logo / Photo */}
        <div
          className="relative"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            overflow: "hidden",
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            border: `3px solid ${accentColor}`,
            boxShadow: `0 8px 24px ${accentColor}30, 0 0 0 1px rgba(255,255,255,0.1)`,
            flexShrink: 0,
            marginBottom: "var(--spacing-md)",
            transition: "all var(--transition-slow)",
          }}
        >
          {candidate?.photo_url ? (
            <Image
              src={candidate.photo_url}
              alt={`Foto de ${candidateName}`}
              fill
              className="object-cover"
              sizes="100px"
              loading="lazy"
              decoding="async"
            />
          ) : logoUrl ? (
            <Image
              src={logoUrl}
              alt={`Logo de ${party.name}`}
              fill
              className="object-contain p-2"
              sizes="100px"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className="flex items-center justify-center w-full h-full"
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: accentColor,
              }}
            >
              {getInitials(candidateName)}
            </div>
          )}
        </div>

        {/* Name - Altura fija para simetría */}
        <h3
          className="mb-sm"
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            lineHeight: 1.3,
            minHeight: "3rem",
            maxHeight: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            padding: "0 var(--spacing-sm)",
            marginBottom: "var(--spacing-sm)",
          }}
        >
          {candidateName}
        </h3>

        {/* Party - Altura fija para simetría */}
        <p
          className="mb-md"
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.4,
            minHeight: "2.5rem",
            maxHeight: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.8)",
            fontWeight: 500,
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            padding: "0 var(--spacing-sm)",
            marginBottom: "var(--spacing-md)",
          }}
        >
          {party.name}
        </p>

        {/* Ideology badge - Altura fija para simetría */}
        <div 
          style={{ 
            minHeight: "32px",
            maxHeight: "32px",
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            marginBottom: "var(--spacing-md)",
            width: "100%",
          }}
        >
          {party.ideology ? (
            <Badge 
              variant="neutral" 
              style={{
                background: `color-mix(in srgb, ${accentColor} 20%, rgba(0,0,0,0.4))`, // Fondo más oscuro para contraste
                color: "#ffffff", // Texto blanco siempre para legibilidad
                border: `1px solid color-mix(in srgb, ${accentColor} 60%, rgba(255,255,255,0.3))`, // Borde más visible
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.02em",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              <span style={{ 
                display: "inline-block", 
                width: "6px", 
                height: "6px", 
                borderRadius: "50%", 
                backgroundColor: accentColor, 
                marginRight: "6px",
                boxShadow: `0 0 6px ${accentColor}`
              }} />
              {party.ideology.split("(")[0].trim()}
            </Badge>
          ) : (
            <div style={{ height: "32px" }} />
          )}
        </div>

        {/* Tags de posturas - Altura fija para simetría */}
        <div
          className="flex flex-wrap justify-center gap-xs"
          style={{ 
            minHeight: "64px",
            maxHeight: "64px",
            alignContent: tags.length > 0 ? "center" : "flex-start",
            overflow: "hidden",
            marginBottom: "var(--spacing-md)",
            padding: "0 var(--spacing-sm)",
            width: "100%",
          }}
        >
          {tags.length > 0 ? (
            tags.slice(0, 3).map((tag) => (
              <span
                key={tag.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(255, 255, 255, 0.08)", // Fondo neutro translúcido
                  color: "#ffffff", // Texto blanco para legibilidad
                  border: `1px solid ${tag.color}`, // Borde lleva el color
                  borderLeftWidth: "3px", // Acento lateral más fuerte
                  padding: "6px 10px",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.75rem",
                  lineHeight: 1.2,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                <span style={{ color: tag.color, display: "flex" }}>{tag.icon}</span> 
                {tag.label}
              </span>
            ))
          ) : (
            <div style={{ height: "64px" }} />
          )}
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div
            className="w-full mt-md pt-md text-left animate-fade-in"
            style={{ 
              borderTop: "1px solid rgba(255,255,255,0.2)",
              marginTop: "var(--spacing-md)",
              paddingTop: "var(--spacing-md)",
            }}
          >
            {/* Values */}
            {party.values && party.values.length > 0 && (
              <div className="mb-md">
                <h4 style={{ 
                  fontSize: "0.875rem", 
                  marginBottom: "var(--spacing-sm)",
                  color: "white",
                  fontWeight: 600,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  paddingBottom: "4px"
                }}>
                  Valores clave
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    fontSize: "0.875rem",
                  }}
                >
                  {party.values.slice(0, 3).map((value) => (
                    <li
                      key={value}
                      style={{
                        padding: "var(--spacing-xs) 0",
                        paddingLeft: "var(--spacing-md)",
                        position: "relative",
                        color: "rgba(255,255,255,0.9)", // Mejor contraste
                        lineHeight: 1.5
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          color: accentColor,
                          fontWeight: "bold",
                          textShadow: `0 0 10px ${accentColor}` // Resplandor para visibilidad en fondo oscuro
                        }}
                      >
                        •
                      </span>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Vice presidents */}
            {(candidate?.first_vice_president || candidate?.second_vice_president) && (
              <div className="mb-md">
                <h4 style={{ 
                  fontSize: "0.875rem", 
                  marginBottom: "var(--spacing-sm)",
                  color: "white",
                }}>
                  Fórmula presidencial
                </h4>
                <p style={{ 
                  fontSize: "0.875rem", 
                  lineHeight: 1.5, 
                  marginBottom: 0,
                  color: "rgba(255,255,255,0.8)",
                }}>
                  {candidate.first_vice_president && (
                    <>1er Vice: {candidate.first_vice_president}<br /></>
                  )}
                  {candidate.second_vice_president && (
                    <>2do Vice: {candidate.second_vice_president}</>
                  )}
                </p>
              </div>
            )}

            {/* Plan de gobierno */}
            {party.plan_url && (
              <div className="mb-md">
                <h4 style={{ 
                  fontSize: "0.875rem", 
                  marginBottom: "var(--spacing-sm)",
                  color: "white",
                }}>
                  Plan de gobierno
                </h4>
                <a
                  href={party.plan_url}
                  download
                  className="btn btn-sm"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    background: accentColor,
                    color: "white",
                    border: "none",
                  }}
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DownloadIcon sx={{ fontSize: "1rem" }} /> Descargar PDF
                </a>
              </div>
            )}

            {/* Links */}
            {party.official_links && Object.keys(party.official_links).length > 0 && (
              <div className="flex flex-wrap gap-sm mt-md">
                {Object.entries(party.official_links).map(([label, url]) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-ghost"
                    onClick={(e) => e.stopPropagation()}
                    style={{ 
                      textTransform: "capitalize",
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Expand indicator - Siempre al fondo */}
        <div
          style={{ 
            marginTop: "auto",
            paddingTop: "var(--spacing-md)",
            fontSize: "0.8rem",
            color: accentColor,
            fontWeight: 600,
            borderTop: isExpanded ? "none" : "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.25rem",
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ 
            fontSize: "0.7rem",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            display: "inline-block",
          }}>
            ▼
          </span>
          {isExpanded ? "Cerrar" : "Ver más"}
        </div>
      </div>
    </article>
  );
}
