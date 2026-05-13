export interface AuditRule {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  savingsPotential: number;
}

export const auditRules: AuditRule[] = [
  {
    id: "duplicate-ai-assistants",
    title: "Multiple AI assistants detected",
    description:
      "Your team is paying for multiple general-purpose AI assistants with overlapping functionality.",
    severity: "high",
    savingsPotential: 30,
  },
  {
    id: "unused-premium-plans",
    title: "Unused premium subscriptions",
    description:
      "Some users may be on premium tiers without utilizing advanced features.",
    severity: "medium",
    savingsPotential: 25,
  },
  {
    id: "high-cost-coding-stack",
    title: "High-cost AI coding stack",
    description:
      "Your engineering stack includes multiple premium AI coding platforms.",
    severity: "high",
    savingsPotential: 40,
  },
  {
    id: "annual-billing-opportunity",
    title: "Switch to annual billing",
    description:
      "You can reduce spend by switching from monthly to yearly billing.",
    severity: "low",
    savingsPotential: 15,
  },
];