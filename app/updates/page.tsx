import type { Metadata } from "next";
import { getUpdatesFeed } from "@/lib/data/updates";
import UpdatesPageClient from "@/components/updates/UpdatesPageClient";
import type { UpdateItem } from "@/hooks/useUpdates";
import { siteIcons, siteOpenGraph, siteTwitter } from "@/lib/constants/metadata";

export const metadata: Metadata = {
  title: "Noticias y Actualizaciones | Devurity",
  description:
    "Mantente al día con las últimas noticias, eventos y logros del semillero de investigación Devurity.",
  icons: siteIcons,
  openGraph: {
    ...siteOpenGraph,
    title: "Noticias y Actualizaciones | Devurity",
    description:
      "Mantente al día con las últimas noticias, eventos y logros del semillero Devurity.",
    url: "/updates",
  },
  twitter: siteTwitter,
};

// Forzar render dinámico para cargar updates en vivo desde la DB
export const dynamic = "force-dynamic";

export default async function UpdatesPage() {
  let initialData: UpdateItem[] = [];

  try {
    const dbUpdates = await getUpdatesFeed();
    initialData = dbUpdates.map((u) => ({
      id: u.id,
      title: u.title,
      excerpt: u.excerpt,
      publishedAt: u.publishedAt,
      displayDate: u.displayDate,
      href: u.href,
      tags: u.tags,
      borderColor: u.borderColor,
    }));
  } catch (error) {
    console.error("[UpdatesPage] Error al cargar actualizaciones desde la DB:", error);
  }

  return <UpdatesPageClient initialData={initialData} />;
}
