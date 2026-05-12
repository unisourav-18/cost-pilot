"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">
        {/* Badge */}
        <div className="mb-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
          AI Spend Intelligence for Startups
        </div>

        {/* Heading */}
        <h1 className="max-w-5xl text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
          Stop Overspending
          <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            On AI Tools
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
          CostPilot audits your AI stack, detects overlapping subscriptions,
          identifies wasted spend, and recommends smarter alternatives instantly.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/audit"
            className="rounded-2xl bg-emerald-500 px-8 py-4 text-lg font-semibold text-black transition hover:scale-105 hover:bg-emerald-400"
          >
            Run Free Audit
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
          >
            View GitHub
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid w-full max-w-4xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-4xl font-black text-white">$12k+</h3>
            <p className="mt-2 text-zinc-400">
              Potential AI savings identified
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-4xl font-black text-white">40+</h3>
            <p className="mt-2 text-zinc-400">
              AI tools benchmarked
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-4xl font-black text-white">Instant</h3>
            <p className="mt-2 text-zinc-400">
              Audit recommendations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}