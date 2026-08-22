import type {
  WorkoutPerformance,
  ProgressionResult,
} from "./types";

import {
  calculateOverload,
} from "./overloadRules";

import {
  applyDeload,
} from "./deloadEngine";


export function getNextWorkoutAdjustment(
  performance: WorkoutPerformance,
  weeklyFatigue: number,
): ProgressionResult {


  const deload =
    applyDeload(
      weeklyFatigue,
    );


  if (
    deload.status === "deload"
  ) {
    return deload;
  }


  return calculateOverload(
    performance,
  );
}