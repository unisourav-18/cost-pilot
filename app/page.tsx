"use client";

import { useState } from "react";

import { tools } from "@/data/tools";
import { plans } from "@/data/plans";

import { AuditToolEntry, AuditResult } from "@/types/audit";

import { runAudit } from "@/lib/audit/runAudit";

export default function HomePage() {
  const [entries, setEntries] = useState<AuditToolEntry[]>([
    {
      toolId: "chatgpt",
      planName: "Plus",
      monthlySpend: 20,
      seats: 1,
    },
  ]);

  const [result, setResult] =
    useState<AuditResult | null>(null);

  function updateEntry(
    index: number,
    field: keyof AuditToolEntry,
    value: string | number
  ) {
    const updated = [...entries];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setEntries(updated);
  }

  function addEntry() {
    setEntries([
      ...entries,
      {
        toolId: "claude",
        planName: "Pro",
        monthlySpend: 20,
        seats: 1,
      },
    ]);
  }

  function runAuditHandler() {
    const auditResult = runAudit(entries);
    setResult(auditResult);
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4">
            CostPilot
          </h1>

          <p className="text-zinc-400 text-lg">
            AI Spend Audit Platform for Startups
          </p>
        </div>

        <div className="space-y-6">
          {entries.map((entry, index) => {
            const toolPlans = plans.filter(
              (plan) => plan.toolId === entry.toolId
            );

            return (
              <div
                key={index}
                className="border border-zinc-800 rounded-2xl p-6 bg-zinc-900"
              >
                <div className="grid md:grid-cols-4 gap-4">
                  {/* Tool */}
                  <div>
                    <label className="text-sm text-zinc-400">
                      Tool
                    </label>

                    <select
                      value={entry.toolId}
                      onChange={(e) =>
                        updateEntry(
                          index,
                          "toolId",
                          e.target.value
                        )
                      }
                      className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg p-3"
                    >
                      {tools.map((tool) => (
                        <option
                          key={tool.id}
                          value={tool.id}
                        >
                          {tool.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Plan */}
                  <div>
                    <label className="text-sm text-zinc-400">
                      Plan
                    </label>

                    <select
                      value={entry.planName}
                      onChange={(e) =>
                        updateEntry(
                          index,
                          "planName",
                          e.target.value
                        )
                      }
                      className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg p-3"
                    >
                      {toolPlans.map((plan) => (
                        <option
                          key={plan.planName}
                          value={plan.planName}
                        >
                          {plan.planName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Spend */}
                  <div>
                    <label className="text-sm text-zinc-400">
                      Monthly Spend ($)
                    </label>

                    <input
                      type="number"
                      value={entry.monthlySpend}
                      onChange={(e) =>
                        updateEntry(
                          index,
                          "monthlySpend",
                          Number(e.target.value)
                        )
                      }
                      className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg p-3"
                    />
                  </div>

                  {/* Seats */}
                  <div>
                    <label className="text-sm text-zinc-400">
                      Seats
                    </label>

                    <input
                      type="number"
                      value={entry.seats}
                      onChange={(e) =>
                        updateEntry(
                          index,
                          "seats",
                          Number(e.target.value)
                        )
                      }
                      className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg p-3"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={addEntry}
            className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl"
          >
            Add Tool
          </button>

          <button
            onClick={runAuditHandler}
            className="bg-white text-black hover:bg-zinc-200 px-5 py-3 rounded-xl font-semibold"
          >
            Run Audit
          </button>
        </div>

        {/* RESULTS */}
        {result && (
          <div className="mt-12 space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <p className="text-zinc-400 text-sm">
                  Monthly Spend
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  ${result.totalMonthlySpend}
                </h2>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <p className="text-zinc-400 text-sm">
                  Estimated Savings
                </p>

                <h2 className="text-3xl font-bold mt-2 text-green-400">
                  ${result.estimatedSavings}
                </h2>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <p className="text-zinc-400 text-sm">
                  Stack Score
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {result.stackScore}/100
                </h2>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              {result.recommendations.map(
                (recommendation, index) => (
                  <div
                    key={index}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">
                        {recommendation.title}
                      </h3>

                      {recommendation.estimatedSavings && (
                        <span className="text-green-400">
                          Save $
                          {
                            recommendation.estimatedSavings
                          }
                        </span>
                      )}
                    </div>

                    <p className="text-zinc-400 mt-3">
                      {recommendation.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}