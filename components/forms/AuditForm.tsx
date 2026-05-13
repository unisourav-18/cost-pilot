"use client";

import { useState, useEffect } from "react";

import { AuditToolEntry, AuditFormState, PrimaryUseCase } from "@/types/audit";
import { toolOptions, planOptions, useCaseOptions } from "@/lib/audit/options";

const STORAGE_KEY = "audit-form-state";

const defaultEntry = (): AuditToolEntry => ({
  toolId: "",
  planName: "",
  monthlySpend: 0,
  seats: 1,
});

const defaultState: AuditFormState = {
  entries: [defaultEntry()],
  teamSize: 1,
  primaryUseCase: "",
};

function loadState(): AuditFormState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuditFormState) : defaultState;
  } catch {
    return defaultState;
  }
}

interface AuditFormProps {
  onSubmit: (
    entries: AuditToolEntry[],
    teamSize: number,
    primaryUseCase: PrimaryUseCase | ""
  ) => void;
  loading?: boolean;
}

const demoState: AuditFormState = {
  teamSize: 12,
  primaryUseCase: "coding",
  entries: [
    { toolId: "chatgpt", planName: "Plus",  monthlySpend: 20, seats: 5 },
    { toolId: "claude",  planName: "Pro",   monthlySpend: 20, seats: 3 },
    { toolId: "cursor",  planName: "Pro",   monthlySpend: 20, seats: 6 },
    { toolId: "replit",  planName: "Core",  monthlySpend: 20, seats: 4 },
  ],
};

export default function AuditForm({
  onSubmit,
  loading = false,
}: AuditFormProps) {
  const [formState, setFormState] = useState<AuditFormState>(defaultState);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setFormState(loadState());
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
    } catch {
      // storage unavailable — fail silently
    }
  }, [formState]);

  const { entries, teamSize, primaryUseCase } = formState;

  const patch = (partial: Partial<AuditFormState>) =>
    setFormState((prev) => ({ ...prev, ...partial }));

  // ── Entry helpers ──────────────────────────────────────────
  const updateEntry = (
    index: number,
    field: keyof AuditToolEntry,
    value: string | number
  ) => {
    const updated = [...entries];
    updated[index] = { ...updated[index], [field]: value };
    if (field === "toolId") updated[index].planName = "";
    patch({ entries: updated });
  };

  const addEntry = () =>
    patch({ entries: [...entries, defaultEntry()] });

  const removeEntry = (index: number) =>
    patch({ entries: entries.filter((_, i) => i !== index) });

  const loadDemo = () => setFormState(demoState);

  const handleSubmit = () => {
    const filtered = entries.filter(
      (e) => e.toolId && e.planName && e.monthlySpend > 0
    );
    onSubmit(filtered, teamSize, primaryUseCase);
  };

  return (
    <div className="space-y-6">

      {/* ── Header row ───────────────────────────────────────── */}
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Add Your AI Stack</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Enter your tools, plans, and monthly spend.
          </p>
        </div>

        <button
          onClick={loadDemo}
          disabled={loading}
          className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Load Demo Data
        </button>
      </div>

      {/* ── Team context (NEW) ────────────────────────────────── */}
      <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-medium text-white">Team Context</h3>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Team size */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-zinc-400">Team Size</label>
            <input
              type="number"
              min={1}
              placeholder="e.g. 12"
              disabled={loading}
              value={teamSize}
              onChange={(e) => patch({ teamSize: Number(e.target.value) })}
              className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Primary use case */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-zinc-400">Primary Use Case</label>
            <select
              value={primaryUseCase}
              disabled={loading}
              onChange={(e) =>
                patch({ primaryUseCase: e.target.value as PrimaryUseCase | "" })
              }
              className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select Use Case</option>
              {useCaseOptions.map((uc) => (
                <option key={uc.id} value={uc.id}>
                  {uc.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Tool entries ─────────────────────────────────────── */}
      {entries.map((entry, index) => {
        const availablePlans = planOptions[entry.toolId] || [];

        return (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">
                Tool #{index + 1}
              </h3>

              {entries.length > 1 && (
                <button
                  onClick={() => removeEntry(index)}
                  disabled={loading}
                  className="text-sm text-red-400 transition hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <select
                value={entry.toolId}
                disabled={loading}
                onChange={(e) => updateEntry(index, "toolId", e.target.value)}
                className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select Tool</option>
                {toolOptions.map((tool) => (
                  <option key={tool.id} value={tool.id}>{tool.name}</option>
                ))}
              </select>

              <select
                value={entry.planName}
                disabled={loading || !entry.toolId}
                onChange={(e) => updateEntry(index, "planName", e.target.value)}
                className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select Plan</option>
                {availablePlans.map((plan) => (
                  <option key={plan} value={plan}>{plan}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Monthly Spend ($)"
                disabled={loading}
                value={entry.monthlySpend}
                onChange={(e) =>
                  updateEntry(index, "monthlySpend", Number(e.target.value))
                }
                className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
              />

              <input
                type="number"
                placeholder="Seats"
                disabled={loading}
                value={entry.seats}
                onChange={(e) =>
                  updateEntry(index, "seats", Number(e.target.value))
                }
                className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none transition focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        );
      })}

      {/* ── Bottom actions ───────────────────────────────────── */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={addEntry}
          disabled={loading}
          className="rounded-xl bg-zinc-800 px-5 py-3 text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add Tool
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
              <span>Running Audit...</span>
            </div>
          ) : (
            "Run Audit"
          )}
        </button>
      </div>
    </div>
  );
}