"use client";

import * as React from "react";
import type { Party, QuizQuestion } from "@/lib/content";
import {
  Sparkles,
  Rocket,
  FileText,
  Timer,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { QuizSection } from "@/components/sections/QuizSection";
import { AnimatePresence, motion } from "framer-motion";

type QuizKind = "quick" | "deep";

type QuizzesSectionProps = {
  parties: Party[];
  quickQuestions: QuizQuestion[];
  deepQuestions?: QuizQuestion[];
  deepDescription?: string;
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function dispatchStartQuiz(sectionId: string) {
  window.dispatchEvent(new CustomEvent("start-quiz", { detail: { sectionId } }));
}

export function QuizzesSection({ parties, quickQuestions, deepQuestions, deepDescription }: QuizzesSectionProps) {
  const deepAvailable = (deepQuestions?.length ?? 0) > 0;
  const [selected, setSelected] = React.useState<QuizKind | null>(null);
  const quizRunSectionId = "quiz-run";

  const selectQuiz = (kind: QuizKind) => {
    setSelected(kind);
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
      <section id="quiz" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0b2b6b] to-slate-900 py-24 sm:py-32 lg:py-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,47,108,0.25),transparent_50%),radial-gradient(circle_at_80%_60%,rgba(206,17,38,0.2),transparent_55%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-slate-900/30 to-slate-900" />
        {/* Decorative blobs */}
        <div className="absolute top-[10%] left-[6%] h-72 w-72 animate-float rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[15%] right-[10%] h-96 w-96 animate-float rounded-full bg-white/5 blur-3xl [animation-delay:1s]" />

        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="mb-20 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Elegí tu quiz
            </div>
            <h2 className="text-balance text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              ¿Resultados rápidos o una<br className="hidden lg:block" /> comparación más profunda?
            </h2>
            <p className="text-balance mt-6 text-xl leading-relaxed text-white/90 lg:text-2xl">
              Ambos quizzes son anónimos. Podés hacer uno o los dos.
            </p>
          </div>

          <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
            <QuizCard
              kind="quick"
              title="Afinidad en minutos"
              icon={<Rocket className="h-4 w-4" />}
              badgeText="Quiz rápido"
              time="2–3 min"
              description="Ideal si querés una recomendación rápida basada en preguntas generales."
              features={["10 preguntas aleatorias", "Resultados inmediatos"]}
              buttonText="Empezar quiz rápido"
              isSelected={selected === "quick"}
              onClick={() => selectQuiz("quick")}
            />
            <QuizCard
              kind="deep"
              title="Basado en planes de gobierno"
              icon={<FileText className="h-4 w-4" />}
              badgeText="Quiz profundo"
              time="6–10 min"
              description={deepDescription || "Para un match más preciso: preguntas más detalladas y alineadas a propuestas oficiales."}
              features={[`${deepQuestions?.length ?? 0} preguntas`, "Enfoque en planes"]}
              buttonText={deepAvailable ? "Empezar quiz profundo" : "Muy pronto"}
              isSelected={selected === "deep"}
              isAvailable={deepAvailable}
              onClick={() => selectQuiz("deep")}
            />
          </div>

          <AnimatePresence>
            {selected && (
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button
                  type="button"
                  onClick={resetSelection}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-3 px-5 font-bold text-white transition-colors hover:bg-white/20"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Cambiar de quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {selected && (
        <QuizSection
          key={selected}
          parties={parties}
          questions={selected === "quick" ? quickQuestions : deepQuestions}
          maxQuestions={selected === "quick" ? 10 : undefined}
          sectionId={quizRunSectionId}
          onRepeatToPicker={resetSelection}
        />
      )}
    </>
  );
}


type QuizCardProps = {
  kind: QuizKind;
  title: string;
  icon: React.ReactNode;
  badgeText: string;
  time: string;
  description: string;
  features: string[];
  buttonText: string;
  isSelected: boolean;
  isAvailable?: boolean;
  onClick: () => void;
};

function QuizCard({
  title,
  icon,
  badgeText,
  time,
  description,
  features,
  buttonText,
  isSelected,
  isAvailable = true,
  onClick,
}: QuizCardProps) {
  const cardClasses = `
    flex flex-col gap-8 rounded-3xl p-10 text-white backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
    ${isAvailable ? "bg-black/25" : "bg-black/15"}
    ${isSelected ? "border-2 border-white/50 shadow-2xl ring-8 ring-white/5" : "border border-white/15"}
    ${!isAvailable ? "opacity-70" : "hover:border-white/40 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:-translate-y-2 hover:scale-[1.01] hover:bg-black/30"}
  `;

  const buttonClasses = `
    mt-auto rounded-full py-4 px-5 text-base font-extrabold transition-all duration-200
    ${isAvailable
      ? "bg-white text-primary shadow-lg hover:scale-105"
      : "cursor-not-allowed bg-white/10 text-white/80"
    }
  `;

  return (
    <div className={cardClasses}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-bold">
            {icon}
            {badgeText}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <div className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white/85">
          <Timer className="h-4 w-4" />
          {time}
        </div>
      </div>

      <p className="leading-relaxed text-white/85">{description}</p>

      <div className="grid gap-2 text-left">
        {features.map((text, i) => (
          <div key={i} className="flex items-center gap-3 text-white/90">
            <CheckCircle className="h-4 w-4 text-white/90" />
            <span className="text-sm font-medium">{text}</span>
          </div>
        ))}
      </div>

      <button type="button" disabled={!isAvailable} onClick={onClick} className={buttonClasses} aria-label={buttonText}>
        {buttonText} {isAvailable && "→"}
      </button>
    </div>
  );
}
