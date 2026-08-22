import type { ProgressStat } from "@/data/progress";

type ProgressStatsProps = {
  stats: ProgressStat[];
};

export default function ProgressStats({
  stats,
}: ProgressStatsProps) {
  return (
    <section className="mb-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 shadow-xl"
          >
            <p className="text-sm font-medium text-zinc-500">
              {stat.label}
            </p>

            <p className="mt-3 text-3xl font-bold text-white">
              {stat.value}
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}