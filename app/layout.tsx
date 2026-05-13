import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CostPilot — AI Spend Audit for Startups",

  description:
    "Analyze your AI stack, detect overspending, and discover smarter AI tool optimizations with CostPilot.",

  keywords: [
    "AI audit",
    "AI spend optimizer",
    "startup SaaS",
    "AI cost optimization",
    "OpenAI pricing",
    "AI stack analysis",
    "CostPilot",
  ],

  authors: [
    {
      name: "Sourav Pandey",
    },
  ],

  creator: "Sourav Pandey",

  openGraph: {
    title: "CostPilot — AI Spend Audit",
    description:
      "Audit your AI stack and optimize SaaS spending.",
    siteName: "CostPilot",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CostPilot — AI Spend Audit",
    description:
      "Optimize your AI stack and reduce SaaS waste.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}