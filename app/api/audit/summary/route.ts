import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 200,
        system:
          "You are a concise SaaS spend analyst. Your job is to write a short, personalized audit summary for a team's AI tool stack. Be direct, specific, and actionable. Never use filler phrases like 'In conclusion' or 'It's worth noting'. Write in second person ('Your team...').",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Anthropic API error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const summary =
      data.content?.find((b: { type: string }) => b.type === "text")?.text ?? null;

    return NextResponse.json({ summary });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}