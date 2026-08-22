import type { WorkoutDayType } from "./types";

import {
  calculateWeeklyVolume,
  type MuscleGroup,
  type MuscleVolume,
} from "./volumeEngine";

import {
  distributeWeeklyVolume,
  getDistributedMuscleVolume,
  type DistributedVolume,
} from "./volumeDistributor";

import { selectExercises } from "./exerciseSelector";

import {
  adjustByExperience,
  applyInjuryRules,
} from "./adaptiveEngine";

import type { Exercise } from "@/data/exercises/types";

type BuildWorkoutInput = {
  goal: string;
  experienceLevel: string;
  trainingDays: number;
  split: WorkoutDayType;
  injuryNotes?: string | null;
  weeklyVolume?: MuscleVolume[];
  sessionDuration?: number | null;
};

export type BuiltWorkout = {
  type: WorkoutDayType;
  exercises: Exercise[];
};

const MINIMUM_EXERCISES = 6;

function getFallbackVolume(
  muscleGroup: MuscleGroup,
): number {
  switch (muscleGroup) {
    case "Chest":
      return 10;
    case "Back":
      return 12;
    case "Shoulders":
      return 8;
    case "Biceps":
      return 6;
    case "Triceps":
      return 6;
    case "Quadriceps":
      return 10;
    case "Hamstrings":
      return 8;
    case "Glutes":
      return 8;
    case "Calves":
      return 6;
    case "Core":
      return 6;
    default:
      return 8;
  }
}

function getSessionSets(
  distributedVolume: DistributedVolume[],
  muscleGroup: MuscleGroup,
): number {
  const volume = getDistributedMuscleVolume(
    distributedVolume,
    muscleGroup,
  );

  if (!volume) {
    return getFallbackVolume(muscleGroup);
  }

  return Math.max(
    1,
    volume.setsPerSession,
  );
}

function getExerciseLimit(
  sessionDuration: number | null | undefined,
): number {
  const duration = sessionDuration ?? 60;

  if (duration <= 30) {
    return 6;
  }

  if (duration <= 45) {
    return 6;
  }

  if (duration <= 60) {
    return 8;
  }

  if (duration <= 75) {
    return 9;
  }

  return 10;
}

function adjustExercise(
  exercise: Exercise,
  experienceLevel: string,
  injuryNotes: string | null | undefined,
  targetSets: number,
): Exercise | null {
  const injuryRule = applyInjuryRules(
    exercise.name,
    injuryNotes ?? null,
  );

  if (!injuryRule.allowed) {
    return null;
  }

  const adjustment = adjustByExperience(
    experienceLevel,
  );

  return {
    ...exercise,

    defaultSets: Math.max(
      1,
      Math.round(
        targetSets *
          adjustment.setsMultiplier,
      ),
    ),

    restSeconds: Math.max(
      30,
      Math.round(
        exercise.restSeconds *
          adjustment.restMultiplier,
      ),
    ),
  };
}

function getValidExercises(
  muscleGroup: MuscleGroup,
  experienceLevel: string,
  injuryNotes: string | null | undefined,
  existingIds: Set<string>,
): Exercise[] {
  const candidates = selectExercises({
    muscleGroup,
    count: 50,
    experienceLevel,
  });

  const valid: Exercise[] = [];

  for (const exercise of candidates) {
    if (existingIds.has(exercise.id)) {
      continue;
    }

    const injuryRule = applyInjuryRules(
      exercise.name,
      injuryNotes ?? null,
    );

    if (!injuryRule.allowed) {
      continue;
    }

    valid.push(exercise);
  }

  return valid;
}

function addExercises(
  selected: Array<{
    exercise: Exercise;
    targetSets: number;
  }>,
  distributedVolume: DistributedVolume[],
  muscleGroup: MuscleGroup,
  count: number,
  experienceLevel: string,
  injuryNotes: string | null | undefined,
): void {
  if (count <= 0) {
    return;
  }

  const existingIds = new Set(
    selected.map(
      (item) => item.exercise.id,
    ),
  );

  const exercises = getValidExercises(
    muscleGroup,
    experienceLevel,
    injuryNotes,
    existingIds,
  ).slice(0, count);

  if (exercises.length === 0) {
    return;
  }

  const sessionSets = getSessionSets(
    distributedVolume,
    muscleGroup,
  );

  const setsPerExercise = Math.max(
    2,
    Math.floor(
      sessionSets / exercises.length,
    ),
  );

  for (const exercise of exercises) {
    selected.push({
      exercise,
      targetSets: setsPerExercise,
    });
  }
}

function getFallbackMuscles(
  split: WorkoutDayType,
): MuscleGroup[] {
  switch (split) {
    case "Lower Body":
    case "Legs":
      return [
        "Quadriceps",
        "Hamstrings",
        "Glutes",
        "Calves",
        "Core",
        "Shoulders",
        "Biceps",
        "Triceps",
        "Back",
        "Chest",
      ];

    case "Upper Body":
      return [
        "Chest",
        "Back",
        "Shoulders",
        "Biceps",
        "Triceps",
        "Core",
        "Glutes",
        "Calves",
      ];

    case "Push":
      return [
        "Chest",
        "Shoulders",
        "Triceps",
        "Core",
        "Back",
        "Biceps",
      ];

    case "Pull":
      return [
        "Back",
        "Biceps",
        "Shoulders",
        "Core",
        "Chest",
        "Triceps",
      ];

    case "Full Body":
      return [
        "Chest",
        "Back",
        "Quadriceps",
        "Hamstrings",
        "Shoulders",
        "Glutes",
        "Core",
        "Biceps",
        "Triceps",
        "Calves",
      ];

    default:
      return [
        "Chest",
        "Back",
        "Shoulders",
        "Quadriceps",
        "Hamstrings",
        "Core",
        "Glutes",
        "Calves",
      ];
  }
}

