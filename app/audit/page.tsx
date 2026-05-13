"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AuditForm from "@/components/forms/AuditForm";
import StatsCard from "@/components/results/StatsCard";
import RecommendationCard from "@/components/results/RecommendationCard";
import EmptyState from "@/components/results/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { AuditResult, AuditToolEntry, PrimaryUseCase } from "@/types/audit";
import { runAudit } from "@/lib/audit/runAudit";
import { generateSummary } from "@/lib/audit/generateSummary";
import { saveAudit } from "@/lib/audit/saveAudit";

export default function AuditPage() {
  const router = useRouter();
  const [result, setResult] = useState<AuditResult | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAudit = async (
    entries: AuditToolEntry[],
    teamSize: number,
    primaryUseCase: PrimaryUseCase | "",
  ) => {
    setLoading(true);
    setShareUrl(null);

    const auditResult = runAudit(entries);

    const summary = await generateSummary({
      tools: entries,
      teamSize,
      primaryUseCase,
      result: auditResult,
    });

    const finalResult = { ...auditResult, summary };
    setResult(finalResult);

    // Save to Supabase and get shareable ID
    const auditId = await saveAudit({
      tools: entries,
      teamSize,
      primaryUseCase,
      result: finalResult,
    });

    if (auditId) {
      setShareUrl(`/audit/${auditId}`);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">CostPilot AI Audit</h1>
          <p className="mt-3 text-zinc-400">
            Analyze your AI stack and discover optimization opportunities.
          </p>
        </div>

        {/* Form */}
        <AuditForm onSubmit={handleAudit} loading={loading} />

        {/* Loading */}
        {loading && (
          <div className="mt-12 rounded-3xl border border-white/10 bg-zinc-900/60 p-10">
            <LoadingSpinner />
            <p className="mt-4 text-center text-zinc-400">
              Analyzing your AI stack...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !result && <EmptyState />}

        {/* Results */}
        {!loading && result && (
          <div className="mt-12 space-y-10">
            {/* Share banner */}
            {shareUrl && (
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4">
                <p className="text-sm text-emerald-300">
                  Your audit has a shareable link:
                </p>
                <div className="flex items-center gap-3">
                  <code className="rounded-lg bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
                    {typeof window !== "undefined"
                      ? `${window.location.origin}${shareUrl}`
                      : shareUrl}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}${shareUrl}`,
                      );
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className={`rounded-lg px-3 py-1 text-sm font-medium transition ${
                      copied
                        ? "bg-zinc-700 text-emerald-400"
                        : "bg-emerald-500 text-black hover:bg-emerald-400"
                    }`}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-3">
              <StatsCard
                title="Monthly Spend"
                value={`$${result.totalMonthlySpend}`}
              />
              <StatsCard
                title="Estimated Savings"
                value={`$${result.estimatedSavings}`}
                color="emerald"
              />
              <StatsCard
                title="Stack Score"
                value={`${result.stackScore}/100`}
                color="blue"
              />
            </div>

            {/* AI Summary */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <h2 className="mb-3 text-lg font-semibold text-emerald-300">
                AI Summary
              </h2>
              <p className="leading-relaxed text-zinc-300">{result.summary}</p>
            </div>

            {/* Recommendations */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold">Recommendations</h2>
              <div className="grid gap-5">
                {result.recommendations.map((recommendation) => (
                  <RecommendationCard
                    key={recommendation.id}
                    recommendation={recommendation}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
