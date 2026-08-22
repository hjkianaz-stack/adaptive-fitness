import { supabase } from "@/lib/supabase";

export type SaveWorkoutLogInput = {
  workoutDate: string;
  exerciseName: string;
  muscle: string;
  setNumber: number;
  weight: number;
  reps: number;
  completed: boolean;
};

export async function saveWorkoutLog(
  input: SaveWorkoutLogInput,
) {
  try {
    // Check authentication
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Supabase auth error:", {
        message: userError.message,
        name: userError.name,
        status: userError.status,
      });

      throw new Error(
        `Authentication error: ${userError.message}`,
      );
    }

    if (!user) {
      throw new Error(
        "User is not authenticated. Please sign in again.",
      );
    }

    // Validate input
    if (!input.workoutDate) {
      throw new Error("Workout date is required.");
    }

    if (!input.exerciseName) {
      throw new Error("Exercise name is required.");
    }

    if (!Number.isFinite(input.weight) || input.weight < 0) {
      throw new Error("Invalid weight.");
    }

    if (!Number.isFinite(input.reps) || input.reps < 0) {
      throw new Error("Invalid reps.");
    }

    if (!Number.isInteger(input.setNumber) || input.setNumber < 1) {
      throw new Error("Invalid set number.");
    }

    // Save workout log
    const { data, error } = await supabase
      .from("workout_logs")
      .upsert(
        {
          user_id: user.id,
          workout_date: input.workoutDate,
          exercise_name: input.exerciseName,
          muscle: input.muscle,
          set_number: input.setNumber,
          weight: input.weight,
          reps: input.reps,
          completed: input.completed,
        },
        {
          onConflict:
            "user_id,workout_date,exercise_name,set_number",
        },
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase workout_logs error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      throw new Error(
        `Failed to save workout: ${error.message}`,
      );
    }

    return data;
  } catch (error) {
    console.error("Workout log error:", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      "An unknown error occurred while saving the workout.",
    );
  }
}