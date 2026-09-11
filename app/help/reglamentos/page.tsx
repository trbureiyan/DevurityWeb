import type { Metadata } from "next";
import { siteIcons, siteOpenGraph, siteTwitter } from "@/lib/constants/metadata";
import ReglamentosContent from "./ReglamentosContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Reglamentos | Devurity",
  description:
    "Consulta las normas, reglamentos y disposiciones que rigen la convivencia y gestión del semillero de investigación Devurity.",
  icons: siteIcons,
  openGraph: {
    ...siteOpenGraph,
    title: "Reglamentos | Devurity",
    description:
      "Normas y reglamentos del semillero de investigación Devurity de la Universidad Surcolombiana.",
    url: "/help/reglamentos",
  },
  twitter: siteTwitter,
};

export default function ReglamentosPage() {
  return <ReglamentosContent />;
}
