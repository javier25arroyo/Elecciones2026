"use client";

import * as React from "react";
import type { Party, QuizQuestion } from "@/lib/content";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import {
  EnergySavingsLeafOutlined as LeafIcon,
  TrendingUpOutlined as TrendingIcon,
  AutoAwesomeOutlined as RocketIcon,
  AutoAwesomeRounded as SparklesIcon,
  SchoolOutlined as BookIcon,
  SecurityOutlined as ShieldIcon,
  BalanceOutlined as ScaleIcon,
  LightbulbOutlined as BulbIcon,
  PeopleOutlineOutlined as PeopleIcon,
  HowToVoteOutlined as VotingIcon,
  ThumbUpOutlined as ThumbsUpIcon,
  SentimentSatisfiedAltOutlined as NeutralIcon,
  ThumbDownOutlined as ThumbsDownIcon,
  ShareOutlined as ShareIcon,
  RestartAltOutlined as RestartIcon,
  WarningOutlined as WarningIcon,
  CelebrationOutlined as CelebrationIcon,
} from "@mui/icons-material";

const defaultQuestions: QuizQuestion[] = [
  {
    id: "renewables",
    text: "¿El Estado debería invertir más en energías renovables y transporte público limpio?",
    axis: { env: 1, econ: -0.2 },
    icon: "LeafIcon",
  },
  {
    id: "taxes",
    text: "¿Se deberían aumentar impuestos a grandes empresas para financiar programas sociales?",
    axis: { econ: -1 },
    icon: "TrendingIcon",
  },
  {
    id: "dereg",
    text: "¿Se deberían reducir trámites e impuestos para facilitar emprender y generar empleo?",
    axis: { econ: 1 },
    icon: "RocketIcon",
  },
  {
    id: "public-edu",
    text: "¿La educación pública debe recibir más inversión que la privada?",
    axis: { econ: -0.6, social: -0.2 },
    icon: "BookIcon",
  },
  {
    id: "security",
    text: "¿Preferís un enfoque de seguridad con medidas más estrictas y mano firme?",
    axis: { social: 0.9 },
    icon: "ShieldIcon",
  },
  {
    id: "civil-liberties",
    text: "¿Las libertades civiles deben protegerse aunque entren en conflicto con valores tradicionales?",
    axis: { social: -1 },
    icon: "ScaleIcon",
  },
  {
    id: "market-env",
    text: "¿El mercado y la innovación privada son la mejor vía para resolver los problemas ambientales?",
    axis: { env: 0.4, econ: 0.6 },
    icon: "BulbIcon",
  },
  {
    id: "social-programs",
    text: "¿El gobierno debe expandir los programas de asistencia social para los más vulnerables?",
    axis: { econ: -0.7, social: -0.3 },
    icon: "PeopleIcon",
  },
];

type FeaturePill = {
  text: string;
  icon?: React.ReactNode;
};

const defaultFeaturePills: FeaturePill[] = [
  {
    icon: <RocketIcon sx={{ fontSize: "1rem" }} />,
    text: "2 min",
  },
  {
    icon: <ShieldIcon sx={{ fontSize: "1rem" }} />,
    text: "Anónimo",
  },
  {
    icon: <TrendingIcon sx={{ fontSize: "1rem" }} />,
    text: "Resultados al instante",
  },
];

interface QuizSectionProps {
  parties: Party[];
  questions?: QuizQuestion[];
  sectionId?: string;
  introTitle?: React.ReactNode;
  introDescription?: React.ReactNode;
  introBadgeText?: string;
  introCTA?: string;
  featurePills?: FeaturePill[];
  note?: React.ReactNode;
}

type QuizState = "intro" | "questions" | "results";
type Answer = 1 | 0 | -1; // Agree, Neutral, Disagree

interface PartyResult {
  party: Party;
  score: number;
  percentage: number;
}

