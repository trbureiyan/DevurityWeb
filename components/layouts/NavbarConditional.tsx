"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarConditional() {
  const pathname = usePathname();

  // Don't show Navbar for admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <Navbar />;
}
