"use client";

import * as React from "react";
import type { Party, QuizQuestion } from "@/lib/content";
import {
  AutoAwesomeRounded as SparklesIcon,
  RocketLaunchRounded as RocketIcon,
  ArticleOutlined as ArticleIcon,
  TimerOutlined as TimerIcon,
  CheckCircleOutlineRounded as CheckIcon,
  ArrowBackRounded as BackIcon,
} from "@mui/icons-material";

import { QuizSection } from "@/components/sections/QuizSection";

type QuizKind = "quick" | "deep";

type QuizzesSectionProps = {
  parties: Party[];
  quickQuestions: QuizQuestion[];
  deepQuestions?: QuizQuestion[];
  deepDescription?: string;
};

function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function dispatchStartQuiz(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("start-quiz", {
      detail: { sectionId },
    })
  );
}

export function QuizzesSection({ parties, quickQuestions, deepQuestions, deepDescription }: QuizzesSectionProps) {
  const deepAvailable = (deepQuestions?.length ?? 0) > 0;
  const [selected, setSelected] = React.useState<QuizKind | null>(null);

  const quizRunSectionId = "quiz-run";

  const selectQuiz = (kind: QuizKind) => {
    setSelected(kind);

    // Esperá al siguiente paint para asegurar que el DOM del quiz exista
    requestAnimationFrame(() => {
      scrollToId(quizRunSectionId);
      dispatchStartQuiz(quizRunSectionId);
    });
  };

  const resetSelection = () => {
    setSelected(null);
    requestAnimationFrame(() => scrollToId("quiz"));
  };

  return (
    <>
      <section
        id="quiz"
        className="py-3xl bg-app-gradient"
        style={{ position: "relative", overflow: "hidden" }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute animate-float"
          style={{
            top: "10%",
            left: "6%",
            width: 220,
            height: 220,
            background: "rgba(255,255,255,0.08)",
            borderRadius: "50%",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute animate-float"
          style={{
            bottom: "15%",
            right: "10%",
            width: 320,
            height: 320,
            background: "rgba(255,255,255,0.06)",
            borderRadius: "50%",
            filter: "blur(60px)",
            animationDelay: "1s",
          }}
        />

        <div className="container relative">
          <div className="text-center mb-2xl">
            <div
              className="inline-flex items-center gap-sm mb-md"
              style={{
                background: "rgba(255,255,255,0.14)",
                color: "white",
                padding: "8px 14px",
                borderRadius: "var(--radius-full)",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              <SparklesIcon sx={{ fontSize: "1.1rem" }} aria-hidden="true" />
              Elegí tu quiz
            </div>
            <h2
              style={{
                color: "white",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 800,
                marginBottom: "var(--spacing-sm)",
                textWrap: "balance",
              }}
            >
              ¿Querés resultados rápidos o una comparación más profunda?
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "1.05rem",
                lineHeight: 1.6,
                margin: 0,
                textWrap: "balance",
              }}
            >
              Ambos quizzes son anónimos. Podés hacer uno o los dos.
            </p>
          </div>

          <div className="grid gap-lg md:grid-cols-2" style={{ alignItems: "stretch" }}>
            {/* Quick quiz */}
            <div
              className="card"
              style={{
                background: "rgba(0,0,0,0.22)",
                border: selected === "quick" ? "2px solid rgba(255,255,255,0.35)" : "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(20px)",
                padding: "var(--spacing-xl)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-lg)",
              }}
            >
              <div className="flex items-start justify-between gap-md">
                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 12px",
                      borderRadius: "var(--radius-full)",
                      background: "rgba(255,255,255,0.12)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.15)",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      marginBottom: "var(--spacing-sm)",
                    }}
                  >
                    <RocketIcon sx={{ fontSize: "1.1rem" }} aria-hidden="true" />
                    Quiz rápido
                  </div>
                  <h3 style={{ margin: 0, color: "white", fontSize: "1.35rem", fontWeight: 800 }}>
                    Afinidad en minutos
                  </h3>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  <TimerIcon sx={{ fontSize: "1.05rem" }} aria-hidden="true" />
                  2–3 min
                </div>
              </div>

              <div style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                Ideal si querés una recomendación rápida basada en preguntas generales.
              </div>

              <div className="grid gap-sm" style={{ textAlign: "left" }}>
                <div className="flex items-center gap-sm" style={{ color: "rgba(255,255,255,0.9)" }}>
                  <CheckIcon sx={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.9)" }} aria-hidden="true" />
                  {quickQuestions.length} preguntas
                </div>
                <div className="flex items-center gap-sm" style={{ color: "rgba(255,255,255,0.9)" }}>
                  <CheckIcon sx={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.9)" }} aria-hidden="true" />
                  Resultados inmediatos
                </div>
              </div>

              <button
                type="button"
                className="btn btn-lg"
                onClick={() => selectQuiz("quick")}
                style={{
                  marginTop: "auto",
                  background: "white",
                  color: "#002B7F",
                  borderRadius: "var(--radius-full)",
                  padding: "16px 22px",
                  fontWeight: 800,
                }}
                aria-label="Empezar quiz rápido"
              >
                Empezar quiz rápido →
              </button>
            </div>

            {/* Deep quiz */}
            <div
              className="card"
              style={{
                background: deepAvailable ? "rgba(0,0,0,0.22)" : "rgba(0,0,0,0.14)",
                border: selected === "deep" ? "2px solid rgba(255,255,255,0.35)" : deepAvailable ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(20px)",
                padding: "var(--spacing-xl)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-lg)",
                opacity: deepAvailable ? 1 : 0.7,
              }}
            >
              <div className="flex items-start justify-between gap-md">
                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 12px",
                      borderRadius: "var(--radius-full)",
                      background: "rgba(255,255,255,0.12)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.15)",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      marginBottom: "var(--spacing-sm)",
                    }}
                  >
                    <ArticleIcon sx={{ fontSize: "1.05rem" }} aria-hidden="true" />
                    Quiz profundo
                  </div>
                  <h3 style={{ margin: 0, color: "white", fontSize: "1.35rem", fontWeight: 800 }}>
                    Basado en planes de gobierno
                  </h3>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  <TimerIcon sx={{ fontSize: "1.05rem" }} aria-hidden="true" />
                  6–10 min
                </div>
              </div>

              <div style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                {deepAvailable
                  ? deepDescription || "Para un match más preciso: preguntas más detalladas y alineadas a propuestas oficiales."
                  : "Este quiz estará disponible pronto."}
              </div>

              <div className="grid gap-sm" style={{ textAlign: "left" }}>
                <div className="flex items-center gap-sm" style={{ color: "rgba(255,255,255,0.9)" }}>
                  <CheckIcon sx={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.9)" }} aria-hidden="true" />
                  {deepAvailable ? `${deepQuestions?.length ?? 0} preguntas` : "Próximamente"}
                </div>
                <div className="flex items-center gap-sm" style={{ color: "rgba(255,255,255,0.9)" }}>
                  <CheckIcon sx={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.9)" }} aria-hidden="true" />
                  Enfoque en planes
                </div>
              </div>

              <button
                type="button"
                className="btn btn-lg"
                disabled={!deepAvailable}
                onClick={() => selectQuiz("deep")}
                style={{
                  marginTop: "auto",
                  background: deepAvailable ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  color: "white",
                  borderRadius: "var(--radius-full)",
                  padding: "16px 22px",
                  fontWeight: 800,
                }}
                aria-label="Empezar quiz profundo"
              >
                {deepAvailable ? "Empezar quiz profundo →" : "Muy pronto"}
              </button>
            </div>
          </div>

          {selected && (
            <div className="flex justify-center mt-xl">
              <button
                type="button"
                className="btn"
                onClick={resetSelection}
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "white",
                  borderRadius: "var(--radius-full)",
                  padding: "12px 18px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 700,
                }}
              >
                <BackIcon sx={{ fontSize: "1.1rem" }} aria-hidden="true" />
                Cambiar de quiz
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Solo renderizamos un quiz a la vez (eliminamos las dos secciones separadas) */}
      {selected && (
        <QuizSection
          key={selected}
          parties={parties}
          questions={selected === "quick" ? quickQuestions : deepQuestions}
          sectionId={quizRunSectionId}
          introTitle={
            selected === "quick"
              ? "Quiz rápido"
              : "Evaluación profunda de planes de gobierno"
          }
          introBadgeText={selected === "quick" ? "Quiz interactivo" : "Planes oficiales"}
          introCTA={selected === "quick" ? "Comenzar quiz →" : "Comenzar evaluación profunda →"}
          featurePills={
            selected === "quick"
              ? undefined
              : [
                  { text: "20 preguntas detalladas" },
                  { text: "Planes oficiales en foco" },
                  { text: "Comparación profunda" },
                ]
          }
          note={
            selected === "quick"
              ? undefined
              : "Estas preguntas fueron formuladas a partir de los planes depositados ante el TSE para ofrecerte un match más preciso."
          }
        />
      )}

      {selected && (
        <div className="container" style={{ marginTop: "var(--spacing-xl)" }}>
          <div className="text-center" style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.85rem" }}>
            ¿Querés hacer el otro quiz también? Usá “Cambiar de quiz”.
          </div>
        </div>
      )}
    </>
  );
}
