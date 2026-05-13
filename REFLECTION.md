# CostPilot — Weekly Reflection

---

## 1. The Hardest Bug

The hardest bug of the week came from a feature I didn't plan for originally — the "Load Demo Data" button. I'd seen it recommended while exploring similar tools with ChatGPT and decided to add it to make the form easier to test. What looked like a two-line addition turned into the most frustrating debug session of the week.

The bug was a type mismatch. The demo data I had hardcoded didn't exactly match the shape of `AuditToolEntry` — a field was either missing or typed differently — and instead of the form loading cleanly, it would either crash silently or render in a broken state. My first hypothesis was that the problem was in how `onSubmit` was handling the entries, so I started making changes to the form's submit logic. That made things worse. I'd started editing the wrong layer entirely — the form handler wasn't the issue, the data shape going *into* the form was.

I lost confidence in the whole flow at that point. I thought I'd broken the audit pipeline. What brought me back was slowing down and tracing the data from the point it entered the system: the `loadDemo` function sets state directly, so I logged the demo object and compared it field-by-field against the TypeScript interface. That's when I spotted the mismatch. The fix was a one-line change in the demo data constant, not in the form at all.

The lesson: when something breaks, resist the urge to change things. Read first, hypothesize second, change last.

---

## 2. A Decision I Reversed

The original spec included a lead capture feature — email collection, transactional confirmation emails via Resend, and basic abuse protection like a honeypot or rate limiter. I planned to implement it after the shareable URL feature. Once both were done and the project was deployed, I went back to start on lead capture and got about 20 minutes in before I stopped.

I reversed the decision completely and shipped without it.

The reason was straightforward: lead capture done properly requires a Supabase `leads` table, an email provider integration, a server-side form handler, rate limiting middleware, and abuse protection — each of which is a real implementation task, not a checkbox. Doing it halfway — collecting emails but not sending confirmations, or sending emails but with no rate limiting — would have been worse than not doing it at all. A broken or spammy email flow reflects poorly on the product in a way that a missing feature simply doesn't.

The principle I landed on: as a developer, you either implement a feature completely or you don't touch it. Partial features create technical debt and user confusion simultaneously. Shipping a clean, working product without lead capture is a better outcome than shipping a buggy one with it. The Supabase schema is already in place, so adding it properly in week 2 would be straightforward.

---

## 3. What I Would Build in Week 2

CostPilot started as a take-home project but the more I built it the more I realized it's a genuine product idea. I discussed it with friends who work in tech and the reaction was consistent: this solves a real problem, especially for early-stage startups. Teams at that stage move fast, adopt AI tools reactively, and rarely audit what they're actually using versus what they're paying for. They're the exact user this is built for.

In week 2 I would prioritize three things. First, complete the lead capture feature properly — email collection with Resend confirmation emails and rate limiting, so there's a conversion mechanism when someone runs an audit and sees significant savings. Second, expand the tool library. Right now CostPilot covers 8 tools. The real market includes Notion AI, GitHub Copilot, Perplexity, Midjourney, Runway, and dozens more — each with their own plan structures. Third, I'd build a comparison mode: given your use case and team size, what's the *optimal* stack? Not just "you're overspending" but "here's what we'd recommend instead and why." That's the feature that turns an audit tool into a consultant replacement.

The core insight is that the savings number is the hook. People share audits when the number is surprising. Week 2 is about making that loop tighter.

---

## 4. How I Used AI Tools

My primary AI tool this week was Claude (Anthropic). I used it extensively — for generating boilerplate, working through architecture decisions, debugging TypeScript errors, and writing the documentation files. It was genuinely useful for accelerating the parts of the project that are repetitive or structural: setting up the Supabase client, wiring the Next.js API route, writing the Mermaid diagram in ARCHITECTURE.md.

What I didn't trust it with: the audit logic itself. The recommendation rules and scoring formula I wrote and reviewed manually, because those numbers need to be defensible. If Claude had generated savings estimates, I wouldn't have been confident they were grounded in anything real.

One specific time it got something wrong: when Claude generated the shareable audit page (`app/audit/[id]/page.tsx`), it included a raw `→` arrow character inside JSX text. TypeScript's JSX parser can't handle raw unicode arrows in that position and threw six cascading errors. Claude hadn't caught it because the character looks valid in a markdown code block — it only breaks when the file is actually parsed as TSX. I spotted it by reading the error message carefully (`Unexpected token. Did you mean {'>'} or &gt;?`) and traced it to that exact line. The fix was replacing it with `{'\u2192'}`. Small bug, but a good reminder that AI-generated code still needs to be read, not just copied.

---

## 5. Self-Rating

**Discipline: 7/10**
I stayed focused on shipping over perfecting, made the call to skip feature 5 rather than half-implement it, and kept moving — but I lost time early in the week going down the wrong path on the demo data bug before slowing down to actually read the error.

**Code Quality: 7/10**
The TypeScript interfaces are clean, the separation between audit math and AI summary is deliberate, and the API key never touches the client — but there are no tests, the recommendations engine is a set of if-statements that will get unwieldy fast, and the error handling in a few places is minimal.

**Design Sense: 8/10**
The dark UI with emerald accents is consistent and intentional, the share banner is well-placed, and the public audit page feels like a real product rather than a side project. The form layout could be tighter on mobile.

**Problem Solving: 8/10**
The demo data bug recovery was slow to start but systematic once I committed to tracing the data flow properly. The decision to skip lead capture and ship clean was the right call made at the right time. I didn't panic when things broke.

**Entrepreneurial Thinking: 9/10**
The shareable URL isn't just a feature — it's a distribution mechanism. Every audit someone shares is a cold acquisition. I thought about who the actual user is (early-stage startup operators), validated the idea informally with people in the target market, and identified the week 2 roadmap based on what would drive retention and conversion, not just what was technically interesting.