function fillMinimumExercises(
  selected: Array<{
    exercise: Exercise;
    targetSets: number;
  }>,
  experienceLevel: string,
  injuryNotes: string | null | undefined,
  split: WorkoutDayType,
): void {
  if (selected.length >= MINIMUM_EXERCISES) {
    return;
  }

  const fallbackMuscles =
    getFallbackMuscles(split);

  for (const muscleGroup of fallbackMuscles) {
    if (
      selected.length >=
      MINIMUM_EXERCISES
    ) {
      break;
    }

    const existingIds = new Set(
      selected.map(
        (item) => item.exercise.id,
      ),
    );

    const candidates =
      getValidExercises(
        muscleGroup,
        experienceLevel,
        injuryNotes,
        existingIds,
      );

    for (const candidate of candidates) {
      if (
        selected.length >=
        MINIMUM_EXERCISES
      ) {
        break;
      }

      if (
        existingIds.has(
          candidate.id,
        )
      ) {
        continue;
      }

      const adjusted =
        adjustExercise(
          candidate,
          experienceLevel,
          injuryNotes,
          3,
        );

      if (!adjusted) {
        continue;
      }

      selected.push({
        exercise: adjusted,
        targetSets:
          adjusted.defaultSets,
      });

      existingIds.add(
        candidate.id,
      );
    }
  }
}

export function buildWorkoutDay(
  input: BuildWorkoutInput,
): BuiltWorkout {
  const weeklyVolume =
    input.weeklyVolume ??
    calculateWeeklyVolume({
      goal: input.goal,
      experienceLevel:
        input.experienceLevel,
      trainingDays:
        input.trainingDays,
    });

  const distributedVolume =
    distributeWeeklyVolume({
      weeklyVolume,
      trainingDays:
        input.trainingDays,
    });

  const selected: Array<{
    exercise: Exercise;
    targetSets: number;
  }> = [];

  switch (input.split) {
    case "Upper Body":
      addExercises(
        selected,
        distributedVolume,
        "Chest",
        2,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Back",
        2,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Shoulders",
        1,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Biceps",
        1,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Triceps",
        1,
        input.experienceLevel,
        input.injuryNotes,
      );

      break;

    case "Lower Body":
      addExercises(
        selected,
        distributedVolume,
        "Quadriceps",
        2,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Hamstrings",
        2,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Glutes",
        1,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Calves",
        1,
        input.experienceLevel,
        input.injuryNotes,
      );

      break;

    case "Full Body":
      addExercises(
        selected,
        distributedVolume,
        "Chest",
        1,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Back",
        1,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Quadriceps",
        1,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Hamstrings",
        1,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Shoulders",
        1,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Core",
        1,
        input.experienceLevel,
        input.injuryNotes,
      );

      break;

    case "Push":
      addExercises(
        selected,
        distributedVolume,
        "Chest",
        2,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Shoulders",
        2,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Triceps",
        2,
        input.experienceLevel,
        input.injuryNotes,
      );

      break;

    case "Pull":
      addExercises(
        selected,
        distributedVolume,
        "Back",
        3,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Biceps",
        2,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Shoulders",
        1,
        input.experienceLevel,
        input.injuryNotes,
      );

      break;

    case "Legs":
      addExercises(
        selected,
        distributedVolume,
        "Quadriceps",
        2,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Hamstrings",
        2,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Glutes",
        1,
        input.experienceLevel,
        input.injuryNotes,
      );

      addExercises(
        selected,
        distributedVolume,
        "Calves",
        1,
        input.experienceLevel,
        input.injuryNotes,
      );

      break;
  }

  let adjustedExercises =
    selected
      .map(
        ({
          exercise,
          targetSets,
        }) =>
          adjustExercise(
            exercise,
            input.experienceLevel,
            input.injuryNotes,
            targetSets,
          ),
      )
      .filter(
        (
          exercise,
        ): exercise is Exercise =>
          exercise !== null,
      );

  if (
    adjustedExercises.length <
    MINIMUM_EXERCISES
  ) {
    const fallbackSelected =
      adjustedExercises.map(
        (exercise) => ({
          exercise,
          targetSets:
            exercise.defaultSets,
        }),
      );

    fillMinimumExercises(
      fallbackSelected,
      input.experienceLevel,
      input.injuryNotes,
      input.split,
    );

    adjustedExercises =
      fallbackSelected.map(
        (item) => item.exercise,
      );
  }

  const limit =
    getExerciseLimit(
      input.sessionDuration,
    );

  if (
    adjustedExercises.length >
    limit
  ) {
    adjustedExercises =
      adjustedExercises.slice(
        0,
        limit,
      );
  }

  return {
    type: input.split,
    exercises: adjustedExercises,
  };
}