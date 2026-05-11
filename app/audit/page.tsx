import { startupAuditStack } from "@/data/mockAudit";

import { runAudit } from "@/lib/audit/runAudit";

import SummaryCard from "@/components/results/SummaryCard";
import RecommendationCard from "@/components/results/RecommendationCard";

export default function AuditPage() {
  const audit = runAudit(startupAuditStack);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4">
            CostPilot Audit Report
          </h1>

          <p className="text-zinc-400 text-lg">
            AI stack spend analysis for startups
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <SummaryCard
            title="Monthly Spend"
            value={`$${audit.totalMonthlySpend}`}
          />

          <SummaryCard
            title="Potential Savings"
            value={`$${audit.estimatedSavings}`}
            color="text-green-400"
          />

          <SummaryCard
            title="Stack Score"
            value={`${audit.stackScore}/100`}
            color="text-blue-400"
          />
        </div>

        {/* Recommendations */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Recommendations
          </h2>

          <div className="space-y-5">
            {audit.recommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}