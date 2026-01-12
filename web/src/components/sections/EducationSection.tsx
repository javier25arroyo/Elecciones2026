"use client";

import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import {
  CalendarMonthOutlined as CalendarIcon,
  CreditCardOutlined as IdIcon,
  CheckCircleOutline as CheckIcon,
  LockOutlined as LockIcon,
} from "@mui/icons-material";

const faqItems = [
  {
    id: "requisitos",
    title: "¿Cuáles son los requisitos para votar?",
    content: (
      <>
        <p>Para votar en las elecciones de Costa Rica 2026, necesitás:</p>
        <ul style={{ marginTop: "var(--spacing-sm)", paddingLeft: "var(--spacing-lg)" }}>
          <li>Ser ciudadano costarricense</li>
          <li>Tener 18 años cumplidos al día de la elección</li>
          <li>Portar tu cédula de identidad vigente</li>
          <li>Estar inscrito en el padrón electoral</li>
        </ul>
        <p style={{ marginTop: "var(--spacing-md)" }}>
          Podés verificar tu estado en el padrón en{" "}
          <a
            href="https://www.tse.go.cr"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-primary)" }}
          >
            www.tse.go.cr
          </a>
        </p>
      </>
    ),
  },
  {
    id: "donde-votar",
    title: "¿Dónde me toca votar?",
    content: (
      <>
        <p>
          Tu centro de votación depende de tu domicilio electoral registrado.
          Podés consultar tu lugar de votación en la página del TSE ingresando
          tu número de cédula.
        </p>
        <a
          href="https://www.tse.go.cr/descarga_padron.html"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm mt-md"
        >
          Consultar mi centro de votación ↗
        </a>
      </>
    ),
  },
  {
    id: "horarios",
    title: "¿Cuál es el horario de votación?",
    content: (
      <p>
        Las mesas de votación estarán abiertas de <strong>6:00 a.m. a 6:00 p.m.</strong> 
        el día de las elecciones. Te recomendamos llegar temprano para evitar filas,
        especialmente si votás en zonas urbanas con alta densidad de votantes.
      </p>
    ),
  },
  {
    id: "proceso",
    title: "¿Cómo es el proceso de votación?",
    content: (
      <>
        <ol style={{ paddingLeft: "var(--spacing-lg)" }}>
          <li style={{ marginBottom: "var(--spacing-sm)" }}>
            <strong>Presentá tu cédula</strong> a los miembros de mesa
          </li>
          <li style={{ marginBottom: "var(--spacing-sm)" }}>
            <strong>Firmá el padrón</strong> con tu nombre
          </li>
          <li style={{ marginBottom: "var(--spacing-sm)" }}>
            <strong>Recibí las papeletas</strong> (presidencial y legislativa)
          </li>
          <li style={{ marginBottom: "var(--spacing-sm)" }}>
            <strong>Entrá al cubículo</strong> de votación (es secreto)
          </li>
          <li style={{ marginBottom: "var(--spacing-sm)" }}>
            <strong>Marcá tu voto</strong> con una X clara en el círculo
          </li>
          <li>
            <strong>Depositá las papeletas</strong> dobladas en la urna
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "voto-nulo",
    title: "¿Qué pasa si marco mal mi papeleta?",
    content: (
      <p>
        Un voto se considera <strong>nulo</strong> si: marcás más de una opción,
        la marca no es clara, o escribís algo adicional. Si cometés un error,
        <strong> no podés pedir otra papeleta</strong>. Asegurate de marcar
        con una X clara dentro del círculo de tu candidato elegido.
      </p>
    ),
  },
  {
    id: "segunda-ronda",
    title: "¿Cuándo hay segunda ronda?",
    content: (
      <p>
        Si ningún candidato obtiene más del <strong>40% de los votos válidos</strong>,
        se realiza una segunda ronda (balotaje) entre los dos candidatos con más
        votos. Esta se programaría para el <strong>6 de abril de 2026</strong>,
        dos meses después de la primera ronda.
      </p>
    ),
  },
];

