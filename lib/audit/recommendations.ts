import { plans } from "@/data/plans";
import { alternatives } from "@/data/alternatives";
import { auditRules } from "@/data/rules";

export interface AuditInput {
  toolId: string;
  currentPlan: string;
  monthlySpend: number;
  seats: number;
}

export interface Recommendation {
  type: "warning" | "saving" | "alternative";
  title: string;
  description: string;
  estimatedSavings?: number;
}

export function generateRecommendations(
  input: AuditInput
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  const currentPlan = plans.find(
    (plan) =>
      plan.toolId === input.toolId &&
      plan.planName.toLowerCase() ===
        input.currentPlan.toLowerCase()
  );

  if (!currentPlan) {
    return recommendations;
  }

  // Overspending detection
  if (input.monthlySpend > currentPlan.monthlyPrice * 1.5) {
    recommendations.push({
      type: "warning",
      title: "Possible Overspending Detected",
      description:
        "Your spend appears significantly higher than your selected plan pricing.",
      estimatedSavings:
        input.monthlySpend - currentPlan.monthlyPrice,
    });
  }

  // Apply audit rules
  auditRules.forEach((rule) => {
    recommendations.push({
      type:
        rule.severity === "high"
          ? "warning"
          : "saving",

      title: rule.title,
      description: rule.description,
      estimatedSavings: rule.savingsPotential,
    });
  });

  // Alternative recommendations
  const toolAlternatives =
    alternatives[input.toolId] || [];

  toolAlternatives.forEach((alt: string) => {
    recommendations.push({
      type: "alternative",
      title: `Consider ${alt}`,
      description:
        `${alt} may provide similar functionality at a lower operational cost.`,
    });
  });

  return recommendations;
}