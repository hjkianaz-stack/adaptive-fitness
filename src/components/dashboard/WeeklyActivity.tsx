type WeeklyActivityItem = {
  day: string;
  completed: boolean;
};

type WeeklyActivityProps = {
  activity: WeeklyActivityItem[];
};

export default function WeeklyActivity({
  activity,
}: WeeklyActivityProps) {
  return (
    <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-zinc-950">This week</h2>

        <p className="mt-1 text-sm text-zinc-500">
          Your recent training consistency.
        </p>
      </div>

      <div className="grid grid-cols-7 gap-2 sm:gap-4">
        {activity.map((item) => (
          <div
            key={item.day}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs font-medium text-zinc-500">
              {item.day}
            </span>

            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition sm:h-11 sm:w-11 ${
                item.completed
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-200 bg-zinc-50 text-zinc-400"
              }`}
              aria-label={
                item.completed
                  ? `${item.day}: workout completed`
                  : `${item.day}: no workout`
              }
            >
              {item.completed ? "✓" : "—"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}