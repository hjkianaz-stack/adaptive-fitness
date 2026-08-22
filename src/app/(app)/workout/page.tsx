"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  loadWorkoutProgress,
} from "@/lib/workoutProgress";

import {
  ensureWorkoutPlan,
} from "@/lib/plans/ensureWorkoutPlan";

import {
  addExerciseToWorkout,
} from "@/lib/plans/addExerciseToWorkout";

import {
  convertWorkoutDay,
  type WorkoutDisplayData,
} from "@/data/workout";

import type {
  WeeklyWorkoutPlan,
} from "@/data/workout/types";

import type {
  Exercise,
} from "@/data/exercises/types";

import ExerciseCard from "@/components/workout/ExerciseCard";
import WorkoutHeader from "@/components/workout/WorkoutHeader";
import WorkoutProgress from "@/components/workout/WorkoutProgress";
import WorkoutSummary from "@/components/workout/WorkoutSummary";
import AddExerciseButton from "@/components/workout/AddExerciseButton";
import WorkoutWeekSelector from "@/components/workout/WorkoutWeekSelector";

type SavedWorkoutPlan = {
  plan_data: WeeklyWorkoutPlan;
};

function getTodayIndex(): number {
  const today = new Date().getDay();

  return today === 0
    ? 6
    : today - 1;
}

