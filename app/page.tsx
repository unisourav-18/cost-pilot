import { Container } from "@/components/layout/container";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b">
        <Container className="py-24">
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

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-lg bg-foreground px-6 py-3 text-background transition-opacity hover:opacity-90">
                Start Free Audit
              </button>

              <button className="rounded-lg border px-6 py-3 transition-colors hover:bg-muted">
                View Example Report
              </button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}