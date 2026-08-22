import { supabase } from "@/lib/supabase";

import {
  analyzeProgress,
  type ProgressAnalysis,
} from "@/data/analysis/progressAnalyzer";

import type {
  WorkoutProgressItem,
} from "@/lib/workoutProgress";

export async function getCoachAnalysis(): Promise<ProgressAnalysis> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "User is not authenticated.",
    );
  }

  const fromDate = new Date();

  fromDate.setDate(
    fromDate.getDate() - 30,
  );

  const {
    data: logs,
    error,
  } = await supabase
    .from("workout_logs")
    .select(
      `
        exercise_name,
        muscle,
        set_number,
        weight,
        reps,
        completed,
        workout_date
      `,
    )
    .eq(
      "user_id",
      user.id,
    )
    .gte(
      "workout_date",
      fromDate
        .toISOString()
        .split("T")[0],
    )
    .order(
      "workout_date",
      {
        ascending: false,
      },
    )
    .limit(300);

  if (error) {
    throw error;
  }

  const progressLogs: WorkoutProgressItem[] =
    logs?.map(
      (item) => ({
        exerciseName:
          item.exercise_name,

        muscle:
          item.muscle,

        setNumber:
          item.set_number,

        weight:
          Number(
            item.weight ?? 0,
          ),

        reps:
          Number(
            item.reps ?? 0,
          ),

        completed:
          Boolean(
            item.completed,
          ),
      }),
    ) ?? [];

  return analyzeProgress({
    logs: progressLogs,

    plannedSets:
      progressLogs.length > 0
        ? progressLogs.length
        : 12,
  });
}