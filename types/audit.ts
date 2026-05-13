export interface AuditToolEntry {
  toolId: string;
  planName: string;

  monthlySpend: number;

  seats: number;

  billing?: "monthly" | "yearly";
}

export interface AuditRecommendation {
  id: string;

  type:
    | "duplicate_tools"
    | "unused_features"
    | "billing_optimization"
    | "tool_replacement"
    | "enterprise_overkill";

  title: string;

  description: string;

  severity: "low" | "medium" | "high";

  estimatedSavings?: number;

  recommendation: string;

  alternatives?: string[];

  action?: string;
}

export interface AuditResult {
  totalMonthlySpend: number;

  estimatedSavings: number;

  stackScore: number;

  recommendations: AuditRecommendation[];

  summary?: string;// ← new
}

export type PrimaryUseCase =
  | "coding"
  | "writing"
  | "data"
  | "research"
  | "mixed";

export interface AuditFormState {
  entries: AuditToolEntry[];
  teamSize: number;
  primaryUseCase: PrimaryUseCase | "";
}