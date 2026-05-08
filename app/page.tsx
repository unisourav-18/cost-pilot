export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
            AI Spend Optimization Platform
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl">
            Stop Overspending on AI Tools
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            CostPilot audits your AI subscriptions and reveals hidden savings
            opportunities instantly.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="rounded-lg bg-foreground px-6 py-3 text-background">
              Start Free Audit
            </button>

            <button className="rounded-lg border px-6 py-3">
              View Example Report
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}