"use client";

import { useRouter } from "next/navigation";

type Profile = {
  fitness_goal: string | null;
  training_days: number | null;
  session_duration: number | null;
  experience_level: string | null;
  training_location: string | null;
};

type Props = {
  profile: Profile;
};

export default function TodayWorkoutCard({
  profile,
}: Props) {
  const router = useRouter();

  const workoutDuration =
    profile.session_duration ?? 60;

  const level =
    profile.experience_level ??
    "Intermediate";

  const goal =
    profile.fitness_goal ??
    "Build Muscle";

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-950
        p-6
        shadow-xl
      "
    >
      <div
        className="
          absolute
          right-0
          top-0
          h-32
          w-32
          rounded-full
          bg-[#c7ff00]/10
          blur-3xl
        "
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500">
              Today&apos;s focus
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Upper Body
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Strength & muscle development
            </p>
          </div>

          <div
            className="
              rounded-full
              border
              border-[#c7ff00]/20
              bg-[#c7ff00]/10
              px-4
              py-2
              text-xs
              font-bold
              text-[#c7ff00]
            "
          >
            ● Today
          </div>
        </div>

        <div className="mt-7 grid grid-cols-3 gap-3">
          {[
            [
              "Duration",
              `${workoutDuration} min`,
            ],
            [
              "Exercises",
              "7",
            ],
            [
              "Level",
              level,
            ],
          ].map(
            ([label, value]) => (
              <div
                key={label}
                className="
                  rounded-2xl
                  border
                  border-zinc-800
                  bg-zinc-900/70
                  p-4
                "
              >
                <p className="text-xs text-zinc-500">
                  {label}
                </p>

                <p className="mt-2 text-sm font-bold text-white">
                  {value}
                </p>
              </div>
            ),
          )}
        </div>

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            border-t
            border-zinc-800
            pt-5
          "
        >
          <div>
            <p className="text-xs text-zinc-500">
              Current goal
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              {goal}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              router.push("/workout")
            }
            className="
              rounded-xl
              bg-[#c7ff00]
              px-6
              py-3
              text-sm
              font-black
              text-black
              transition
              hover:scale-105
            "
          >
            Start Workout →
          </button>
        </div>
      </div>
    </section>
  );
}