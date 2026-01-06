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
      className="py-3xl"
      style={{ background: "var(--color-background-secondary)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-2xl">
          <Badge variant="primary" className="mb-md">
            14+ Candidaturas
          </Badge>
          <h2>Conocé a los candidatos 2026</h2>
          <p className="text-secondary" style={{ maxWidth: 600, margin: "0 auto" }}>
            Explorá los perfiles de cada candidato, sus propuestas y valores.
            Tocá una tarjeta para ver más detalles.
          </p>
        </div>

        {/* Filters - Mobile friendly */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-between gap-md mb-xl"
          style={{
            background: "var(--color-background)",
            padding: "var(--spacing-md)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {/* Search */}
          <div className="w-full sm:w-auto">
            <input
              type="search"
              placeholder="Buscar candidato o partido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
              style={{ 
                minWidth: 280,
                borderRadius: "var(--radius-full)",
                paddingLeft: "var(--spacing-lg)",
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
                    : "var(--color-background-secondary)",
                  color: filter === option.value 
                    ? "white" 
                    : "var(--color-text-secondary)",
                  borderRadius: "var(--radius-full)",
                  padding: "8px 16px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  border: filter === option.value ? "none" : "1px solid var(--color-border)",
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

        {/* Cards Grid */}
        <div
          className="grid gap-lg"
          style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
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
            <p className="text-secondary">
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
      className={`card card-solid h-full scroll-reveal scroll-reveal-delay-${Math.min(index % 6 + 1, 5)}`}
      style={{
        borderTop: `4px solid ${party.accent_color || "var(--color-primary)"}`,
        cursor: "pointer",
        minHeight: 360,
      }}
      onClick={() => setIsExpanded(!isExpanded)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setIsExpanded(!isExpanded)}
      aria-expanded={isExpanded}
    >
      <div className="flex flex-col items-center text-center h-full">
        {/* Logo / Photo */}
        <div
          className="relative"
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            overflow: "hidden",
            background: "var(--color-background-secondary)",
            border: `3px solid ${party.accent_color || "var(--color-border)"}`,
            boxShadow: `0 4px 12px ${party.accent_color || "var(--color-primary)"}20`,
          }}
        >
          {candidate?.photo_url ? (
            <Image
              src={candidate.photo_url}
              alt={`Foto de ${candidateName}`}
              fill
              className="object-cover"
              sizes="100px"
            />
          ) : logoUrl ? (
            <Image
              src={logoUrl}
              alt={`Logo de ${party.name}`}
              fill
              className="object-contain p-2"
              sizes="100px"
            />
          ) : (
            <div
              className="flex items-center justify-center w-full h-full"
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--color-text-secondary)",
              }}
            >
              {getInitials(candidateName)}
            </div>
          )}
        </div>

        {/* Name */}
        <h3
          className="mt-md mb-xs line-clamp-2"
          style={{
            lineHeight: 1.25,
            minHeight: "2.6rem",
            marginBottom: "var(--spacing-xs)",
          }}
        >
          {candidateName}
        </h3>

        {/* Party */}
        <p
          className="text-secondary line-clamp-1"
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.35,
            minHeight: "1.25rem",
            marginBottom: "var(--spacing-sm)",
          }}
        >
          {party.name}
        </p>

        {/* Ideology badge */}
        {party.ideology ? (
          <Badge variant="neutral" className="mb-sm">
            {party.ideology.split("(")[0].trim()}
          </Badge>
        ) : (
          <div aria-hidden className="mb-sm" style={{ height: 24 }} />
        )}

        {/* Tags de posturas - Snackable content */}
        <div
          className="flex flex-wrap justify-center gap-xs mb-md"
          style={{ minHeight: 26 }}
        >
          {tags.map((tag) => (
            <span
              key={tag.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                background: `color-mix(in srgb, ${tag.color} 12%, transparent)`,
                color: tag.color,
                border: `1px solid color-mix(in srgb, ${tag.color} 22%, transparent)`,
                padding: "4px 10px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.75rem",
                lineHeight: 1,
                fontWeight: 600,
              }}
            >
              {tag.icon} {tag.label}
            </span>
          ))}
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div
            className="w-full mt-md pt-md text-left animate-fade-in"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            {/* Values */}
            {party.values && party.values.length > 0 && (
              <div className="mb-md">
                <h4 style={{ fontSize: "0.875rem", marginBottom: "var(--spacing-sm)" }}>
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
                      className="text-secondary"
                      style={{
                        padding: "var(--spacing-xs) 0",
                        paddingLeft: "var(--spacing-md)",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: party.accent_color || "var(--color-primary)",
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
                <h4 style={{ fontSize: "0.875rem", marginBottom: "var(--spacing-sm)" }}>
                  Fórmula presidencial
                </h4>
                <p className="text-secondary" style={{ fontSize: "0.875rem", lineHeight: 1.5, marginBottom: 0 }}>
                  {candidate.first_vice_president && (
                    <>1er Vice: {candidate.first_vice_president}<br /></>
                  )}
                  {candidate.second_vice_president && (
                    <>2do Vice: {candidate.second_vice_president}</>
                  )}
                </p>
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
                    style={{ textTransform: "capitalize" }}
                  >
                    {label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Expand indicator */}
        <div
          className="mt-auto pt-md"
          style={{ 
            fontSize: "0.75rem",
            color: party.accent_color || "var(--color-primary)",
            fontWeight: 500,
            borderTop: isExpanded ? "none" : "1px solid var(--color-border)",
          }}
        >
          {isExpanded ? "▲ Cerrar" : "▼ Ver más"}
        </div>
      </div>
    </article>
  );
}
