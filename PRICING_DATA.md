# CostPilot Pricing Research Data

**Last Updated:** 2026-05-10

---

## Pricing Research Methodology

This document contains pricing research used by CostPilot's audit engine.

**Rules followed while collecting data:**

- Only official vendor pricing pages were used
- All prices were verified manually
- Enterprise plans marked as "Custom" were intentionally not estimated
- Annual-vs-monthly billing differences were preserved where relevant
- API pricing is normalized to: per user/month, per seat/month, per 1M tokens
- Pricing logic was simplified only where necessary for audit recommendations

**The audit engine uses this data to:**

- Detect overspending
- Identify plan mismatches
- Recommend cheaper alternatives
- Estimate potential monthly + annual savings

---

## GitHub Copilot

**Source:** https://github.com/features/copilot/plans
**Verified:** 2026-05-10

### Individual Plans

| Plan | Price | Billing | Intended User |
|------|-------|---------|---------------|
| Free | $0 | Monthly | Casual individual users |
| Pro | $10/user/month | Monthly | Professional developers |
| Pro+ | $39/user/month | Monthly | Heavy AI coding users |

**Key Notes:**
- Pro includes unlimited inline suggestions
- Pro+ mainly increases premium request limits
- Free plan limited to: 50 chat/agent requests, 2,000 completions/month

### Business Plans

| Plan | Price | Billing | Intended User |
|------|-------|---------|---------------|
| Business | $19/user/month | Monthly | Small-medium engineering teams |
| Enterprise | $39/user/month | Monthly | Large organizations |

**Key Notes:**
- Business includes: IP indemnity, usage analytics, centralized administration
- Enterprise adds: larger premium request pools, Spark access, advanced enterprise controls

### Audit Logic Notes

| Scenario | Recommendation |
|----------|----------------|
| Team ≤ 2 users on Enterprise | Downgrade to Business |
| Solo developer on Business | Switch to Pro |
| Low usage on Pro | Consider Free |
| Heavy Pro+ usage with low premium requests | Downgrade to Pro |

---

## Claude (Anthropic)

**Source:** https://www.anthropic.com/pricing
**Verified:** 2026-05-10

### Individual Plans

| Plan | Price | Billing | Intended User |
|------|-------|---------|---------------|
| Free | $0 | Monthly | Casual usage |
| Pro | $20/month | Monthly | — |
| Pro | $17/month | Annual billing | — |
| Max 5x | $100/month | Monthly | — |
| Max 20x | Custom tier | Monthly | — |

**Included Features:** Web + desktop access, Claude Code, Claude Cowork, Projects, Research, Connectors, Extended thinking

### Team Plans

| Plan | Price | Billing | Intended User |
|------|-------|---------|---------------|
| Team Standard Seat | $25/user/month | Monthly | — |
| Team Standard Seat | $20/user/month | Annual | — |
| Team Premium Seat | $125/user/month | Monthly | — |
| Team Premium Seat | $100/user/month | Annual | — |

**Team Features:** Centralized billing, SSO, Enterprise search, Admin controls, No training on customer data

### Enterprise Plan

| Plan | Pricing |
|------|---------|
| Enterprise | $20/seat + API usage |

**Enterprise Features:** SCIM, Audit logs, Compliance API, HIPAA-ready deployment, Network controls, Spend limits

### Claude API Pricing

**Source:** https://www.anthropic.com/pricing#api
**Verified:** 2026-05-10

| Model | Input | Output | Unit |
|-------|-------|--------|------|
| Opus 4.7 | $5 | $25 | per 1M tokens |
| Sonnet 4.6 | $3 | $15 | per 1M tokens |
| Haiku 4.5 | $1 | $5 | per 1M tokens |

**Additional API Costs:**

| Feature | Cost |
|---------|------|
| Web Search | $10 / 1K searches |
| Managed Agents | $0.08/session-hour |
| Code Execution | $0.05/container-hour after free tier |

