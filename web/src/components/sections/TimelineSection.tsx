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
    <section id="timeline" className="bg-gradient-app py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge variant="accent" className="mb-4 bg-white/15 text-white">
            Fechas importantes
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Cronograma Electoral 2026</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
            Conocé las fechas clave del proceso electoral costarricense. Marcá tu calendario y no te perdás ningún evento importante.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical Lines */}
          <div className="absolute top-0 bottom-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-white/30 md:block" />
          <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-white/30 md:hidden" />

          {/* Events */}
          <div className="flex flex-col gap-12">
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
    z-10 grid shrink-0 place-items-center rounded-full text-white shadow-md transition-all duration-300
    ${event.isCurrent
      ? "bg-gradient-cta shadow-lg shadow-secondary/30 border-0"
      : event.isPast
      ? "bg-secondary border-2 border-secondary-dark"
      : "bg-white/15 border-2 border-white/30"
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
    rounded-xl p-6 backdrop-blur-md
    ${event.isCurrent
      ? "bg-gradient-cta text-white shadow-2xl shadow-secondary/20"
      : "border border-white/20 bg-white/10"
    }
  `;
  return (
    <div className={cardClasses}>
      <p className={`text-xs font-semibold uppercase tracking-wider ${event.isCurrent ? "text-white/80" : "text-white/70"}`}>
        {event.date}
      </p>
      <h4 className="my-1 text-lg font-bold text-white">{event.title}</h4>
      <p className={`text-sm ${event.isCurrent ? "text-white/90" : "text-white/80"}`}>
        {event.description}
      </p>
      {event.isCurrent && (
        <Badge variant="neutral" className="mt-4 inline-flex items-center gap-1.5 bg-white/20 text-white">
          <MapPin className="h-4 w-4" />
          Estamos aquí
        </Badge>
      )}
    </div>
  );
}
