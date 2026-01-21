"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Party, QuizQuestion } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/utils";
import {
  Leaf,
  TrendingUp,
  Rocket,
  Sparkles,
  BookOpen,
  Shield,
  Scale,
  Lightbulb,
  Users,
  Vote,
  ThumbsUp,
  Meh,
  ThumbsDown,
  Share2,
  RotateCcw,
  PartyPopper,
  MapPin,
  Info,
} from "lucide-react";

const defaultQuestions: QuizQuestion[] = [
  {
    id: "renewables",
    text: "¿El Estado debería invertir más en energías renovables y transporte público limpio?",
    axis: { env: 1, econ: -0.2 },
    icon: "Leaf",
    example: "Invertir en paneles solares, trenes eléctricos y subsidios para energía limpia",
  },
  {
    id: "taxes",
    text: "¿Se deberían aumentar impuestos a grandes empresas para financiar programas sociales?",
    axis: { econ: -1 },
    icon: "TrendingUp",
    example: "Empresas multinacionales pagarían más para financiar salud, educación y asistencia social",
  },
  {
    id: "dereg",
    text: "¿Se deberían reducir trámites e impuestos para facilitar emprender y generar empleo?",
    axis: { econ: 1 },
    icon: "Rocket",
    example: "Menos regulaciones, impuestos bajos y simplificación para que pymes y startups crezcan",
  },
  {
    id: "public-edu",
    text: "¿La educación pública debe recibir más inversión que la privada?",
    axis: { econ: -0.6, social: -0.2 },
    icon: "BookOpen",
    example: "Mayor presupuesto a escuelas y universidades públicas, acceso equitativo para todos",
  },
  {
    id: "security",
    text: "¿Preferís un enfoque de seguridad con medidas más estrictas y mano firme?",
    axis: { social: 0.9 },
    icon: "Shield",
    example: "Aumentar fuerzas de seguridad, penalidades más duras, orden y control estricto",
  },
  {
    id: "civil-liberties",
    text: "¿Las libertades civiles deben protegerse aunque entren en conflicto con valores tradicionales?",
    axis: { social: -1 },
    icon: "Scale",
    example: "Derecho a protestas, igualdad de género y LGBTQ+, incluso si choca con tradiciones",
  },
  {
    id: "market-env",
    text: "¿El mercado y la innovación privada son la mejor vía para resolver los problemas ambientales?",
    axis: { env: 0.4, econ: 0.6 },
    icon: "Lightbulb",
    example: "Incentivar a empresas privadas a innovar en tecnología verde en lugar de prohibiciones",
  },
  {
    id: "social-programs",
    text: "¿El gobierno debe expandir los programas de asistencia social para los más vulnerables?",
    axis: { econ: -0.7, social: -0.3 },
    icon: "Users",
    example: "Aumentar planes sociales, seguro de desempleo, ayudas para familias en situación vulnerable",
  },
];

type FeaturePill = {
  text: string;
  icon?: React.ReactNode;
};

const defaultFeaturePills: FeaturePill[] = [
  {
    icon: <Rocket className="h-4 w-4" />,
    text: "2 min",
  },
  {
    icon: <Shield className="h-4 w-4" />,
    text: "Anónimo",
  },
  {
    icon: <TrendingUp className="h-4 w-4" />,
    text: "Resultados al instante",
  },
];

interface QuizSectionProps {
  parties: Party[];
  questions?: QuizQuestion[];
  maxQuestions?: number;
  sectionId?: string;
  introTitle?: React.ReactNode;
  introDescription?: React.ReactNode;
  introBadgeText?: string;
  introCTA?: string;
  featurePills?: FeaturePill[];
  note?: React.ReactNode;
  onRepeatToPicker?: () => void;
}

type QuizState = "intro" | "questions" | "results";
type Answer = 1 | 0 | -1; // Agree, Neutral, Disagree

interface PartyResult {
  party: Party;
  score: number;
  percentage: number;
}

