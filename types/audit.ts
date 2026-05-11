export interface AuditToolEntry {
  toolId: string;
  planName: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditResult {
  totalMonthlySpend: number;
  estimatedSavings: number;
  recommendations: {
    type: "warning" | "saving" | "alternative";
    title: string;
    description: string;
    estimatedSavings?: number;
  }[];
  stackScore: number;
}