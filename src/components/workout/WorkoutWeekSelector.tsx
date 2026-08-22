"use client";

import type { WorkoutDay } from "@/data/workout/types";

type WorkoutWeekSelectorProps = {
  days: WorkoutDay[];
  selectedDay: number;
  onChange: (index: number) => void;
};

const weekDays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export default function WorkoutWeekSelector({
  days,
  selectedDay,
  onChange,
}: WorkoutWeekSelectorProps) {
  return (
    <section className="mb-6">
      <div className="mb-3">
        <h2 className="text-lg font-bold text-zinc-950">
          This Week
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Select a workout day to view your
          training plan.
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-3
          sm:grid-cols-4
          lg:grid-cols-7
        "
      >
        {days.map((day, index) => {
          const active =
            selectedDay === index;

          const isRest =
            !day ||
            day.type === "Rest";

          return (
            <button
              key={day?.dayIndex ?? index}
              type="button"
              onClick={() =>
                onChange(index)
              }
              className={`
                rounded-2xl
                border
                p-3
                text-left
                transition
                ${
                  active
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
                }
              `}
            >
              <p
                className={`
                  text-xs
                  font-medium
                  ${
                    active
                      ? "text-zinc-300"
                      : "text-zinc-500"
                  }
                `}
              >
                {weekDays[index]}
              </p>

              <p className="mt-2 truncate text-sm font-bold">
                {isRest
                  ? "Rest"
                  : day.type}
              </p>

              {!isRest && (
                <p
                  className={`
                    mt-1
                    text-xs
                    ${
                      active
                        ? "text-zinc-400"
                        : "text-zinc-500"
                    }
                  `}
                >
                  {day.exercises.length}{" "}
                  exercises
                </p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}