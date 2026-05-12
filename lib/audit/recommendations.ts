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
        "Your team is currently paying for multiple AI assistants that overlap heavily in features and workflows.",

      severity: "high",

      estimatedSavings: 40,

      recommendation:
        "Choose one primary assistant and remove overlapping subscriptions.",

      alternatives: ["chatgpt", "claude", "gemini"],

      action: "Reduce overlapping subscriptions",
    });
  }

  // High spend detection
  if (totalSpend > 300) {
    recommendations.push({
      id: "high-spend-stack",

      type: "unused_features",

      title: "AI stack spending is unusually high",

      description:
        "Your current monthly AI tooling spend is high for a startup-sized workflow.",

      severity: "high",

      estimatedSavings: 75,

      recommendation:
        "Audit inactive seats, remove duplicate tools, and downgrade unused premium plans.",

      action: "Review premium subscriptions",
    });
  }

  // Too many AI coding tools
  const codingTools = ["cursor", "replit", "bolt", "v0"];

  const usedCodingTools = toolIds.filter((toolId) =>
    codingTools.includes(toolId)
  );

  if (usedCodingTools.length > 2) {
    recommendations.push({
      id: "too-many-coding-tools",

      type: "unused_features",

      title: "Too many AI coding tools detected",

      description:
        "Your engineering team may be paying for multiple overlapping AI development platforms.",

      severity: "medium",

      estimatedSavings: 50,

      recommendation:
        "Standardize your workflow around fewer core development tools.",

      action: "Consolidate engineering stack",
    });
  }

  // Annual billing optimization
  recommendations.push({
    id: "annual-billing",

    type: "billing_optimization",

    title: "Switch to annual billing",

    description:
      "Several tools in your stack provide discounts on annual billing plans.",

    severity: "low",

    estimatedSavings: 20,

    recommendation:
      "Move stable long-term tools to yearly subscriptions to reduce costs.",

    action: "Compare yearly pricing",
  });

  // Enterprise overkill
  if (totalSpend < 150 && toolIds.includes("lovable")) {
    recommendations.push({
      id: "enterprise-overkill",

      type: "enterprise_overkill",

      title: "Enterprise-grade tooling may be unnecessary",

      description:
        "Some advanced collaboration and governance features may not yet be needed for your current scale.",

      severity: "medium",

      estimatedSavings: 35,

      recommendation:
        "Consider simpler plans until your team scales further.",

      action: "Review advanced subscriptions",
    });
  }

  // Tool alternatives
  toolIds.forEach((toolId) => {
    const toolAlternatives = alternatives[toolId];

    if (toolAlternatives?.length) {
      recommendations.push({
        id: `alternative-${toolId}`,

        type: "tool_replacement",

        title: `Possible alternatives for ${toolId}`,

        description:
          "There may be cheaper or more efficient tools that fit your workflow.",

        severity: "low",

        recommendation:
          `Consider evaluating: ${toolAlternatives.join(", ")}`,

        alternatives: toolAlternatives,

        action: "Compare alternatives",
      });
    }
  });

  // Rules-based recommendations
  auditRules.forEach((rule) => {
    recommendations.push({
      id: rule.id,

      type: "unused_features",

      title: rule.title,

      description: rule.description,

      severity: rule.severity,

      estimatedSavings: rule.savingsPotential,

      recommendation:
        "Review this area carefully to optimize AI operational costs.",

      action: "Review recommendation",
    });
  });

  return recommendations;
}