import type { WorkoutProfile } from "./workoutGenerator";


export type TrainingAdjustment = {
  setsMultiplier: number;
  restMultiplier: number;
  preferredRepRange: {
    min: number;
    max: number;
  };
  intensityLevel: "low" | "medium" | "high";
};



export function adjustByExperience(
  experienceLevel: string | null,
): TrainingAdjustment {

  switch (
    experienceLevel?.toLowerCase()
  ) {

    case "beginner":

      return {
        setsMultiplier: 0.8,
        restMultiplier: 1.3,
        preferredRepRange: {
          min: 10,
          max: 15,
        },
        intensityLevel: "low",
      };


    case "advanced":

      return {
        setsMultiplier: 1.2,
        restMultiplier: 0.9,
        preferredRepRange: {
          min: 6,
          max: 10,
        },
        intensityLevel: "high",
      };


    default:

      return {
        setsMultiplier: 1,
        restMultiplier: 1,
        preferredRepRange: {
          min: 8,
          max: 12,
        },
        intensityLevel: "medium",
      };
  }
}



export function calculateTrainingVolume(
  profile: WorkoutProfile,
) {

  const weight =
    profile.weight_kg ?? 70;


  const trainingDays =
    profile.training_days ?? 3;



  let weeklySets = 12;



  if (weight < 60) {
    weeklySets = 16;
  }


  if (
    profile.fitness_goal ===
    "Fat Loss"
  ) {
    weeklySets = 14;
  }


  if (
    profile.experience_level ===
    "Advanced"
  ) {
    weeklySets += 4;
  }



  return {
    weeklySets,
    averageSetsPerSession:
      Math.round(
        weeklySets / trainingDays,
      ),
  };
}



export function applyInjuryRules(
  exerciseName: string,
  injuryNotes: string | null,
) {

  if (!injuryNotes) {
    return {
      allowed: true,
      replacement: null,
    };
  }


  const injury =
    injuryNotes.toLowerCase();



  if (
    injury.includes("knee") &&
    exerciseName
      .toLowerCase()
      .includes("squat")
  ) {

    return {
      allowed: false,
      replacement:
        "Leg Press",
    };
  }



  if (
    injury.includes("back") &&
    exerciseName
      .toLowerCase()
      .includes("deadlift")
  ) {

    return {
      allowed: false,
      replacement:
        "Machine Row",
    };
  }



  return {
    allowed: true,
    replacement: null,
  };
}