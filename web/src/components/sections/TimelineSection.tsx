"use client";

import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import {
  PaletteOutlined as PaletteIcon,
  DescriptionOutlined as DocIcon,
  MicOutlined as MicIcon,
  FlagOutlined as FlagIcon,
  HowToVoteOutlined as VoteIcon,
  RestartAltOutlined as RestartIcon,
  LocationOnOutlined as LocationIcon,
} from "@mui/icons-material";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isPast: boolean;
  isCurrent: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "1 Oct 2025",
    title: "Inicio de campaña",
    description: "Los partidos políticos inician oficialmente sus campañas electorales.",
    icon: <PaletteIcon sx={{ fontSize: "1.25rem" }} />,
    isPast: true,
    isCurrent: false,
  },
  {
    date: "15 Dic 2025",
    title: "Cierre de inscripciones",
    description: "Fecha límite para inscribir candidaturas ante el TSE.",
    icon: <DocIcon sx={{ fontSize: "1.25rem" }} />,
    isPast: true,
    isCurrent: false,
  },
  {
    date: "4 Ene 2026",
    title: "Período de debates",
    description: "Debates oficiales entre candidatos organizados por medios de comunicación.",
    icon: <MicIcon sx={{ fontSize: "1.25rem" }} />,
    isPast: false,
    isCurrent: true,
  },
  {
    date: "29 Ene 2026",
    title: "Cierre de campaña",
    description: "Último día permitido para actividades de campaña electoral.",
    icon: <FlagIcon sx={{ fontSize: "1.25rem" }} />,
    isPast: false,
    isCurrent: false,
  },
  {
    date: "1 Feb 2026",
    title: "Día de elección",
    description: "Elecciones presidenciales y legislativas. ¡Tu voto cuenta!",
    icon: <VoteIcon sx={{ fontSize: "1.25rem" }} />,
    isPast: false,
    isCurrent: false,
  },
  {
    date: "6 Abr 2026",
    title: "Segunda ronda",
    description: "Balotaje en caso de que ningún candidato obtenga el 40% de los votos.",
    icon: <RestartIcon sx={{ fontSize: "1.25rem" }} />,
    isPast: false,
    isCurrent: false,
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="py-3xl">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-2xl">
          <Badge variant="accent" className="mb-md">
            Fechas importantes
          </Badge>
          <h2>Cronograma Electoral 2026</h2>
          <p className="text-secondary" style={{ maxWidth: 600, margin: "0 auto" }}>
            Conocé las fechas clave del proceso electoral costarricense.
            Marcá tu calendario y no te perdás ningún evento importante.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative" style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Vertical line */}
          <div
            className="absolute hide-mobile"
            style={{
              left: "50%",
              top: 0,
              bottom: 0,
              width: 2,
              background: "var(--color-border)",
              transform: "translateX(-50%)",
            }}
          />

          {/* Mobile line */}
          <div
            className="absolute hide-desktop"
            style={{
              left: 20,
              top: 0,
              bottom: 0,
              width: 2,
              background: "var(--color-border)",
            }}
          />

          {/* Events */}
          <div className="flex flex-col gap-xl">
            {timelineEvents.map((event, index) => (
              <TimelineItem
                key={event.date}
                event={event}
                index={index}
                isLeft={index % 2 === 0}
              />
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
  isLeft: boolean;
}

function TimelineItem({ event, index, isLeft }: TimelineItemProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const itemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`relative flex ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.5s ease ${index * 0.1}s`,
      }}
    >
      {/* Content - Desktop */}
      <div
        className={`hide-mobile flex-1 ${isLeft ? "pr-xl text-right" : "pl-xl text-left"}`}
      >
        <TimelineCard event={event} />
      </div>

      {/* Center dot - Desktop */}
      <div
        className="hide-mobile absolute flex items-center justify-center"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: event.isCurrent
            ? "var(--gradient-cta)"
            : event.isPast
            ? "var(--color-secondary)"
            : "var(--color-background)",
          border: `3px solid ${
            event.isCurrent
              ? "transparent"
              : event.isPast
              ? "var(--color-secondary)"
              : "var(--color-border)"
          }`,
          zIndex: 1,
          fontSize: "1.25rem",
        }}
      >
        {event.icon}
      </div>

      {/* Empty space - Desktop */}
      <div className="hide-mobile flex-1" />

      {/* Content - Mobile */}
      <div className="hide-desktop pl-xl w-full">
        {/* Mobile dot */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: 8,
            top: 8,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: event.isCurrent
              ? "var(--gradient-cta)"
              : event.isPast
              ? "var(--color-secondary)"
              : "var(--color-background)",
            border: `2px solid ${
              event.isCurrent
                ? "transparent"
                : event.isPast
                ? "var(--color-secondary)"
                : "var(--color-border)"
            }`,
            zIndex: 1,
            fontSize: "0.75rem",
          }}
        >
          {event.icon}
        </div>
        <TimelineCard event={event} />
      </div>
    </div>
  );
}

function TimelineCard({ event }: { event: TimelineEvent }) {
  return (
    <div
      className="card"
      style={{
        background: event.isCurrent
          ? "var(--gradient-cta)"
          : "var(--color-background)",
        color: event.isCurrent ? "white" : undefined,
        border: event.isCurrent ? "none" : undefined,
        boxShadow: event.isCurrent ? "var(--shadow-lg)" : undefined,
      }}
    >
      <p
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: event.isCurrent ? "rgba(255,255,255,0.8)" : "var(--color-text-secondary)",
          marginBottom: "var(--spacing-xs)",
        }}
      >
        {event.date}
      </p>
      <h4
        style={{
          marginBottom: "var(--spacing-sm)",
          color: event.isCurrent ? "white" : undefined,
        }}
      >
        {event.title}
      </h4>
      <p
        style={{
          fontSize: "0.875rem",
          color: event.isCurrent ? "rgba(255,255,255,0.9)" : "var(--color-text-secondary)",
          margin: 0,
        }}
      >
        {event.description}
      </p>
      {event.isCurrent && (
        <Badge
          variant="neutral"
          className="mt-md"
          style={{
            background: "rgba(255,255,255,0.2)",
            color: "white",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <LocationIcon sx={{ fontSize: "1rem" }} />
          Estamos aquí
        </Badge>
      )}
    </div>
  );
}
