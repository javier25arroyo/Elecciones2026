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
    <section id="candidatos" className="relative bg-gradient-to-b from-slate-900 via-[#0b2b6b] to-slate-900 py-24 sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,47,108,0.25),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(206,17,38,0.25),transparent_45%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-slate-900/30 to-slate-900" />
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
  const accentColor = party.accent_color || "#0056B3";

  const getTags = () => {
    const tags: { icon: React.ReactNode; label: string; color: string }[] = [];
    const values = (party.values || []).join(" ").toLowerCase();
    const ideology = (party.ideology || "").toLowerCase();

    if (values.includes("ambiente") || values.includes("ecolog") || values.includes("sostenib"))
      tags.push({ icon: <Leaf className="h-3.5 w-3.5" />, label: "Ambiente", color: "text-green-400" });
    if (values.includes("empleo") || values.includes("trabajo") || values.includes("económic"))
      tags.push({ icon: <Briefcase className="h-3.5 w-3.5" />, label: "Empleo", color: "text-sky-400" });
    if (values.includes("educación") || values.includes("educacion"))
      tags.push({ icon: <GraduationCap className="h-3.5 w-3.5" />, label: "Educación", color: "text-blue-400" });
    if (values.includes("seguridad") || values.includes("justicia"))
      tags.push({ icon: <Shield className="h-3.5 w-3.5" />, label: "Seguridad", color: "text-red-400" });
    if (values.includes("salud") || values.includes("bienestar"))
      tags.push({ icon: <HealthIcon className="h-3.5 w-3.5" />, label: "Salud", color: "text-rose-400" });
    if (ideology.includes("liberal") || values.includes("libertad"))
      tags.push({ icon: <Zap className="h-3.5 w-3.5" />, label: "Libertad", color: "text-yellow-400" });

    return tags.slice(0, 3);
  };

  const tags = getTags();

  return (
    <motion.article
      ref={ref}
      className={`scroll-reveal scroll-reveal-delay-${Math.min(index % 6 + 1, 5)} group relative flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-xl backdrop-blur-xl will-change-transform content-visibility-auto`}
      style={{ '--accent-color': accentColor, containIntrinsicSize: '1px 600px' } as React.CSSProperties}
      whileHover={{
        y: -16,
        scale: 1.04,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderColor: "rgba(255, 255, 255, 0.4)",
        boxShadow: "0 50px 120px -20px rgba(0, 0, 0, 0.9), 0 0 40px -8px var(--accent-color)"
      }}
      transition={{
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }}
      onClick={() => setIsExpanded(!isExpanded)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setIsExpanded(!isExpanded)}
      aria-expanded={isExpanded}
    >
      {/* Glow Effect on Hover */}
      <motion.div 
        className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_-10%,var(--accent-color),transparent_70%)]"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      ></motion.div>
      
      <div className="flex h-full min-h-[520px] flex-1 flex-col items-center px-7 py-8 text-center">
        {/* Top Accent Line */}
        <motion.div 
          className="mb-4 h-1 w-24 shrink-0 rounded-full bg-[var(--accent-color)] shadow-[0_0_12px_var(--accent-color)]"
          initial={{ width: 96, opacity: 0.5 }}
          whileHover={{ width: 128, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        ></motion.div>
        <div className="relative mb-6 shrink-0">
          <motion.div 
            className="absolute -inset-2 rounded-full bg-[var(--accent-color)] blur-lg"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          ></motion.div>
          <motion.div
            className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-slate-900 shadow-2xl"
            whileHover={{ 
              scale: 1.15,
              borderColor: "var(--accent-color)",
              boxShadow: "0 0 50px -8px var(--accent-color)"
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {candidate?.photo_url ? (
              <Image src={candidate.photo_url} alt={`Foto de ${candidateName}`} fill className="object-cover" sizes="112px" loading="lazy" />
            ) : logoUrl ? (
              <Image src={logoUrl} alt={`Logo de ${party.name}`} fill className="object-contain p-4" sizes="112px" loading="lazy" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-black text-[var(--accent-color)]">
                {getInitials(candidateName)}
              </div>
            )}
          </motion.div>
        </div>

        {/* Name & Party */}
        <div className="mb-4 shrink-0 space-y-2">
          <h3 className="line-clamp-2 min-h-[2.4rem] text-2xl font-black leading-[1.2] tracking-tight text-white lg:text-3xl">
            {candidateName}
          </h3>
          <p className="line-clamp-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-color)] opacity-90">
            {party.name}
          </p>
        </div>

        {/* Ideology Badge */}
        <div className="mb-6 flex h-[30px] shrink-0 items-center justify-center">
          {party.ideology ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-color)]" />
              {party.ideology.split("(")[0].trim()}
            </div>
          ) : <div className="h-[30px]" />}
        </div>

        {/* Tags Pills */}
        <div className="mb-8 flex min-h-[32px] shrink-0 flex-wrap items-center justify-center gap-2">
          {tags.map((tag, tagIndex) => (
            <motion.span
              key={tag.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 py-1.5 px-3 text-[10px] font-bold text-white/90 ring-1 ring-white/10"
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                scale: 1.05
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <span className={tag.color}>{tag.icon}</span>
              {tag.label}
            </motion.span>
          ))}
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="w-full overflow-hidden"
            >
              <div className="mb-6 flex min-h-[280px] flex-col justify-between space-y-6 border-t border-white/10 pt-6 text-left">
                {/* Content Section */}
                <div className="flex-1 space-y-6">
                  {party.values && party.values.length > 0 && (
                    <div>
                      <h4 className="mb-3 text-[10px] font-black uppercase tracking-widest text-white/50">Valores Clave</h4>
                      <ul className="grid grid-cols-1 gap-2 text-xs font-medium text-white/90">
                        {party.values.slice(0, 3).map((value) => (
                          <li key={value} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-[var(--accent-color)]" />
                            {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {(candidate?.first_vice_president || candidate?.second_vice_president) && (
                    <div>
                      <h4 className="mb-2 text-[10px] font-black uppercase tracking-widest text-white/50">Fórmula Presidencial</h4>
                      <div className="space-y-1 text-xs text-white/90">
                        {candidate.first_vice_president && (
                          <p><span className="font-bold text-white/60">1er:</span> {candidate.first_vice_president}</p>
                        )}
                        {candidate.second_vice_president && (
                          <p><span className="font-bold text-white/60">2do:</span> {candidate.second_vice_president}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Button Section - Always at bottom */}
                {party.plan_url && (
                  <div className="pt-2">
                    <motion.a
                      href={party.plan_url}
                      download={`${party.name.replace(/\s+/g, "_")}_Plan_de_Gobierno.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Descargar Plan de Gobierno (PDF)"
                      className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[var(--accent-color)] py-3 text-xs font-black uppercase tracking-widest text-white shadow-md transition-shadow duration-300"
                      onClick={(e) => e.stopPropagation()}
                      onPointerDown={(e) => e.stopPropagation()}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 8px 24px -4px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                        y: -2
                      }}
                      whileTap={{ scale: 0.98, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut"
                      }}
                    >
                      <motion.span
                        className="pointer-events-none absolute inset-0 bg-white/0 rounded-xl"
                        whileHover={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.1)"
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.span
                        className="relative z-10"
                        whileHover={{ 
                          y: [0, -2, 0],
                        }}
                        transition={{ 
                          duration: 0.6, 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </motion.span>
                      <span className="relative z-10">Plan de Gobierno</span>
                    </motion.a>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Toggle */}
        <div className="mt-auto flex w-full flex-col items-center gap-2 pt-4">
          <motion.div 
            className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          ></motion.div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 transition-all duration-700 ease-out group-hover:text-[var(--accent-color)]">
            <motion.span 
              className="block"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.span>
            {isExpanded ? "Menos info" : "Más detalles"}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
