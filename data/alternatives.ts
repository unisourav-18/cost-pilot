export interface AlternativeMap {
  [key: string]: string[];
}

export const alternatives: AlternativeMap = {
  chatgpt: ["claude", "gemini"],
  claude: ["chatgpt", "gemini"],
  gemini: ["chatgpt", "claude"],

  cursor: ["replit", "bolt"],
  replit: ["cursor", "bolt"],

  v0: ["lovable", "bolt"],
  lovable: ["v0", "bolt"],
  bolt: ["v0", "lovable", "replit"],
};