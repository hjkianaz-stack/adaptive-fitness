export type MuscleGroup =
  | "Chest"
  | "Back"
  | "Shoulders"
  | "Biceps"
  | "Triceps"
  | "Forearms"
  | "Quadriceps"
  | "Hamstrings"
  | "Glutes"
  | "Calves"
  | "Core";

export type Equipment =
  | "Barbell"
  | "Dumbbell"
  | "Machine"
  | "Cable"
  | "Bodyweight";

export type Difficulty =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export type MovementPattern =
  | "Push"
  | "Pull"
  | "Squat"
  | "Hinge"
  | "Carry"
  | "Core";

export type FatigueLevel =
  | "Low"
  | "Medium"
  | "High";

export type Exercise = {
  id: string;

  name: string;

  muscleGroup: MuscleGroup;

  secondaryMuscles: MuscleGroup[];

  equipment: Equipment;

  difficulty: Difficulty;

  movementPattern: MovementPattern;

  defaultSets: number;

  repRange: {
    min: number;
    max: number;
  };

  restSeconds: number;

  fatigueLevel: FatigueLevel;

  substitutions: string[];

  /**
   * Exercise image path.
   * Example:
   * /exercises/barbell-biceps-curl.webp
   */
  image: string;

  /**
   * Step-by-step exercise instructions.
   */
  instructions: string[];
};