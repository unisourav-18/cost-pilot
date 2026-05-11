"use client";

import { useState } from "react";
import { AuditToolEntry } from "@/types/audit";
import { toolOptions, planOptions } from "@/lib/audit/options";

interface AuditFormProps {
  onSubmit: (entries: AuditToolEntry[]) => void;
}

export default function AuditForm({
  onSubmit,
}: AuditFormProps) {
  const [entries, setEntries] = useState<AuditToolEntry[]>([
    {
      toolId: "",
      planName: "",
      monthlySpend: 0,
      seats: 1,
    },
  ]);

  const updateEntry = (
    index: number,
    field: keyof AuditToolEntry,
    value: string | number
  ) => {
    const updated = [...entries];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    // reset plan when tool changes
    if (field === "toolId") {
      updated[index].planName = "";
    }

    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([
      ...entries,
      {
        toolId: "",
        planName: "",
        monthlySpend: 0,
        seats: 1,
      },
    ]);
  };

  const removeEntry = (index: number) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
  };

  const handleSubmit = () => {
    const filtered = entries.filter(
      (entry) =>
        entry.toolId &&
        entry.planName &&
        entry.monthlySpend > 0
    );

    onSubmit(filtered);
  };

  return (
    <div className="space-y-6">
      {entries.map((entry, index) => {
        const availablePlans =
          planOptions[entry.toolId] || [];

        return (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-zinc-900 p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {/* Tool Select */}
              <select
                value={entry.toolId}
                onChange={(e) =>
                  updateEntry(index, "toolId", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none"
              >
                <option value="">Select Tool</option>

                {toolOptions.map((tool: { id: string; name: string }) => (
                  <option
                    key={tool.id}
                    value={tool.id}
                  >
                    {tool.name}
                  </option>
                ))}
              </select>

              {/* Plan Select */}
              <select
                value={entry.planName}
                onChange={(e) =>
                  updateEntry(index, "planName", e.target.value)
                }
                className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none"
              >
                <option value="">Select Plan</option>

                {availablePlans.map((plan: string) => (
                  <option
                    key={plan}
                    value={plan}
                  >
                    {plan}
                  </option>
                ))}
              </select>

              {/* Monthly Spend */}
              <input
                type="number"
                placeholder="Monthly Spend ($)"
                value={entry.monthlySpend}
                onChange={(e) =>
                  updateEntry(
                    index,
                    "monthlySpend",
                    Number(e.target.value)
                  )
                }
                className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none"
              />

              {/* Seats */}
              <input
                type="number"
                placeholder="Seats"
                value={entry.seats}
                onChange={(e) =>
                  updateEntry(
                    index,
                    "seats",
                    Number(e.target.value)
                  )
                }
                className="rounded-xl border border-white/10 bg-zinc-800 p-3 text-white outline-none"
              />
            </div>

            {entries.length > 1 && (
              <button
                onClick={() => removeEntry(index)}
                className="mt-4 text-sm text-red-400 transition hover:text-red-300"
              >
                Remove Tool
              </button>
            )}
          </div>
        );
      })}

      <div className="flex gap-4">
        <button
          onClick={addEntry}
          className="rounded-xl bg-zinc-800 px-5 py-3 text-white transition hover:bg-zinc-700"
        >
          Add Tool
        </button>

        <button
          onClick={handleSubmit}
          className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black transition hover:bg-emerald-400"
        >
          Run Audit
        </button>
      </div>
    </div>
  );
}