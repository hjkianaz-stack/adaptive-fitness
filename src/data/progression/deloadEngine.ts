import type {
  ProgressionResult,
} from "./types";


export function applyDeload(
  weeklyFatigue: number,
): ProgressionResult {


  if (weeklyFatigue >= 80) {
    return {
      status: "deload",

      weightAdjustment: -10,

      setsAdjustment: -1,

      reason:
        "High accumulated fatigue. Deload week activated.",
    };
  }


  return {
    status: "maintain",

    weightAdjustment: 0,

    setsAdjustment: 0,

    reason:
      "Fatigue level is acceptable.",
  };
}