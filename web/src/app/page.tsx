import { getContent } from "@/lib/content";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { CandidatesSection } from "@/components/sections/CandidatesSection";

// Lazy load componentes pesados que no están en el viewport inicial
const TimelineSection = dynamic(
  () => import("@/components/sections/TimelineSection").then(mod => ({ default: mod.TimelineSection })),
  { 
    loading: () => <div style={{ minHeight: "400px" }} />,
    ssr: true 
  }
);

const EducationSection = dynamic(
  () => import("@/components/sections/EducationSection").then(mod => ({ default: mod.EducationSection })),
  { 
    loading: () => <div style={{ minHeight: "400px" }} />,
    ssr: true 
  }
);

const QuizSection = dynamic(
  () => import("@/components/sections/QuizSection").then(mod => ({ default: mod.QuizSection })),
  { 
    loading: () => <div style={{ minHeight: "400px" }} />,
    ssr: true 
  }
);

export default async function Home() {
  const content = await getContent();
  const deepQuizQuestions = content.deep_quiz?.questions ?? [];

  return (
    <>
      <HeroSection />
      <CandidatesSection parties={content.parties} />
      <TimelineSection />
      <EducationSection />
      <QuizSection 
        parties={content.parties} 
        questions={content.quiz?.questions} 
      />
      {deepQuizQuestions.length > 0 && (
        <QuizSection
          parties={content.parties}
          questions={deepQuizQuestions}
          sectionId="deep-quiz"
          introTitle="Evaluación profunda de planes de gobierno"
          introDescription={
            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                marginBottom: "var(--spacing-xl)",
                fontSize: "1.1rem",
                lineHeight: 1.6,
              }}
            >
              {content.deep_quiz?.description ?? ""}
            </p>
          }
          introBadgeText="Planes oficiales"
          introCTA="Comenzar evaluación profunda →"
          featurePills={[
            { text: "20 preguntas detalladas" },
            { text: "Planes oficiales en foco" },
            { text: "Comparación profunda" },
          ]}
          note="Estas preguntas fueron formuladas a partir de los planes depositados ante el TSE para ofrecerte un match más preciso."
        />
      )}
    </>
  );
}
