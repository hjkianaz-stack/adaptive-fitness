import {
  analyzeTraining,
} from "./trainingAnalyzer";


console.log(
  analyzeTraining({
    plannedSets: 50,
    completedSets: 46,
    completedWorkouts: 12,
    missedWorkouts: 0,
    strengthChangePercent: 5,
    averageDifficulty: 7,
  }),
);