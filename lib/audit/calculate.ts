import { UserToolInput } from "./types";

export function calculateMonthlySpend(
  tools: UserToolInput[]
) {
  return tools.reduce(
    (total, tool) => total + tool.monthlySpend,
    0
  );
}

export function calculateYearlySpend(
  monthlySpend: number
) {
  return monthlySpend * 12;
}

export function calculatePerSeatCost(
  monthlySpend: number,
  seats: number
) {
  if (seats <= 0) return monthlySpend;

  return monthlySpend / seats;
}

export function estimateWastePercentage(
  usageLevel: "low" | "medium" | "high"
) {
  switch (usageLevel) {
    case "low":
      return 40;

    case "medium":
      return 15;

    case "high":
      return 0;

    default:
      return 0;
  }
}

export function estimateWastedSpend(
  monthlySpend: number,
  usageLevel: "low" | "medium" | "high"
) {
  const wastePercentage =
    estimateWastePercentage(usageLevel);

  return (monthlySpend * wastePercentage) / 100;
}

export function calculateTotalWastedSpend(
  tools: UserToolInput[]
) {
  return tools.reduce((total, tool) => {
    return (
      total +
      estimateWastedSpend(
        tool.monthlySpend,
        tool.usageLevel
      )
    );
  }, 0);
}

export function detectDuplicateCategories(
  tools: {
    category: string;
  }[]
) {
  const counts: Record<string, number> = {};

  tools.forEach((tool) => {
    counts[tool.category] =
      (counts[tool.category] || 0) + 1;
  });

  return Object.entries(counts)
    .filter(([_, count]) => count > 1)
    .map(([category]) => category);
}