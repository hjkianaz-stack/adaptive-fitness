type RecentActivityItem = {
  exercise: string;
  sets: number;
  reps: number;
  change: string;
};

type RecentActivityProps = {
  activities: RecentActivityItem[];
};

export default function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-zinc-950">
          Recent activity
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Your latest exercise performance.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <div className="divide-y divide-zinc-100">
          {activities.map((activity) => (
            <div
              key={activity.exercise}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-zinc-950">
                  {activity.exercise}
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  {activity.sets} sets × {activity.reps} reps
                </p>
              </div>

              <span className="text-sm font-semibold text-zinc-700">
                {activity.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}