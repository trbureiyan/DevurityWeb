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
  getLandingNews,
  getLandingProjects,
  getLandingQuickNav,
} from "@/lib/data/landing";
import type { Metadata } from "next";
import { siteIcons } from "@/lib/constants/metadata";

export const metadata: Metadata = {
  // Título: máximo 60 caracteres recomendados para SEO (Google muestra ~50-60)
  title: "Devurity | Semillero de Investigación en Ciberseguridad",
  // Descripción: máximo 160 caracteres recomendados para SEO (Google muestra ~150-160) 
  description: "Somos un semillero y comunidad académica ubicada en la Universidad Surcolombiana enfocada en investigación, desarrollo de software seguro y ciberseguridad. Únete a nuestros proyectos y eventos.",
  icons: siteIcons,
};

// Forzar render estatico general landing
export const dynamic = "force-static";

export default async function Home() {
  const [quickNavItems, projects, news, galleryImages] = await Promise.all([
    getLandingQuickNav(),
    getLandingProjects(),
    getLandingNews(),
    getLandingGalleryPreview(),
  ]);

  return (
    <main className="min-h-screen bg-variable-collection-fondo scroll-smooth">
      <HeroSection quickNavItems={quickNavItems} /> {/* Hero con organizacion */}
      <ImpactSection />  {/* Seccion impacto */}
      <AboutSection /> {/* Seccion ADN */}
      <EventsSection news={news} /> {/* Seccion render dinamico */}
      <ProjectsPreviewSection projects={projects} /> {/* Seccion render dinamico */}
      <CTASection />
      <GalleryPreviewSection images={galleryImages} /> {/* Galeria organizada */}
      <ContactSection />
      <ReglamentoSection /> {/* Seccion reglamentos */}
      </main>
  );
}