type UserVector = {
  econ: number;
  social: number;
  env: number;
};

type StartQuizDetail = {
  sectionId: string;
};

export function QuizSection({
  parties,
  questions,
  maxQuestions,
  sectionId = "quiz",
  introTitle,
  introDescription,
  introBadgeText,
  introCTA,
  featurePills,
  note,
  onRepeatToPicker,
}: QuizSectionProps) {
  const quizQuestions = questions?.length ? questions : defaultQuestions;
  const featureList = featurePills?.length ? featurePills : defaultFeaturePills;
  const badgeText = introBadgeText ?? "Quiz interactivo";
  const ctaLabel = introCTA ?? "Comenzar quiz →";
  
  const [state, setState] = React.useState<QuizState>("intro");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const [results, setResults] = React.useState<PartyResult[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = React.useState<QuizQuestion[]>(quizQuestions);
  const [userVector, setUserVector] = React.useState<UserVector>({
    econ: 0,
    social: 0,
    env: 0,
  });

  const handleStart = React.useCallback(() => {
    setShuffledQuestions(pickQuestionSubset(quizQuestions, maxQuestions));
    setState("questions");
    setCurrentIndex(0);
    setAnswers([]);
  }, [maxQuestions, quizQuestions]);

  React.useEffect(() => {
    if (state === "intro") {
      setShuffledQuestions(quizQuestions);
    }
  }, [quizQuestions, state]);

  React.useEffect(() => {
    const onStartQuiz = (event: Event) => {
      const customEvent = event as CustomEvent<StartQuizDetail>;
      if (customEvent.detail?.sectionId !== sectionId) return;
      if (state !== "intro") return;
      handleStart();
    };

    window.addEventListener("start-quiz", onStartQuiz as EventListener);
    return () => {
      window.removeEventListener("start-quiz", onStartQuiz as EventListener);
    };
  }, [handleStart, sectionId, state]);

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateResults(newAnswers);
      setState("results");
    }
  };

  const calculateResults = (finalAnswers: Answer[]) => {
    const newUserVector: UserVector = { econ: 0, social: 0, env: 0 };

    shuffledQuestions.forEach((q, idx) => {
      const answer = finalAnswers[idx];
      const axis = q.axis || {};
      newUserVector.econ += (axis.econ || 0) * answer;
      newUserVector.social += (axis.social || 0) * answer;
      newUserVector.env += (axis.env || 0) * answer;
    });

    setUserVector(newUserVector);

    const partyResults: PartyResult[] = parties.map((party) => {
      const partyVector = guessPartyVector(party);
      const similarity = cosineSimilarity(newUserVector, partyVector);
      const percentage = Math.round(((similarity + 1) / 2) * 100);
      return { party, score: similarity, percentage };
    });

    partyResults.sort((a, b) => b.percentage - a.percentage);
    setResults(partyResults);
  };

  const handleReset = () => {
    setState("intro");
    setCurrentIndex(0);
    setAnswers([]);
    setResults([]);
  };

  return (
    <section
      id={sectionId}
      className={cn(
        "relative min-h-screen overflow-hidden transition-colors duration-500 py-16 lg:py-24",
        state === "results" ? "bg-slate-900" : "bg-gradient-app"
      )}
    >
      {/* Decorative Blobs */}
      <div className="absolute top-[10%] left-[10%] h-64 w-64 animate-float rounded-full bg-white/5 blur-[80px]" />
      <div className="absolute bottom-[20%] right-[10%] h-96 w-96 animate-float rounded-full bg-white/5 blur-[100px] [animation-delay:1s]" />

      <div className="container relative mx-auto max-w-4xl px-4">
        {state === "intro" && (
          <QuizIntro
            onStart={handleStart}
            title={introTitle}
            description={introDescription}
            badgeText={badgeText}
            featurePills={featureList}
            ctaLabel={ctaLabel}
            note={note}
          />
        )}

        {state === "questions" && (
          <QuizQuestions
            questions={shuffledQuestions}
            currentIndex={currentIndex}
            onAnswer={handleAnswer}
          />
        )}

        {state === "results" && (
          <QuizResults
            results={results}
            userVector={userVector}
            onReset={handleReset}
            onRepeatToPicker={onRepeatToPicker}
          />
        )}
      </div>
    </section>
  );
}

