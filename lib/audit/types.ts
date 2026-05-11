export interface UserToolInput {
  toolId: string;
  planId: string;

  monthlySpend: number;

  seats: number;

  useCase: string;

  usageLevel:
    | "low"
    | "medium"
    | "high";

  billingCycle:
    | "monthly"
    | "yearly";
}

export interface AuditRecommendation {
  type:
    | "replace"
    | "downgrade"
    | "remove"
    | "annual-billing"
    | "consolidate";

  title: string;

  description: string;

  estimatedMonthlySavings: number;

  estimatedYearlySavings: number;

  priority:
    | "low"
    | "medium"
    | "high";
}

export interface AuditScores {
  efficiencyScore: number;

  redundancyScore: number;

  optimizationScore: number;
}

export interface AuditSummary {
  totalMonthlySpend: number;

  totalYearlySpend: number;

  estimatedSavingsMonthly: number;

  estimatedSavingsYearly: number;

  activeTools: number;
}

export interface AuditResult {
  summary: AuditSummary;

  scores: AuditScores;

  recommendations: AuditRecommendation[];
}