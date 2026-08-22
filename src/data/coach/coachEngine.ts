import type { ProgressAnalysis } from "@/data/progression/monthlyPlanner";


export type CoachInput = {
  userName?: string;

  goal: string;

  trainingDays: number;

  analysis: ProgressAnalysis;
};


export type CoachRecommendation = {
  title: string;

  message: string;

  actions: string[];
};



export function generateCoachRecommendation(
  input: CoachInput,
): CoachRecommendation {


  const {
    goal,
    analysis,
  } = input;



  if (
    analysis.status === "increase"
  ) {

    return {

      title:
        "Great progress 💪",

      message:
        `Your ${goal} plan is working well. Increase training challenge next month.`,

      actions: [
        `Increase weekly volume by ${analysis.volumeAdjustment}%`,
        `Increase intensity by ${analysis.intensityAdjustment}%`,
        "Continue progressive overload",
      ],
    };
  }



  if (
    analysis.status === "decrease"
  ) {

    return {

      title:
        "Recovery needed",

      message:
        "Your performance shows signs of fatigue. Recovery phase is recommended.",

      actions: [
        "Reduce training volume",
        "Focus on sleep and nutrition",
        "Return gradually after recovery",
      ],
    };
  }



  return {

    title:
      "Keep going 🔥",

    message:
      "Your progress is stable. Continue your current program.",

    actions: [
      "Maintain current volume",
      "Track strength progress",
      "Stay consistent",
    ],
  };
}