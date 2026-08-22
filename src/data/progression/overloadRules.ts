import type {
  WorkoutPerformance,
  ProgressionResult,
} from "./types";


export function calculateOverload(
  performance: WorkoutPerformance,
): ProgressionResult {


  const repSuccess =
    performance.completedReps >=
    performance.targetReps;


  const setsSuccess =
    performance.completedSets >=
    performance.targetSets;



  /*
   * Increase load
   */
  if (
    repSuccess &&
    setsSuccess &&
    performance.difficulty <= 3
  ) {

    return {
      status: "increase",

      weightAdjustment:
        performance.weight * 0.025,

      setsAdjustment: 0,

      reason:
        "Performance target achieved. Increase load.",
    };
  }



  /*
   * Maintain
   */
  if (
    performance.difficulty === 4
  ) {

    return {
      status: "maintain",

      weightAdjustment: 0,

      setsAdjustment: 0,

      reason:
        "High effort detected. Maintain current load.",
    };
  }



  /*
   * Reduce / deload
   */
  if (
    performance.difficulty === 5
  ) {

    return {
      status: "deload",

      weightAdjustment:
        -(performance.weight * 0.1),

      setsAdjustment: -1,

      reason:
        "Very high fatigue detected. Reduce training stress.",
    };
  }



  return {
    status: "maintain",

    weightAdjustment: 0,

    setsAdjustment: 0,

    reason:
      "No progression required.",
  };
}