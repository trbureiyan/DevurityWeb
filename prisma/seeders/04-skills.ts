import type { PrismaClient } from "../../lib/generated/prisma";

const SKILLS = [
  // Languages
  "Python", "JavaScript", "Java", "C", "C++", "C#", "SQL", "TypeScript",
  "PHP", "Go", "Swift", "Kotlin", "Ruby", "R", "Dart", "MATLAB",
  "Shell (Bash)", "Assembly Language", "Objective-C", "Visual Basic (.NET)",
  "Lua", "Rust",
  // Frameworks / Libraries
  "Django", "Flask", "FastAPI", "TensorFlow", "PyTorch",
  "React", "Next.js", "Express.js", "Vue.js", "Angular", "NestJS",
  "Spring Boot", "Qt", "Boost", "Unreal Engine",
  ".NET", "ASP.NET Core", "Unity",
  "Laravel", "Symfony", "CodeIgniter",
  "Gin", "Fiber", "Echo",
  "SwiftUI", "Vapor",
  "Ktor", "Jetpack Compose",
  "Ruby on Rails",
  "Shiny", "ggplot2", "tidyverse",
  "Flutter",
  "Simulink", "Deep Learning Toolbox",
  "NASM", "MASM", "GAS",
  "Cocoa", "Cocoa Touch",
  ".NET Framework", ".NET Core",
  "LÖVE2D", "Solar2D",
  // Cloud & DevOps
  "Cloud Computing", "AWS", "Azure", "Google Cloud", "DigitalOcean", "Vercel", "Netlify",
  "DevOps", "Docker", "Kubernetes", "CI/CD", "Jenkins", "GitHub Actions",
  // Security
  "Ciberseguridad", "Pentesting", "OWASP", "Seguridad de APIs", "Hardening", "Firewalls",
  // AI / Data
  "Inteligencia Artificial", "Machine Learning", "Deep Learning", "NLP",
  "Computer Vision", "Data Science",
  // General domains
  "Mobile Development", "Frontend Development", "Backend Development",
  "Blockchain / Web3", "Testing / QA",
  // Testing tools
  "Jest", "Cypress", "Selenium", "Playwright",
  // Databases
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase",
  // Design / UI
  "Figma", "Adobe XD",
  "Tailwind CSS", "Material UI", "Bootstrap", "Chakra UI",
  "Bulma", "Foundation", "Ant Design", "Semantic UI", "jQuery",
  // Protocols / APIs
  "REST", "GraphQL", "gRPC", "WebSockets", "SOAP",
];

export async function seedSkills(prisma: PrismaClient) {
  let created = 0;
  let skipped = 0;

  for (const name of SKILLS) {
    const existing = await prisma.skills.findFirst({ where: { name } });
    if (existing) {
      skipped++;
      continue;
    }
    await prisma.skills.create({ data: { name } });
    created++;
  }

  console.log(
    `✅ Skills: ${created} created, ${skipped} already existed`,
  );
}
