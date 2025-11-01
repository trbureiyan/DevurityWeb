import HeroSection from "@/components/landing/HeroSection";
import ImpactSection from "@/components/landing/ImpactSection";
import AboutSection from "@/components/landing/AboutSection";
import ProjectsPreviewSection from "@/components/landing/ProjectsPreviewSection";
import EventsSection from "@/components/landing/EventsSection";
import ContactSection from "@/components/landing/ContactSection";
import CTASection from "@/components/landing/CTASection";
import GalleryPreviewSection from "@/components/landing/GalleryPreviewSection";

// Landing-page 
export default function Home() {
  return (
    <main className="min-h-screen bg-variable-collection-fondo scroll-smooth">
      <HeroSection />
      <ImpactSection />
      <AboutSection />
      <EventsSection />
      <ProjectsPreviewSection />
      <CTASection />
      <GalleryPreviewSection />
      <ContactSection />
    </main>
  );
}
