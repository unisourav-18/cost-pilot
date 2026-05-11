import { AuditRecommendation } from "@/types/audit";

interface RecommendationCardProps {
  recommendation: AuditRecommendation;
}

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {recommendation.title}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            recommendation.severity === "high"
              ? "bg-red-500/20 text-red-400"
              : recommendation.severity === "medium"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {recommendation.severity}
        </span>
      </div>

      <p className="mt-3 text-sm text-zinc-400">
        {recommendation.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-zinc-500">
          Estimated Savings
        </span>

        <span className="text-lg font-bold text-emerald-400">
          ${recommendation.estimatedSavings}
        </span>
      </div>
    </div>
  );
}