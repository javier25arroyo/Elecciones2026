import { getContent } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { CandidatesSection } from "@/components/sections/CandidatesSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { QuizSection } from "@/components/sections/QuizSection";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <CandidatesSection parties={content.parties} />
        <TimelineSection />
        <EducationSection />
        <QuizSection 
          parties={content.parties} 
          questions={content.quiz?.questions} 
        />
      </main>
      <Footer />
    </>
  );
}
