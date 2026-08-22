type ProgressOverviewProps = {
  workouts: number;
  streak: number;
  weeklyVolume: number;
};

const metrics = [
  {
    key: "workouts",
    label: "Workouts",
    suffix: "",
  },
  {
    key: "streak",
    label: "Day streak",
    suffix: " days",
  },
  {
    key: "weeklyVolume",
    label: "Weekly volume",
    suffix: " kg",
  },
] as const;

export default function ProgressOverview({
  workouts,
  streak,
  weeklyVolume,
}: ProgressOverviewProps) {
  const values = {
    workouts,
    streak,
    weeklyVolume,
  };

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-zinc-950">Your progress</h2>

        <p className="mt-1 text-sm text-zinc-500">
          A quick look at your current training activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.key}
            className="rounded-2xl border border-zinc-200 bg-white p-5"
          >
            <p className="text-sm text-zinc-500">{metric.label}</p>

            <p className="mt-3 text-2xl font-bold tracking-tight text-zinc-950">
              {values[metric.key].toLocaleString()}
              {metric.suffix}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}