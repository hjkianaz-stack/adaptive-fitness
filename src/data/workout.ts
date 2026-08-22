import type { Exercise } from "./exercises/types";
import type { WorkoutDay } from "./workout/types";

export type WorkoutSet = {
  id: number;
  targetReps: number;
  targetWeight: number;
  completed: boolean;
  actualReps?: number;
  actualWeight?: number;
};

export type WorkoutExercise = {
  id: number;
  exerciseId: string;
  name: string;
  muscle: Exercise["muscleGroup"];
  secondaryMuscles: Exercise["secondaryMuscles"];
  equipment: Exercise["equipment"];
  difficulty: Exercise["difficulty"];
  image: string;
  instructions: string[];
  sets: WorkoutSet[];
  restSeconds: number;
};

export type WorkoutDisplayExercise = WorkoutExercise;

export type WorkoutDisplayData = {
  title: string;
  subtitle: string;
  duration: number;
  type: string;
  exercises: WorkoutExercise[];
};

function convertExercise(
  exercise: Exercise,
  index: number,
): WorkoutExercise {
  const sets: WorkoutSet[] = Array.from(
    {
      length: exercise.defaultSets,
    },
    (_, setIndex) => ({
      id: setIndex + 1,
      targetReps: exercise.repRange.min,
      targetWeight: 0,
      completed: false,
      actualReps: undefined,
      actualWeight: undefined,
    }),
  );

  return {
    id: index + 1,
    exerciseId: exercise.id,
    name: exercise.name,
    muscle: exercise.muscleGroup,
    secondaryMuscles: exercise.secondaryMuscles,
    equipment: exercise.equipment,
    difficulty: exercise.difficulty,
    image: exercise.image,
    instructions: exercise.instructions,
    restSeconds: exercise.restSeconds,
    sets,
  };
}

export function convertWorkoutDay(
  day: WorkoutDay,
): WorkoutDisplayData {
  return {
    title: day.type,

    type: day.type,

    subtitle:
      day.type === "Rest"
        ? "Recovery Day"
        : day.exercises
            .slice(0, 3)
            .map(
              (exercise) =>
                exercise.muscleGroup,
            )
            .join(", "),

    duration: day.durationMinutes,

    exercises: day.exercises.map(
      (exercise, index) =>
        convertExercise(
          exercise as unknown as Exercise,
          index,
        ),
    ),
  };
}