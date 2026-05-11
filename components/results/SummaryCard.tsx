interface SummaryCardProps {
  title: string;
  value: string;
  color?: string;
}

export default function SummaryCard({
  title,
  value,
  color = "text-white",
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
      <p className="text-sm text-zinc-400">{title}</p>

      <h2 className={`mt-2 text-3xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}