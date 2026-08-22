import type { WorkoutProgressItem } from "@/lib/workoutProgress";


export type ProgressAnalysis = {
  completedSets: number;
  totalSets: number;
  completionRate: number;

  status:
    | "increase"
    | "maintain"
    | "decrease";

  volumeAdjustment: number;

  intensityAdjustment: number;

  recommendation: string;
};



type AnalyzeProgressInput = {
  logs: WorkoutProgressItem[];
  plannedSets: number;
};



export function analyzeProgress({
  logs,
  plannedSets,
}: AnalyzeProgressInput): ProgressAnalysis {


  const completedSets =
    logs.filter(
      (item) => item.completed,
    ).length;



  const totalSets =
    plannedSets;



  const completionRate =
    totalSets > 0
      ? Math.round(
          (completedSets / totalSets) * 100,
        )
      : 0;



  let status:
    | "increase"
    | "maintain"
    | "decrease";


  let volumeAdjustment = 0;

  let intensityAdjustment = 0;

  let recommendation = "";



  if (completionRate >= 85) {

    status = "increase";

    volumeAdjustment = 10;

    intensityAdjustment = 5;

    recommendation =
      "Performance is strong. Increase training volume and intensity gradually.";


  } else if (completionRate >= 60) {

    status = "maintain";

    volumeAdjustment = 0;

    intensityAdjustment = 0;

    recommendation =
      "Maintain current workload and focus on consistency.";


  } else {

    status = "decrease";

    volumeAdjustment = -20;

    intensityAdjustment = -10;

    recommendation =
      "Recovery may be limited. Reduce workload temporarily.";

  }



  return {

    completedSets,

    totalSets,

    completionRate,

    status,

    volumeAdjustment,

    intensityAdjustment,

    recommendation,

  };

}