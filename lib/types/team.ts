import type { StaticImageData } from "next/image";

export type TeamMember = {
  name: string;
  role: string;
  tagline?: string;
  description?: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  linkLabel?: string;
  linkHref?: string;
  imageBgClass?: string;
};
