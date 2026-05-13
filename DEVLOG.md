## Day 1 - 8 May 2026

**Hours worked:** 3

**What I did:**
- Initialized Next.js project with TypeScript and TailwindCSS
- Configured shadcn/ui component system
- Installed core dependencies for forms and validation
- Planned scalable project architecture
- Created initial folder structure
- Built initial landing page scaffold
- My first commit with basic setup ready from here real work starts 

**What I learned:**
- Modern SaaS projects benefit from early architectural organization
- shadcn/ui provides a scalable component foundation 

**I'm stuck on:**
- Still researching pricing models and audit recommendation logic
- Still need to figure out how to manage multiple md files that this project requires
- we have to fill correct data only in those files 

**Plan for tomorrow:**
- Build pricing data models
- Research official AI tool pricing
- Start implementing the audit engine
- Create spend input form


## Day 2 - 9 May 2026

- No Work done


## Day 3 - 10 May 2026

**Hours worked:** 6

**What I did:**
- Researched and collected detailed pricing data from major AI platforms
- Compared subscription models, API pricing, enterprise plans, usage limits, and credit systems
- Gathered structured pricing information for:
  - OpenAI
  - Claude
  - Gemini
  - Cursor
  - v0
  - Lovable
  - Replit
  - Bolt
- Created and finalized `PRICING_DATA.md`
- Pushed pricing documentation to GitHub repository
- Designed scalable audit engine architecture
- Created core structured data layer for the recommendation engine
- Built foundational TypeScript data files:
  - `tools.ts`
  - `plans.ts`
  - `alternatives.ts`
  - `rules.ts`
  - `benchmarks.ts`
- Defined strong TypeScript schemas for tools and pricing models
- Fixed type consistency issues in `tools.ts`
- Planned audit engine modules and backend recommendation flow

**What I learned:**
- AI pricing ecosystems are extremely different between subscription, credit-based, and API-first platforms
- Structured data architecture is critical before building recommendation systems
- Strong TypeScript typing helps catch inconsistencies early
- Enterprise AI products rely heavily on usage scaling and feature gating

**I'm stuck on:**
- Need to implement intelligent recommendation logic without making rules overly rigid
- Still need to design realistic optimization scoring algorithms
- Need to balance scalability with simplicity in the audit engine

**Plan for tomorrow:**
- Build the core audit engine
- Create calculation and scoring utilities
- Implement recommendation generation logic
- Start building spend analysis functions
- Connect structured pricing data to audit calculations



## Day 4 - 12 May 2026

**Hours worked:** 7

**What I did:**
- Built the first working version of the CostPilot audit engine
- Created core audit execution flow with:
  - `recommendations.ts`
  - `runAudit.ts`
  - `mockAudit.ts`
- Designed recommendation generation logic for:
  - overspending detection
  - duplicate tool detection
  - annual billing opportunities
  - alternative tool suggestions
- Implemented audit scoring and estimated savings calculations
- Refactored TypeScript interfaces for better scalability and consistency
- Improved audit result architecture using structured recommendation objects
- Fixed multiple TypeScript issues related to:
  - implicit `any` types
  - interface mismatches
  - missing exports
  - incorrect imports
  - incompatible recommendation schemas
- Connected audit engine modules with shared data files
- Built interactive audit UI page
- Created reusable UI components:
  - `RecommendationCard`
  - `SummaryCard`
- Implemented mock audit result rendering successfully
- Built dynamic `AuditForm.tsx`
- Added:
  - tool dropdown selection
  - plan dropdown selection
  - dynamic tool entries
  - remove tool functionality
  - spend and seat inputs
- Created `options.ts` to power dynamic form selections
- Connected structured pricing ecosystem with frontend form flow
- Successfully reached first usable prototype stage of the application

**What I learned:**
- Strong type architecture becomes extremely important as project complexity grows
- Recommendation engines require clean separation between rules, scoring, and UI rendering
- Dynamic forms become significantly easier to scale using centralized option maps
- TypeScript catches structural issues early but requires consistent interface planning
- Building reusable components early speeds up frontend iteration later

**I'm stuck on:**
- Need to improve recommendation intelligence beyond rule-based logic
- Need more realistic optimization heuristics for startup spending patterns
- Still need better benchmarking logic for stack efficiency scoring
- Need to design a cleaner UX flow for audit submission and results visualization

**Plan for tomorrow:**
- Improve audit recommendation quality
- Build smarter savings estimation logic
- Add benchmark comparison system
- Create advanced result visualizations
- Improve UI polish and responsiveness
- Start preparing the app for real user testing

## Day 5 - 13 May 2026

**Hours worked:** 8

**What I did:**
- Upgraded AuditForm with three missing requirements:
  - Team size input
  - Primary use case selector (coding / writing / data / research / mixed)
  - localStorage persistence so form state survives page reloads
- Integrated Anthropic API for AI-generated personalized audit summaries
  - Built server-side API route to keep API key off the client
  - Implemented graceful fallback to templated summary on API failure
- Set up Supabase database with audits table
- Built shareable audit URLs — every audit gets a unique `/audit/[id]` page
- Added Open Graph and Twitter Card meta tags for clean link previews
- Added share banner with one-click copy to clipboard + "Copied!" feedback state
- Fixed TypeScript type mismatch (summary field optional in AuditResult)
- Set up Vitest as test runner and wrote 10 passing tests covering the audit engine:
  - 5 tests for runAudit.ts (spend calculation, scoring, floor constraints)
  - 5 tests for recommendations.ts (rule boundaries, required fields, alternatives)
- Fixed a bug in data/rules.ts where enterprise-overkill was firing unconditionally
- Added GitHub Actions CI workflow — lint + tests run on every push to main
- Deployed to Vercel at https://cost-pilot-1i6k.vercel.app
- Wrote and finalized all required documentation:
  - README.md — setup, architecture, decisions, screenshots, deploy guide
  - PROMPTS.md — full prompt, variables, fallback behavior, AI usage rationale
  - ARCHITECTURE.md — Mermaid system diagram, data flow, stack decisions, 10k/day scaling plan
  - REFLECTION.md — bug retrospective, reversed decisions, week 2 roadmap, AI tool usage, self-ratings
  - TESTS.md — test coverage table and run instructions
  - USER_INTERVIEWS.md — LinkedIn outreach, feedback synthesis, next interview targets
  - LANDING_COPY.md — hero copy, social proof, FAQ
  - METRICS.md — North Star metric, input metrics, instrumentation plan, pivot triggers

**What I learned:**
- Keeping API keys server-side via Next.js API routes is non-negotiable — client-side calls expose credentials in network requests
- A two-effect pattern (hydrate on mount, persist on change) is necessary for localStorage in Next.js to avoid SSR hydration mismatches
- Test inputs must be derived from the actual rule boundaries in the code, not assumed — the enterprise-overkill bug was caused by a rule firing from two places simultaneously
- Shipping a clean product without a half-implemented feature is always better than shipping with one

**I'm stuck on:**
- Nothing blocking — project is complete and submitted

