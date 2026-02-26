import { IMAGES } from "@/public/images";
import { TeamMember } from "../types/team";

export const coreTeamMembers: TeamMember[] = [
  {
    name: "Brayan Toro Bustos",
    role: "Estudiante Ingeniería de Software",
    tagline: "| Frontend WebDev & DevOps |",
    description: "Líder y participante en el desarrollo de proyectos web.",
    imageSrc: IMAGES.team.brayan,
    imageAlt: "Brayan Toro",
    linkLabel: "LinkedIn",
    linkHref: "https://www.linkedin.com/in/trbureiyan/",
  },
  {
    name: "Alexander Lozada Caviedes",
    role: "Estudiante Ingeniería de Software",
    tagline: "| Backend WebDev & DB Engineer |",
    description: "Tutor de lenguajes y frameworks, usuario de Linux.",
    imageSrc: IMAGES.team.alex,
    imageAlt: "Alexander Lozada",
    linkLabel: "GitHub",
    linkHref: "https://github.com/Arekkazu",
  },
  {
    name: "Juan Camilo Mora Castañeda",
    role: "Estudiante Ingeniería de Software",
    tagline: "| T-Stack WebDev |",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imageSrc: IMAGES.team.mora,
    imageAlt: "Juan Camilo",
    linkLabel: "GitHub",
    linkHref: "https://github.com/JucaMora7",
  },
  {
    name: "Pablo Trujillo Artunduaga",
    role: "Estudiante Ingeniería de Software",
    tagline: "| Python Data Scientist |",
    description: "Científico de datos con Python.",
    imageSrc: "/api/placeholder/160/160",
    imageAlt: "Pablo Trujillo",
    linkLabel: "GitHub",
    linkHref: "https://github.com/PabloTrujilloArtunduaga",
    imageBgClass: "bg-yellow-100",
  },
];

export const supportingTeamMembers: TeamMember[] = [
  {
    name: "María López .",
    role: "Estudiante tecnología en desarrollo de software",
    tagline: "| Hacker Ética |",
    imageSrc: "/api/placeholder/160/160",
    imageAlt: "María López",
  },
  {
    name: "Carlos Gómez G",
    role: "Estudiante Ingeniería de Software",
    tagline: "| Cloud & Backend |",
    imageSrc: "/api/placeholder/160/160",
    imageAlt: "Carlos Gómez",
  },
  {
    name: "Andrés Castillo Polanco",
    role: "Estudiante Ingeniería de Software",
    tagline: "| Frontend & UX |",
    imageSrc: "/api/placeholder/160/160",
    imageAlt: "Andrés Castillo",
  },
];
