export interface Benchmark {
  stage: string;
  avgMonthlyAISpend: number;
  avgSpendPerEmployee: number;
  recommendedToolCount: number;
}

export const benchmarks: Benchmark[] = [
  {
    stage: "Indie Hacker",
    avgMonthlyAISpend: 50,
    avgSpendPerEmployee: 25,
    recommendedToolCount: 2,
  },
  {
    stage: "Seed Startup",
    avgMonthlyAISpend: 500,
    avgSpendPerEmployee: 40,
    recommendedToolCount: 4,
  },
  {
    stage: "Series A",
    avgMonthlyAISpend: 2500,
    avgSpendPerEmployee: 85,
    recommendedToolCount: 6,
  },
  {
    stage: "Series B+",
    avgMonthlyAISpend: 10000,
    avgSpendPerEmployee: 140,
    recommendedToolCount: 10,
  },
];