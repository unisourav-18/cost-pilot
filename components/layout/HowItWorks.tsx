export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Add Your AI Stack",
      description:
        "Enter the AI tools your startup currently uses including plans, seats, and monthly spend.",
    },

    {
      number: "02",
      title: "Run Intelligent Audit",
      description:
        "CostPilot analyzes overlapping subscriptions, unused premium features, and inefficient billing setups.",
    },

    {
      number: "03",
      title: "Get Savings Insights",
      description:
        "Receive actionable recommendations, alternative tools, and estimated monthly savings instantly.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="border-b border-white/10 bg-zinc-950 py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
            HOW IT WORKS
          </p>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
            Audit Your AI Stack
            <span className="block text-zinc-400">In Minutes</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-zinc-500">
            CostPilot helps startups identify waste, optimize subscriptions, and
            reduce AI spending without slowing down teams.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:-translate-y-2 hover:border-emerald-500/30 hover:bg-white/[0.05]"
            >
              {/* Number */}
              <div className="text-6xl font-black text-white/10 transition group-hover:text-emerald-400/20">
                {step.number}
              </div>

              {/* Content */}
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-white">{step.title}</h3>

                <p className="mt-4 leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