export function QuizSection({
  parties,
  questions,
  sectionId = "quiz",
  introTitle,
  introDescription,
  introBadgeText,
  introCTA,
  featurePills,
  note,
}: QuizSectionProps) {
  const quizQuestions = questions?.length ? questions : defaultQuestions;
  const featureList = featurePills?.length ? featurePills : defaultFeaturePills;
  const badgeText = introBadgeText ?? "Quiz interactivo";
  const ctaLabel = introCTA ?? "Comenzar quiz →";
  const titleNode =
    introTitle ?? (
      <h2
        style={{
          color: "white",
          marginBottom: "var(--spacing-md)",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 800,
        }}
      >
        ¿Cuál candidato
        <br />
        te representa?
      </h2>
    );
  const descriptionNode =
    introDescription ?? (
      <p
        style={{
          color: "rgba(255,255,255,0.9)",
          marginBottom: "var(--spacing-xl)",
          fontSize: "1.1rem",
          lineHeight: 1.6,
        }}
      >
        Respondé <strong>{quizQuestions.length} preguntas rápidas</strong> y descubrí qué candidatos
        piensan como vos. ¡Es anónimo y solo toma un momento!
      </p>
    );
  const noteNode =
    note ?? (
      <p
        style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.8rem",
          marginTop: "var(--spacing-xl)",
        }}
      >
        Este quiz es orientativo y no constituye una recomendación oficial.
      </p>
    );

  const [state, setState] = React.useState<QuizState>("intro");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const [results, setResults] = React.useState<PartyResult[]>([]);

  const handleStart = () => {
    setState("questions");
    setCurrentIndex(0);
    setAnswers([]);
  };

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate results
      calculateResults(newAnswers);
      setState("results");
    }
  };

  const calculateResults = (finalAnswers: Answer[]) => {
    const userVector = { econ: 0, social: 0, env: 0 };

    quizQuestions.forEach((q, idx) => {
      const answer = finalAnswers[idx];
      const axis = q.axis || {};
      userVector.econ += (axis.econ || 0) * answer;
      userVector.social += (axis.social || 0) * answer;
      userVector.env += (axis.env || 0) * answer;
    });

    const partyResults: PartyResult[] = parties.map((party) => {
      const partyVector = guessPartyVector(party);
      const similarity = cosineSimilarity(userVector, partyVector);
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
      className={`py-3xl scrollbar-stable ${state === "results" ? "bg-app-light" : "bg-app-gradient"}`}
      style={{
        minHeight: "100vh",
        transition: "background 0.5s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements for intro */}
      {state === "intro" && (
        <>
          <div
            className="absolute animate-float"
            style={{
              top: "15%",
              left: "10%",
              width: 200,
              height: 200,
              background: "rgba(255, 255, 255, 0.08)",
              borderRadius: "50%",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute animate-float"
            style={{
              bottom: "20%",
              right: "15%",
              width: 300,
              height: 300,
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "50%",
              filter: "blur(60px)",
              animationDelay: "1s",
            }}
          />
        </>
      )}
      
      <div className="container relative">
        {state === "intro" && (
          <QuizIntro
            onStart={handleStart}
            title={titleNode}
            description={descriptionNode}
            badgeText={badgeText}
            featurePills={featureList}
            ctaLabel={ctaLabel}
            note={noteNode}
          />
        )}
        
        {state === "questions" && (
          <QuizQuestions
            questions={quizQuestions}
            currentIndex={currentIndex}
            onAnswer={handleAnswer}
          />
        )}
        
        {state === "results" && (
          <QuizResults results={results} onReset={handleReset} />
        )}
      </div>
    </section>
  );
}

interface QuizIntroProps {
  onStart: () => void;
  title: React.ReactNode;
  description: React.ReactNode;
  badgeText: string;
  featurePills: FeaturePill[];
  ctaLabel: string;
  note: React.ReactNode;
}

function QuizIntro({ onStart, title, description, badgeText, featurePills, ctaLabel, note }: QuizIntroProps) {
  return (
    <div 
      className="text-center py-xl animate-fade-in-up" 
      style={{ maxWidth: 600, margin: "0 auto" }}
    >
      {/* Floating icon */}
      <div 
        className="animate-float mb-lg"
        style={{ fontSize: "4rem", display: "flex", justifyContent: "center" }}
      >
        <VotingIcon sx={{ fontSize: "4rem", color: "white" }} />
      </div>
      
      <Badge
        variant="neutral"
        className="mb-lg"
        style={{ 
          background: "rgba(255,255,255,0.15)", 
          color: "white",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          padding: "8px 16px",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <CelebrationIcon sx={{ fontSize: "1.2rem" }} /> {badgeText}
      </Badge>
      
      <div style={{ marginBottom: "var(--spacing-md)", textWrap: "balance" }}>{title}</div>
      <div style={{ marginBottom: "var(--spacing-xl)", textWrap: "balance" }}>{description}</div>

      {/* Feature pills */}
      <div 
        className="flex flex-wrap justify-center gap-sm mb-xl"
        style={{ opacity: 0.9 }}
      >
        {featurePills.map((pill) => (
          <span
            key={pill.text}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "white",
              padding: "6px 12px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.85rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {pill.icon ? (
              <span style={{ display: "inline-flex", alignItems: "center" }}>{pill.icon}</span>
            ) : null}
            <span>{pill.text}</span>
          </span>
        ))}
      </div>
      
      <button
        onClick={onStart}
        className="btn btn-lg"
        style={{
          background: "white",
          color: "#002B7F",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          padding: "18px 48px",
          fontSize: "1.2rem",
          borderRadius: "var(--radius-full)",
        }}
      >
        {ctaLabel}
      </button>
      
      <div
        style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.8rem",
          marginTop: "var(--spacing-xl)",
        }}
      >
        {note}
      </div>
    </div>
  );
}

interface QuizQuestionsProps {
  questions: QuizQuestion[];
  currentIndex: number;
  onAnswer: (answer: Answer) => void;
}

function QuizQuestions({ questions, currentIndex, onAnswer }: QuizQuestionsProps) {
  const current = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const [selectedAnswer, setSelectedAnswer] = React.useState<Answer | null>(null);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleAnswerClick = (answer: Answer) => {
    if (isAnimating) return;
    
    setSelectedAnswer(answer);
    setIsAnimating(true);
    
    // Pequeño delay para mostrar la animación de selección
    setTimeout(() => {
      onAnswer(answer);
      setSelectedAnswer(null);
      setIsAnimating(false);
    }, 300);
  };

  const answerButtons = [
    { 
      value: 1 as Answer, 
      label: "De acuerdo", 
      icon: <ThumbsUpIcon sx={{ fontSize: "1.5rem" }} />,
      color: "#16A34A",
      bgColor: "rgba(22, 163, 74, 0.1)",
    },
    { 
      value: 0 as Answer, 
      label: "Neutral", 
      icon: <NeutralIcon sx={{ fontSize: "1.5rem" }} />,
      color: "#6B7280",
      bgColor: "rgba(107, 114, 128, 0.1)",
    },
    { 
      value: -1 as Answer, 
      label: "En desacuerdo", 
      icon: <ThumbsDownIcon sx={{ fontSize: "1.5rem" }} />,
      color: "#CE1126",
      bgColor: "rgba(206, 17, 38, 0.1)",
    },
  ];

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "var(--spacing-lg) 0" }}>
      {/* Progress header */}
      <div className="mb-xl animate-fade-in">
        <div className="flex justify-between items-center mb-md">
          <span 
            style={{ 
              background: "var(--color-primary)",
              color: "white",
              padding: "4px 12px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            {currentIndex + 1} / {questions.length}
          </span>
          <span className="text-muted" style={{ fontSize: "0.9rem" }}>
            {Math.round(progress)}% completado
          </span>
        </div>
        <Progress value={progress} />
      </div>

      {/* Question card - Estilo tarjeta tipo Tinder/Stories */}
      <div
        className="card animate-fade-in-up"
        key={current.id}
        style={{ 
          padding: "var(--spacing-2xl)",
          background: "rgba(255,255,255,0.95)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
          border: "none",
          minHeight: 420,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "var(--color-background-dark)",
          gap: "var(--spacing-lg)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Icon indicator */}
          <div
            className="text-center"
            style={{
              fontSize: "3rem",
              display: "flex",
              justifyContent: "center",
              color: "var(--color-background-dark)",
              marginBottom: "var(--spacing-md)",
            }}
          >
            {current.icon && getIconComponent(current.icon)}
          </div>
          
          <h3
            className="text-center"
            style={{
              margin: 0,
              lineHeight: 1.5,
              fontSize: "1.2rem",
              fontWeight: 650,
              color: "var(--color-background-dark)",
              textWrap: "balance",
            }}
          >
            {current.text}
          </h3>

          <p className="text-muted" style={{ margin: "var(--spacing-sm) 0 0", textAlign: "center" }}>
            Elegí la opción que más se acerque a tu criterio.
          </p>
        </div>

        {/* Answer buttons - Grandes y táctiles */}
        <div className="flex flex-col gap-md">
          {answerButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => handleAnswerClick(btn.value)}
              disabled={isAnimating}
              className="btn"
              style={{
                width: "100%",
                padding: "16px 24px",
                background: selectedAnswer === btn.value ? btn.color : btn.bgColor,
                color: selectedAnswer === btn.value ? "white" : btn.color,
                border: `2px solid ${selectedAnswer === btn.value ? btn.color : "transparent"}`,
                borderRadius: "var(--radius-lg)",
                fontSize: "1rem",
                fontWeight: 600,
                transition: "all 0.2s ease",
                transform: selectedAnswer === btn.value ? "scale(1.02)" : "scale(1)",
                boxShadow: selectedAnswer === btn.value ? "0 10px 24px rgba(0,0,0,0.15)" : "none",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--spacing-sm)" }}>
                <span style={{ fontSize: "1.5rem" }}>{btn.icon}</span>
                <span>{btn.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Swipe hint for mobile */}
      <p 
        className="text-center mt-lg text-muted hide-desktop"
        style={{ fontSize: "0.8rem" }}
      >
        Tocá para seleccionar tu respuesta
      </p>
    </div>
  );
}

interface QuizResultsProps {
  results: PartyResult[];
  onReset: () => void;
}

function QuizResults({ results, onReset }: QuizResultsProps) {
  const top3 = results.slice(0, 3);
  const rest = results.slice(3);
  const winner = top3[0];

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "var(--spacing-lg) 0" }}>
      {/* Header con animación de celebración */}
      <div className="text-center mb-2xl animate-fade-in-up">
        <div 
          className="animate-celebrate mb-md"
          style={{ fontSize: "4rem", display: "flex", justifyContent: "center" }}
        >
          <CelebrationIcon sx={{ fontSize: "4rem", color: "var(--color-primary)" }} />
        </div>
        <Badge 
          variant="secondary" 
          className="mb-md"
          style={{ 
            padding: "8px 16px",
            fontSize: "0.9rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <SparklesIcon sx={{ fontSize: "1.2rem" }} />
          Resultados listos
        </Badge>
        <h2 style={{ marginBottom: "var(--spacing-sm)" }}>
          Tu afinidad política
        </h2>
        <p className="text-secondary">
          Basado en tus respuestas, este es tu nivel de afinidad con cada candidatura.
        </p>
      </div>

      {/* Winner Card - Destacado */}
      {winner && (
        <div
          className="card animate-fade-in-up mb-xl"
          style={{
            background: `radial-gradient(900px circle at 20% 20%, ${(winner.party.accent_color || "#002B7F")}55 0%, transparent 55%), radial-gradient(700px circle at 85% 75%, rgba(255,255,255,0.14) 0%, transparent 60%), linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 55%, rgba(255,255,255,0.04) 100%)`,
            border: "1px solid rgba(255,255,255,0.16)",
            borderTop: `5px solid ${winner.party.accent_color || "var(--color-primary)"}`,
            padding: "var(--spacing-2xl)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 18px 60px rgba(0,0,0,0.22)",
          }}
        >
          {/* Badge de primer lugar */}
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "var(--gradient-cta)",
              color: "white",
              padding: "6px 12px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}
          >
            #1 Match
          </div>
          
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--spacing-md)" }}>
            <div
              style={{
                width: 92,
                height: 92,
                borderRadius: "24px",
                background: `linear-gradient(135deg, ${winner.party.accent_color || "var(--color-primary)"} 0%, var(--color-primary) 60%, var(--color-secondary) 120%)`,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                fontWeight: 850,
                boxShadow: `0 16px 40px ${winner.party.accent_color || "var(--color-primary)"}40`,
              }}
            >
              {winner.percentage}%
            </div>
          </div>
          
          <h3 style={{ marginBottom: "var(--spacing-xs)", fontSize: "1.5rem" }}>
            {winner.party.presidential_candidate?.name || winner.party.name}
          </h3>
          <p
            style={{
              marginBottom: "var(--spacing-md)",
              color: "rgba(255,255,255,0.78)",
              fontSize: "0.95rem",
              textWrap: "balance",
            }}
          >
            {winner.party.name}
          </p>
          
          <Progress
            value={winner.percentage}
            color={winner.party.accent_color}
            className="quiz-results-progress"
          />

          {winner.party.logo_url && (
            <div style={{ marginTop: "var(--spacing-md)", display: "flex", justifyContent: "center" }}>
              <Image
                src={winner.party.logo_url}
                alt={`Bandera de ${winner.party.name}`}
                loading="lazy"
                width={160}
                height={34}
                style={{
                  height: 34,
                  width: "auto",
                  opacity: 0.9,
                  filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.25))",
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* Top 2 y 3 - Responsive */}
      <div 
        className="grid gap-md mb-xl" 
        style={{ 
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 290px), 1fr))",
        }}
      >
        {top3.slice(1).map((result, index) => {
          const accent = result.party.accent_color || "var(--color-primary)";
          const rank = index + 2;
          return (
            <div
              key={result.party.name}
              className="card animate-fade-in-up"
              style={{
                animationDelay: `${(index + 1) * 0.15}s`,
                padding: "var(--spacing-lg)",
                background: `radial-gradient(700px circle at 20% 10%, ${accent}55 0%, transparent 55%), linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)`,
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 16px 44px rgba(0,0,0,0.18)",
              }}
            >
              <div className="flex items-center justify-between mb-md" style={{ gap: "var(--spacing-sm)" }}>
                <span
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    padding: "6px 10px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    color: "var(--color-text-primary)",
                  }}
                >
                  #{rank}
                </span>
                <span
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 850,
                    color: accent,
                  }}
                >
                  {result.percentage}%
                </span>
              </div>

              <h4
                style={{
                  margin: 0,
                  fontSize: "1.05rem",
                  textWrap: "balance",
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                {result.party.presidential_candidate?.name || result.party.name}
              </h4>
              <p style={{ margin: "6px 0 12px", color: "rgba(255,255,255,0.70)", fontSize: "0.9rem" }}>
                {result.party.name}
              </p>

              <Progress value={result.percentage} color={accent} className="quiz-results-progress" />
            </div>
          );
        })}
      </div>

      {/* Rest */}
      {rest.length > 0 && (
        <div className="mb-xl animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h4 className="mb-md text-secondary" style={{ fontSize: "0.95rem" }}>
            Todos los resultados
          </h4>
          <div 
            className="grid gap-sm"
            style={{
              background: "rgba(255,255,255,0.06)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--spacing-md)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {rest.map((result) => (
              <div
                key={result.party.name}
                className="flex items-center justify-between"
                style={{
                  padding: "var(--spacing-sm) 0",
                  gap: "var(--spacing-md)",
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      marginBottom: 6,
                      color: "rgba(255,255,255,0.86)",
                      textWrap: "balance",
                    }}
                  >
                    {result.party.presidential_candidate?.name || result.party.name}
                  </div>
                  <Progress value={result.percentage} color={result.party.accent_color} />
                </div>
                <div
                  style={{
                    fontWeight: 850,
                    color: "white",
                    minWidth: 56,
                    textAlign: "right",
                  }}
                >
                  {result.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share card - Para compartir en redes */}
      <div
        className="card text-center mb-xl animate-fade-in-up"
        style={{
          animationDelay: "0.5s",
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
          border: "1px solid rgba(255,255,255,0.16)",
          padding: "var(--spacing-xl)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ShareIcon sx={{ fontSize: "2rem", marginBottom: "var(--spacing-sm)", color: "var(--color-primary)" }} />
        <h4 style={{ marginBottom: "var(--spacing-sm)" }}>
          ¡Compartí tus resultados!
        </h4>
        <p className="text-muted" style={{ marginBottom: "var(--spacing-md)", fontSize: "0.9rem", color: "rgba(255,255,255,0.75)" }}>
          Invitá a tus amigos a comparar afinidad con los planes
        </p>
        <div className="flex justify-center gap-sm">
          <button
            className="btn btn-sm"
            style={{
              background: "#1DA1F2",
              color: "white",
            }}
            onClick={() => {
              const text = `Mi candidato más afín para las #EleccionesCR2026 es ${winner?.party.presidential_candidate?.name || winner?.party.name} con ${winner?.percentage}% de afinidad. ¡Hacé el quiz vos también!`;
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
            }}
          >
            Twitter/X
          </button>
          <button
            className="btn btn-sm"
            style={{
              background: "#25D366",
              color: "white",
            }}
            onClick={() => {
              const text = `Mi candidato más afín para las Elecciones CR 2026 es ${winner?.party.presidential_candidate?.name || winner?.party.name} con ${winner?.percentage}% de afinidad. ¡Hacé el quiz vos también!`;
              window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
            }}
          >
            WhatsApp
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div
        className="text-center p-lg mb-xl animate-fade-in-up"
        style={{
          animationDelay: "0.6s",
          background: "rgba(245, 158, 11, 0.1)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--spacing-sm)",
        }}
      >
        <WarningIcon sx={{ color: "rgb(245, 158, 11)" }} />
        <p className="text-secondary" style={{ margin: 0, fontSize: "0.85rem" }}>
          Este quiz es orientativo. Investigá más sobre cada candidato antes de votar.
        </p>
      </div>

      {/* Actions - Mobile friendly en la parte inferior */}
      <div 
        className="flex flex-col sm:flex-row justify-center gap-md animate-fade-in-up"
        style={{ animationDelay: "0.7s" }}
      >
        <button 
          onClick={onReset} 
          className="btn btn-secondary"
          style={{ 
            padding: "14px 28px",
            borderRadius: "var(--radius-full)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          <RestartIcon sx={{ fontSize: "1.2rem" }} /> Repetir quiz
        </button>
        <a 
          href="#candidatos" 
          className="btn btn-primary"
          style={{ 
            padding: "14px 28px",
            borderRadius: "var(--radius-full)",
          }}
        >
          Ver todos los candidatos →
        </a>
      </div>
    </div>
  );
}

function getIconComponent(iconName: string): React.ReactNode {
  const iconMap: { [key: string]: React.ReactNode } = {
    LeafIcon: <LeafIcon sx={{ fontSize: "3rem", color: "var(--color-primary)" }} />,
    TrendingIcon: <TrendingIcon sx={{ fontSize: "3rem", color: "var(--color-primary)" }} />,
    RocketIcon: <RocketIcon sx={{ fontSize: "3rem", color: "var(--color-primary)" }} />,
    BookIcon: <BookIcon sx={{ fontSize: "3rem", color: "var(--color-primary)" }} />,
    ShieldIcon: <ShieldIcon sx={{ fontSize: "3rem", color: "var(--color-primary)" }} />,
    ScaleIcon: <ScaleIcon sx={{ fontSize: "3rem", color: "var(--color-primary)" }} />,
    BulbIcon: <BulbIcon sx={{ fontSize: "3rem", color: "var(--color-primary)" }} />,
    PeopleIcon: <PeopleIcon sx={{ fontSize: "3rem", color: "var(--color-primary)" }} />,
  };
  return iconMap[iconName] || null;
}

function guessPartyVector(party: Party): { econ: number; social: number; env: number } {
  const ideology = (party.ideology || "").toLowerCase();
  const values = (party.values || []).join(" ").toLowerCase();

  let econ = 0;
  let social = 0;
  let env = 0;

  if (/(socialismo|trotsk|marx)/.test(ideology)) econ -= 1;
  if (/(social\s*democr|socialdemocr)/.test(ideology)) econ -= 0.6;
  if (/(liberal|libre\s*mercado)/.test(ideology)) econ += 0.8;

  if (/(conserv|cristian|religios)/.test(ideology)) social += 0.85;
  if (/(progresist|izquierd)/.test(ideology)) social -= 0.7;
  if (/(centro)/.test(ideology)) {
    econ *= 0.75;
    social *= 0.75;
  }

  if (/(ecolog|ambient|descarbon|biodivers|clim)/.test(ideology + " " + values)) {
    env += 0.8;
  }

  return {
    econ: Math.max(-1, Math.min(1, econ)),
    social: Math.max(-1, Math.min(1, social)),
    env: Math.max(-1, Math.min(1, env)),
  };
}

function cosineSimilarity(
  a: { econ: number; social: number; env: number },
  b: { econ: number; social: number; env: number }
): number {
  const dotProduct = a.econ * b.econ + a.social * b.social + a.env * b.env;
  const magA = Math.sqrt(a.econ ** 2 + a.social ** 2 + a.env ** 2);
  const magB = Math.sqrt(b.econ ** 2 + b.social ** 2 + b.env ** 2);
  
  if (magA === 0 || magB === 0) return 0;
  return dotProduct / (magA * magB);
}
