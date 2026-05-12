
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          START OPTIMIZING TODAY
        </p>

        <h2 className="mt-6 text-5xl font-black leading-tight text-white md:text-6xl">
          Your AI Stack
          <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Might Be Overpriced
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Run a free audit and discover hidden savings opportunities across
          your AI subscriptions, developer tools, and infrastructure stack.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/audit"
            className="rounded-2xl bg-emerald-500 px-8 py-4 text-lg font-semibold text-black transition hover:scale-105 hover:bg-emerald-400"
          >
            Run Free Audit
          </Link>

          <Link
            href="/audit"
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10"
          >
            Explore Demo
          </Link>
        </div>
      </div>
    </section>
  );
}