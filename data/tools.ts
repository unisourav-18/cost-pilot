export type ToolCategory =
  | "AI Assistant"
  | "AI Coding"
  | "AI App Builder"
  | "AI Workspace"
  | "AI Research"
  | "AI Video"
  | "AI Infrastructure";

export interface Tool {
  id: string;
  name: string;
  company: string;
  category: ToolCategory;
  pricingModel: "subscription" | "credits" | "api" | "hybrid";
  tags: string[];
  popular: boolean;
  enterpriseAvailable: boolean;
}

export const tools: Tool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    company: "OpenAI",
    category: "AI Assistant",
    pricingModel: "hybrid",
    tags: ["chatbot", "assistant", "productivity", "coding"],
    popular: true,
    enterpriseAvailable: true,
  },

  {
    id: "claude",
    name: "Claude",
    company: "Anthropic",
    category: "AI Assistant",
    pricingModel: "hybrid",
    tags: ["assistant", "writing", "analysis", "reasoning"],
    popular: true,
    enterpriseAvailable: true,
  },

  {
    id: "gemini",
    name: "Gemini",
    company: "Google",
    category: "AI Assistant",
    pricingModel: "subscription",
    tags: ["assistant", "workspace", "gmail", "docs"],
    popular: true,
    enterpriseAvailable: true,
  },

  {
    id: "cursor",
    name: "Cursor",
    company: "Cursor",
    category: "AI Coding",
    pricingModel: "subscription",
    tags: ["coding", "developer-tools", "ai-code-editor", "autocomplete"],
    popular: true,
    enterpriseAvailable: true,
  },

  {
    id: "v0",
    name: "v0",
    company: "Vercel",
    category: "AI App Builder",
    pricingModel: "credits",
    tags: ["ui", "frontend", "react", "app-builder"],
    popular: true,
    enterpriseAvailable: true,
  },

  {
    id: "lovable",
    name: "Lovable",
    company: "Lovable",
    category: "AI App Builder",
    pricingModel: "credits",
    tags: ["no-code", "app-builder", "startup", "design"],
    popular: true,
    enterpriseAvailable: true,
  },

  {
    id: "replit",
    name: "Replit",
    company: "Replit",
    category: "AI Coding",
    pricingModel: "credits",
    tags: ["coding", "cloud-dev", "deployment", "agent"],
    popular: true,
    enterpriseAvailable: true,
  },

  {
    id: "bolt",
    name: "Bolt",
    company: "Bolt",
    category: "AI App Builder",
    pricingModel: "subscription",
    tags: ["fullstack", "web-apps", "deployment", "ai-builder"],
    popular: true,
    enterpriseAvailable: true,
  },

  {
    id: "openai-api",
    name: "OpenAI API",
    company: "OpenAI",
    category: "AI Infrastructure",
    pricingModel: "api",
    tags: ["llm", "api", "gpt", "developers"],
    popular: true,
    enterpriseAvailable: true,
  },

  {
    id: "claude-api",
    name: "Claude API",
    company: "Anthropic",
    category: "AI Infrastructure",
    pricingModel: "api",
    tags: ["llm", "api", "reasoning", "developers"],
    popular: true,
    enterpriseAvailable: true,
  },
];