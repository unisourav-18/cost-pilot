import { plans } from "@/data/plans";

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function yearlyCost(monthly: number) {
  return monthly * 12;
}

export function monthlyFromYearly(yearly: number) {
  return yearly / 12;
}

export function percentageSavings(
  current: number,
  optimized: number
) {
  if (current === 0) return 0;

  return Math.round(
    ((current - optimized) / current) * 100
  );
}

export function findPlanById(planId: string) {
  return plans.find((plan) => plan.id === planId);
}

export function groupByCategory<T extends { category: string }>(
  items: T[]
) {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }

    acc[item.category].push(item);

    return acc;
  }, {} as Record<string, T[]>);
}