### Audit Logic Notes

| Scenario | Recommendation |
|----------|----------------|
| Small teams on Team Premium | Consider Standard seats |
| Individual user on Team | Downgrade to Pro |
| High-volume repetitive API workloads | Prefer Haiku |
| Moderate coding workloads using Opus | Consider Sonnet |
| Small API spend with Team plan | API direct may be cheaper |

---

## OpenAI / ChatGPT

**Sources:** https://chatgpt.com/pricing · https://platform.openai.com/docs/pricing
**Verified:** 2026-05-10

### ChatGPT Plans

| Plan | Price | Billing | Intended User |
|------|-------|---------|---------------|
| Free | $0 | Monthly | Casual usage |
| Plus | $20/user/month | Monthly | Individual professionals |
| Team | ~$25/user/month | Annual equivalent | — |
| Enterprise | Custom Pricing | Contact Sales | — |

### Audit Logic Notes

| Scenario | Recommendation |
|----------|----------------|
| Small teams on Enterprise | Move to Team |
| Individual user on Team | Move to Plus |
| API-heavy usage on Plus | API direct may be cheaper |
| Very low usage | Free may suffice |

### OpenAI API Pricing

| Model | Input | Output | Unit |
|-------|-------|--------|------|
| GPT-5.5 | $5 | $30 | per 1M tokens |
| GPT-5.4 | $2.5 | $15 | per 1M tokens |
| GPT-5-mini | $0.25 | $2 | per 1M tokens |
| GPT-4o | $2.5 | $10 | per 1M tokens |
| GPT-4o-mini | $0.15 | $0.60 | per 1M tokens |
| o3 | $2 | $8 | per 1M tokens |

**Important Audit Considerations:**
- GPT-4o-mini is dramatically cheaper for lightweight workloads
- GPT-5.5 should only be recommended for: complex reasoning, advanced coding agents, research-heavy workflows
- Many startups overspend by defaulting to flagship models unnecessarily

---

## Google Gemini

**Source:** https://gemini.google.com/pricing
**Verified:** 2026-05-10

### Consumer Plans

| Plan | Price | Billing |
|------|-------|---------|
| Free | ₹0 | Monthly |
| Google AI Plus | ₹399/month | Monthly |
| Google AI Pro | ₹1,950/month | Monthly |
| Google AI Ultra | Custom/Regional | Monthly |

**Included Features:** Gemini app, Deep Research, NotebookLM, Gemini in Google Workspace, Gemini Code Assist, Gemini CLI, Video generation access, Storage bundles

### Audit Logic Notes

| Scenario | Recommendation |
|----------|----------------|
| User only needs chatbot access | Use Free or Plus |
| Non-developers on Pro | Downgrade to Plus |
| Small teams using Workspace heavily | Gemini ecosystem may outperform separate tools |

---

## Cursor

**Source:** https://cursor.com/pricing
**Verified:** 2026-05-10

### Individual Plans — Monthly Billing

| Plan | Price | Notes |
|------|-------|-------|
| Hobby (Free) | $0/month | No credit card required; limited Agent requests & Tab completions |
| Pro | $20/month | Extended Agent limits, frontier model access, MCPs, skills, hooks, cloud agents |
| Pro+ *(Recommended)* | $60/month | Everything in Pro + 3× usage on all OpenAI, Claude & Gemini models |
| Ultra | $200/month | Everything in Pro + 20× usage on all models + priority access to new features |

### Individual Plans — Annual Billing

| Plan | Price (billed annually) | Savings vs Monthly |
|------|-------------------------|--------------------|
| Hobby (Free) | $0/month | — |
| Pro | $16/month | 20% off |
| Pro+ | $48/month | 20% off |
| Ultra | $160/month | 20% off |

### Business Plans

