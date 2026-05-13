"use client";

import { useState } from "react";

import AuditForm from "@/components/forms/AuditForm";
import StatsCard from "@/components/results/StatsCard";
import RecommendationCard from "@/components/results/RecommendationCard";
import EmptyState from "@/components/results/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { AuditResult, AuditToolEntry, PrimaryUseCase } from "@/types/audit";
import { runAudit } from "@/lib/audit/runAudit";
import { generateSummary } from "@/lib/audit/generateSummary";

export default function AuditPage() {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAudit = async (
    entries: AuditToolEntry[],
    teamSize: number,
    primaryUseCase: PrimaryUseCase | ""
  ) => {
    setLoading(true);

    const auditResult = runAudit(entries);

    // Run math + AI summary in parallel; summary has its own fallback
    const summary = await generateSummary({
      tools: entries,
      teamSize,
      primaryUseCase,
      result: auditResult,
    });

    setResult({ ...auditResult, summary });
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
        <AuditForm
          onSubmit={handleAudit}
          loading={loading}
        />

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
            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-3">
              <StatsCard title="Monthly Spend" value={`$${result.totalMonthlySpend}`} />
              <StatsCard title="Estimated Savings" value={`$${result.estimatedSavings}`} color="emerald" />
              <StatsCard title="Stack Score" value={`${result.stackScore}/100`} color="blue" />
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