function QuizIntro({ onStart, title, description, badgeText, featurePills, ctaLabel, note }: any) {
  return (
    <div className="mx-auto max-w-2xl animate-fade-in-up text-center">
      <div className="mb-8 flex justify-center animate-float" aria-hidden="true">
        <Vote className="h-16 w-16 text-white" />
      </div>
      
      <Badge
        variant="neutral"
        className="mb-6 inline-flex items-center gap-2 border border-white/20 bg-white/10 py-2 px-5 text-sm font-bold text-white backdrop-blur-md"
      >
        <Sparkles className="h-4 w-4" aria-hidden="true" /> {badgeText}
      </Badge>
      
      <div className="mb-6">
        {title || (
          <h2 className="text-balance font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            ¿Cuál candidato<br /><span className="text-blue-300">te representa?</span>
          </h2>
        )}
      </div>

      <div className="mb-10 text-lg leading-relaxed text-white/90">
        {description || (
          <p>
            Respondé preguntas rápidas y descubrí qué candidatos piensan como vos.
            <br /><strong>¡Es 100% anónimo!</strong>
          </p>
        )}
      </div>

      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {featurePills.map((pill: any) => (
          <span
            key={pill.text}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
          >
            <span aria-hidden="true">{pill.icon}</span>
            {pill.text}
          </span>
        ))}
      </div>
      
      <button
        onClick={onStart}
        className="group relative inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-xl font-extrabold text-primary shadow-2xl transition-all hover:scale-105 hover:bg-slate-50 active:scale-95"
      >
        {ctaLabel}
      </button>
      
      <div className="mt-12 text-sm text-white/50">
        {note || "Este quiz es orientativo y no constituye una recomendación oficial."}
      </div>
    </div>
  );
}

