import type { Exercise } from "@/data/exercises/types";

import {
  getExercisesByMuscle,
} from "@/data/exercises";


type SelectExerciseInput = {
  muscleGroup: Exercise["muscleGroup"];

  count: number;

  experienceLevel: string;
};


/*
 * --------------------------------------------------
 * Difficulty ranking
 * --------------------------------------------------
 *
 * Lower score = better match for the user.
 *
 * Beginner:
 *   Prefer beginner-friendly exercises.
 *
 * Intermediate:
 *   Prefer beginner/intermediate exercises.
 *
 * Advanced:
 *   Prefer advanced/high-fatigue exercises,
 *   but still allow other exercises.
 * --------------------------------------------------
 */

function getDifficultyScore(
  exercise: Exercise,
  experienceLevel: string,
): number {

  const difficulty =
    exercise.difficulty;


  if (
    experienceLevel === "Beginner"
  ) {

    if (
      difficulty === "Beginner"
    ) {
      return 0;
    }

    if (
      difficulty === "Intermediate"
    ) {
      return 1;
    }

    return 2;
  }


  if (
    experienceLevel === "Advanced"
  ) {

    if (
      difficulty === "Advanced"
    ) {
      return 0;
    }

    if (
      difficulty === "Intermediate"
    ) {
      return 1;
    }

    return 2;
  }


  /*
   * Intermediate
   */

  if (
    difficulty === "Intermediate"
  ) {
    return 0;
  }

  if (
    difficulty === "Beginner"
  ) {
    return 1;
  }

  return 2;
}


/*
 * --------------------------------------------------
 * Fatigue ranking
 * --------------------------------------------------
 */

function getFatigueScore(
  exercise: Exercise,
  experienceLevel: string,
): number {

  if (
    experienceLevel === "Advanced"
  ) {

    return exercise.fatigueLevel === "High"
      ? 0
      : 1;
  }


  return exercise.fatigueLevel === "High"
    ? 1
    : 0;
}


/*
 * --------------------------------------------------
 * Main selector
 * --------------------------------------------------
 */

export function selectExercises(
  input: SelectExerciseInput,
): Exercise[] {

  const requestedCount =
    Math.max(
      1,
      Math.floor(
        input.count,
      ),
    );


  const exercises =
    getExercisesByMuscle(
      input.muscleGroup,
    );


  if (
    exercises.length === 0
  ) {

    return [];
  }


  /*
   * Remove duplicate exercise IDs.
   */

  const uniqueExercises =
    Array.from(
      new Map(
        exercises.map(
          (exercise) => [
            exercise.id,
            exercise,
          ],
        ),
      ).values(),
    );


  /*
   * Sort according to experience level.
   *
   * We intentionally keep the complete exercise
   * pool instead of immediately slicing it.
   */

  const sortedExercises =
    [...uniqueExercises].sort(
      (a, b) => {

        const difficultyDifference =
          getDifficultyScore(
            a,
            input.experienceLevel,
          ) -
          getDifficultyScore(
            b,
            input.experienceLevel,
          );


        if (
          difficultyDifference !== 0
        ) {

          return difficultyDifference;
        }


        const fatigueDifference =
          getFatigueScore(
            a,
            input.experienceLevel,
          ) -
          getFatigueScore(
            b,
            input.experienceLevel,
          );


        if (
          fatigueDifference !== 0
        ) {

          return fatigueDifference;
        }


        /*
         * Stable alphabetical fallback.
         */

        return a.name.localeCompare(
          b.name,
        );
      },
    );


  /*
   * Return as many unique exercises as
   * requested, but never more than actually exist.
   */

  return sortedExercises.slice(
    0,
    Math.min(
      requestedCount,
      sortedExercises.length,
    ),
  );
}