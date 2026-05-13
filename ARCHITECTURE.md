# CostPilot — Architecture

## System Diagram

```mermaid
flowchart TD
    A([User]) -->|Fills form| B[AuditForm\napp/audit/page.tsx]
    B -->|Persists on change| C[(localStorage\nDraft State)]
    C -->|Rehydrates on mount| B

    B -->|onSubmit: entries + teamSize + useCase| D[runAudit\nlib/audit/runAudit.ts]
    D -->|toolIds + totalSpend| E[generateRecommendations\nlib/audit/recommendations.ts]
    E -->|AuditRecommendation[]| D
    D -->|AuditResult| F[generateSummary\nlib/audit/generateSummary.ts]

    F -->|POST /api/audit/summary| G[API Route\napp/api/audit/summary/route.ts]
    G -->|Anthropic Messages API| H[[Claude\nclaude-sonnet-4-20250514]]
    H -->|~100-word summary| G
    G -->|summary string| F
    F -->|fallback if error| F

    F -->|finalResult + summary| I[saveAudit\nlib/audit/saveAudit.ts]
    I -->|INSERT row| J[(Supabase\naudits table)]
    J -->|uuid| I
    I -->|auditId| B

    B -->|Renders results + share URL| A

    K([Visitor]) -->|GET /audit/uuid| L[Shared Page\napp/audit/id/page.tsx]
    L -->|SELECT by id| J
    J -->|AuditRow| L
    L -->|SSR HTML + OG tags| K
```

---

## Data Flow

### Step 1 — Form Input
The user fills in `AuditForm` with one or more tool entries (tool, plan, monthly spend, seats), plus team size and primary use case. Every keystroke is serialized to `localStorage` under the key `audit-form-state` so the draft survives page reloads.

### Step 2 — Audit Math
On submit, `runAudit()` receives the filtered entries and runs purely deterministic logic:

```
totalMonthlySpend  = Σ entry.monthlySpend
recommendations    = generateRecommendations(toolIds, totalMonthlySpend)
estimatedSavings   = Σ recommendation.estimatedSavings
stackScore         = 100
                   − 15  if tools ≥ 5
                   − 20  if spend > $500/mo
                   − 10  if recommendations > 6
                   (floor: 20)
```

No AI is involved here. The rules are hardcoded, consistent, and auditable.

### Step 3 — AI Summary
`generateSummary()` builds a prompt from the audit result and POSTs it to the internal API route `/api/audit/summary`. The route forwards it to the Anthropic Messages API with a system prompt and returns the generated text. If anything fails (network, missing key, non-200), a templated fallback string is returned instead — the user never sees an error.

### Step 4 — Persistence
`saveAudit()` inserts the complete audit into Supabase (tools, team size, use case, scores, recommendations, summary) and receives back a UUID. This UUID becomes the shareable URL path: `/audit/{uuid}`.

### Step 5 — Shareable Page
`app/audit/[id]/page.tsx` is a server-rendered page. On load it fetches the audit row from Supabase by UUID, renders the results (no PII shown), and injects Open Graph + Twitter Card meta tags server-side so link previews work on Slack, Twitter, and LinkedIn without any client-side rendering.

---

## Why This Stack

| Decision | Choice | Reason |
|---|---|---|
| **Framework** | Next.js 15 App Router | SSR for the shared audit page (OG tags require server-rendered meta); API routes keep the Anthropic key server-side; single repo for frontend + backend |
| **Language** | TypeScript | The audit data model flows through 6+ files — strong typing catches shape mismatches at compile time rather than runtime |
| **Styling** | Tailwind CSS | No context switching between component files and stylesheets; dark UI with consistent design tokens is fast to build utility-first |
| **Database** | Supabase (Postgres) | Managed Postgres with a JS client and zero ops overhead; free tier handles the current load; sets up the schema for lead capture without additional infrastructure |
| **AI Model** | Claude Sonnet via Anthropic API | Best instruction-following for structured summarization tasks; predictable output length via `max_tokens`; called server-side only so the key never reaches the browser |
| **Deployment** | Vercel | Zero-config Next.js deploys; edge network for low latency; environment variable management built in; preview URLs per branch |

---

## What Would Change at 10,000 Audits/Day

### Current bottlenecks at scale

**1. Anthropic API latency blocks the request**
Right now `generateSummary()` is called inline — the user waits for the AI response before seeing results. At 10k audits/day (~7 req/min average, with spikes much higher) this becomes a latency and rate-limit problem.

**Fix:** Decouple the summary from the audit result. Show the math results immediately, then stream the AI summary into the page asynchronously. Use a job queue (e.g. Inngest, Trigger.dev, or a simple Supabase Edge Function) to process summaries out of band. Store the result back to the `audits` row when done.

**2. Supabase free tier connection limits**
The free tier allows 50 concurrent connections. At 10k audits/day with spikes, direct client connections from Vercel serverless functions can exhaust this pool.

**Fix:** Add a connection pooler — Supabase provides Supavisor (built-in pgBouncer) on paid plans. Switch the client to use the pooled connection string instead of the direct URL.

**3. No caching on the shared audit page**
Every visit to `/audit/[id]` hits Supabase. At scale this adds unnecessary read load.

**Fix:** Add `revalidate` cache headers to the shared page. Audit results never change after creation, so they can be cached at the CDN edge indefinitely:
```typescript
export const revalidate = false; // cache forever
```

**4. No rate limiting on the summary API route**
`/api/audit/summary` is publicly callable. Anyone could spam it to burn through the Anthropic API key.

**Fix:** Add rate limiting per IP using Vercel's `@vercel/kv` (Redis) or an edge middleware with Upstash. Limit to e.g. 10 requests/hour per IP before the lead capture feature (feature 5) provides user identity for tighter per-account limits.

**5. localStorage doesn't scale to multiple devices or users**
Form persistence is device-local. At scale with returning users this becomes a friction point.

**Fix:** Once auth is introduced (natural next step after lead capture), migrate draft state to a `drafts` table in Supabase, keyed by user ID. localStorage becomes a fast local cache that syncs on login.

### Revised architecture at 10k/day

```mermaid
flowchart TD
    A([User]) --> B[AuditForm]
    B --> C[runAudit — sync]
    C --> D[Show results immediately]
    C --> E[Enqueue summary job]
    E --> F[Job Queue\nInngest / Trigger.dev]
    F --> G[Anthropic API]
    G --> H[Update audits row]
    H --> I[Stream summary to client\nvia polling or SSE]
    D --> J[saveAudit to Supabase\nvia connection pooler]
    J --> K[Return UUID]
    K --> L[Share URL]

    M([Visitor]) --> N[/audit/id — cached at CDN edge]
```