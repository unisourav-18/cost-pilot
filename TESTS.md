# CostPilot — Tests

## Test Runner

**Vitest** — chosen for native TypeScript support, zero config with Next.js, and fast execution without a DOM environment.

## How to Run

```bash
# Install dependencies (first time only)
npm install

# Run all tests once
npm test

# Run in watch mode during development
npm run test:watch
```

## Test Files

### `lib/audit/__tests__/runAudit.test.ts`
Tests the top-level audit orchestration function.

| Test | What it covers |
|---|---|
| Calculates totalMonthlySpend correctly | Verifies spend is summed across all tool entries |
| stackScore never drops below 20 | Validates the floor constraint on the scoring formula |
| Deducts 15 from stackScore for 5+ tools | Verifies the tool-count penalty is applied correctly |
| estimatedSavings matches recommendation sum | Verifies savings are derived from recommendations, not hardcoded |
| Single low-spend tool returns score of 100 | Verifies no false positives on a clean minimal stack |

### `lib/audit/__tests__/recommendations.test.ts`
Tests the recommendation engine rule by rule.

| Test | What it covers |
|---|---|
| Flags duplicate assistants (2+ used) | Verifies `duplicate-assistants` rule triggers correctly |
| No duplicate flag for single assistant | Verifies rule doesn't false-positive |
| Flags high spend above $300 | Verifies `high-spend-stack` threshold |
| No high spend flag below $300 | Verifies threshold boundary |
| Flags too many coding tools (3+) | Verifies `too-many-coding-tools` rule |
| Always includes annual billing rec | Verifies unconditional recommendation is always present |
| Flags enterprise overkill for lovable + low spend | Verifies compound condition rule |
| No enterprise overkill for lovable + high spend | Verifies spend gate on the rule |
| All recommendations have required fields | Schema validation across all returned recommendations |
| Returns alternative recommendation for known tools | Verifies alternatives engine runs for known toolIds |

## CI

Tests run automatically on every push to `main` via GitHub Actions.
See `.github/workflows/ci.yml`.