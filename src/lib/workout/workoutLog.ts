import { supabase } from "@/lib/supabase";

type SaveWorkoutLogInput = {
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
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { data, error } = await supabase
    .from("workout_logs")
    .insert({
      user_id: user.id,
      workout_date: input.workoutDate,
      exercise_name: input.exerciseName,
      muscle: input.muscle,
      set_number: input.setNumber,
      weight: input.weight,
      reps: input.reps,
      completed: input.completed,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}