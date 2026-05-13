import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AuditRecommendation } from "@/types/audit";

interface AuditRow {
  id: string;
  created_at: string;
  total_monthly_spend: number;
  estimated_savings: number;
  stack_score: number;
  recommendations: AuditRecommendation[];
  summary: string;
  primary_use_case: string;
  team_size: number;
  tools: { toolId: string; planName: string; seats: number; monthlySpend: number }[];
}

async function getAudit(id: string): Promise<AuditRow | null> {
  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as AuditRow;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const audit = await getAudit(id);

  if (!audit) {
    return { title: "Audit Not Found — CostPilot" };
  }

  const title = `AI Stack Audit — $${audit.total_monthly_spend}/mo · Score ${audit.stack_score}/100`;
  const description = `This team could save $${audit.estimated_savings}/month. Stack efficiency score: ${audit.stack_score}/100. See the full AI tool audit on CostPilot.`;
  const url = `https://costpilot.vercel.app/audit/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "CostPilot",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SharedAuditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const audit = await getAudit(id);

  if (!audit) notFound();

  const severityColor = {
    high: "text-red-400 border-red-500/30 bg-red-500/10",
    medium: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    low: "text-zinc-400 border-white/10 bg-zinc-800",
  };

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl space-y-10">

        {/* Header */}
        <div>
          <div className="mb-2 text-sm font-medium text-emerald-400 uppercase tracking-widest">
            CostPilot — Shared Audit
          </div>
          <h1 className="text-3xl font-bold">AI Stack Audit Results</h1>
          <p className="mt-2 text-zinc-400 text-sm">
            {audit.team_size} person team · {audit.primary_use_case} use case ·{" "}
            {new Date(audit.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Monthly Spend", value: `$${audit.total_monthly_spend}` },
            { label: "Estimated Savings", value: `$${audit.estimated_savings}`, emerald: true },
            { label: "Stack Score", value: `${audit.stack_score}/100`, blue: true },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl border p-6 ${
                stat.emerald
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : stat.blue
                  ? "border-blue-500/20 bg-blue-500/5"
                  : "border-white/10 bg-zinc-900"
              }`}
            >
              <p className="text-sm text-zinc-400">{stat.label}</p>
              <p
                className={`mt-1 text-3xl font-bold ${
                  stat.emerald
                    ? "text-emerald-400"
                    : stat.blue
                    ? "text-blue-400"
                    : "text-white"
                }`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tools used (no PII) */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="mb-4 text-lg font-semibold">Tools Audited</h2>
          <div className="flex flex-wrap gap-2">
            {audit.tools.map((tool, i) => (
              <span
                key={i}
                className="rounded-lg border border-white/10 bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
              >
                {tool.toolId} · {tool.planName} · {tool.seats} seats
              </span>
            ))}
          </div>
        </div>

        {/* AI Summary */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <h2 className="mb-3 text-lg font-semibold text-emerald-300">
            AI Summary
          </h2>
          <p className="leading-relaxed text-zinc-300">{audit.summary}</p>
        </div>

        {/* Recommendations */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Recommendations</h2>
          <div className="space-y-4">
            {audit.recommendations.map((rec) => (
              <div
                key={rec.id}
                className={`rounded-2xl border p-5 ${severityColor[rec.severity]}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold">{rec.title}</h3>
                  <span className="shrink-0 rounded-full border px-2 py-0.5 text-xs capitalize">
                    {rec.severity}
                  </span>
                </div>
                <p className="mt-2 text-sm opacity-80">{rec.description}</p>
                <p className="mt-2 text-sm font-medium">{rec.recommendation}</p>
                {rec.estimatedSavings && (
                  <p className="mt-1 text-sm opacity-70">
                    Saves ~${rec.estimatedSavings}/mo
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6 text-center">
          <p className="text-zinc-400 text-sm mb-3">
            Want to audit your own AI stack?
          </p>
          
           <a href="/"
            className="inline-block rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
          >
            Run Your Own Audit {'\u2192'}
          </a>
        </div>

      </div>
    </main>
  );
}