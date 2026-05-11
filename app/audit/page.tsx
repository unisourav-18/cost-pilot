"use client";

import { useState } from "react";

import AuditForm from "@/components/forms/AuditForm";
import SummaryCard from "@/components/results/SummaryCard";
import RecommendationCard from "@/components/results/RecommendationCard";

import { runAudit } from "@/lib/audit/runAudit";

import { AuditResult, AuditToolEntry } from "@/types/audit";

export default function AuditPage() {
  const [auditResult, setAuditResult] =
    useState<AuditResult | null>(null);

  const handleAudit = (entries: AuditToolEntry[]) => {
    const result = runAudit(entries);

    setAuditResult(result);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            CostPilot Audit Engine
          </h1>

          <p className="mt-4 text-zinc-400">
            Analyze your AI stack and identify overspending.
          </p>
        </div>

        <AuditForm onSubmit={handleAudit} />

        {auditResult && (
          <>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <SummaryCard
                title="Total Monthly Spend"
                value={`$${auditResult.totalMonthlySpend}`}
              />

              <SummaryCard
                title="Estimated Savings"
                value={`$${auditResult.estimatedSavings}`}
                color="text-emerald-400"
              />

              <SummaryCard
                title="Stack Score"
                value={`${auditResult.stackScore}/100`}
                color="text-yellow-400"
              />
            </div>

            <div className="mt-12">
              <h2 className="mb-6 text-3xl font-bold">
                Recommendations
              </h2>

              <div className="grid gap-6">
                {auditResult.recommendations.map(
                  (recommendation) => (
                    <RecommendationCard
                      key={recommendation.id}
                      recommendation={recommendation}
                    />
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}