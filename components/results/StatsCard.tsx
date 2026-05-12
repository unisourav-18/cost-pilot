interface StatsCardProps {
  title: string;
  value: string;
  color?: "default" | "emerald" | "blue";
}

export default function StatsCard({
  title,
  value,
  color = "default",
}: StatsCardProps) {
  const colorClasses = {
    default: "border-white/10",
    emerald: "border-emerald-500/30",
    blue: "border-blue-500/30",
  };

  return (
    <div
      className={`rounded-2xl border ${colorClasses[color]} bg-zinc-900 p-6`}
    >
      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <h3 className="mt-3 text-3xl font-bold">
        {value}
      </h3>
    </div>
  );
}