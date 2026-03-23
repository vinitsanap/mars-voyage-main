import ProgressBar from "@/components/ProgressBar";
import NavigationDots from "@/components/NavigationDots";
import HeroSection from "@/components/HeroSection";
import EarthSection from "@/components/EarthSection";
import SpaceTravelSection from "@/components/SpaceTravelSection";
import MarsLandingSection from "@/components/MarsLandingSection";
import ExplorationSection from "@/components/ExplorationSection";
import ConclusionSection from "@/components/ConclusionSection";

const Index = () => (
  <main className="bg-background">
    <ProgressBar />
    <NavigationDots />
    <HeroSection />
    <EarthSection />
    <SpaceTravelSection />
    <MarsLandingSection />
    <ExplorationSection />
    <ConclusionSection />
  </main>
);

export default Index;
