import { supabase } from "@/lib/supabase";

export type WorkoutProgressItem = {
  exerciseName: string;
  muscle: string;
  setNumber: number;
  weight: number;
  reps: number;
  completed: boolean;
};

export async function loadWorkoutProgress(
  workoutDate: string,
): Promise<WorkoutProgressItem[]> {
  if (!workoutDate) {
    return [];
  }

  const {
    data: {
      user,
    },
    error: userError,
  } =
    await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "User is not authenticated.",
    );
  }

  const {
    data,
    error,
  } =
    await supabase
      .from("workout_logs")
      .select(
        `
          exercise_name,
          muscle,
          set_number,
          weight,
          reps,
          completed
        `,
      )
      .eq(
        "user_id",
        user.id,
      )
      .eq(
        "workout_date",
        workoutDate,
      )
      .order(
        "exercise_name",
        {
          ascending: true,
        },
      )
      .order(
        "set_number",
        {
          ascending: true,
        },
      );

  if (error) {
    throw error;
  }

  return (
    data?.map(
      (item) => ({
        exerciseName:
          item.exercise_name,

        muscle:
          item.muscle ?? "",

        setNumber:
          Number(
            item.set_number,
          ),

        weight:
          Number(
            item.weight ?? 0,
          ),

        reps:
          Number(
            item.reps ?? 0,
          ),

        completed:
          item.completed === true,
      }),
    ) ?? []
  );
}