"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-white"
        >
          CostPilot
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            How It Works
          </a>

          <Link
            href="/audit"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Audit
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/audit"
          className="rounded-xl bg-emerald-500 px-5 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
        >
          Run Audit
        </Link>
      </div>
    </header>
  );
}