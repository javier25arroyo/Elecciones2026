"use client";

import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { useScrollReveal } from "@/lib/useScrollReveal";
import {
  Calendar,
  CreditCard,
  CheckCircle,
  Lock,
} from "lucide-react";

const faqItems = [
  {
    id: "requisitos",
    title: "¿Cuáles son los requisitos para votar?",
    content: (
      <>
        <p>Para votar en las elecciones de Costa Rica 2026, necesitás:</p>
        <ul className="mt-2 list-disc space-y-1 pl-6">
          <li>Ser ciudadano costarricense</li>
          <li>Tener 18 años cumplidos al día de la elección</li>
          <li>Portar tu cédula de identidad vigente</li>
          <li>Estar inscrito en el padrón electoral</li>
        </ul>
        <p className="mt-4">
          Podés verificar tu estado en el padrón en{" "}
          <a href="https://www.tse.go.cr" target="_blank" rel="noopener noreferrer" className="text-primary-light font-medium underline hover:text-blue-400">
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
          Tu centro de votación depende de tu domicilio electoral registrado. Podés consultar tu lugar de votación en la página del TSE ingresando tu número de cédula.
        </p>
        <a
          href="https://www.tse.go.cr/descarga_padron.html"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-lg border-2 border-primary-light bg-primary/20 py-2 px-4 text-sm font-semibold text-primary-light transition-colors hover:bg-primary/30"
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
        Las mesas de votación estarán abiertas de <strong>6:00 a.m. a 6:00 p.m.</strong> el día de las elecciones. Te recomendamos llegar temprano para evitar filas, especialmente si votás en zonas urbanas con alta densidad de votantes.
      </p>
    ),
  },
  {
    id: "proceso",
    title: "¿Cómo es el proceso de votación?",
    content: (
      <ol className="list-decimal space-y-2 pl-6">
        <li><strong>Presentá tu cédula</strong> a los miembros de mesa</li>
        <li><strong>Firmá el padrón</strong> con tu nombre</li>
        <li><strong>Recibí las papeletas</strong> (presidencial y legislativa)</li>
        <li><strong>Entrá al cubículo</strong> de votación (es secreto)</li>
        <li><strong>Marcá tu voto</strong> con una X clara en el círculo</li>
        <li><strong>Depositá las papeletas</strong> dobladas en la urna</li>
      </ol>
    ),
  },
];

export function EducationSection() {
  const ctaRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="educacion" className="bg-gradient-to-b from-slate-900 to-slate-800 py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4 bg-white/10 text-white">
            Educación cívica
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">¿Cómo votar en Costa Rica?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Todo lo que necesitás saber para ejercer tu derecho al voto. Información oficial basada en el Tribunal Supremo de Elecciones.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Quick guide */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-white">Guía rápida</h3>
            <QuickGuideGrid />
          </div>

          {/* FAQ Accordion */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-white">Preguntas frecuentes</h3>
            <Accordion items={faqItems} />
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="scroll-reveal mt-16 rounded-2xl bg-gradient-costa-rica p-1 lg:mt-24">
          <div className="rounded-xl bg-slate-800/80 p-8 text-center backdrop-blur-lg">
            <h3 className="text-2xl font-bold text-white">¿Tenés más preguntas?</h3>
            <p className="mx-auto mt-3 mb-6 max-w-lg text-white/80">
              Visitá el sitio oficial del Tribunal Supremo de Elecciones para información completa y actualizada.
            </p>
            <a
              href="https://www.tse.go.cr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-gradient-cta px-8 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              Ir al TSE ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickGuideGrid() {
  const guideItems = [
    { icon: <Calendar className="text-blue-400" />, title: "Fecha de votación", description: "1 de febrero de 2026, de 6:00 a.m. a 6:00 p.m.", color: "#60a5fa" },
    { icon: <CreditCard className="text-red-400" />, title: "Documento necesario", description: "Cédula de identidad vigente (obligatoria)", color: "#f87171" },
    { icon: <CheckCircle className="text-green-400" />, title: "Cómo marcar", description: "Una X clara dentro del círculo del candidato", color: "#34d399" },
    { icon: <Lock className="text-purple-400" />, title: "Tu voto es secreto", description: "Nadie puede obligarte a revelar tu voto", color: "#a78bfa" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {guideItems.map((item, index) => (
        <div key={item.title} className={`scroll-reveal scroll-reveal-delay-${index + 1}`}>
          <div
            className="flex h-full items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
            style={{ borderLeftColor: item.color, borderLeftWidth: "4px" }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-3xl">
              {item.icon}
            </div>
            <div>
              <h4 className="font-bold text-white">{item.title}</h4>
              <p className="text-sm text-white/70">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
