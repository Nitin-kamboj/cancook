"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";
import Headers from "./header";

export default function LayoutShell({ children }) {
  const pathname = usePathname();

  const hideFooter = pathname === "/login" || pathname === "/register";

  return (
    <>
      {!hideFooter && <Headers />}

      <main className="flex-1">{children}</main>

      {!hideFooter && <Footer />}
    </>
  );
}
