"use client";

import * as React from "react";
import { CalendarMonthOutlined as CalendarIcon, HowToVoteOutlined as VoteIcon, GroupsOutlined as GroupsIcon, AccessTimeOutlined as TimeIcon } from "@mui/icons-material";
import { useScrollReveal } from "@/lib/useScrollReveal";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(targetTimeMs: number, nowTimeMs: number): TimeLeft {
  const diffMs = Math.max(0, targetTimeMs - nowTimeMs);

  const secondsTotal = Math.floor(diffMs / 1000);
  const days = Math.floor(secondsTotal / 86400);
  const hours = Math.floor((secondsTotal % 86400) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  return { days, hours, minutes, seconds };
}

function pad2(value: number) {
  return value.toString().padStart(2, "0");
}

export function HeroSection() {
  // 1 de febrero 2026 a las 00:00 en Costa Rica (UTC-06:00) => 06:00Z
  const electionDateMs = React.useMemo(() => Date.UTC(2026, 1, 1, 6, 0, 0), []);
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft | null>(null);

  // Evita mismatch de hidratación: inicializa en el cliente.
  React.useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft(electionDateMs, Date.now()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [electionDateMs]);

  return (
    <section
      className="relative flex items-center justify-center text-center"
      style={{
        minHeight: "100vh",
        paddingTop: 70, // Header height
        background: "linear-gradient(135deg, #002B7F 0%, #001A4D 50%, #1E4A9E 100%)",
        overflow: "hidden",
      }}
    >
      {/* Animated background pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(206, 17, 38, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 40%)
          `,
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
              width: `${4 + i * 2}px`,
              height: `${4 + i * 2}px`,
              background: i % 2 === 0 ? "rgba(255, 255, 255, 0.3)" : "rgba(206, 17, 38, 0.4)",
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Floating decorative elements */}
      <div
        className="absolute animate-float"
        style={{
          top: "15%",
          left: "8%",
          width: 200,
          height: 200,
          background: "rgba(255, 255, 255, 0.03)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute animate-float"
        style={{
          bottom: "20%",
          right: "10%",
          width: 300,
          height: 300,
          background: "rgba(206, 17, 38, 0.08)",
          borderRadius: "50%",
          filter: "blur(60px)",
          animationDelay: "1.5s",
        }}
      />
      <div
        className="absolute animate-float"
        style={{
          top: "40%",
          right: "25%",
          width: 150,
          height: 150,
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "50%",
          filter: "blur(30px)",
          animationDelay: "0.8s",
        }}
      />

      {/* Content */}
      <div className="relative container px-md py-3xl" style={{ maxWidth: 800 }}>
        {/* Date badge - Glassmorphism */}
        <span
          className="badge badge-neutral page-load-slide-up load-delay-1"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            color: "white",
            marginBottom: "var(--spacing-lg)",
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--spacing-xs)",
            padding: "10px 20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            fontSize: "0.95rem",
          }}
        >
          <CalendarIcon sx={{ fontSize: "1.2rem" }} />
          <span>1 de febrero de 2026</span>
        </span>

        <h1
          className="page-load-slide-up load-delay-2"
          style={{
            color: "white",
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            lineHeight: 1.05,
            marginBottom: "var(--spacing-lg)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          Elecciones<br />
          <span 
            style={{ 
              background: "linear-gradient(90deg, #FFFFFF 0%, rgba(255,255,255,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Costa Rica 2026
          </span>
        </h1>

        <p
          className="page-load-slide-up load-delay-3"
          style={{
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
            maxWidth: 550,
            margin: "0 auto var(--spacing-xl)",
            lineHeight: 1.7,
          }}
        >
          Tu guía completa para las elecciones presidenciales. 
          <strong> Informate, compará y decidí.</strong>
        </p>

        {/* CTA Buttons - Mobile optimized */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-md page-load-slide-up load-delay-4"
        >
          <a
            href="#quiz"
            className="btn btn-lg"
            style={{
              background: "#CE1126",
              color: "white",
              boxShadow: "0 8px 32px rgba(206, 17, 38, 0.4)",
              padding: "18px 36px",
              borderRadius: "var(--radius-full)",
              fontSize: "1.1rem",
              fontWeight: 700,
            }}
          >
              ¿A quién votar? <VoteIcon sx={{ fontSize: "1.5rem", verticalAlign: "middle" }} />
          </a>
          <a
            href="#candidatos"
            className="btn btn-lg"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              padding: "16px 32px",
              borderRadius: "var(--radius-full)",
            }}
          >
            Ver candidatos
          </a>
        </div>

        {/* Stats - Glassmorphism cards */}
        <StatsGrid />
      </div>

    </section>
  );
}

function StatsGrid() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft | null>(null);
  const electionDateMs = React.useMemo(() => Date.UTC(2026, 1, 1, 6, 0, 0), []);

  React.useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft(electionDateMs, Date.now()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [electionDateMs]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-3 gap-md mt-3xl scroll-reveal"
      style={{ maxWidth: 500, margin: "var(--spacing-3xl) auto 0" }}
    >
      <StatCard value="14+" label="Candidatos" icon={<GroupsIcon sx={{ fontSize: "1.2rem" }} />} />
      <StatCard value="3.5M+" label="Votantes" icon={<VoteIcon sx={{ fontSize: "1.2rem" }} />} />
  <StatCard 
        value={<CountdownValue timeLeft={timeLeft} />}
        label="Cuenta regresiva" 
        icon={<TimeIcon sx={{ fontSize: "1.2rem" }} />}
        highlight 
      />
    </div>
  );
}

interface StatCardProps {
  value: React.ReactNode;
  label: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

function CountdownValue({ timeLeft }: { timeLeft: TimeLeft | null }) {
  const daysText = timeLeft ? timeLeft.days.toLocaleString("es-CR") : "—";
  const clockText = timeLeft
    ? `${pad2(timeLeft.hours)}:${pad2(timeLeft.minutes)}:${pad2(timeLeft.seconds)}`
    : "—:—:—";

  return (
    <span style={{ display: "block", lineHeight: 1.05 }}>
      <span
        style={{
          display: "block",
          fontSize: "clamp(1.5rem, 4.5vw, 2.25rem)",
          fontWeight: 800,
          fontFamily: "var(--font-display)",
        }}
      >
        {daysText}
      </span>
      <span
        style={{
          display: "block",
          marginTop: 6,
          fontSize: "0.9rem",
          fontWeight: 600,
          letterSpacing: "0.5px",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          opacity: 0.9,
        }}
      >
        {clockText}
      </span>
    </span>
  );
}

function StatCard({ value, label, icon, highlight }: StatCardProps) {
  const isPrimitiveValue = typeof value === "string" || typeof value === "number";

  return (
    <div 
      className={`text-center interactive-scale ${highlight ? 'pulse-ring' : ''}`}
      style={{
        background: highlight 
          ? "rgba(206, 17, 38, 0.25)" 
          : "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(16px)",
        borderRadius: "var(--radius-xl)",
        padding: "var(--spacing-lg) var(--spacing-md)",
        border: highlight 
          ? "2px solid rgba(206, 17, 38, 0.5)"
          : "1px solid rgba(255, 255, 255, 0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Shine effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          animation: "shimmer 3s infinite",
        }}
      />
      
      {icon && (
        <div style={{ color: highlight ? "#FF6B7A" : "rgba(255,255,255,0.7)", marginBottom: "4px" }}>
          {icon}
        </div>
      )}
      <div
        className="counter-animate"
        style={
          isPrimitiveValue
            ? {
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 800,
                color: highlight ? "#FF6B7A" : "white",
                margin: 0,
                lineHeight: 1,
                fontFamily: "var(--font-display)",
              }
            : {
                color: highlight ? "#FF6B7A" : "white",
                margin: 0,
              }
        }
      >
        {value}
      </div>
      <p
        style={{
          fontSize: "0.7rem",
          color: "rgba(255, 255, 255, 0.75)",
          margin: "var(--spacing-xs) 0 0",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          fontWeight: 500,
        }}
      >
        {label}
      </p>
    </div>
  );
}