function QuizQuestions({ questions, currentIndex, onAnswer }: any) {
  const current = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const [selectedAnswer, setSelectedAnswer] = React.useState<Answer | null>(null);
  const [showExample, setShowExample] = React.useState(false);

  const handleAnswerClick = (answer: Answer) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      onAnswer(answer);
      setSelectedAnswer(null);
      setShowExample(false);
    }, 250);
  };

  const options = [
    { value: 1, label: "De acuerdo", icon: <ThumbsUp className="h-6 w-6" />, color: "bg-green-500", hover: "hover:bg-green-600", border: "border-green-400" },
    { value: 0, label: "Neutral", icon: <Meh className="h-6 w-6" />, color: "bg-slate-500", hover: "hover:bg-slate-600", border: "border-slate-400" },
    { value: -1, label: "En desacuerdo", icon: <ThumbsDown className="h-6 w-6" />, color: "bg-secondary", hover: "hover:bg-secondary-dark", border: "border-red-400" },
  ];

  return (
    <div className="mx-auto max-w-xl animate-fade-in py-8">
      <div className="mb-10">
        <div className="mb-4 flex items-center justify-between text-sm font-bold text-white">
          <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/20">
            Pregunta {currentIndex + 1} de {questions.length}
          </span>
          <span className="text-white/80">{Math.round(progress)}% completado</span>
        </div>
        <Progress value={progress} className="h-2.5 bg-white/20" />
      </div>

      <div className="relative min-h-112.5 overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-8 shadow-2xl backdrop-blur-xl transition-all sm:p-12">
        <div className="flex h-full flex-col items-center justify-between gap-8">
          <div className="w-full text-center">
            <div className="mb-6 flex justify-center text-blue-300" aria-hidden="true">
              {current.icon && getIconComponent(current.icon)}
            </div>
            <h3 className="text-balance font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
              {current.text}
            </h3>
            
            {/* Info Icon and Example */}
            <div className="mt-6 flex justify-center transform transition-all duration-500">
              <button
                onClick={() => setShowExample(!showExample)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-500 transform",
                  showExample
                    ? "bg-blue-500/30 text-blue-200 shadow-lg shadow-blue-500/20 scale-105"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white hover:scale-105 hover:shadow-md"
                )}
                aria-pressed={showExample}
              >
                <Info className={cn("h-4 w-4 transition-all duration-500", showExample && "rotate-12")} />
                <span className="transition-all duration-500">
                  {showExample ? "Ocultar" : "Ver"} ejemplo
                </span>
              </button>
            </div>

            {/* Example Card with Accordion Animation */}
            <AnimatePresence>
              {showExample && current.example && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-500/15 via-blue-500/10 to-transparent p-4 text-left shadow-lg shadow-blue-500/10 backdrop-blur-sm" aria-live="polite">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-400/20">
                        <Info className="h-4 w-4 text-blue-300" aria-hidden="true" />
                      </div>
                      <p className="text-sm text-white/90 leading-relaxed">
                        <span className="block font-semibold text-blue-300 mb-1">Ejemplo:</span>
                        <span>{current.example}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex w-full flex-col gap-4" role="radiogroup" aria-label="Seleccioná tu respuesta">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswerClick(opt.value as Answer)}
                role="radio"
                aria-checked={selectedAnswer === opt.value}
                className={cn(
                  "flex w-full items-center justify-center gap-4 rounded-2xl border border-white/10 py-5 text-lg font-bold transition-all duration-300 active:scale-95",
                  selectedAnswer === opt.value
                    ? `${opt.color} text-white shadow-lg ring-4 ring-white/20 border-white/30`
                    : "bg-white/10 text-white/90 hover:bg-white/15"
                )}
              >
                <span aria-hidden="true">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizResults({ results, userVector, onReset, onRepeatToPicker }: any) {
  const winner = results[0];
  const top3 = results.slice(1, 4);

  return (
    <div className="mx-auto max-w-3xl animate-fade-in-up py-8 text-center">
      <div className="mb-8 flex justify-center animate-celebrate" aria-hidden="true">
        <PartyPopper className="h-16 w-16 text-blue-400" />
      </div>
      <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-bold">
        <Sparkles className="h-4 w-4 mr-2" aria-hidden="true" /> Resultados Listos
      </Badge>
      <h2 className="mb-12 font-display text-4xl font-extrabold text-white sm:text-5xl">
        Tu Afinidad Política
      </h2>

      <div className="mb-12 space-y-6">
        {winner && (
          <div 
            className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-10 backdrop-blur-xl transition-all hover:bg-white/10"
            style={{ boxShadow: `0 20px 50px -10px ${winner.party.accent_color}44` }}
          >
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/60">Mayor Coincidencia</div>
            <div 
              className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-slate-900 text-4xl font-black text-white shadow-2xl"
              style={{ borderColor: winner.party.accent_color }}
            >
              {winner.percentage}%
            </div>
            <h3 className="text-3xl font-black text-white sm:text-4xl">
              {winner.party.presidential_candidate?.name || winner.party.name}
            </h3>
            <p className="mb-8 text-xl font-medium text-white/70">{winner.party.name}</p>
            <div className="mx-auto max-w-xs">
              <Progress value={winner.percentage} className="h-3" />
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {top3.map((res: any, i: number) => (
            <div key={res.party.name} className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 text-left ring-1 ring-white/10">
              <div 
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg"
                style={{ backgroundColor: res.party.accent_color }}
              >
                {res.percentage}%
              </div>
              <div className="overflow-hidden">
                <h4 className="truncate font-bold text-white">{res.party.presidential_candidate?.name || res.party.name}</h4>
                <p className="truncate text-xs text-white/60">{res.party.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          onClick={onRepeatToPicker || onReset}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold text-white transition-all hover:bg-white/20"
        >
          <RotateCcw className="h-5 w-5" aria-hidden="true" /> Repetir Quiz
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-primary transition-all hover:scale-105"
          onClick={() => {
            const text = `¡Hice el quiz de afinidad política 2026 y mi match fue ${winner.party.presidential_candidate?.name}! 🚀 ¿Te animás a descubrir el tuyo? Es rápido, anónimo y sorprendente. Hacelo en https://elecciones2026.lat y contame tu resultado 😉`;
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
          }}
        >
          <Share2 className="h-5 w-5" aria-hidden="true" /> Compartir en WhatsApp
        </button>
      </div>
    </div>
  );
}

function getIconComponent(iconName: string): React.ReactNode {
  const iconMap: { [key: string]: React.ReactNode } = {
    Leaf: <Leaf className="h-14 w-14" />,
    TrendingUp: <TrendingUp className="h-14 w-14" />,
    Rocket: <Rocket className="h-14 w-14" />,
    BookOpen: <BookOpen className="h-14 w-14" />,
    Shield: <Shield className="h-14 w-14" />,
    Scale: <Scale className="h-14 w-14" />,
    Lightbulb: <Lightbulb className="h-14 w-14" />,
    Users: <Users className="h-14 w-14" />,
  };
  return iconMap[iconName] || <Vote className="h-14 w-14" />;
}

function shuffleArray<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function pickQuestionSubset(questions: QuizQuestion[], count?: number): QuizQuestion[] {
  if (!count || count >= questions.length) {
    return shuffleArray(questions);
  }

  const selected = new Map<string, QuizQuestion>();
  const byAxis = (axis: "econ" | "social" | "env") =>
    questions
      .filter((q) => typeof q.axis?.[axis] === "number")
      .sort(
        (a, b) =>
          Math.abs((b.axis?.[axis] as number) || 0) - Math.abs((a.axis?.[axis] as number) || 0)
      );

  const topEcon = byAxis("econ")[0];
  const topSocial = byAxis("social")[0];
  const topEnv = byAxis("env")[0];

  [topEcon, topSocial, topEnv].forEach((q) => {
    if (q && !selected.has(q.id)) selected.set(q.id, q);
  });

  const remaining = questions.filter((q) => !selected.has(q.id));
  const shuffled = shuffleArray(remaining);

  for (const q of shuffled) {
    if (selected.size >= count) break;
    selected.set(q.id, q);
  }

  return shuffleArray(Array.from(selected.values()));
}

function guessPartyVector(party: Party): { econ: number; social: number; env: number } {
  const ideology = (party.ideology || "").toLowerCase();
  const values = (party.values || []).join(" ").toLowerCase();

  let econ = 0, social = 0, env = 0;

  if (/(socialismo|trotsk|marx)/.test(ideology)) econ -= 0.9;
  if (/(social\s*democr|socialdemocr)/.test(ideology)) econ -= 0.5;
  if (/(liberal|libre\s*mercado)/.test(ideology)) econ += 0.8;

  if (/(conserv|cristian|religios)/.test(ideology)) social += 0.8;
  if (/(progresist|izquierd)/.test(ideology)) social -= 0.7;

  if (/(ecolog|ambient|descarbon|biodivers|clim)/.test(ideology + " " + values)) env += 0.8;

  return {
    econ: Math.max(-1, Math.min(1, econ)),
    social: Math.max(-1, Math.min(1, social)),
    env: Math.max(-1, Math.min(1, env)),
  };
}

function cosineSimilarity(a: UserVector, b: UserVector): number {
  const dot = a.econ * b.econ + a.social * b.social + a.env * b.env;
  const magA = Math.sqrt(a.econ**2 + a.social**2 + a.env**2);
  const magB = Math.sqrt(b.econ**2 + b.social**2 + b.env**2);
  return magA && magB ? dot / (magA * magB) : 0;
}