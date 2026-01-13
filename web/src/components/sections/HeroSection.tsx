"use client";

import * as React from "react";
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
      className="relative flex items-center justify-center text-center bg-app-gradient"
      style={{
        minHeight: "100vh",
        paddingTop: 70, // Header height
        overflow: "hidden",
      }}
    >
      {/* Animated background pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, color-mix(in srgb, var(--color-secondary) 15%, transparent) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, color-mix(in srgb, white 8%, transparent) 0%, transparent 40%)
          `,
        }}
      />

      {/* Particles removed for mobile performance */}

      {/* Floating decorative element - Optimized for mobile */}
      <div
        className="absolute animate-float"
        style={{
          top: "15%",
          left: "8%",
          width: 200,
          height: 200,
          background: "rgba(255, 255, 255, 0.03)",
          borderRadius: "50%",
          filter: "blur(30px)",
          pointerEvents: "none",
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
          </svg>
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
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ¿A quién votar? 
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: "middle" }}>
              <path d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66c-.39.39-.39 1.02 0 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36c.39-.39.39-1.02 0-1.41L14.16 2.3c-.38-.4-1.01-.4-1.4-.01z"/>
            </svg>
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
      className="grid gap-md mt-3xl scroll-reveal"
      style={{ 
        maxWidth: 500, 
        margin: "var(--spacing-3xl) auto 0",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
    >
      <StatCard value="14+" label="Candidatos" icon={
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      } />
      <StatCard value="3.5M+" label="Votantes" icon={
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66c-.39.39-.39 1.02 0 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36c.39-.39.39-1.02 0-1.41L14.16 2.3c-.38-.4-1.01-.4-1.4-.01z"/>
        </svg>
      } />
      <StatCard 
        value={<CountdownValue timeLeft={timeLeft} />}
        label="Cuenta regresiva" 
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
        }
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
