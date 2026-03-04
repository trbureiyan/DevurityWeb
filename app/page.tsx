import HeroSection from "@/components/landing/HeroSection";
import ImpactSection from "@/components/landing/ImpactSection";
import AboutSection from "@/components/landing/AboutSection";
import ProjectsPreviewSection from "@/components/landing/ProjectsPreviewSection";
import EventsSection from "@/components/landing/EventsSection";
import ContactSection from "@/components/landing/ContactSection";
import CTASection from "@/components/landing/CTASection";
import GalleryPreviewSection from "@/components/landing/GalleryPreviewSection";
import ReglamentoSection from "@/components/landing/ReglamentoSection";
// Data fetching functions
import {
  getLandingGalleryPreview,
  getLandingQuickNav,
} from "@/lib/data/landing";
import type { Metadata } from "next";
import { siteIcons } from "@/lib/constants/metadata";

export const metadata: Metadata = {
  title: "Devurity | Semillero de Investigación en Ciberseguridad",
  description:
    "Somos un semillero y comunidad académica ubicada en la Universidad Surcolombiana enfocada en investigación, desarrollo de software seguro y ciberseguridad. Únete a nuestros proyectos y eventos.",
  icons: siteIcons,
};

// Forzar render estático general landing
export const dynamic = "force-static";

export default async function Home() {
  const [quickNavItems, galleryImages] = await Promise.all([
    getLandingQuickNav(),
    getLandingGalleryPreview(),
  ]);

  return (
    <main className="min-h-screen bg-variable-collection-fondo scroll-smooth">
      <HeroSection quickNavItems={quickNavItems} />
      <ImpactSection />
      <AboutSection />
      <EventsSection />           {/* Lee de useUpdates (localStorage) */}
      <ProjectsPreviewSection />  {/* Lee de useProjects (localStorage) */}
      <CTASection />
      <GalleryPreviewSection images={galleryImages} />
      <ContactSection />
      <ReglamentoSection />
    </main>
  );
}