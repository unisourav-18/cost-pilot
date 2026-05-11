import { AuditResult, AuditToolEntry } from "@/types/audit";

import { generateRecommendations } from "./recommendations";

export function runAudit(
  tools: AuditToolEntry[]
): AuditResult {
  const totalMonthlySpend = tools.reduce(
    (sum, tool) => sum + tool.monthlySpend,
    0
  );

  const toolIds = tools.map((tool) => tool.toolId);

  const recommendations = generateRecommendations(
    toolIds,
    totalMonthlySpend
  );

  const estimatedSavings = recommendations.reduce(
    (sum, rec) => sum + (rec.estimatedSavings || 0),
    0
  );

  // Basic stack efficiency scoring
  let stackScore = 100;

  if (toolIds.length >= 5) {
    stackScore -= 15;
  }

  if (totalMonthlySpend > 500) {
    stackScore -= 20;
  }

  if (recommendations.length > 6) {
    stackScore -= 10;
  }

  stackScore = Math.max(stackScore, 20);

  return {
    totalMonthlySpend,

    estimatedSavings,

    stackScore,

    recommendations,
  };
}