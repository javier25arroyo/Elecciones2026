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

  // Evita mismatch de hidratación: el countdown se calcula en el cliente.
  React.useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft(electionDateMs, Date.now()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [electionDateMs]);
  
  const [, setTimeLeft] = React.useState<TimeLeft | null>(null);


  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-app pt-[70px] text-center">
      {/* Animated background pattern */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,color-mix(in_srgb,var(--color-secondary)_15%,transparent)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,color-mix(in_srgb,white_8%,transparent)_0%,transparent_40%)]"
      />

      {/* Floating decorative element */}
      <div
        className="pointer-events-none absolute top-[15%] left-[8%] h-[200px] w-[200px] animate-float rounded-full bg-white/5 blur-[30px]"
      />

      {/* Content */}
      <div className="container relative max-w-4xl px-4 py-24 sm:py-32 md:px-8">
        {/* Date badge - Glassmorphism */}
        <span
          className="page-load-slide-up load-delay-1 mb-10 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-3 px-6 text-sm font-bold text-white backdrop-blur-md"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
          </svg>
          <span>1 de febrero de 2026</span>
        </span>

        <h1
          className="page-load-slide-up load-delay-2 mb-10 font-display text-[clamp(2.5rem,10vw,5rem)] font-black leading-[1.1] tracking-tight text-white"
        >
          Elecciones<br />
          <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            Costa Rica 2026
          </span>
        </h1>

        <p
          className="page-load-slide-up load-delay-3 mx-auto mb-12 max-w-[650px] text-[clamp(1.1rem,4vw,1.45rem)] leading-[1.6] text-white/95 drop-shadow-sm px-4"
        >
          Tu guía completa para las elecciones presidenciales.
          <br className="hidden sm:block" />
          <strong className="font-extrabold text-white"> Informate, compará y decidí con criterio.</strong>
        </p>

        {/* CTA Buttons - Mobile optimized */}
        <div
          className="page-load-slide-up load-delay-4 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#quiz"
            className="inline-flex items-center gap-2 rounded-full bg-secondary py-[18px] px-9 text-[1.1rem] font-bold text-white shadow-[0_8px_32px_rgba(206,17,38,0.4)] transition-transform hover:scale-105"
          >
            ¿A quién votar?
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="align-middle">
              <path d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66c-.39.39-.39 1.02 0 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36c.39-.39.39-1.02 0-1.41L14.16 2.3c-.38-.4-1.01-.4-1.4-.01z"/>
            </svg>
          </a>
          <a
            href="#candidatos"
            className="inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-white/10 py-4 px-8 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            Ver candidatos
          </a>
        </div>

        {/* Stats */}
        <StatsGrid />
      </div>
    </section>
  );
}

function StatsGrid() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="scroll-reveal mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
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
      <div className="col-span-2 sm:col-span-1">
        <StatCard
          value={<CountdownValue />}
          label="Cuenta regresiva"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
          }
          highlight
        />
      </div>
    </div>
  );
}

function CountdownValue() {
  const electionDateMs = React.useMemo(() => Date.UTC(2026, 1, 1, 6, 0, 0), []);
  const [timeLeft, setTimeLeft] = React.useState(() => getTimeLeft(electionDateMs, Date.now()));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(electionDateMs, Date.now()));
    }, 1000);
    return () => clearInterval(timer);
  }, [electionDateMs]);

  return (
    <span className="block leading-[1.05]">
      <span className="block font-display text-[clamp(1.5rem,4.5vw,2.25rem)] font-extrabold">
        {timeLeft.days.toLocaleString("es-CR")}
      </span>
      <span className="mt-1.5 block font-mono text-[0.9rem] font-semibold tracking-wider opacity-90">
        {`${pad2(timeLeft.hours)}:${pad2(timeLeft.minutes)}:${pad2(timeLeft.seconds)}`}
      </span>
    </span>
  );
}

interface StatCardProps {
  value: React.ReactNode;
  label: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

function StatCard({ value, label, icon, highlight }: StatCardProps) {
  const isPrimitiveValue = typeof value === "string" || typeof value === "number";

  const cardClasses = `
    relative overflow-hidden rounded-xl p-4 text-center
    backdrop-blur-2xl transition-all duration-300
    hover:scale-105 hover:shadow-xl
    ${highlight
      ? 'border-2 border-secondary/60 bg-secondary/30 ring-4 ring-secondary/10'
      : 'border border-white/20 bg-white/10'
    }
  `;

  const valueClasses = `
    m-0 leading-none drop-shadow-sm
    ${isPrimitiveValue
      ? 'font-display text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-tight'
      : ''
    }
    ${highlight ? 'text-white' : 'text-white'}
  `;

  return (
    <div className={cardClasses}>
      {/* Shine effect */}
      <div className="absolute top-0 left-[-100%] h-full w-full animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] bg-[length:200%_100%]" />

      {icon && (
        <div className={`mb-1.5 flex justify-center ${highlight ? 'text-white' : 'text-white/80'}`}>
          {icon}
        </div>
      )}
      <div className={valueClasses}>
        {value}
      </div>
      <p className={`mt-2 mb-0 text-xs font-bold uppercase tracking-[0.15em] ${highlight ? 'text-white' : 'text-white/80'}`}>
        {label}
      </p>
    </div>
  );
}
