import { AuditToolEntry, AuditResult } from "@/types/audit";
import { generateRecommendations } from "./recommendations";
import { calculateStackScore } from "./scoring";

export function runAudit(
  tools: AuditToolEntry[]
): AuditResult {
  let totalMonthlySpend = 0;
  let estimatedSavings = 0;

  const allRecommendations: AuditResult["recommendations"] = [];

  tools.forEach((tool) => {
    totalMonthlySpend += tool.monthlySpend;

    const recommendations =
      generateRecommendations({
        toolId: tool.toolId,
        currentPlan: tool.planName,
        monthlySpend: tool.monthlySpend,
        seats: tool.seats,
      });

    recommendations.forEach((rec) => {
      allRecommendations.push(rec);

      if (rec.estimatedSavings) {
        estimatedSavings += rec.estimatedSavings;
      }
    });
  });

  const stackScore = calculateStackScore(tools);

  return {
    totalMonthlySpend,
    estimatedSavings,
    recommendations: allRecommendations,
    stackScore,
  };
}