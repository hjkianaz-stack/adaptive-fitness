import type {
  TrainingAnalysisInput,
  TrainingRecommendation,
} from "./types";


export function analyzeTraining(
  input: TrainingAnalysisInput,
): TrainingRecommendation {


  const completionRate =
    input.completedSets /
    Math.max(
      input.plannedSets,
      1,
    );


  /*
   * User is recovering well
   * and completing workouts.
   */
  if (
    completionRate >= 0.85 &&
    input.averageDifficulty <= 8 &&
    input.strengthChangePercent >= 0
  ) {

    return {

      status:
        "increase",

      volumeAdjustment:
        10,

      intensityAdjustment:
        5,

      recommendation:
        "Increase weekly volume by 10% because progress and recovery are positive.",
    };
  }



  /*
   * User is struggling.
   */
  if (
    completionRate < 0.7 ||
    input.averageDifficulty >= 9 ||
    input.missedWorkouts >= 3
  ) {

    return {

      status:
        "deload",

      volumeAdjustment:
        -30,

      intensityAdjustment:
        -15,

      recommendation:
        "Reduce training load for recovery.",
    };
  }



  /*
   * Stable progress.
   */
  return {

    status:
      "maintain",

    volumeAdjustment:
      0,

    intensityAdjustment:
      0,

    recommendation:
      "Keep current program and continue progression.",
  };
}