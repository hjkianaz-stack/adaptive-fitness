import type { Exercise } from "@/data/exercises/types";

import type {
  ProgressionResult,
} from "@/data/progression/types";


export function applyProgressionToExercise(
  exercise: Exercise,
  progression: ProgressionResult,
): Exercise {


  const newSets =
    Math.max(
      1,
      exercise.defaultSets +
        progression.setsAdjustment,
    );


  return {
    ...exercise,

    defaultSets:
      newSets,
  };
}