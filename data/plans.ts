export interface Plan {
  toolId: string;
  planName: string;
  billing: "monthly" | "yearly";
  monthlyPrice: number;
  seatsIncluded?: number;
  creditsIncluded?: number;
  tokenLimit?: string;
  features: string[];
  enterprise?: boolean;
}

export const plans: Plan[] = [
  // ChatGPT
  {
    toolId: "chatgpt",
    planName: "Free",
    billing: "monthly",
    monthlyPrice: 0,
    features: ["Basic access", "Limited usage"],
  },
  {
    toolId: "chatgpt",
    planName: "Plus",
    billing: "monthly",
    monthlyPrice: 20,
    features: ["GPT-5 access", "Higher limits", "Tools access"],
  },

  // Claude
  {
    toolId: "claude",
    planName: "Pro",
    billing: "monthly",
    monthlyPrice: 20,
    features: ["More usage", "Research", "Projects"],
  },
  {
    toolId: "claude",
    planName: "Max",
    billing: "monthly",
    monthlyPrice: 100,
    features: ["5x usage", "Priority access"],
  },

  // Gemini
  {
    toolId: "gemini",
    planName: "AI Plus",
    billing: "monthly",
    monthlyPrice: 399,
    features: ["Deep Research", "Gemini in Gmail", "200GB Storage"],
  },

];