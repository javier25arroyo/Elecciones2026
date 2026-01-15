"use client";

import * as React from "react";
import Image from "next/image";
import type { Party } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { 
  Users, 
  Circle, 
  Leaf, 
  Briefcase, 
  GraduationCap, 
  Shield, 
  Heart as HealthIcon, 
  Zap, 
  Download 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const filterOptions = [
  { value: "all", label: "Todos", icon: <Users className="h-4 w-4" /> },
  { value: "izquierda", label: "Izquierda", icon: <Circle className="h-4 w-4 text-secondary" /> },
  { value: "centro", label: "Centro", icon: <Circle className="h-4 w-4 text-yellow-500" /> },
  { value: "derecha", label: "Derecha", icon: <Circle className="h-4 w-4 text-primary-light" /> },
];

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
      return matchesSearch && ideology.includes(filter);
    });
  }, [parties, filter, searchTerm]);

  return (
    <section id="candidatos" className="bg-gradient-to-b from-slate-900 to-slate-800 py-24 sm:py-32 lg:py-40">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-20 text-center">
          <Badge variant="primary" className="mb-6 bg-white/10 px-5 py-2 text-sm font-bold text-white ring-1 ring-white/20">
            14+ Candidaturas Confirmadas
          </Badge>
          <h2 className="text-balance font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Conocé a los candidatos 2026
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-white/80 lg:text-2xl">
            Explorá los perfiles de cada candidato, sus propuestas y valores fundamentales.{" "}
            <br className="hidden md:block" />
            Información verificada para un voto consciente.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-16 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md lg:flex-row lg:items-center lg:justify-between lg:p-8">
          <div className="flex-grow">
            <input
              type="search"
              placeholder="Buscar candidato o partido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              aria-label="Buscar candidatos"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`inline-flex items-center gap-1.5 rounded-full py-2 px-4 text-sm font-medium transition-all duration-200
                  ${filter === option.value
                    ? "bg-primary text-white shadow-md"
                    : "border border-white/20 bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                aria-pressed={filter === option.value}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,_340px),1fr))] items-stretch gap-6 lg:gap-8">
          {filteredParties.map((party, index) => (
            <CandidateCard key={party.name} party={party} index={index} />
          ))}
        </div>

        {filteredParties.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-white/70">No se encontraron candidatos con ese criterio.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ... CandidateCard sub-component remains in the same file
interface CandidateCardProps {
  party: Party;
  index: number;
}

function CandidateCard({ party, index }: CandidateCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const ref = useScrollReveal<HTMLElement>();
  const candidate = party.presidential_candidate;
  const logoUrl = party.logo_urls?.[0] || party.logo_url;

  const getInitials = (name: string) => {
    const parts = name.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? "?";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
    return (first + last).toUpperCase();
  };

  const candidateName = candidate?.name || "Por definir";
  const accentColor = party.accent_color || "#0056B3"; // fallback a un azul

  const getTags = () => {
    const tags: { icon: React.ReactNode; label: string; color: string }[] = [];
    const values = (party.values || []).join(" ").toLowerCase();
    const ideology = (party.ideology || "").toLowerCase();

    if (values.includes("ambiente") || values.includes("ecolog") || values.includes("sostenib"))
      tags.push({ icon: <Leaf className="h-4 w-4" />, label: "Ambiente", color: "text-green-400" });
    if (values.includes("empleo") || values.includes("trabajo") || values.includes("económic"))
      tags.push({ icon: <Briefcase className="h-4 w-4" />, label: "Empleo", color: "text-sky-400" });
    if (values.includes("educación") || values.includes("educacion"))
      tags.push({ icon: <GraduationCap className="h-4 w-4" />, label: "Educación", color: "text-blue-400" });
    if (values.includes("seguridad") || values.includes("justicia"))
      tags.push({ icon: <Shield className="h-4 w-4" />, label: "Seguridad", color: "text-red-400" });
    if (values.includes("salud") || values.includes("bienestar"))
      tags.push({ icon: <HealthIcon className="h-4 w-4" />, label: "Salud", color: "text-rose-400" });
    if (ideology.includes("liberal") || values.includes("libertad"))
      tags.push({ icon: <Zap className="h-4 w-4" />, label: "Libertad", color: "text-yellow-400" });

    return tags.slice(0, 3);
  };

  const tags = getTags();

  return (
    <article
      ref={ref}
      className={`scroll-reveal scroll-reveal-delay-${Math.min(index % 6 + 1, 5)} relative flex flex-col rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl`}
      style={{ '--accent-color': accentColor } as React.CSSProperties}
      onClick={() => setIsExpanded(!isExpanded)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setIsExpanded(!isExpanded)}
      aria-expanded={isExpanded}
    >
      {/* Color Accent Border */}
      <div className="h-1.5 w-full rounded-t-2xl bg-[var(--accent-color)]" />
      
      <div className="flex h-full flex-1 flex-col items-center p-6 text-center">
        {/* Logo / Photo */}
        <div
          className="relative mb-4 h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-[var(--accent-color)] bg-gradient-to-br from-white/10 to-white/5 shadow-xl transition-all duration-300"
          style={{ boxShadow: `0 8px 24px -10px var(--accent-color)` }}
        >
          {candidate?.photo_url ? (
            <Image src={candidate.photo_url} alt={`Foto de ${candidateName}`} fill className="object-cover" sizes="100px" loading="lazy" />
          ) : logoUrl ? (
            <Image src={logoUrl} alt={`Logo de ${party.name}`} fill className="object-contain p-2" sizes="100px" loading="lazy" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-[var(--accent-color)]">
              {getInitials(candidateName)}
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="flex min-h-[3.5rem] items-center justify-center text-xl font-bold leading-tight tracking-tight text-white lg:text-2xl">
          {candidateName}
        </h3>

        {/* Party */}
        <p className="mb-4 flex min-h-[3rem] items-center justify-center px-2 text-sm font-semibold text-white/90">
          {party.name}
        </p>

        {/* Ideology badge */}
        <div className="mb-5 flex h-8 items-center justify-center">
          {party.ideology ? (
            <Badge
              variant="neutral"
              className="border-white/20 bg-black/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white ring-1 ring-white/10"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-color)]" />
              {party.ideology.split("(")[0].trim()}
            </Badge>
          ) : null}
        </div>

        {/* Tags */}
        <div className="mb-4 flex h-16 flex-wrap items-center justify-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className={`inline-flex items-center gap-1.5 rounded-md bg-white/5 py-1 px-2.5 text-xs font-semibold leading-tight text-white/90 shadow-sm border ${tag.color.replace('text-', 'border-')}/50`}
            >
              <span className={tag.color}>{tag.icon}</span>
              {tag.label}
            </span>
          ))}
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full self-stretch overflow-hidden"
            >
              <div className="border-t border-white/20 pt-4 text-left">
                {party.values && party.values.length > 0 && (
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold text-white">Valores clave</h4>
                    <ul className="space-y-1 text-sm text-white/90">
                      {party.values.slice(0, 3).map((value) => (
                        <li key={value} className="relative pl-4">
                          <span className="absolute left-0 top-[5px] h-1.5 w-1.5 rounded-full bg-[var(--accent-color)]" />
                          {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {(candidate?.first_vice_president || candidate?.second_vice_president) && (
                  <div className="mb-4">
                    <h4 className="mb-1 text-sm font-semibold text-white">Fórmula presidencial</h4>
                    <p className="text-sm leading-snug text-white/80">
                      {candidate.first_vice_president && `1er Vice: ${candidate.first_vice_president}`}
                      <br />
                      {candidate.second_vice_president && `2do Vice: ${candidate.second_vice_president}`}
                    </p>
                  </div>
                )}
                {party.plan_url && (
                  <div className="mb-6">
                    <h4 className="mb-2 text-sm font-semibold text-white">Plan de gobierno</h4>
                    <a
                      href={party.plan_url}
                      download
                      className="inline-flex items-center gap-1.5 rounded-md py-1.5 px-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
                      style={{ backgroundColor: accentColor }}
                      rel="noopener noreferrer"
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="h-4 w-4" /> Descargar PDF
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand indicator */}
        <div className="mt-auto flex w-full items-center justify-center gap-1 border-t border-white/20 pt-4 text-sm font-semibold text-[var(--accent-color)]">
          <span className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>▼</span>
          {isExpanded ? "Cerrar" : "Ver más"}
        </div>
      </div>
    </article>
  );
}
