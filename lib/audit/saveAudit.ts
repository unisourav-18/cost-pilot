import { supabase } from "@/lib/supabase";
import { AuditResult, AuditToolEntry, PrimaryUseCase } from "@/types/audit";

interface SaveAuditInput {
  tools: AuditToolEntry[];
  teamSize: number;
  primaryUseCase: PrimaryUseCase | "";
  result: AuditResult;
}

export async function saveAudit(input: SaveAuditInput): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("audits")
      .insert({
        tools: input.tools,
        team_size: input.teamSize,
        primary_use_case: input.primaryUseCase || "general",
        total_monthly_spend: input.result.totalMonthlySpend,
        estimated_savings: input.result.estimatedSavings,
        stack_score: input.result.stackScore,
        recommendations: input.result.recommendations,
        summary: input.result.summary,
      })
      .select("id")
      .single();

    if (error) throw error;
    return data.id as string;
  } catch (err) {
    console.error("Failed to save audit:", err);
    return null;
  }
}