export function EducationSection() {
  return (
    <section
      id="educacion"
      className="py-3xl bg-app-light"
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-2xl">
          <Badge variant="secondary" className="mb-md" style={{ background: "rgba(255,255,255,0.1)", color: "white" }}>
            Educación cívica
          </Badge>
          <h2 style={{ color: "white" }}>¿Cómo votar en Costa Rica?</h2>
          <p style={{ maxWidth: 600, margin: "0 auto", color: "rgba(255,255,255,0.8)" }}>
            Todo lo que necesitás saber para ejercer tu derecho al voto.
            Información oficial basada en el Tribunal Supremo de Elecciones.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
          {/* Quick guide */}
          <div>
            <h3 className="mb-lg" style={{ color: "white" }}>Guía rápida</h3>
            <QuickGuideGrid />
          </div>

          {/* FAQ Accordion */}
          <div>
            <h3 className="mb-lg" style={{ color: "white" }}>Preguntas frecuentes</h3>
            <Accordion items={faqItems} />
          </div>
        </div>

        {/* CTA */}
        <div 
          className="mt-3xl text-center py-xl px-lg tse-cta"
          style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h3 className="mb-md" style={{ color: "white" }}>¿Tenés más preguntas?</h3>
          <p style={{ maxWidth: 500, margin: "0 auto var(--spacing-lg)", color: "rgba(255,255,255,0.8)" }}>
            Visitá el sitio oficial del Tribunal Supremo de Elecciones para
            información completa y actualizada.
          </p>
          <a
            href="https://www.tse.go.cr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Ir al TSE ↗
          </a>
        </div>
      </div>
    </section>
  );
}

interface QuickGuideCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

function QuickGuideGrid() {
  const ref1 = useScrollReveal<HTMLDivElement>();
  const ref2 = useScrollReveal<HTMLDivElement>();
  const ref3 = useScrollReveal<HTMLDivElement>();
  const ref4 = useScrollReveal<HTMLDivElement>();

  return (
    <div className="grid gap-md">
      <div ref={ref1} className="scroll-reveal scroll-reveal-delay-1">
        <QuickGuideCard
          icon={<CalendarIcon sx={{ fontSize: "1.75rem", color: "#60a5fa" }} />}
          title="Fecha de votación"
          description="1 de febrero de 2026, de 6:00 a.m. a 6:00 p.m."
          color="#60a5fa"
        />
      </div>
      <div ref={ref2} className="scroll-reveal scroll-reveal-delay-2">
        <QuickGuideCard
          icon={<IdIcon sx={{ fontSize: "1.75rem", color: "#f87171" }} />}
          title="Documento necesario"
          description="Cédula de identidad vigente (obligatoria)"
          color="#f87171"
        />
      </div>
      <div ref={ref3} className="scroll-reveal scroll-reveal-delay-3">
        <QuickGuideCard
          icon={<CheckIcon sx={{ fontSize: "1.75rem", color: "#34d399" }} />}
          title="Cómo marcar"
          description="Una X clara dentro del círculo del candidato"
          color="#34d399"
        />
      </div>
      <div ref={ref4} className="scroll-reveal scroll-reveal-delay-4">
        <QuickGuideCard
          icon={<LockIcon sx={{ fontSize: "1.75rem", color: "#a78bfa" }} />}
          title="Tu voto es secreto"
          description="Nadie puede obligarte a revelar tu voto"
          color="#a78bfa"
        />
      </div>
    </div>
  );
}

function QuickGuideCard({ icon, title, description, color }: QuickGuideCardProps) {
  return (
    <div
      className="card card-solid quick-guide-card"
      style={{ 
        borderLeftColor: color,
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div className="quick-guide-icon">
        {icon}
      </div>
      <div>
        <h4 className="quick-guide-title" style={{ color: "white" }}>
          {title}
        </h4>
        <p className="quick-guide-desc" style={{ color: "rgba(255,255,255,0.7)" }}>
          {description}
        </p>
      </div>
    </div>
  );
}
