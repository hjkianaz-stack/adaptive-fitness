import { supabase } from "@/lib/supabase";

import type { Exercise } from "@/data/exercises/types";

type WorkoutPlanExercise = {
  id: number;
  name: string;
  muscleGroup: string;
  equipment: string;
  sets: number;
  reps: string;
  restSeconds: number;
};

type WorkoutPlanDay = {
  dayIndex: number;
  dayName: string;
  type: string;
  durationMinutes: number;
  exercises: WorkoutPlanExercise[];
};

type WorkoutPlanData = {
  goal: string;
  trainingDays: number;
  experienceLevel: string;
  trainingLocation: string;
  days: WorkoutPlanDay[];
};

function getWeekStartDate(): string {
  const date = new Date();

  const day =
    date.getDay() === 0
      ? 7
      : date.getDay();

  date.setDate(
    date.getDate() - day + 1,
  );

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1,
    ).padStart(2, "0");

  const dayOfMonth =
    String(
      date.getDate(),
    ).padStart(2, "0");

  return `${year}-${month}-${dayOfMonth}`;
}

export async function addExerciseToWorkout(
  exercise: Exercise,
  selectedDay?: number,
) {
  const {
    data: { user },
    error: authError,
  } =
    await supabase.auth.getUser();

  if (authError) {
    throw authError;
  }

  if (!user) {
    throw new Error(
      "User not authenticated.",
    );
  }

  const weekStartDate =
    getWeekStartDate();

  const {
    data: plan,
    error: planError,
  } =
    await supabase
      .from("workout_plans")
      .select(
        `
          id,
          plan_data
        `,
      )
      .eq(
        "user_id",
        user.id,
      )
      .eq(
        "week_start_date",
        weekStartDate,
      )
      .eq(
        "active",
        true,
      )
      .eq(
        "status",
        "active",
      )
      .order(
        "created_at",
        {
          ascending: false,
        },
      )
      .limit(1)
      .maybeSingle();

  if (planError) {
    throw planError;
  }

  if (
    !plan ||
    !plan.plan_data
  ) {
    throw new Error(
      "Workout plan not found.",
    );
  }

  const workoutPlan =
    plan.plan_data as WorkoutPlanData;

  /*
   * If selectedDay is provided, use it.
   * Otherwise fall back to today's day.
   */
  const currentDay =
    new Date().getDay();

  const todayIndex =
    currentDay === 0
      ? 6
      : currentDay - 1;

  const dayIndex =
    selectedDay !== undefined
      ? selectedDay
      : todayIndex;

  if (
    !Number.isInteger(dayIndex) ||
    dayIndex < 0 ||
    dayIndex > 6
  ) {
    throw new Error(
      "Invalid workout day.",
    );
  }

  const selectedWorkout =
    workoutPlan.days[dayIndex];

  if (!selectedWorkout) {
    throw new Error(
      "Selected workout day not found.",
    );
  }

  /*
   * Convert exercise ID to number because
   * workout plan exercise IDs are numeric.
   */
  const exerciseId =
    Number(exercise.id);

  if (
    !Number.isFinite(
      exerciseId,
    )
  ) {
    throw new Error(
      `Invalid exercise ID: ${exercise.id}`,
    );
  }

  /*
   * Prevent duplicate exercises.
   */
  const exists =
    selectedWorkout.exercises.some(
      (item) =>
        item.id === exerciseId ||
        item.name === exercise.name,
    );

  if (exists) {
    throw new Error(
      "Exercise already exists in this workout.",
    );
  }

  /*
   * Create the exercise that will be
   * stored inside workout_plans.plan_data.
   */
  const newExercise: WorkoutPlanExercise = {
    id:
      exerciseId,

    name:
      exercise.name,

    muscleGroup:
      exercise.muscleGroup,

    equipment:
      exercise.equipment,

    sets:
      exercise.defaultSets,

    reps:
      `${exercise.repRange.min}-${exercise.repRange.max}`,

    restSeconds:
      exercise.restSeconds,
  };

  /*
   * Do not mutate the original Supabase
   * response directly.
   *
   * Create a new plan object instead.
   */
  const updatedDays =
    workoutPlan.days.map(
      (day, index) => {
        if (index !== dayIndex) {
          return day;
        }

        return {
          ...day,

          exercises: [
            ...day.exercises,
            newExercise,
          ],
        };
      },
    );

  const updatedPlan: WorkoutPlanData = {
    ...workoutPlan,

    days:
      updatedDays,
  };

  /*
   * Persist the complete updated plan.
   */
  const {
    error: updateError,
  } =
    await supabase
      .from("workout_plans")
      .update({
        plan_data:
          updatedPlan,

        updated_at:
          new Date().toISOString(),
      })
      .eq(
        "id",
        plan.id,
      );

  if (updateError) {
    throw updateError;
  }

  return newExercise;
}

/*
 * Backward-compatible export.
 *
 * AddExerciseButton currently imports
 * this function name.
 *
 * Keeping this alias prevents the build
 * from breaking while the app transitions
 * to addExerciseToWorkout.
 */
export async function addExerciseToTodayWorkout(
  exercise: Exercise,
) {
  return addExerciseToWorkout(
    exercise,
  );
}