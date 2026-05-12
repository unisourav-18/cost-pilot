const features = [
  {
    title: "AI Spend Analysis",
    description:
      "Track and analyze how much your startup spends across AI subscriptions, APIs, and developer tools.",
  },

  {
    title: "Duplicate Tool Detection",
    description:
      "Identify overlapping AI platforms with similar functionality to reduce unnecessary subscriptions.",
  },

  {
    title: "Savings Recommendations",
    description:
      "Receive actionable recommendations with estimated monthly savings opportunities.",
  },

  {
    title: "Alternative Tool Suggestions",
    description:
      "Discover more cost-efficient AI tools that fit your workflow and business scale.",
  },

  {
    title: "Stack Health Score",
    description:
      "Get a performance-style score for your current AI stack efficiency and optimization level.",
  },

  {
    title: "Pricing Intelligence",
    description:
      "Benchmark plans, subscriptions, and enterprise pricing structures across modern AI platforms.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="border-b border-white/10 bg-black py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            FEATURES
          </p>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
            Everything You Need
            <span className="block text-zinc-400">To Optimize AI Spending</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-zinc-500">
            CostPilot combines pricing intelligence, AI stack analysis, and
            recommendation systems into one unified audit platform.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:-translate-y-2 hover:border-cyan-500/30 hover:bg-white/[0.05]"
            >
              <div className="mb-6 h-12 w-12 rounded-2xl bg-cyan-500/10" />

              <h3 className="text-2xl font-bold text-white">{feature.title}</h3>

              <p className="mt-4 leading-relaxed text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
