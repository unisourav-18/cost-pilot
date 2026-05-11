import { AuditToolEntry } from "@/types/audit";

export const startupAuditStack: AuditToolEntry[] = [
  {
    toolId: "chatgpt",
    planName: "Plus",
    monthlySpend: 20,
    seats: 5,
    billing: "monthly",
  },

  {
    toolId: "claude",
    planName: "Pro",
    monthlySpend: 20,
    seats: 3,
    billing: "monthly",
  },

  {
    toolId: "cursor",
    planName: "Pro",
    monthlySpend: 20,
    seats: 8,
    billing: "monthly",
  },

  {
    toolId: "replit",
    planName: "Core",
    monthlySpend: 20,
    seats: 4,
    billing: "monthly",
  },

  {
    toolId: "v0",
    planName: "Team",
    monthlySpend: 30,
    seats: 6,
    billing: "monthly",
  },

  {
    toolId: "lovable",
    planName: "Pro",
    monthlySpend: 25,
    seats: 2,
    billing: "monthly",
  },

  {
    toolId: "gemini",
    planName: "AI Pro",
    monthlySpend: 1950,
    seats: 2,
    billing: "monthly",
  },
];