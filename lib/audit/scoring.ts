import { AuditToolEntry } from "@/types/audit";

export function calculateStackScore(
  tools: AuditToolEntry[]
): number {
  let score = 100;

  // Total monthly spend
  const totalSpend = tools.reduce(
    (sum, tool) => sum + tool.monthlySpend,
    0
  );

  // Too many tools penalty
  if (tools.length > 5) {
    score -= 15;
  }

  // Expensive stack penalty
  if (totalSpend > 500) {
    score -= 20;
  }

  // Very expensive stack
  if (totalSpend > 1000) {
    score -= 10;
  }

  // Duplicate assistant penalty
  const assistantTools = tools.filter((tool) =>
    ["chatgpt", "claude", "gemini"].includes(tool.toolId)
  );

  if (assistantTools.length > 1) {
    score -= 15;
  }

  // Too many coding tools penalty
  const codingTools = tools.filter((tool) =>
    ["cursor", "replit", "bolt", "v0"].includes(
      tool.toolId
    )
  );

  if (codingTools.length > 2) {
    score -= 15;
  }

  // Enterprise overkill penalty
  const expensivePlans = tools.filter((tool) =>
    ["team", "business", "enterprise"].some((keyword) =>
      tool.planName.toLowerCase().includes(keyword)
    )
  );

  if (expensivePlans.length >= 2) {
    score -= 15;
  }

  // Reward lean stacks
  if (tools.length <= 3 && totalSpend < 200) {
    score += 5;
  }

  return Math.min(Math.max(score, 10), 100);
}