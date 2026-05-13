# CostPilot — Metrics

## North Star Metric

**Audits completed with a shareable link generated**

Not "audits started." Not "page visits." Not "users signed up." The moment a shareable link is generated, three things have happened simultaneously: the user has seen a real savings number, the audit data has been persisted to the database, and a distribution asset now exists in the world that can bring the next user in without any additional effort from us.

This is the right North Star for CostPilot at this stage because it sits at the exact intersection of value delivery and viral distribution. A completed audit with a share link is the product working. Everything before it is a funnel. Everything after it — consultations booked, leads captured, referrals generated — is a downstream outcome that follows naturally when this number is healthy.

DAU would be the wrong metric. CostPilot is not a daily-use product. A team audits their AI stack once a quarter at most. Measuring daily activity would optimize for the wrong behavior and produce a number that looks low even when the product is working well. The correct cadence for this metric is weekly unique audits completed.

---

## Three Input Metrics That Drive the North Star

**1. Form completion rate**
The percentage of users who land on the audit page and submit the form with at least one valid tool entry. This measures whether the form is clear, fast, and low-friction enough to convert curiosity into action. A drop here means the form is too long, too confusing, or asking for information users don't have readily available. Target: above 40%.

**2. Share link click-through rate**
Of the audits that generate a share link, what percentage of those links are actually opened by someone other than the person who created them. This is the viral coefficient input — it tells us whether the audit result is compelling enough to forward. A savings number that surprises someone gets shared. A generic result doesn't. Target: above 25% of generated links opened by a unique second visitor.

**3. Return visit rate from shared links**
Of the people who view a shared audit (not the creator), what percentage click through to run their own audit. This closes the viral loop and is the primary zero-cost acquisition mechanism. If this number is healthy, the product grows without a marketing budget. Target: above 15% of shared link viewers start their own audit.

---

## What to Instrument First

In priority order:

1. **Audit form submission event** — with properties: tool count, total spend entered, use case selected, team size. This is the single most important event in the product.
2. **Share link generated** — fired when a UUID is returned from Supabase and the share banner appears.
3. **Share link opened** — fired on the `/audit/[id]` page load, with a flag distinguishing creator vs. new visitor (use a query param or referrer check).
4. **CTA click on shared page** — the "Run Your Own Audit" button. This is the viral loop close event.
5. **Form abandonment** — track how far users get before dropping off. If most abandon after selecting tools but before entering spend, the spend field is the friction point.

Use PostHog or Plausible — both have generous free tiers and work with Next.js out of the box. Avoid Google Analytics 4 for an early-stage product; the event model is unnecessarily complex for what's needed here.

---

## What Number Triggers a Pivot Decision

If the **share link click-through rate stays below 10% after 200 completed audits**, the savings numbers are not surprising enough to be shareable. That's not a distribution problem — it's a product problem. The audit engine is producing results that feel generic or expected rather than specific and actionable.

At that point the pivot decision is: make the audit more personalized (which means collecting more context — actual usage data, not just spend), or change the hook entirely (lead with the stack score rather than the savings number, and see if a score creates more social currency than a dollar amount).

200 completed audits is the minimum threshold for this signal to be statistically meaningful. Below that, low share rates could just be noise from early adopters who are less likely to share than mainstream users.