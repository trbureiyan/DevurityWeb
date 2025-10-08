import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devurity - Semillero de Investigación",
  description: "Plataforma oficial del semillero Devurity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
