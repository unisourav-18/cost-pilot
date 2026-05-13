# CostPilot — Prompts Documentation

## AI Summary Prompt

**File:** `lib/audit/generateSummary.ts`  
**API Route:** `app/api/audit/summary/route.ts`  
**Model:** `claude-sonnet-4-20250514`  
**Max tokens:** 200

---

### System Prompt

```
You are a concise SaaS spend analyst. Your job is to write a short,
personalized audit summary for a team's AI tool stack. Be direct,
specific, and actionable. Never use filler phrases like "In conclusion"
or "It's worth noting". Write in second person ("Your team...").
```

### User Prompt Template

```
Write a ~100-word personalized audit summary for this team:

- Team size: {teamSize} people
- Primary use case: {primaryUseCase}
- Tools in use: {toolList} (e.g. ChatGPT Plus x5 seats, Cursor Pro x3 seats)
- Total monthly spend: ${totalMonthlySpend}
- Estimated savings identified: ${estimatedSavings}
- Stack score: {stackScore}/100
- Top recommendations: {topRecommendations}

Summarize the key inefficiencies, call out the most impactful saving
opportunity, and end with one concrete next step. Keep it under 110 words.
```

### Variables

| Variable | Source |
|---|---|
| `{teamSize}` | Form input — number of people on the team |
| `{primaryUseCase}` | Form input — coding / writing / data / research / mixed |
| `{toolList}` | Derived from entries — `toolId planName x{seats} seats` per tool |
| `{totalMonthlySpend}` | Sum of all `monthlySpend` values across entries |
| `{estimatedSavings}` | Sum of `estimatedSavings` across all recommendations |
| `{stackScore}` | Computed score 20–100 based on tool count, spend, recommendation count |
| `{topRecommendations}` | Titles of the top 3 recommendations joined by `;` |

---

### Prompt Design Decisions

**Why second person ("Your team...")?**  
Audit summaries read as actionable advice, not third-party analysis. Second person makes it feel personalized and direct rather than like a generic report.

**Why ~100 words and not longer?**  
The summary appears inline above the recommendations list. It needs to be scannable at a glance — long summaries get skipped. 100 words forces prioritization of the single most important insight.

**Why include team size and use case in the prompt?**  
The same spend profile means different things for a 3-person coding team vs a 50-person research org. Without this context the summary would be generic. These two fields are the primary personalization levers.

**Why cap at 200 max_tokens?**  
110-word target + some buffer. Prevents runaway responses while leaving room for the model to finish a sentence naturally.

---

### Fallback Behavior

If the Anthropic API call fails for any reason (network error, missing key, rate limit, non-200 response), the system falls back to a templated summary generated entirely in code:

```
Your team of {teamSize} is spending ${totalMonthlySpend}/month across
{toolCount} AI tool(s) primarily for {useCase} tasks, with a stack
efficiency score of {stackScore}/100. Our analysis identified
${estimatedSavings} in potential monthly savings across
{recommendationCount} optimization opportunities. The highest-impact
action is: {topRecommendation}. Review the recommendations below and
tackle the high-severity items first to reduce spend without disrupting
your workflow.
```

The fallback is intentionally conservative — it reads clearly, contains real numbers, and never exposes the fact that AI generation failed. The user experience is seamless either way.

---

### Where AI Is and Isn't Used

| Feature | Approach | Reason |
|---|---|---|
| Audit summary | AI (Anthropic API) | Personalization requires natural language synthesis across multiple variables |
| Recommendations | Hardcoded rules | Rule-based logic is deterministic, auditable, and cheaper. AI would add hallucination risk to financial advice |
| Stack scoring | Hardcoded formula | A score algorithm must be consistent and explainable — not model-dependent |
| Savings estimates | Hardcoded per recommendation | Numbers must be defensible and reproducible |