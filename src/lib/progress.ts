import { supabase } from "@/lib/supabase";

export type WorkoutLog = {
  id: string;
  workout_date: string;
  exercise_name: string;
  set_number: number;
  weight: number;
  reps: number;
  completed: boolean;
};


export async function getWorkoutLogs() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();


  if (userError || !user) {
    return {
      data: null,
      error: userError ?? new Error("User not authenticated"),
    };
  }


  const { data, error } = await supabase
    .from("workout_logs")
    .select(
      `
      id,
      workout_date,
      exercise_name,
      set_number,
      weight,
      reps,
      completed
      `,
    )
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });


  if (error) {
    return {
      data: null,
      error,
    };
  }


  return {
    data: data as WorkoutLog[],
    error: null,
  };
}