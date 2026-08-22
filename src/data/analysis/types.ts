export type TrainingAnalysisInput = {
  plannedSets: number;

  completedSets: number;

  completedWorkouts: number;

  missedWorkouts: number;

  strengthChangePercent: number;

  averageDifficulty: number;
};


export type TrainingRecommendation = {
  status:
    | "increase"
    | "maintain"
    | "deload";

  volumeAdjustment: number;

  intensityAdjustment: number;

  recommendation: string;
};