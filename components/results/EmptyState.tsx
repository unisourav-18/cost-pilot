export default function EmptyState() {
  return (
    <div className="mt-12 rounded-3xl border border-dashed border-white/10 bg-zinc-900/50 p-12 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 text-4xl">
        🚀
      </div>

      <h2 className="mt-6 text-2xl font-bold text-white">
        Ready to audit your AI stack
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
        Add your AI tools, plans, and monthly spend to discover
        optimization opportunities, reduce unnecessary costs,
        and improve your stack efficiency.
      </p>

      <div className="mt-8 grid gap-4 text-left md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <h3 className="font-semibold text-white">
            Cost Analysis
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            Track total AI spending across your startup stack.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <h3 className="font-semibold text-white">
            Smart Recommendations
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            Detect duplicate tools and identify savings.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <h3 className="font-semibold text-white">
            Stack Optimization
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            Improve your AI efficiency with actionable insights.
          </p>
        </div>
      </div>
    </div>
  );
}