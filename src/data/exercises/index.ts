import type { Exercise } from "./types";

import { chestExercises } from "./chest";
import { backExercises } from "./back";
import { legsExercises } from "./legs";
import { shouldersExercises } from "./shoulders";
import { armsExercises } from "./arms";


export const exerciseLibrary: Exercise[] = [

  ...chestExercises,

  ...backExercises,

  ...legsExercises,

  ...shouldersExercises,

  ...armsExercises,

];



/*
|--------------------------------------------------------------------------
| Get exercises by muscle group
|--------------------------------------------------------------------------
*/

export function getExercisesByMuscle(
  muscleGroup: Exercise["muscleGroup"],
): Exercise[] {

  return exerciseLibrary.filter(
    (exercise) =>
      exercise.muscleGroup === muscleGroup,
  );

}



/*
|--------------------------------------------------------------------------
| Get exercises by movement pattern
|--------------------------------------------------------------------------
*/

export function getExercisesByPattern(
  pattern: Exercise["movementPattern"],
): Exercise[] {

  return exerciseLibrary.filter(
    (exercise) =>
      exercise.movementPattern === pattern,
  );

}



/*
|--------------------------------------------------------------------------
| Get alternative exercises
|
| Used when user clicks "+" to add
| an extra exercise to today's workout
|--------------------------------------------------------------------------
*/

export function getAdditionalExercises(
  muscleGroups: Exercise["muscleGroup"][],
  existingExerciseIds: string[] = [],
): Exercise[] {

  const existing =
    new Set(existingExerciseIds);


  return exerciseLibrary.filter(
    (exercise) =>

      muscleGroups.includes(
        exercise.muscleGroup,
      )

      &&

      !existing.has(
        exercise.id,
      ),

  );

}