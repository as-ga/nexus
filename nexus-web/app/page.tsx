import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { TechnologySection } from "@/components/technology-section";
import { ImplementationSection } from "@/components/implementation-section";
import { DataVisualizationSection } from "@/components/data-visualization-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <TechnologySection />
      <ImplementationSection />
      <DataVisualizationSection />
      <Footer />
    </main>
  );
}
