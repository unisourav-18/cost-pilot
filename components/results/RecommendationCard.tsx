import { AuditRecommendation } from "@/types/audit";

interface RecommendationCardProps {
  recommendation: AuditRecommendation;
}

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const severityStyles = {
    low: "border-blue-500/30 bg-blue-500/10",
    medium: "border-yellow-500/30 bg-yellow-500/10",
    high: "border-red-500/30 bg-red-500/10",
  };

  const badgeStyles = {
    low: "bg-blue-500/20 text-blue-300",
    medium: "bg-yellow-500/20 text-yellow-300",
    high: "bg-red-500/20 text-red-300",
  };

  return (
    <div
      className={`rounded-2xl border p-6 transition hover:scale-[1.01] ${severityStyles[recommendation.severity]}`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {recommendation.title}
          </h3>

          <p className="mt-2 text-sm text-zinc-300">
            {recommendation.description}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${badgeStyles[recommendation.severity]}`}
        >
          {recommendation.severity}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Recommendation
          </p>

          <p className="mt-1 text-sm text-zinc-200">
            {recommendation.recommendation}
          </p>
        </div>

        {recommendation.estimatedSavings && (
          <div className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3">
            <span className="text-sm text-zinc-300">
              Estimated Monthly Savings
            </span>

            <span className="text-lg font-bold text-emerald-400">
              ${recommendation.estimatedSavings}
            </span>
          </div>
        )}

        {recommendation.action && (
          <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Suggested Action
            </p>

            <p className="mt-1 text-sm text-white">
              {recommendation.action}
            </p>
          </div>
        )}

        {recommendation.alternatives &&
          recommendation.alternatives.length > 0 && (
            <div>
              <p className="mb-2 text-xs uppercase tracking-wide text-zinc-500">
                Alternatives
              </p>

              <div className="flex flex-wrap gap-2">
                {recommendation.alternatives.map((alt) => (
                  <span
                    key={alt}
                    className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}