| Plan | Monthly Price | Annual Price | Key Features |
|------|---------------|--------------|--------------|
| Teams | $40/user/month | $32/user/month | Shared chats/commands/rules, centralized billing, usage analytics, privacy mode controls, RBAC, SAML/OIDC SSO |
| Enterprise | Custom | Custom | Everything in Teams + pooled usage, invoice/PO billing, SCIM, AI code tracking API & audit logs, granular admin/model controls, priority support |

### Bugbot Add-on

Bugbot is Cursor's automated PR code review product, priced separately.

| Plan | Price | Key Features |
|------|-------|--------------|
| Bugbot Pro | $40/user/month | 14-day trial, reviews up to 200 PRs/month, Bugbot rules |
| Bugbot Teams | $40/user/month | 14-day team trial, reviews on all PRs, analytics dashboard, advanced rules |
| Bugbot Enterprise | Custom | 30-day org-wide trial, advanced analytics, priority support |

### Audit Logic Notes

| Scenario | Recommendation |
|----------|----------------|
| Solo developer on Teams plan | Downgrade to Pro individual |
| Moderate usage with no team features needed | Pro ($20/mo) likely sufficient |
| High-volume AI coding with no team overhead | Pro+ or Ultra depending on usage intensity |
| Team needing SSO & centralized billing | Teams plan justified |
| Small team on Enterprise | Downgrade to Teams |
| Annual billing available | Always prefer annual billing for 20% savings |

---

## v0 (Vercel)

**Source:** https://v0.dev/pricing
**Verified:** 2026-05-10

### Subscription Plans

| Plan | Price | Credits Included |
|------|-------|-----------------|
| Free | $0/month | $5/month in credits |
| Team | $30/user/month | $30/user/month in credits |
| Business | $100/user/month | $30/user/month in credits |
| Enterprise | Custom | Custom |

### API / Token Pricing

| Model | Input | Output | Unit |
|-------|-------|--------|------|
| v0 Mini | $1 | $5 | per 1M tokens |
| v0 Pro | $3 | $15 | per 1M tokens |
| v0 Max | $5 | $25 | per 1M tokens |
| v0 Max Fast | $30 | $150 | per 1M tokens |

### Audit Logic Notes

| Scenario | Recommendation |
|----------|----------------|
| Solo developer on Business | Downgrade to Team |
| Low design-generation usage | Free may suffice |
| Heavy frontend generation workloads | Team often sufficient |
| High-speed enterprise workflows | v0 Max Fast justified only at scale |

---

## Cross-Tool Optimization Heuristics

These heuristics power CostPilot recommendations.

| Current Situation | Potential Optimization |
|-------------------|------------------------|
| Paying enterprise pricing with < 5 seats | Downgrade to team/business |
| Using flagship API models for routine tasks | Switch to mini/haiku tiers |
| Multiple overlapping AI subscriptions | Consolidate into one ecosystem |
| Paying retail API pricing | Recommend infrastructure credits |
| Low utilization of premium plans | Downgrade |
| Heavy coding workflow + weak collaboration needs | Prefer individual plans |
| Small startups on enterprise contracts | Flag likely overspend |

---

## Planned Benchmark Assumptions

These assumptions will later power benchmark mode.

| Company Stage | Expected AI Spend / Developer |
|---------------|-------------------------------|
| Solo founder | $20–$80/month |
| Small startup (2–10 engineers) | $50–$150/dev/month |
| Growth startup | $150–$400/dev/month |
| AI-native company | $400+/dev/month |

---

## Known Limitations

- Enterprise pricing often unavailable publicly
- API costs vary significantly with token usage patterns
- Vendors frequently change pricing and packaging
- Some pricing pages are region-dependent
- Real-world negotiated discounts not reflected

---

## Planned Future Improvements

- Automated pricing refresh jobs
- Historical pricing snapshots
- Usage-aware recommendations
- Token consumption estimators
- Benchmark datasets from real startups
- Credit marketplace integration
- Vendor ROI scoring system