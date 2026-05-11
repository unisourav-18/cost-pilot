export interface Plan {
  id: string;

  toolId: string;

  planName: string;

  billing: "monthly" | "yearly";

  monthlyPrice: number;

  yearlyPrice?: number;

  seatsIncluded?: number;

  creditsIncluded?: number;

  tokenLimit?: string;

  features: string[];

  enterprise?: boolean;
}

export const plans: Plan[] = [
  // =========================
  // ChatGPT
  // =========================

  {
    id: "chatgpt-free",

    toolId: "chatgpt",

    planName: "Free",

    billing: "monthly",

    monthlyPrice: 0,

    features: [
      "Basic access",
      "Limited usage",
    ],
  },

  {
    id: "chatgpt-plus",

    toolId: "chatgpt",

    planName: "Plus",

    billing: "monthly",

    monthlyPrice: 20,

    yearlyPrice: 240,

    features: [
      "GPT-5 access",
      "Higher limits",
      "Tools access",
    ],
  },

  // =========================
  // Claude
  // =========================

  {
    id: "claude-pro",

    toolId: "claude",

    planName: "Pro",

    billing: "monthly",

    monthlyPrice: 20,

    yearlyPrice: 240,

    features: [
      "More usage",
      "Research",
      "Projects",
    ],
  },

  {
    id: "claude-max",

    toolId: "claude",

    planName: "Max",

    billing: "monthly",

    monthlyPrice: 100,

    yearlyPrice: 1200,

    features: [
      "5x usage",
      "Priority access",
    ],
  },

  // =========================
  // Gemini
  // =========================

  {
    id: "gemini-ai-plus",

    toolId: "gemini",

    planName: "AI Plus",

    billing: "monthly",

    monthlyPrice: 399,

    yearlyPrice: 4788,

    features: [
      "Deep Research",
      "Gemini in Gmail",
      "200GB Storage",
    ],
  },
];