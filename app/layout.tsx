import type { Metadata } from "next";
import { Orbitron, Ubuntu } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import NavbarConditional from "@/components/layouts/NavbarConditional";
import Footer from "@/components/layouts/Footer";
import { siteIcons, siteOpenGraph, siteTwitter, SITE_URL } from "@/lib/constants/metadata";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Devurity",
  url: SITE_URL,
  description:
    "Semillero de investigación en ciberseguridad y desarrollo de software seguro de la Universidad Surcolombiana.",
  foundingOrganization: {
    "@type": "CollegeOrUniversity",
    name: "Universidad Surcolombiana",
    url: "https://www.usco.edu.co",
  },
  knowsAbout: [
    "Ciberseguridad",
    "Desarrollo de Software",
    "Ciencia de Datos",
    "Investigación Formativa",
  ],
};

// Config de fuentes
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
  display: "swap",
});


// Metadata del sitio
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://devurityweb.vercel.app"
  ),
  title: "Devurity | Semillero de Investigación en Ciberseguridad",
  description:
    "Comunidad académica enfocada en investigación, desarrollo seguro y ciberseguridad.",
  icons: siteIcons,
  openGraph: {
    ...siteOpenGraph,
    title: "Devurity | Semillero de Investigación en Ciberseguridad",
    description:
      "Comunidad académica enfocada en investigación, desarrollo seguro y ciberseguridad.",
    url: "/",
  },
  twitter: siteTwitter,
};

// Layout principal
/**
 * Componente RootLayout que envuelve toda la aplicación.
 * 
 * Este componente sirve como el contenedor principal del diseño para la aplicación Next.js,
 * proporcionando una estructura común y proveedores para todas las páginas.
 * 
 * @param {Object} props - Las propiedades del componente
 * @param {React.ReactNode} props.children - Los componentes hijos que se renderizarán dentro del diseño
 * 
 * @returns {JSX.Element} La estructura HTML raíz con los proveedores y el diseño configurados
 * 
 * @remarks
 * - Establece el idioma en español ("es")
 * - Aplica variables de fuentes de Orbitron y Ubuntu siguiendo pautas de diseño y branding
 * - Utiliza suppressHydrationWarning para prevenir advertencias de hidratación
 * - Envuelve a los hijos con AuthProvider para el contexto de autenticación
 * - Incluye el componente NavbarConditional para la navegación
 * - Incluye el componente Footer al final del cuerpo
 * - Utiliza un diseño Flexbox con una altura mínima de pantalla completa
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${orbitron.variable} ${ubuntu.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased flex flex-col min-h-screen"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <AuthProvider>
          <NavbarConditional />
          <main className="flex-1">{children}</main>
        </AuthProvider>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
