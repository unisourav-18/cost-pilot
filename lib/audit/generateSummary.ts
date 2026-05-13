import { AuditResult, AuditToolEntry, PrimaryUseCase } from "@/types/audit";

interface SummaryInput {
  tools: AuditToolEntry[];
  teamSize: number;
  primaryUseCase: PrimaryUseCase | "";
  result: AuditResult;
}

function buildPrompt(input: SummaryInput): string {
  const { tools, teamSize, primaryUseCase, result } = input;

  const toolList = tools
    .map((t) => `${t.toolId} ${t.planName} x${t.seats} seats`)
    .join(", ");

  const topRecs = result.recommendations
    .slice(0, 3)
    .map((r) => r.title)
    .join("; ");

  return `Write a ~100-word personalized audit summary for this team:

- Team size: ${teamSize} people
- Primary use case: ${primaryUseCase || "general"}
- Tools in use: ${toolList}
- Total monthly spend: $${result.totalMonthlySpend}
- Estimated savings identified: $${result.estimatedSavings}
- Stack efficiency score: ${result.stackScore}/100
- Top recommendations: ${topRecs}

Summarize the key inefficiencies, call out the most impactful saving opportunity, and end with one concrete next step. Keep it under 110 words.`;
}

function fallbackSummary(input: SummaryInput): string {
  const { tools, teamSize, primaryUseCase, result } = input;
  const useCase = primaryUseCase || "general";
  const topRec = result.recommendations[0];

  return `Your team of ${teamSize} is spending $${result.totalMonthlySpend}/month across ${tools.length} AI tool${tools.length !== 1 ? "s" : ""} primarily for ${useCase} tasks, with a stack efficiency score of ${result.stackScore}/100. Our analysis identified $${result.estimatedSavings} in potential monthly savings across ${result.recommendations.length} optimization opportunities.${topRec ? ` The highest-impact action is: ${topRec.recommendation}.` : ""} Review the recommendations below and tackle the high-severity items first to reduce spend without disrupting your workflow.`;
}

export async function generateSummary(
  input: SummaryInput
): Promise<string> {
  try {
    const response = await fetch("/api/audit/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: buildPrompt(input),
      }),
    });

    if (!response.ok) throw new Error("API route failed");

    const data = await response.json();
    return data.summary ?? fallbackSummary(input);
  } catch {
    return fallbackSummary(input);
  }
}