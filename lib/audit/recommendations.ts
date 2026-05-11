import { alternatives } from "@/data/alternatives";
import { auditRules } from "@/data/rules";

import { AuditRecommendation } from "@/types/audit";

export function generateRecommendations(
  toolIds: string[],
  totalSpend: number
): AuditRecommendation[] {
  const recommendations: AuditRecommendation[] = [];

  // Duplicate AI assistants
  const assistants = ["chatgpt", "claude", "gemini"];

  const usedAssistants = toolIds.filter((toolId) =>
    assistants.includes(toolId)
  );

  if (usedAssistants.length >= 2) {
    recommendations.push({
      id: "duplicate-assistants",

      type: "duplicate_tools",

      title: "Multiple AI assistants detected",

      description:
        "Your team is paying for multiple AI assistants with overlapping capabilities.",

      severity: "high",

      estimatedSavings: 40,

      recommendation:
        "Standardize around one primary AI assistant for most workflows.",

      alternatives: ["chatgpt", "claude", "gemini"],

      action: "Reduce overlapping subscriptions",
    });
  }

  // Expensive stack detection
  if (totalSpend > 300) {
    recommendations.push({
      id: "high-spend-stack",

      type: "unused_features",

      title: "AI stack spending is unusually high",

      description:
        "Your startup may be paying for more AI capacity than currently needed.",

      severity: "medium",

      estimatedSavings: 75,

      recommendation:
        "Audit inactive users, unused premium plans, and overlapping tools.",

      action: "Review premium subscriptions",
    });
  }

  // Annual billing opportunity
  recommendations.push({
    id: "annual-billing",

    type: "billing_optimization",

    title: "Switch to annual billing",

    description:
      "Several tools offer significant discounts on yearly plans.",

    severity: "low",

    estimatedSavings: 20,

    recommendation:
      "Move stable tools to annual billing for lower long-term costs.",

    action: "Compare yearly pricing",
  });

  // Tool replacement suggestions
  toolIds.forEach((toolId) => {
    const toolAlternatives = alternatives[toolId];

    if (toolAlternatives?.length) {
      recommendations.push({
        id: `alternative-${toolId}`,

        type: "tool_replacement",

        title: `Possible alternatives for ${toolId}`,

        description:
          "There may be more cost-efficient tools for your current workflow.",

        severity: "medium",

        estimatedSavings: 30,

        recommendation:
          "Evaluate alternative platforms with similar capabilities.",

        alternatives: toolAlternatives,

        action: "Compare alternatives",
      });
    }
  });

  // Rules-based recommendations
  auditRules.forEach((rule) => {
    recommendations.push({
      id: rule.id,

      type: "enterprise_overkill",

      title: rule.title,

      description: rule.description,

      severity: rule.severity,

      estimatedSavings: rule.savingsPotential,

      recommendation:
        "Review this area carefully to optimize operational AI costs.",

      action: "Review recommendation",
    });
  });

  return recommendations;
}