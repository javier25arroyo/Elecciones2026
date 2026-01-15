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
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  isPast: boolean;
  isCurrent: boolean;
}

const timelineEvents: TimelineEvent[] = [
  { date: "1 Oct 2025", title: "Inicio de campaña", description: "Los partidos políticos inician oficialmente sus campañas electorales.", Icon: Palette, isPast: true, isCurrent: false },
  { date: "15 Dic 2025", title: "Cierre de inscripciones", description: "Fecha límite para inscribir candidaturas ante el TSE.", Icon: FileText, isPast: true, isCurrent: false },
  { date: "4 Ene 2026", title: "Período de debates", description: "Debates oficiales entre candidatos organizados por medios de comunicación.", Icon: Mic, isPast: false, isCurrent: true },
  { date: "29 Ene 2026", title: "Cierre de campaña", description: "Último día permitido para actividades de campaña electoral.", Icon: Flag, isPast: false, isCurrent: false },
  { date: "1 Feb 2026", title: "Día de elección", description: "Elecciones presidenciales y legislativas. ¡Tu voto cuenta!", Icon: Vote, isPast: false, isCurrent: false },
  { date: "6 Abr 2026", title: "Segunda ronda", description: "Balotaje en caso de que ningún candidato obtenga el 40% de los votos.", Icon: RotateCcw, isPast: false, isCurrent: false },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="bg-gradient-app py-24 sm:py-32 lg:py-40">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-20 text-center">
          <Badge variant="accent" className="mb-6 bg-white/15 px-5 py-2 text-sm font-bold text-white backdrop-blur-md">
            Fechas clave 2025 - 2026
          </Badge>
          <h2 className="text-balance font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Cronograma Electoral 2026
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-white/90 lg:text-2xl">
            Mantenete informado sobre los hitos más importantes del proceso. 
            Cada fecha es un paso fundamental hacia nuestra democracia.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl py-12">
          {/* Vertical Lines */}
          <div className="absolute top-0 bottom-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-white/20 md:block" />
          <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-white/20 md:hidden" />

          {/* Events */}
          <div className="flex flex-col gap-24 lg:gap-32">
            {timelineEvents.map((event, index) => (
              <TimelineItem key={event.date} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
}

function TimelineItem({ event, index }: TimelineItemProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const itemRef = React.useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });

    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  const dotClasses = `
    z-10 grid shrink-0 place-items-center rounded-full shadow-xl transition-all duration-500 ring-4
    ${event.isCurrent
      ? "bg-white text-secondary ring-secondary animate-pulse scale-110"
      : event.isPast
      ? "bg-secondary text-white ring-secondary/20 grayscale-[0.5]"
      : "bg-slate-700 text-white ring-white/10"
    }
  `;

  return (
    <div
      ref={itemRef}
      className={`relative transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* --- Desktop Layout --- */}
      <div className={`hidden md:flex ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
        <div className={`flex-1 ${isLeft ? "pr-12 text-right" : "pl-12 text-left"}`}>
          <TimelineCard event={event} />
        </div>
        <div className={`${dotClasses} h-12 w-12`}>
          <event.Icon className="h-6 w-6" />
        </div>
        <div className="flex-1" />
      </div>

      {/* --- Mobile Layout --- */}
      <div className="relative pl-16 md:hidden">
        <div className={`${dotClasses} absolute top-1 left-0 h-10 w-10`}>
          <event.Icon className="h-5 w-5" />
        </div>
        <TimelineCard event={event} />
      </div>
    </div>
  );
}

function TimelineCard({ event }: { event: TimelineEvent }) {
  const cardClasses = `
    relative overflow-hidden rounded-3xl p-8 lg:p-10 transition-all duration-300
    ${event.isCurrent
      ? "bg-white text-slate-900 shadow-[0_30px_60px_rgba(0,0,0,0.4)] scale-105 z-20 border-0"
      : "bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10"
    }
  `;
  return (
    <div className={cardClasses}>
      <p className={`text-xs font-black uppercase tracking-[0.25em] mb-4 ${event.isCurrent ? "text-secondary" : "text-white/60"}`}>
        {event.date}
      </p>
      <h4 className={`text-2xl font-black mb-3 leading-tight ${event.isCurrent ? "text-slate-900" : "text-white"}`}>{event.title}</h4>
      <p className={`text-base lg:text-lg leading-relaxed ${event.isCurrent ? "text-slate-600 font-medium" : "text-white/80"}`}>
        {event.description}
      </p>
      {event.isCurrent && (
        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider">
          <MapPin className="h-4 w-4" />
          Evento Actual
        </div>
      )}
    </div>
  );
}
