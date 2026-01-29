"use client";

import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import {
  Palette,
  FileText,
  Mic,
  Flag,
  Vote,
  RotateCcw,
  CheckCircle2
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { generateEventSchema } from "@/lib/seo.config";

interface TimelineEvent {
  date: string;
  isoDate: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  isPast: boolean;
  isCurrent: boolean;
}

const timelineEvents: TimelineEvent[] = [
  { date: "1 Oct 2025", isoDate: "2025-10-01", title: "Inicio de campaña", description: "Los partidos políticos inician oficialmente sus campañas electorales.", Icon: Palette, isPast: true, isCurrent: false },
  { date: "15 Dic 2025", isoDate: "2025-12-15", title: "Cierre de inscripciones", description: "Fecha límite para inscribir candidaturas ante el TSE.", Icon: FileText, isPast: true, isCurrent: false },
  { date: "4 Ene 2026", isoDate: "2026-01-04", title: "Período de debates", description: "Debates oficiales entre candidatos organizados por medios de comunicación.", Icon: Mic, isPast: false, isCurrent: true },
  { date: "29 Ene 2026", isoDate: "2026-01-29", title: "Cierre de campaña", description: "Último día permitido para actividades de campaña electoral.", Icon: Flag, isPast: false, isCurrent: false },
  { date: "1 Feb 2026", isoDate: "2026-02-01", title: "Día de elección", description: "Elecciones presidenciales y legislativas. ¡Tu voto cuenta!", Icon: Vote, isPast: false, isCurrent: false },
  { date: "6 Abr 2026", isoDate: "2026-04-06", title: "Segunda ronda", description: "Balotaje en caso de que ningún candidato obtenga el 40% de los votos.", Icon: RotateCcw, isPast: false, isCurrent: false },
];

export function TimelineSection() {
  // Generar datos estructurados para todos los eventos del cronograma
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // Elimina scripts previos para evitar duplicados
      document.querySelectorAll('script[data-timeline-event]').forEach(el => el.remove());
      timelineEvents.forEach(event => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute('data-timeline-event', 'true');
        script.innerHTML = JSON.stringify(
          generateEventSchema({
            name: event.title,
            description: event.description,
            startDate: new Date(event.isoDate).toISOString(),
            location: "Costa Rica"
          })
        );
        document.head.appendChild(script);
      });
    }
  }, []);

  return (
    <section id="timeline" className="relative bg-gradient-to-b from-slate-900/95 via-[#0b2b6b]/80 to-slate-900/95 py-24 sm:py-32 lg:py-40 overflow-hidden content-visibility-auto">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(206,17,38,0.2),transparent_50%),radial-gradient(circle_at_25%_40%,rgba(0,47,108,0.2),transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-slate-900/30 to-slate-900" />
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-20 text-center">
          <Badge variant="primary" className="mb-6 bg-white/10 px-5 py-2 text-sm font-bold text-white ring-1 ring-white/20">
            Ruta Electoral 2026
          </Badge>
          <h2 className="text-balance font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Cronograma del Proceso
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-white/70 lg:text-2xl">
            Sigue paso a paso los hitos que marcarán el futuro del país. 
            Información actualizada según el calendario oficial.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mx-auto max-w-5xl">
          {/* Central Line (Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-blue-500 via-red-500 to-slate-700 opacity-30 md:block" />
          
          {/* Left Line (Mobile) */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-red-500 to-slate-700 opacity-30 md:hidden" />

          {/* Events */}
          <div className="flex flex-col gap-12 md:gap-16">
            {timelineEvents.map((event, index) => (
              <TimelineItem key={event.date} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const isLeft = index % 2 === 0;
  const [isVisible, setIsVisible] = React.useState(false);
  const itemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });

    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`relative flex flex-col md:flex-row items-start md:items-center transition-all duration-700 ease-out 
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}
        ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Content Card */}
      <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
        <div className={`group relative rounded-2xl p-6 transition-all duration-300 border
          bg-white/5 text-white border-white/10 hover:bg-white/10
          ${event.isPast ? "opacity-70" : ""}
          ${event.isCurrent ? "ring-1 ring-red-500/40 shadow-[0_20px_40px_-20px_rgba(206,17,38,0.45)]" : ""}`}
        >
          {event.isCurrent && (
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(206,17,38,0.18),transparent_55%)]" />
          )}
          {/* Status Indicator (Mobile Only Small Dot) */}
          <div className={`absolute top-1/2 -left-[37px] h-3 w-3 rounded-full md:hidden border-2 border-slate-900
            ${event.isCurrent ? "bg-red-500 animate-pulse" : event.isPast ? "bg-blue-500" : "bg-slate-600"}`} 
          />

          <span className={`text-xs font-black uppercase tracking-widest mb-2 inline-flex items-center gap-2
            ${event.isCurrent ? "text-red-400" : "text-blue-400"}`}>
            {event.date}
            {event.isCurrent && (
              <span className="rounded-full border border-red-400/40 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-red-200">
                En curso
              </span>
            )}
          </span>
          <h4 className="text-xl font-bold mb-2 flex items-center gap-2 group-hover:translate-x-1 transition-transform md:group-hover:translate-x-0">
            {event.title}
            {event.isPast && <CheckCircle2 className="h-4 w-4 text-blue-500" />}
          </h4>
          <p className={`text-sm leading-relaxed ${event.isCurrent ? "text-slate-600" : "text-white/60"}`}>
            {event.description}
          </p>

          {event.isCurrent && (
            <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-red-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              En Progreso
            </div>
          )}
        </div>
      </div>

      {/* Central Icon */}
      <div className={`absolute left-0 md:left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-4 border-slate-900 z-10 transition-transform duration-500 group-hover:scale-110
        ${event.isCurrent 
          ? "bg-red-600 text-white ring-4 ring-red-500/30 scale-125" 
          : event.isPast 
          ? "bg-blue-600 text-white" 
          : "bg-slate-800 text-slate-400"}`}
      >
        <event.Icon className={event.isCurrent ? "h-4 w-4 animate-pulse" : "h-4 w-4"} />
      </div>

      {/* Spacer for Desktop */}
      <div className="hidden md:block md:w-[45%]" />
    </div>
  );
}