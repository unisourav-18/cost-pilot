import { PrimaryUseCase } from "@/types/audit";

export interface ToolOption {
  id: string;
  name: string;
}

export const toolOptions: ToolOption[] = [
  { id: "chatgpt", name: "ChatGPT" },
  { id: "claude", name: "Claude" },
  { id: "gemini", name: "Gemini" },
  { id: "cursor", name: "Cursor" },
  { id: "v0", name: "v0" },
  { id: "lovable", name: "Lovable" },
  { id: "replit", name: "Replit" },
  { id: "bolt", name: "Bolt" },
];

export const planOptions: Record<string, string[]> = {
  chatgpt: ["Free", "Plus", "Pro", "Team"],
  claude: ["Free", "Pro", "Max", "Team"],
  gemini: ["Free", "AI Plus"],
  cursor: ["Hobby", "Pro", "Pro+", "Ultra", "Teams"],
  v0: ["Free", "Team", "Business"],
  lovable: ["Free", "Pro", "Business"],
  replit: ["Starter", "Core", "Pro"],
  bolt: ["Free", "Pro", "Teams"],
};


export const useCaseOptions: { id: PrimaryUseCase; label: string }[] = [
  { id: "coding",    label: "Coding" },
  { id: "writing",   label: "Writing" },
  { id: "data",      label: "Data" },
  { id: "research",  label: "Research" },
  { id: "mixed",     label: "Mixed" },
];