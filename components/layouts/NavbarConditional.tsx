"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

// rutas donde el chrome del sitio (Navbar/Footer) no debe aparecer
const HIDDEN_PATHS = ["/admin", "/auth"];

export default function NavbarConditional() {
  const pathname = usePathname();
  const shouldHide = HIDDEN_PATHS.some(
    (path) => pathname === path || pathname?.startsWith(`${path}/`),
  );
  if (shouldHide) return null;
  return <Navbar />;
}
