export type ProgressionStatus =
  | "increase"
  | "maintain"
  | "deload";


export type WorkoutPerformance = {
  exerciseId: string;

  weight: number;

  completedReps: number;

  targetReps: number;

  completedSets: number;

  targetSets: number;

  difficulty:
    | 1
    | 2
    | 3
    | 4
    | 5;
};


export type ProgressionResult = {
  status: ProgressionStatus;

  weightAdjustment: number;

  setsAdjustment: number;

  reason: string;
};