import type { Metadata } from "next";

export const SITE_NAME = "Devurity";
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://devurityweb.vercel.app";

export const siteIcons: NonNullable<Metadata["icons"]> = {
  icon: [
    { url: "/favicon.ico" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  ],
  apple: "/apple-touch-icon.png",
  shortcut: "/favicon.ico",
  other: [
    { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
    { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
  ],
};

export const siteOpenGraph: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  siteName: SITE_NAME,
  locale: "es_CO",
};

export const siteTwitter: NonNullable<Metadata["twitter"]> = {
  card: "summary_large_image",
  site: "@DevurityUSCO",
};
