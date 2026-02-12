import Link from "next/link";
import { Facebook, Instagram, Github } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        {/* Left */}
        <p className="text-sm text-zinc-600">
          © {year} <span className="font-semibold text-zinc-800">CanCook</span>.
          All rights reserved.
        </p>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link
            href="/github"
            className="text-zinc-500 hover:text-black transition-colors"
          >
            <Github size={20} />
          </Link>

          <Link
            href="/facebook"
            className="text-zinc-500 hover:text-sky-600 transition-colors"
          >
            <Facebook size={20} />
          </Link>

          <Link
            href="/instagram"
            className="text-zinc-500 hover:text-orange-600 transition-colors"
          >
            <Instagram size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
