import { supabase } from "@/lib/supabase";

import {
  analyzeProgress,
  type ProgressAnalysis,
} from "@/data/analysis/progressAnalyzer";


export async function getMonthlyProgress(): Promise<ProgressAnalysis> {

  const {
    data: { user },
  } = await supabase.auth.getUser();


  if (!user) {
    throw new Error("User not authenticated.");
  }


  const fromDate = new Date();

  fromDate.setDate(
    fromDate.getDate() - 30
  );


  const {
    data: logs,
    error,
  } = await supabase
    .from("workout_logs")
    .select("*")
    .eq(
      "user_id",
      user.id,
    )
    .gte(
      "workout_date",
      fromDate.toISOString().split("T")[0],
    );


  if (error) {
    throw error;
  }


  return analyzeProgress({

    logs: logs ?? [],

    plannedSets:
      (logs?.length ?? 0) + 10,

  });

}