function getDateForWorkoutDay(
  index: number,
): string {
  const now = new Date();

  const todayIndex =
    getTodayIndex();

  const diff =
    index - todayIndex;

  now.setDate(
    now.getDate() + diff,
  );

  const year =
    now.getFullYear();

  const month =
    String(
      now.getMonth() + 1,
    ).padStart(2, "0");

  const day =
    String(
      now.getDate(),
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getValidDayIndex(
  value: string | null,
): number {
  if (value === null) {
    return getTodayIndex();
  }

  const parsed =
    Number(value);

  if (
    !Number.isInteger(parsed) ||
    parsed < 0 ||
    parsed > 6
  ) {
    return getTodayIndex();
  }

  return parsed;
}

export default function WorkoutPage() {
  const router =
    useRouter();

  const pathname =
    usePathname();

  const searchParams =
    useSearchParams();

  const [workout, setWorkout] =
    useState<WorkoutDisplayData | null>(
      null,
    );

  const [weeklyPlan, setWeeklyPlan] =
    useState<WeeklyWorkoutPlan | null>(
      null,
    );

  /*
   * selectedDay is derived directly from
   * the URL.
   *
   * This means:
   *
   * /workout?day=0
   * /workout?day=1
   * ...
   *
   * remain stable after refresh.
   */
  const selectedDay = useMemo(
    () =>
      getValidDayIndex(
        searchParams.get("day"),
      ),
    [searchParams],
  );

  const [selectedDate, setSelectedDate] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [completedSets, setCompletedSets] =
    useState(0);

  /*
   * Change selected workout day.
   *
   * The selected day is stored in the URL
   * instead of local React state.
   */
  function handleDayChange(
    dayIndex: number,
  ) {
    const params =
      new URLSearchParams(
        searchParams.toString(),
      );

    params.set(
      "day",
      String(dayIndex),
    );

    router.replace(
      `${pathname}?${params.toString()}`,
      {
        scroll: false,
      },
    );
  }

  /*
   * Load weekly workout plan.
   */
  useEffect(() => {
    let cancelled = false;

    async function loadPlan() {
      try {
        setLoading(true);
        setError("");

        const savedPlan =
          (await ensureWorkoutPlan()) as SavedWorkoutPlan;

        if (
          !savedPlan ||
          !savedPlan.plan_data
        ) {
          throw new Error(
            "Workout plan not found.",
          );
        }

        if (!cancelled) {
          setWeeklyPlan(
            savedPlan.plan_data,
          );
        }
      } catch (loadError) {
        if (cancelled) {
          return;
        }

        console.error(
          "Workout plan loading error:",
          loadError,
        );

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load plan.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPlan();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * Load selected workout day.
   */
  useEffect(() => {
    if (
      !weeklyPlan ||
      !weeklyPlan.days
    ) {
      return;
    }

    const currentPlan =
      weeklyPlan;

    let cancelled = false;

    async function loadSelectedWorkout() {
      try {
        setLoading(true);
        setError("");
        setWorkout(null);
        setCompletedSets(0);

        const workoutDay =
          currentPlan.days[selectedDay];

        if (!workoutDay) {
          throw new Error(
            "Workout day not found.",
          );
        }

        const convertedWorkout =
          convertWorkoutDay(
            workoutDay,
          );

        const date =
          getDateForWorkoutDay(
            selectedDay,
          );

        if (!cancelled) {
          setSelectedDate(date);
        }

        /*
         * Rest day.
         */
        if (
          workoutDay.type === "Rest"
        ) {
          if (!cancelled) {
            setCompletedSets(0);

            setWorkout(
              convertedWorkout,
            );
          }

          return;
        }

        /*
         * Load saved workout progress
         * from Supabase.
         */
        const progress =
          await loadWorkoutProgress(
            date,
          );

        if (cancelled) {
          return;
        }

        let completedCounter = 0;

        const updatedExercises =
          convertedWorkout.exercises.map(
            (exercise) => {
              const savedSets =
                progress.filter(
                  (item) =>
                    item.exerciseName ===
                    exercise.name,
                );

              const updatedSets =
                exercise.sets.map(
                  (set) => {
                    const saved =
                      savedSets.find(
                        (item) =>
                          item.setNumber ===
                          set.id,
                      );

                    const completed =
                      saved?.completed ??
                      false;

                    if (completed) {
                      completedCounter++;
                    }

                    return {
                      ...set,

                      completed,

                      actualWeight:
                        saved?.weight ??
                        undefined,

                      actualReps:
                        saved?.reps ??
                        undefined,
                    };
                  },
                );

              return {
                ...exercise,

                sets:
                  updatedSets,
              };
            },
          );

        setCompletedSets(
          completedCounter,
        );

        setWorkout({
          ...convertedWorkout,

          exercises:
            updatedExercises,
        });
      } catch (loadError) {
        if (cancelled) {
          return;
        }

        console.error(
          "Workout loading error:",
          loadError,
        );

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Workout unavailable.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSelectedWorkout();

    return () => {
      cancelled = true;
    };
  }, [
    weeklyPlan,
    selectedDay,
  ]);

  /*
   * Add exercise from exercise library.
   *
   * The exercise is persisted to Supabase
   * before updating the local UI.
   */
  async function handleExerciseAdded(
    exercise: Exercise,
  ) {
    if (!workout) {
      return;
    }

    const alreadyExists =
      workout.exercises.some(
        (item) =>
          item.name ===
          exercise.name,
      );

    if (alreadyExists) {
      return;
    }

    try {
      setError("");

      /*
       * Persist the exercise in the
       * selected workout day.
       */
      await addExerciseToWorkout(
        exercise,
        selectedDay,
      );

      /*
       * Create the local representation
       * used by ExerciseCard.
       */
      const newExercise = {
        id:
          Date.now(),

        exerciseId:
          exercise.id,

        name:
          exercise.name,

        muscle:
          exercise.muscleGroup,

        equipment:
          exercise.equipment,

        secondaryMuscles:
          exercise.secondaryMuscles,

        difficulty:
          exercise.difficulty,

        image:
          exercise.image,

        instructions:
          exercise.instructions,

        restSeconds:
          exercise.restSeconds,

        sets: Array.from(
          {
            length:
              exercise.defaultSets,
          },
          (_, index) => ({
            id:
              index + 1,

            targetReps:
              exercise.repRange.min,

            targetWeight:
              0,

            completed:
              false,
          }),
        ),
      };

      setWorkout(
        (currentWorkout) => {
          if (!currentWorkout) {
            return null;
          }

          return {
            ...currentWorkout,

            exercises: [
              ...currentWorkout.exercises,
              newExercise,
            ],
          };
        },
      );
    } catch (addError) {
      console.error(
        "Add exercise error:",
        addError,
      );

      setError(
        addError instanceof Error
          ? addError.message
          : "Unable to add exercise.",
      );
    }
  }

  /*
   * Total sets.
   */
  const totalSets =
    useMemo(() => {
      if (!workout) {
        return 0;
      }

      return workout.exercises.reduce(
        (
          total,
          exercise,
        ) =>
          total +
          exercise.sets.length,
        0,
      );
    }, [workout]);

  /*
   * Loading state.
   */
  if (loading) {
    return (
      <main className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-zinc-500">
          Loading workout...
        </p>
      </main>
    );
  }

  /*
   * Error state.
   */
  if (error) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-center">
          <h1 className="font-bold text-white">
            Workout unavailable
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            {error}
          </p>
        </div>
      </main>
    );
  }

  if (
    !workout ||
    !weeklyPlan
  ) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">

      {/* Week selector */}
      <WorkoutWeekSelector
        days={
          weeklyPlan.days
        }
        selectedDay={
          selectedDay
        }
        onChange={
          handleDayChange
        }
      />

      {/* Workout header */}
      <WorkoutHeader
        title={
          workout.title
        }
        subtitle={
          workout.subtitle
        }
      />

      {/* Workout summary */}
      <WorkoutSummary
        duration={
          workout.duration
        }
        exerciseCount={
          workout.exercises.length
        }
      />

      {/* Workout progress */}
      <WorkoutProgress
        completedSets={
          completedSets
        }
        totalSets={
          totalSets
        }
      />

      {/* Exercises */}
      {workout.type !== "Rest" && (
        <div className="space-y-5">
          {workout.exercises.map(
            (exercise) => (
              <ExerciseCard
                key={`${selectedDay}-${exercise.id}-${exercise.name}`}
                exercise={
                  exercise
                }
                workoutDate={
                  selectedDate
                }
                onSetComplete={(
                  completed,
                ) =>
                  setCompletedSets(
                    (prev) =>
                      completed
                        ? prev + 1
                        : Math.max(
                            0,
                            prev - 1,
                          ),
                  )
                }
              />
            ),
          )}
        </div>
      )}

      {/* Rest day */}
      {workout.type === "Rest" && (
        <section
          className="
            rounded-3xl
            border
            border-zinc-800
            bg-[#111111]
            p-8
            text-center
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-zinc-500
            "
          >
            Recovery Day
          </p>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              text-white
            "
          >
            Rest & Recovery
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-md
              text-sm
              leading-6
              text-zinc-400
            "
          >
            No workout is scheduled
            for this day. Focus on
            recovery, sleep, hydration,
            and preparation for your
            next training session.
          </p>
        </section>
      )}

      {/* Add exercise */}
      {workout.type !== "Rest" && (
        <AddExerciseButton
          workoutType={
            workout.type
          }
          onAdded={
            handleExerciseAdded
          }
        />
      )}
    </div>
  );
}